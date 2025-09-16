document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const target = urlParams.get("target") || "articles"; // Fallback to "articles" if not present
  activateSection(target);

  const lenses = document.querySelectorAll('.sunglasses__lens');
  lenses.forEach(lens => {
    lens.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      activateSection(targetId);
    });
  });
});

function activateSection(targetId) {
  const lenses = document.querySelectorAll('.sunglasses__lens');
  lenses.forEach(lens => {
    const isActive = lens.getAttribute('data-target') === targetId;
    lens.classList.toggle('sunglasses__lens--active', isActive);
  });

  const contentSections = document.querySelectorAll('.section');
  contentSections.forEach(section => {
    const isActive = section.id === targetId;
    section.classList.toggle('section--active', isActive);
  });

  // Optional: populate content if needed
  if (targetId === "articles") {
    loadArticles?.();
  } else if (targetId === "notes") {
    loadNotes?.();
  }
}

window.activateSection = activateSection;
