<script>
    // pending
  </script>

  <!-- nav bar -->
  <nav class="top-nav">
    <div class="nav-left">
      <!-- <span class="menu-icon">☰</span> -->
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
    padding: 1.25rem 2rem;
    font-size: 1rem;
    font-weight: 300;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .menu-icon {
    font-size: 1.25rem;
    cursor: pointer;
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
