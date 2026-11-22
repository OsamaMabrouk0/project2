/* Halls — fuzzy search, filters and the ticket board */
(() => {
  const G = window.Guide;
  const $ = (s) => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const st = { q: params.get('q') || '', type: 'all', b: params.get('b') || 'all' };
  let engine = null, timer;

  const building = (id) => G.buildings.find((b) => b.id === id);
  const typeOf = (id) => G.types.find((t) => t.id === id);
  const TONES = { lecture: 'coral', room: 'sun', hall: 'mint', lab: 'lilac' };

  const arrows = '<i data-lucide="arrow-up-left" class="arr-l"></i><i data-lucide="arrow-up-right" class="arr-r"></i>';
  const stateCard = (ico, title, text, extra = '') =>
    `<div class="tickets"><div class="state" data-reveal="scale"><span class="state-ico"><i data-lucide="${ico}"></i></span><h3>${title}</h3><p>${text}</p>${extra}</div></div>`;

  /* ---------- Filters ---------- */
  function moveThumb() {
    const seg = $('#typeSeg'), on = seg.querySelector('[aria-pressed="true"]'), th = seg.querySelector('.seg-thumb');
    if (!on || !th || !on.offsetWidth) return;
    th.style.setProperty('--x', on.offsetLeft + 'px');
    th.style.setProperty('--w', on.offsetWidth + 'px');
  }
  function filters() {
    $('#typeSeg').innerHTML = '<span class="seg-thumb" aria-hidden="true"></span>' +
      [{ id: 'all', ico: 'layers' }, ...G.types].map((t) =>
        `<button type="button" data-t="${t.id}" aria-pressed="${st.type === t.id}"><i data-lucide="${t.ico}"></i>${t.id === 'all' ? G.t('halls.all') : G.L(t)}</button>`).join('');
    const withSpaces = G.buildings.filter((b) => G.spaces.some((s) => s.b === b.id));
    $('#bChips').innerHTML =
      `<button type="button" class="chip" data-b="all" aria-pressed="${st.b === 'all'}">${G.t('halls.allB')}</button>` +
      withSpaces.map((b) => `<button type="button" class="chip" data-b="${b.id}" aria-pressed="${st.b === b.id}">${G.esc(G.L(b))}<em>${G.spaces.filter((s) => s.b === b.id).length}</em></button>`).join('');
    G.icons();
    requestAnimationFrame(moveThumb);
  }

  /* ---------- Ticket ---------- */
  const ticket = (s) => {
    const b = building(s.b), t = typeOf(s.t), tone = TONES[s.t] || 'sky';
    return `<article class="ticket tone-${tone}">
      <div class="ticket-main">
        <span class="ticket-type"><i data-lucide="${t.ico}"></i>${G.L(t)}</span>
        <h3>${G.esc(G.L({ ar: s.ar, en: s.en }))}</h3>
        <p class="where"><i data-lucide="building-2"></i>${G.esc(G.L(b))}</p>
        ${b.hidden ? '' : `<a class="ticket-go" href="${G.base}pages/map.html#${b.id}">${G.t('halls.onMap')}${arrows}</a>`}
      </div>
      <div class="ticket-stub"><small>${G.t('halls.floor')}</small><strong>${s.l}</strong><span>${G.esc(G.L(G.floors[s.l]))}</span></div>
    </article>`;
  };

  function grouped(list) {
    const order = [...new Set(list.map((s) => s.b))];
    return order.map((id) => {
      const items = list.filter((s) => s.b === id);
      return `<section class="group"><h3 class="group-h"><span>${G.esc(G.L(building(id)))}</span><em>${G.t('halls.places', { n: items.length })}</em></h3><div class="tickets stagger">${items.map((s, i) => ticket(s).replace('<article', `<article style="--i:${Math.min(i, 12)}"`)).join('')}</div></section>`;
    }).join('');
  }

  /* ---------- Search ---------- */
  function sync() {
    const u = new URL(location.href);
    st.q ? u.searchParams.set('q', st.q) : u.searchParams.delete('q');
    st.b !== 'all' ? u.searchParams.set('b', st.b) : u.searchParams.delete('b');
    history.replaceState(null, '', u);
  }
  function run() {
    const r = engine.search(st.q, st), out = $('#results'), status = $('#status');
    $('#clear').hidden = !st.q;
    sync();
    const filtered = st.type !== 'all' || st.b !== 'all';
    const resetBtn = filtered ? `<button class="chip reset" type="button" id="resetF"><i data-lucide="rotate-ccw"></i>${G.t('halls.reset')}</button>` : '';
    status.innerHTML = '';

    if (r.status === 'short') { out.innerHTML = stateCard('keyboard', G.t('halls.shortT'), G.t('halls.short')); }
    else {
      const sug = r.suggestion ? `<button type="button" class="suggest" data-sug="${G.esc(r.suggestion)}">${G.t('halls.did')}: <b>${G.esc(r.suggestion)}</b>؟</button>` : '';
      if (r.status === 'none') {
        status.innerHTML = resetBtn;
        out.innerHTML = stateCard('search-x', G.t('halls.noneT'), G.t(r.missingNum ? 'halls.noNum' : 'halls.none', { q: G.esc(st.q), n: r.missingNum }), sug);
      } else {
        let msg = '';
        if (r.status === 'approx') msg = G.t(r.missingNum ? 'halls.noNum' : 'halls.approx', { n: r.missingNum }) + ' ' + sug;
        if (r.converted) msg = G.t('halls.conv', { q: G.esc(r.converted) }) + ' ' + msg;
        status.innerHTML = `<span class="count"><b>${r.results.length}</b>${G.t('halls.count', { n: '' }).trim()}</span>${msg ? `<span>${msg}</span>` : ''}${resetBtn}`;
        out.innerHTML = r.status === 'empty'
          ? grouped(r.results)
          : `<div class="tickets stagger">${r.results.map((s, i) => ticket(s).replace('<article', `<article style="--i:${Math.min(i, 12)}"`)).join('')}</div>`;
      }
    }
    G.icons();
    G.reveal(out);
  }

  async function init() {
    $('#results').innerHTML = `<div class="tickets">${G.skeleton(6, 'sk-ticket')}</div>`;
    try {
      await G.delay(380);
      if (!G.spaces || !G.SearchEngine) throw new Error('data');
      engine = new G.SearchEngine(G);
      filters();
      $('#q').value = st.q;
      run();
    } catch (e) {
      $('#results').innerHTML = stateCard('wifi-off', G.t('err.loadT'), G.t('err.load'), `<button class="btn btn-ink" id="retry" type="button">${G.t('err.retry')}</button>`);
      G.icons();
      $('#retry').onclick = init;
    }
  }

  /* ---------- Events ---------- */
  $('#q').addEventListener('input', (e) => { st.q = e.target.value; clearTimeout(timer); if (engine) timer = setTimeout(run, 120); });
  $('#clear').onclick = () => { st.q = ''; $('#q').value = ''; $('#q').focus(); engine && run(); };
  $('#typeSeg').addEventListener('click', (e) => {
    const c = e.target.closest('[data-t]'); if (!c) return;
    st.type = c.dataset.t;
    $('#typeSeg').querySelectorAll('[data-t]').forEach((x) => x.setAttribute('aria-pressed', x === c));
    moveThumb(); run();
  });
  $('#bChips').addEventListener('click', (e) => {
    const c = e.target.closest('[data-b]'); if (!c) return;
    st.b = c.dataset.b;
    $('#bChips').querySelectorAll('[data-b]').forEach((x) => x.setAttribute('aria-pressed', x === c));
    run();
  });
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-sug]');
    if (s) { st.q = s.dataset.sug; $('#q').value = st.q; run(); return; }
    if (e.target.closest('#resetF')) { st.type = 'all'; st.b = 'all'; filters(); run(); }
  });
  addEventListener('resize', moveThumb);
  G.onLang(() => { if (engine) { filters(); run(); } });
  init();
})();
