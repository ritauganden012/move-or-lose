<script>
    // pending
  </script>

  <!-- nav bar -->
  <nav class="top-nav">
    <div class="nav-left">
      <a href="/">Explore</a>
      <a href="/data">Policy Recommendation </a>
      <a href="/about">About Us</a>
    </div>
  </nav>

  <slot /> <!-- All route content will render here -->

  <style>
  .top-nav {
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    font-size: 1rem;
    font-weight: 300;
    font-family: 'Source Sans 3', sans-serif;
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
