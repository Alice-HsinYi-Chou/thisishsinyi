 // Function to show full image
 function FullView(imgSrc) {
    const fullView = document.getElementById('fullImageView');
    const fullImage = document.getElementById('fullImage');
    
    // Set image source
    fullImage.src = imgSrc;
    
    // Show the full view
    fullView.classList.add('active');
    
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close full image view
function CloseFullView() {
    const fullView = document.getElementById('fullImageView');
    
    // Hide the full view
    fullView.classList.remove('active');
    
    // Re-enable scrolling
    document.body.style.overflow = '';
}

// Close on clicking outside the image
document.getElementById('fullImageView').addEventListener('click', function(e) {
    // Only close if the click was directly on the background (not on the image)
    if (e.target === this) {
        CloseFullView();
    }
});

// Close on ESC key press
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        CloseFullView();
    }
});







// Add this to your gallery-full-image-view.js file
document.addEventListener('DOMContentLoaded', function() {
    // Get the container element
    const lastImageContainer = document.querySelector('.album__grid > div:last-child');
    
    if (!lastImageContainer) return; // Exit if the element doesn't exist
    
    // Get the image element
    const imageElement = lastImageContainer.querySelector('img');
    
    // Determine if we should show the image based on whether it has a valid src
    const hasValidImage = imageElement && 
                         imageElement.src && 
                         imageElement.src.trim() !== '' &&
                         !imageElement.src.endsWith('/') &&
                         imageElement.getAttribute('src').trim() !== '';
    
    if (hasValidImage) {
        // Configure for image display
        lastImageContainer.classList.remove('album__empty-box');
        lastImageContainer.classList.add('album__all-image');
        // Make sure img is visible
        imageElement.style.display = 'block';
        // Hide any "coming soon" text
        const textElem = lastImageContainer.querySelector('.text');
        if (textElem) {
            textElem.style.display = 'none';
        }
        // Ensure the click handler works
        lastImageContainer.style.cursor = 'pointer';
    } else {
        // Configure for "coming soon" display
        lastImageContainer.classList.add('album__empty-box');
        // Hide the image if it exists
        if (imageElement) {
            imageElement.style.display = 'none';
        }
        // Show "coming soon" text
        let textElem = lastImageContainer.querySelector('.text');
        if (!textElem) {
            // Create text element if it doesn't exist
            textElem = document.createElement('div');
            textElem.className = 'text';
            textElem.textContent = 'coming soon';
            lastImageContainer.appendChild(textElem);
        }
        textElem.style.display = 'block';
        lastImageContainer.style.cursor = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Add a style tag to hide the last container initially
    const style = document.createElement('style');
    style.textContent = `
        .album__grid > div:last-child {
            visibility: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Get the container element
    const lastImageContainer = document.querySelector('.album__grid > div:last-child');
    
    if (!lastImageContainer) {
        // If element doesn't exist, remove the style and exit
        document.head.removeChild(style);
        return;
    }
    
    // Get the image element
    const imageElement = lastImageContainer.querySelector('img');
    
    // Determine if we should show the image based on whether it has a valid src
    const hasValidImage = imageElement && 
                         imageElement.getAttribute('src') && 
                         imageElement.getAttribute('src').trim() !== '';
    
    if (hasValidImage) {
        // Configure for image display
        lastImageContainer.classList.remove('album__empty-box');
        lastImageContainer.classList.add('album__all-image');
        // Make sure img is visible
        imageElement.style.display = 'block';
        // Hide any "coming soon" text
        const textElem = lastImageContainer.querySelector('.text');
        if (textElem) {
            textElem.style.display = 'none';
        }
        // Ensure the click handler works
        lastImageContainer.style.cursor = 'pointer';
    } else {
        // Configure for "coming soon" display
        lastImageContainer.classList.add('album__empty-box');
        // Hide the image if it exists
        if (imageElement) {
            imageElement.style.display = 'none';
        }
        // Show "coming soon" text
        let textElem = lastImageContainer.querySelector('.text');
        if (!textElem) {
            // Create text element if it doesn't exist
            textElem = document.createElement('div');
            textElem.className = 'text';
            textElem.textContent = 'coming soon';
            lastImageContainer.appendChild(textElem);
        }
        textElem.style.display = 'block';
        lastImageContainer.style.cursor = 'auto';
    }
    
    // Make the container visible again after setting up correctly
    setTimeout(() => {
        lastImageContainer.style.visibility = 'visible';
        document.head.removeChild(style);
    }, 50);
});