document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const targetFromUrl = urlParams.get("target");

  // Only activate a section on load if not already active
  const hasActiveSection = document.querySelector('.section--active');
  const initialTarget = targetFromUrl || (hasActiveSection ? null : 'articles');

  if (initialTarget) {
    activateSection(initialTarget);
  }

  // Setup click events
  const lenses = document.querySelectorAll('.sunglasses__lens');
  lenses.forEach(lens => {
    lens.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      activateSection(targetId);
    });
  });
});

function activateSection(targetId) {
  // Update lenses
  const lenses = document.querySelectorAll('.sunglasses__lens');
  lenses.forEach(lens => {
    const isActive = lens.getAttribute('data-target') === targetId;
    lens.classList.toggle('sunglasses__lens--active', isActive);
  });

  // Update sections
  const contentSections = document.querySelectorAll('.section');
  contentSections.forEach(section => {
    const isActive = section.id === targetId;
    section.classList.toggle('section--active', isActive);
  });

  // Load content if needed
  if (targetId === "articles") {
    loadArticles?.();
  } else if (targetId === "notes") {
    loadNotes?.();
  }
}

// Export for global use
window.activateSection = activateSection;
