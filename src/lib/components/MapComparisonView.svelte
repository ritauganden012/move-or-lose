<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import ChoroplethMap from './ChoroplethMap.svelte';
  import Tooltip from './Tooltip.svelte';
  import { layerDataStore, hoveredDataStore, tooltipPositionStore } from './stores.js';
  import { get } from 'svelte/store';

  let geoData = null;
  let evictData = [];
  let selectedLayerA = 'eviction_rate';
  let selectedLayerB = 'eviction_rate';

  let hoveredData = null;
  let layerData = null;
  let tooltipX = 0;
  let tooltipY = 0;

  layerDataStore.subscribe(value => layerData = value);
  hoveredDataStore.subscribe(value => hoveredData = value);
  tooltipPositionStore.subscribe(value => {
    tooltipX = value.x;
    tooltipY = value.y;
  });

  onMount(async () => {
    geoData = await d3.json('data_csv/census_tracts_boston_projected.geojson');
    evictData = await d3.csv('data_csv/evict_processed.csv', d3.autoType);
  });

  function getLayerLabel(layer) {
    const labels = {
      eviction_rate: 'Eviction Rate',
      corp_own_rate: 'Corporate Ownership',
      r_mhi: 'Income',
      non_white_rate: 'Demographics'
    };
    return labels[layer] || layer;
  }
</script>

<div class="page-layout">
  <div class="header">More-or-Lose: Corporate Ownership & Evicitions in Boston</div>
  <div class="maps-container">
    <div class="map-panel">
      <div class="panel-title">
        City of Boston — {getLayerLabel(selectedLayerA)}
      </div>
      <div class="toggle-buttons">
        <button class="toggle-button" on:click={() => selectedLayerA = 'eviction_rate'}>Eviction Rate</button>
        <button class="toggle-button" on:click={() => selectedLayerA = 'corp_own_rate'}>Corporate Ownership</button>
        <button class="toggle-button" on:click={() => selectedLayerA = 'r_mhi'}>Income</button>
        <button class="toggle-button" on:click={() => selectedLayerA = 'non_white_rate'}>Demographics</button>
      </div>
      {#if geoData && evictData.length > 0}
        <ChoroplethMap geoData={geoData} data={evictData} selectedLayer={selectedLayerA} />
      {:else}
        <div class="map-svg">
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#AD7F65">
            Loading Map A...
          </text>
        </div>
      {/if}
    </div>

    <div class="map-panel">
      <div class="panel-title">
        City of Boston — {getLayerLabel(selectedLayerB)}
      </div>
      <div class="toggle-buttons">
        <button class="toggle-button" on:click={() => selectedLayerB = 'eviction_rate'}>Eviction Rate</button>
        <button class="toggle-button" on:click={() => selectedLayerB = 'corp_own_rate'}>Corporate Ownership</button>
        <button class="toggle-button" on:click={() => selectedLayerB = 'r_mhi'}>Income</button>
        <button class="toggle-button" on:click={() => selectedLayerB = 'non_white_rate'}>Demographics</button>
      </div>
      {#if geoData && evictData.length > 0}
        <ChoroplethMap geoData={geoData} data={evictData} selectedLayer={selectedLayerB} />
      {:else}
        <div class="map-svg">
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#AD7F65">
            Loading...
          </text>
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
  {#if hoveredData}
    <div class="floating-tooltip" style="top: {tooltipY + 20}px; left: {tooltipX + 20}px">
      <Tooltip
        data={hoveredData}
        layer={layerData}
      />
    </div>
  {/if}

</div>

<style>
  .page-layout {
    position: relative;
    padding: 2rem;
    background-color: #EAE7DC;
    font-family: 'Source Sans 3', sans-serif;
    color: #4F1F05;
  }

  .header {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #4F1F05;
    text-align: left;
  }

  .maps-container {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;
    width: 75vw;
    max-width: 100%;
  }

  .map-panel {
    flex: 1;
    height: 750px;
    background: white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
  }

  .panel-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: #4F1F05;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .toggle-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .toggle-button {
    padding: 0.4rem 0.8rem;
    background-color: #BFE0FF;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.9rem;
    color: #2A5881;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .toggle-button:hover {
    background-color: #E0E6AF;
  }

  .map-svg {
    width: 100%;
    height: auto;
    flex: 1;
    border: none;
    background-color: #fefefe;
  }

  .floating-tooltip {
    position: fixed;
    background: white;
    border: 2px solid #AD7F65;
    border-radius: 1rem;
    padding: 0.75rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    font-size: 0.85rem;
    z-index: 100;
    pointer-events: none;
    max-width: 360px;
    min-width: 280px;
    max-height: 90vh;
    overflow-y: auto;
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
