<script>
    export let interpolator = d3.interpolateOranges;
    export let min = 0;
    export let max = 1;
  </script>

  <div class="legend">
    <div class="legend-label">Low</div>
    <div class="legend-gradient"></div>
    <div class="legend-label">High</div>
  </div>

  <style>
    .legend {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .legend-gradient {
      width: 120px;
      height: 12px;
      background: linear-gradient(to right, #fef0d9, #fdd49e, #fdbb84, #fc8d59, #e34a33, #b30000); /* Adjust for actual interpolator */
      border-radius: 6px;
    }

    .legend-label {
      font-size: 0.8rem;
      color: #4F1F05;
    }
  </style>
