<script>
  export let selectedLayer;
  export let colorScale;
  export let steps = 5;

  let legendLabels = [];
  let legendSteps = [];
  let gradientId = 'legend-gradient';

  const layerLabels = {
    eviction_rate: "% Renter HH being Filed for Eviction (2023)",
    corp_own_rate: "% Properties owned by Corporations",
    r_mhi: "Median Renter Annual HH Income",
    non_white_rate: "% Non-White Population"
  };

  $: if (selectedLayer && colorScale?.domain &&
  Number.isFinite(colorScale.domain()[0]) &&
  Number.isFinite(colorScale.domain()[1])) {
    const [min, max] = colorScale.domain();
    const range = max - min;
    const steps = 5;

    legendSteps = Array.from({ length: steps }, (_, i) =>
      min + (range * i) / (steps - 1)
    );

    // Default labels: numeric formatting
    legendLabels = legendSteps.map((value) => {
      if (selectedLayer === "corp_own_rate") {
        return `${(value * 100).toFixed(0)}%`;
      } else if (selectedLayer == "non_white_rate") {
        return `${(value).toFixed(0)}%`
      // } else if (selectedLayer == "eviction_rate") {
      //   return `${(value).toFixed(1)}%`
      // } else if (selectedLayer == "r_mhi") {
      //   return `$${(value / 1000).toFixed(0)}K`
      } else {
        return value.toFixed(0);
      }});
      

      // hacky way to display correctly at init
      if (selectedLayer === "r_mhi") {
        legendLabels = ["$12K", "$24K", "$36K", "$48K", "$60K"];
      }
      if (selectedLayer === "eviction_rate") {
        legendLabels = ["0.0%", "2.5%", "5.0%", "7.5%", "10.0%"];
      }
    }
</script>

<div class="legend">
  <div class="legend-title">{layerLabels[selectedLayer]}</div>
  <svg viewBox="0 0 220 70" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient
        id={gradientId}
        x1={selectedLayer === 'r_mhi' ? "100%" : "0%"}
        y1="0%"
        x2={selectedLayer === 'r_mhi' ? "0%" : "100%"}
        y2="0%"
      >
        {#each Array.from({ length: 20 }, (_, i) => i / 19) as t}
          <stop
            offset="{t * 100}%"
            stop-color="{colorScale(colorScale.domain()[0] + t * (colorScale.domain()[1] - colorScale.domain()[0]))}"
          />
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

  .legend-title {
    font-size: 0.8rem;
    margin-bottom: -4px;
  }

  .legend svg {
    overflow: visible;
  }

  .legend text {
    user-select: none;
  }
</style>
