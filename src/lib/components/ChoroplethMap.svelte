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
  export let clickedData;
  export let colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateOranges);

  let svg;
  let width = 550;
  let height = 550;
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
    const dataMap = new Map(data.map((d) => [String(d.GEOID), d]));

    joinedFeatures = geoData.features.map((f) => {
      const geoID = f.properties?.GEOID10;
      const row = dataMap.get(String(geoID));
      const neighborhood = neighborhoodMap.get(String(geoID));

      return {
        ...f,
        properties: {
          ...f.properties,
          value: row ? row[selectedLayer] : null,
          neighborhood: neighborhood || "Unknown",
        },
      };
    });

    bostonFeatures = joinedFeatures.filter((f) => f.properties.value != null);

    projection = d3.geoIdentity().reflectY(true).fitSize([width, height], {
      type: "FeatureCollection",
      features: bostonFeatures,
    });

    path = d3.geoPath().projection(projection);
  }

  $: if (selectedLayer && bostonFeatures.length > 0) {
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
      class:dimmed={$currentGEOIDStore &&
        $currentGEOIDStore !== feature.properties.GEOID10}
      on:mouseenter={(e) => {
        const newGEOID = String(feature.properties.GEOID10);
        const neighborhood = neighborhoodMap.get(newGEOID) || "Unknown";

        // only do the following if neighborhood is known
        if (neighborhood !== "Unknown") {
          if (newGEOID !== currentGEOID) {
            const hoveredDatum = data.find((d) => String(d.GEOID) === newGEOID);

            hoveredDataStore.set({
              ...hoveredDatum,
              neighborhood,
            });

            // hoveredDataStore.set(hovered);
            layerDataStore.set(selectedLayer);
            tooltipPositionStore.set({ x: e.clientX, y: e.clientY });
            currentGEOID = newGEOID;
          }

          currentGEOIDStore.set(newGEOID);
        }
      }}
      on:mouseleave={() => {
        const newGEOID = String(feature.properties.GEOID10);
        const neighborhood = neighborhoodMap.get(newGEOID) || "Unknown";

        if (neighborhood !== "Unknown") {
          hoveredDataStore.set(null);
          currentGEOID = null;

          currentGEOIDStore.set(null);
        }
      }}
      on:click={() => {
        const clickedDatum = data.find(
          (d) => String(d.GEOID) === String(feature.properties.GEOID10)
        );
        clickedDataStore.set({
          ...clickedDatum,
          neighborhood:
            neighborhoodMap.get(String(feature.properties.GEOID10)) ||
            "Unknown",
        });
        console.log("Clicked data:", clickedDatum);
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

<Legend {selectedLayer} {colorScale} />

{#if hoveredData}
  <div
    class="floating-tooltip"
    style="top: {tooltipY + 20}px; left: {tooltipX + 20}px"
  >
    <Tooltip data={hoveredData} layer={layerData} />
  </div>
{/if}

<!-- </div> -->

<!-- {#if hoveredData}
      <div
        class="exploding-tooltip floating"
        style="top: {tooltipY + 10}px; left: {tooltipX + 10}px;"
      >
        <Tooltip data={hoveredData} layer={selectedLayer} />
      </div>
    {/if} -->
<!-- </div>
</div> -->

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

  /* for highlighting hovered/selected tracts */
  path.dimmed {
    opacity: 0.3;
    transition: opacity 0.2s ease;
    pointer-events: none; /* optional: prevent hover conflict */
  }

  path.highlighted {
    opacity: 1;
    stroke: #222;
    stroke-width: 1.2;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
    transition: stroke 0.2s ease;
  }

  .floating-tooltip {
    position: fixed;
    background: rgba(255, 255, 255, 0.96); /* subtle transparency */
    /* border: 1.5px solid #AD7F65; */
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    font-family: "Source Sans 3", sans-serif;
    font-size: 0.9rem;
    color: #3c2a1e;
    z-index: 100;
    pointer-events: none;

    max-width: 360px;
    min-width: 280px;
    max-height: 85vh;
    overflow-y: auto;

    backdrop-filter: blur(5px);
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

  .exploding-tooltip {
    position: absolute;
    background: white;
    border: 2px solid #ad7f65;
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
