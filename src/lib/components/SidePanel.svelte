<script>
  import { clickedDataStore } from './stores.js';
  import { onDestroy } from 'svelte';
  
  import { scaleLinear } from 'd3-scale';

  export let data = [];
  let clickedData = null;
  let metric;
  let multiply_data = false;
  
  clickedDataStore.subscribe(value => {
    if (value) {
      clickedData = value;
      console.log('SidePanel received clickedData:', clickedData);
    }
  });

  const metrics = ['eviction_rate', 'corp_own_rate', 'r_mhi', 'non_white_rate'];
  const metric_names = {
    eviction_rate: 'Eviction Rate (%)',
    corp_own_rate: 'Corporate Ownership (%)',
    r_mhi: 'Median Renter Income ($)',
    non_white_rate: '% non-white population'
  };
  

  function getRanked(metric) {
    if (!data || !Array.isArray(data)) return [];
    return [...data]
      .filter(d => d && d[metric] != null)
      .sort((a, b) => b[metric] - a[metric]);
  }

  $: metricScales = metrics.reduce((scales, metricName) => {
    const metricData = getRanked(metricName);
    if (metricData.length === 0) return scales;
    
    const values = metricData.map(d => d[metricName] || 0);
    const maxValue = Math.max(...values) || 1;
    
    scales[metricName] = scaleLinear()
      .domain([0, maxValue])
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
    const higherIsBetter = ['eviction_rate', 'corp_own_rate', 'non_white_rate']; // e.g., income
    return higherIsBetter.includes(metricName);
  }



</script>



{#if clickedData && clickedData.GEOID}
  <div class="side-panel-content">
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


  </div>
{/if}
  
<style>
  .side-panel-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;
    background: white;
    border-left: 2px solid #AD7F65;
    padding: 0.5rem 2rem 3.5rem 2rem;
    width: 75vw;
    max-width: 100%;
    height: auto;
    position: relative;
    z-index: 1000;
    box-shadow: -4px 0 10px rgba(0,0,0,0.1);
    overflow-y: auto;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.9rem;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .side-panel-content h2 {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    color: #4F1F05;
    font-weight: 600;
  }

  .side-panel-content p {
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



  .eviction-text{
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
    font-weight: 500;
  }

  .eviction-text .metric-value {
    font-size: 2rem;
    font-weight: bold;
    color: #4F1F05;
    margin: 0.25rem 0;
  }

  .tract-id {
    font-weight: normal;
    font-style: normal;
    font-size: 0.9rem;
    color: #555; /* optional: make it a bit lighter */
  }

</style>
  
  