<script>
  // No data logic yet – just layout
</script>

<style>
  .page-container {
    background-color: #EAE7DC;
    font-family: 'Source Sans 3', sans-serif;
    color: #4F1F05;
    padding: 2rem;
  }

  .header {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #4F1F05;
  }

  .hero-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .map-panel {
    background: white;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .panel-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: #4F1F05;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .toggle-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .toggle-button {
    padding: 0.4rem 0.8rem;
    background-color: #BFE0FF;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.9rem;
    color: #2A5881;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .toggle-button:hover {
    background-color: #E0E6AF;
  }

  .map-svg {
    width: 100%;
    height: 350px;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fefefe;
  }


  @media (max-width: 768px) {
    .hero-container {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="page-container">
  <div class="header">More-or-Lose: Cooperate Ownership & Evicitions in Boston</div>

  <div class="hero-container">
    <div class="map-panel">
      <div class="panel-title">Map A (Evictions)</div>

      <!---Toggle buttons -->
      <div class="toggle-buttons">
        <button class="toggle-button">Eviction Rate</button>
        <button class="toggle-button">Corporate Ownership</button>
        <button class="toggle-button">Income</button>
        <button class="toggle-button">Demographics</button>
      </div>

      <svg class="map-svg">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#AD7F65">
          [ D3 Map A Placeholder ]
        </text>
      </svg>
      <!-- Placeholder for map A -->

    </div>

    <div class="map-panel">
      <div class="panel-title">Map B (Demographics / Income)</div>

       <!---Toggle buttons -->
      <div class="toggle-buttons">
        <button class="toggle-button">Eviction Rate</button>
        <button class="toggle-button">Corporate Ownership</button>
        <button class="toggle-button">Income</button>
        <button class="toggle-button">Demographics</button>
      </div>

      <svg class="map-svg">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#AD7F65">
          [ D3 Map B Placeholder ]
        </text>
      </svg>
      <!-- Placeholder for map B -->

    </div>
  </div>
</div>
