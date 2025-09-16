document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.getElementById('expandbtn');
    const collapseBtn = document.getElementById('collapsebtn');
    const hiddenAlbum = document.getElementById('hiddenAlbum');

    function hasImages(album) {
        return album.querySelectorAll('img').length > 0;
    }

    function toggleAlbum() {
        if (hiddenAlbum.style.display === 'grid') {
            hiddenAlbum.style.display = 'none';
            expandBtn.querySelector('svg').style.transform = 'rotate(0deg)';
            collapseBtn.querySelector('svg').style.transform = 'rotate(0deg)';
            collapseBtn.style.display = 'none';
            expandBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            hiddenAlbum.style.display = 'grid';
            expandBtn.querySelector('svg').style.transform = 'rotate(180deg)';
            collapseBtn.querySelector('svg').style.transform = 'rotate(180deg)';
            collapseBtn.style.display = 'flex';
            hiddenAlbum.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Check if hiddenAlbum has images
    if (!hasImages(hiddenAlbum)) {
        expandBtn.style.display = 'none';
        collapseBtn.style.display = 'none';
    } else {
        expandBtn.addEventListener('click', toggleAlbum);
        collapseBtn.addEventListener('click', toggleAlbum);
    }

    // Handle album navigation buttons
    const albumBtns = document.querySelectorAll('.navigation__album-btn, .navigation__album-btn-active');
    albumBtns.forEach(button => {
        button.addEventListener('click', function() {
            albumBtns.forEach(btn => {
                btn.classList.remove('navigation__album-btn-active');
                btn.classList.add('navigation__album-btn');
            });

            this.classList.remove('navigation__album-btn');
            this.classList.add('navigation__album-btn-active');
        });
    });

    // Handle back button
    const backButton = document.querySelector('.navigation__back-btn');
    backButton.addEventListener('click', function() {
        console.log('Going back to main gallery');
    });
});


