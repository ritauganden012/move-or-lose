<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import ChoroplethMap from './ChoroplethMap.svelte';

  let geoData = null;
  let evictData = [];
  let selectedLayerA = 'eviction_rate';
  let selectedLayerB = 'eviction_rate';

  onMount(async () => {
    geoData = await d3.json('data_csv/census_tracts_boston_2010.geojson');
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

<style>
  .page-container {
    background-color: #EAE7DC;
    font-family: 'Source Sans 3', sans-serif;
    color: #4F1F05;
    padding: 2rem;
  }

  .header {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #4F1F05;
  }

  .hero-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .map-panel {
    background: white;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    height: 350px;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fefefe;
  }

  @media (max-width: 768px) {
    .hero-container {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="page-container">
  <div class="header">More-or-Lose: Corporate Ownership & Evicitions in Boston</div>

  <div class="hero-container">
    <div class="map-panel">
      <div class="panel-title">
        City of Boston — {getLayerLabel(selectedLayerA)}
      </div>


      <!---Toggle buttons -->
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
      <!-- Placeholder for map A -->

    </div>

    <div class="map-panel">
      <div class="panel-title">
        City of Boston — {getLayerLabel(selectedLayerB)}
      </div>

       <!---Toggle buttons -->
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
      <!-- Placeholder for map B -->

    </div>
  </div>
</div>
