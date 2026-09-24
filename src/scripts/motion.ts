// All site animation lives here. Everything is skipped for visitors who prefer reduced motion.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Reveal elements with [data-reveal] as they scroll into view.
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
  );
  revealEls.forEach((el) => io.observe(el));
}

// 2. Shrink the nav bar once the page is scrolled.
const header = document.querySelector('.site-header');
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 3. Parallax: [data-parallax="0.2"] moves at a fraction of the scroll speed.
const parallaxEls = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
if (!reduce && parallaxEls.length) {
  let ticking = false;
  const update = () => {
    for (const el of parallaxEls) {
      const speed = parseFloat(el.dataset.parallax || '0.2');
      const rect = (el.parentElement ?? el).getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    }
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) requestAnimationFrame(update);
      ticking = true;
    },
    { passive: true },
  );
  update();
}

// 4. Falling jasmine / marigold petals inside [data-petals].
if (!reduce) {
  const colors = ['#f2a93b', '#e8912d', '#fffdf6', '#f7c6c0', '#f9d77e', '#fffaf0'];
  document.querySelectorAll<HTMLElement>('[data-petals]').forEach((box) => {
    const count = window.innerWidth < 700 ? 14 : 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      const size = 7 + Math.random() * 10;
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty('--size', `${size}px`);
      p.style.setProperty('--dur', `${10 + Math.random() * 12}s`);
      p.style.setProperty('--delay', `${-Math.random() * 22}s`);
      p.style.setProperty('--sway', `${(Math.random() - 0.5) * 140}px`);
      p.style.setProperty('--spin', `${Math.random() > 0.5 ? 1 : -1}`);
      p.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      box.appendChild(p);
    }
  });
}

// 5. Cross-fading hero slideshow.
document.querySelectorAll<HTMLElement>('[data-slideshow]').forEach((show) => {
  const slides = [...show.children];
  if (slides.length < 2 || reduce) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 6000);
});
