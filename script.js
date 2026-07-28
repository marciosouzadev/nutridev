document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ */
  /* Header: sombra ao rolar a página                                   */
  /* ------------------------------------------------------------------ */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Menu mobile (hamburger)                                            */
  /* ------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------------------------------ */
  /* Animação de entrada ao rolar (Intersection Observer)               */
  /* ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------ */
  /* Accordion do FAQ                                                    */
  /* ------------------------------------------------------------------ */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      accordionItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.accordion__panel').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* Carrossel de depoimentos                                            */
  /* ------------------------------------------------------------------ */
  const track = document.getElementById('carouselTrack');

  if (track) {
    const cards = Array.from(track.children);
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsWrap = document.getElementById('carouselDots');
    let index = 0;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function updateDots() {
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }

    function goTo(i) {
      index = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({ left: cards[index].offsetLeft, behavior: 'smooth' });
      updateDots();
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let closest = 0;
        let closestDiff = Infinity;
        cards.forEach((card, i) => {
          const diff = Math.abs(card.offsetLeft - track.scrollLeft);
          if (diff < closestDiff) { closestDiff = diff; closest = i; }
        });
        index = closest;
        updateDots();
      }, 100);
    }, { passive: true });

    updateDots();
  }

  /* ------------------------------------------------------------------ */
  /* Botão "voltar ao topo"                                              */
  /* ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------ */
  /* Ano dinâmico no rodapé                                             */
  /* ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
