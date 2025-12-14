document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#nav-menu');
  const yearEl = document.querySelector('#year');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('[data-scroll-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.getAttribute('data-scroll-target'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const serviceCards = document.querySelectorAll('.services-grid .card');

  const equalizeServiceCardHeights = () => {
    if (!serviceCards.length) {
      return;
    }

    serviceCards.forEach((card) => {
      card.style.height = '';
    });

    const shouldMatchHeights = window.matchMedia('(min-width: 901px)').matches;
    if (!shouldMatchHeights) {
      return;
    }

    const tallest = Math.max(...Array.from(serviceCards, (card) => card.offsetHeight));
    serviceCards.forEach((card) => {
      card.style.height = `${tallest}px`;
    });
  };

  equalizeServiceCardHeights();
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(equalizeServiceCardHeights);
  });
  window.addEventListener('load', equalizeServiceCardHeights);
});
