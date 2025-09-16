/**
 * articles.js
 * Handles fetching and displaying article content
 */

document.addEventListener("DOMContentLoaded", function() {
  // Fetch and load article data
  fetchArticlesData();
});

/**
 * Fetches article data from separate JSON files
 */
function fetchArticlesData() {
  // Track completion of multiple fetch operations
  const fetchPromises = [];
  let featuredArticle = null;
  let archiveArticles = [];
  
  // Fetch latest-article.json
  const latestPromise = fetch('/blog-content/latest-article.json')
    .then(response => {
      if (!response.ok) {
        console.warn('Could not load latest-article.json');
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        featuredArticle = data;
      }
    })
    .catch(error => {
      console.error('Error fetching latest article:', error);
    });
  
  fetchPromises.push(latestPromise);
  
  // Fetch articles.json
  const archivePromise = fetch('/blog-content/articles.json')
    .then(response => {
      if (!response.ok) {
        console.warn('Could not load articles.json');
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data)) {
        archiveArticles = data;
      } else if (data && Array.isArray(data.articles)) {
        // Handle case where articles are in a nested "articles" property
        archiveArticles = data.articles;
        
        // If we don't have a featured article yet and there's a "latest" in this JSON
        if (!featuredArticle && data.latest) {
          featuredArticle = data.latest;
        }
      }
    })
    .catch(error => {
      console.error('Error fetching archive articles:', error);
    });
  
  fetchPromises.push(archivePromise);
  
  // When all fetches complete, render the articles
  Promise.all(fetchPromises)
    .then(() => {
      // If we have a featured article, render it
      if (featuredArticle) {
        renderFeaturedArticle(featuredArticle);
      } else {
        console.warn('No featured article found');
      }
      
      // If we have archive articles, render them
      if (archiveArticles.length > 0) {
        renderArchiveArticles(archiveArticles);
      } else {
        console.warn('No archive articles found');
      }
    })
    .catch(error => {
      console.error('Error rendering articles:', error);
      displayErrorMessage('Failed to load articles. Please try again later.');
    });
}

/**
 * Renders the featured article
 * @param {Object} article - The featured article data
 */
function renderFeaturedArticle(article) {
  const featureSection = document.getElementById('feature-article');
  
  if (!featureSection || !article) return;
  
  featureSection.innerHTML = `
    <div class="feature__header" id="feature-header">
      <img src="${article.image}" alt="${article.title}">
      <div class="feature__meta">
        <h3 class="feature__title">${article.title}</h3>
        <p class="feature__subtitle">${article.subtitle}</p>
        <p class="feature__date">${article.date}</p>
      </div>
      <div class="feature__toggle" id="feature-toggle">&#9660;</div>
    </div>
    <div class="feature__content feature__content--collapsed" id="feature-content">
      ${Array.isArray(article.content) 
        ? article.content.map(paragraph => `<p>${paragraph}</p>`).join('') 
        : `<p>${article.content}</p>`}
    </div>
  `;
  
  // Add toggle functionality
  const featureHeader = document.getElementById('feature-header');
  if (featureHeader) {
    featureHeader.addEventListener('click', toggleFeatureContent);
  }
}

/**
 * Renders archive articles
 * @param {Array} articles - Array of article data
 */
function renderArchiveArticles(articles) {
  const archiveContainer = document.getElementById('archive-container');
  
  if (!archiveContainer || !articles || !articles.length) return;
  
  // Clear existing content
  archiveContainer.innerHTML = '';
  
  // Add each article
  articles.forEach(article => {
    const articleElement = document.createElement('a');
    articleElement.className = 'archive__post';
    articleElement.href = article.link || '#';
    
    articleElement.innerHTML = `
      <div class="archive__content">
        <p class="archive__title">${article.title}</p>
        <p class="archive__subtitle">${article.subtitle || ''}</p>
        <p class="archive__date">${article.date}</p>
      </div>
      <div class="archive__image">
        <img src="${article.image}" alt="${article.title}">
      </div>
    `;
    
    archiveContainer.appendChild(articleElement);
  });
}

/**
 * Toggles the visibility of the feature article content
 */
function toggleFeatureContent() {
  const content = document.getElementById('feature-content');
  const toggle = document.getElementById('feature-toggle');
  
  if (!content || !toggle) return;
  
  const isCollapsed = content.classList.contains('feature__content--collapsed');
  
  // Toggle content visibility
  content.classList.toggle('feature__content--collapsed', !isCollapsed);
  content.classList.toggle('feature__content--expanded', isCollapsed);
  
  // Toggle arrow rotation
  toggle.classList.toggle('feature__toggle--rotated', isCollapsed);
}

/**
 * Displays an error message
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
  const featureSection = document.getElementById('feature-article');
  
  if (featureSection) {
    featureSection.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }
}

// Export functions for global access
window.toggleFeatureContent = toggleFeatureContent;