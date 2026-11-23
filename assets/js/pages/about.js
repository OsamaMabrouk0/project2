/* About — departments rendered as chapters with a live table of contents */
(() => {
  const G = window.Guide;
  const $ = (s) => document.querySelector(s);
  const e = G.esc, L = G.L;

  const ticks = (a) => `<ul class="ticks">${a.map((x) => `<li><i data-lucide="check"></i><span>${e(L(x))}</span></li>`).join('')}</ul>`;
  const chips = (a) => `<ul class="chips">${a.map((x) => `<li class="chip is-static">${e(L(x))}</li>`).join('')}</ul>`;
  const roles = (g) => `<div class="cgroup">${g.title ? `<h5>${e(L(g.title))}</h5>` : ''}<ul class="roles">${g.items.map((r) => `<li><strong>${e(L(r.n))}</strong><span>${e(L(r.d))}</span></li>`).join('')}</ul></div>`;
  const courses = (a) => `<ul class="courses">${a.map((c) => `<li>${e(L(c))}</li>`).join('')}</ul>`;
  const sub = (ico, key) => `<h4 class="sub"><span class="sub-ico"><i data-lucide="${ico}"></i></span>${G.t(key)}</h4>`;

  const term = (t, i) => `<details class="term"${i === 0 ? ' open' : ''}><summary><span>${e(L(t.title))}</span>${t.hours ? `<em class="tag">${G.t('about.hours', { n: t.hours })}</em>` : ''}<i data-lucide="chevron-down"></i></summary>
    <div class="term-body"><h6>${G.t('about.core')}</h6>${courses(t.core)}${t.other?.length ? `<h6 class="is-other">${G.t('about.other')}</h6>${courses(t.other)}` : ''}${t.note ? `<p class="term-note"><i data-lucide="graduation-cap"></i><span>${e(L(t.note))}</span></p>` : ''}</div></details>`;

  const plan = (p) => `<div class="plan">
    <div class="plan-top">${sub('calendar-range', 'about.plan')}<div class="seg" role="tablist">
      <span class="seg-thumb" aria-hidden="true"></span>${p.map((l, i) => `<button type="button" role="tab" data-lv="${i}" aria-selected="${i === 0}">${e(L(l.level))}</button>`).join('')}</div></div>
    <p class="muted">${G.t('about.planNote')}</p>
    ${p.map((l, i) => `<div class="level" data-lv="${i}" ${i ? 'hidden' : ''}>${l.terms.map(term).join('')}</div>`).join('')}</div>`;

  const dept = (d, i) => {
    const no = String(i + 1).padStart(2, '0');
    return `<article class="dept" id="dept-${d.id}" style="--accent:${d.accent}" data-reveal>
      <header class="dept-head" data-no="${no}">
        <span class="dept-ico"><i data-lucide="${d.icon}"></i></span>
        <div><h3>${e(L(d.name))}</h3><p class="dept-tag">${e(L(d.tag))}</p></div>
      </header>
      <div class="dept-body">
        <p class="dept-about">${e(L(d.about))}</p>
        <div class="dept-cols">
          <section class="panel">${sub('book-open', 'about.areas')}${chips(d.areas)}</section>
          <section class="panel">${sub('sparkles', 'about.adv')}${ticks(d.benefits)}</section>
        </div>
        <section class="careers">${sub('briefcase', 'about.jobs')}${d.careers.map(roles).join('')}</section>
        ${d.plan ? plan(d.plan) : ''}
      </div></article>`;
  };

  const facts = () => {
    const roleCount = G.departments.reduce((a, d) => a + d.careers.reduce((b, g) => b + g.items.length, 0), 0);
    return [[G.departments.length, 'about.f1'], [4, 'about.f2'], [roleCount, 'about.f3'], [G.programs.length, 'about.f4']]
      .map(([n, k]) => `<li data-reveal><strong data-count="${n}">0</strong><span>${G.t(k)}</span></li>`).join('');
  };
  const toc = () => `<span class="toc-t">${G.t('about.index')}</span>` +
    G.departments.map((d, i) => `<a href="#dept-${d.id}" style="--accent:${d.accent}"><b>${String(i + 1).padStart(2, '0')}</b><span>${e(L(d.short))}</span></a>`).join('');

  /* Sliding thumb for the level tabs */
  function thumbs() {
    document.querySelectorAll('.plan .seg').forEach((seg) => {
      const on = seg.querySelector('[aria-selected="true"]'), th = seg.querySelector('.seg-thumb');
      if (on && th && on.offsetWidth) { th.style.setProperty('--x', on.offsetLeft + 'px'); th.style.setProperty('--w', on.offsetWidth + 'px'); }
    });
  }
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('.plan .seg [data-lv]'); if (!b) return;
    const plan = b.closest('.plan');
    plan.querySelectorAll('.seg [data-lv]').forEach((x) => x.setAttribute('aria-selected', x === b));
    plan.querySelectorAll('.level').forEach((l) => {
      const show = l.dataset.lv === b.dataset.lv;
      l.hidden = !show;
      if (show) { l.classList.remove('is-new'); void l.offsetWidth; l.classList.add('is-new'); }
    });
    thumbs();
  });

  /* Scroll-spy for the table of contents */
  let io;
  function spy() {
    io?.disconnect();
    if (!('IntersectionObserver' in window)) return;
    const links = [...document.querySelectorAll('.toc a')];
    io = new IntersectionObserver((es) => es.forEach((x) => {
      if (x.isIntersecting) links.forEach((a) => {
        const on = a.getAttribute('href') === '#' + x.target.id;
        a.classList.toggle('is-on', on);
        if (on && matchMedia('(max-width: 960px)').matches) {
          /* Move only the horizontal chapter strip; scrollIntoView also moved
             the document vertically and caused the header/TOC jump. */
          const strip = a.closest('.toc');
          const sr = strip.getBoundingClientRect(), ar = a.getBoundingClientRect();
          const delta = ar.left < sr.left ? ar.left - sr.left - 12 : ar.right > sr.right ? ar.right - sr.right + 12 : 0;
          if (delta) strip.scrollBy({ left: delta, behavior: G.reduced ? 'auto' : 'smooth' });
        }
      });
    }), { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.dept').forEach((d) => io.observe(d));
  }

  function render() {
    try {
      $('#facts').innerHTML = facts();
      $('#toc').innerHTML = toc();
      $('#depts').innerHTML = G.departments.map(dept).join('');
      spy();
    } catch (err) {
      $('#depts').innerHTML = `<div class="state"><span class="state-ico"><i data-lucide="wifi-off"></i></span><h3>${G.t('err.loadT')}</h3><p>${G.t('err.load')}</p></div>`;
    }
    G.icons();
    G.reveal(document);
    requestAnimationFrame(thumbs);
  }

  $('#depts').innerHTML = G.skeleton(3, 'sk-dept');
  G.delay(420).then(render);
  G.onLang(() => { if (!document.querySelector('.sk-dept')) render(); });
  addEventListener('resize', thumbs);
})();
