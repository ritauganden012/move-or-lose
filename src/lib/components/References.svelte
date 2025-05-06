<script>

  // Your reference data
  const references = [
    {
      id: 1,
      author: "City of Boston, Planning Department",
      title: "Boston in Context: Neighborhoods",
      year: "2024",
      url: "https://www.bostonplans.org/getattachment/45b1d52a-e762-42a4-b81d-d52072bfda61"
    },
    {
      id: 2,
      author: "Boston Planning & Development Agency",
      title: "Roxbury",
      year: "2017",
      url: "http://www.bostonplans.org/getattachment/70aaac6d-0459-4b1f-b91f-fe19ba5437cc"
    },
    {
      id: 3,
      author: "Boston Planning & Development Agency",
      title: "Mattapan",
      year: "2017",
      url: "http://www.bostonplans.org/getattachment/f93dc9a5-9285-48d6-a8eb-3f2a3eac8e1c"
    },
    {
      id: 4,
      author: "Boston.com",
      title: "Improvements to the Mattapan Line are finally underway — but riders may not see results for years",
      year: "2023",
      url: "https://www.boston.com/news/local-news/2023/08/31/improvements-to-the-mattapan-line-are-finally-underway/"
    },
    {
      id: 5,
      author: "WBUR.org",
      title: "A Tour Of Street Art In Roxbury, By Boston Artist Cedric Douglas",
      year: "2016",
      url: "https://www.wbur.org/news/2016/10/20/street-art-roxbury-cedric-douglas"
    },
    {
      id: 6,
      author: "WBUR.org",
      title: "How a more than 50-year-old housing policy displaced a former Jewish neighborhood in Mattapan",
      year: "2023",
      url: "https://www.wbur.org/radioboston/2023/06/14/hidden-history-housing-mattapan-jewish"
    },
    {
      id: 7,
      author: "Theflaw.org",
      title: "Affordable Housing, Derailed — The struggle against corporate landlords' profiteering",
      year: "2024",
      url: "https://theflaw.org/articles/affordable-housing-derailed/"
    },
    {
      id: 8,
      author: "The Boston Magazine",
      title: "The Greater Boston Eviction Crisis Will Hurt You, Too",
      year: "2024",
      url: "https://www.bostonmagazine.com/news/2024/12/11/boston-eviction-crisis/"
    },
    {
      id: 9,
      author: "The Boston Globe",
      title: "Mattapan tenant leader staves off eviction … for now",
      year: "2024",
      url: "https://www.bostonglobe.com/2024/10/30/metro/leader-mattapan-tenant-organization-staves-off-evictionfor-now/"
    },
    {
      id: 10,
      author: "Boston.com",
      title: "Mattapan 350-unit complex will be converted from market-rate to affordable housing",
      year: "2025",
      url: "https://www.boston.com/real-estate/real-estate/2025/03/11/mattapan-350-unit-building-will-be-converted-from-market-rate-to-affordable-housing/"
    },
    {
      id: 11,
      author: "Hunt News Northeastern",
      title: "Roxbury Residents Face Gentrification",
      year: "2017",
      url: "https://huntnewsnu.com/50562/city/roxbury-residents-face-gentrification/"
    },
    {
      id: 12,
      author: "Boston.com",
      title: "Rally Held for 76-Year-Old Roxbury Tenant Facing Eviction",
      year: "2022",
      url: "https://www.boston.com/news/local-news/2022/06/10/rally-held-for-76-year-old-roxbury-tenant-facing-eviction/"
    },
    {
      id: 13,
      author: "WBUR.org",
      title: "Boston Life Expectancy Gap Back Bay to Roxbury",
      year: "2023",
      url: "https://www.wbur.org/news/2023/05/11/boston-life-expectancy-gap-back-bay-roxbury"
    },
    {
      id: 14,
      author: "BU Today",
      title: "Boston's Opioid Crisis at Mass and Cass",
      year: "2023",
      url: "https://www.bu.edu/articles/2023/boston-intersection-mass-and-cass-opioid-overdose-crisis/"
    },
    {
      id: 15,
      author: "Wikipedia",
      title: "Orchard Park Trailblazers",
      year: "",
      url: "https://en.wikipedia.org/wiki/Orchard_Park_Trailblazers"
    },
    {
      id: 16,
      author: "MassLive",
      title: "Feds Crack Down on Boston-Based Gangs Amid Re-emergence of Most Feared Group",
      year: "2024",
      url: "https://www.masslive.com/news/2024/08/feds-crackdown-on-boston-based-gangs-amid-re-emergence-of-80s-most-feared-gang.html"
    },
    {
      id: 17,
      author: "Boston.com",
      title: "Roxbury Residents Say Neighborhood Is a Dumping Ground for Transitional Housing",
      year: "2024",
      url: "https://www.boston.com/news/local-news/2024/08/26/roxbury-residents-say-roxbury-is-dumping-ground-for-transitional-housing/"
    },
    {
      id: 18,
      author: "Boston.com",
      title: "Federal Cuts Targeting Section 8 Housing Funds Worry Boston Renters",
      year: "2025",
      url: "https://www.boston.com/news/local-news/2025/04/04/federal-cuts-targeting-section-8-housing-funds-renters/"
    },
    {
      id: 19,
      author: "MassLive",
      title: "New England's largest permanent supportive housing development opens in Boston",
      year: "2025",
      url: "https://www.masslive.com/boston/2025/03/new-englands-largest-permanent-supportive-housing-development-opens-in-boston.html"
    },
    {
      id: 20,
      author: "Commonwealth of Massachusetts",
      title: "The Affordable Homes Act: Smart Housing, Livable Communities",
      year: "2024",
      url: "https://www.mass.gov/info-details/the-affordable-homes-act-smart-housing-livable-communities"
    },
    {
        id: 21,
        author: "Eli Sherman",
        title: "Affordable housing crisis in Massachusetts contributing to homelessness",
        year: "2019",
        url: "https://www.heraldnews.com/story/news/2019/02/11/affordable-housing-crisis-in-massachusetts/6033543007/"
    },
    {
        id: 22,
        author: "Eric Robsky Huntly et. al.",
        title: "Housing Justice Beyond the Emergency",
        year: "2022",
        url: "https://www.homesforallmass.org/covid-evictions-report/hfamass-covid-evictions-report-short-03-22-screen-rfs.pdf"
    }
  ];

  // Helper function to create citation links
  function citation(id) {
    return `<a href="#ref-${id}" class="citation">[${id}]</a>`;
  }
