<script>
    // pending
  </script>

  <!-- nav bar -->
  <nav class="top-nav">
    <div class="nav-left">
      <a href="#explore">Overview</a>
      <a href="#interactive">Interactive Maps</a>
      <a href="#neighborhoods">Neighborhood Deep Dives</a>
      <a href="#policy">Policy Recommendations</a>
      <a href="#about">About Us</a>

    </div>
  </nav>

  <slot /> <!-- All route content will render here -->

  <style>
  :global(html) {
  scroll-behavior: smooth;
  }
  .top-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    font-weight: 300;
    font-family: 'Source Sans 3', sans-serif;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .top-nav a {
    color: #333;
    text-decoration: none;
    transition: color 0.2s ease;
    font-weight: 600;
  }

  .top-nav a:hover {
    color: #2A5881;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  a {
    text-decoration: none;
    color: #4F1F05;
    font-weight: 400;
  }

  a:hover {
    color: #F6C4B0;
  }
</style>
