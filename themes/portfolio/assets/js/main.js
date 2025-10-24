// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousels();
});

function initializeCarousels() {
  // Initialize project carousels
  const projectCarousels = document.querySelectorAll('.projects-carousel');
  console.log('Found', projectCarousels.length, 'project carousels');
  projectCarousels.forEach((carousel, index) => {
    console.log('Initializing project carousel', index + 1, 'of', projectCarousels.length);
    initializeCarousel(carousel, '.project-card');
  });

  // Initialize talks carousel
  const talksCarousels = document.querySelectorAll('.talks-carousel');
  console.log('Found', talksCarousels.length, 'talks carousels');
  talksCarousels.forEach((carousel, index) => {
    console.log('Initializing talks carousel', index + 1, 'of', talksCarousels.length);
    initializeCarousel(carousel, '.talk-card');
  });
}

function initializeCarousel(carouselElement, cardSelector) {
  const track = carouselElement.querySelector('.projects-carousel-track, .talks-carousel-track');
  const prevButton = carouselElement.parentElement.querySelector('.carousel-prev');
  const nextButton = carouselElement.parentElement.querySelector('.carousel-next');
  // Get the indicators container that's a sibling to this carousel's parent container
  const section = carouselElement.closest('.project-type-section, .talks-section');
  const indicatorsContainer = section?.querySelector('.carousel-indicators');

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

  // Get the carousel wrapper width to calculate card sizes
  const wrapper = carouselElement.querySelector('.projects-carousel-wrapper, .talks-carousel-wrapper');
  const wrapperWidth = wrapper.offsetWidth;

  // Calculate card width based on wrapper width and items per page
  // Account for gap between cards
  const gap = 24; // var(--spacing-lg) is 24px
  const totalGapWidth = (itemsPerPage - 1) * gap;
  const cardWidth = (wrapperWidth - totalGapWidth) / itemsPerPage;

  // Set each card's width explicitly
  cards.forEach(card => {
    card.style.width = `${cardWidth}px`;
    card.style.minWidth = `${cardWidth}px`;
  });

  // Debug logging
  console.log('Carousel initialized:', {
    cardSelector,
    cardsCount: cards.length,
    itemsPerPage,
    totalPages,
    wrapperWidth,
    cardWidth,
    gap,
    sectionClass: section?.className,
    hasIndicatorContainer: !!indicatorsContainer
  });

  let currentPage = 0;

  // Create indicators based on number of pages
  if (indicatorsContainer) {
    console.log('Before clearing indicators:', indicatorsContainer.children.length);
    indicatorsContainer.innerHTML = '';
    console.log('Creating', totalPages, 'indicators');
    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('carousel-indicator');
      indicator.setAttribute('aria-label', `Go to page ${i + 1}`);
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToPage(i));
      indicatorsContainer.appendChild(indicator);
      console.log('Added indicator', i+1, 'of', totalPages, '- container now has', indicatorsContainer.children.length, 'children');
    }
  }

  function updateCarousel() {
    console.log('updateCarousel START - indicators:', indicatorsContainer?.children.length);

    // Calculate offset based on card width, gap, and current page
    // Each page shows itemsPerPage cards, so offset by that many cards plus gaps
    const offset = -(currentPage * (cardWidth * itemsPerPage + gap * itemsPerPage));
    track.style.transform = `translateX(${offset}px)`;
    console.log('After transform - indicators:', indicatorsContainer?.children.length, 'offset:', offset);

    // Update indicators
    if (indicatorsContainer) {
      const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
      console.log('Found', indicators.length, 'indicator elements to update');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPage);
      });
      console.log('After toggle - indicators:', indicatorsContainer.children.length);
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

  // Debug: Check indicator count after initialization
  setTimeout(() => {
    console.log('After initialization, indicator container has', indicatorsContainer?.children.length, 'children');
  }, 0);
}

console.log('Portfolio site loaded');
