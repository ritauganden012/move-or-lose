<!-- CaseStudies.svelte -->
<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Scrolly from "$lib/components/Scrolly.svelte";
  import ScrollySection from "$lib/components/ScrollySection.svelte";

  // Active neighborhood for background switching
  let activeNeighborhood = 'roxbury';
  // Value for Scrolly component
  let value = 0;
  let hasInitialized = false;

  // Export the citation function for use in the component
  export function citation(id) {
    return `<a href="#ref-${id}" class="citation">[${id}]</a>`;
  }

  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeNeighborhood = entry.target.dataset.neighborhood;
      }
    });
  }

  function initObserver(node) {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5
    });
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  onMount(() => {
    // Initialize after a short delay
    setTimeout(() => {
      hasInitialized = true;
    }, 1000);
  });
</script>

<!-- Main section structure -->
<section id="neighborhoods" class="neighborhoods-section">
  <!-- First part: Introduction with sticky background -->
  <div class="scrolly-container">
    <div class="sticky-section">
      <div class="sticky-content"
        style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
               url('{activeNeighborhood === 'roxbury' ? '/Images/RoxburyClock.jpg' : '/Images/MattapanStreet.jpg'}');
               background-size: contain;
               background-position: center;
               background-repeat: no-repeat;">
        <h2>Beyond the Numbers</h2>
        <p>
          Though Mattapan and Roxbury are grappling hard with evictions and other issues, these two neighborhoods were built on rich history, community, and perseverance. Below, we explore the human stories behind the statistics.
        </p>
      </div>

      <div class="scroll-content">
        <div class="instruction-step" use:initObserver data-neighborhood="roxbury">
          <div class="step-content">
            <h3 style="color: #984835; font-size: 1.6rem;">Roxbury</h3>
            <p style="font-size: 1.35rem;">Explore the historical center of Boston's Black community during the Great Migration. From the fight against redlining to the birth of community land trusts, Roxbury reflects decades of struggle and strength.</p>
          </div>
        </div>
        <div class="instruction-step" use:initObserver data-neighborhood="mattapan">
          <div class="step-content">
            <h3 style="color: #984835; font-size: 1.6rem;">Mattapan</h3>
            <p style="font-size: 1.35rem;">Learn about the home of Boston's largest Haitian and Caribbean communities. Mattapan's legacy continues through its tight-knit families, cultural pride, and ongoing fight against displacement.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Second part: Case Studies with Scrolly -->
  <div id="case-studies" class="case-studies">
    <h2>Neighborhood Deep Dives</h2>

    <p>
      Across Boston, housing pressures are mounting, but in Roxbury and Mattapan, the impact is particularly pronounced.
      These are neighborhoods built on history, community, and perseverance — now grappling with rising rents, corporate ownership, and the threat of displacement. Below, we explore the human stories behind the statistics.
    </p>

    <!-- Progress indicator for case studies scrolly -->
    <div class="progress-indicator">
      {#each Array(2) as _, i}
        <div class="dot {value === i ? 'active' : ''}" />
      {/each}
    </div>

    <Scrolly bind:value>
      <!-- Mattapan Case Study -->
      <ScrollySection>
        <div class="case-section">
          <div class="case-card roxbury-card" role="region" aria-labelledby="mattapan-title">
            <h3 id="mattapan-title">Mattapan Case Study</h3>

            <div class="info-block">
              <ul>
                <li><strong>Population (2024):</strong> 24,130 {@html citation(1)}</li>
                <li><strong>Median Household Income (2015) {@html citation(3)}:</strong> $43,256 (77.6% of Boston's)</li>
                <li><strong>Racial Makeup (2024):</strong> {@html citation(1)}</li>
              </ul>
              <ul class="nested-list">
                <li>Black: <strong>68.7%</strong></li>
                <li>Latinx: <strong>16.7%</strong></li>
                <li>Asian: <strong>2.0%</strong></li>
                <li>White: <strong>6.4%</strong></li>
                <li>Others: <strong>6.2%</strong></li>
              </ul>
            </div>

            <figure>
              <img src="Images/Mattapan-trolley-64f0958fce398-768x432.jpeg" alt="Mattapan-trolley" class="case-image" />
              <figcaption>Figure: Historic Mattapan high-speed line trolley arrives at Mattapan station {@html citation(4)}</figcaption>
            </figure>

            <div class="case-description">
              <p>Tucked into Boston's southern edge, Mattapan is a neighborhood shaped by generational migration, community advocacy, and the consequences of systemic neglect. Once home to large Jewish and Irish populations in the mid-20th century, Mattapan's demographics shifted rapidly following the passage of the 1968 Fair Housing Act. While the law was intended to dismantle discriminatory barriers, it was exploited by realtors who used fear-based blockbusting tactics: inciting white homeowners to sell low, then reselling to Black families, often with poor financial screening, who were quickly foreclosed upon {@html citation(6)}. The neighborhood's foundation of working-class families was established in this turbulent era, and it has endured ever since.</p>

              <p>In recent decades, Mattapan residents fought long and hard for equity in transit access, demanding better MBTA service and culminating in the long-awaited opening of the Fairmount Line. But just as the community began to realize the fruits of its advocacy, corporate interests took notice. DSF Group acquired in 2018 the Fairlawn Apartments, a 347-unit complex near the new Blue Hill Ave rail stop, once known for providing low-rent housing to long-time residents. Rebranded as a bourgeois "SoMa at the T," rents surged, but the conditions inside the units — rodents, pests, and neglect — remained {@html citation(7)}.</p>

              <p>One tenant's story stands out. Annie Gordon, a 73-year-old who had lived at Fairlawn for nearly five decades, became a pillar of resistance. When DSF bought the Fairlawn, her rent went up by $300 per month, a 16% increase from the $1810 she had before. Some residents were even hit with a 50% rent hike {@html citation(8)}. A leader in her tenant association, Gordon advocated not just for herself but for her neighbors, pressing for repairs and rent stability. Her reward? An eviction notice from DSF, which claimed a breakdown in the landlord-tenant relationship. Gordon took her case to court — and won. But she remains braced for further retaliation. "I had to pick up a part-time job at Walmart just to make ends meet," she said, a quiet reminder of the economic weight many seniors in Mattapan continue to carry {@html citation(9)}.</p>

              <p>In 2025, the City of Boston designated Fairlawn Apartments as permanently affordable housing, aided by a $10 million city grant — a hard-earned win for tenant advocates and housing organizations like City Life/Vida Urbana {@html citation(10)}. Yet questions still exist. Ownership of the complex is now in the hands of Related Beal, a private real estate developer. As public funds dwindle, the future of affordability at Fairlawn, and in Mattapan at large, remains uncertain.</p>
            </div>
          </div>
        </div>
      </ScrollySection>

      <!-- Roxbury Case Study -->
      <ScrollySection>
        <div class="case-section">
          <div class="case-card roxbury-card" role="region" aria-labelledby="roxbury-title">
            <h3 id="roxbury-title">Roxbury Case Study</h3>

            <div class="info-block">
              <ul>
                <li><strong>Population (2024) {@html citation(1)}:</strong> 56,552</li>
                <li><strong>Median Household Income (2015) {@html citation(2)}:</strong> $25,937 (46.5% of Boston's)</li>
                <li><strong>Racial Makeup (2024) {@html citation(1)}:</strong></li>
              </ul>
              <ul class="nested-list">
                <li>Black: <strong>41.2%</strong></li>
                <li>Latinx: <strong>30.0%</strong></li>
                <li>Asian: <strong>6.2%</strong></li>
                <li>White: <strong>13.6%</strong></li>
                <li>Others: <strong>8.9%</strong></li>
              </ul>
            </div>

            <figure>
              <img src="Images/1018_Faces-Of-Dudley-MuralA-1000x665.jpg" alt="Faces-Of-Dudley-Mural" class="case-image" />
              <figcaption>Figure: Faces of Dudley mural in Roxbury's Dudley Square {@html citation(5)}</figcaption>
            </figure>

            <div class="case-description">
              <p>
                Roxbury stands at the heart of Boston's Black cultural and political life. It's a place rich in legacy, art, and activism.
                But for many of its residents, the promise of place is eroding. In recent decades, gentrification has accelerated, driven not just by speculative buyers,
                but by institutional forces like Northeastern University expanding into surrounding blocks. Home values in Roxbury have risen faster than almost any other neighborhood in Boston,
                up 70% in just a 5-year span from 2010 to 2015, making it harder for long-time residents to stay rooted {@html citation(11)}.
              </p>

              <p>
                The consequences of this shift are felt in deeply personal ways. In 2022, James Harrison, a 76-year-old Roxbury tenant, who participated relentlessly in upholding his community,
                was threatened with eviction from the home he had lived in for decades. His landlord, seeing an opportunity to profit from the area's rising property values,
                attempted to clear tenants in preparation to sell. Stories like his reflect the market logic that continues to displace working-class residents in favor of higher returns {@html citation(12)}.
              </p>

              <p>
                Beyond housing, Roxbury also faces compounding crises in public health and safety.
                A person born in Roxbury today can expect to live 23 years fewer than someone born just two miles away in Back Bay,
                a gap shaped by structural inequalities in housing, income, and environmental stressors {@html citation(13)}.
                The neighborhood has also borne the brunt of the city's response to the opioid crisis. As services at the Mass and Cass corridor
                spill over into Roxbury's borders, residents have reported rising incidents of visible drug use and emergency response activity
                near homes, parks, and schools {@html citation(14)}.
                Violent crime, particularly involving youth, is a longstanding issue in Roxbury, shaped by decades of systemic neglect and broken opportunities.
                As far back as the 1980s, gangs like the Orchard Park Trailblazers have been rampant {@html citation(15)}.
                In 2024, federal authorities launched a new crackdown on local gangs, citing escalating violence {@html citation(16)}.
              </p>

              <p>
                Roxbury has also been a focal point in Boston's strategy to address homelessness and housing instability.
                The neighborhood hosts a number of group homes and transitional housing units.
                While many residents support these goals, concerns have emerged about concentration and equity—whether the burden is being fairly shared across Boston's neighborhoods.
                Advocates call for a planning approach that centers community voices while ensuring all areas do their part to expand safe, supportive housing {@html citation(17)}.
              </p>
            </div>
          </div>
        </div>
      </ScrollySection>
    </Scrolly>
  </div>
</section>

<style>
  /* Main section styling */
  .neighborhoods-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  /* Part 1: Intro section with sticky background */
  .scrolly-container {
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
    scroll-margin-top: 4rem;
  }

  .sticky-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
    padding: 0;
  }

  .sticky-content {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 4rem;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .sticky-content h2 {
    color: #ffffff;
    font-size: 3.5rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .sticky-content p {
    font-size: 1.6rem;
    line-height: 1.6;
    color: #ffffff;
    max-width: 600px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  .scroll-content {
    padding: 4rem;
    padding-top: 100vh; /* Start content from bottom */
    padding-bottom: 100vh; /* Extra space at bottom */
    display: flex;
    flex-direction: column;
    gap: 75vh; /* Large gap between instructions */
  }

  .instruction-step {
    height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-content {
    max-width: 700px;
    text-align: center;
  }

  /* Part 2: Case studies with Scrolly */
  .case-studies {
    position: relative;
    padding: 4rem 2rem;
    width: 100%;
  }

  .case-studies h2 {
    color: #2A5881;
    margin-bottom: 1rem;
    text-align: center;
  }

  .case-studies p {
    color: #4F1F05;
    max-width: 800px;
    margin: 0 auto 3rem auto;
    text-align: center;
    font-size: 1.1rem;
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

  .case-section {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .case-card {
    background: #EAE7DC;
    padding: 2rem;
    border-radius: 1rem;
    width: 90%;
    max-width: 1000px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  .roxbury-card {
    background: #E0E6AF;
  }

  .roxbury-card:hover {
    background: #D6DCA0;
  }

  .case-card h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    color: #2A5881;
  }

  .info-block {
    margin-bottom: 1.5rem;
  }

  .nested-list {
    margin-left: 1.5rem;
    list-style-type: circle;
  }

  .case-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  figure {
    margin-bottom: 2rem;
  }

  figcaption {
    font-size: 0.9rem;
    font-style: italic;
    color: #555;
  }

  .case-description p {
    font-family: "Source Sans 3", sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #4F1F05;
    margin-bottom: 1rem;
    text-align: left;
    max-width: none;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;
    color: #4F1F05;
  }

  li {
    margin-bottom: 0.2rem;
    color: #4F1F05;
  }

  @media (max-width: 768px) {
    .sticky-section {
      grid-template-columns: 1fr;
    }

    .sticky-content {
      position: relative;
      height: auto;
      min-height: 50vh;
    }

    .scroll-content {
      padding-top: 2rem;
      padding-bottom: 2rem;
      gap: 4rem;
    }

    .instruction-step {
      height: auto;
      min-height: 30vh;
    }

    .case-card {
      width: 100%;
      max-height: 70vh;
    }

    .sticky-content h2 {
      font-size: 2.5rem;
    }

    .sticky-content p {
      font-size: 1.2rem;
    }
  }
</style>
