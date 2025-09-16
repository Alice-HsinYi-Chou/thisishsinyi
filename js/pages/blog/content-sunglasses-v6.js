// Improved toggle system with better initialization
function initializeToggleSystem() {
  console.log('Initializing toggle system...'); // Debug log
  
  const urlParams = new URLSearchParams(window.location.search);
  const targetFromUrl = urlParams.get("target");

  // Default section fallback
  const initialTarget = targetFromUrl || "articles";
  console.log('Initial target:', initialTarget); // Debug log
  
  // Ensure DOM elements exist before proceeding
  const lenses = document.querySelectorAll(".sunglasses__lens");
  const sections = document.querySelectorAll(".section");
  
  if (lenses.length === 0 || sections.length === 0) {
    console.log('DOM elements not ready, retrying...'); // Debug log
    setTimeout(initializeToggleSystem, 50);
    return;
  }
  
  // Initialize immediately, then attach listeners
  activateSection(initialTarget);
  attachToggleListeners();
}

function attachToggleListeners() {
  const lenses = document.querySelectorAll(".sunglasses__lens");
  console.log('Attaching listeners to', lenses.length, 'lenses'); // Debug log
  
  // Remove existing listeners to prevent duplicates
  lenses.forEach((lens) => {
    // Mark as initialized to prevent double initialization
    lens.setAttribute('data-initialized', 'true');
    
    // Remove any existing click listeners by cloning the element
    const newLens = lens.cloneNode(true);
    lens.parentNode.replaceChild(newLens, lens);
    
    // Add fresh click listener to the new element
    newLens.addEventListener("click", handleLensClick);
  });
}

function handleLensClick(event) {
  const targetId = this.getAttribute("data-target");
  activateSection(targetId);
  
  // Update URL without page reload
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('target', targetId);
  window.history.replaceState({}, '', newUrl);
}

function activateSection(targetId) {
  console.log('Activating section:', targetId); // Debug log
  
  // Ensure we have a valid target
  if (!targetId || (targetId !== 'articles' && targetId !== 'notes')) {
    console.log('Invalid target, defaulting to articles');
    targetId = 'articles';
  }
  
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
    
    // Also handle display property for better compatibility
    if (isActive) {
      section.style.display = '';
    } else {
      section.style.display = 'none';
    }
  });

  // Load dynamic content
  if (targetId === "articles") {
    if (typeof loadArticles === 'function') {
      loadArticles();
    }
  } else if (targetId === "notes") {
    if (typeof loadNotes === 'function') {
      loadNotes();
    }
  }
}

// Multiple initialization approaches to ensure it works
document.addEventListener("DOMContentLoaded", function() {
  console.log('DOMContentLoaded fired');
  initializeToggleSystem();
});

// Fallback for cases where DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeToggleSystem);
} else {
  console.log('DOM already ready, initializing immediately');
  // DOM is already ready, initialize immediately
  setTimeout(initializeToggleSystem, 10);
}

// Additional fallback for page navigation
window.addEventListener('load', function() {
  console.log('Window load fired');
  // Double-check initialization after full page load
  const lenses = document.querySelectorAll(".sunglasses__lens");
  if (lenses.length > 0 && !lenses[0].hasAttribute('data-initialized')) {
    initializeToggleSystem();
  }
});

// Make functions globally available
window.activateSection = activateSection;
window.initializeToggleSystem = initializeToggleSystem;