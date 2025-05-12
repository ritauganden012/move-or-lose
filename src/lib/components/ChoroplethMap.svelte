<script>
  import { onMount } from "svelte";
  import Tooltip from "./Tooltip.svelte";
  import * as d3 from "d3";

  import {
    layerDataStore,
    hoveredDataStore,
    tooltipPositionStore,
    currentGEOIDStore,
    clickedDataStore,
  } from "./stores.js";
  import Legend from "./Legend.svelte";

  export let geoData;
  export let data;
  export let selectedLayer;
  // Identify which map this is (for debugging)
  export let isMapA = false;
  $: console.log(`Map ${isMapA ? 'A' : 'B'} rendering with layer:`, selectedLayer);
  export let colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateOranges);

  let svg;
  let width = 620;
  let height = 620;
  let projection = d3.geoIdentity().reflectY(true);
  let path = d3.geoPath().projection(projection);

  let hoveredData = null;
  let tooltipX = 0;
  let tooltipY = 0;
  let currentGEOID = null;
  let layerData = null;

  hoveredDataStore.subscribe((val) => (hoveredData = val));
  layerDataStore.subscribe((val) => (layerData = val));
  tooltipPositionStore.subscribe((pos) => {
    tooltipX = pos.x;
    tooltipY = pos.y;
  });

  let joinedFeatures = [];
  let bostonFeatures = [];
  let neighborhoodMap = new Map();
  let neighborhoodLabels = [];
  let neighborhoodBoundaries = [];

  onMount(async () => {
    const neighborhoodData = await d3.csv("data_csv/evict_neighborhoods.csv");
    neighborhoodMap = new Map(
      neighborhoodData.map((d) => [d.GEOID, d.neighborhood])
    );
  });

  $: $currentGEOIDStore;

  $: if (geoData && data && selectedLayer && neighborhoodMap.size > 0) {
    console.log('Processing data:', { dataLength: data.length, selectedLayer });
    
    // Create a map of GEOID to full data row
    const dataMap = new Map(data.map((d) => {
      console.log('Data row:', d);
      return [String(d.GEOID), d];
    }));

    joinedFeatures = geoData.features.map((f) => {
      const geoID = f.properties?.GEOID10;
      const row = dataMap.get(String(geoID));
      const neighborhood = neighborhoodMap.get(String(geoID));

      if (row) {
        console.log('Found matching data for GEOID:', geoID, row[selectedLayer]);
      }

      return {
        ...f,
        properties: {
          ...f.properties,
          value: row ? row[selectedLayer] : null,
          neighborhood: neighborhood || "Unknown",
          fullData: row // Store the full data row for tooltip access
        },
      };
    });

    bostonFeatures = joinedFeatures.filter((f) => f.properties.value != null);
    console.log('Processed features:', bostonFeatures.length);

    projection = d3.geoIdentity().reflectY(true).fitSize([width, height], {
      type: "FeatureCollection",
      features: bostonFeatures,
    });

    path = d3.geoPath().projection(projection);
  }

  $: if (selectedLayer && bostonFeatures.length > 0) {
    console.log('ChoroplethMap: Updating colorScale for layer:', selectedLayer);
    // Force colorScale to be reactive
    colorScale = undefined;
    const values = bostonFeatures
      .map((f) => f.properties.value)
      .filter((v) => v != null);
    const [min, max] = d3.extent(values);

    switch (selectedLayer) {
      case "r_mhi":
        colorScale = d3
          .scaleSequential()
          .domain([60000, 12000])
          .interpolator(d3.interpolateBlues);
        break;

      case "eviction_rate":
        colorScale = d3
          .scaleSequential()
          .domain([0.0, 10.0])
          .interpolator(d3.interpolateOranges);
        break;

      case "corp_own_rate":
        colorScale = d3
          .scaleSequential()
          .domain([min, max])
          .interpolator(d3.interpolateGreens);
        break;

      case "non_white_rate":
        colorScale = d3
          .scaleSequential()
          .domain([min, max])
          .interpolator(d3.interpolatePurples);
        break;
    }
  }

  $: if (joinedFeatures.length > 0) {
    const groups = d3.group(joinedFeatures, (d) => d.properties.neighborhood);

    neighborhoodLabels = Array.from(groups, ([neighborhood, features]) => {
      const valid = features.filter((f) => f.properties.value != null);
      if (valid.length === 0) return null;

      const centroids = valid.map((f) => path.centroid(f));
      const avgX = d3.mean(centroids, (d) => d[0]);
      const avgY = d3.mean(centroids, (d) => d[1]);

      return {
        neighborhood,
        x: avgX,
        y: avgY,
        width: neighborhood.length * 5.5, // Rough estimate of text width
        height: 12, // Text height based on font size
      };
    }).filter(Boolean);

    d3.forceSimulation(neighborhoodLabels)
      .force("x", d3.forceX((d) => d.x).strength(0.8)) // Stay close to original position
      .force("y", d3.forceY((d) => d.y).strength(0.8))
      .force(
        "collision",
        d3.forceCollide().radius(
          (d) => Math.sqrt((d.width / 2) ** 2 + (d.height / 2) ** 2) + 1 // Create padding
        )
      )
      .stop()
      .tick(100); // Run 100 iterations immediately

    neighborhoodBoundaries = Array.from(groups, ([neighborhood, features]) => ({
      neighborhood,
      features,
    }));
  }
