<script>
  import { hoveredDataStore } from './stores.js';
  import { onDestroy } from 'svelte';

  export let data = []; // You pass this from MapComparisonView

  let hovered = null;
  const unsubscribe = hoveredDataStore.subscribe(value => hovered = value);
  onDestroy(() => unsubscribe());

  const metrics = ['eviction_rate', 'corp_own_rate', 'r_mhi', 'non_white_rate'];

  function getRanked(metric) {
    return [...data]
      .filter(d => d[metric] != null)
      .sort((a, b) => b[metric] - a[metric])
      .slice(0, 20); // Top 20
  }
</script>

{#if hovered}
  <div class="side-panel">
    <!-- <h2>{hovered.neighborhood}</h2> -->
    <h2>{hovered.neighborhood ?? 'Unnamed Neighborhood'}</h2>
    <p><strong>Tract:</strong> {hovered.GEOID}</p>
    <p><strong>Layer data below</strong></p>

    {#each metrics as metric}
      <div class="mini-chart">
        <h4>{metric.replace(/_/g, ' ')}</h4>
        <svg viewBox="0 0 200 40" preserveAspectRatio="none">
          {#each getRanked(metric) as d, i}
            <rect
              x={i * 10}
              y={40 - (d[metric] || 0) * 40}
              width="8"
              height={(d[metric] || 0) * 40}
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
    padding: 1.25rem 1.25rem 2rem 1.25rem; /* top, right, bottom, left */
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
  
  