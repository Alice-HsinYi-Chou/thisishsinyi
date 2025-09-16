document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach(function(element) {
        if (isElementInViewport(element)) {
          element.classList.add('visible');
        }
      });
    }
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
      handleScrollAnimations();
    });
    
    // Also trigger on resize for responsiveness
    window.addEventListener('resize', function() {
      handleScrollAnimations();
    });
  });