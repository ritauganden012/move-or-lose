<script>
  import { onMount } from 'svelte';
  import Tooltip from './Tooltip.svelte';
  import * as d3 from 'd3';
  import { hoveredDataStore, tooltipPositionStore } from './stores.js';
    import Legend from './Legend.svelte';

  export let geoData;
  export let data;
  export let selectedLayer;
  export let colorScale = d3.scaleSequential().interpolator(d3.interpolateOranges);

  let svg;
  let width = 550;
  let height = 550;
  let projection = d3.geoIdentity().reflectY(true);
  let path = d3.geoPath().projection(projection);

  let hoveredData = null;
  let tooltipX = 0;
  let tooltipY = 0;
  let currentGEOID = null;

  let joinedFeatures = [];
  let neighborhoodMap = new Map();
  let neighborhoodLabels = [];
  let neighborhoodBoundaries = [];

  onMount(async () => {
    const neighborhoodData = await d3.csv('data_csv/evict_neighborhoods.csv');
    neighborhoodMap = new Map(neighborhoodData.map(d => [d.GEOID, d.neighborhood]));
  });

  $: if (geoData && data && selectedLayer && neighborhoodMap.size > 0) {
    const dataMap = new Map(data.map(d => [String(d.GEOID), d]));

    joinedFeatures = geoData.features.map(f => {
      const geoID = f.properties?.GEOID10;
      const row = dataMap.get(String(geoID));
      const neighborhood = neighborhoodMap.get(String(geoID));

      return {
        ...f,
        properties: {
          ...f.properties,
          value: row ? row[selectedLayer] : null,
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
          colorScale.domain([60000, 12000]); // Invert for income
        } else if (selectedLayer === 'eviction_rate') {
          colorScale.domain([0.0, 10.0]);
        } else {
          colorScale.domain([min, max]);
        }
    }

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



<div class="map-wrapper">
  <div class="map-inner">
    <div class="map-content">
      <svg
        bind:this={svg}
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        class="map-svg"
      >
        {#each joinedFeatures as feature}
          <path
            d={path(feature)}
            fill={feature.properties.value != null ? colorScale(feature.properties.value) : '#eee'}
            stroke="#fff"
            stroke-width="0.5"
            class={feature.properties.value == null ? 'missing-data' : ''}
            on:mouseenter={(e) => {
              const newGEOID = String(feature.properties.GEOID10);
              if (newGEOID !== currentGEOID) {
                const hovered = data.find(d => String(d.GEOID) === newGEOID);
                hoveredDataStore.set(hovered);
                tooltipPositionStore.set({ x: e.clientX, y: e.clientY });
                currentGEOID = newGEOID;    
              }
            }}
            on:mouseleave={() => {
              hoveredDataStore.set(null);
              currentGEOID = null;
            }}
          />
        {/each}

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

        {#each neighborhoodLabels as label}
          <text x={label.x} y={label.y} class="neighborhood-label">
            {label.neighborhood}
          </text>
        {/each}
      </svg>

<!--The component for legend-->

  <Legend {selectedLayer} {colorScale} />


<style>
  .map-wrapper {
    position: relative;
  }

  .map-inner {
    background: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 650px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .map-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .map-svg {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: auto;
  }





  .missing-data {
    stroke: #999;
    stroke-dasharray: 2,2;
  }

    .neighborhood-label {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 0.6rem;
      fill: #333;
      font-weight: 700;
      text-anchor: middle;
      pointer-events: none;
      paint-order: stroke;
      stroke: rgb(250, 239, 239);
      stroke-width: 3px;
      stroke-linejoin: round;
    }

  .neighborhood-boundary {
    stroke: #000;
    stroke-width: 1.2;
    fill: none;
    pointer-events: none;
    opacity: 0.6;
  }

  .exploding-tooltip {
    position: absolute;
    background: white;
    border: 2px solid #AD7F65;
    border-radius: 1rem;
    padding: 0.75rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    font-size: 0.85rem;
    z-index: 100;
    pointer-events: none;
  }

  .exploding-tooltip textarea {
    width: 100%;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.4rem;
    font-size: 0.85rem;
    border: 1px solid #ccc;
    resize: vertical;
  }
</style>

