document.addEventListener("DOMContentLoaded", function() {
  // Get all navigation lenses
  const lenses = document.querySelectorAll('.sunglasses__lens');
  
  // Add click event to each lens
  lenses.forEach(lens => {
    lens.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      activateSection(targetId);
    });
  });
});

/**
 * Activates the target section and highlights the corresponding lens
 * @param {string} targetId - ID of the section to activate
 */
function activateSection(targetId) {
  // Update lens active states
  const lenses = document.querySelectorAll('.sunglasses__lens');
  lenses.forEach(lens => {
    const isActive = lens.getAttribute('data-target') === targetId;
    lens.classList.toggle('sunglasses__lens--active', isActive);
  });
  
  // Update content section visibility
  const contentSections = document.querySelectorAll('.section');
  contentSections.forEach(section => {
    const isActive = section.id === targetId;
    section.classList.toggle('section--active', isActive);
  });
}

// Export the function for global access
window.activateSection = activateSection;