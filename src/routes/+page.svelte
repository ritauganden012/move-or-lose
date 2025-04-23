<script>
  import MapComparisonView from '$lib/components/MapComparisonView.svelte';
  import MapComparisonUnified from '$lib/components/MapComparisonUnified.svelte';


</script>

<section class="hero">
  <div class="hero-content">
    <div class="text-block">
      <h1> The Boston’s Housing Crisis Has a Pattern</h1>
      <p>
        Our research highlights who gets evicted  - and why.
        Explore our interactive map to see the correlation between eviction filling and income levels, demographic and number of coperate owners.
      </p>
      <a href="#explore" class="cta-button">Explore the Maps</a>
    </div>

  </div>
</section>

<!-- <MapComparisonView /> -->

<!-- Explore Section -->
<section id="explore">
  <MapComparisonUnified />
</section>


<!-- Policy Recommendation Section -->
<section id="policy">
  <h2 id="policy">Policy Recommendation</h2>
  <p>Some recommended policies .</p>
</section>


<!-- Case Studies Section -->
<section id="case-studies">
  <h2>Case Studies</h2>
  <div class="case-container">
    <div class="case-card">
      <h3>Mattapan Case Study</h3>
      <p>Eviction trends by corporate landlord ownership, revealing how investment patterns correlate with displacement.</p>
    </div>
    <div class="case-card">
      <h3>Roxbury Case Study</h3>
      <p>Exploring how public policy investments influence abortion outcomes across U.S. states.</p>
    </div>
  </div>
</section>


<!-- About Us Section -->
<section id="about">
  <h2>About Us</h2>
  <p>We are a group of MIT graduate students from various backgrounds, including data science, computer science and system design & management - studying how to use visualization tools to represent and advocate for housing justice.</p>

  <div class="team-grid">

      <!-- Team Member 1 -->
      <div class="team-member">
        <img src= "src/images/team/shih-lun.jpg" alt="Team Member 1" />
        <h3>Shih-Lun Wu</h3>
        <p>Some Bio.</p>
        <div class="links">
          <a href="https://slseanwu.github.io" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/shih-lun-sean-wu/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 2 -->
      <div class="team-member">
        <img src="src/images/team/rita.jpg" alt="Rita" />
        <h3>Rita Uganden-Teryila.</h3>
        <p> Some Bio.</p>
        <div class="links">
          <a href="https://ritauganden012.github.io/DataViz-Portfolio/" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/ritaugandenteryila/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 3 -->
      <div class="team-member">
        <img src="src/images/team/nithya.jpg" alt="Nithya" />
        <h3>Nithya Shikarpur </h3>
        <p>Some Bio.</p>
        <div class="links">
          <a href="https://snnithya.github.io" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/snnithya/" target="_blank">LinkedIn</a>
        </div>
      </div>

      <!-- Team Member 4 -->
      <div class="team-member">
        <img src="src/images/team/rowell.jpg" alt="Rowell" />
        <h3>Rowell Castro</h3>
        <p>Some Bio.</p>
        <div class="links">
          <a href="" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/rowelldgcastro/" target="_blank">LinkedIn</a>
        </div>
      </div>

</section>







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
    font-size: 1.5rem;
  }

  .case-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .case-card {
    background: #EAE7DC;
    padding: 1.5rem;
    border-radius: 1rem;
    width: 300px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
  }

  .case-card:hover {
    transform: translateY(-4px);
    background: #F6C4B0;
  }

  .case-card h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .case-card p {
    font-size: 0.95rem;
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


</style>
