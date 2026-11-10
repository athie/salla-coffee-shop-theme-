/* Slope Roastery — tiny progressive-enhancement script (no dependencies).
   Everything renders without it; it only adds: hero slides + accordion, bundle swapping, flavour finder. */
(function () {
  'use strict';
  var qa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Hero carousel + accordion ---- */
  qa('[data-sl-hero]').forEach(function (root) {
    var slides = qa('[data-sl-slide]', root), dots = qa('[data-sl-dot]', root), cur = 0, timer;
    if (!slides.length) return;
    function paint(bg) {
      root.style.setProperty('--sl-bg', bg);
      document.documentElement.style.setProperty('--sl-hero-bg', bg);
    }
    function show(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) { var on = j === cur; s.classList.toggle('is-active', on); if (on) s.removeAttribute('hidden'); else s.setAttribute('hidden', ''); });
      dots.forEach(function (d, j) { d.classList.toggle('is-active', j === cur); d.setAttribute('aria-current', j === cur ? 'true' : 'false'); });
      paint(slides[cur].getAttribute('data-bg') || '#3459D9');
    }
    var prev = root.querySelector('[data-sl-prev]'), next = root.querySelector('[data-sl-next]');
    if (prev) prev.addEventListener('click', function () { show(cur - 1); restart(); });
    if (next) next.addEventListener('click', function () { show(cur + 1); restart(); });
    dots.forEach(function (d) { d.addEventListener('click', function () { show(parseInt(d.getAttribute('data-sl-dot'), 10) || 0); restart(); }); });
    qa('.sl-acc__btn', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var acc = b.closest('.sl-acc'), open = b.getAttribute('aria-expanded') === 'true';
        qa('.sl-acc__btn', acc).forEach(function (x) {
          var isMe = x === b, on = isMe && !open;
          x.setAttribute('aria-expanded', on ? 'true' : 'false');
          x.querySelector('span').textContent = on ? '−' : '+';
          var body = x.parentNode.querySelector('.sl-acc__body');
          if (body) { if (on) body.removeAttribute('hidden'); else body.setAttribute('hidden', ''); }
        });
      });
    });
    function restart() { clearInterval(timer); if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(function () { show(cur + 1); }, 8000); }
    root.addEventListener('mouseenter', function () { clearInterval(timer); });
    root.addEventListener('mouseleave', restart);
    var x0 = null;
    root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) { var rtl = document.documentElement.dir === 'rtl'; show(cur + ((dx < 0) !== rtl ? 1 : -1)); restart(); }
    });
    paint(slides[0].getAttribute('data-bg') || '#3459D9');
    restart();
  });

  /* ---- Bundle builder (cycle each slot through the pool) ---- */
  qa('[data-sl-bundle]').forEach(function (root) {
    var pool = []; try { pool = JSON.parse(root.getAttribute('data-pool') || '[]'); } catch (e) {}
    if (pool.length < 3) return;
    var idx = [0, 1, 2], sum = root.querySelector('[data-sl-sum]');
    qa('[data-sl-pick]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var j = parseInt(btn.getAttribute('data-sl-pick'), 10);
        idx[j] = (idx[j] + 1) % pool.length;
        var p = pool[idx[j]], img = btn.querySelector('img');
        if (img) img.src = p.img; btn.querySelector('.sl-pick__name').textContent = p.name;
        var t = 0; idx.forEach(function (i) { t += parseFloat(pool[i].price) || 0; });
        if (sum) sum.textContent = t.toFixed(2);
      });
    });
  });

  /* ---- Flavour finder ---- */
  qa('[data-sl-finder]').forEach(function (root) {
    var tastes = qa('[data-sl-taste]', root), recs = qa('[data-sl-rec]', root);
    tastes.forEach(function (t) {
      t.addEventListener('click', function () {
        var i = t.getAttribute('data-sl-taste');
        tastes.forEach(function (x) { var on = x === t; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        recs.forEach(function (r) { if (r.getAttribute('data-sl-rec') === i) r.removeAttribute('hidden'); else r.setAttribute('hidden', ''); });
      });
    });
  });
})();
