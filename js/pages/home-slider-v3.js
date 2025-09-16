document.addEventListener("DOMContentLoaded", () => {
    new Slider(document.querySelector('.home__cards'));
});

class Slider {
    constructor(container) {
        // Initialize properties
        this.container = container;
        this.slides = container.querySelector('.slider__items');
        this.slideElements = container.querySelectorAll('.slider__item');
        this.pagination = container.querySelector('.pagination');
        this.currentIndex = 0;
        this.titles = ["Now", "Blog", "Gallery", "More"];
        this.subtitleShown = false; // Track if subtitle is currently shown
        this.isTransitioning = false; // Track if transition is happening
        this.init();
        
        // Add keyboard event listener
        this.handleKeyboard = this.handleKeyboard.bind(this);
        document.addEventListener('keydown', this.handleKeyboard);
    }

    init() {
        // Clone the first slide and append it to the end
        const firstClone = this.slideElements[0].cloneNode(true);
        this.slides.appendChild(firstClone);
        
        // Add a clone of the last slide and prepend it to the beginning
        const lastClone = this.slideElements[this.slideElements.length - 1].cloneNode(true);
        this.slides.insertBefore(lastClone, this.slides.firstChild);
        
        // Update slideElements to include the new clones
        this.slideElements = this.container.querySelectorAll('.slider__item');
        
        // Start at index 1 (which is the real first slide, after the prepended clone)
        this.currentIndex = 1;
        this.goToSlide(this.currentIndex, false);
        
        // Create pagination bullets
        this.pagination.innerHTML = ""; // Clear previous pagination if any
        for (let i = 0; i < this.titles.length; i++) {
            const bullet = document.createElement('div');
            bullet.className = 'bullet';
            if (i === 0) bullet.classList.add('active');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.titles[i];
            bullet.appendChild(tooltip);
            bullet.addEventListener('click', () => {
                if (this.isTransitioning) return;
                this.hideSubtitle(); // Hide subtitle when changing slides via bullet
                this.goToSlide(i + 1); // +1 to account for the prepended clone
            });
            this.pagination.appendChild(bullet);
        }
        
        // Add navigation handlers
        this.container.querySelector('.prev').addEventListener('click', () => {
            if (this.isTransitioning) return;
            this.hideSubtitle(); // Hide subtitle when using prev button
            this.prev();
        });
        this.container.querySelector('.next').addEventListener('click', () => {
            if (this.isTransitioning) return;
            this.hideSubtitle(); // Hide subtitle when using next button
            this.next();
        });

        // Handle mouse interactions
        this.slideElements.forEach(slide => {
            const cardBg = slide.querySelector('.card__background');
            if (cardBg) {
                cardBg.addEventListener('mouseenter', () => {
                    if (!cardBg.dataset.keyboardActive) {
                        // Only reset if not keyboard-activated
                        this.hideSubtitle();
                    }
                });
                cardBg.addEventListener('mouseleave', () => {
                    if (!cardBg.dataset.keyboardActive) {
                        // Only hide if not keyboard-activated
                        this.hideSubtitle();
                    }
                });
            }
        });
        
        // Add transition end event listener
        this.slides.addEventListener('transitionend', () => {
            if (this.currentIndex === this.slideElements.length - 1) {
                this.goToSlide(1, false); // Go to the real first slide (not the clone)
            } else if (this.currentIndex === 0) {
                this.goToSlide(this.slideElements.length - 2, false); // Go to the real last slide (not the clone)
            }
            this.isTransitioning = false;
        });
    }

    goToSlide(index, smooth = true) {
        this.currentIndex = index;
        const offset = index * 100;
        
        if (!smooth) {
            this.slides.style.transition = "none";
            this.slides.style.transform = `translateX(-${offset}%)`;
            // Force reflow to make sure transition gets removed before setting new styles
            void this.slides.offsetWidth;
        } else {
            this.isTransitioning = true;
            this.slides.style.transition = "transform 0.3s ease-in-out";
            this.slides.style.transform = `translateX(-${offset}%)`;
        }
        
        // Update active pagination bullets (adjust for the cloned slides)
        const bullets = this.pagination.querySelectorAll('.bullet');
        const realIndex = (index - 1 + this.titles.length) % this.titles.length;
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === realIndex);
        });
    }

    next() {
        if (this.isTransitioning) return;
        this.currentIndex++;
        this.goToSlide(this.currentIndex);
    }

    prev() {
        if (this.isTransitioning) return;
        this.currentIndex--;
        this.goToSlide(this.currentIndex);
    }

    handleKeyboard(event) {
        if (this.isTransitioning) return;
        
        switch(event.key) {
            case 'ArrowLeft':
                this.hideSubtitle(); // Hide subtitle when changing slides
                this.prev();
                break;
            case 'ArrowRight':
                this.hideSubtitle(); // Hide subtitle when changing slides
                this.next();
                break;
            case 'Enter':
                if (!this.subtitleShown) {
                    this.showSubtitle();
                } else {
                    this.selectCurrentSlide();
                }
                break;
            case 'Escape':
            case 'Backspace':
                this.hideSubtitle();
                break;
        }
    }

    showSubtitle() {
        const currentSlide = this.slideElements[this.currentIndex];
        const cardBackground = currentSlide.querySelector('.card__background');
        if (cardBackground) {
            // Add a data attribute to track keyboard-triggered state
            cardBackground.dataset.keyboardActive = 'true';
            const subtitle = cardBackground.querySelector('.card__subtitle');
            if (subtitle) {
                subtitle.style.opacity = '1';
                this.subtitleShown = true;
            }
        }
    }

    hideSubtitle() {
        this.slideElements.forEach(slide => {
            const cardBackground = slide.querySelector('.card__background');
            if (cardBackground) {
                // Remove the keyboard-triggered state
                delete cardBackground.dataset.keyboardActive;
                const subtitle = cardBackground.querySelector('.card__subtitle');
                if (subtitle && !cardBackground.matches(':hover')) {
                    subtitle.style.opacity = '';  // Remove inline style to let CSS take over
                }
            }
        });
        this.subtitleShown = false;
    }

    selectCurrentSlide() {
        const currentSlide = this.slideElements[this.currentIndex];
        const link = currentSlide.querySelector('.card__link');
        if (link) {
            if (link.href) {
                window.location.href = link.href;
            } else {
                link.click();
            }
        }
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyboard);
    }
}