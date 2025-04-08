<script>
  export let selectedLayer;
  export let colorScale;
  export let steps = 5;

  let legendLabels = [];
  let legendSteps = [];
  let gradientId = 'legend-gradient';

  $: if (selectedLayer && colorScale?.domain) {
    const [min, max] = colorScale.domain();
    const range = max - min;

    if (selectedLayer === 'r_mhi') {
      legendSteps = [95000, 75000, 65000, 55000, 30000];
      legendLabels = [];
      legendLabels[0] = 'High\n($90k+)';
      legendLabels[2] = 'Average\n(~$60k)';
      legendLabels[4] = 'Low\n(<$30k)';
    } else if (selectedLayer === 'eviction_rate') {
      legendSteps = [0, 0.1, 0.3, 0.5, 0.8];
      legendLabels = [];
      legendLabels[0] = 'Low\n(0–10%)';
      legendLabels[2] = 'Average\n(~30%)';
      legendLabels[4] = 'High\n(80%+)';
    } else if (selectedLayer === 'non_white' || selectedLayer === 'non_white_rate') {
      legendSteps = [0, 0.25, 0.5, 0.75, 0.95];
      legendLabels = [];
      legendLabels[0] = 'Mostly White\n(≤25%)';
      legendLabels[2] = 'Mixed\n(~50%)';
      legendLabels[4] = 'Majority BIPOC\n(≥90%)';
    } else {
      legendSteps = Array.from({ length: steps }, (_, i) =>
        min + (range * i) / (steps - 1)
      );
      legendLabels = legendSteps.map((value) => {
        if (selectedLayer.includes('rate') || selectedLayer.includes('percent')) {
          return `${(value * 100).toFixed(0)}%`;
        }
        return value.toFixed(1);
      });
    }
  }
</script>

<div class="legend">
  <svg viewBox="0 0 220 70" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        {#each Array.from({ length: 20 }, (_, i) => i / 19) as t}
          <stop offset="{t * 100}%" stop-color="{colorScale(colorScale.domain()[0] + t * (colorScale.domain()[1] - colorScale.domain()[0]))}" />
        {/each}
      </linearGradient>
    </defs>

    <!-- Gradient bar with rounded edges -->
    <rect
      x="10"
      y="10"
      rx="6"
      ry="6"
      width="200"
      height="14"
      fill={`url(#${gradientId})`}
      stroke="#ccc"
      stroke-width="0.5"
    />

    <!-- Ticks and labels -->
    {#each legendSteps as step, i}
      <line
        x1="{10 + (i / (legendSteps.length - 1)) * 200}"
        y1="10"
        x2="{10 + (i / (legendSteps.length - 1)) * 200}"
        y2="24"
        stroke="#888"
        stroke-width="0.8"
      />
      {#if legendLabels[i]}
        <text
          x="{10 + (i / (legendSteps.length - 1)) * 200}"
          y="38"
          text-anchor="middle"
          font-size="10"
          font-family="Source Sans 3"
          fill="#333"
        >
          <tspan x="{10 + (i / (legendSteps.length - 1)) * 200}" dy="0">
            {legendLabels[i].split('\n')[0]}
          </tspan>
          <tspan x="{10 + (i / (legendSteps.length - 1)) * 200}" dy="1.1em">
            {legendLabels[i].split('\n')[1]}
          </tspan>
        </text>
      {/if}
    {/each}
  </svg>
</div>

<style>
  .legend {
    margin: 12px 0 0 10px;
    max-width: 240px;
    padding-top: 4px;
    margin-bottom: 10px;
    font-family: 'Source Sans 3', sans-serif;
    border-radius: 10px;
  }

  .legend svg {
    overflow: visible;
  }

  .legend text {
    user-select: none;
  }
</style>
