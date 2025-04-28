<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import ChoroplethMap from './ChoroplethMap.svelte';
  import SidePanel from './SidePanel.svelte';
  import Tooltip from './Tooltip.svelte';
  import { hoveredDataStore, clickedDataStore, tooltipPositionStore, layerDataStore, currentGEOIDStore } from './stores.js';
  const defaultClickedData = null;

  let geoData = null;
  let evictData = [];
  const selectedLayerA = 'eviction_rate';
  let selectedLayerB = 'r_mhi';
  let clickedData = null;
  let currentSelected = null;
  let hoveredData = null;
  let tooltipX = 0;
  let tooltipY = 0;
  let layerData = null;

  // Subscribe to stores for tooltip updates
  hoveredDataStore.subscribe(val => {
    hoveredData = val;
    if (val) {
      console.log('Tooltip data:', {
        neighborhood: val.neighborhood,
        value: val.value,
        layer: layerData || selectedLayerA
      });
    }
  });

  tooltipPositionStore.subscribe(pos => {
    tooltipX = pos.x;
    tooltipY = pos.y;
  });

  layerDataStore.subscribe(val => {
    layerData = val;
  });

  clickedDataStore.subscribe(val => {
    clickedData = val;
    console.log('MapComparisonUnified received clickedData:', val);
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

<div class="map-comparison-wrapper" 
  on:click|self={() => {
    clickedDataStore.set(null);
    currentGEOIDStore.set(null);
  }}>
    <h2 class="comparison-title">
        Comparing: {getLayerLabel(selectedLayerA)} vs
        <span class="highlighted-selection"> {getLayerLabel(selectedLayerB)}</span>
    </h2>


    <div class="map-panel-wrapper">
        <div class="map-dual">
          <!-- Maps A and B -->
          <div class="map-side">
            <div class="control-group align-right">
              <label for="mapA">Map A:</label>
              <button id="mapA" class="toggle-button selected" disabled>Evictions</button>
            </div>
            {#if geoData && evictData.length > 0}
              <ChoroplethMap 
                geoData={geoData} 
                data={evictData} 
                selectedLayer={selectedLayerA}
                isMapA={true}
              />
            {:else}
              <p>Loading Map A...</p>
            {/if}
          </div>
          <div class="map-side">
            <div class="control-group align-right" role="radiogroup" aria-label="Map B Layer Selection">
              <label for="mapB">Map B:</label>
              <button 
                id="mapB-income" 
                on:click={() => selectedLayerB = 'r_mhi'} 
                class:selected={selectedLayerB === 'r_mhi'} 
                class="toggle-button"
                role="radio"
                aria-checked={selectedLayerB === 'r_mhi'}
              >Renter Income</button>
              <button 
                id="mapB-demographics" 
                on:click={() => selectedLayerB = 'non_white_rate'} 
                class:selected={selectedLayerB === 'non_white_rate'} 
                class="toggle-button"
                role="radio"
                aria-checked={selectedLayerB === 'non_white_rate'}
              >Demographics</button>
              <button 
                id="mapB-ownership" 
                on:click={() => selectedLayerB = 'corp_own_rate'} 
                class:selected={selectedLayerB === 'corp_own_rate'} 
                class="toggle-button"
                role="radio"
                aria-checked={selectedLayerB === 'corp_own_rate'}
              >Ownership</button>
            </div>
            {#if geoData && evictData.length > 0}
              <ChoroplethMap 
                geoData={geoData} 
                data={evictData} 
                selectedLayer={selectedLayerB}
                isMapA={false}
              />
            {:else}
              <p>Loading Map B...</p>
            {/if}
          </div>
        </div>

        <div class="side-panel-container">
          {#if clickedData}
            <SidePanel data={evictData} />
          {:else}
            <div class="side-panel-placeholder">
              <h3>Want to know more about a particular census tract?</h3>
              <p>Click on any census tract to explore eviction, income, ownership, and demographic metrics.</p>
            </div>
          {/if}
        </div>
    </div>

    <!-- Synchronized tooltips for both maps -->
    {#if hoveredData}
      <!-- Left map tooltip -->
      <div
        class="floating-tooltip map-a-tooltip"
        class:visible={hoveredData !== null}
        style="
          top: {tooltipY + 20}px; 
          left: {hoveredData.sourceMap === 'A' ? 
            // When hovering left map, position tooltip to the right of cursor
            tooltipX + 20 : 
            // When hovering right map, position tooltip at equivalent position in left map
            Math.max(20, window.innerWidth / 4 - (window.innerWidth / 2 - tooltipX))}px"
      >
        <Tooltip 
          data={{
            ...hoveredData,
            value: hoveredData.eviction_rate
          }}
          layer="eviction_rate"
        />
      </div>

      <!-- Right map tooltip -->
      <div
        class="floating-tooltip map-b-tooltip"
        class:visible={hoveredData !== null}
        style="
          top: {tooltipY + 20}px; 
          left: {hoveredData.sourceMap === 'B' ? 
            // When hovering right map, position tooltip to the right of cursor
            tooltipX + 20 : 
            // When hovering left map, position tooltip at equivalent position in right map
            Math.min(window.innerWidth - 320, window.innerWidth / 2 + (tooltipX - window.innerWidth / 4))}px"
      >
        <Tooltip 
          data={{
            ...hoveredData,
            value: hoveredData[selectedLayerB]
          }}
          layer={selectedLayerB}
        />
      </div>
    {/if}
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
    .map-panel-wrapper {
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      margin-top: 2rem;
      pointer-events: none;
    }
    
    .map-dual, .side-panel-container {
      pointer-events: auto;
    }

    .map-dual {
    flex: 2;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    }

    .side-panel-container {
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    }

  .map-side {
    flex: 1;
    background: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .side-panel-placeholder {
    font-size: 0.9rem;
    color: #4F1F05;
  }

  .side-panel-placeholder h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #2A5881;
  }

  .floating-tooltip {
    position: fixed;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    font-family: "Source Sans 3", sans-serif;
    font-size: 0.9rem;
    color: #3c2a1e;
    z-index: 9999;
    pointer-events: none;
    max-width: 360px;
    min-width: 280px;
    max-height: 85vh;
    overflow-y: auto;
    backdrop-filter: blur(5px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
  }

  .map-a-tooltip {
    transform-origin: left top;
  }

  .map-b-tooltip {
    transform-origin: left top;
  }

  .floating-tooltip.visible {
    opacity: 1;
    visibility: visible;
  }

</style>
