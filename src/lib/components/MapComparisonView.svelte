<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import ChoroplethMap from "./ChoroplethMap.svelte";
  import Tooltip from "./Tooltip.svelte";
  import SidePanel from "./SidePanel.svelte";
  import {
    hoveredDataStore,
    clickedDataStore,
    layerDataStore,
    tooltipPositionStore,
  } from "./stores.js";

  let geoData = null;
  let evictData = [];

  let selectedLayerA = "eviction_rate";
  let selectedLayerB = "r_mhi";

  let hoveredData = null;

  let layerData = null;
  let clickedData = null;
  let tooltipX = 0;
  let tooltipY = 0;
  let currentSelected = null;

  hoveredDataStore.subscribe((val) => (hoveredData = val));
  clickedDataStore.subscribe((val) => {
    clickedData = val;
    // Now we can use conditional logic to update currentSelected
    if (clickedData && !currentSelected) {
      console.log("Not selected before:");
      currentSelected = clickedData;
    } else if (clickedData && currentSelected) {
      console.log("Already selected:");
      currentSelected = null;
    }
  });

  layerDataStore.subscribe((val) => (layerData = val));
  tooltipPositionStore.subscribe((pos) => {
    tooltipX = pos.x;
    tooltipY = pos.y;
  });

  onMount(async () => {
    geoData = await d3.json("data_csv/census_tracts_boston_projected.geojson");
    evictData = await d3.csv("data_csv/evict_processed.csv", d3.autoType);
  });

  function getLayerLabel(layer) {
    const labels = {
      eviction_rate: "Eviction Filings",
      corp_own_rate: "Corporate Ownership",
      r_mhi: "Renter Income",
      non_white_rate: "Demographics",
    };
    return labels[layer] || layer;
  }
</script>

<div class="page-layout">
  <div class="header">
    Move-or-Lose: Evictions in Boston – Income, Corporate Ownership, & Race
    Compared
  </div>
  <div class="all-container">
    <div class="map-panel">
      <div class="panel-title">
        City of Boston — {getLayerLabel(selectedLayerA)}
      </div>
      <div class="toggle-row">
        <div class="toggle-buttons">
          <!-- create an invisible placeholder to preserve height -->
          <button
            class="toggle-button"
            class:selected={selectedLayerA === "eviction_rate"}
            on:click={() => (selectedLayerA = "eviction_rate")}
            >Eviction Filings</button
          >
        </div>
      </div>
      {#if geoData && evictData.length > 0}
        <ChoroplethMap
          {geoData}
          data={evictData}
          selectedLayer={selectedLayerA}
        />
      {:else}
        <div class="map-svg">
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            fill="#AD7F65"
          >
            Loading Map A...
          </text>
        </div>
      {/if}
    </div>

    <div class="map-panel">
      <div class="panel-title">
        City of Boston — {getLayerLabel(selectedLayerB)}
      </div>
      <div class="toggle-row">
        <div class="toggle-label-inline">Compare with →</div>
        <div class="toggle-buttons">
          <button
            class="toggle-button"
            class:selected={selectedLayerB === "r_mhi"}
            on:click={() => (selectedLayerB = "r_mhi")}
          >
            Renter Income
          </button>
          <button
            class="toggle-button"
            class:selected={selectedLayerB === "corp_own_rate"}
            on:click={() => (selectedLayerB = "corp_own_rate")}
          >
            Corporate Ownership
          </button>
          <button
            class="toggle-button"
            class:selected={selectedLayerB === "non_white_rate"}
            on:click={() => (selectedLayerB = "non_white_rate")}
          >
            Demographics
          </button>
        </div>
      </div>
      {#if geoData && evictData.length > 0}
        <ChoroplethMap
          {geoData}
          data={evictData}
          selectedLayer={selectedLayerB}
        />
      {:else}
        <div class="map-svg">
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            fill="#AD7F65"
          >
            Loading...
          </text>
        </div>
      {/if}
    </div>
    <div class="side-panel-container">
      {#if clickedData && !currentSelected}
        <SidePanel data={evictData} />
      {:else}
        <div class="side-panel-placeholder">
          <h3>Want to know more about a particular census tract?</h3>
          <p>
            Click on any census tract on the map to explore more detailed
            metrics about evictions, renter income, ownership, and race. This
            side panel will show these information!
          </p>
        </div>
      {/if}
    </div>
  </div>
  <!--
  {#if hoveredData}
    <div class="floating-tooltip" style="top: {tooltipY + 20}px; left: {tooltipX + 20}px">
      <Tooltip data={hoveredData} layer={selectedLayerA} />
    </div>
  {/if} -->
</div>

<style>
  .page-layout {
    position: relative;
    padding: 2rem;
    background-color: #eae7dc;
    font-family: "Source Sans 3", sans-serif;
    color: #4f1f05;
  }

  .header {
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #4f1f05;
    text-align: left;
  }

  .main-layout {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .all-container {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;
    width: 100vw;
    /* width: calc(100% - 320px); */
    max-width: 100%;
  }

  .map-panel {
    flex: 1;
    width: 40%;
    /* height: 750px; */
    background: white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .panel-title {
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    color: #4f1f05;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .toggle-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .toggle-label-inline {
    font-size: 0.9rem;
    /* font-weight: 500; */
    color: #4f1f05;
    white-space: nowrap;
    /* should vertically align text in middle */
    display: flex;
  }

  .toggle-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .toggle-button {
    padding: 0.4rem 0.8rem;
    background-color: #bfe0ff;
    border: none;
    border-radius: 0.5rem;
    font-family: "Source Sans 3", sans-serif;
    font-size: 0.9rem;
    color: #2a5881;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .toggle-button:hover {
    background-color: #e0e6af;
  }

  .toggle-button.selected {
    background-color: #e0e6af;
  }

  .map-svg {
    width: 100%;
    height: auto;
    flex: 1;
    border: none;
    background-color: #fefefe;
  }

  .side-panel-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background: white;
    border-left: 2px solid #ad7f65;
    padding: 0rem 2rem 3rem 2rem; /* top, right, bottom, left */
    /* width: 20%; */
    width: 320px;
    max-width: 22vw;
    min-width: 280px;
    flex-shrink: 0;
    height: auto;
    z-index: 1000;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    font-family: "Source Sans 3", sans-serif;
    font-size: 0.9rem;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
  }

  .side-panel-placeholder {
    padding: 2rem;
    font-size: 1rem; /* increase font size */
    color: #4f1f05;
    line-height: 1.5;
  }

  .side-panel-placeholder h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2a5881;
  }

  .side-panel-placeholder p {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .maps-container {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .map-panel {
      width: 100%;
    }
  }
</style>
