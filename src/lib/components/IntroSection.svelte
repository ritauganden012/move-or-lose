<!-- IntroSection.svelte -->
<script>
  import Scrolly from './Scrolly.svelte';
  import ScrollySection from './ScrollySection.svelte';
  import { onMount } from 'svelte';
  import HousingNetwork from './HousingNetwork.svelte';
  import { fade, fly } from 'svelte/transition';
  import { spring } from 'svelte/motion';

  let currentSection = 0;
  let isFirstSectionVisible = false;
  let showText = false;
  const MUNICIPALITY_COUNT = 80;
  const BENCHMARK_COUNT = 10;
  
  const texts = [
    "Massachusetts has a bad reputation for affordable housing [21].",
    "As of 2019, more than 80% of Massachusetts' 351 municipalities failed to meet the state benchmark requiring that at least 10% of their housing stock be designated as affordable."
  ];

  onMount(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      currentSection = Math.floor(scrollPosition / windowHeight);
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: if (currentSection === 0 && !isFirstSectionVisible) {
    isFirstSectionVisible = true;
    setTimeout(() => {
      showText = true;
    }, 1000); // Show text after 1 second
  }
</script>

<div class="intro-container">
  <div class="progress-indicator">
    {#each Array(4) as _, i}
      <div class="dot {currentSection === i ? 'active' : ''}" />
    {/each}
  </div>

  <Scrolly>
    <ScrollySection>
      <div class="act first-section">
        <div class="background-image" transition:fade={{duration: 2000}} />
        <div class="network-wrapper">
          <HousingNetwork />
        </div>
        {#if showText}
          <div class="content-overlay" 
               transition:fade={{duration: 800}}>
            <div class="content-side">
              <div class="text-content" transition:fade>
                <h2>The Housing Shortage Crisis</h2>
                <p>{texts[0]}</p>
                <p>{texts[1]}</p>
                
                <div class="stats-container">
                  <div class="stat-item">
                    <span class="stat-number">{MUNICIPALITY_COUNT}%</span>
                    <span class="stat-label">of MA municipalities fail to meet standards</span>
                  </div>

                  <div class="stat-item">
                    <span class="stat-number">{BENCHMARK_COUNT}%</span>
                    <span class="stat-label">state benchmark for affordable housing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act">
        <div class="content-side">
          <h2 transition:fade={{duration: 1000}}>Landlords vs. Residents</h2>
          <p>In addition to the lack of housing supply, the growing interests of corporate ownership, absentee owners, and the lack of support for low-middle class long-term residents has led to an increase in eviction filings.</p>
        </div>

        <div class="image-container" transition:fade={{duration: 1000, delay: 1000}}>
          <div class="image-reveal">
            <img 
              src="https://images.unsplash.com/photo-1579170053380-58064b2dee67?auto=format&fit=crop&q=80"
              alt="Corporate buildings representing landlords"
              class="section-image"
            />
          </div>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act">
        <div class="content-side">
          <h2 transition:fade={{duration: 1000}}>Some Are Particularly Vulnerable</h2>
          <p>Evictions disproportionately target communities of color, lower income individuals, and are fueled by corporate ownership of property [22].</p>
        </div>

        <div class="image-container" transition:fade={{duration: 1000, delay: 1000}}>
          <div class="image-reveal">
            <img 
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80"
              alt="Diverse group of people"
              class="section-image"
            />
          </div>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act">
        <div class="content-side">
          <h2 transition:fade={{duration: 1000}}>Our Goals</h2>
          <p>Boston, as Massachusetts' leading city, can set an example on how to tackle the crisis. We study the evictions crisis with data-driven analysis, and provide housing policy makers with the tools to understand and combat it in Boston.</p>
        </div>

        <div class="image-container" transition:fade={{duration: 1000, delay: 1000}}>
          <div class="image-reveal">
            <img 
              src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&q=80"
              alt="Boston cityscape"
              class="section-image"
            />
          </div>
        </div>
      </div>
    </ScrollySection>
  </Scrolly>
</div>

<style>
  .intro-container {
    position: relative;
  }

  .progress-indicator {
    position: fixed;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(44, 62, 80, 0.3);
    transition: all 0.3s ease;
  }

  .dot.active {
    background-color: #2c3e50;
    transform: scale(1.2);
  }

  .act {
    width: 100%;
    margin: 0;
    padding: 6rem;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
    background: linear-gradient(to right, #ffffff 0%, #f8f9fa 100%);
    position: relative;
  }

  .first-section {
    padding: 0;
    display: block;
    background: none;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 0;
  }

  .network-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .content-overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 6rem;
    z-index: 2;
    pointer-events: none;
  }

  .first-section .content-side {
    text-align: left;
    max-width: 800px;
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
    pointer-events: auto;
  }

  .first-section h2 {
    color: #1a202c;
    margin-bottom: 1.5rem;
  }

  .first-section .stat-item {
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .first-section .stat-number {
    color: #2c5282;
  }

  .first-section .stat-label {
    color: #4a5568;
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin: 3rem 0;
    width: 100%;
  }

  .stat-item {
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: 1.5rem;
    background: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    border: 1px solid rgba(42, 88, 129, 0.1);
  }

  .stat-number {
    display: block;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 3rem;
    font-weight: 500;
    color: var(--color-main-text);
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stat-label {
    font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 1.1rem;
    color: var(--color-support-text);
    line-height: 1.4;
  }

  h2 {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: var(--color-main-text);
    line-height: 1.2;
    font-weight: 500;
  }

  p {
    font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: var(--color-main-text);
  }

  .image-container {
    width: 100%;
    height: 100%;
    min-height: 600px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
    position: relative;
    transform: perspective(1000px) rotateY(-5deg);
    transition: transform 0.5s ease;
  }

  .image-container:hover {
    transform: perspective(1000px) rotateY(0deg);
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-reveal {
    width: 100%;
    animation: reveal 2s ease-out forwards;
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }

  @keyframes reveal {
    from {
      clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
    }
    to {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }
  }

  .section-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
  }
</style>
