<!-- Scrolly.svelte -->
<script>
  import { onMount } from 'svelte';
  
  export let threshold = 0.5; // Visibility threshold for triggering sections
  let sections;
  let container;
  let currentSection = 0;
  
  // Create an array to store IntersectionObserver entries
  let observers = [];
  
  onMount(() => {
    // Get all sections with class scrolly-section
    sections = container.querySelectorAll('.scrolly-section');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, threshold, 1.0]
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          // Get the section index
          const index = Array.from(sections).indexOf(entry.target);
          if (index !== -1) {
            currentSection = index;
          }
        }
      });
    };
    
    // Create observers for each section
    sections.forEach((section) => {
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      observer.observe(section);
      observers.push(observer);
    });
    
    return () => {
      // Cleanup observers on component destruction
      observers.forEach(observer => observer.disconnect());
    };
  });
</script>

<div class="scrolly" bind:this={container}>
  <slot />
</div>

<style>
  .scrolly {
    position: relative;
    width: 100%;
  }
</style>
