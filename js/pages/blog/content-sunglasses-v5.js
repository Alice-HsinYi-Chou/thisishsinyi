document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const targetFromUrl = urlParams.get("target");

  // Default section fallback
  const initialTarget = targetFromUrl || "articles";
  activateSection(initialTarget);

  const lenses = document.querySelectorAll(".sunglasses__lens");
  lenses.forEach((lens) => {
    lens.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      activateSection(targetId);
    });
  });
});

function activateSection(targetId) {
  // Toggle lens active state
  const lenses = document.querySelectorAll(".sunglasses__lens");
  lenses.forEach((lens) => {
    const isActive = lens.getAttribute("data-target") === targetId;
    lens.classList.toggle("sunglasses__lens--active", isActive);
  });

  // Toggle section visibility
  const contentSections = document.querySelectorAll(".section");
  contentSections.forEach((section) => {
    const isActive = section.id === targetId;
    section.classList.toggle("section--active", isActive);
  });

  // Load dynamic content
  if (targetId === "articles") {
    loadArticles?.();
  } else if (targetId === "notes") {
    loadNotes?.();
  }
}

window.activateSection = activateSection;
