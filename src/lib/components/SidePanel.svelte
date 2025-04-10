<script>
  import { clickedDataStore } from './stores.js';
  import { onDestroy } from 'svelte';
  
  import { scaleLinear } from 'd3-scale';

  export let data = []; // You pass this from MapComparisonView
  console.log('Data in SidePanel:', data);

  let clickedData = null;
  let metric;
  let multiply_data = false;
  const unsubscribe = clickedDataStore.subscribe(value => clickedData = value);
  // onDestroy(() => unsubscribe());

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

  $: metricScales = metrics.reduce((scales, metricName) => {
    const metricData = getRanked(metricName);
    const values = metricData.map(d => d[metricName] || 0);
    
    scales[metricName] = scaleLinear()
      .domain([0, Math.max(...values) || 1]) // Fallback to 1 if max is 0
      .range([0, 250]);
      
    return scales;
  }, {});

  function getMultiplyFactor(metricName) {
    return ('corp_own_rate' === metricName) ? 100 : 1;
  }

  function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"],
        v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
  }

  function isHigherBetter(metricName) {
    // Define which metrics are "higher is better" vs "lower is better"
    const higherIsBetter = ['r_mhi']; // e.g., income
    return higherIsBetter.includes(metricName);
  }



</script>



{#if clickedData && clickedData.GEOID}
  <!-- <div class="side-panel"> -->
    <!-- <h2>{hovered.neighborhood}</h2> -->
    <h2>{clickedData.neighborhood ?? 'Unnamed Neighborhood'} 
      <span class="tract-id">(Tract {clickedData.GEOID})</span>
    </h2>
    <!-- <h4><strong>Tract:</strong> {clickedData.GEOID}</h4> -->
    <p class="eviction-text">
      <span class="number">{clickedData['2023_eviction']}</span> of <span class="number">{clickedData["hh"]}</span> households had eviction filings in 2023!</p>
    {#each metrics as metric}
        {@const multiply_data = getMultiplyFactor(metric)}
        <div class="mini-chart">
        <h4>{metric_names[metric]}: {clickedData[metric] != null ? (clickedData[metric] * multiply_data).toFixed(2) : 'N/A'}</h4>
        <!-- <p><strong>Rank</strong>: {clickedData["rank_" + metric]} of 167</p> -->
        <p>
          Rank {clickedData["rank_" + metric]} / 167 → 
          {clickedData["rank_" + metric]}
          {getOrdinal(clickedData["rank_" + metric])}
          {isHigherBetter(metric) ? ' highest' : ' lowest'} among 167 census tracts
        </p>
      
        <!-- {@debug hovered, metric} -->
        <svg viewBox="0 0 1670 250" preserveAspectRatio="none"> 
          <!-- 1670 data rows in our dataset -->
          {#each getRanked(metric) as d, i}
        
          <!-- {@debug d, i} -->
            {i}
            <rect
              x={i * 10}
              y={250 - metricScales[metric]((d[metric]) || 0)}
              width={d.GEOID === clickedData.GEOID ? 10 : 5}
              height={(metricScales[metric](d[metric]) || 0)}
              fill={d.GEOID === clickedData.GEOID ? '#984835' : '#ccc'}

            />
          {/each}

          <rect
              x={metric === 'r_mhi' ? (1660 - clickedData['rank_' + metric] * 10 - 5): (clickedData['rank_' + metric] * 10 - 5)}
              y={250 - metricScales[metric]((clickedData[metric]) || 0)}
              width=75
              height={(metricScales[metric](clickedData[metric]) || 0)}
              fill= {'#984835'}

            />
        </svg>
      </div>
    {/each}

    <div class="banner">Click anywhere on the map to clear the pane!</div>
  <!-- </div> -->
{/if}
  
<style>
  .side-panel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background: white;
    border-left: 2px solid #AD7F65;
    padding: 0.5rem 2rem 2rem 2rem; /* top, right, bottom, left */
    width: 75vw;
    max-width: 100%;
    height: auto;
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
    margin-top: 0.2;
    padding-top: 0;
    font-size: 1.5rem;
    color: #4F1F05;
    word-break: break-word;
  }

  .side-panel p {
    margin: 0.25rem 0;
  }

  .mini-chart {
    margin-top: 1rem;
  }

  .mini-chart h4 {
    margin-top: 0.3rem;
    margin-bottom: 0.25rem;
    font-size: 0.95rem;
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

  .banner {
    position: absolute;
    bottom: 5%;
    right: 2.5%;
    max-width: 18%;
    background-color: #4F1F05;
    color: white;
    text-align: center;
    padding: 2rem, 2rem;
    font-weight: bold;
    font-size: 1rem;
    z-index: 1000;
    border: #4F1F05 2px solid;
    border-radius: 0.5rem;
  }

  .eviction-text{
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    font-size: 2rem 0;
    color: #333;
    font-weight: 500;
  }

  .eviction-text .number{
    font-size: 1.2rem;
    font-weight: bolder;
    color: #4F1F05;
  }

  .tract-id {
    font-weight: normal;
    font-style: normal;
    font-size: 0.9rem;
    color: #555; /* optional: make it a bit lighter */
  }

</style>
  
  