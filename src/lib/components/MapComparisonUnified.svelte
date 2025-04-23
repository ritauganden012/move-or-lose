<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import ChoroplethMap from './ChoroplethMap.svelte';
  import SidePanel from './SidePanel.svelte';
  import { hoveredDataStore, clickedDataStore, tooltipPositionStore } from './stores.js';

  let geoData = null;
  let evictData = [];
  const selectedLayerA = 'eviction_rate';
  let selectedLayerB = 'r_mhi';
  let clickedData = null;
  let currentSelected = null;

  clickedDataStore.subscribe(val => {
    clickedData = val;
    currentSelected = clickedData && !currentSelected ? clickedData : null;
  });

  onMount(async () => {
    geoData = await d3.json('data_csv/census_tracts_boston_projected.geojson');
    evictData = await d3.csv('data_csv/evict_processed.csv', d3.autoType);
  });

  function getLayerLabel(layer) {
    const labels = {
      eviction_rate: 'Eviction Filings',
      corp_own_rate: 'Corporate Ownership',
      r_mhi: 'Renter Income',
      non_white_rate: 'Demographics'
    };
    return labels[layer] || layer;
  }
</script>

<div class="map-comparison-wrapper">
    <h2 class="comparison-title">
        Comparing: {getLayerLabel(selectedLayerA)} vs
        <span class="highlighted-selection"> {getLayerLabel(selectedLayerB)}</span>
      </h2>


  <div class="map-dual">
    <div class="map-side">
      <div class="control-group align-right">
        <label>Map A:</label>
        <button class="toggle-button selected">Evictions</button>
      </div>
      {#if geoData && evictData.length > 0}
        <ChoroplethMap geoData={geoData} data={evictData} selectedLayer={selectedLayerA} />
      {:else}
        <p>Loading Map A...</p>
      {/if}
    </div>
    <div class="map-side">
      <div class="control-group align-right">
        <label>Map B:</label>
        <button on:click={() => selectedLayerB = 'r_mhi'} class:selected={selectedLayerB === 'r_mhi'} class="toggle-button">Renter Income</button>
        <button on:click={() => selectedLayerB = 'non_white_rate'} class:selected={selectedLayerB === 'non_white_rate'} class="toggle-button">Demographics</button>
        <button on:click={() => selectedLayerB = 'corp_own_rate'} class:selected={selectedLayerB === 'corp_own_rate'} class="toggle-button">Ownership</button>
      </div>
      {#if geoData && evictData.length > 0}
        <ChoroplethMap geoData={geoData} data={evictData} selectedLayer={selectedLayerB} />
      {:else}
        <p>Loading Map B...</p>
      {/if}
    </div>
  </div>

  <div class="side-panel-container">
    {#if clickedData && !currentSelected}
      <SidePanel data={evictData} />
    {:else}
      <div class="side-panel-placeholder">
        <h3>Want to know more about a particular census tract?</h3>
        <p>Click on any census tract to explore eviction, income, ownership, and demographic metrics.</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .map-comparison-wrapper {
    background: #fafafa;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }
  .comparison-title {
    /* font-family: 'Montserrat', sans-serif; */
    /* font-size: 1.5rem; */
    color: #2A5881;
    text-align: left;
    margin-bottom: 1rem;
  }

  .highlighted-selection {
    color:  #425206;
    background-color:#E0E6AF;
    padding: 0 0.4rem;
    border-radius: 0.25rem;
    font-weight: 600;
    }
  .control-group {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
  }
  .control-group label {
    font-weight: bold;
    color: #4F1F05;
  }
  .toggle-button {
    padding: 0.3rem 0.6rem;
    background-color: #BFE0FF;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.85rem;
    color: #2A5881;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .toggle-button:hover {
    background-color: #E0E6AF;
  }
  .toggle-button.selected {
    background-color: #E0E6AF;
  }
.map-dual {
  display: flex;
  flex: 1;
  gap: 1rem;
  border-radius: 1rem;
  overflow: hidden;
}
  .map-side {
    flex: 1;
    background: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .side-panel-container {
    margin-top: 2rem;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  .side-panel-placeholder {
    font-size: 1rem;
    color: #4F1F05;
  }
  .side-panel-placeholder h3 {
    font-size: 1.5rem;
    color: #2A5881;
  }
  .map-panel-wrapper {
  display: flex;
  gap: 1rem;
}

</style>
