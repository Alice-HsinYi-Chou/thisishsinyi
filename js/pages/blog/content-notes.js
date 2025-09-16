/**
 * notes.js
 * Handles fetching and displaying field notes
 */

document.addEventListener("DOMContentLoaded", function() {
  // Load notes data
  loadNotes();
});

/**
 * Loads field notes
 * Either from a static array or could be modified to fetch from an API
 */
function loadNotes() {
  // Static notes data (could be replaced with fetch request)
  const notes = [
    {
      day: '12',
      month: 'Apr',
      year: '2025',
      text: 'Kudos to @NTKF for creating an amazing cake for Mac\'s fourth birthday!',
      image: 'https://via.placeholder.com/400x400?text=Birthday+Cake'
    },
    {
      day: '05',
      month: 'Apr',
      year: '2025',
      text: 'It was amazing to see (and hear) Gladiator Live at the Opera House!',
      image: 'https://via.placeholder.com/600x300?text=Gladiator+Concert'
    }
  ];
  
  // Render notes to the page
  renderNotes(notes);
}

/**
 * Renders notes to the page
 * @param {Array} notes - Array of note data objects
 */
function renderNotes(notes) {
  const notesContainer = document.getElementById('notes-container');
  
  if (!notesContainer || !notes || !notes.length) return;
  
  // Clear existing content
  notesContainer.innerHTML = '';
  
  // Add each note
  notes.forEach(note => {
    renderSingleNote(note, notesContainer);
  });
}

/**
 * Renders a single note
 * @param {Object} note - Note data object
 * @param {HTMLElement} container - Container to append the note to
 */
function renderSingleNote(note, container) {
  if (!note || !container) return;
  
  const noteElement = document.createElement('div');
  noteElement.className = 'notes__item';
  
  noteElement.innerHTML = `
    <div class="notes__date">
      <a href="#">
        <div>${note.day}</div>
        <div>${note.month}</div>
        <div>${note.year}</div>
      </a>
    </div>
    <div class="notes__content">
      <div>${note.text}</div>
      ${note.image ? `<img src="${note.image}" alt="Note image" />` : ''}
    </div>
  `;
  
  container.appendChild(noteElement);
}

/**
 * Fetches notes from an API endpoint
 * Currently not implemented, but prepared for future use
 */
function fetchNotes() {
  // Example implementation for future use
  fetch('notes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      renderNotes(data.notes);
    })
    .catch(error => {
      console.error('Error fetching notes:', error);
      displayErrorMessage('Failed to load notes. Please try again later.');
    });
}

/**
 * Displays an error message
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
  const notesContainer = document.getElementById('notes-container');
  
  if (notesContainer) {
    notesContainer.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }
}