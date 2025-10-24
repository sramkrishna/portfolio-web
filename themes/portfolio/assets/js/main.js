// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousels();
});

function initializeCarousels() {
  // Initialize project carousels
  const projectCarousels = document.querySelectorAll('.projects-carousel');
  projectCarousels.forEach(carousel => {
    initializeCarousel(carousel, '.project-card');
  });

  // Initialize talks carousel
  const talksCarousels = document.querySelectorAll('.talks-carousel');
  talksCarousels.forEach(carousel => {
    initializeCarousel(carousel, '.talk-card');
  });
}

function initializeCarousel(carouselElement, cardSelector) {
  const track = carouselElement.querySelector('.projects-carousel-track, .talks-carousel-track');
  const prevButton = carouselElement.parentElement.querySelector('.carousel-prev');
  const nextButton = carouselElement.parentElement.querySelector('.carousel-next');
  const indicatorsContainer = carouselElement.parentElement.querySelector('.carousel-indicators');

  if (!track) return;

  const cards = Array.from(track.querySelectorAll(cardSelector));
  if (cards.length === 0) return;

  let currentIndex = 0;

  // Create indicators
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    cards.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.classList.add('carousel-indicator');
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  }

  function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    // Update indicators
    if (indicatorsContainer) {
      const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    // Update button states
    if (prevButton) {
      prevButton.disabled = currentIndex === 0;
    }
    if (nextButton) {
      nextButton.disabled = currentIndex === cards.length - 1;
    }
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));
    updateCarousel();
  }

  function nextSlide() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  // Event listeners
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }

  // Keyboard navigation
  carouselElement.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Initialize
  updateCarousel();
}

console.log('Portfolio site loaded');
