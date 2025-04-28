<!-- HoverTooltip.svelte -->
<script>
  export let data;
  export let layer;

  let maxEviction;

  const renter = data?.r_mhi ?? 0;
  const median = data?.mhi ?? 0;
  const owner = data?.o_mhi ?? 0;
  const barColors = ['#2A5881', '#bcd4e6', '#bcd4e6'];
  const raceKeys = [
    { key: 'black_rate', label: 'Black', color: '#8C6BB1' },
    { key: 'hispanic_rate', label: 'Latinx', color: '#D95F02' },
    { key: 'asian_rate', label: 'Asian', color: '#1B9E77' },
    { key: 'white_rate', label: 'White', color: '#7B9E89' },
    { key: 'othr_race_rate', label: 'Other', color: '#999' }
  ];
  const races = ['white_rate', 'black_rate', 'hispanic_rate', 'asian_rate', 'othr_race_rate'];

  const years = [2020, 2021, 2022, 2023];
  const barValues = [renter, owner, median];
  const maxBarValue = Math.max(...barValues, 1); // avoid div by 0

  $: raceValues = races.map((key) => data?.[key] ?? 0);
  $: maxRace = Math.max(...raceValues, 0.01);

  $: barHeights = barValues.map(v => (v / maxBarValue) * 80);

  $: linePoints = (() => {
    const values = years.map((year) => data?.[`${year}_eviction`] ?? 0);
    const maxValue = Math.max(...values, 0.01); // prevent div by 0
    maxEviction = maxValue;

    return years.map((year, i) => {
      const value = data?.[`${year}_eviction`] ?? 0;
      const x = i * 40 + 12;
      const y = 50 - (value / maxValue) * 40;
      return `${x},${Math.min(Math.max(y, 0), 50)}`;
    }).join(" ");
  })();

  $: filePosition = (() => {
    let y_shift;
    if (maxEviction <= 1.25 * (data?.['2023_eviction'] ?? 0)) {
      y_shift = 16;
    } else {
      y_shift = -10;
    }
    return 50 - (data?.['2023_eviction'] ?? 0) / maxEviction * 40 + y_shift;
  })();
</script>

<div class="tooltip-container">
  <div class="tooltip-title">
    <strong>{data.neighborhood ?? 'Unnamed Neighborhood'}</strong>
    <span class="tract-id"> (tract: {data.GEOID})</span> <br>
    <span class="tract-pop">Population: {data.pop}</span>
  </div>

  {#if layer === 'eviction_rate'}
  <div class="tooltip-section-heading"><strong>Eviction Filings (2020–2023)</strong></div>
  <svg
    viewBox="0 0 160 60"
    preserveAspectRatio="xMidYMid meet"
    class="tooltip-chart"
  >
  <line x1="0" y1="50" x2="150" y2="50" stroke="#ccc" stroke-width="1" /> <!-- X axis -->
  <line x1="0" y1="0" x2="0" y2="50" stroke="#ccc" stroke-width="1" />    <!-- Y axis -->

    {#each [2020, 2021, 2022, 2023] as year, i}
      <text
        x={i * 40 + 12}
        y="58"
        font-size="10"
        text-anchor="middle"
        fill="#555"
      >
        {year}
      </text>
    {/each}

    <text
      x={3 * 40 + 12}
      y={filePosition}
      font-size="13"
      text-anchor="middle"
      fill="#984835"
      font-weight=600
    >
      {data?.['2023_eviction'] ?? 0}
    </text>

    <circle
      cx={3 * 40 + 12}
      cy={50 - (data?.['2023_eviction'] ?? 0) / maxEviction * 40}
      r="3.5"
      fill="#984835"
      stroke="white"
      stroke-width="1"
    />

    <polyline
    fill="none"
    stroke="#984835"
    stroke-width="2"
    points={linePoints}
    />
  </svg>

  {:else if layer === 'corp_own_rate'}
  <div>
    <strong>{(data.corp_own_rate * 100).toFixed(1)}%</strong>
    of properties <br> owned by corporations
  </div>

  {:else if layer === 'non_white_rate'}
    <div class="tooltip-section-heading"><strong>Racial Makeup</strong></div>
    <svg viewBox="0 0 180 120" preserveAspectRatio="xMidYMid meet" class="tooltip-bar-chart">
      <!-- Baseline -->
      <line x1="0" y1="100" x2="180" y2="100" stroke="#ccc" stroke-width="1" />
    
      {#each raceKeys as race, i}
        {#if data[race.key] != null}
          <!-- Bar -->
          <rect
            x={i * 34 + 4}
            y={100 - data[race.key] / maxRace * 80}
            width="26"
            height={data[race.key] / maxRace * 80}
            fill={race.color}
            rx="3"
          />
    
          <!-- Value -->
          <text
            x={i * 34 + 17}
            y={100 - data[race.key] / maxRace * 80 - 6}
            text-anchor="middle"
            font-size="11"
            fill={race.color}
            font-weight="600"
          >
            {(data[race.key]).toFixed(1)}%
          </text>
    
          <!-- Label -->
          <text
            x={i * 34 + 17}
            y="115"
            text-anchor="middle"
            font-size="11"
            fill="#333"
            font-weight="600"
          >
            {race.label}
          </text>
        {/if}
      {/each}
    </svg>
    <p style="font-size: 0.85rem;">
      <strong>{data.non_white_rate.toFixed(1)}%</strong> non-white
    </p>

  {:else if layer === 'r_mhi'}
  <div class="tooltip-section-heading"><strong>Median Household Incomes</strong></div>
  <svg viewBox="0 0 200 120" class="tooltip-bar-chart" preserveAspectRatio="xMidYMid meet">
    <!-- Axes line -->
    <line x1="0" y1="100" x2="200" y2="100" stroke="#ccc" stroke-width="1" />

    {#each ['Renters', 'Owners', 'All'] as label, i}
      <!-- Actual income bar -->
      <rect
        x={i * 65 + 4}
        y={100 - (barHeights[i] ?? 0)}
        width="40"
        height={barHeights[i] ?? 0}
        fill={barColors[i]}
        rx="3"
      />

      <!-- Label -->
      <text
        x={i * 65 + 24}
        y="115"
        text-anchor="middle"
        font-size=13
        fill="#333"
        font-weight=600
      >
        {label}
      </text>
    {/each}

    <!-- Value on top of bar -->
    {#each barHeights as h, i}
      <text
        x={i * 65 + 24}
        y={100 - h - 4}
        text-anchor="middle"
        font-size=13
        fill={barColors[i]}
        font-weight=600
      >
        ${barValues[i]}
      </text>
    {/each}
  </svg>
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

  .tooltip-title {
    font-size: 0.95rem;
    /* font-weight: 600; */
    margin-bottom: 0.5rem;
    color: #2a2a2a;
  }

  .tract-id {
    font-size: 0.8rem;
    font-weight: 300;
    color: #777;
  }

  .tract-pop {
    font-size: 0.8rem;
    font-weight: 600;
    /* font-weight: 300; */
    color: #777;
  }

  .tooltip-section-heading {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  svg {
    width: 100%;
    max-width: 160px;
    height: auto;
  }

  .tooltip-bar-chart {
    width: 100%;
    height: auto;
    margin-top: 0.25rem;
  }


</style>