</script>


<!-- References section -->
<section id="references">
  <div class="container">
    <h2>References</h2>
    <div class="references-container">
      <ol>
        {#each references as ref}
          <li id="ref-{ref.id}" class="reference-item">
            <div class="reference-content">
              <span class="reference-author">{ref.author}.</span> 
              <span class="reference-title">"{ref.title}."</span> 
              <span class="reference-year">{ref.year ? `(${ref.year})` : ''}</span>
              <a href={ref.url} target="_blank" rel="noopener noreferrer" class="reference-link">{ref.url}</a>
            </div>
          </li>
        {/each}
      </ol>
    </div>
  </div>
</section>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  section#references {
    padding: 4rem 2rem;
    min-height: auto;
    font-family: 'Source Sans 3', sans-serif;
    border-bottom: 1px solid #ccc;
    background: linear-gradient(to bottom, #fafafa, #fff);
  }

  #references h2 {
    color: #2A5881;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
  }

  .references-container {
    max-width: 100%;
    margin: 0 auto;
    background: #EAE7DC;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  ol {
    margin: 0;
    padding-left: 2rem;
  }

  .reference-item {
    margin-bottom: 1.2rem;
    color: #4F1F05;
    line-height: 1.6;
    font-size: 1rem;
  }

  .reference-content {
    display: flex;
    flex-direction: column;
  }

  .reference-author {
    font-weight: 600;
  }

  .reference-title {
    font-style: italic;
  }

  .reference-year {
    margin-right: 0.5rem;
  }

  .reference-link {
    color: #2A5881;
    text-decoration: none;
    word-break: break-word;
    transition: color 0.2s ease;
  }

  .reference-link:hover {
    color: #984835;
    text-decoration: underline;
  }

  /* Style for citation links */
  :global(.citation) {
    font-size: 1rem;
    font-weight: bold;
    color: #2A5881;
    text-decoration: none;
    padding: 0.1rem 0.1rem;
    border-radius: 0.75rem;
    margin: 0 0.1rem;
    transition: background-color 0.3s ease;
  }

  :global(.citation:hover) {
    background-color: #E0E6AF;
    color: #4F1F05;
  }

  @media (max-width: 768px) {
    .references-container {
      padding: 1.5rem;
    }
    
    .reference-item {
      font-size: 0.95rem;
    }
  }
</style>