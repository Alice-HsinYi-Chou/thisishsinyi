document.addEventListener("DOMContentLoaded", () => {
    new Slider(document.querySelector('.home__cards'));
});

class Slider {
    constructor(container) {
        // Initialize properties
        this.container = container;
        this.slides = container.querySelector('.slider__items'); // Updated selector
        this.slideElements = container.querySelectorAll('.slider__item'); // Updated selector
        this.pagination = container.querySelector('.pagination');
        this.currentIndex = 0;
        this.titles = ["Now", "Blog", "Gallery", "More"];

        this.init();
    }

    init() {
        // Create pagination bullets
        this.slideElements.forEach((_, index) => {
            const bullet = document.createElement('div');
            bullet.className = 'bullet';
            if (index === 0) bullet.classList.add('active');

            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.titles[index];
            bullet.appendChild(tooltip);

            bullet.addEventListener('click', () => this.goToSlide(index));
            this.pagination.appendChild(bullet);
        });

        // Add navigation handlers
        this.container.querySelector('.prev').addEventListener('click', () => this.prev());
        this.container.querySelector('.next').addEventListener('click', () => this.next());
    }

    goToSlide(index) {
        this.currentIndex = index;
        const offset = index * 100; 
        this.slides.style.transform = `translateX(-${offset}%)`; // Ensure slides move correctly

        // Update active bullet
        const bullets = this.pagination.querySelectorAll('.bullet');
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === index);
        });
    }

    prev() {
        const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slideElements.length - 1;
        this.goToSlide(newIndex);
    }

    next() {
        const newIndex = this.currentIndex < this.slideElements.length - 1 ? this.currentIndex + 1 : 0;
        this.goToSlide(newIndex);
    }
}

// Initialize the slider *seems like duplication
//new Slider(document.querySelector('.slider__viewpoint'));

// when i click left, move slide to the left
//     const nextButton = document.querySeletor ('.')
// when i click right, move slide to the riht
//     const prevButton = document.querySeletor ('.')
// when i click nav, move slide to that slide
//      const NavLine = document.querySeletor ('.')
//  (indi) const Line = Array.from (NavLine.children)

