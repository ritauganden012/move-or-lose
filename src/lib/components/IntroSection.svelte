<!-- IntroSection.svelte -->
<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Scrolly from "$lib/components/Scrolly.svelte";
  import ScrollySection from "$lib/components/ScrollySection.svelte";
  import HousingNetwork from "$lib/components/HousingNetwork.svelte";

  let currentSection = 0;
  let hasInitialized = false;
  const MUNICIPALITY_COUNT = 80;
  const BENCHMARK_COUNT = 10;

  const texts = [
    "Massachusetts has a bad reputation for affordable housing [21].",
    "As of 2019, more than 80% of Massachusetts' 351 municipalities failed to meet the state benchmark requiring that at least 10% of their housing stock be designated as affordable."
  ];

  // Compute showText based on scroll position and initialization
  $: showText = currentSection <= 1 && hasInitialized; // Keep text visible until we're well into the second section

  onMount(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionThreshold = windowHeight * 0.75; // Only switch section after 75% of next section is visible
      currentSection = Math.floor((scrollPosition + sectionThreshold) / windowHeight);
    };

    window.addEventListener('scroll', handleScroll);

    // Initialize after a short delay
    setTimeout(() => {
      hasInitialized = true;
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="intro-container">
  <div class="progress-indicator">
    {#each Array(4) as _, i}
      <div class="dot {currentSection === i ? 'active' : ''}" />
    {/each}
  </div>

  <Scrolly bind:value={currentSection}>
    <!-- First Section with Housing Network -->
    <ScrollySection>
      <div class="act first-section">
        <div class="background-image" transition:fade={{duration: 2000}} />
        <div class="network-wrapper">
          <HousingNetwork
            {MUNICIPALITY_COUNT}
            {BENCHMARK_COUNT}
            animate={showText}
          />
        </div>
        {#if showText}
          <div class="content-overlay" transition:fade={{duration: 1000}}>
            <div class="content-side">
              <div class="text-content" transition:fade>
                <h2 style="color: #2c5282;">The Housing Shortage Crisis</h2>
                <p>{texts[0]}</p>
                <p>{texts[1]}</p>

                <div class="stats-container">
                  <div class="stat-item">
                    <span class="stat-number">&gt;{MUNICIPALITY_COUNT}%</span>
                    <span class="stat-label">of MA municipalities fail to meet standards</span>
                  </div>

                  <div class="stat-item">
                    <span class="stat-number">≥{BENCHMARK_COUNT}%</span>
                    <span class="stat-label">state benchmark for affordable housing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </ScrollySection>

    <!-- Second Section with sticky image -->
    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
          <img
            src="Images/Landlords vs Tenants .jpg"
            alt="Corporate buildings representing landlords"
          />
        </div>
        <div class="scroll-content">
          <h2>Landlords vs. Residents</h2>
          <p>In addition to the lack of housing supply, the growing interests of corporate ownership, absentee owners, and the lack of support for low-middle class long-term residents has led to an increase in eviction filings.</p>
        </div>
      </div>
    </ScrollySection>

    <!-- Third Section with sticky image -->
    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
          <img
            src="Images/3rd Scrolly_DiverseTenants.jpg"
            alt="Diverse group of people"
          />
        </div>
        <div class="scroll-content">
          <h2>Some Are Particularly Vulnerable</h2>
          <p>Evictions disproportionately target communities of color, lower income individuals, and are fueled by corporate ownership of property [22].</p>
        </div>
      </div>
    </ScrollySection>

    <!-- Fourth Section with sticky image -->
    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
          <img
            src="Images/eviction_notice.jpg"
            alt="Boston cityscape"
          />
        </div>
        <div class="scroll-content">
          <h2>Our Goals</h2>
          <p>We aim to visualize and analyze the eviction crisis in Massachusetts, highlighting the factors that contribute to housing instability and its impact on vulnerable communities.</p>
          <p>Boston, as Massachusetts' leading city, can set an example on how to tackle the crisis. We study the evictions crisis with data-driven analysis, and provide housing policy makers with the tools to understand and combat it in Boston.</p>
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
    height: 100vh;
    background: linear-gradient(to right, #ffffff 0%, #f8f9fa 100%);
    position: relative;
  }

  /* First section styles */
  .first-section {
    padding: 0;
    display: block;
    position: relative;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 1;
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
    justify-content: flex-start;
    padding: 6rem;
    z-index: 2;
  }

  .content-side {
    max-width: 800px;
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
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
    color: #984835;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stat-label {
    font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.4;
  }

  /* Sticky section styles */
  .sticky-section {
    position: relative;
    width: 100%;
    height: 200vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background: white;
  }

  .sticky-image {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 2rem;
  }

  .sticky-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
    filter: contrast(1.1);
  }

  .scroll-content {
    padding: 4rem;
    margin-top: calc(200vh - 100vh);
    position: relative;
    min-height: 120vh;
  }

  .scroll-content h2 {
    margin-bottom: 2rem;
    color: #2c5282;
    font-size: 3.5rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .scroll-content p {
    font-size: 1.5rem;
    line-height: 1.6;
    color: #4a5568;
    max-width: 800px;
    margin-bottom: 1.5rem;
  }

  /* Global text styles */
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
</style>
