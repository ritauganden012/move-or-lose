<!-- HoverTooltip.svelte -->
<script>
    export let data;
    export let layer;
  </script>

  <div>
    <div><strong>Tract:</strong> {data.GEOID}</div>

    {#if layer === 'eviction_rate'}
      <div><strong>Eviction Trend (2020–2023)</strong></div>
      <svg width="150" height="40">
        <polyline
          fill="none"
          stroke="#984835"
          stroke-width="2"
          points={
            [2020, 2021, 2022, 2023].map((year, i) =>
              `${i * 40},${40 - (data[`${year}_eviction`] || 0) * 2}`
            ).join(" ")
          }
        />
      </svg>
    {:else if layer === 'corp_own_rate'}
      <div>Corporate Ownership: {Math.round(data.corp_own_rate * 100)}%</div>
    {:else if layer === 'non_white_rate'}
      <div><strong>Racial Makeup</strong></div>
      <svg width="150" height="60">
        {#each ['white_rate', 'black_rate', 'hispanic_rate', 'asian_rate', 'othr_race_rate'] as race, i}
          <rect x={i * 30} y={60 - (data[race] || 0) * 60} width="20" height={(data[race] || 0) * 60} fill="#425206" />
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
