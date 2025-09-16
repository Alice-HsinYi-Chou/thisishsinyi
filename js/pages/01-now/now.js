document.addEventListener('DOMContentLoaded', function() {
  // Global variable to store loaded content
  let contentData = null;

  // Load JSON content first
  loadContent().then(() => {
    initializeApp();
  }).catch(error => {
    console.error('Failed to load content:', error);
    // Fallback to show error message or default content
  });

  // Function to load JSON content
  async function loadContent() {
    try {
      const response = await fetch('now-content/now-current.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      contentData = await response.json();
      console.log('Content loaded successfully:', contentData);
    } catch (error) {
      console.error('Error loading content:', error);
      throw error;
    }
  }

  // Initialize app after content is loaded
  function initializeApp() {
    initNavigation();
    initMyPicks();
    initEmotionCarousel();
  }

  // NAVIGATION BETWEEN MAIN PAGES
  function initNavigation() {
    const navLinks = document.querySelectorAll('.js-now-nav');
    const tabs = document.querySelectorAll('.js-tab');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('now-nav__item--active'));
        tabs.forEach(t => t.classList.remove('tab--active'));

        link.classList.add('now-nav__item--active');
        const targetTab = document.querySelector(`.js-tab[data-page="${link.dataset.page}"]`);
        if (targetTab) {
          targetTab.classList.add('tab--active');
        }
      });
    });
  }

  // MYPICKS FUNCTIONALITY
  function initMyPicks() {
    if (!contentData?.mypicks) return;

    const themeItems = document.querySelectorAll('.js-sidebar');
    const themeTitle = document.getElementById('js-topic');
    const themeContentEl = document.querySelector('.mypicks__content');

    // Function to generate HTML from JSON structure
    function generateThemeHTML(themeData) {
      let html = `<p>${themeData.intro}</p>`;
      
      themeData.sections.forEach(section => {
        html += `<h3>${section.heading}</h3>`;
        section.items.forEach(item => {
          html += `<p>${item}</p>`;
        });
      });
      
      return html;
    }

    themeItems.forEach(item => {
      item.addEventListener('click', () => {
        themeItems.forEach(i => i.classList.remove('mypicks__sidebar--active'));
        item.classList.add('mypicks__sidebar--active');

        const selectedTheme = item.dataset.theme;
        const themeData = contentData.mypicks[selectedTheme];

        if (!themeData) {
          console.error(`Theme data not found for: ${selectedTheme}`);
          return;
        }

        // Only attempt transition if elements exist
        if (themeTitle && themeContentEl) {
          // Smooth transition
          themeTitle.style.opacity = '0';
          themeContentEl.style.opacity = '0';

          setTimeout(() => {
            themeTitle.textContent = themeData.title;
            
            // Remove existing content after title
            const elementsToRemove = [];
            let currentElement = themeTitle.nextElementSibling;
            
            while (currentElement) {
              elementsToRemove.push(currentElement);
              currentElement = currentElement.nextElementSibling;
            }
            
            elementsToRemove.forEach(el => el.remove());
            
            // Add new content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generateThemeHTML(themeData);
            
            while (tempDiv.firstChild) {
              themeContentEl.appendChild(tempDiv.firstChild);
            }

            themeTitle.style.opacity = '1';
            themeContentEl.style.opacity = '1';
          }, 300);
        }
      });
    });

    // Apply transitions safely
    if (themeTitle) themeTitle.style.transition = 'opacity 0.3s ease';
    if (themeContentEl) themeContentEl.style.transition = 'opacity 0.3s ease';
  }

  // EMOTION CAROUSEL
  function initEmotionCarousel() {
    if (!contentData?.innerLandscape) return;

    // Get available emotions from JSON
    const emotions = Object.keys(contentData.innerLandscape);
    let currentIndex = 0; // Start with first emotion
    
    const upArrow = document.querySelector('.js-up');
    const downArrow = document.querySelector('.js-down');
    
    if (upArrow) {
      upArrow.addEventListener('click', navigateUp);
    }
    
    if (downArrow) {
      downArrow.addEventListener('click', navigateDown);
    }
    
    function updateCarousel() {
      const prevIndex = (currentIndex - 1 + emotions.length) % emotions.length;
      const nextIndex = (currentIndex + 1) % emotions.length;
      
      const emotionDisplay = document.querySelector('.js-display');
      if (emotionDisplay) {
        emotionDisplay.innerHTML = `
          <div class="emotion emotion--prev">${emotions[prevIndex]}</div>
          <div class="emotion emotion--active">${emotions[currentIndex]}</div>
          <div class="emotion emotion--next">${emotions[nextIndex]}</div>
        `;
        
        // Update content visibility
        document.querySelectorAll('.js-canvas').forEach(canvas => {
          canvas.style.display = 'none';
          canvas.classList.remove('landscape__canvas--active');
        });
        
        // Show active canvas and update content from JSON
        const activeCanvasId = `js-${emotions[currentIndex]}`;
        const activeCanvas = document.getElementById(activeCanvasId);
        if (activeCanvas) {
          const emotionContent = contentData.innerLandscape[emotions[currentIndex]];
          if (emotionContent) {
            activeCanvas.innerHTML = `<p>${emotionContent.content}</p>`;
          }
          activeCanvas.style.display = 'block';
          activeCanvas.classList.add('landscape__canvas--active');
        }
        
        // Add click handlers to navigation items
        const prevItem = document.querySelector('.emotion--prev');
        if (prevItem) {
          prevItem.addEventListener('click', navigateUp);
        }
        
        const nextItem = document.querySelector('.emotion--next');
        if (nextItem) {
          nextItem.addEventListener('click', navigateDown);
        }
      }
    }
    
    function navigateUp() {
      currentIndex = (currentIndex - 1 + emotions.length) % emotions.length;
      updateCarousel();
    }
    
    function navigateDown() {
      currentIndex = (currentIndex + 1) % emotions.length;
      updateCarousel();
    }
    
    // Initialize carousel
    setTimeout(updateCarousel, 100);
  }
});