<!-- HoverTooltip.svelte -->
<script>
  export let data;
  export let layer;
</script>

<div class="tooltip-container">
  <div><strong>Tract:</strong> {data.GEOID}</div>

  {#if layer === 'eviction_rate'}
  <div><strong>Eviction Trend (2020–2023)</strong></div>
  <svg
    viewBox="0 0 160 60"
    preserveAspectRatio="xMidYMid meet"
    class="tooltip-chart"
  >
    <polyline
      fill="none"
      stroke="#984835"
      stroke-width="2"
      points={
        [2020, 2021, 2022, 2023].map((year, i) => {
          const value = data[`${year}_eviction`] ?? 0;
          const x = i * 40;
          const y = 50 - value * 40; // 0 (high) to 50 (low)
          return `${x},${Math.min(Math.max(y, 0), 50)}`;
        }).join(" ")
      }
  />
</svg>

  {:else if layer === 'corp_own_rate'}
    <div>Corporate Ownership: {Math.round(data.corp_own_rate * 100)}%</div>

  {:else if layer === 'non_white_rate'}
    <div><strong>Racial Makeup</strong></div>
    <svg viewBox="0 0 160 70" preserveAspectRatio="xMidYMid meet">
      {#each ['white_rate', 'black_rate', 'hispanic_rate', 'asian_rate', 'othr_race_rate'] as race, i}
        <rect
          x={i * 30}
          y={60 - (data[race] || 0) * 60}
          width="20"
          height={(data[race] || 0) * 60}
          fill="#425206"
        />
      {/each}
    </svg>

  {:else if layer === 'r_mhi'}
    <div><strong>Income Comparison</strong></div>
    <div style="font-size: 0.85rem;">
      Renter: ${data.r_mhi} <br />
      Median: ${data.mhi} <br />
      Owner: ${data.o_mhi}
    </div>
  {/if}
</div>


<style>
  /* svg {
    display: block;
    margin-top: 0.5rem;
    max-width: 100%;
    height: auto;
  } */
  /* .tooltip-container {
    min-width: 200px;
    max-width: 280px;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.85rem;
    overflow-wrap: break-word;
  } */

  .tooltip-container{
    max-width: 320px;
    word-wrap: break-word;
  }

  .tooltip-chart {
    width: 100%;
    max-width: 160px;
    height: 60px;
    display: block;
    margin-top: 0.5rem;
  }


  .tooltip-text {
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }

  .plot-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.25rem 0;
  }

  svg {
    width: 100%;
    max-width: 160px;
    height: auto;
  }


</style>

