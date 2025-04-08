<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import Legend from './Legend.svelte';

    export let geoData;
    export let data;
    export let selectedLayer;
    export let colorScale = d3.scaleSequential().interpolator(d3.interpolateOranges);


    let svg;
    let width = 500;
    let height = 500;
    let projection = d3.geoIdentity().reflectY(true);
    let path = d3.geoPath().projection(projection);

    let joinedFeatures = [];
    let neighborhoodMap = new Map();
    let neighborhoodLabels = [];
    let neighborhoodBoundaries = [];

    // Load neighborhood mapping
    onMount(async () => {
      const neighborhoodData = await d3.csv('data_csv/evict_neighborhoods.csv');
      neighborhoodMap = new Map(neighborhoodData.map(d => [d.GEOID, d.neighborhood]));
    });

    // Join features with data and neighborhoods
    $: if (geoData && data && selectedLayer && neighborhoodMap.size > 0) {
      const dataMap = new Map(data.map(d => [String(d.GEOID), d]));

      joinedFeatures = geoData.features.map(f => {
        const geoID = f.properties?.GEOID10;
        const row = dataMap.get(String(geoID));
        const neighborhood = neighborhoodMap.get(String(geoID));

        let rawValue = row ? row[selectedLayer] : null;

          // Normalize non_white_rate to 0–1 range
          if (selectedLayer === 'non_white_rate' && rawValue != null) {
            rawValue = +rawValue / 100;
          }

          return {
            ...f,
            properties: {
              ...f.properties,
              value: rawValue,
              neighborhood: neighborhood || 'Unknown'
            }
          };
          });

      const bostonFeatures = joinedFeatures.filter(f => f.properties.value != null);

      projection = d3.geoIdentity().reflectY(true).fitSize([width, height], {
        type: "FeatureCollection",
        features: bostonFeatures
      });

      path = d3.geoPath().projection(projection);

      const values = bostonFeatures.map(f => f.properties.value);
      const [min, max] = d3.extent(values);
        if (selectedLayer === 'r_mhi') {
          colorScale.domain([max, min]); // Invert for income
        } else {
          colorScale.domain([min, max]);
}
    }

    // Compute one label per neighborhood (average centroid)
    $: if (joinedFeatures.length > 0) {
      const groups = d3.group(joinedFeatures, d => d.properties.neighborhood);

      neighborhoodLabels = Array.from(groups, ([neighborhood, features]) => {
        const valid = features.filter(f => f.properties.value != null);
        if (valid.length === 0) return null;

        const centroids = valid.map(f => path.centroid(f));
        const avgX = d3.mean(centroids, d => d[0]);
        const avgY = d3.mean(centroids, d => d[1]);

        return {
          neighborhood,
          x: avgX,
          y: avgY,
          width: neighborhood.length * 5.5, // Rough estimate of text width
          height: 12 // Text height based on font size
        };
      }).filter(Boolean);

      d3.forceSimulation(neighborhoodLabels)
      .force('x', d3.forceX(d => d.x).strength(0.8)) // Stay close to original position
      .force('y', d3.forceY(d => d.y).strength(0.8))
      .force('collision', d3.forceCollide().radius(d =>
        Math.sqrt((d.width/2)**2 + (d.height/2)**2) + 1 // Create padding
      ))
      .stop()
      .tick(100); // Run 100 iterations immediately

      // Store boundary groups
      neighborhoodBoundaries = Array.from(groups, ([neighborhood, features]) => ({
        neighborhood,
        features
      }));
    }
  </script>



  <svg bind:this={svg} width={width} height={height} class="map-svg">
    <!-- Tract fills -->
    {#each joinedFeatures as feature}
      <path
        d={path(feature)}
        fill={feature.properties.value != null ? colorScale(feature.properties.value) : '#eee'}
        stroke="none"
        class={feature.properties.value == null ? 'missing-data' : ''}
      />
    {/each}

    <!-- Neighborhood boundaries -->
    {#each neighborhoodBoundaries as group}
      <path
        d={path({
          type: "FeatureCollection",
          features: group.features
        })}
        fill="none"
        stroke="#000"
        stroke-width="1.2"
        class="neighborhood-boundary"
      />
    {/each}

    <!-- Neighborhood labels -->
    {#each neighborhoodLabels as label}
      <text x={label.x} y={label.y} class="neighborhood-label">
        {label.neighborhood}
      </text>
    {/each}
  </svg>

<!--The component for legend-->

  <Legend {selectedLayer} {colorScale} />


  <style>
    .map-svg {
      display: block;
      margin: 0 auto;
    }

    .missing-data {
      /* stroke: #999; */
      /* stroke-dasharray: 2,2; */
      fill: #eee;
    }

    .neighborhood-label {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 10px;
      fill: #333;
      font-weight: 1700;
      text-anchor: middle;
      pointer-events: none;
      paint-order: stroke;
      stroke: rgb(250, 239, 239);
      stroke-width: 3px;
      stroke-linejoin: round;
    }

    .neighborhood-boundary {
      stroke: #000;
      stroke-width: 0;
      stroke-width: 0;
      fill: none;
      pointer-events: none;
      opacity: 0.6;
    }
  </style>