</script>

<!-- <div class="map-wrapper">
  <div class="map-inner">
    <div class="map-content"> -->
<svg
  bind:this={svg}
  viewBox="0 0 600 600"
  preserveAspectRatio="xMidYMid meet"
  class="map-svg"
>
  {#each joinedFeatures as feature}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <path
      role="tooltip"
      d={path(feature)}
      fill={feature.properties.value != null
        ? colorScale(feature.properties.value)
        : "#eee"}
      stroke="#fff"
      stroke-width="0.5"
      class={feature.properties.value == null ? "missing-data" : ""}
      class:highlighted={$currentGEOIDStore === feature.properties.GEOID10}
      class:inactive={$currentGEOIDStore && $currentGEOIDStore !== feature.properties.GEOID10}
      on:mousemove={(e) => {
        const newGEOID = String(feature.properties.GEOID10);
        const fullData = feature.properties.fullData;
        
        if (fullData) {
          const enrichedData = {
            ...fullData,
            neighborhood: feature.properties.neighborhood,
            GEOID10: newGEOID,
            GEOID: newGEOID,
            value: feature.properties.value,
            // Include both layers' values
            eviction_rate: fullData.eviction_rate,
            r_mhi: fullData.r_mhi,
            non_white_rate: fullData.non_white_rate,
            corp_own_rate: fullData.corp_own_rate,
            // Flag which map triggered the hover
            sourceMap: isMapA ? 'A' : 'B'
          };

          // Update all stores
          hoveredDataStore.set(enrichedData);
          tooltipPositionStore.set({ x: e.clientX, y: e.clientY });
          currentGEOIDStore.set(newGEOID);
        }
      }}
      on:mouseleave={() => {
        if ($currentGEOIDStore === feature.properties.GEOID10) {
          hoveredDataStore.set(null);
          tooltipPositionStore.set({ x: 0, y: 0 });
          currentGEOIDStore.set(null);
        }
      }}
      on:click|stopPropagation={(e) => {
        e.preventDefault();
        const geoID = String(feature.properties.GEOID10);
        const clickedDatum = data.find(d => String(d.GEOID) === geoID);
        
        if (clickedDatum) {
          const enrichedData = {
            ...clickedDatum,
            neighborhood: neighborhoodMap.get(geoID) || 'Unknown',
            GEOID10: geoID,
            GEOID: geoID,
            value: feature.properties.value
          };
          
          console.log('Setting clicked data:', enrichedData);
          clickedDataStore.set(enrichedData);
          currentGEOIDStore.set(geoID);
        }
      }}
    />
  {/each}

  {#each neighborhoodBoundaries as group}
    <path
      d={path({
        type: "FeatureCollection",
        features: group.features,
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

<Legend {selectedLayer} colorScale={colorScale} />



<!-- </div> -->

<style>


  .map-svg {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: auto;
  }

  /* for highlighting hovered/selected tracts */
  path.inactive {
    opacity: 0.3;
    transition: opacity 0.2s ease;
  }

  path.highlighted {
    opacity: 1;
    stroke: #222;
    stroke-width: 1.2;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
    transition: stroke 0.2s ease;
  }



  .missing-data {
    stroke: #999;
    stroke-dasharray: 2, 2;
  }

  .neighborhood-label {
    font-family: "Source Sans 3", sans-serif;
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
    stroke-width: 0.2px;
    fill: none;
    pointer-events: none;
    opacity: 0.4;
  }


</style>
