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

  // Determine items per page based on section type
  let itemsPerPage = 1; // default for talks
  if (cardSelector === '.project-card') {
    // Check if we're in the Projects section
    const section = carouselElement.closest('.project-type-section');
    if (section && section.classList.contains('project-type-projects')) {
      itemsPerPage = 3; // Projects shows 3 items per page
    } else {
      itemsPerPage = 2; // Events/Tech show 2 items per page
    }
  }
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  let currentPage = 0;

  // Create indicators based on number of pages
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('carousel-indicator');
      indicator.setAttribute('aria-label', `Go to page ${i + 1}`);
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToPage(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  function updateCarousel() {
    // Move by itemsPerPage cards at a time
    const cardWidth = 100 / itemsPerPage; // 50% for 2 items, 100% for 1 item
    const offset = -currentPage * cardWidth * itemsPerPage;
    track.style.transform = `translateX(${offset}%)`;

    // Update indicators
    if (indicatorsContainer) {
      const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPage);
      });
    }

    // Update button states
    if (prevButton) {
      prevButton.disabled = currentPage === 0;
    }
    if (nextButton) {
      nextButton.disabled = currentPage === totalPages - 1;
    }
  }

  function goToPage(pageIndex) {
    currentPage = Math.max(0, Math.min(pageIndex, totalPages - 1));
    updateCarousel();
  }

  function nextSlide() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentPage > 0) {
      currentPage--;
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
