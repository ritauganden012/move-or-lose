<script>
  import { hoveredDataStore } from './stores.js';
  import { onDestroy } from 'svelte';

  export let data = []; // You pass this from MapComparisonView
  console.log('Data in SidePanel:', data);

  let hovered = null;
  const unsubscribe = hoveredDataStore.subscribe(value => hovered = value);
  onDestroy(() => unsubscribe());

  const metrics = ['eviction_rate', 'corp_own_rate', 'r_mhi', 'non_white_rate'];
  const metric_names = {
    eviction_rate: 'Eviction Rate (%)',
    corp_own_rate: 'Corporate Ownership (%)',
    r_mhi: 'Median Renter Income ($)',
    non_white_rate: '% non-white population'
  };

  function getRanked(metric) {
    return [...data]
      .filter(d => d[metric] != null)
      .sort((a, b) => b[metric] - a[metric]);
      // .slice(0, 20); // Top 20
  }
</script>

{#if hovered}
  <div class="side-panel">
    <!-- <h2>{hovered.neighborhood}</h2> -->
    <h2>{hovered.neighborhood ?? 'Unnamed Neighborhood'}</h2>
    <p><strong>Tract:</strong> {hovered.GEOID}</p>
    <p><strong>Ranking of Tract</strong></p>

    {#each metrics as metric}
      <div class="mini-chart">
        <h4>{metric_names[metric]}: {hovered[metric] != null ? hovered[metric].toFixed(2) : 'N/A'}</h4>
        <!-- {@debug hovered, metric} -->
        <svg viewBox="0 0 1670 40" preserveAspectRatio="none"> 
          <!-- 1670 data rows in our dataset -->
          {#each getRanked(metric) as d, i}
          <!-- {@debug d, i} -->
            <rect
              x={i * 10}
              y={100 - (d[metric] || 0) * 100}
              width="8"
              height={(d[metric] || 0) * 100}
              fill={d.GEOID === hovered.GEOID ? '#984835' : '#ccc'}
            />
          {/each}
        </svg>
      </div>
    {/each}
  </div>
{/if}
  
<style>
  .side-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 320px;
    height: 100vh;
    background: white;
    border-left: 2px solid #AD7F65;
    padding: 2rem 2rem 2rem 2rem; /* top, right, bottom, left */
    z-index: 1000;
    box-shadow: -4px 0 10px rgba(0,0,0,0.1);
    overflow-y: auto;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.9rem;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .side-panel h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
    color: #4F1F05;
    word-break: break-word;
  }

  .side-panel p {
    margin: 0.5rem 0;
  }

  .mini-chart {
    margin-top: 1.5rem;
  }

  .mini-chart h4 {
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    color: #333;
  }

  svg {
    display: block; 
    max-width: 100%;
    height: auto;
  }

  h2, h4 {
    max-width: 100%;
  }

</style>
  
  