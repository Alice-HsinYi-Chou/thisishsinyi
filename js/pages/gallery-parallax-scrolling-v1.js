document.addEventListener("DOMContentLoaded", function () {
        // Smooth scrolling for gallery direct buttons
        document.querySelectorAll('.gallery__direct-btn').forEach(button => {
            button.addEventListener('click', e => {
                e.preventDefault();
    
                const targetId = button.getAttribute('href');
                const target = document.querySelector(targetId);
                if (!target) return;
    
                const start = window.pageYOffset;
                const end = target.getBoundingClientRect().top + start;
                const distance = end - start;
                const duration = 2000;
                let startTime;
    
                const animateScroll = currentTime => {
                    startTime ??= currentTime;
                    const time = currentTime - startTime;
                    const progress = Math.min(time / duration, 1);
                    const ease = progress < 0.5
                        ? 4 * progress ** 3
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
                    window.scrollTo(0, start + distance * ease);
    
                    if (time < duration) requestAnimationFrame(animateScroll);
                };
    
                requestAnimationFrame(animateScroll);
                history.pushState(null, null, targetId); // optional
            });
        });
    



    const albums = document.querySelectorAll(".album__container");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                }
            });
        },
        { threshold: 0.2 }
    );

    albums.forEach((album) => {
        observer.observe(album);
    });
});





function checkMissedElements() {
    albums.forEach((album) => {
      const rect = album.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        album.classList.add("in-view");
      }
    });
  }
  
  // Call on load and scroll events
  window.addEventListener("load", checkMissedElements);
  window.addEventListener("scroll", _.throttle(checkMissedElements, 300));

  const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    },
    { 
        threshold: 0.2,
        rootMargin: "200px" // Detect elements 200px before they enter the viewport
    }
);