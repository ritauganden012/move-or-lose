<script>
    export let x = 0;
    export let y = 0;
    export let content = '';
    export let visible = false;
  </script>

  {#if visible}
    <div
      class="tooltip"
      style="top: {y + 10}px; left: {x + 10}px"
    >
      {@html content}
    </div>
  {/if}

  <style>
    .tooltip {
      position: absolute;
      background: white;
      color: #4F1F05;
      padding: 0.5rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      pointer-events: none;
      z-index: 10;
      max-width: 200px;
    }
  </style>
