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

<div class="map-comparison-wrapper">
    <h2 class="comparison-title">
        {getLayerLabel(selectedLayerA)} vs.
        <span class="highlighted-selection"> {getLayerLabel(selectedLayerB)}</span> <span style="font-weight: 300;">at Census-Tract Level</span> 
    </h2>
    <div class="instructions">
      <p class="instructions-title">
        <span class="instruction-icon">✨</span>
        <strong>How to interact with the maps </strong>
      </p>
      <div class="instruction-grid">
        <div class="instruction-item">
          <span class="instruction-step-icon">👆</span>
          <div class="instruction-text">
            <strong>Hover</strong>
            <span>Move your cursor over any census tract to see quick stats</span>
          </div>
        </div>
        <div class="instruction-item">
          <span class="instruction-step-icon">🔍</span>
          <div class="instruction-text">
            <strong>Click</strong>
            <span>Select a tract to explore detailed metrics in the side panel</span>
          </div>
        </div>
        <div class="instruction-item">
          <span class="instruction-step-icon">🔄</span>
          <div class="instruction-text">
            <strong>Compare</strong>
            <span>Use the buttons above Map B to switch between different metrics</span>
          </div>
        </div>
      </div>
    </div>


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
          {#if clickedData && evictData && evictData.length > 0}
            <div class="side-panel-header">
              <button 
                class="clear-panel-button" 
                on:click={() => {
                  clickedDataStore.set(null);
                  currentGEOIDStore.set(null);
                }}
              >
                Clear Panel
              </button>
            </div>
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
          top: {tooltipY + 5}px; 
          left: {hoveredData.sourceMap === 'A' ? tooltipX + 5 : tooltipX - window.innerWidth/2 + 5}px"
      >
        <Tooltip 
          data={{
            ...hoveredData,
            value: hoveredData[selectedLayerA]
          }}
          layer={selectedLayerA}
        />
      </div>

      <!-- Right map tooltip (showing selected metric) -->
      <div
        class="floating-tooltip map-b-tooltip"
        class:visible={hoveredData !== null}
        style="
          top: {tooltipY + 5}px; 
          left: {hoveredData.sourceMap === 'A' ? tooltipX + (window.innerWidth/4) + 5 : tooltipX + 5}px"
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
    background: white;
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
    padding: 1rem;
  }
  .comparison-title {
    color: #2A5881;
    text-align: left;
    margin-bottom: 0.75rem;
  }

  .instructions {
    background: linear-gradient(to right, #F5F9FF, #F0F7FF);
    border: 1px solid #BFE0FF;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    box-shadow: 0 2px 8px rgba(42, 88, 129, 0.05);
  }

  .instructions-title {
    margin: 0 0 1rem 0;
    color: #2A5881;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .instruction-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .instruction-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.7);
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid rgba(191, 224, 255, 0.5);
  }

  .instruction-step-icon {
    font-size: 1.1rem;
    background: white;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(42, 88, 129, 0.1);
    border: 1px solid #E6F0FF;
  }

  .instruction-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .instruction-text strong {
    color: #2A5881;
    font-size: 0.95rem;
  }

  .instruction-text span {
    color: #666;
    font-size: 0.85rem;
    line-height: 1.4;
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
      gap: 2rem;
      margin-top: 1.5rem;
      pointer-events: none;
    }
    
    .map-dual, .side-panel-container {
      pointer-events: auto;
    }

    .map-dual {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    }

    .side-panel-container {
    flex: 0 0 320px;
    min-width: 300px;
    max-width: 320px;
    }

  .map-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    min-width: 0; /* Prevents flex child from overflowing */
  }

  .side-panel-placeholder {
    font-size: 0.9rem;
    color: #4F1F05;
  }

  .side-panel-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .clear-panel-button {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clear-panel-button:hover {
    background-color: #e5e5e5;
    color: #333;
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
