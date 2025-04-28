<script>
  import MapComparisonView from '$lib/components/MapComparisonView.svelte';
  import MapComparisonUnified from '$lib/components/MapComparisonUnified.svelte';
  import References from '$lib/components/References.svelte';

  let showMattapan = false;
  let showRoxbury = false;

  // function toggleCase(caseName) {
  //   if (caseName === 'mattapan') showMattapan = !showMattapan;
  //   if (caseName === 'roxbury') showRoxbury = !showRoxbury;
  // }
</script>

<section class="hero">
  <div class="hero-content">
    <div class="text-block">
      <h1>Boston’s Housing Crisis <br> Has a Pattern</h1>
      <p>
        Our research highlights who gets evicted - and why.
        Explore our interactive map to see the correlation between eviction filling and income levels, demographics, and number of corporate owners.
      </p>
      <a href="#explore-map" class="cta-button">Explore Interactive Maps</a>
    </div>

  </div>
</section>

<!-- Explore Section -->
<section id="explore">
<h2 id="explore">Problem Statement</h2>
  <p> Massachusettes has a bad reputation for affordable housing <a href="https://www.heraldnews.com/story/news/2019/02/11/affordable-housing-crisis-in-massachusetts/6033543007/" target="_blank">[21]</a>. As of 2019, less than 80% of 351 municipalities in MA fell short of a benchmark of 10% of all housing constitute to affordable housing. In addition to the lack of housing supply, the growing interests of corporate ownership, absentee owners, and the lack of support for low-middle class long-term residents has led to an increase in eviction filings. Evictions dispropotianately target communities of colour, lower income individuals, and are fueled by corporate ownership of property <a href="https://www.homesforallmass.org/covid-evictions-report/hfamass-covid-evictions-report-short-03-22-screen-rfs.pdf" target="_blank">[22]</a>. Through this project, we study the effects of these factors on eviction filings through a data driven analysis and <b>provide housing policy makers with the tools to understand and combat the growing eviction crisis in Boston</b>.
  </p>
  <div id="explore-map">
    <MapComparisonUnified />
  </div>
</section>

<!-- Static Visualization -->
<section id="explore">
<h2>Data Story: The cases of Roxbury and Mattapan</h2>
  <p>Through our analysis, we see that <b>Roxbury</b> and <b>Mattapan</b> are two neighborhoods with the highest eviction rates of 6.7% and 7.6% respectively in 2023. We try to visualize eviction filings in these neighborhoods in both the context of other Boston neighborhoods and other socio-economic factors.</p>

  <h3>Eviction rates from 2020-2023</h3>
  <figure>
  <img src="Images/eviction_rates_20-23.png" alt="line plot of eviction rates across 2020-2023. There is a clear upward trend over the years and we see Mattapan and Roxbury consistently have a higher eviction filing rate than the overall across Boston." />
  <figcaption>Fig: Trend of eviction rate filings from 2020 - 2023. The values are plotted for Roxbury, Mattapan and for all Boston neighborhoods.</figcaption>
  </figure>

  <p>A rising eviction rate trend is seen from 2020-2023. However, Roxbury and Mattapan have much higher eviction rates, and steeper trends over the past few years. In 2023 alone, eviction rates in Roxbury and Mattapan were 6.7% and 7.6% respectively whereas this was just 2.8% over all neighborhoods in Boston.</p>

  <h3>Eviction Rates, Demographics and Median income across neighborhoods in 2023</h3>
  <figure style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 30%; margin: 0 10px;">
    <img src="Images/eviction_map_static.png" alt="Heatmap of eviction rates" style="width: 100%;"/>
  </div>
  <div style="flex: 1; min-width: 30%; margin: 0 10px;">
    <img src="Images/demographics_static.png" alt="Heatmap of non-white population" style="width: 100%;"/>
  </div>
  <div style="flex: 1; min-width: 30%; margin: 0 10px;">
    <img src="Images/mhi_static.png" alt="Heatmap of median household income" style="width: 100%;"/>
  </div>
  <figcaption style="text-align: center; font-size: 0.9em;">Fig: Heatmaps of eviction rate filings, percentage of non-white population and average median household income across neighborhoods in Boston.</figcaption>
</figure>

