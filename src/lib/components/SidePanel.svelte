<script>
    import { hoveredDataStore } from './stores.js';
    import { onDestroy } from 'svelte';
  
    let hovered = null;
  
    const unsubscribe = hoveredDataStore.subscribe(value => hovered = value);
    onDestroy(() => unsubscribe());
  </script>
  
  {#if hovered}
    <div class="side-panel">
      <h2>{hovered.neighborhood}</h2>
      <p>Details coming soon...</p>
    </div>
  {/if}
  
  <style>
    .side-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 350px;
      height: 100%;
      background: white;
      border-left: 2px solid #AD7F65;
      padding: 1rem;
      z-index: 1000;
      box-shadow: -4px 0 10px rgba(0,0,0,0.1);
      overflow-y: auto;
    }
  
    .side-panel h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #4F1F05;
    }
  </style>
  
  