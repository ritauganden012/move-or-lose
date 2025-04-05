<script>
    import * as d3 from 'd3';

    export let colorScale; // d3 scaleSequential
    export let width = 200;
    export let height = 10;
    export let label = "Eviction Rate (%)";

    const ticks = 5;

    let gradientId = 'legend-gradient';

    let min = colorScale.domain()[0];
    let max = colorScale.domain()[1];
    let tickValues = d3.range(ticks).map(i => min + i * (max - min) / (ticks - 1));
  </script>

  <div class="legend-container">
    <div class="legend-label">{label}</div>
    <svg width={width} height={height + 20}>
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
          {#each d3.range(0, 1.01, 0.01) as t}
            <stop offset={`${t * 100}%`} stop-color={colorScale(min + t * (max - min))} />
          {/each}
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill={`url(#${gradientId})`} stroke="#ccc" />
      {#each tickValues as tick, i}
        <text
          x={(i / (ticks - 1)) * width}
          y={height + 14}
          font-size="10"
          text-anchor="middle"
          fill="#4F1F05"
        >
          {tick.toFixed(1)}
        </text>
      {/each}
    </svg>
  </div>

  <style>
    .legend-container {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 12px;
      margin-top: 1rem;
      margin-left: 0.5rem;
      color: #4F1F05;
    }

    .legend-label {
      margin-bottom: 4px;
      font-weight: 500;
    }
  </style>