<p>Roxbury and Mattapan have the highest eviction rate filing of 6.7% and 7.6% among the Boston neighborhoods. They also have the highest percentage of non-white population with 90% and 93.89% respectively. Additionally for the average median household income, Roxbury has the 4th lowest value at $30142.46, and Mattapan has the 9th lowest value at $48915.99.</p>
</section>

<!-- Case Studies Section -->
<section id="case-studies">
  <h2>Neighborhood Deep Dives</h2>

    <p>
      Across Boston, housing pressures are mounting, but in Roxbury and Mattapan, the impact is particularly pronounced.
      These are neighborhoods built on history, community, and perseverance — now grappling with rising rents, corporate ownership, and the threat of displacement. Below, we explore the human stories behind the statistics.
    </p>

  <div class="case-container">

    <!-- Mattapan Case -->
    <div class="case-card mattapan-card" role="region" aria-labelledby="mattapan-title">
      <h3 id="mattapan-title">Mattapan Case Study</h3>

      <div class="info-block">
        <ul>
          <li><strong>Population (2024):</strong> 24,130 <a href="https://www.bostonplans.org/getattachment/45b1d52a-e762-42a4-b81d-d52072bfda61">[3]</a></li>
          <li><strong>Median Household Income (2015):</strong> $43,256 (77.6% of Boston’s)</li>
          <li><strong>Racial Makeup (2024):</strong>  <a href="https://www.bostonplans.org/getattachment/45b1d52a-e762-42a4-b81d-d52072bfda61">[3]</a></li>
        </ul>
        <ul class="nested-list">
          <li>Black: <strong>68.7%</strong></li>
          <li>Latinx: <strong>16.7%</strong></li>
          <li>Asian: <strong>2.0%</strong></li>
          <li>White: <strong>6.4%</strong></li>
          <li>Others: <strong>6.2%</strong></li>
        </ul>
      </div>

        <img src="Images/Mattapan-trolley-64f0958fce398-768x432.jpeg" alt="Mattapan-trolley" class="case-image" />

        <div class="case-description">
          <p>Tucked into Boston’s southern edge, Mattapan is a neighborhood shaped by generational migration, community advocacy, and the consequences of systemic neglect. Once home to large Jewish and Irish populations in the mid-20th century, Mattapan’s demographics shifted rapidly following the passage of the 1968 Fair Housing Act. While the law was intended to dismantle discriminatory barriers, it was exploited by realtors who used fear-based blockbusting tactics: inciting white homeowners to sell low, then reselling to Black families, often with poor financial screening, who were quickly foreclosed upon.</p>

          <p>The neighborhood’s foundation of working-class families was established in this turbulent era, and it has endured ever since.</p>

          <p>In recent decades, Mattapan residents fought long and hard for equity in transit access, demanding better MBTA service and culminating in the long-awaited opening of the Fairmount Line. But just as the community began to realize the fruits of its advocacy, corporate interests took notice. DSF Group acquired in 2018 the Fairlawn Apartments, a 347-unit complex near the new Blue Hill Ave rail stop, once known for providing low-rent housing to long-time residents. Rebranded as a bourgeois “SoMa at the T,” rents surged, but the conditions inside the units — rodents, pests, and neglect — remained.</p>

          <p>One tenant’s story stands out. Annie Gordon, a 73-year-old who had lived at Fairlawn for nearly five decades, became a pillar of resistance. When DSF bought the Fairlawn, her rent went up by $300 per month, a 16% increase from the $1810 she had before. Some residents were even hit with a 50% rent hike. A leader in her tenant association, Gordon advocated not just for herself but for her neighbors, pressing for repairs and rent stability. Her reward? An eviction notice from DSF, which claimed a breakdown in the landlord-tenant relationship. Gordon took her case to court — and won. But she remains braced for further retaliation. “I had to pick up a part-time job at Walmart just to make ends meet,” she said, a quiet reminder of the economic weight many seniors in Mattapan continue to carry.</p>

          <p>In 2025, the City of Boston designated Fairlawn Apartments as permanently affordable housing, aided by a $10 million city grant — a hard-earned win for tenant advocates and housing organizations like City Life/Vida Urbana. Yet questions still exist. Ownership of the complex is now in the hands of Related Beal, a private real estate developer. As public funds dwindle, the future of affordability at Fairlawn, and in Mattapan at large, remains uncertain.</p>

        </div>

    </div>

    <!-- Roxbury Case -->
    <div class="case-card roxbury-card" role="region" aria-labelledby="roxbury-title">
      <h3 id="roxbury-title">Roxbury Case Study</h3>

      <div class="info-block">
        <ul>
          <li><strong>Population (2024):</strong> 56,552</li>
          <li><strong>Median Household Income (2015):</strong> $25,937 (46.5% of Boston’s)</li>
          <li><strong>Racial Makeup (2024):</strong></li>
        </ul>
        <ul class="nested-list">
          <li>Black: <strong>41.2%</strong></li>
          <li>Latinx: <strong>30.0%</strong></li>
          <li>Asian: <strong>6.2%</strong></li>
          <li>White: <strong>13.6%</strong></li>
          <li>Others: <strong>8.9%</strong></li>
        </ul>
      </div>

      <img src="Images/1018_Faces-Of-Dudley-MuralA-1000x665.jpg" alt="Faces-Of-Dudley-Mural" class="case-image" />

        <div class="case-description">
          <p>
            Roxbury stands at the heart of Boston’s Black cultural and political life. It’s a place rich in legacy, art, and activism.
            But for many of its residents, the promise of place is eroding. In recent decades, gentrification has accelerated, driven not just by speculative buyers,
            but by institutional forces like Northeastern University expanding into surrounding blocks. Home values in Roxbury have risen faster than almost any other neighborhood in Boston,
            up 70% in just a 5-year span from 2010 to 2015, making it harder for long-time residents to stay rooted
            <a href="https://www.notion.so/6-C85-S25-FP3-Roxbury-Mattapan-Deep-Dive-Call-to-Action-1ddcde72d85d80a98fd7e2b98367547f?pvs=21" target="_blank">[11]</a>.
          </p>

          <p>
            The consequences of this shift are felt in deeply personal ways. In 2022, James Harrison, a 76-year-old Roxbury tenant, who participated relentlessly in upholding his community,
            was threatened with eviction from the home he had lived in for decades. His landlord, seeing an opportunity to profit from the area’s rising property values,
            attempted to clear tenants in preparation to sell. Stories like hers reflect the market logic that continues to displace working-class residents in favor of higher returns
            <a href="https://www.notion.so/6-C85-S25-FP3-Roxbury-Mattapan-Deep-D" target="_blank">[12]</a>.
          </p>

          <p>
            Beyond housing, Roxbury also faces compounding crises in public health and safety.
            A person born in Roxbury today can expect to live 23 years fewer than someone born just two miles away in Back Bay,
            a gap shaped by structural inequalities in housing, income, and environmental stressors.
            The neighborhood has also borne the brunt of the city’s response to the opioid crisis. As services at the Mass and Cass corridor
            spill over into Roxbury’s borders, residents have reported rising incidents of visible drug use and emergency response activity
            near homes, parks, and schools.
            Violent crime, particularly involving youth, is a longstanding issue in Roxbury, shaped by decades of systemic neglect and broken opportunities.
            As far back as the 1980s, gangs like the Orchard Park Trailblazers have been rampant.
            In 2024, federal authorities launched a new crackdown on local gangs, citing escalating violence
            <a href="#" target="_blank">[16]</a>.
          </p>

          <p>
            Roxbury has also been a focal point in Boston’s strategy to address homelessness and housing instability.
            The neighborhood hosts a number of group homes and transitional housing units.
            While many residents support these goals, concerns have emerged about concentration and equity—whether the burden is being fairly shared across Boston’s neighborhoods.
            Advocates call for a planning approach that centers community voices while ensuring all areas do their part to expand safe, supportive housing.
          </p>

        </div>
    </div>
  </div>

