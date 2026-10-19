/**
 * Theme-aware SVG handler
 * This script helps SVGs with CSS variables inherit colors from the current theme
 */
(function() {
  // Function to refresh SVGs when theme changes
  function updateThemeSvgs() {
    // Find all inline SVGs that might be using theme variables
    const themeSvgs = document.querySelectorAll('svg');

    // Force refresh by triggering a repaint
    themeSvgs.forEach(svg => {
      // Get current display
      const display = window.getComputedStyle(svg).display;

      // Toggle display to force a repaint
      svg.style.display = 'none';

      // Force reflow
      void svg.offsetHeight;

      // Restore original display
      svg.style.display = display;
    });
  }

  // Watch for theme changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'data-theme') {
        // Theme has changed, update SVGs
        updateThemeSvgs();
      }
    });
  });

  // Function to initialize the observer
  function initObserver() {
    // Start observing the document body for theme attribute changes
    if (document.body) {
      updateThemeSvgs(); // Apply initial update

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    } else {
      // If body isn't ready, wait a bit and try again
      setTimeout(initObserver, 100);
    }
  }

  // Start when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
