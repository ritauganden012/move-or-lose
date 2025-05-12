<script>
  import { fade } from 'svelte/transition';
  import MapComparisonUnified from "$lib/components/MapComparisonUnified.svelte";
  import Scrolly from "$lib/components/Scrolly.svelte";
  import ScrollySection from "$lib/components/ScrollySection.svelte";
  import References from '$lib/components/References.svelte';
  import MapComparisonView from '$lib/components/MapComparisonView.svelte';
  import IntroSection from "$lib/components/IntroSection.svelte";
  import NeighborhoodDives from "$lib/components/NeighborhoodDives.svelte";
  import Tooltip from '$lib/components/Tooltip.svelte';

  let showMattapan = false;
  let showRoxbury = false;
  let currentStep = 0;
  let activeNeighborhood = 'mattapan';
  let dummyEvictions = [33, 73, 121, 140];
  let dummyIncome = [17524, 81450, 21585];

  let dummySelected = "r_mhi";

  // function toggleCase(caseName) {
  //   if (caseName === 'mattapan') showMattapan = !showMattapan;
  //   if (caseName === 'roxbury') showRoxbury = !showRoxbury;
  // }

  // Helper function to create citation links
  function citation(id) {
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
</script>

<section class="hero">
  <div class="hero-content">
    <div class="text-background">
      <div class="text-block">
        <h1>Boston's Housing Crisis <br> Has a Pattern</h1>
        <p>
          Our research highlights who gets evicted — and why.
          Explore our interactive map to see the correlation between eviction filings and income levels, demographics, and corporate ownership.
        </p>
        <a href="#interactive" class="cta-button">Jump to Interactive Maps</a>
      </div>
    </div>
  </div>
</section>

<IntroSection />

<!-- Explore Section -->
<section id="explore">
<h2 id="explore">City-Wide Overview</h2>
  <!-- <p> Massachusetts has a bad reputation for affordable housing {@html citation(21)}.
    As of 2019, more than 80% of Massachusetts' 351 municipalities failed to meet the state benchmark requiring that at least 10% of their housing stock be designated as affordable.
    In addition to the lack of housing supply, the growing interests of corporate ownership, absentee owners,
    and the lack of support for low-middle class long-term residents has led to an increase in eviction filings.
    Evictions disproportionately target communities of colour, lower income individuals, and are fueled by corporate ownership of property {@html citation(22)}.
    Through this project, we study the effects of these factors on eviction filings through a data driven analysis and
    <b>provide housing policy makers with the tools to understand and combat the growing eviction crisis in Boston</b>.
  </p> -->

  <p>
    We'll first gain a high-level understanding on Boston's evictions crisis, through recent trends and several key related variables.
  </p>

  <h3>Ever-rising eviction filings since 2020</h3>
  <figure>
    <iframe src='https://flo.uri.sh/visualisation/23018633/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
    <div style='width:100%!;margin-top:4px!important;text-align:right!important;'>
      <a class='flourish-credit' href='https://public.flourish.studio/visualisation/23018633/?utm_source=embed&utm_campaign=visualisation/23018633' target='_top' style='text-decoration:none!important'>
        <img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'>
      </a>
    </div>
    <figcaption style="font-weight: 300; text-align: center">Fig 1: Eviction filing rates across Mattapan, Roxbury and Boston from 2020 to 2023.</figcaption>
  </figure>


  <p>
    In Boston, more and more renters are being faced with evictions in recent years.
    In 2023, nearly 3 in 100 renter households had evictions filings against them.
    Even though eviction verdicts were yet to be made, they were under the threat of losing their place to live and becoming homeless.
  </p>

  <p>
    The rise in eviction filings is unfairly skewed among Boston's neighborhoods.
    Among the 23 of them, Mattapan and Roxbury suffered from the highest eviction filing rates,
    far higher than twice that for Boston as a whole.
  </p>

  <h3>Eviction filings, demographics and median income across neighborhoods</h3>
  <figure style="display: flex; flex-direction: column; align-items: center;">
    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; flex-wrap: wrap; width: 100%;">
      <div style="flex: 1; min-width: 30%; margin: 0 10px;">
        <iframe src='https://flo.uri.sh/visualisation/23019042/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
        <div style='width:100%!;margin-top:4px!important;text-align:right!important;'>
          <a class='flourish-credit' href='https://public.flourish.studio/visualisation/23019042/?utm_source=embed&utm_campaign=visualisation/23019042' target='_top' style='text-decoration:none!important'>
            <img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'>
          </a>
        </div>
      </div>
      <div style="flex: 1; min-width: 30%; margin: 0 10px;">
        <iframe src='https://flo.uri.sh/visualisation/23019216/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
        <div style='width:100%!;margin-top:4px!important;text-align:right!important;'>
          <a class='flourish-credit' href='https://public.flourish.studio/visualisation/23019216/?utm_source=embed&utm_campaign=visualisation/23019216' target='_top' style='text-decoration:none!important'>
            <img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'>
          </a>
        </div>
      </div>
      <div style="flex: 1; min-width: 30%; margin: 0 10px;">
        <iframe src='https://flo.uri.sh/visualisation/23019383/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
        <div style='width:100%!;margin-top:4px!important;text-align:right!important;'>
          <a class='flourish-credit' href='https://public.flourish.studio/visualisation/23019383/?utm_source=embed&utm_campaign=visualisation/23019383' target='_top' style='text-decoration:none!important'>
            <img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'>
          </a>
        </div>
      </div>
    </div>
    <figcaption style="text-align: left; font-weight: 300; margin-top: 0.5rem">Fig 2: Heatmaps of eviction filing rates, percentage of non-white population and median household income across neighborhoods in Boston.</figcaption>
  </figure>

<p>
  <!-- Roxbury and Mattapan have the highest eviction rate filing of 6.7% and 7.6% among the Boston neighborhoods. -->
  Looking at variables that are related to evictions, 
  the percentage of <strong>non-white population</strong> was found to bear a strikingly strong correlation with evictions —
  both Mattapan & Roxbury had 90% or more non-white residents.
</p>

<p>
  Mattapan and Roxbury also had median household incomes well below the city-wide median,
  but interestingly, the contrast is not as stark as in the case of demographics.
</p>
</section>

<!-- Scrollytelling transition section -->
<section id="interactive" class="scrolly-container">
  <div class="sticky-section">
    <div class="sticky-content">
      <h2>Your Turn for Interactive Exploration</h2>
      <p>
        Now that you have a solid understanding of Boston’s eviction crisis,
        we invite you to explore the geographic differences in eviction patterns and related factors across the city.
        The data is provided at the census tract level, smaller than neighborhoods, to help you uncover local nuances.
        In some cases, even adjacent census tracts can show stark contrasts.
      </p>
    </div>
    <div class="scroll-content">
      <div class="instruction-step">
        <div class="step-content">
          <h3 style="color: #984835;">Hover over census tracts</h3>
          <p style="margin-bottom: 3rem;">Get quick statistics about any place without clicking</p>
          <div style="display: flex; gap: 2rem; text-align: left; justift-content: center; flex-wrap: wrap;">
            <div
              class="floating-tooltip"
            >
              <Tooltip
                data={{
                  neighborhood: 'Roxbury',
                  GEOID: 25025082100,
                  pop: 5025,
                  "2020_eviction": dummyEvictions[0],
                  "2021_eviction": dummyEvictions[1],
                  "2022_eviction": dummyEvictions[2],
                  "2023_eviction": dummyEvictions[3],
                }}
                layer="eviction_rate"
              />
            </div>
            <div
              class="floating-tooltip"
            >
              <Tooltip
              data={{
                neighborhood: 'Roxbury',
                GEOID: 25025082100,
                pop: 5025,
                r_mhi: dummyIncome[0],
                o_mhi: dummyIncome[1],
                mhi: dummyIncome[2],
              }}
              layer="r_mhi"
              />
            </div>
          </div> 
        </div>
      </div>
      <div class="instruction-step">
        <div class="step-content">
          <h3 style="color: #984835;">Click on any census tract</h3>
          <p style="margin-bottom: 3rem;">View detailed ranking information about any place you're interested in</p>
          <img src="Images/side_panel_inst.png" alt="Example side panel" style="height: 50vh" />
        </div>
      </div>
      <div class="instruction-step">
        <div class="step-content">
          <h3 style="color: #984835;">Use the 'Clear Panel' button</h3>
          <p style="margin-bottom: 3rem;">Reset your selection anytime to explore different census tracts</p>
          <div class="side-panel-header">
            <button 
              class="clear-panel-button" 
            >
            ✘ Clear Panel
            </button>
          </div>
        </div>
      </div>
      <div class="instruction-step">
        <div class="step-content">
          <h3 style="color: #984835;">Toggle buttons above 'Map B'</h3>
          <p style="margin-bottom: 3rem;">See how eviction filings relate to other factors like income, demographics, and corporate landlords</p>
          <div class="control-group" role="radiogroup" aria-label="Map B Layer Selection">
            <label for="dummy-instruction">Map B:</label>
            <button 
              id="dummy-mapB-income" 
              on:click={() => dummySelected = 'r_mhi'} 
              class:selected={dummySelected === 'r_mhi'} 
              class="toggle-button"
              role="radio"
              aria-checked={dummySelected === 'r_mhi'}
            >Renter Income</button>
            <button 
              id="dummy-mapB-demographics" 
              on:click={() => dummySelected = 'non_white_rate'} 
              class:selected={dummySelected === 'non_white_rate'} 
              class="toggle-button"
              role="radio"
              aria-checked={dummySelected === 'non_white_rate'}
            >Demographics</button>
            <button 
              id="dummy-mapB-ownership" 
              on:click={() => dummySelected = 'corp_own_rate'} 
              class:selected={dummySelected === 'corp_own_rate'} 
              class="toggle-button"
              role="radio"
              aria-checked={dummySelected === 'corp_own_rate'}
            >Ownership</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="explore">
  <div id="explore-map">
    <MapComparisonUnified />
  </div>
</section>

<!-- Neighborhood Deep Dives Transition -->
<section id="neighborhoods" class="scrolly-container">
  <div class="sticky-section">
    <div class="sticky-content"
      style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
             url('{activeNeighborhood === 'roxbury' ? 'Images/Roxbury.png' : 'Images/MattapanStreet.jpg'}');
             background-repeat: no-repeat;"
          >

      <h2>Beyond the Numbers</h2>
      <p>
        Though <b>Mattapan</b> and <b>Roxbury</b> are grappling hard with evictions and other issues, these two neighborhoods were built on rich history, community, and perseverance. Below, we explore the human stories behind the statistics.
      </p>
    </div>
    <div class="scroll-content">
      
      <div class="instruction-step" use:initObserver data-neighborhood="mattapan">
        <div class="step-content">
          <h3 style="color: #984835; font-size: 1.6rem;">Mattapan</h3>
          <p style="font-size: 1.35rem;">Learn about the home of Boston's largest Haitian and Caribbean communities. Mattapan's legacy continues through its tight-knit families, cultural pride, and ongoing fight against displacement. </p>
        </div>
      </div>

      <div class="instruction-step" use:initObserver data-neighborhood="roxbury">
        <div class="step-content">
          <h3 style="color: #984835; font-size: 1.6rem;">Roxbury</h3>
          <p style="font-size: 1.35rem;">Explore the historical center of Boston's Black community during the Great Migration. From the fight against redlining to the birth of community land trusts, Roxbury reflects decades of struggle and strength. </p>
        </div>
      </div>
    </div>
  </div>
</section>

<NeighborhoodDives />




<!-- Policy Recommendation Section -->

<section id="policy">

  <h2>Policy Recommendation</h2>

  <p>
    Our interactive visualization highlights geographic disparities in evictions and key correlated factors.
    The stories from Roxbury and Mattapan reveal more than just data—they show the human cost of Boston’s housing crisis.
    Behind every eviction is someone forced into impossible choices.
  </p>

  <p>
    We believe Boston can do better, with policies that are not only strategic but also grounded in humanitarian values.
    Below, we outline a three-stage roadmap designed to meet both the urgency of the moment and the long-term structural nature of the crisis.
  </p>

  <!-- Short-Term Block -->
  <div class="policy-block">
    <h3>Short-Term (0–6 months): Dignity in Displacement</h3>

    <p>
      For those facing sudden eviction, often with little or no time to find new housing, short-term responses should prioritize dignity, hygiene, and stability.
    </p>

    <ul>
      <li><strong>Offer vacant hotel rooms</strong> to displaced individuals and families, supported by city incentives for participating hotels.</li>
      <li><strong>Leverage Boston Public Library branches</strong> as decentralized resource hubs for emergency aid and shelter navigation.</li>
      <li><strong>Deploy community shuttles</strong> to connect residents swiftly to available housing.</li>
    </ul>

    <p>
      By preventing homelessness, this approach forestalls a cascade of social issues—substance use, mental health crises, and long-term homelessness—that are much harder and costlier to address later.
    </p>
  </div>

  <!-- Medium-Term Block -->
  <div class="policy-block">
    <h3>Medium-Term (6–24 months): Transparency and Fairness</h3>

    <p>
      People in need of subsidized housing are often left uncertain about waitlists or unaware of all nearby options.
      With federal cuts threatening Section 8 assistance, more transparent, responsive systems are needed {@html citation(18)}.
    </p>

    <ul>
      <li><strong>Make real-time data</strong> on housing vacancies and waitlists publicly available across Boston and surrounding towns.</li>
      <li><strong>Prioritize rent subsidies</strong> for neighborhoods facing high eviction rates and rent hikes.</li>
      <li><strong>Host housing assistance workshops</strong> at Boston Public Library branches to help residents access programs and understand tenant rights.</li>
    </ul>

    <p>
      These changes would make Boston’s housing systems feel not only more transparent but also more navigable, especially for residents without digital access.
    </p>
  </div>

  <!-- Long-Term Block -->
  <div class="policy-block">
    <h3>Long-Term (2+ years): Stability Through Supply and Access</h3>

    <figure>
    <img src="Images/Policy/Policy Images.avif" alt="The Lyndia in Jamaica Plain, completed in 2025, a 202-unit supportive housing project for low-income families and the homeless." class="policy-image"  />
    <figcaption>Figure: Lyndia in Jamaica Plain, completed in 2025, it’s a 202-unit permanent supportive housing for low-income families and the homeless {@html citation(19)}.
    </figure>

    <p>
      Boston’s housing crisis cannot be solved without bold, long-term investments in affordable housing supply and infrastructure for mobility.
    </p>

    <ul>
      <li><strong>Use funding from the Massachusetts Affordable Homes Act</strong> {@html citation(20)} to preserve affordability in high-risk neighborhoods.</li>
      <li><strong>Expand successful models</strong> like <em>The Lyndia</em> (in image above), Boston’s largest supportive housing project for the formerly unhoused {@html citation(19)}.</li>
      <li><strong>Improve MBTA Commuter Rail service</strong> and develop affordable, transit-oriented housing to widen commuting options without sacrificing urban access.</li>
    </ul>

    <p>
      These policies reimagine Boston’s geography of opportunity, easing pressure on core neighborhoods and creating durable pathways to housing security.
    </p>
  </div>

</section>

<!-- Acknowledgements -->
<section id="acknowledgements">
<h2>Acknowledgements</h2>
<div class="policy-block">
  <p>We would like to acknowledge the support of the <a href="https://www.mapc.org/">Metropolitan Area Planning Commission (MAPC)</a> for their guidance and feedback throughout this project. Their expertise in housing policy and data analysis has been invaluable in shaping our understanding of the issues at hand.</p>
<p> We would like to thank the course instructors and staff of the <a href="https://vis-society.github.io/logistics/staff.html#course-staff">Data Visualization and Society</a> course for helping us not only learn about the important tools and techniques of data visualization, but also for helping us understand the importance of data storytelling and the impact of our work on society. Their guidance and support have been invaluable in shaping our project and our understanding of the role of data in advocating for housing justice. We also want to thank our peers for their valuable feedback through the course of this project</p>

<p><b>This project was developed with guidance and feedback from the <a href="https://www.mapc.org/">Metropolitan Area Planning Commission (MAPC)</a> </b></p>

<p>Our data sources include:</p>
<ul>
<li>Tabular property assessment data for City of Boston from 2004 - 2024, <a href=https://data.boston.gov/dataset/property-assessment>City of Boston</a></li>
<li>Boston Neighborhood Spatial Data, <a href=https://data.boston.gov/dataset/boston-neighborhood-boundaries-approximated-by-2020-census-block-groups1>City of Boston</a></li>
<li>Eviction data (2020 - 2024), <a href=https://lcau.mit.edu/people/eric-huntley>Eric Huntley</a></li>
</ul>
</div>
</section>

<!-- About Us Section -->
<section id="about">
  <h2 style="text-align: left;">About Us</h2>
  <p style="text-align: left;">We are a group of MIT graduate students from various backgrounds, including computer science and system design & management, studying how to use visualization tools to represent and advocate for housing justice.</p>

  <div class="team-grid">

      <!-- Team Member 1 -->
      <div class="team-member">
        <img src= "Images/team/shih-lun.jpg" alt="Team Member 1" />
        <h3>Shih-Lun Wu</h3>
        <p>1st Year PhD Student - EECS</p>
        <div class="links">
          <a href="https://slseanwu.github.io" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/shih-lun-sean-wu/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 2 -->
      <div class="team-member">
        <img src="Images/team/rita.jpg" alt="Rita" />
        <h3>Rita Uganden-Teryila</h3>
        <p> 2nd-Year Masters Student - System</p>
        <div class="links">
          <a href="https://ritauganden012.github.io/DataViz-Portfolio/" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/ritaugandenteryila/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 3 -->
      <div class="team-member">
        <img src="Images/team/nithya.jpg" alt="Nithya" />
        <h3>Nithya Shikarpur </h3>
        <p>1st Year PhD Student - EECS</p>
        <div class="links">
          <a href="https://snnithya.github.io" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/snnithya/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 4 -->
      <div class="team-member">
        <img src="Images/team/rowell.jpg" alt="Rowell" />
        <h3>Rowell Castro</h3>
        <p>2nd-Year Masters Student - SDM + EECS</p>
        <div class="links">
          <a href="https://rowelldgcastro.github.io/portfolio/index.html" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/rowelldgcastro/" target="_blank">LinkedIn</a>
        </div>
      </div>

</section>

<References />



<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans 3', sans-serif;
  }

  section {
    padding: 4rem 2rem;
    /* min-height: 80vh; */
    font-family: 'Source Sans 3', sans-serif;
    border-bottom: 1px solid #ccc;
  }

  section#explore {
  /* border-top: 2px solid #BFE0FF; */
  background: linear-gradient(to bottom, #fafafa, #fff);
  }

  h1, h2 {
    color: #2A5881;
    margin-bottom: 1rem;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }

  p {
    color: #4F1F05;
    max-width: auto;
    font-size: 1.1rem;
  }

  .case-container {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: flex-start; */
    /* flex-wrap: wrap; */
    gap: 2rem;
    max-width: 90%;
    width:100%;
    margin: 2rem auto 0 auto; /* center on page */
    padding: 0 1rem;
  }

  .case-card {
    background: #EAE7DC;
    padding: 2rem;
    border-radius: 1rem;
    width: 100%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    animation: fadeInUp 0.8s ease both;
    }

  .case-description p {
    font-family: "Source Sans 3", sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #4F1F05;
  }


  .case-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  li {
    margin-bottom: 0.2rem;
    color: #4F1F05;
  }

  .nested-list {
    margin-left: 1.5rem;
    list-style-type: circle;
    font-size: 0.95rem;
    color: #4F1F05;
  }

  /* Roxbury: earthy cream */
  .roxbury-card {
    background: #E0E6AF;
  }

  .roxbury-card:hover {
    background: #D6DCA0;
  }

  .case-card h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .case-card p {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    .case-container {
      max-width: 100%;
      flex-direction: column;
      align-items: center;
    }
    .case-card {
      width: 100%;
    }
  }

  #about {
  text-align: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  justify-items: center;
}