</section>

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
      With federal cuts threatening Section 8 assistance, more transparent, responsive systems are needed
      (<a href="https://www.notion.so/6-C85-S25-FP3-Roxbury-Mattapan-Deep-Dive-Call-to-Action-1ddcde72d85d80a98fd7e2b98367547f?pvs=21" target="_blank" rel="noopener noreferrer">source</a>).
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

    <img src="Images/Policy/Policy Images.avif" alt="The Lyndia in Jamaica Plain, completed in 2025, a 202-unit supportive housing project for low-income families and the homeless." class="policy-image"  />

    <p>
      Boston’s housing crisis cannot be solved without bold, long-term investments in affordable housing supply and infrastructure for mobility.
    </p>

    <ul>
      <li><strong>Use funding from the Massachusetts Affordable Homes Act</strong> (<a href="https://www.notion.so/6-C85-S25-FP3-Roxbury-Mattapan-Deep-Dive-Call-to-Action-1ddcde72d85d80a98fd7e2b98367547f?pvs=21" target="_blank" rel="noopener noreferrer">source</a>) to preserve affordability in high-risk neighborhoods.</li>
      <li><strong>Expand successful models</strong> like <em>The Lyndia</em>, Boston’s largest supportive housing project for the formerly unhoused
        (<a href="https://www.notion.so/6-C85-S25-FP3-Roxbury-Mattapan-Deep-Dive-Call-to-Action-1ddcde72d85d80a98fd7e2b98367547f?pvs=21" target="_blank" rel="noopener noreferrer">source</a>).</li>
      <li><strong>Improve MBTA Commuter Rail service</strong> and develop affordable, transit-oriented housing to widen commuting options without sacrificing urban access.</li>
    </ul>

    <p>
      These policies reimagine Boston’s geography of opportunity, easing pressure on core neighborhoods and creating durable pathways to housing security.
    </p>
  </div>

