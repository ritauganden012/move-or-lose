<!-- BuildingAnimation.svelte -->
<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Create buildings animation timeline
    const buildings = document.querySelectorAll('.building');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.buildings-container',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

    // Animate each building from bottom to top
    buildings.forEach((building, index) => {
      tl.from(building, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1,
        ease: 'power2.out',
        delay: index * 0.2
      }, index * 0.3);
    });
  });
</script>

<div class="buildings-container">
  <!-- Buildings with different heights -->
  <div class="building building-1"></div>
  <div class="building building-2"></div>
  <div class="building building-3"></div>
  <div class="building building-4"></div>
  <div class="building building-5"></div>
  <div class="building building-6"></div>
</div>

<style>
  .buildings-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 2rem;
    background: linear-gradient(to bottom, #1a1a1a 0%, #2c3e50 100%);
  }

  .building {
    background: #34495e;
    border: 2px solid #ecf0f1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    width: 60px;
    position: relative;
  }

  .building::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    background-size: 10px 20px;
  }

  .building-1 { height: 200px; }
  .building-2 { height: 300px; }
  .building-3 { height: 250px; }
  .building-4 { height: 350px; }
  .building-5 { height: 280px; }
  .building-6 { height: 320px; }

  /* Windows pattern */
  .building::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    background-image: 
      linear-gradient(to right, #f1c40f 2px, transparent 2px),
      linear-gradient(to bottom, #f1c40f 2px, transparent 2px);
    background-size: 10px 10px;
    opacity: 0.3;
  }
</style>
