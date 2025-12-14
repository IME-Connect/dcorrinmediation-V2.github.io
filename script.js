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

  const servicesScroll = document.querySelector('.services-scroll');
  const servicesArrow = document.querySelector('.services-arrow');

  if (servicesScroll) {
    const originalCards = Array.from(servicesScroll.children);
    if (originalCards.length) {
      originalCards.forEach((card) => {
        servicesScroll.appendChild(card.cloneNode(true));
      });

      let cardWidth = 0;
      let loopWidth = 0;

      const calculateDimensions = () => {
        if (!originalCards[0]) {
          return;
        }

        const firstCard = originalCards[0];
        const secondCard = originalCards[1];
        cardWidth = secondCard
          ? secondCard.offsetLeft - firstCard.offsetLeft
          : firstCard.offsetWidth;

        const lastCard = originalCards[originalCards.length - 1];
        loopWidth = lastCard.offsetLeft + lastCard.offsetWidth - firstCard.offsetLeft;
      };

      const normalizeScroll = () => {
        if (!loopWidth) {
          return;
        }

        if (servicesScroll.scrollLeft >= loopWidth) {
          servicesScroll.scrollLeft -= loopWidth;
        }
      };

      calculateDimensions();
      window.addEventListener('resize', () => {
        calculateDimensions();
        normalizeScroll();
      });

      servicesScroll.addEventListener('scroll', () => {
        window.requestAnimationFrame(normalizeScroll);
      });

      if (servicesArrow) {
        servicesArrow.addEventListener('click', () => {
          normalizeScroll();
          servicesScroll.scrollBy({ left: cardWidth || 0, behavior: 'smooth' });
        });
      }
    }
  }
});
