// Generic Carousel Handler
function initCarousel(carouselSelector, trackSelector, cardSelector, itemLabel) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;

  const track = carousel.querySelector(trackSelector);
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const indicatorsContainer = carousel.parentElement.querySelector('.carousel-indicators');
  const cards = track.querySelectorAll(cardSelector);

  if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  // Create indicators
  if (indicatorsContainer) {
    for (let i = 0; i < totalCards; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('carousel-indicator');
      indicator.setAttribute('aria-label', `Go to ${itemLabel} ${i + 1}`);
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  function updateCarousel() {
    // Move the track
    const offset = currentIndex * 100;
    track.style.transform = `translateX(-${offset}%)`;

    // Update indicators
    if (indicatorsContainer) {
      const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalCards - 1;
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    if (currentIndex < totalCards - 1) {
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
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Keyboard navigation
  carousel.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Initialize
  updateCarousel();
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', function() {
  // Talks carousel
  initCarousel('.talks-carousel', '.talks-carousel-track', '.talk-card', 'talk');

  // Projects carousels (can have multiple, one per section)
  const projectCarousels = document.querySelectorAll('.projects-carousel');
  projectCarousels.forEach((carousel, index) => {
    const type = carousel.getAttribute('data-type') || 'project';
    initCarousel(`.projects-carousel[data-type="${type}"]`, '.projects-carousel-track', '.project-card', type);
  });
});
