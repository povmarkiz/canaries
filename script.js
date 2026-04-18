// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('done');
  }, 1400);
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Subtle parallax on story images
const stories = document.querySelectorAll('.story__image');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const vh = window.innerHeight;
      stories.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const progress = (rect.top + rect.height / 2) / vh; // ~1 at bottom, 0 at top
          const shift = (0.5 - progress) * 24;
          img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.05)`;
        }
      });
      ticking = false;
    });
    ticking = true;
  }
});
