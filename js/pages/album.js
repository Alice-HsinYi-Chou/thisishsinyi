document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.getElementById('expandbtn');
    const collapseBtn = document.getElementById('collapsebtn');
    const hiddenAlbum = document.getElementById('hiddenAlbum');
    let isExpanded = false;
    
    function toggleAlbum() {
        if (isExpanded) {
            hiddenAlbum.style.display = 'none';
            expandBtn.querySelector('svg').style.transform = 'rotate(0deg)';
            collapseBtn.querySelector('svg').style.transform = 'rotate(0deg)';
            collapseBtn.style.display = 'none';
            // Scroll back to main gallery position
            expandBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            hiddenAlbum.style.display = 'grid';
            expandBtn.querySelector('svg').style.transform = 'rotate(180deg)';
            collapseBtn.querySelector('svg').style.transform = 'rotate(180deg)'; 
            collapseBtn.style.display = 'flex';
            // Optional: scroll to show the beginning of expanded content
            hiddenAlbum.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        isExpanded = !isExpanded;
    }
    
    expandBtn.addEventListener('click', toggleAlbum);
    collapseBtn.addEventListener('click', toggleAlbum);
    
    // Handle album navigation buttons
    const albumBtns = document.querySelectorAll('.navigation__album-btb, .navigation__album-btb-active');
    albumBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            albumBtns.forEach(btn => {
                btn.classList.remove('navigation__album-btb-active');
                btn.classList.add('navigation__album-btb');
            });
            
            // Add active class to clicked button
            this.classList.remove('navigation__album-btb');
            this.classList.add('navigation__album-btb-active');
            
            // Here you would add logic to navigate to different albums
            console.log('Navigating to: ' + button.textContent);
        });
    });
    
    // Handle back button
    const backButton = document.querySelector('.navigation__back-btn');
    backButton.addEventListener('click', function() {
        // Here you would add logic to go back to main gallery
        console.log('Going back to main gallery');
    });
});