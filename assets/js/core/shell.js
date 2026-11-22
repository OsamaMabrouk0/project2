/* ==========================================================================
   Shell — injects the shared chrome on every page:
   top bar, mobile dock, footer, first-visit loader and route-change curtain.
   ========================================================================== */
(() => {
  const G = window.Guide;
  const b = G.base;
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);

  const PAGES = [
    ['home', 'house', 'index.html'],
    ['halls', 'door-open', 'pages/halls.html'],
    ['map', 'map', 'pages/map.html'],
    ['about', 'graduation-cap', 'pages/about.html'],
    ['team', 'users', 'pages/team.html'],
  ];
  const href = (p) => b + p[2];
  const active = (p) => (p[0] === page ? ' is-active" aria-current="page' : '');

  /* ---------- Markup ---------- */
  document.body.insertAdjacentHTML('afterbegin', `
    <a class="skip-link" href="#main" data-i18n="a11y.skip"></a>
    <header class="topbar" id="topbar">
      <div class="wrap topbar-in">
        <a class="brand" href="${b}index.html">
          <span class="brand-logo"><img src="${b}assets/images/faculty-logo.png" alt=""></span>
          <span class="brand-text"><strong data-i18n="site.short"></strong><small data-i18n="site.faculty"></small></span>
        </a>
        <nav class="nav" id="nav" data-i18n-label="nav.aria">
          <span class="nav-ind" aria-hidden="true"></span>
          ${PAGES.map((p, i) => `<a class="nav-link${active(p)}" href="${href(p)}"><b>${String(i + 1).padStart(2, '0')}</b><span data-i18n="nav.${p[0]}"></span></a>`).join('')}
        </nav>
        <div class="tools">
          <button class="tool-btn theme-btn" id="themeBtn" type="button" data-i18n-label="theme.aria"><i data-lucide="sun" class="i-sun"></i><i data-lucide="moon" class="i-moon"></i></button>
          <button class="tool-btn" id="langBtn" type="button" data-i18n-label="lang.aria"><i data-lucide="languages"></i><span id="langTxt"></span></button>
        </div>
      </div>
      <span class="progress" aria-hidden="true"><i></i></span>
    </header>`);

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="wrap">
        <p class="footer-word" data-i18n="site.title"></p>
        <div class="footer-grid">
          <nav aria-label="Footer">${PAGES.map((p) => `<a href="${href(p)}" data-i18n="nav.${p[0]}"></a>`).join('')}</nav>
          <button class="to-top" id="toTop" type="button"><i data-lucide="arrow-up"></i><span data-i18n="footer.top"></span></button>
        </div>
        <p style="margin-top:28px"><small data-i18n="footer.txt"></small> · <small data-i18n="footer.built"></small></p>
      </div>
    </footer>
    <nav class="dock" id="dock" data-i18n-label="nav.aria">
      <span class="dock-ind" aria-hidden="true"></span>
      ${PAGES.map((p) => `<a class="dock-link${active(p)}" href="${href(p)}"><i data-lucide="${p[1]}"></i><span data-i18n="nav.${p[0]}"></span></a>`).join('')}
    </nav>`);

  /* ---------- Sliding indicators (top nav pill + dock blob) ---------- */
  function place(box, ind) {
    const el = $('.is-active', box);
    if (!el || !ind || !el.offsetWidth) return;
    ind.style.setProperty('--x', el.offsetLeft + 'px');
    ind.style.setProperty('--w', el.offsetWidth + 'px');
    ind.style.setProperty('--o', 1);
  }
  const placeAll = () => { place($('#nav'), $('#nav .nav-ind')); place($('#dock'), $('#dock .dock-ind')); };
  addEventListener('resize', placeAll);
  G.onLang(() => requestAnimationFrame(placeAll));

  /* ---------- Language + theme buttons ---------- */
  const langTxt = () => ($('#langTxt').textContent = G.lang === 'ar' ? 'EN' : 'عربي');
  $('#langBtn').onclick = () => G.setLang(G.lang === 'ar' ? 'en' : 'ar');
  $('#themeBtn').onclick = () => G.setTheme(G.theme() === 'dark' ? 'light' : 'dark');
  $('#toTop').onclick = () => scrollTo({ top: 0, behavior: G.reduced ? 'auto' : 'smooth' });
  G.onLang(langTxt);

  /* ---------- Scroll behaviour: auto-hide bar + progress line ---------- */
  const bar = $('#topbar'), prog = $('.progress i');
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY, dy = y - lastY;
    if (Math.abs(dy) > 8) { bar.classList.toggle('is-hidden', dy > 0 && y > 160); lastY = y; }
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  /* Keep the bar visible when anything inside it receives focus */
  bar.addEventListener('focusin', () => bar.classList.remove('is-hidden'));

  /* ---------- Route-change curtain ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search) || G.reduced) return;
    e.preventDefault();
    try { sessionStorage.setItem('guide-nav', '1'); } catch { /* ignore */ }
    document.documentElement.classList.add('is-leaving');
    setTimeout(() => { location.href = a.href; }, 430);
  });
  addEventListener('pageshow', (e) => { if (e.persisted) document.documentElement.classList.remove('is-leaving'); });

  /* ---------- First-visit loader (real progress, once per session) ---------- */
  if (document.documentElement.classList.contains('has-loader')) {
    const el = document.createElement('div');
    el.className = 'loader';
    el.setAttribute('role', 'status');
    el.innerHTML = `<i class="loader-half t"></i><i class="loader-half b"></i>
      <div class="loader-in">
        <span class="loader-logo"><img src="${b}assets/images/faculty-logo.png" alt=""></span>
        <div class="loader-num"><span id="ldNum">0</span><sup>%</sup></div>
        <span class="loader-bar"><i></i></span>
        <p class="loader-title" data-i18n="site.title"></p>
      </div>`;
    document.body.prepend(el);
    const barFill = $('.loader-bar i', el), numEl = $('#ldNum', el);
    let target = 0, shown = 0, closed = false;
    const tick = () => {
      shown += (target - shown) * 0.16 + 0.4;
      if (shown > target) shown = target;
      numEl.textContent = Math.round(shown);
      barFill.style.setProperty('--p', shown / 100);
      if (shown >= 100) return finish();
      requestAnimationFrame(tick);
    };
    const finish = () => {
      if (closed) return; closed = true;
      setTimeout(() => {
        el.classList.add('is-out');
        document.documentElement.classList.remove('has-loader');
        try { sessionStorage.setItem('guide-splash', '1'); } catch { /* ignore */ }
        setTimeout(() => el.remove(), 1200);
      }, 220);
    };
    const imgs = [...document.images].filter((i) => !i.closest('.loader') && !i.complete)
      .map((i) => new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }));
    const tasks = [
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true }))),
      ...imgs,
    ];
    let n = 0;
    tasks.forEach((t) => Promise.resolve(t).catch(() => {}).then(() => { n++; target = Math.round((n / tasks.length) * 100); }));
    requestAnimationFrame(tick);
    setTimeout(() => { target = 100; }, 6000);        // failsafe: never trap the visitor
  }

  /* ---------- Boot ---------- */
  langTxt();
  G.apply();
  G.icons();
  const settle = () => requestAnimationFrame(placeAll);
  settle();
  if (document.fonts) document.fonts.ready.then(settle);
  addEventListener('load', settle);
})();