.team-member {
  background: #EAE7DC;
  padding: 1.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 260px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.team-member img {
  width: 200px;
  height: 210px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.team-member h3 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: #2A5881;
}

.team-member p {
  font-size: 0.9rem;
  color: #4F1F05;
}

.links a {
  display: inline-block;
  margin: 0.25rem 0.5rem;
  font-size: 0.85rem;
  color: #984835;
  text-decoration: none;
  font-weight: 500;
}

.links a:hover {
  color: #F6C4B0;
}

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
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/Images/map_screenshot.png');
    /* background-size: cover;
     */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  

  .sticky-content h2 {
    color: #ffffff;
    font-size: 3rem;
    margin-bottom: 2rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .sticky-content p {
    font-size: 1.4rem;
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

  .step-content h3 {
    color: #2A5881;
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .step-content p {
    color: #4a4a4a;
    font-size: 1.8rem;
    line-height: 1.6;
  }

  .instruction-step h3 {
    color: #2A5881;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .instruction-step p {
    color: #4a4a4a;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .hero {
    width: 100%;
    min-height: 100vh;
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Boston_backbay_brownstones.jpg/2560px-Boston_backbay_brownstones.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  .hero-content {
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .text-background {
    background: rgba(255, 255, 255, 0.85);
    padding: 2rem 3rem;
    border-radius: 1.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(6px);
  }

  .text-block {
    max-width: 800px;
  }

  .text-block h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #4F1F05;
  }

  .text-block p {
    font-size: 1.2rem;
    color: #4F1F05;
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .cta-button {
    background-color: #2A5881;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 1.5rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.3s ease;
    margin-top: 2.5rem;
  }

  .cta-button:hover {
    background-color: #E0E6AF;
  }

  .policy-block {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background: #F9F9F9;
    border-radius: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }

  .policy-block h3 {
    margin-top: 0;
  }

  /* .policy-block img {
    margin: 1rem 0;
    width: 100%;
    border-radius: 0.75rem;
  } */

  .policy-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    margin: 1rem 0;
    border-radius: 0.75rem;
    display: block;
  }
  ul {
    padding-left: 1.5rem;
    margin-top: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .clear-panel-button {
    padding: 0.5rem 1.3rem;
    background-color: #fec5c8;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 1.2rem;
    color: #4d062f;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clear-panel-button:hover {
    background-color: #d75690;
    color: #ffebf7;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.2rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
  .control-group label {
    font-weight: bold;
    color: #4F1F05;
  }
  .toggle-button {
    padding: 0.5rem 1.3rem;
    background-color: #BFE0FF;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 1.2rem;
    color: #2A5881;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .toggle-button:hover {
      background-color: #E0E6AF;
  }
  .toggle-button.selected {
      background-color: #E0E6AF;
  }

  .floating-tooltip {
    background: rgba(255, 255, 255, 0.96);
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    font-family: "Source Sans 3", sans-serif;
    font-size: 0.9rem;
    color: #3c2a1e;
    z-index: 9999;
    pointer-events: none;
    max-width: 300px;
    min-width: 180px;
    max-height: 85vh;
    overflow-y: auto;
    backdrop-filter: blur(5px);
    /* opacity: 0; */
    /* visibility: hidden; */
    transition: all 0.2s ease-in-out;
  }

</style>