</section>


<!-- About Us Section -->
<section id="about">
  <h2>About Us</h2>
  <p>We are a group of MIT graduate students from various backgrounds, including data science, computer science and system design & management - studying how to use visualization tools to represent and advocate for housing justice.</p>

  <div class="team-grid">

      <!-- Team Member 1 -->
      <div class="team-member">
        <img src= "Images/team/shih-lun.jpg" alt="Team Member 1" />
        <h3>Shih-Lun Wu</h3>
        <p>Some Bio.</p>
        <div class="links">
          <a href="https://slseanwu.github.io" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/shih-lun-sean-wu/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 2 -->
      <div class="team-member">
        <img src="Images/team/rita.jpg" alt="Rita" />
        <h3>Rita Uganden-Teryila.</h3>
        <p> 2ndd-Year Masters Student - System.</p>
        <div class="links">
          <a href="https://ritauganden012.github.io/DataViz-Portfolio/" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/ritaugandenteryila/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 3 -->
      <div class="team-member">
        <img src="Images/team/nithya.jpg" alt="Nithya" />
        <h3>Nithya Shikarpur </h3>
        <p>Some Bio.</p>
        <div class="links">
          <a href="https://snnithya.github.io" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/snnithya/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 4 -->
      <div class="team-member">
        <img src="Images/team/rowell.jpg" alt="Rowell" />
        <h3>Rowell Castro</h3>
        <p>Some Bio.</p>
        <div class="links">
          <a href="" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/rowelldgcastro/" target="_blank">LinkedIn</a>
        </div>
      </div>

</section>

<References />



<style>
  section {
    padding: 4rem 2rem;
    min-height: 80vh;
    font-family: 'Source Sans 3', sans-serif;
    border-bottom: 1px solid #ccc;
  }

  section#explore {
  border-top: 2px solid #BFE0FF;
  background: linear-gradient(to bottom, #fafafa, #fff);
  }

  h1, h2 {
    color: #2A5881;
    margin-bottom: 1rem;
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
    max-width: 900px;
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
    margin-bottom: 1rem;
  }


  .case-description a {
    color: #2A5881;
    text-decoration: none;
  }

  .case-description a:hover {
    text-decoration: underline;
  }


  .case-image {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .info-block {
    /* border-left: 4px solid #2A5881; */
    padding: 0.5rem;
    margin-bottom: 0.5rem;
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


.mattapan-card {
  background: #F6C4B0;
}
.mattapan-card:hover {
  background: #F4B2A1;
}

/* Roxbury: earthy cream */
.roxbury-card {
  background: #EAE7DC;
}
.roxbury-card:hover {
  background: rgb(195, 197, 178);
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
.hero {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #EAE7DC, #fdfcf9);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

.hero-content {
  max-width: 1600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.text-block {
  max-width: 800px;
}

.text-block h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #4F1F05;
}

.text-block p {
  font-size: 1.2rem;
  color: #4F1F05;
  margin-bottom: 2.5rem;
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
  margin-top: 2.5 rem;
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
    max-width: 1000px;
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




</style>
