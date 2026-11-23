/* Home — hero search, postcard pins, ticker, stats, bento tiles */
(() => {
  const G = window.Guide;
  const $ = (s) => document.querySelector(s);
  const W = 1280, H = 720;
  const arrows = '<i data-lucide="arrow-up-left" class="arr-l"></i><i data-lucide="arrow-up-right" class="arr-r"></i>';

  /* Hero image: fade in once decoded */
  const img = $('#heroImg');
  const ready = () => { $('#heroSk')?.remove(); img.classList.add('ready'); };
  img.complete && img.naturalWidth ? ready() : img.addEventListener('load', ready, { once: true });

  /* Search → halls page */
  const go = (q) => { location.href = G.base + 'pages/halls.html' + (q ? '?q=' + encodeURIComponent(q) : ''); };
  $('#heroSearch').addEventListener('submit', (e) => { e.preventDefault(); go(e.target.q.value.trim()); });

  /* Pins on the postcard (positions are % of the 1280x720 image) */
  const visible = G.buildings.filter((b) => !b.hidden);
  $('#heroPins').innerHTML = visible.map((b, i) =>
    `<span class="pc-pin" style="left:${(b.x / W) * 100}%;top:${(b.y / H) * 100}%;--i:${i}"></span>`).join('');

  /* Sample search chips, picked from real data so they always return results */
  const sample = ['lecture', 'room', 'lab'].map((t) => G.spaces.find((s) => s.t === t)).filter(Boolean);
  const tone = ['coral', 'sun', 'mint'];

  function render() {
    $('#try').innerHTML = `<span>${G.t('home.try')}</span>` +
      sample.map((s) => `<button type="button" class="chip" data-q="${G.esc(G.L(s))}">${G.esc(G.L(s))}</button>`).join('');

    const lecture = sample[0], bld = G.buildings.find((b) => b.id === lecture.b);
    $('#floatTicket').innerHTML = `<i><i data-lucide="presentation"></i></i><span>${G.esc(G.L(lecture))}<small>${G.esc(G.L(bld))} · ${G.esc(G.L(G.floors[lecture.l]))}</small></span>`;

    const names = [...visible.map((b) => G.L(b)), ...G.types.map((t) => G.L(t))];
    const set = names.map((n) => `<span class="marquee-item"><span>${G.esc(n)}</span><i data-lucide="sparkles"></i></span>`).join('');
    $('#ticker').innerHTML = set + set;

    $('#stats').innerHTML = [
      [G.buildings.length, G.t('stat.b'), '', 'coral'],
      [G.spaces.length, G.t('stat.s'), '', 'sun'],
      [G.departments.length, G.t('about.f1'), '', 'mint'],
      [G.programs.length, G.t('stat.d'), G.t('stat.dsub'), 'lilac'],
    ].map(([n, l, sub, t]) => `<li class="tone-${t}" data-reveal><strong data-count="${n}">0</strong><span>${l}</span>${sub ? `<small>${sub}</small>` : ''}</li>`).join('');

    $('#tiles').innerHTML = [
      ['halls', 'coral', 'door-open', `<div class="art-tickets">${sample.map((s, i) => `<span><b><i data-lucide="${G.types.find((t) => t.id === s.t).ico}"></i></b>${G.esc(G.L(s))}</span>`).join('')}</div>`],
      ['map', 'sea', 'map', '<div class="art-map"><i></i><i></i><i></i></div>'],
      ['about', 'sun', 'graduation-cap', '<div class="art-discs"><i></i><i></i><i></i><i></i><i></i></div>'],
      ['team', 'lilac', 'users', `<div class="art-faces">${G.team.slice(0, 5).map((m) => `<i>${G.esc(G.L(m.name).slice(0, 1))}</i>`).join('')}</div>`],
    ].map(([k, t, ico, art]) => `
      <a class="bento-card tone-${t}" href="${G.base}pages/${k}.html" data-reveal>
        <div class="bento-top"><span class="bento-ico"><i data-lucide="${ico}"></i></span><span class="bento-go">${arrows}</span></div>
        <div class="bento-art">${art}</div>
        <div><h3>${G.t('nav.' + k)}</h3><p>${G.t('tile.' + k)}</p></div>
      </a>`).join('');

    G.icons();
    G.reveal(document);
  }

  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-q]');
    if (c) go(c.dataset.q);
  });

  render();
  G.onLang(render);
})();
