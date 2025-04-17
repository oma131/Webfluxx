// Select the toggle button and navbar container.
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

// Toggle the active class on the navbar to show/hide nav items.
menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');

  // Change the menu text based on state.
  if (navbar.classList.contains('active')) {
    menuToggle.textContent = 'close';
  } else {
    menuToggle.textContent = 'menu';
  }
});

const phrases = [
  "Design ",
  "Web ",
  "Marketing "
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  const typewriter = document.getElementById("typewriter");
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetweenPhrases = 1500;

  let currentText = '';
  let currentFull = '';

  function typeLoop() {
  const fullPhrase = phrases[phraseIndex];
  const firstSpaceIndex = fullPhrase.indexOf(' ');
  const firstWord = fullPhrase.substring(0, firstSpaceIndex);
  const rest = fullPhrase.substring(firstSpaceIndex + 1);

  if (!isDeleting) {
      letterIndex++;
      currentText = fullPhrase.substring(0, letterIndex);

      // Add highlight if full word is completed
      if (letterIndex >= firstWord.length) {
      typewriter.innerHTML =
          `<span class="highlight">${firstWord}</span> ` +
          `${rest.substring(0, letterIndex - firstWord.length)}`;
      } else {
      typewriter.textContent = currentText;
      }

      if (letterIndex === fullPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, delayBetweenPhrases);
      return;
      }
  } else {
      letterIndex--;
      currentText = fullPhrase.substring(0, letterIndex);

      if (letterIndex >= firstWord.length) {
      typewriter.innerHTML =
          `<span class="highlight">${firstWord}</span> ` +
          `${rest.substring(0, letterIndex - firstWord.length)}`;
      } else {
      typewriter.textContent = currentText;
      }

      if (letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      }
  }

  setTimeout(typeLoop, isDeleting ? erasingSpeed : typingSpeed);
  }

  document.addEventListener("DOMContentLoaded", () => {
  typeLoop();
  });


  // Get DOM Elements
  const prevArrow = document.getElementById('prevArrow');
  const nextArrow = document.getElementById('nextArrow');
  const track = document.querySelector('.testimonial-track');
  const items = document.querySelectorAll('.testimonial-item');
  const container = document.querySelector('.testimonial-container');
  
  let currentIndex = 0;

  // Returns the number of items visible based on screen width
  function getVisibleCount() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  // Slide the track to show the correct items
  function updateCarousel() {
    const visibleCount = getVisibleCount();
    // Calculate container width and item width (considering margins)
    const containerWidth = container.offsetWidth;
    // Calculate the width of one slide (each item uses flex basis already set in CSS)
    const itemWidth = items[0].offsetWidth + 1; // add a little extra if needed for margin compensation
    // Calculate the maximum index allowed so that there are always visible items.
    const maxIndex = items.length - visibleCount;
    // Clamp current index to valid values.
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    // Update the transform based on the current index (slide by itemWidth pixels)
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
  
  // Arrow navigation event listeners
  prevArrow.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });
  nextArrow.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });
  
  // Recalculate on window resize
  window.addEventListener('resize', updateCarousel);
  
  // Initialize the carousel position
  updateCarousel();

  // Select all accordion headers
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', function () {
      // Toggle "active" class on the header
      this.classList.toggle('active');

      // Grab the associated accordion content
      const content = this.nextElementSibling;

      // Toggle accordion height: if open, close it; if closed, open it
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        // Set maxHeight to the scrollHeight to animate opening
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
