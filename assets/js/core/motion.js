/* ==========================================================================
   Motion — scroll reveals, number count-up and magnetic buttons.
   Pages call Guide.reveal(container) after rendering dynamic markup.
   ========================================================================== */
(() => {
  const G = window.Guide;
  const supportsIO = 'IntersectionObserver' in window;

  /* ---------- Count-up ---------- */
  function countUp(el) {
    const end = parseFloat(el.dataset.count);
    if (!isFinite(end)) return;
    if (G.reduced) { el.textContent = end; return; }
    const dur = 1400, t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = supportsIO && new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('is-in');
      el.querySelectorAll('[data-count]').forEach(countUp);
      if (el.hasAttribute('data-count')) countUp(el);
      io.unobserve(el);
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' }   /* threshold 0: العناصر الأطول من الشاشة (بطاقات الأقسام) تظهر أيضًا */);

  G.reveal = (root = document) => {
    const items = root.querySelectorAll('[data-reveal], [data-split], [data-count]');
    items.forEach((el) => {
      if (el.dataset.seen) return;
      el.dataset.seen = '1';
      if (!io) { el.classList.add('is-in'); if (el.dataset.count) el.textContent = el.dataset.count; return; }
      io.observe(el);
    });
    /* Auto stagger: children of [data-stagger] get an incremental --i */
    root.querySelectorAll('[data-stagger]').forEach((p) => {
      [...p.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 10)));
    });
  };

  /* ---------- Magnetic buttons (pointer devices only) ---------- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !G.reduced) {
    document.addEventListener('pointermove', (e) => {
      const m = e.target.closest && e.target.closest('[data-magnet]');
      document.querySelectorAll('[data-magnet].is-magnet').forEach((el) => {
        if (el !== m) { el.classList.remove('is-magnet'); el.style.translate = ''; }
      });
      if (!m) return;
      const r = m.getBoundingClientRect();
      m.classList.add('is-magnet');
      m.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.12}px ${(e.clientY - r.top - r.height / 2) * 0.2}px`;
    });
  }

  /* ---------- Global shortcut: "/" focuses the first search field ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = document.activeElement;
    if (t && /^(input|textarea|select)$/i.test(t.tagName)) return;
    const field = document.querySelector('[data-search-field]');
    if (field) { e.preventDefault(); field.focus(); }
  });

  G.reveal();
})();
