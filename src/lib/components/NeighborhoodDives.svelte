<!-- IntroSection.svelte -->
<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Scrolly from "$lib/components/Scrolly.svelte";
  import ScrollySection from "$lib/components/ScrollySection.svelte";
  import HousingNetwork from "$lib/components/HousingNetwork.svelte";

  let currentSection = 0;
  let hasInitialized = false;

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

  function citation(id) {
    return `<a href="#ref-${id}" class="citation">[${id}]</a>`;
  }
</script>

<div class="intro-container">
  <div class="progress-indicator">
    {#each Array(4) as _, i}
      <div class="dot {currentSection === i ? 'active' : ''}" />
    {/each}
  </div>

  <Scrolly bind:value={currentSection}>

    
    <ScrollySection>
      <div class="act sticky-section">
        
        <div class="sticky-image">
        
        <figure>
        <h2 class="image-heading">Mattapan</h2>
          <img 
            src=Images/Mattapan-trolley-64f0958fce398-768x432.jpeg
            alt="Corporate buildings representing landlords"
            style="position: relative; top: 50%; left: 0; width: 100%; height: 100%; object-fit: cover;"
          />
          </figure>
        </div>
        <div class="scroll-content">
          <h2>Key Statistics</h2>
          <div class="info-block">
            <ul>
              <li><strong>Population (2024):</strong> 24,130 {@html citation(3)}</li>
              <li><strong>Median Household Income (2015) {@html citation(5)}:</strong> $43,256 (77.6% of Boston’s)</li>
              <li><strong>Racial Makeup (2024):</strong>  {@html citation(3)}
            </ul>
            <ul class="nested-list">
              <li>Black: <strong>68.7%</strong></li>
              <li>Latinx: <strong>16.7%</strong></li>
              <li>Asian: <strong>2.0%</strong></li>
              <li>White: <strong>6.4%</strong></li>
              <li>Others: <strong>6.2%</strong></li>
            </ul>
            </div>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        <figure>
          <img 
            src="Images/mattapan-para-1.jpg"
            alt="African American school children joined whites in Mattapan in the 1960s under Operation Exodus, an attempt to reduce racial segregation and education disparities."
          />
          <figcaption>African American school children joined whites in Mattapan in the 1960s under Operation Exodus, an attempt to reduce racial segregation and education disparities.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>Tucked into Boston’s southern edge, Mattapan is a neighborhood shaped by generational migration, community advocacy, and the consequences of systemic neglect. Once home to large Jewish and Irish populations in the mid-20th century, Mattapan’s demographics shifted rapidly following the passage of the 1968 Fair Housing Act. While the law was intended to dismantle discriminatory barriers, it was exploited by realtors who used fear-based blockbusting tactics: inciting white homeowners to sell low, then reselling to Black families, often with poor financial screening, who were quickly foreclosed upon {@html citation(8)}. The neighborhood’s foundation of working-class families was established in this turbulent era, and it has endured ever since.</p>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        <figure>
          <img 
            src="Images/mattapan-para-2.jpeg"
            alt="The Fairlawn Apartments, a long-time low-cost housing for Mattapan residents purchased by a corporate landlord, DSF Group, in 2018"
          />
          <figcaption> The Fairlawn Apartments, a long-time low-cost housing for Mattapan residents purchased by a corporate landlord, DSF Group, in 2018.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>In recent decades, Mattapan residents fought long and hard for equity in transit access, demanding better MBTA service and culminating in the long-awaited opening of the Fairmount Line. But just as the community began to realize the fruits of its advocacy, corporate interests took notice. DSF Group acquired in 2018 the Fairlawn Apartments, a 347-unit complex near the new Blue Hill Ave rail stop, once known for providing low-rent housing to long-time residents. Rebranded as a bourgeois “SoMa at the T,” rents surged, but the conditions inside the units — rodents, pests, and neglect — remained {@html citation(9)}.</p>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        
        <figure>
          <img 
            src="Images/mattapan-para-3.jpg"
            alt="Annie Gordon, Fairlawn Apartments' long-time tenant, standing in her rented unit."
            style="position: relative;height: 85%; object-fit: cover;"
          />
          <figcaption>Annie Gordon, Fairlawn Apartments' long-time tenant, standing in her rented unit.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>One tenant’s story stands out. Annie Gordon, a 73-year-old who had lived at Fairlawn for nearly five decades, became a pillar of resistance. When DSF bought the Fairlawn, her rent went up by $300 per month, a 16% increase from the $1810 she had before. Some residents were even hit with a 50% rent hike {@html citation(10)}. A leader in her tenant association, Gordon advocated not just for herself but for her neighbors, pressing for repairs and rent stability. Her reward? An eviction notice from DSF, which claimed a breakdown in the landlord-tenant relationship. Gordon took her case to court — and won. But she remains braced for further retaliation. “I had to pick up a part-time job at Walmart just to make ends meet,” she said, a quiet reminder of the economic weight many seniors in Mattapan continue to carry {@html citation(11)}.</p>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        <figure>
          <img 
            src="Images/mattapan-para-4.jpg"
            alt="City Life / Vida Urbana, a non-profit tenant-helping organization, strives to protect tenants' rights in Boston."
          />
          <figcaption>City Life / Vida Urbana, a non-profit tenant-helping organization, strives to protect tenants' rights in Boston.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>In 2025, the City of Boston designated Fairlawn Apartments as permanently affordable housing, aided by a $10 million city grant — a hard-earned win for tenant advocates and housing organizations like City Life/Vida Urbana {@html citation(12)}. Yet questions still exist. Ownership of the complex is now in the hands of Related Beal, a private real estate developer. As public funds dwindle, the future of affordability at Fairlawn, and in Mattapan at large, remains uncertain.</p>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        
        <div class="sticky-image">
        
        <figure>
        <h2 class="image-heading">Roxbury</h2>
          <img 
            src="Images/1018_Faces-Of-Dudley-MuralA-1000x665.jpg"
            alt="Faces-Of-Dudley-Mural"
            style="position: relative; top: 50%; left: 0; width: 100%; height: 100%; object-fit: cover;"
          />
          </figure>
        </div>
        <div class="scroll-content">
          <h2>Key Statistics</h2>
          <div class="info-block">
        <ul>
          <li><strong>Population (2024) {@html citation(3)}:</strong> 56,552</li>
          <li><strong>Median Household Income (2015) {@html citation(4)}:</strong> $25,937 (46.5% of Boston’s)</li>
          <li><strong>Racial Makeup (2024) {@html citation(3)}:</strong></li>
        </ul>
        <ul class="nested-list">
          <li>Black: <strong>41.2%</strong></li>
          <li>Latinx: <strong>30.0%</strong></li>
          <li>Asian: <strong>6.2%</strong></li>
          <li>White: <strong>13.6%</strong></li>
          <li>Others: <strong>8.9%</strong></li>
        </ul>
      </div>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        <figure>
          <img 
            src="Images/roxbury-para-1.jpg"
            alt="New high-rise dormitory of Northeastern University, an institutional gentrifier around Roxbury"
          />
          <figcaption>New high-rise dormitory of Northeastern University, an institutional gentrifier around Roxbury.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>
            Roxbury stands at the heart of Boston’s Black cultural and political life. It’s a place rich in legacy, art, and activism.
            But for many of its residents, the promise of place is eroding. In recent decades, gentrification has accelerated, driven not just by speculative buyers,
            but by institutional forces like Northeastern University expanding into surrounding blocks. Home values in Roxbury have risen faster than almost any other neighborhood in Boston,
            up 70% in just a 5-year span from 2010 to 2015, making it harder for long-time residents to stay rooted {@html citation(13)}.
          </p>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        <figure>
          <img 
            src="Images/roxbury-para-2.webp"
            alt="City Life / Vida Urbana fighting for the rights of Roxbury tenant, James Harrison, sitting on the stairs wearing a baseball cap."
          />
          <figcaption>City Life / Vida Urbana fighting for the rights of Roxbury tenant, James Harrison, sitting on the stairs wearing a baseball cap.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>
            The consequences of this shift are felt in deeply personal ways. In 2022, James Harrison, a 76-year-old Roxbury tenant, who participated relentlessly in upholding his community,
            was threatened with eviction from the home he had lived in for decades. His landlord, seeing an opportunity to profit from the area’s rising property values,
            attempted to clear tenants in preparation to sell. Stories like his reflect the market logic that continues to displace working-class residents in favor of higher returns {@html citation(14)}.
          </p>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        
        <figure>
          <img 
            src="Images/roxbury-para-3.jpg"
            alt="Tents set up near the Mass and Cass intersection, an area on the boundary of Roxbury where many people are struggling with substance misuse."
            style="position: relative;height: 85%; object-fit: cover;"
          />
          <figcaption>Tents set up near the Mass and Cass intersection, an area on the boundary of Roxbury where many people are struggling with substance misuse.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>
            Beyond housing, Roxbury also faces compounding crises in public health and safety.
            A person born in Roxbury today can expect to live 23 years fewer than someone born just two miles away in Back Bay,
            a gap shaped by structural inequalities in housing, income, and environmental stressors {@html citation(15)}.
            The neighborhood has also borne the brunt of the city’s response to the opioid crisis. As services at the Mass and Cass corridor
            spill over into Roxbury’s borders, residents have reported rising incidents of visible drug use and emergency response activity
            near homes, parks, and schools {@html citation(16)}.
            Violent crime, particularly involving youth, is a longstanding issue in Roxbury, shaped by decades of systemic neglect and broken opportunities.
            As far back as the 1980s, gangs like the Orchard Park Trailblazers have been rampant {@html citation(17)}.
            In 2024, federal authorities launched a new crackdown on local gangs, citing escalating violence {@html citation(18)}.
          </p>
        </div>
      </div>
    </ScrollySection>

    <ScrollySection>
      <div class="act sticky-section">
        <div class="sticky-image">
        <figure>
          <img 
            src="Images/roxbury-para-4.webp"
            alt="43 Hutchings St, a transitional housing for tech trainees in the G{"{"}Code{"}"} program striving for women and people of color. Though established with good intentions, the housing has received opposition from Roxbury locals."
          />
          <figcaption>43 Hutchings St, a transitional housing for tech trainees in the G{"{"}Code{"}"} program striving for women and people of color. Though established with good intentions, the housing has received opposition from Roxbury locals.</figcaption>
          </figure>
        </div>
        <div class="scroll-content">
          <p>
            Roxbury has also been a focal point in Boston’s strategy to address homelessness and housing instability.
            The neighborhood hosts a number of group homes and transitional housing units.
            While many residents support these goals, concerns have emerged about concentration and equity—whether the burden is being fairly shared across Boston’s neighborhoods.
            Advocates call for a planning approach that centers community voices while ensuring all areas do their part to expand safe, supportive housing {@html citation(19)}.
          </p>
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
    z-index: 2;
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

  .sticky-sections-single {
    position: relative;
    width: 100%;
    height: 200vh;
    display: block;
    background: white;
    z-index: 1;
  }

  .sticky-image {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  figure {
    padding: 0.2rem;
    align-items: center;
    position: relative;
    justify-content: center;
    margin: 0; /* Remove default figure margin */
  }

figcaption {
  font-size: 1.2rem;
  font-weight: 300;
  color: #333;
  text-align: center;
  margin: 0;
}

    .sticky-image-full {
    position: sticky;
    top: 0;
    height: 100vh;
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
    z-index: 2;
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
    color: #49150e;
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

  .image-heading {
  position: absolute;
  top: 10%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Fine-tune centering */
  color:rgb(37, 69, 110);
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  z-index: 1; /* Ensure it's on top */
  font-size: 3.5rem;
}

ul {
    padding-left: 1.5rem;
    margin-top: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 300;
  }

  .nested-list {
    margin-left: 1.5rem;
    list-style-type: circle;
    font-size: 0.95rem;
    color: #4F1F05;
  }

  .background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Semi-transparent grey */
  backdrop-filter: blur(8px); /* Blurry effect */
  z-index: 0; /* Behind the figure */
}
</style>
