/* Map — a pannable / zoomable camera over the campus photo.
   Gestures: drag to pan, wheel (with Ctrl/⌘) or pinch to zoom, keyboard (arrows, + / − / 0). */
(() => {
  const G = window.Guide;
  const $ = (s) => document.querySelector(s);
  const IMG_W = 1280, IMG_H = 720;
  const MAX_Z = 4;

  const vp = $('#viewport'), cam = $('#camera'), pinsEl = $('#pins'), img = $('#mapImg');
  const stage = $('#stage'), detail = $('#detail');
  const isMobile = matchMedia('(max-width: 960px)');
  const visible = G.buildings.filter((b) => !b.hidden);

  const view = { s: 1, x: 0, y: 0, w: 0, h: 0, cw: 0, ch: 0 };
  let current = null;

  /* ---------- Camera maths ---------- */
  function measure() {
    view.w = vp.clientWidth; view.h = vp.clientHeight;
    view.cw = Math.max(view.w, view.h * (IMG_W / IMG_H));      // "cover" fit
    view.ch = view.cw * (IMG_H / IMG_W);
    cam.style.setProperty('--cw', view.cw + 'px');
    cam.style.setProperty('--ch', view.ch + 'px');
  }
  function clamp() {
    view.s = Math.min(MAX_Z, Math.max(1, view.s));
    const minX = view.w - view.cw * view.s, minY = view.h - view.ch * view.s;
    view.x = Math.min(0, Math.max(minX, view.x));
    view.y = Math.min(0, Math.max(minY, view.y));
  }
  function paint(animate = false) {
    clamp();
    cam.classList.toggle('is-anim', animate && !G.reduced);
    cam.style.setProperty('--s', view.s);
    cam.style.setProperty('--tx', view.x + 'px');
    cam.style.setProperty('--ty', view.y + 'px');
  }
  function reset(animate) { view.s = 1; view.x = (view.w - view.cw) / 2; view.y = (view.h - view.ch) / 2; paint(animate); }
  function zoomAt(factor, cx = view.w / 2, cy = view.h / 2, animate = false) {
    const ns = Math.min(MAX_Z, Math.max(1, view.s * factor));
    const k = ns / view.s;
    view.x = cx - (cx - view.x) * k; view.y = cy - (cy - view.y) * k; view.s = ns;
    paint(animate);
  }
  /** Fly the camera to a building, keeping it clear of the detail panel. */
  function flyTo(b) {
    const s = isMobile.matches ? 1.9 : 1.8;
    const px = (b.x / IMG_W) * view.cw * s, py = (b.y / IMG_H) * view.ch * s;
    let cx = view.w / 2, cy = view.h / 2;
    if (!isMobile.matches) cx += (G.lang === 'ar' ? 1 : -1) * 170;   // drawer sits at the inline-end
    else cy -= view.h * 0.16;                                        // bottom sheet
    view.s = s; view.x = cx - px; view.y = cy - py; paint(true);
  }

  /* ---------- Build pins + index ---------- */
  function build() {
    pinsEl.innerHTML = visible.map((b, i) =>
      `<div class="pin${b.approx ? ' approx' : ''}${current === b.id ? ' is-on' : ''}" data-id="${b.id}" style="left:${(b.x / IMG_W) * 100}%;top:${(b.y / IMG_H) * 100}%;--i:${i}">
         <button type="button" class="pin-dot" aria-label="${G.esc(G.L(b))}"><span class="pin-shape" aria-hidden="true"></span><i data-lucide="${b.icon}"></i></button><span class="pin-label">${G.esc(G.L(b))}</span></div>`).join('');
    $('#index').innerHTML = visible.map((b) => {
      const n = G.spaces.filter((s) => s.b === b.id).length;
      return `<li><button type="button" class="idx${current === b.id ? ' is-on' : ''}" data-id="${b.id}">
        <span class="idx-ico"><i data-lucide="${b.icon}"></i></span><span class="idx-t"><b>${G.esc(G.L(b))}</b><small>${G.t('kind.' + b.kind)}${n ? ' · ' + G.t('map.n', { n }) : ''}</small></span></button></li>`;
    }).join('');
    $('#tip').textContent = tipText();
    G.icons();
  }
  const isTouch = () => matchMedia('(pointer: coarse)').matches;
  const tipText = () => G.t(isTouch() ? 'map.tipTouch' : 'map.tip');

  /* ---------- Detail panel ---------- */
  function floorsDiagram(sp) {
    const by = {}; sp.forEach((s) => { by[s.l] = (by[s.l] || 0) + 1; });
    const top = Math.max(...sp.map((s) => s.l)), max = Math.max(...Object.values(by));
    let k = 0;
    return Array.from({ length: top + 1 }, (_, i) => top - i).map((l) => {
      const n = by[l] || 0;
      return `<div class="fl${n ? '' : ' is-empty'}"><b>${l}</b><div class="fl-bar" title="${G.esc(G.L(G.floors[l]))}"><i style="--w:${(n / max) * 100}%;--k:${k++}"></i></div><em>${n || '–'}</em></div>`;
    }).join('');
  }
  function show(id) {
    const b = G.buildings.find((x) => x.id === id); if (!b) return;
    current = id;
        const sp = G.spaces.filter((s) => s.b === id);
    const types = G.types.map((t) => [t, sp.filter((s) => s.t === t.id).length]).filter((x) => x[1]);
    detail.innerHTML = `
      <button type="button" class="detail-x" data-i18n-label="card.close" aria-label="${G.t('card.close')}"><i data-lucide="x"></i></button>
      <span class="tag tone-sun"><i data-lucide="${b.icon}"></i>${G.t('kind.' + b.kind)}</span>
      <h3>${G.esc(G.L(b))}</h3>
      <p>${G.esc(G.L(b.d))}</p>
      ${b.approx ? `<p class="d-note"><i data-lucide="triangle-alert"></i><span>${G.t('map.approx')}</span></p>` : ''}
      ${sp.length ? `<h4 class="d-h">${G.t('map.byFloor')}</h4><div class="floors">${floorsDiagram(sp)}</div>
        <div class="chips">${types.map(([t, n]) => `<span class="chip is-static"><i data-lucide="${t.ico}"></i>${n} ${G.L(t)}</span>`).join('')}</div>
        <a class="btn btn-sm btn-ink" href="halls.html?b=${id}">${G.t('map.view')}<i data-lucide="arrow-left" class="nudge arr-l"></i><i data-lucide="arrow-right" class="nudge arr-r"></i></a>`
        : `<p class="d-note"><i data-lucide="info"></i><span>${G.t('map.noSpaces')}</span></p>`}`;
    detail.hidden = false; detail.style.animation = 'none'; void detail.offsetWidth; detail.style.animation = '';
    stage.classList.add('has-detail');
    document.querySelectorAll('.pin').forEach((p) => p.classList.toggle('is-on', p.dataset.id === id));
    document.querySelectorAll('.idx').forEach((p) => p.classList.toggle('is-on', p.dataset.id === id));
    G.icons();
    flyTo(b);
    history.replaceState(null, '', '#' + id);
  }
  function hide() {
    current = null; detail.hidden = true; stage.classList.remove('has-detail');
    document.querySelectorAll('.pin, .idx').forEach((p) => p.classList.remove('is-on'));
    reset(true);
    history.replaceState(null, '', location.pathname + location.search);
  }

  /* ---------- Pointer gestures ----------
     الفأرة: السحب يحرّك الخريطة.
     اللمس: إصبع واحد يمرّر الصفحة كالمعتاد (الخريطة لا تعترض التمرير)،
     وإصبعان يحرّكان الخريطة ويقرّبانها. */
  const ptrs = new Map();
  let drag = null, pinch = null, moved = false;
  const rectOf = () => vp.getBoundingClientRect();
  vp.addEventListener('pointerdown', (e) => {
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    cam.classList.remove('is-anim');
    if (ptrs.size === 1 && e.pointerType !== 'touch') { drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y }; moved = false; }
    if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()], r = rectOf();
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: view.s, mx: (a.x + b.x) / 2 - r.left, my: (a.y + b.y) / 2 - r.top };
      drag = null; moved = true;
    }
  });
  vp.addEventListener('pointermove', (e) => {
    if (!ptrs.has(e.pointerId)) return;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 2 && pinch) {
      const [a, b] = [...ptrs.values()], r = rectOf();
      const d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top;
      view.x += mx - pinch.mx; view.y += my - pinch.my;           // تحريك بحركة منتصف الإصبعين
      pinch.mx = mx; pinch.my = my;
      zoomAt((pinch.s * (d / pinch.d)) / view.s, mx, my);
      return;
    }
    if (drag && ptrs.size === 1) {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) > 5) { moved = true; vp.classList.add('is-drag'); try { vp.setPointerCapture(e.pointerId); } catch { /* ignore */ } }
      if (moved) { view.x = drag.vx + dx; view.y = drag.vy + dy; paint(); }
    }
  });
  const endPtr = (e) => {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch = null;
    if (!ptrs.size) { drag = null; vp.classList.remove('is-drag'); setTimeout(() => { moved = false; }, 60); }
    else if (ptrs.size === 1 && e.pointerType !== 'touch') { const p = [...ptrs.values()][0]; drag = { x: p.x, y: p.y, vx: view.x, vy: view.y }; }
  };
  vp.addEventListener('pointerup', endPtr);
  vp.addEventListener('pointercancel', endPtr);

  /* منع تمرير الصفحة أثناء حركة الإصبعين فقط، وتلميح لطيف عند محاولة تحريك الخريطة بإصبع واحد */
  const hint = $('#hint'); let hintTimer, t0 = null;
  function showHint() {
    hint.textContent = G.t('map.twoFinger');
    hint.classList.add('on'); clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.remove('on'), 1400);
  }
  vp.addEventListener('touchstart', (e) => { t0 = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null; }, { passive: true });
  vp.addEventListener('touchmove', (e) => {
    if (e.touches.length >= 2) { if (e.cancelable) e.preventDefault(); hint.classList.remove('on'); return; }
    if (!t0) return;
    const dx = e.touches[0].clientX - t0.x, dy = e.touches[0].clientY - t0.y;
    if (Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(dy) * 1.2) showHint();   // حركة أفقية = يحاول تحريك الخريطة
  }, { passive: false });
  vp.addEventListener('wheel', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;                 // plain wheel keeps scrolling the page
    e.preventDefault();
    const r = vp.getBoundingClientRect();
    zoomAt(Math.exp(-e.deltaY * 0.0035), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  vp.addEventListener('keydown', (e) => {
    const step = 60, k = e.key;
    if (k === '+' || k === '=') zoomAt(1.3, undefined, undefined, true);
    else if (k === '-' || k === '_') zoomAt(1 / 1.3, undefined, undefined, true);
    else if (k === '0') reset(true);
    else if (k === 'ArrowLeft') { view.x += step; paint(); }
    else if (k === 'ArrowRight') { view.x -= step; paint(); }
    else if (k === 'ArrowUp') { view.y += step; paint(); }
    else if (k === 'ArrowDown') { view.y -= step; paint(); }
    else return;
    e.preventDefault();
  });

  /* ---------- Clicks ---------- */
  pinsEl.addEventListener('click', (e) => {
    const p = e.target.closest('.pin'); if (!p || moved) return;
    e.stopPropagation();                                   // لا يصل النقر إلى الخريطة فيُغلق اللوحة (الأيقونة تُستبدل أثناء الرسم)
    current === p.dataset.id ? hide() : show(p.dataset.id);
  });
  vp.addEventListener('click', (e) => { if (!moved && !e.target.closest('.pin') && current) hide(); });
  $('#index').addEventListener('click', (e) => {
    const c = e.target.closest('[data-id]'); if (!c) return;
    current === c.dataset.id ? hide() : show(c.dataset.id);
    if (isMobile.matches) stage.scrollIntoView({ behavior: G.reduced ? 'auto' : 'smooth', block: 'center' });
  });
  $('#index').addEventListener('pointerover', (e) => {
    const c = e.target.closest('[data-id]');
    document.querySelectorAll('.pin.is-hot').forEach((p) => p.classList.remove('is-hot'));
    if (c) pinsEl.querySelector(`[data-id="${c.dataset.id}"]`)?.classList.add('is-hot');
  });
  $('#index').addEventListener('pointerleave', () => document.querySelectorAll('.pin.is-hot').forEach((p) => p.classList.remove('is-hot')));
  detail.addEventListener('click', (e) => { if (e.target.closest('.detail-x')) hide(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && current) hide(); });
  $('#zIn').onclick = () => zoomAt(1.5, undefined, undefined, true);
  $('#zOut').onclick = () => zoomAt(1 / 1.5, undefined, undefined, true);
  $('#zReset').onclick = () => (current ? hide() : reset(true));

  /* ---------- Lifecycle ---------- */
  function ready() {
    $('#mapSk')?.remove(); $('#mapErr').hidden = true;
    img.classList.add('ready'); stage.classList.add('ready');
    const h = location.hash.slice(1);
    if (h && G.buildings.some((b) => b.id === h && !b.hidden)) setTimeout(() => show(h), 400);
  }
  function fail() { $('#mapSk')?.remove(); $('#mapErr').hidden = false; G.icons(); }
  function load() { img.addEventListener('load', ready, { once: true }); img.addEventListener('error', fail, { once: true }); }
  $('#mapRetry').onclick = () => { $('#mapErr').hidden = true; load(); img.src = img.getAttribute('src').split('?')[0] + '?r=' + Date.now(); };

  addEventListener('resize', () => { measure(); view.s === 1 ? reset() : paint(); });
  G.onLang(() => { build(); if (current) show(current); $('#tip').textContent = tipText(); });

  try {
    measure(); reset(); build();
    img.complete && img.naturalWidth ? ready() : load();
  } catch (e) { fail(); }
  /* Re-measure after fonts / layout settle (hero height can change the stage position, not its size) */
  requestAnimationFrame(() => { measure(); view.s === 1 ? reset() : paint(); });
})();
