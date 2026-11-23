/* Team — shuffled ID badges */
(() => {
  const G = window.Guide;
  const $ = (s) => document.querySelector(s);
  const TONES = ['coral', 'sun', 'mint', 'lilac', 'sky'];

  /* Fisher–Yates shuffle on every load (no member is ever "first" by design). */
  const order = G.team.map((m, i) => ({ m, i }));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  function render() {
    try {
      $('#team').innerHTML = order.map(({ m, i }, pos) => {
        const name = G.L(m.name);
        return `<article class="idcard tone-${TONES[i % TONES.length]}" data-reveal style="--i:${pos};--rot-from:${pos % 2 ? 3 : -3}deg">
          <span class="strap" aria-hidden="true"></span>
          <div class="idcard-body">
            <span class="slot" aria-hidden="true"></span>
            <div class="id-head"><span>${G.t('team.badge')}</span></div>
            <span class="avatar" aria-hidden="true">${G.esc(name.slice(0, 1))}</span>
            <h3>${G.esc(name)}</h3>
            <p class="role">${m.role ? G.esc(G.L(m.role)) : G.t('team.role')}</p>
            ${m.links.length ? `<div class="links">${m.links.map((l) => `<a class="chip" href="${l.href}" target="_blank" rel="noopener"><i data-lucide="${l.ico}"></i>${G.esc(l.label)}</a>`).join('')}</div>` : ''}
            <span class="barcode" aria-hidden="true"></span>
          </div></article>`;
      }).join('');
    } catch (err) {
      $('#team').innerHTML = `<div class="state"><span class="state-ico"><i data-lucide="wifi-off"></i></span><h3>${G.t('err.loadT')}</h3><p>${G.t('err.load')}</p></div>`;
    }
    G.icons();
    G.reveal($('#team'));
  }

  $('#team').innerHTML = G.skeleton(6, 'sk-badge');
  G.delay(450).then(render);
  G.onLang(() => { if (!document.querySelector('.sk-badge')) render(); });
})();
