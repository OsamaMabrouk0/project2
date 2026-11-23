/* ==========================================================================
   Runtime — language, theme and small shared helpers.
   Loaded first on every page; everything is exposed on window.Guide.
   ========================================================================== */
(() => {
  const G = (window.Guide = window.Guide || {});
  const LANG_KEY = 'guide-lang';
  const root = document.documentElement;

  /* ---------- State ---------- */
  let saved;
  try { saved = localStorage.getItem(LANG_KEY); } catch { /* storage blocked */ }
  G.lang = saved === 'en' ? 'en' : 'ar';
  G.base = document.body.dataset.base || './';
  G.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const listeners = [];

  /* Keep the theme state in one place and make the toggle deterministic. */
  let initialTheme = 'light';
  try {
    const storedTheme = localStorage.getItem('guide-theme');
    initialTheme = storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch { /* use light when storage is unavailable */ }
  root.dataset.theme = initialTheme;

  /* ---------- Text helpers ---------- */
  /** Translate a UI key; {name} placeholders are replaced from `vars`. */
  G.t = (key, vars = {}) => {
    const entry = G.dict[key];
    if (!entry) return key;
    let s = entry[G.lang] ?? entry.ar;
    for (const n in vars) s = s.split('{' + n + '}').join(vars[n]);
    return s;
  };
  /** Pick the current language from a { ar, en } object. */
  G.L = (o) => (o ? (o[G.lang] ?? o.ar) : '');
  /** Escape text for safe insertion into HTML. */
  G.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  G.delay = (ms) => new Promise((r) => setTimeout(r, ms));
  G.icons = () => { try { window.lucide && lucide.createIcons(); } catch { /* CDN offline */ } };
  G.skeleton = (n, cls = '') => Array.from({ length: n }, () => `<div class="sk ${cls}"></div>`).join('');

  /** Render "*highlighted*" markup into word-masked spans for animated headlines. */
  function splitWords(str) {
    const parts = G.esc(str).split(/\*/);           // odd indexes are highlighted groups
    let i = 0;
    const unit = (html) => `<span class="w" style="--i:${i++}"><span>${html}</span></span>`;
    return parts.map((chunk, idx) => {
      if (idx % 2) return unit(`<span class="mark">${chunk}</span>`) + ' ';
      return chunk.split(/\s+/).filter(Boolean).map((w) => unit(w)).join(' ') + ' ';
    }).join('').trim();
  }
  const rich = (str) => G.esc(str).replace(/\*(.+?)\*/g, '<span class="mark">$1</span>');

  /* ---------- Apply language to the DOM ---------- */
  G.apply = () => {
    root.lang = G.lang;
    root.dir = G.lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((e) => {
      const txt = G.t(e.dataset.i18n);
      if (e.hasAttribute('data-split')) e.innerHTML = splitWords(txt);
      else if (e.hasAttribute('data-rich')) e.innerHTML = rich(txt);
      else e.textContent = txt;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((e) => (e.placeholder = G.t(e.dataset.i18nPh)));
    document.querySelectorAll('[data-i18n-alt]').forEach((e) => (e.alt = G.t(e.dataset.i18nAlt)));
    document.querySelectorAll('[data-i18n-label]').forEach((e) => e.setAttribute('aria-label', G.t(e.dataset.i18nLabel)));
    const page = document.body.dataset.page;
    document.title = page === 'home' ? G.t('site.title') : `${G.t('nav.' + page)} | ${G.t('site.short')}`;
  };

  G.onLang = (fn) => listeners.push(fn);
  G.setLang = (lang) => {
    G.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
    G.apply();
    listeners.forEach((fn) => fn(lang));
    G.icons();
  };

  /* ---------- Theme ---------- */
  G.theme = () => root.dataset.theme || 'light';
  G.setTheme = (mode) => {
    const next = mode === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('guide-theme', next); } catch { /* ignore */ }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = next === 'dark' ? '#0f1316' : '#f6f1e7';
  };
})();
