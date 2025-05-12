<!-- HousingNetwork.svelte -->
<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let container;
  let houses = [];
  let connections = [];
  let isAnimating = false;
  const TOTAL_HOUSES = 50;
  const FADE_PERCENTAGE = 0.5; // 50% of houses will fade
  const CYCLE_DURATION = 5000; // 5 seconds per cycle

  function createHouseIcon(x, y, index) {
    return `
      <g class="house house-${index}" transform="translate(${x-15},${y-15})" style="opacity: 1">
        <path class="house-path" d="
          M15,0 L30,15 L30,30 L0,30 L0,15 L15,0z
          M10,30 L10,20 L20,20 L20,30
          M22,15 A3,3 0 1,1 22,14.5
        " 
        fill="#984835" 
        stroke="#AD7F65"
        stroke-width="2"
        />
      </g>
    `;
  }

  function generateHouses() {
    const width = container?.clientWidth || 1000;
    const height = container?.clientHeight || 800;
    houses = [];
    connections = [];

    // Generate house positions in a grid-like pattern with some randomness
    const cols = Math.ceil(Math.sqrt(TOTAL_HOUSES));
    const rows = Math.ceil(TOTAL_HOUSES / cols);
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    for (let i = 0; i < TOTAL_HOUSES; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      // Add some randomness to the grid position
      const randomOffset = 50;
      const x = (col * cellWidth) + (cellWidth/2) + (Math.random() * randomOffset - randomOffset/2);
      const y = (row * cellHeight) + (cellHeight/2) + (Math.random() * randomOffset - randomOffset/2);
      
      houses.push({ x, y, index: i });
    }

    // Generate connections between nearby houses
    houses.forEach((house, i) => {
      houses.slice(i + 1).forEach(otherHouse => {
        const distance = Math.hypot(house.x - otherHouse.x, house.y - otherHouse.y);
        if (distance < 300) { // Only connect houses within 300px
          connections.push({
            x1: house.x, // Center of house
            y1: house.y,
            x2: otherHouse.x,
            y2: otherHouse.y,
            index: `${house.index}-${otherHouse.index}`
          });
        }
      });
    });
  }

  function startAnimationCycle() {
    if (isAnimating) return;
    isAnimating = true;

    function animateDisappearance() {
      const housesToFade = Math.floor(TOTAL_HOUSES * FADE_PERCENTAGE);
      const housesToKeep = TOTAL_HOUSES - housesToFade;
      const indices = Array.from({ length: TOTAL_HOUSES }, (_, i) => i);
      
      // Shuffle array
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Split into keep and fade arrays
      const keepIndices = new Set(indices.slice(0, housesToKeep));
      const fadeIndices = new Set(indices.slice(housesToKeep));

      const tl = gsap.timeline({
        onComplete: () => {
          if (isAnimating) {
            // Reset all houses and connections
            gsap.to('.house, .connections line', {
              opacity: 1,
              duration: 1,
              onComplete: () => {
                // Start next cycle after reset
                setTimeout(animateDisappearance, 1000);
              }
            });
          }
        }
      });

      // Fade out houses one by one
      fadeIndices.forEach((index, i) => {
        const houseSelector = `.house-${index}`;
        const house = document.querySelector(houseSelector);
        
        if (house) {
          tl.to(houseSelector, {
            opacity: 0,
            duration: 1,
            ease: "none"
          }, i * 0.1);

          // Fade connections for this house
          connections.forEach(conn => {
            const [house1, house2] = conn.index.split('-').map(Number);
            if (house1 === index || house2 === index) {
              const connSelector = `#connection-${conn.index}`;
              const connection = document.querySelector(connSelector);
              
              if (connection) {
                tl.to(connSelector, {
                  opacity: 0,
                  duration: 1,
                  ease: "none"
                }, i * 0.1);
              }
            }
          });
        }
      });
    }

    // Start the first cycle
    animateDisappearance();
  }

  function stopAnimationCycle() {
    isAnimating = false;
  }

  onMount(() => {
    let resizeTimer;

    const initializeNetwork = () => {
      generateHouses();
      if (container) {
        container.innerHTML = `
          <g class="connections">
            ${connections.map(conn => `
              <line 
                id="connection-${conn.index}"
                x1="${conn.x1}" 
                y1="${conn.y1}" 
                x2="${conn.x2}" 
                y2="${conn.y2}"
                stroke="rgba(0, 0, 0, 0.8)"
                stroke-width="2"
              />
            `).join('')}
          </g>
          ${houses.map(house => createHouseIcon(house.x, house.y, house.index)).join('')}
        `;
        // Start animation cycle after content is initialized
        startAnimationCycle();
      }
    };

    // Initial setup
    initializeNetwork();

    // Handle resize with debounce
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stopAnimationCycle();
        initializeNetwork();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      stopAnimationCycle();
    };
  });
</script>

<div class="network-container">
  <svg 
    bind:this={container}
    width="100%" 
    height="100%" 
    viewBox="0 0 1000 800" 
    preserveAspectRatio="xMidYMid meet"
  ></svg>
</div>



<style>
  .network-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;

  }

  :global(.house) {
    transition: transform 0.3s ease;
    transform-origin: center;
    cursor: pointer;
    opacity: 1;
    transform-origin: center;
  }

  :global(.house:hover) {
    transform: scale(1.2);
  }

  :global(.house-path) {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  :global(.connections line) {
    transition: opacity 0.3s ease;
  }
</style>
