/* ============================================================
   HarmoniQ Technologies — Main JavaScript
   ============================================================ */

// ── Navigation ──────────────────────────────────────────────
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    navToggle.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll Reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(el => revealObserver.observe(el));

// ── Hero typing effect ──────────────────────────────────────
(function() {
  var label = document.getElementById('heroLabel');
  if (!label) return;
  var text = 'Patented Power Optimization Technology';
  var i = 0;
  var cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  label.appendChild(cursor);
  function type() {
    if (i < text.length) {
      label.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(type, 35 + Math.random() * 25);
    } else {
      // Remove cursor after a pause
      setTimeout(function() { cursor.style.animation = 'none'; cursor.style.opacity = '0'; cursor.style.transition = 'opacity 0.5s'; }, 1500);
    }
  }
  // Start after a small delay to let the label fade in
  setTimeout(type, 300);
})();

// ── FAQ Accordion ────────────────────────────────────────────
function openFaqItem(item) {
  if (!item) return;
  const answer = item.querySelector('.faq-answer');
  if (!answer) return;

  // Close all other open items
  document.querySelectorAll('.faq-item.open').forEach(i => {
    if (i !== item) {
      var a = i.querySelector('.faq-answer');
      a.style.maxHeight = a.scrollHeight + 'px';
      requestAnimationFrame(() => { a.style.maxHeight = '0'; });
      i.classList.remove('open');
    }
  });

  item.classList.add('open');
  answer.style.maxHeight = answer.scrollHeight + 'px';
  answer.addEventListener('transitionend', function handler() {
    if (item.classList.contains('open')) answer.style.maxHeight = 'none';
    answer.removeEventListener('transitionend', handler);
  });
}

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    if (!isOpen) {
      openFaqItem(item);
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      requestAnimationFrame(() => { answer.style.maxHeight = '0'; });
      item.classList.remove('open');
    }
  });
});

// Handle hash-based deep-links to FAQ items (e.g. faq.html#faq-how-is-it-installed)
function handleFaqHash() {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#faq-')) return;
  const item = document.getElementById(hash.slice(1));
  if (!item) return;
  openFaqItem(item);
  // Smooth scroll with offset for the fixed nav
  setTimeout(() => {
    const y = item.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, 100);
}
if (document.readyState === 'complete') handleFaqHash();
else window.addEventListener('load', handleFaqHash);
window.addEventListener('hashchange', handleFaqHash);

// ── Power Bar Animation ──────────────────────────────────────
function animateBar(bar, targetWidth, duration) {
  const start = performance.now();
  const target = parseFloat(targetWidth);
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    bar.style.width = (eased * target) + '%';
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function animateBarCounter(el, duration) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.power-bar-fill').forEach(bar => {
        animateBar(bar, bar.dataset.width, 1400);
      });
      entry.target.querySelectorAll('.bar-counter').forEach(el => {
        animateBarCounter(el, 1400);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.power-diagram').forEach(el => barObserver.observe(el));

// ── Counter Animation ─────────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = eased * target;
    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ── Waveform Canvas Morph ─────────────────────────────────────
(function () {
  const TAU = Math.PI * 2;

  // Brighter colours for dark canvas background
  const morphConfigs = {
    'wf-pf': {
      waves: [
        { rgb: [96, 165, 250],  lw: 2,   // blue-400
          from: t => Math.sin(t),
          to:   t => Math.sin(t) },
        { rgb: [252, 211, 77],  lw: 2,   // amber-300
          from: t => Math.sin(t - Math.PI * 0.56),
          to:   t => Math.sin(t) }
      ]
    },
    'wf-hd': {
      waves: [
        { rgb: [96, 165, 250],  lw: 2,
          from: t => { const v = Math.sin(t) + 0.32*Math.sin(3*t) + 0.22*Math.sin(5*t) + 0.10*Math.sin(7*t); return v / 1.5; },
          to:   t => Math.sin(t) }
      ]
    },
    'wf-3p': {
      waves: [
        { rgb: [248, 113, 113], lw: 2,   // red-400
          from: t =>  1.00 * Math.sin(t),
          to:   t =>  Math.sin(t) },
        { rgb: [96, 165, 250],  lw: 2,   // blue-400
          from: t =>  0.62 * Math.sin(t - TAU/3 + 0.32),
          to:   t =>  Math.sin(t - TAU/3) },
        { rgb: [252, 211, 77],  lw: 2,   // amber-300
          from: t =>  0.82 * Math.sin(t - 2*TAU/3 - 0.22),
          to:   t =>  Math.sin(t - 2*TAU/3) }
      ]
    }
  };

  const ids = Object.keys(morphConfigs);
  const morphState = {};
  ids.forEach(id => morphState[id] = 0);

  // ── Per-canvas annotations ───────────────────────────────────
  function drawAnnotations(id, ctx, W, H, midY, amp, cycles, morph, layer = 'under') {

    if (id === 'wf-pf') {
      // Fill complete lens shapes between V=I intersections where waste occurs.
      // At intersection points both curves share the same y, so fills taper to a sharp tip.
      const alpha = (1 - morph) * 0.42;
      if (alpha < 0.01) return;

      const lag    = Math.PI * 0.56;
      const totalT = cycles * TAU;

      // V=I intersections: sin(t) = sin(t-lag) → t = (π+lag)/2 + k*π
      const t0 = (Math.PI + lag) / 2;
      const bounds = [0];
      for (let k = 0; ; k++) {
        const t = t0 + k * Math.PI;
        if (t >= totalT) break;
        bounds.push(t);
      }
      bounds.push(totalT);

      // Current curve matches drawMorph interpolation exactly
      const iVal = t => Math.sin(t - lag) + (Math.sin(t) - Math.sin(t - lag)) * morph;

      const labelSize = Math.max(9, Math.round(H * 0.11));

      ctx.save();
      ctx.fillStyle = `rgba(248,113,113,${alpha})`;

      let wasteCount = 0;
      for (let i = 0; i < bounds.length - 1; i++) {
        const ta   = bounds[i];
        const tb   = bounds[i + 1];
        const tmid = (ta + tb) / 2;

        // Only fill lenses where I is above V (every other gap — the waste regions)
        if (Math.sin(tmid) >= iVal(tmid)) continue;

        wasteCount++;

        const xa = Math.round((ta / totalT) * W);
        const xb = Math.round((tb / totalT) * W);

        if (layer === 'under') {
          // Fill the lens
          ctx.beginPath();
          for (let x = xa; x <= xb; x++) {
            const y = midY - Math.sin((x / W) * totalT) * amp;
            x === xa ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          for (let x = xb; x >= xa; x--) {
            ctx.lineTo(x, midY - iVal((x / W) * totalT) * amp);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // "waste" label — white, diagonal, centred in the lens, drawn over waves
          const xc = (xa + xb) / 2;
          // Steeper angle: scale the wave slope up so text better follows the wave direction
          const waveSlopeDyDx = -Math.cos(tmid) * amp * (totalT / W) * 1.6;
          const angle = Math.atan(waveSlopeDyDx);
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = '#ffffff';
          ctx.font = `600 ${labelSize}px system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.translate(xc, midY);
          ctx.rotate(angle);
          ctx.fillText('waste', 0, 0);
          ctx.restore();
        }
      }
    }

    if (id === 'wf-hd') {
      const alpha = 1 - morph;
      if (alpha < 0.01) return;
      ctx.save();

      // Dashed ideal sine reference
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = `rgba(255,255,255,${0.28 * alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const t = (x / W) * cycles * TAU;
        const y = midY - Math.sin(t) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Glowing red dots at harmonic kink points (local extrema of distortion)
      const distortion = t => {
        const v = Math.sin(t) + 0.32*Math.sin(3*t) + 0.22*Math.sin(5*t) + 0.10*Math.sin(7*t);
        return v / 1.5 - Math.sin(t);
      };
      ctx.shadowBlur = 7;
      ctx.shadowColor = `rgba(248,113,113,0.9)`;
      ctx.fillStyle   = `rgba(248,113,113,${alpha})`;
      let skip = 0;
      for (let x = 2; x < W - 2; x++) {
        if (skip-- > 0) continue;
        const t  = (x   / W) * cycles * TAU;
        const tp = ((x-1) / W) * cycles * TAU;
        const tn = ((x+1) / W) * cycles * TAU;
        const d  = distortion(t);
        const dp = distortion(tp);
        const dn = distortion(tn);
        if (Math.abs(d) > 0.09 && ((d > dp && d > dn) || (d < dp && d < dn))) {
          const waveY = midY - ((Math.sin(t) + 0.32*Math.sin(3*t) + 0.22*Math.sin(5*t) + 0.10*Math.sin(7*t)) / 1.5) * amp;
          ctx.beginPath();
          ctx.arc(x, waveY, 3, 0, Math.PI * 2);
          ctx.fill();
          skip = 6; // avoid clustering
        }
      }
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    if (id === 'wf-3p') {
      // Dotted horizontal lines at each wave's peak & trough
      // L2 and L3 lines move up to meet L1 as morph → 1 (balance restored)
      const lines = [
        { beforeAmp: 1.00, afterAmp: 1.00, rgb: [248, 113, 113] },
        { beforeAmp: 0.62, afterAmp: 1.00, rgb: [96, 165, 250]  },
        { beforeAmp: 0.82, afterAmp: 1.00, rgb: [252, 211, 77]  }
      ];
      ctx.save();
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;
      lines.forEach(({ beforeAmp, afterAmp, rgb }) => {
        const [r, g, b] = rgb;
        const a = beforeAmp + (afterAmp - beforeAmp) * morph;
        ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
        ctx.beginPath(); ctx.moveTo(0, midY - a * amp); ctx.lineTo(W, midY - a * amp); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, midY + a * amp); ctx.lineTo(W, midY + a * amp); ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();
    }
  }

  function drawMorph(id, morph, progress) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const dpr  = window.devicePixelRatio || 1;
    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;

    const config = morphConfigs[id];
    if (!config) return;

    const ctx  = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const W      = cssW;
    const H      = cssH;
    const midY   = H / 2;
    const amp    = H * 0.38;
    const cycles = 2.5;
    const drawW  = Math.max(W * progress, 1);

    ctx.clearRect(0, 0, W, H);

    // Dark grid
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    [0.25, 0.75].forEach(frac => {
      ctx.beginPath(); ctx.moveTo(0, H * frac); ctx.lineTo(W, H * frac); ctx.stroke();
    });
    [0.25, 0.5, 0.75].forEach(frac => {
      ctx.beginPath(); ctx.moveTo(W * frac, 0); ctx.lineTo(W * frac, H); ctx.stroke();
    });

    // Centre axis
    ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 0.75; ctx.stroke();

    // PF and HD annotations drawn under waves
    if (id === 'wf-pf' || id === 'wf-hd') drawAnnotations(id, ctx, W, H, midY, amp, cycles, morph);

    // Waves with subtle glow
    config.waves.forEach(wave => {
      const [r, g, b] = wave.rgb;
      ctx.beginPath();
      for (let x = 0; x <= drawW; x++) {
        const t     = (x / W) * cycles * TAU;
        const yFrom = midY - wave.from(t) * amp;
        const yTo   = midY - wave.to(t)   * amp;
        const y     = yFrom + (yTo - yFrom) * morph;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.shadowBlur  = 8;
      ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth   = wave.lw;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      ctx.stroke();
      ctx.shadowBlur  = 0;
    });

    // PF labels and 3P dotted lines drawn over waves
    if (id === 'wf-pf') drawAnnotations(id, ctx, W, H, midY, amp, cycles, morph, 'over');
    if (id === 'wf-3p') drawAnnotations(id, ctx, W, H, midY, amp, cycles, morph);
  }

  function updateNarrative(morph) {
    const bEl = document.getElementById('wf-narr-before');
    const aEl = document.getElementById('wf-narr-after');
    if (!bEl || !aEl) return;
    bEl.style.opacity = Math.max(0.25, 1 - morph * 2);
    aEl.style.opacity = Math.max(0.25, (morph - 0.3) * 2);
  }

  function updatePills(id, morph) {
    morphState[id] = morph;
    const after = morph > 0.5;
    const bBtn = document.getElementById(id + '-btn-before');
    const aBtn = document.getElementById(id + '-btn-after');
    if (bBtn) bBtn.className = 'wf-pill' + (after ? '' : ' wf-pill-active-before');
    if (aBtn) aBtn.className = 'wf-pill' + (after ? ' wf-pill-active-after' : '');
  }

  function updateMasterPills(morph) {
    const after = morph > 0.5;
    const bBtn = document.getElementById('wf-master-before');
    const aBtn = document.getElementById('wf-master-after');
    if (bBtn) bBtn.className = 'wf-pill' + (after ? '' : ' wf-pill-active-before');
    if (aBtn) aBtn.className = 'wf-pill' + (after ? ' wf-pill-active-after' : '');
  }

  function applyMorph(morph) {
    ids.forEach(id => {
      drawMorph(id, morph, 1);
      updatePills(id, morph);
    });
    updateMasterPills(morph);
    updateNarrative(morph);
  }

  // Manual pill toggle — animates a single wave
  function morphTo(id, target) {
    const startMorph = morphState[id];
    const dur = 2200;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const m = startMorph + (target - startMorph) * e;
      drawMorph(id, m, 1);
      updatePills(id, m);
      updateNarrative(m);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Master toggle — animates all waves together
  function morphAll(target) {
    const startMorphs = ids.map(id => morphState[id]);
    const dur = 2200;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      ids.forEach((id, i) => {
        const m = startMorphs[i] + (target - startMorphs[i]) * e;
        drawMorph(id, m, 1);
        updatePills(id, m);
      });
      updateMasterPills(target * e + (1 - e) * (startMorphs[0] > 0.5 ? 1 : 0));
      updateNarrative(target * e);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Draw-in animation on scroll into view (before state only)
  function runDrawIn(id, delay) {
    setTimeout(() => {
      const dur   = 1000;
      const start = performance.now();
      function frame(now) {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        drawMorph(id, 0, e);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, delay);
  }

  const wfContainer = document.getElementById('waveformVisual');
  if (wfContainer) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ids.forEach((id, i) => runDrawIn(id, i * 200));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(wfContainer);
  }

  // Individual pills
  document.querySelectorAll('.wf-pill[data-id]').forEach(btn => {
    btn.addEventListener('click', () => morphTo(btn.dataset.id, parseFloat(btn.dataset.morph)));
  });

  // Master pills
  const masterBefore = document.getElementById('wf-master-before');
  const masterAfter  = document.getElementById('wf-master-after');
  if (masterBefore) masterBefore.addEventListener('click', () => morphAll(0));
  if (masterAfter)  masterAfter.addEventListener('click',  () => {
    masterAfter.classList.remove('wf-pill-invite');
    morphAll(1);
  });

  window.addEventListener('resize', () => ids.forEach(id => drawMorph(id, morphState[id], 1)));
})();

// ── Sticky CTA ───────────────────────────────────────────────
(function () {
  const cta  = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');
  if (!cta || !hero) return;
  const observer = new IntersectionObserver(
    ([entry]) => cta.classList.toggle('visible', !entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(hero);
})();

// ── Reading Progress Bar ─────────────────────────────────────
(function() {
  var bar = document.querySelector('.reading-progress');
  if (!bar) return;
  function update() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Back to Top ──────────────────────────────────────────────
(function() {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── Page Transitions ─────────────────────────────────────────
(function() {
  var COLS = 10;
  var STAGGER = 30;
  var COL_DURATION = 350;

  var overlay = document.createElement('div');
  overlay.className = 'page-transition';
  for (var i = 0; i < COLS; i++) {
    var col = document.createElement('div');
    col.className = 'page-transition-col';
    col.style.animationDelay = (i * STAGGER) + 'ms';
    overlay.appendChild(col);
  }
  // Q emblem — derive asset path from this script's own src
  var qLogo = document.createElement('div');
  qLogo.className = 'page-transition-logo';
  var scriptEl = document.querySelector('script[src*="main.js"]');
  var assetBase = scriptEl ? scriptEl.getAttribute('src').replace(/js\/main\.js.*/, '') : '';
  qLogo.innerHTML = '<img src="' + assetBase + 'assets/q-emblem.png" alt="" />';
  overlay.appendChild(qLogo);

  document.body.appendChild(overlay);

  var totalDuration = (COLS - 1) * STAGGER + COL_DURATION;

  if (sessionStorage.getItem('hq-transition')) {
    sessionStorage.removeItem('hq-transition');
    overlay.classList.add('enter');
    setTimeout(function() { overlay.classList.remove('enter'); }, totalDuration + 50);
  }

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || link.target === '_blank') return;
    e.preventDefault();
    sessionStorage.setItem('hq-transition', '1');
    overlay.classList.add('exit');
    setTimeout(function() { window.location.href = href; }, totalDuration);
  });
})();

// ── Article Table of Contents ────────────────────────────────
(function() {
  var body = document.querySelector('.article-body');
  if (!body) return;

  // Find all h2 + .section-title pairs
  var sections = [];
  var headings = body.querySelectorAll('h2');
  headings.forEach(function(h2, i) {
    var next = h2.nextElementSibling;
    var title = (next && next.classList.contains('section-title')) ? next.textContent.trim() : h2.textContent.trim();
    // Skip generic labels like "References"
    var id = 'toc-' + i;
    h2.id = id;
    sections.push({ id: id, title: title });
  });

  if (sections.length < 2) return;

  // Build TOC element
  var toc = document.createElement('nav');
  toc.className = 'article-toc';
  toc.setAttribute('aria-label', 'Table of contents');
  var label = document.createElement('div');
  label.className = 'article-toc-label';
  label.textContent = 'Contents';
  toc.appendChild(label);

  var ol = document.createElement('ol');
  sections.forEach(function(s) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + s.id;
    a.textContent = s.title;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById(s.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(a);
    ol.appendChild(li);
  });
  toc.appendChild(ol);
  document.body.appendChild(toc);

  // Show TOC after scrolling past hero
  var hero = document.querySelector('.article-hero');
  var tocVisible = false;
  function checkToc() {
    var past = window.scrollY > (hero ? hero.offsetHeight : 200);
    if (past && !tocVisible) { toc.classList.add('visible'); tocVisible = true; }
    else if (!past && tocVisible) { toc.classList.remove('visible'); tocVisible = false; }
  }

  // Highlight active section
  var tocLinks = toc.querySelectorAll('a');
  function highlightActive() {
    var scrollY = window.scrollY + 120;
    var active = null;
    sections.forEach(function(s, i) {
      var el = document.getElementById(s.id);
      if (el && el.offsetTop <= scrollY) active = i;
    });
    tocLinks.forEach(function(a, i) {
      a.classList.toggle('active', i === active);
    });
  }

  window.addEventListener('scroll', function() { checkToc(); highlightActive(); }, { passive: true });
  checkToc();
  highlightActive();
})();

// ── Active Nav Link ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });




// ── Single-Line Diagram — Interactive Power Visualization ─────────
(function () {
  var canvas = document.getElementById('pqCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var rafId = null, t = 0;
  var morph = 0, targetMorph = 0;

  // ── View mode ──
  var viewMode = 'walkthrough'; // 'walkthrough' | 'slider'

  // ── Step walkthrough ──
  var currentStep = -1;
  var stepFade = 0;
  var stepTime = 0;        // real-time ms when current step became fully visible
  var STEP_AUTO_MS = 4000; // auto-advance after 4 seconds
  var targetCam = { cx: 0, cy: 0, z: 1 };
  var STEPS = [];
  var captionBounds = null;
  var arrowLeftBounds = null, arrowRightBounds = null;

  // ── Camera ──
  var cam = { cx: 0, cy: 0, zoom: 1 };

  // ── Mouse / hover ──
  var mouseX = -1, mouseY = -1;
  var hoveredNode = -1, hoveredEdge = -1;

  // ── Slider ──
  var sliderY = 0;
  var sliderDragging = false;
  var sliderHasDragged = false;
  var sliderIntro = null; // null | 'scan-down' | 'return'
  var sliderIntroProgress = 0;
  var SLIDER_SCAN_SPEED = 0.006;
  var SLIDER_RETURN_SPEED = 0.012;

  // ── Utilities ──
  function lerp(a, b, v) { return a + (b - a) * v; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function tp(i) { var s = [0, 0.16, 0.32, 0.48, 0.64, 0.80]; return clamp((morph - s[i]) / 0.20, 0, 1); }
  var TWO_PI = Math.PI * 2;
  function easeIO(x) { return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3) / 2; }
  function fadeIn(nt, start, dur) { return clamp((nt - start) / dur, 0, 1); }
  function fadeOut(nt, end, dur) { return clamp((end - nt) / dur, 0, 1); }

  // ── Topology ──
  var NODES = [
    { id: 0,  label: 'Transformer',  xf: 0.50, yf: 0.09, type: 'transformer' },
    { id: 1,  label: 'Primary LV Switchgear', xf: 0.50, yf: 0.24, type: 'busbar' },
    { id: 2,  label: 'UPS',        xf: 0.10, yf: 0.36, type: 'panel' },
    { id: 3,  label: 'MCC-1',      xf: 0.28, yf: 0.36, type: 'panel' },
    { id: 4,  label: 'MCC-2',      xf: 0.50, yf: 0.36, type: 'panel' },
    { id: 5,  label: 'HVAC\nPanel', xf: 0.72, yf: 0.36, type: 'panel' },
    { id: 6,  label: 'Lighting',   xf: 0.90, yf: 0.36, type: 'panel' },
    { id: 7,  label: 'PDU',        xf: 0.10, yf: 0.50, type: 'box' },
    { id: 8,  label: 'M',          xf: 0.22, yf: 0.50, type: 'motor' },
    { id: 9,  label: 'VFD',        xf: 0.34, yf: 0.54, type: 'box' },
    { id: 10, label: 'M',          xf: 0.44, yf: 0.50, type: 'motor' },
    { id: 11, label: 'M',          xf: 0.56, yf: 0.50, type: 'motor' },
    { id: 12, label: 'Chiller',    xf: 0.78, yf: 0.64, type: 'box' },
    { id: 13, label: 'AHU',        xf: 0.66, yf: 0.64, type: 'box' },
    { id: 14, label: 'IT\nLoads',  xf: 0.10, yf: 0.64, type: 'box' },
    { id: 15, label: 'M',          xf: 0.34, yf: 0.64, type: 'motor' },
  ];

  var EDGES = [
    { from: 0, to: 1,  depth: 0 },
    { from: 1, to: 1,  depth: 0, isBusbar: true, busDir: 'left' },
    { from: 1, to: 1,  depth: 0, isBusbar: true, busDir: 'right' },
    { from: 1, to: 2,  depth: 1 },
    { from: 1, to: 3,  depth: 1 },
    { from: 1, to: 4,  depth: 1 },
    { from: 1, to: 5,  depth: 1 },
    { from: 1, to: 6,  depth: 1 },
    { from: 2, to: 7,  depth: 2 },
    { from: 3, to: 8,  depth: 2 },
    { from: 3, to: 9,  depth: 2 },
    { from: 4, to: 10, depth: 2 },
    { from: 4, to: 11, depth: 2 },
    { from: 5, to: 12, depth: 2 },
    { from: 5, to: 13, depth: 2 },
    { from: 7, to: 14, depth: 3 },
    { from: 9, to: 15, depth: 3 },
  ];

  var HQ_UNITS = [
    { edge: 0,  phase: 0, num: '1', line1: 'HarmoniQ', line2: 'Booster',  pos: 0.62, side: 'right' },  // Top
    { edge: 5,  phase: 1, num: '2', line1: 'HarmoniQ',    line2: 'Alpha',    pos: 0.58, side: 'right' },  // Busbar -> MCC-2
    { edge: 8,  phase: 2, num: '3', line1: 'HarmoniQ',    line2: 'Alpha',    pos: 0.50, side: 'left'  },  // UPS -> PDU (far left)
    { edge: 9,  phase: 3, num: '4', line1: 'HarmoniQ',    line2: 'Alpha',    pos: 0.88, side: 'left'  },  // MCC-1 -> Motor
    { edge: 10, phase: 3, num: '5', line1: 'HarmoniQ',    line2: 'Filter',   pos: 0.82, side: 'right' },  // MCC-1 -> VFD
    { edge: 14, phase: 4, num: '6', line1: 'HarmoniQ',    line2: 'Alpha',    pos: 0.82, side: 'left'  },  // HVAC -> AHU
    { edge: 13, phase: 4, num: '7', line1: 'HarmoniQ',    line2: 'Filter',   pos: 0.82, side: 'right' },  // HVAC -> Chiller (far right)
  ];

  var NODE_TEMPS = {
    0:  { before: 52, after: 42 },
    2:  { before: 38, after: 28 },
    3:  { before: 46, after: 34 },
    4:  { before: 48, after: 35 },
    5:  { before: 44, after: 33 },
    6:  { before: 34, after: 26 },
    7:  { before: 40, after: 30 },
    8:  { before: 58, after: 44 },
    9:  { before: 42, after: 32 },
    10: { before: 56, after: 42 },
    11: { before: 56, after: 42 },
    12: { before: 50, after: 38 },
    13: { before: 44, after: 34 },
    14: { before: 36, after: 28 },
    15: { before: 60, after: 40 },
  };

  var TOOLTIP_NAMES = {
    0: 'Transformer', 1: 'Primary LV Switchgear',
    2: 'Uninterruptible Power Supply', 3: 'Motor Control Centre 1',
    4: 'Motor Control Centre 2', 5: 'HVAC Panel', 6: 'Lighting Panel',
    7: 'Power Distribution Unit', 8: 'Motor', 9: 'Variable Frequency Drive',
    10: 'Motor', 11: 'Motor', 12: 'Chiller', 13: 'Air Handling Unit',
    14: 'IT Loads', 15: 'Motor'
  };

  var SCOPE_POINTS = [
    { nodeId: 0,  label: 'Power Factor',       depth: 0, ox: -0.13, oy: 0.005, type: 'pf' },
    { nodeId: 0,  label: 'Transformer Output',  depth: 0, ox: 0.13, oy: 0.005 },
    { nodeId: 4,  label: 'MCC-2 Bus',           depth: 1, ox: 0.12, oy: 0.005 },
    { nodeId: 9,  label: 'VFD Input',            depth: 2, ox: -0.10, oy: 0.08 },
    { nodeId: 15, label: 'Motor Load',           depth: 3, ox: 0.10, oy: -0.01 },
  ];

  var W, H, nds, eds, scopeNds;
  var heatP = [], sparkP = [], flowP = [];

  // ── Health model ──
  // Map each edge index to the phase that primarily fixes it
  // Edge 0: Transformer->Switchgear (phase 0)
  // Edges 1,2: Busbar (phase 0)
  // Edge 3: Busbar->UPS (phase 2)
  // Edge 4: Busbar->MCC-1 (phase 3)
  // Edge 5: Busbar->MCC-2 (phase 1)
  // Edge 6: Busbar->HVAC (phase 4)
  // Edge 7: Busbar->Lighting (phase 4)
  // Edge 8: UPS->PDU (phase 2)
  // Edge 9: MCC-1->Motor (phase 3)
  // Edge 10: MCC-1->VFD (phase 3)
  // Edge 11: MCC-2->Motor (phase 1)
  // Edge 12: MCC-2->Motor (phase 1)
  // Edge 13: HVAC->Chiller (phase 4)
  // Edge 14: HVAC->AHU (phase 4)
  // Edge 15: PDU->IT Loads (phase 2)
  // Edge 16: VFD->Motor (phase 3)
  var EDGE_PHASE = [0, 0, 0, 2, 3, 1, 4, 4, 2, 3, 3, 1, 1, 4, 4, 2, 3];

  function edgeHealth(depth, edgeIdx) {
    var bad = (3 - depth) * 0.10 + 0.40;
    // Global improvement from phase 0 (switchgear) benefits everything slightly
    var fix = tp(0) * 0.15;
    // Primary phase for this specific edge provides the main fix
    var primary = edgeIdx !== undefined ? EDGE_PHASE[edgeIdx] : -1;
    if (primary === 0) {
      fix += tp(0) * 0.60;
    } else if (primary > 0) {
      fix += tp(primary) * 0.65;
    }
    return clamp(1 - bad + fix, 0.12, 1);
  }

  function scopeHealth(depth) {
    var bad = (3 - depth) * 0.10 + 0.40;
    var fix = tp(0) * 0.15;
    if (depth === 0) { fix = tp(0) * 0.75; }                       // Transformer scope
    else if (depth === 1) { fix += tp(1) * 0.55; }                 // MCC-2 Bus scope (phase 1)
    else if (depth === 2) { fix += tp(3) * 0.55; }                 // VFD Input scope (MCC-1, phase 3)
    else { fix += tp(3) * 0.55; }                                   // Motor Load scope (MCC-1, phase 3)
    return clamp(1 - bad + fix, 0.12, 1);
  }

  // Which HQ phase primarily fixes each node (5 phases, 7 units)
  // Unit 1 (phase 0): HarmoniQ Booster — Transformer/Switchgear (0)
  // Unit 2 (phase 1): MCC-2 branch — HarmoniQ Alpha (4,10,11)
  // Unit 3 (phase 2): UPS/PDU branch — HarmoniQ Alpha (2,7,14)
  // Units 4,5 (phase 3): MCC-1 branch — HarmoniQ Alpha on Motor, HarmoniQ Filter on VFD (3,8,9,15)
  // Units 6,7 (phase 4): HVAC branch — HarmoniQ Alpha on AHU, HarmoniQ Filter on Chiller (5,6,12,13)
  var NODE_PRIMARY = { 0:0, 2:2, 3:3, 4:1, 5:4, 6:4, 7:2, 8:3, 9:3, 10:1, 11:1, 12:4, 13:4, 14:2, 15:3 };
  function nodeFix(id) {
    var base = tp(0) * 0.12;
    var primary = NODE_PRIMARY[id];
    if (primary === undefined) return base;
    if (primary === 0) return tp(0);
    return clamp(base + tp(primary) * 0.88, 0, 1);
  }

  function healthRGB(h) {
    var r, g, b;
    if (h > 0.5) { var f = (h-0.5)*2; r = Math.round(lerp(245,0,f)); g = Math.round(lerp(158,185,f)); b = Math.round(lerp(11,128,f)); }
    else { var f2 = h*2; r = Math.round(lerp(190,245,f2)); g = Math.round(lerp(40,158,f2)); b = Math.round(lerp(15,11,f2)); }
    return [r, g, b];
  }

  function calcTHD(depth, dist, nodeId) {
    if (depth === 0) return lerp(3, 31, clamp(dist/0.70, 0, 1));
    if (depth === 2) {
      if (nodeId === 10 || nodeId === 11) return lerp(3, 26.5, clamp(dist/0.50, 0, 1));
      return lerp(3, 38.9, clamp(dist/0.50, 0, 1));
    }
    if (depth === 3) return lerp(3, 24.2, clamp(dist/0.40, 0, 1));
    return lerp(3, 28, clamp(dist/0.60, 0, 1));
  }

  function waveVal(dist, theta) {
    var h5 = 0.22*dist, h7 = 0.15*dist, h11 = 0.10*clamp(dist*2-0.4,0,1), h13 = 0.07*clamp(dist*2-0.6,0,1);
    var lag = 0.50*dist;
    return Math.sin(theta-lag) + h5*Math.sin(5*theta) + h7*Math.sin(7*theta+0.9) + h11*Math.sin(11*theta+1.8) + h13*Math.sin(13*theta+2.5);
  }

  function tempBorderRGB(temp) {
    var f = clamp((temp-38)/30,0,1); var r,g,b;
    if (f < 0.5) { var p=f*2; r=Math.round(lerp(0,245,p)); g=Math.round(lerp(185,158,p)); b=Math.round(lerp(128,11,p)); }
    else { var p2=(f-0.5)*2; r=Math.round(lerp(245,239,p2)); g=Math.round(lerp(158,68,p2)); b=Math.round(lerp(11,68,p2)); }
    return { r:r, g:g, b:b, f:f };
  }

  // ── Steps ──
  function buildSteps() {
    var mzoom = W > 600 ? 2.8 : 2.0;
    var motorNd = nds[10], vfdNd = nds[9], tfNd = nds[0];
    var restCx = W*0.50, restCy = H*0.50;
    var pfCx = tfNd.cx - 0.13*W, pfCy = tfNd.cy + 0.005*H;
    var pfZoom = W > 600 ? 3.5 : 2.5;
    STEPS = [
      { caption: 'Non-linear loads distort power and generate excess heat', cx: restCx, cy: restCy, z: 1.0, morph: 0, showTemps: false, heroNode: -1 },
      { caption: 'VFD harmonics propagate upstream through the network', cx: motorNd.cx, cy: motorNd.cy, z: mzoom, morph: 0, showTemps: false, heroNode: 10 },
      { caption: 'Up to 25% of energy lost as waste heat', cx: vfdNd.cx, cy: vfdNd.cy, z: mzoom, morph: 0, showTemps: false, heroNode: 9 },
      { caption: 'Excess heat degrades insulation \u2014 shortening equipment life', cx: restCx, cy: restCy, z: 1.0, morph: 0, showTemps: true, heroNode: -1 },
      { caption: 'Poor power factor \u2014 current lags voltage, wasting energy', cx: pfCx, cy: pfCy, z: pfZoom, morph: 0, showTemps: false, heroNode: -1, showPF: true },
      { caption: 'HarmoniQ corrects power factor \u2014 eliminating reactive waste', cx: pfCx, cy: pfCy, z: pfZoom, morph: 0.20, showTemps: false, heroNode: -1, showPF: true },
      { caption: 'HarmoniQ conditions power from switchgear to individual loads', cx: restCx, cy: restCy, z: 1.0, morph: 1, showTemps: true, heroNode: -1, waitForZoom: true },
      { caption: 'Lower losses \u00B7 Lower temperatures \u00B7 Longer life', cx: restCx, cy: restCy, z: 1.0, morph: 1, showTemps: true, heroNode: -1 },
    ];
    targetCam = { cx: restCx, cy: restCy, z: 1 };
  }

  function goToStep(idx) {
    if (idx < 0 || idx >= STEPS.length) return;
    currentStep = idx; stepFade = 0; stepTime = 0;
    var s = STEPS[idx];
    targetCam = { cx: s.cx, cy: s.cy, z: s.z };
    targetMorph = s.morph;
  }

  function advanceStep() {
    if (currentStep < STEPS.length - 1) { goToStep(currentStep + 1); }
    else {
      currentStep = -1; stepFade = 0; captionBounds = null;
      morph = 1; targetMorph = 1;
      targetCam = { cx: W*0.5, cy: H*0.50, z: 1 };
      var btn = document.getElementById('pqToggle');
      if (btn) { btn.innerHTML = '<span class="pq-toggle-icon">\u2713</span> HarmoniQ Active'; btn.classList.add('active'); }
    }
  }

  // ── Layout ──
  function resize() {
    var dpr = window.devicePixelRatio || 1;
    W = canvas.parentElement.clientWidth;
    H = Math.min(640, Math.max(400, W * 0.50));
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    nds = NODES.map(function(n) {
      var nd = { id: n.id, label: n.label, type: n.type, cx: n.xf*W, cy: n.yf*H };
      if (n.type === 'transformer') { nd.r = Math.min(22, Math.max(13, W*0.020)); nd.hw = nd.r*1.4; nd.hh = nd.r; }
      else if (n.type === 'busbar') { nd.hw = W*0.42; nd.hh = Math.max(3, H*0.005); }
      else if (n.type === 'panel') { nd.hw = Math.min(40, Math.max(24, W*0.038)); nd.hh = Math.min(20, Math.max(13, H*0.028)); }
      else if (n.type === 'box') { nd.hw = Math.min(34, Math.max(20, W*0.032)); nd.hh = Math.min(17, Math.max(11, H*0.024)); }
      else if (n.type === 'motor') { nd.r = Math.min(14, Math.max(9, W*0.013)); nd.hw = nd.r; nd.hh = nd.r; }
      return nd;
    });

    // Chain busbar branches so horizontal segments don't overlap
    var busbarStartX = {};
    var busCenter = nds[1].cx;
    var leftKids = [], rightKids = [];
    for (var bi = 0; bi < EDGES.length; bi++) {
      if (EDGES[bi].from === 1 && !EDGES[bi].isBusbar) {
        var childCx = nds[EDGES[bi].to].cx;
        if (childCx < busCenter - 3) leftKids.push({ idx: bi, cx: childCx });
        else if (childCx > busCenter + 3) rightKids.push({ idx: bi, cx: childCx });
      }
    }
    leftKids.sort(function(a,b) { return b.cx - a.cx; });
    rightKids.sort(function(a,b) { return a.cx - b.cx; });
    var prevLX = busCenter;
    for (var li = 0; li < leftKids.length; li++) { busbarStartX[leftKids[li].idx] = prevLX; prevLX = leftKids[li].cx; }
    var prevRX = busCenter;
    for (var ri = 0; ri < rightKids.length; ri++) { busbarStartX[rightKids[ri].idx] = prevRX; prevRX = rightKids[ri].cx; }

    eds = EDGES.map(function(e, idx) {
      var pn = nds[e.from], cn = nds[e.to]; var wp;
      if (e.isBusbar) {
        if (e.busDir === 'left') wp = [{ x: pn.cx, y: pn.cy }, { x: pn.cx-pn.hw, y: pn.cy }];
        else wp = [{ x: pn.cx, y: pn.cy }, { x: pn.cx+pn.hw, y: pn.cy }];
      }
      else if (e.from === 1) {
        var bsX = busbarStartX[idx] !== undefined ? busbarStartX[idx] : pn.cx;
        if (Math.abs(cn.cx - bsX) < 3) { wp = [{ x: cn.cx, y: pn.cy }, { x: cn.cx, y: cn.cy-cn.hh }]; }
        else { wp = [{ x: bsX, y: pn.cy }, { x: cn.cx, y: pn.cy }, { x: cn.cx, y: cn.cy-cn.hh }]; }
      }
      else if (Math.abs(pn.cx-cn.cx) < 3) { wp = [{ x: pn.cx, y: pn.cy+pn.hh }, { x: cn.cx, y: cn.cy-cn.hh }]; }
      else {
        // Use a fixed horizontal level based on the parent, so siblings share the same horizontal wire
        var my = pn.cy + pn.hh + (pn.hh * 1.8);
        wp = [{ x:pn.cx, y:pn.cy+pn.hh }, { x:pn.cx, y:my }, { x:cn.cx, y:my }, { x:cn.cx, y:cn.cy-cn.hh }];
      }
      return { from: e.from, to: e.to, depth: e.depth, wp: wp, isBusbar: !!e.isBusbar, idx: idx };
    });

    var scopeW = Math.min(100, Math.max(60, W*0.09));
    var scopeH = Math.min(52, Math.max(32, H*0.07));
    scopeNds = SCOPE_POINTS.map(function(sp) {
      var nd = nds[sp.nodeId];
      var sx = clamp(nd.cx + sp.ox*W, scopeW/2+4, W-scopeW/2-4);
      var sy = clamp(nd.cy + sp.oy*H, scopeH/2+4, H*0.66-scopeH/2);
      return { x: sx, y: sy, w: scopeW, h: scopeH, label: sp.label, depth: sp.depth, nodeId: sp.nodeId, type: sp.type || 'thd' };
    });

    buildSteps();
    heatP = []; sparkP = [];
    seedFlowParticles();
    sliderY = H * 0.43;

    if (currentStep >= 0) {
      currentStep = -1; stepFade = 0; captionBounds = null;
      morph = 0; targetMorph = 0;
      cam = { cx: W*0.5, cy: H*0.50, zoom: 1 };
      var btn = document.getElementById('pqToggle');
      if (btn) { btn.classList.remove('active'); btn.innerHTML = '<span class="pq-toggle-icon">&#9654;</span> See What HarmoniQ Does'; }
    }
  }

  // ── Flow Particle System ──
  var FLOW_SPEED = 0.8; // pixels per frame — uniform for all particles

  function edgeLength(e) {
    var tl = 0;
    for (var j = 1; j < e.wp.length; j++) {
      var dx = e.wp[j].x - e.wp[j-1].x, dy = e.wp[j].y - e.wp[j-1].y;
      tl += Math.sqrt(dx*dx + dy*dy);
    }
    return tl || 1;
  }

  function seedFlowParticles() {
    flowP = [];
    for (var i = 0; i < eds.length; i++) {
      var e = eds[i];
      if (e.isBusbar) continue;
      var tl = edgeLength(e);
      var count = Math.max(1, Math.round(tl / 28));
      for (var k = 0; k < count; k++) {
        flowP.push({ edge: i, pos: k/count, phase: Math.random()*TWO_PI, sz: 1.6 + Math.random()*1.0, cx: 0, cy: 0, nx: 0, ny: 0, len: tl });
      }
    }
  }

  function updateFlowParticles() {
    var savedM = morph;
    for (var i = 0; i < flowP.length; i++) {
      var fp = flowP[i], e = eds[fp.edge];
      // In slider mode, use morph based on particle's Y position
      if (viewMode === 'slider') {
        morph = (fp.cy < sliderY) ? 1 : 0;
      }
      var h = edgeHealth(e.depth, e.idx);
      // h=1 (clean) → uniform pixel speed everywhere. h<1 (degraded) → progressively slower
      var spdMul = h >= 1 ? 1.0 : (0.40 + h * 0.60);
      var spd = FLOW_SPEED * spdMul / fp.len;
      fp.pos += spd;
      if (fp.pos > 1) fp.pos -= 1;
      var pos = edgePos(e, fp.pos);
      var pos2 = edgePos(e, clamp(fp.pos + 0.03, 0, 0.99));
      var dx = pos2.x - pos.x, dy = pos2.y - pos.y;
      var len = Math.sqrt(dx*dx + dy*dy) || 1;
      fp.cx = pos.x; fp.cy = pos.y;
      fp.nx = -dy / len; fp.ny = dx / len;
    }
    morph = savedM;
  }

  function renderFlowParticles() {
    for (var i = 0; i < flowP.length; i++) {
      var fp = flowP[i], e = eds[fp.edge];
      var h = edgeHealth(e.depth, e.idx);
      var rgb = healthRGB(h);
      // Dirty power: lateral wobble + size pulsing. Clean power: perfectly straight
      var wobble = (1-h);
      var lat = wobble * 4.5 * Math.sin(t*6 + fp.phase*3) + wobble * 1.5 * Math.sin(t*11 + fp.phase*7);
      var fx = fp.cx + fp.nx * lat, fy = fp.cy + fp.ny * lat;
      var sz = fp.sz * (1 + wobble*0.5*Math.sin(t*5+fp.phase));
      var fa = 0.45 + h*0.40;
      if (fp.pos < 0.08) fa *= fp.pos / 0.08;
      if (fp.pos > 0.92) fa *= (1 - fp.pos) / 0.08;
      ctx.save(); ctx.globalAlpha = fa;
      ctx.fillStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',1)';
      ctx.shadowBlur = h > 0.5 ? 6 : 4; ctx.shadowColor = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.5)';
      ctx.beginPath(); ctx.arc(fx, fy, sz, 0, TWO_PI); ctx.fill();
      ctx.restore();
    }
  }

  // ── Helpers ──
  function edgePos(e, p) {
    var wp = e.wp;
    if (wp.length === 2) return { x: lerp(wp[0].x,wp[1].x,p), y: lerp(wp[0].y,wp[1].y,p) };
    var segs = [], tl = 0;
    for (var i = 1; i < wp.length; i++) { var dx = wp[i].x-wp[i-1].x, dy = wp[i].y-wp[i-1].y; var l = Math.sqrt(dx*dx+dy*dy); segs.push({ l:l, a:wp[i-1], b:wp[i] }); tl += l; }
    var tgt = p*tl, cum = 0;
    for (var j = 0; j < segs.length; j++) {
      if (cum+segs[j].l >= tgt || j === segs.length-1) { var sp2 = clamp((tgt-cum)/segs[j].l, 0, 1); return { x: lerp(segs[j].a.x,segs[j].b.x,sp2), y: lerp(segs[j].a.y,segs[j].b.y,sp2) }; }
      cum += segs[j].l;
    }
    return wp[wp.length-1];
  }

  function rrect(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  }

  function w2s(wx, wy) { return { x: (wx - cam.cx) * cam.zoom + W/2, y: (wy - cam.cy) * cam.zoom + H/2 }; }
  function s2w(sx, sy) { return { x: (sx - W/2) / cam.zoom + cam.cx, y: (sy - H/2) / cam.zoom + cam.cy }; }

  // ── Hit testing ──
  function distToSeg(p, a, b) {
    var dx = b.x-a.x, dy = b.y-a.y, lenSq = dx*dx+dy*dy;
    if (lenSq === 0) return Math.hypot(p.x-a.x, p.y-a.y);
    var u = clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/lenSq, 0, 1);
    return Math.hypot(p.x-(a.x+u*dx), p.y-(a.y+u*dy));
  }

  function updateHover() {
    hoveredNode = -1; hoveredEdge = -1;
    if (mouseX < 0 || currentStep >= 0 || sliderDragging) return;
    var wp = s2w(mouseX, mouseY);
    for (var i = nds.length-1; i >= 0; i--) {
      var nd = nds[i]; if (nd.type === 'busbar') continue;
      var hitR = (nd.r || Math.max(nd.hw, nd.hh)) + 6;
      if (Math.hypot(wp.x-nd.cx, wp.y-nd.cy) < hitR) { hoveredNode = i; return; }
    }
    for (var j = 0; j < eds.length; j++) {
      var e = eds[j], minD = Infinity;
      for (var k = 1; k < e.wp.length; k++) minD = Math.min(minD, distToSeg(wp, e.wp[k-1], e.wp[k]));
      if (minD < 8/cam.zoom) { hoveredEdge = j; return; }
    }
  }

  // ── Drawing: edges ──
  function drawCleanEdge(e) {
    var h = edgeHealth(e.depth, e.idx); var rgb = healthRGB(h); var wp = e.wp;
    var lw = e.from === 1 ? Math.min(3, W*0.003) : Math.min(2.5, W*0.0025);
    if (e.depth >= 3) lw *= 0.75;
    // Highlight hovered edge
    if (hoveredEdge >= 0 && eds[hoveredEdge] === e) { lw *= 1.8; }
    ctx.save();
    ctx.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.50)';
    ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (h < 0.6) { ctx.shadowBlur = 8; ctx.shadowColor = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.25)'; }
    var si = (e.from === 1 && wp.length > 2) ? 1 : 0;
    ctx.beginPath(); ctx.moveTo(wp[si].x, wp[si].y);
    for (var i = si + 1; i < wp.length; i++) ctx.lineTo(wp[i].x, wp[i].y);
    ctx.stroke(); ctx.restore();
  }

  // ── Drawing: thermal glow ──
  function drawTempGlow(cx, cy, radius, temp) {
    var tc = tempBorderRGB(temp); if (tc.f < 0.25) return;
    var pulse = 0.3 + Math.sin(t*3.2)*0.15; var intensity = tc.f*pulse; var glowR = radius+10+tc.f*12;
    ctx.save();
    var grad = ctx.createRadialGradient(cx,cy,radius*0.5,cx,cy,glowR);
    grad.addColorStop(0, 'rgba('+tc.r+','+tc.g+','+tc.b+','+(intensity*0.25)+')');
    grad.addColorStop(0.5, 'rgba('+tc.r+','+tc.g+','+tc.b+','+(intensity*0.10)+')');
    grad.addColorStop(1, 'rgba('+tc.r+','+tc.g+','+tc.b+',0)');
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx,cy,glowR,0,TWO_PI); ctx.fill(); ctx.restore();
  }

  // ── Drawing: temp label ──
  function drawTempLabel(nd, temp, alpha) {
    if (alpha <= 0.01) return;
    ctx.save(); ctx.globalAlpha = alpha;
    var tsz = Math.max(9, Math.min(12, W*0.010));
    ctx.font = '700 '+tsz+'px JetBrains Mono, monospace';
    var tc = tempBorderRGB(temp);
    var txt = Math.round(temp) + '\u00B0C';
    var ox = (nd.hw || nd.r || 14) + 8;
    var lx = nd.cx + ox, ly = nd.cy;
    var tw = ctx.measureText(txt).width + 8;
    ctx.fillStyle = 'rgba(8,10,15,0.85)';
    rrect(lx-4, ly-tsz/2-3, tw, tsz+6, 3); ctx.fill();
    ctx.fillStyle = 'rgba('+tc.r+','+tc.g+','+tc.b+',0.90)';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(txt, lx, ly); ctx.restore();
  }

  // ── Drawing: scope display ──
  function drawScopeDisplay(sp) {
    var h = scopeHealth(sp.depth); var dist = 1-h; var rgb = healthRGB(h);
    var x = sp.x-sp.w/2, y = sp.y-sp.h/2; var nd = nds[sp.nodeId];
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1; ctx.setLineDash([3,4]);
    var dx = sp.x - nd.cx, dy = sp.y - nd.cy;
    var absDx = Math.abs(dx), absDy = Math.abs(dy);
    // Stop at scope box edge
    var scaleX = absDx > 0 ? (sp.w/2) / absDx : Infinity;
    var scaleY = absDy > 0 ? (sp.h/2) / absDy : Infinity;
    var s = Math.min(scaleX, scaleY);
    var boxEdgeX = sp.x - dx * s, boxEdgeY = sp.y - dy * s;
    // Start from node edge (not center)
    var ndR = nd.r || Math.max(nd.hw, nd.hh);
    var sN = absDx > 0 || absDy > 0 ? ndR / Math.sqrt(dx*dx + dy*dy) : 0;
    var nodeEdgeX = nd.cx + dx * sN, nodeEdgeY = nd.cy + dy * sN;
    ctx.beginPath(); ctx.moveTo(nodeEdgeX, nodeEdgeY); ctx.lineTo(boxEdgeX, boxEdgeY); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(8,10,15,0.92)'; ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    rrect(x,y,sp.w,sp.h,4); ctx.fill(); ctx.stroke();
    var slsz = Math.max(6, Math.min(8, W*0.007));
    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '600 '+slsz+'px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText(sp.label, x+4, y+3);
    var wPad=4, wW=sp.w-wPad*2, wH=sp.h-16, wY=y+14+wH/2;
    ctx.strokeStyle = 'rgba(0,185,128,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([2,3]);
    ctx.beginPath();
    for (var s=0; s<=wW; s++) { var frac=s/wW, theta=frac*TWO_PI*2+t*2, val=Math.sin(theta)*(wH*0.38); s===0?ctx.moveTo(x+wPad+s,wY-val):ctx.lineTo(x+wPad+s,wY-val); }
    ctx.stroke(); ctx.setLineDash([]);
    // Amplify visual distortion to match high THD values at all depths
    var waveDist = clamp(dist * 2.5, 0, 1);
    ctx.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.85)'; ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (var s2=0; s2<=wW; s2++) { var frac2=s2/wW, theta2=frac2*TWO_PI*2+t*2, raw=waveVal(waveDist,theta2), val2=(raw/1.5)*(wH*0.38); s2===0?ctx.moveTo(x+wPad+s2,wY-val2):ctx.lineTo(x+wPad+s2,wY-val2); }
    ctx.stroke();
    // Transformer shows 30% THD before HarmoniQ, other scopes use standard range
    var thd;
    thd = calcTHD(sp.depth, dist, sp.nodeId);
    var thdSz = Math.max(7, Math.min(9, W*0.008));
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.font = '700 '+thdSz+'px JetBrains Mono, monospace';
    ctx.fillStyle = h>0.7 ? 'rgba(0,185,128,0.7)' : 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.75)';
    ctx.fillText('THD '+thd.toFixed(1)+'%', x+sp.w-4, y+sp.h-2);
    ctx.restore();
  }

  // ── Drawing: power factor scope ──
  function drawPFDisplay(sp) {
    var h = scopeHealth(sp.depth); var dist = 1-h;
    var x = sp.x-sp.w/2, y = sp.y-sp.h/2; var nd = nds[sp.nodeId];
    ctx.save();
    // Leader line
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1; ctx.setLineDash([3,4]);
    var dx = sp.x - nd.cx, dy = sp.y - nd.cy;
    var absDx = Math.abs(dx), absDy = Math.abs(dy);
    var scX = absDx > 0 ? (sp.w/2) / absDx : Infinity;
    var scY = absDy > 0 ? (sp.h/2) / absDy : Infinity;
    var sc = Math.min(scX, scY);
    var bex = sp.x - dx * sc, bey = sp.y - dy * sc;
    var ndR = nd.r || Math.max(nd.hw, nd.hh);
    var sN = absDx > 0 || absDy > 0 ? ndR / Math.sqrt(dx*dx + dy*dy) : 0;
    ctx.beginPath(); ctx.moveTo(nd.cx + dx*sN, nd.cy + dy*sN); ctx.lineTo(bex, bey); ctx.stroke(); ctx.setLineDash([]);
    // Background box
    ctx.fillStyle = 'rgba(8,10,15,0.92)'; ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    rrect(x, y, sp.w, sp.h, 4); ctx.fill(); ctx.stroke();
    // Label
    var slsz = Math.max(6, Math.min(8, W*0.007));
    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '600 '+slsz+'px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText(sp.label, x+4, y+3);
    // Waveform area
    var wPad = 4, wW = sp.w - wPad*2, wH = sp.h - 16, wY = y + 14 + wH/2;
    var amp = wH * 0.44;
    // Phase shift: larger shift = bigger gap between voltage & current waves
    var phaseShift = dist * 1.7;
    var pf = lerp(0.68, 0.99, 1 - clamp(dist / 0.70, 0, 1));
    // Build voltage and current arrays
    var vArr = [], cArr = [];
    for (var si = 0; si <= wW; si++) {
      var frac = si / wW, theta = frac * TWO_PI * 2 + t * 2;
      vArr.push(Math.sin(theta) * amp);
      cArr.push(Math.sin(theta - phaseShift) * amp);
    }
    // Fill "waste" lens where voltage leads current (V > I) — reactive power loss
    ctx.fillStyle = 'rgba(200,60,60,0.28)';
    var wasteStart = -1;
    for (var wi = 0; wi <= wW; wi++) {
      var isWaste = cArr[wi] > vArr[wi];
      if (isWaste && wasteStart < 0) { wasteStart = wi; }
      else if (!isWaste && wasteStart >= 0) {
        ctx.beginPath(); ctx.moveTo(x+wPad+wasteStart, wY-vArr[wasteStart]);
        for (var fw=wasteStart+1; fw<wi; fw++) ctx.lineTo(x+wPad+fw, wY-vArr[fw]);
        for (var bw=wi-1; bw>=wasteStart; bw--) ctx.lineTo(x+wPad+bw, wY-cArr[bw]);
        ctx.closePath(); ctx.fill(); wasteStart = -1;
      }
    }
    if (wasteStart >= 0) {
      ctx.beginPath(); ctx.moveTo(x+wPad+wasteStart, wY-vArr[wasteStart]);
      for (var fw2=wasteStart+1; fw2<=wW; fw2++) ctx.lineTo(x+wPad+fw2, wY-vArr[fw2]);
      for (var bw2=wW; bw2>=wasteStart; bw2--) ctx.lineTo(x+wPad+bw2, wY-cArr[bw2]);
      ctx.closePath(); ctx.fill();
    }
    // Voltage wave (blue)
    ctx.strokeStyle = 'rgba(100,160,230,0.85)'; ctx.lineWidth = 1.2; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (var vi = 0; vi <= wW; vi++) { vi === 0 ? ctx.moveTo(x+wPad, wY-vArr[0]) : ctx.lineTo(x+wPad+vi, wY-vArr[vi]); }
    ctx.stroke();
    // Current wave (orange/yellow, phase-shifted)
    ctx.strokeStyle = 'rgba(245,178,50,0.85)'; ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (var ci = 0; ci <= wW; ci++) { ci === 0 ? ctx.moveTo(x+wPad, wY-cArr[0]) : ctx.lineTo(x+wPad+ci, wY-cArr[ci]); }
    ctx.stroke();
    // PF value
    var thdSz = Math.max(7, Math.min(9, W*0.008));
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.font = '700 '+thdSz+'px JetBrains Mono, monospace';
    ctx.fillStyle = h > 0.7 ? 'rgba(0,185,128,0.7)' : 'rgba(245,158,11,0.75)';
    ctx.fillText('PF '+pf.toFixed(2), x+sp.w-4, y+sp.h-2);
    ctx.restore();
  }

  // ── Drawing: hero waveform ──
  function drawHeroWaveform(nd, depth, alpha, extraDist, eIdx) {
    if (alpha <= 0.01) return;
    var h = edgeHealth(depth, eIdx); var dist = extraDist || (1-h); var rgb = healthRGB(1-dist);
    var scr = w2s(nd.cx, nd.cy);
    var hw = Math.min(220, W*0.18); var hh = Math.min(80, W*0.07);
    var hx = scr.x + 40; var hy = scr.y - hh/2;
    if (hx + hw > W - 10) hx = scr.x - hw - 40;
    hy = clamp(hy, 10, H*0.75 - hh);
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.strokeStyle = 'rgba(0,185,128,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.moveTo(scr.x, scr.y); ctx.lineTo(hx < scr.x ? hx+hw : hx, hy+hh/2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(0,185,128,0.6)'; ctx.beginPath(); ctx.arc(scr.x, scr.y, 4, 0, TWO_PI); ctx.fill();
    ctx.fillStyle = 'rgba(8,10,15,0.95)'; ctx.strokeStyle = 'rgba(0,185,128,0.20)'; ctx.lineWidth = 1;
    rrect(hx, hy, hw, hh, 6); ctx.fill(); ctx.stroke();
    var lsz2 = Math.max(9, Math.min(12, W*0.010));
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '600 '+lsz2+'px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(nd.type === 'motor' ? 'Motor Current' : 'VFD Output', hx+8, hy+6);
    var wPad=8, wW=hw-wPad*2, wH=hh-28, wY=hy+22+wH/2;
    ctx.strokeStyle = 'rgba(0,185,128,0.18)'; ctx.lineWidth = 1; ctx.setLineDash([3,4]);
    ctx.beginPath();
    for (var s=0; s<=wW; s++) { var frac=s/wW, theta=frac*TWO_PI*2.5+t*2.5, val=Math.sin(theta)*(wH*0.42); s===0?ctx.moveTo(hx+wPad+s,wY-val):ctx.lineTo(hx+wPad+s,wY-val); }
    ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.90)'; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (var s2=0; s2<=wW; s2++) { var frac2=s2/wW, theta2=frac2*TWO_PI*2.5+t*2.5, raw=waveVal(dist,theta2), val2=(raw/1.5)*(wH*0.42); s2===0?ctx.moveTo(hx+wPad+s2,wY-val2):ctx.lineTo(hx+wPad+s2,wY-val2); }
    ctx.stroke();
    var thd = calcTHD(depth, dist, nd.id), tsz = Math.max(9, Math.min(11, W*0.009));
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.font = '700 '+tsz+'px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.8)';
    ctx.fillText('THD '+thd.toFixed(1)+'%', hx+hw-8, hy+hh-4);
    ctx.restore();
  }

  // ── Drawing: caption ──
  function drawCaptionText(text, alpha, step, total) {
    if (alpha <= 0 || !text) { captionBounds = null; return; }
    ctx.save(); ctx.globalAlpha = alpha;
    var fsz = Math.max(12, Math.min(15, W*0.013));
    ctx.font = '500 '+fsz+'px JetBrains Mono, Consolas, monospace';
    var tw = ctx.measureText(text).width;
    var padX = 28, padY = 18;
    var bx = W/2-tw/2-padX, by = H*0.74-fsz-padY;
    var bw = tw+padX*2, bh = fsz+padY*2+20;
    captionBounds = { x:bx, y:by, w:bw, h:bh };
    ctx.fillStyle = 'rgba(6,8,12,0.92)';
    rrect(bx,by,bw,bh,6); ctx.fill();
    ctx.strokeStyle = 'rgba(0,185,128,0.15)'; ctx.lineWidth = 1;
    rrect(bx,by,bw,bh,6); ctx.stroke();
    ctx.fillStyle = 'rgba(0,185,128,0.35)';
    rrect(bx,by+4,3,bh-8,1); ctx.fill();
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.letterSpacing = '0.5px';
    ctx.shadowColor = 'rgba(0,185,128,0.25)'; ctx.shadowBlur = 6;
    ctx.fillStyle = 'rgba(0,210,140,0.90)';
    ctx.fillText(text, W/2, by+padY);
    ctx.shadowBlur = 0;
    // Progress dots + step counter (left side of bottom row)
    var dotR=3, dotGap=14, dotsW=total*dotGap;
    var dotsX = bx+padX, dotsY = by+bh-13;
    for (var di=0; di<total; di++) {
      ctx.beginPath(); ctx.arc(dotsX+di*dotGap, dotsY, dotR, 0, TWO_PI);
      ctx.fillStyle = di===step ? 'rgba(0,210,140,0.85)' : 'rgba(255,255,255,0.10)';
      ctx.fill();
    }
    // Countdown bar — thin line under the caption box that shrinks over 4s
    var elapsed = stepTime > 0 ? performance.now() - stepTime : 0;
    var progress = stepTime > 0 ? clamp(1 - elapsed / STEP_AUTO_MS, 0, 1) : 1;
    var barY = by + bh - 2, barH = 2;
    ctx.fillStyle = 'rgba(0,210,140,0.35)';
    rrect(bx + 4, barY, (bw - 8) * progress, barH, 1); ctx.fill();
    // "Click anywhere to continue" — right-aligned, bright pulsing text
    var promptPulse = 0.70 + Math.sin(t * 2.8) * 0.30;
    var nudge = Math.sin(t * 3.0) * 2.5;
    var promptSz = Math.max(11, Math.min(14, W*0.012));
    var promptStr = step<total-1 ? 'Click to skip  \u25B6' : 'Click to finish  \u2713';
    ctx.font = '600 '+promptSz+'px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(0,210,140,0.5)';
    ctx.fillStyle = 'rgba(0,210,140,' + promptPulse.toFixed(3) + ')';
    ctx.fillText(promptStr, bx+bw-padX + nudge, dotsY);
    ctx.shadowBlur = 0;
    arrowLeftBounds = null; arrowRightBounds = null;
    ctx.restore();
  }

  // ── Drawing: metrics bar ──
  function drawMetrics(t1v, t3v, avgFix) {
    var mY = H * 0.87;
    var mets = [
      { lbl: 'Power Factor', val: t1v > 0.95 ? '0.98+' : lerp(0.78,0.98,t1v).toFixed(2), bad: t1v<0.9 },
      { lbl: 'Current THD', val: lerp(25,4.5,t3v).toFixed(1)+'%', bad: t3v<0.9 },
      { lbl: 'Heat Reduction', val: Math.round(lerp(0,10,avgFix))+'\u00B0C', bad: false },
      { lbl: 'Energy Saved', val: Math.round(lerp(0,18,avgFix))+'%', bad: false }
    ];
    var mlsz = Math.max(9, Math.min(12, W*0.010));
    var mvsz = Math.max(16, Math.min(24, W*0.020));
    var mW = W / mets.length;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W*0.04,mY-16); ctx.lineTo(W*0.96,mY-16); ctx.stroke();
    ctx.fillStyle = '#080A0F'; ctx.fillRect(0, mY-18, W, H-mY+18);
    for (var mi = 0; mi < mets.length; mi++) {
      var m = mets[mi], mx = mi*mW + mW/2;
      ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.015)'; rrect(mi*mW+6,mY-12,mW-12,48,4); ctx.fill(); ctx.restore();
      if (mi > 0) { ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(mi*mW,mY-10); ctx.lineTo(mi*mW,mY+35); ctx.stroke(); }
      ctx.save(); ctx.textAlign = 'center';
      ctx.font = '600 '+mlsz+'px Inter, system-ui, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.30)'; ctx.textBaseline = 'top';
      ctx.fillText(m.lbl.toUpperCase(), mx, mY-8);
      ctx.font = '700 '+mvsz+'px JetBrains Mono, monospace'; ctx.fillStyle = m.bad ? '#EF4444' : '#00A880';
      ctx.fillText(m.val, mx, mY+8); ctx.restore();
    }
  }

  // ── Drawing: tooltip ──
  function drawTooltip() {
    if (hoveredNode < 0 && hoveredEdge < 0) return;
    var lines = [], title = '', tx, ty;

    // In slider mode, determine if hovered item is above or below the divider
    var effectiveMorph = morph;
    if (viewMode === 'slider') {
      var itemY = 0;
      if (hoveredNode >= 0) itemY = nds[hoveredNode].cy;
      else if (hoveredEdge >= 0) itemY = edgePos(eds[hoveredEdge], 0.5).y;
      effectiveMorph = (itemY < sliderY) ? 1 : 0;
    }

    // Temporarily swap morph so edgeHealth/tp read correctly
    var savedM = morph;
    morph = effectiveMorph;
    var t1v = tp(0), t2v = tp(1), t3v = tp(2);
    var avgF = (t1v + t2v + t3v + tp(3) + tp(4) + tp(5)) / 6;

    if (hoveredNode >= 0) {
      var nd = nds[hoveredNode];
      var scr = w2s(nd.cx, nd.cy);
      title = TOOLTIP_NAMES[nd.id] || nd.label.replace('\n', ' ');
      var depth = 0, eIdx = 0;
      for (var i = 0; i < eds.length; i++) { if (eds[i].to === nd.id) { depth = eds[i].depth; eIdx = i; break; } }
      var h = edgeHealth(depth, eIdx);
      var basePF = 0.78 - depth * 0.045;
      var pf = lerp(basePF, 0.99, clamp(effectiveMorph * 1.3, 0, 1));
      lines.push({ label: 'THD', value: calcTHD(depth, 1-h, nd.id).toFixed(1)+'%', good: h > 0.85 });
      lines.push({ label: 'PF', value: pf.toFixed(2), good: h > 0.85 });
      if (NODE_TEMPS[nd.id]) {
        var td = NODE_TEMPS[nd.id];
        var temp = lerp(td.before, td.after, nodeFix(nd.id));
        lines.push({ label: 'Temp', value: Math.round(temp)+'\u00B0C', good: h > 0.85 });
      }
      tx = scr.x + 20; ty = scr.y - 20;
    } else {
      var e = eds[hoveredEdge];
      var midP = edgePos(e, 0.5);
      var scr2 = w2s(midP.x, midP.y);
      title = 'Circuit \u2014 Depth ' + e.depth;
      var h2 = edgeHealth(e.depth, e.idx);
      var basePF2 = 0.78 - e.depth * 0.045;
      var pf2 = lerp(basePF2, 0.99, clamp(effectiveMorph * 1.3, 0, 1));
      lines.push({ label: 'THD', value: calcTHD(e.depth, 1-h2, e.to).toFixed(1)+'%', good: h2 > 0.85 });
      lines.push({ label: 'PF', value: pf2.toFixed(2), good: pf2 > 0.90 });
      tx = mouseX + 15; ty = mouseY - 15;
    }
    morph = savedM;

    var tsz = Math.max(10, Math.min(12, W*0.010));
    var lsz3 = Math.max(9, Math.min(11, W*0.009));
    ctx.save();
    ctx.font = '600 '+tsz+'px Inter, sans-serif';
    var maxW = ctx.measureText(title).width;
    ctx.font = '500 '+lsz3+'px JetBrains Mono, monospace';
    for (var j = 0; j < lines.length; j++) {
      var lw = ctx.measureText(lines[j].label + ': ' + lines[j].value).width;
      if (lw > maxW) maxW = lw;
    }
    var padX = 12, padY = 10;
    var tw = maxW + padX*2;
    var th = tsz + lines.length*(lsz3+5) + padY*2 + 4;
    if (tx + tw > W - 10) tx = tx - tw - 40;
    if (ty + th > H*0.80) ty = ty - th;
    tx = clamp(tx, 10, W-tw-10); ty = clamp(ty, 10, H*0.80-th);

    ctx.fillStyle = 'rgba(6,8,12,0.92)';
    rrect(tx,ty,tw,th,6); ctx.fill();
    ctx.strokeStyle = 'rgba(0,185,128,0.20)'; ctx.lineWidth = 1;
    rrect(tx,ty,tw,th,6); ctx.stroke();
    ctx.font = '600 '+tsz+'px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.80)';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(title, tx+padX, ty+padY);
    ctx.font = '500 '+lsz3+'px JetBrains Mono, monospace';
    for (var k = 0; k < lines.length; k++) {
      var line = lines[k];
      var ly = ty + padY + tsz + 6 + k*(lsz3+5);
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText(line.label+': ', tx+padX, ly);
      var labelW = ctx.measureText(line.label+': ').width;
      ctx.fillStyle = line.good ? 'rgba(0,185,128,0.85)' : 'rgba(239,68,68,0.85)';
      ctx.fillText(line.value, tx+padX+labelW, ly);
    }
    ctx.restore();
  }

  // ── Drawing: slider UI ──
  function drawSliderUI() {
    var sy = sliderY;
    // Divider line
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.50)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
    // Grab handle
    var hx = W * 0.92;
    ctx.fillStyle = 'rgba(0,168,128,0.90)';
    ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(0,168,128,0.5)';
    ctx.beginPath(); ctx.arc(hx, sy, 16, 0, TWO_PI); ctx.fill();
    ctx.shadowBlur = 0;
    // Arrows
    ctx.fillStyle = '#fff'; ctx.font = '700 14px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('\u25B2 \u25BC', hx, sy);
    // Labels
    var labSz = Math.max(9, Math.min(11, W*0.009));
    ctx.font = '700 '+labSz+'px Inter, sans-serif'; ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0,185,128,0.70)'; ctx.textBaseline = 'bottom';
    ctx.fillText('WITH HARMONIQ', 10, sy - 8);
    ctx.fillStyle = 'rgba(239,68,68,0.70)'; ctx.textBaseline = 'top';
    ctx.fillText('WITHOUT', 10, sy + 8);
    // Drag prompt (above handle, disappears once dragged)
    if (!sliderHasDragged && !sliderIntro) {
      var promptSz = Math.max(9, Math.min(11, W*0.009));
      var pulse = 0.65 + Math.sin(t * 2.5) * 0.20;
      ctx.font = '600 '+promptSz+'px JetBrains Mono, Consolas, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(0,185,128,0.6)';
      ctx.fillStyle = 'rgba(0,210,140,' + pulse + ')';
      var arrowBigSz = promptSz + 4;
      ctx.font = '700 '+arrowBigSz+'px Inter, sans-serif';
      var arrowW = ctx.measureText('\u2195').width;
      ctx.font = '600 '+promptSz+'px JetBrains Mono, Consolas, monospace';
      var textW = ctx.measureText(' drag to compare').width;
      var totalW = arrowW + textW;
      var startX = hx - totalW/2;
      ctx.textBaseline = 'top';
      ctx.font = '700 '+arrowBigSz+'px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('\u2195', startX, sy + 23);
      ctx.font = '600 '+promptSz+'px JetBrains Mono, Consolas, monospace';
      ctx.fillText('drag to compare', startX + arrowW + 4, sy + 24 + (arrowBigSz - promptSz)/2);
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════
  // ── RENDER SCENE (world space — can be called multiple times) ──
  // ═══════════════════════════════════════════════════════════════
  function renderScene(showHeat) {
    var t1v = tp(0), t2v = tp(1), t3v = tp(2), t4v = tp(3), t5v = tp(4), t6v = tp(5);
    var avgFix = (t1v + t2v + t3v + t4v + t5v + t6v) / 6;

    ctx.save();
    ctx.translate(W/2, H/2);
    ctx.scale(cam.zoom, cam.zoom);
    ctx.translate(-cam.cx, -cam.cy);

    // Grid
    if (cam.zoom < 1.4) {
      var gi, gAlpha = 0.015 * clamp((1.4-cam.zoom)/0.4, 0, 1);
      ctx.strokeStyle = 'rgba(255,255,255,' + gAlpha + ')'; ctx.lineWidth = 1;
      for (gi=1; gi<20; gi++) { ctx.beginPath(); ctx.moveTo(Math.round(gi*W/20)+0.5,0); ctx.lineTo(Math.round(gi*W/20)+0.5,H*0.66); ctx.stroke(); }
      for (gi=1; gi<14; gi++) { ctx.beginPath(); ctx.moveTo(0,Math.round(gi*H/14)+0.5); ctx.lineTo(W,Math.round(gi*H/14)+0.5); ctx.stroke(); }
    }

    // Edges
    for (var ei = 0; ei < eds.length; ei++) {
      var e = eds[ei];
      if (e.isBusbar) continue;
      drawCleanEdge(e);
      if (e.from === 1) {
        var bki = e.wp.length - 2; var bkx = e.wp[bki].x, bky = e.wp[bki].y+7;
        ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(bkx-3.5,bky-3.5); ctx.lineTo(bkx+3.5,bky+3.5); ctx.moveTo(bkx+3.5,bky-3.5); ctx.lineTo(bkx-3.5,bky+3.5); ctx.stroke(); ctx.restore();
      }
    }

    // Power Grid header
    var tf = nds[0];
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(tf.cx,0); ctx.lineTo(tf.cx,tf.cy-tf.hh); ctx.stroke();
    var pyX = tf.cx, pyY = 6;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pyX-6,pyY+14); ctx.lineTo(pyX,pyY); ctx.lineTo(pyX+6,pyY+14); ctx.moveTo(pyX-8,pyY+5); ctx.lineTo(pyX+8,pyY+5); ctx.moveTo(pyX-6,pyY+10); ctx.lineTo(pyX+6,pyY+10); ctx.stroke();
    var gridSz = Math.max(8, Math.min(11, W*0.010));
    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '600 '+gridSz+'px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText('Power Grid', tf.cx+14, 4);
    ctx.restore();

    // Nodes
    var lsz = Math.max(9, Math.min(12, W*0.011));
    for (var ni = 0; ni < nds.length; ni++) {
      var nd = nds[ni];
      var isHovered = (ni === hoveredNode);

      if (nd.type === 'busbar') {
        var overallH = (edgeHealth(0,0)+edgeHealth(1,3)+edgeHealth(1,5)+edgeHealth(1,6))/4; var busRGB = healthRGB(overallH);
        ctx.save();
        var bg = ctx.createLinearGradient(nd.cx-nd.hw,0,nd.cx+nd.hw,0);
        bg.addColorStop(0,'rgba('+busRGB[0]+','+busRGB[1]+','+busRGB[2]+',0.01)'); bg.addColorStop(0.08,'rgba('+busRGB[0]+','+busRGB[1]+','+busRGB[2]+',0.14)');
        bg.addColorStop(0.92,'rgba('+busRGB[0]+','+busRGB[1]+','+busRGB[2]+',0.14)'); bg.addColorStop(1,'rgba('+busRGB[0]+','+busRGB[1]+','+busRGB[2]+',0.01)');
        ctx.fillStyle = bg; ctx.fillRect(nd.cx-nd.hw,nd.cy-nd.hh,nd.hw*2,nd.hh*2);
        ctx.strokeStyle = 'rgba('+busRGB[0]+','+busRGB[1]+','+busRGB[2]+',0.22)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(nd.cx-nd.hw,nd.cy-nd.hh); ctx.lineTo(nd.cx+nd.hw,nd.cy-nd.hh); ctx.moveTo(nd.cx-nd.hw,nd.cy+nd.hh); ctx.lineTo(nd.cx+nd.hw,nd.cy+nd.hh); ctx.stroke();
        ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = '600 '+Math.max(7,lsz*0.8)+'px Inter, system-ui, sans-serif'; ctx.fillText(nd.label, nd.cx-nd.hw+4, nd.cy-nd.hh-3);
        ctx.restore(); continue;
      }

      if (nd.type === 'transformer') {
        var tH = edgeHealth(0, 0); var tRGB = healthRGB(tH);
        ctx.save(); var r = nd.r, offset = r*0.35;
        ctx.fillStyle = 'rgba('+tRGB[0]+','+tRGB[1]+','+tRGB[2]+',0.06)'; ctx.beginPath(); ctx.arc(nd.cx-offset,nd.cy,r,0,TWO_PI); ctx.fill(); ctx.beginPath(); ctx.arc(nd.cx+offset,nd.cy,r,0,TWO_PI); ctx.fill();
        if (isHovered) {
          ctx.strokeStyle = 'rgba(0,185,128,0.60)'; ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = 'rgba('+tRGB[0]+','+tRGB[1]+','+tRGB[2]+',0.40)'; ctx.lineWidth = 1.5;
        }
        ctx.beginPath(); ctx.arc(nd.cx-offset,nd.cy,r,0,TWO_PI); ctx.stroke(); ctx.beginPath(); ctx.arc(nd.cx+offset,nd.cy,r,0,TWO_PI); ctx.stroke();
        ctx.fillStyle = 'rgba('+tRGB[0]+','+tRGB[1]+','+tRGB[2]+',0.55)'; ctx.font = '600 '+lsz+'px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(nd.label, nd.cx, nd.cy+nd.hh+5);
        ctx.restore(); continue;
      }

      if (nd.type === 'motor') {
        var mdepth = 2, mEIdx = 0;
        for (var mei=0; mei<eds.length; mei++) { if (eds[mei].to===nd.id) { mdepth=eds[mei].depth; mEIdx=mei; break; } }
        var mh = edgeHealth(mdepth, mEIdx); var mc = healthRGB(clamp(mh - 0.10, 0, 1));
        var hasTemp = !!NODE_TEMPS[nd.id]; var currentTemp = 40;
        // Always use health-based color for motor borders
        var borderCol = mc;
        if (hasTemp) {
          var mtd = NODE_TEMPS[nd.id]; currentTemp = lerp(mtd.before, mtd.after, nodeFix(nd.id));
          drawTempGlow(nd.cx, nd.cy, nd.r, currentTemp);
        }
        var mStress = 1-mh;
        if (mStress > 0.25) { var sPulse = 0.25+Math.sin(t*4.5+nd.id*1.3)*0.15; ctx.save(); ctx.globalAlpha = mStress*sPulse; ctx.shadowBlur = 18; ctx.shadowColor = 'rgba('+mc[0]+','+mc[1]+','+mc[2]+',0.5)'; ctx.fillStyle = 'rgba('+mc[0]+','+mc[1]+','+mc[2]+',0.12)'; ctx.beginPath(); ctx.arc(nd.cx,nd.cy,nd.r+8,0,TWO_PI); ctx.fill(); ctx.restore(); }
        ctx.save(); ctx.fillStyle = 'rgba('+borderCol[0]+','+borderCol[1]+','+borderCol[2]+',0.06)'; ctx.beginPath(); ctx.arc(nd.cx,nd.cy,nd.r,0,TWO_PI); ctx.fill();
        if (isHovered) {
          ctx.strokeStyle = 'rgba(0,185,128,0.60)'; ctx.lineWidth = 2.5;
        } else {
          ctx.strokeStyle = 'rgba('+borderCol[0]+','+borderCol[1]+','+borderCol[2]+',0.55)'; ctx.lineWidth = 1.5;
        }
        ctx.stroke();
        ctx.fillStyle = 'rgba('+borderCol[0]+','+borderCol[1]+','+borderCol[2]+',0.75)';
        ctx.font = '700 '+Math.max(8,nd.r*0.8)+'px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('M', nd.cx, nd.cy+0.5); ctx.restore(); continue;
      }

      // Panel / box
      var bDepth = 2, bEIdx = 0;
      for (var bei=0; bei<eds.length; bei++) { if (eds[bei].to===nd.id) { bDepth=eds[bei].depth; bEIdx=bei; break; } }
      var bh2 = edgeHealth(bDepth, bEIdx); var bc = healthRGB(bh2);
      var bHasTemp = !!NODE_TEMPS[nd.id]; var bCurrentTemp = 40;
      // Always use health-based color for box borders/labels
      var bBorderCol = bc;
      if (bHasTemp) {
        var btd = NODE_TEMPS[nd.id]; bCurrentTemp = lerp(btd.before, btd.after, nodeFix(nd.id));
        drawTempGlow(nd.cx, nd.cy, Math.max(nd.hw,nd.hh), bCurrentTemp);
      }
      var bStress = 1-bh2;
      if (bStress > 0.25) { var bPulse = 0.20+Math.sin(t*3.5+nd.id*1.7)*0.12; ctx.save(); ctx.globalAlpha = bStress*bPulse; ctx.shadowBlur = 16; ctx.shadowColor = 'rgba('+bc[0]+','+bc[1]+','+bc[2]+',0.5)'; ctx.fillStyle = 'rgba('+bc[0]+','+bc[1]+','+bc[2]+',0.08)'; ctx.beginPath(); ctx.arc(nd.cx,nd.cy,Math.max(nd.hw,nd.hh)+6,0,TWO_PI); ctx.fill(); ctx.restore(); }
      ctx.save(); ctx.fillStyle = 'rgba('+bBorderCol[0]+','+bBorderCol[1]+','+bBorderCol[2]+',0.06)';
      if (isHovered) {
        ctx.strokeStyle = 'rgba(0,185,128,0.50)'; ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = 'rgba('+bBorderCol[0]+','+bBorderCol[1]+','+bBorderCol[2]+',0.30)'; ctx.lineWidth = 1.2;
      }
      rrect(nd.cx-nd.hw, nd.cy-nd.hh, nd.hw*2, nd.hh*2, 3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba('+bBorderCol[0]+','+bBorderCol[1]+','+bBorderCol[2]+',0.65)';
      ctx.font = '600 '+lsz+'px Inter, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var bl = nd.label.split('\n');
      if (bl.length > 1) { for (var bli=0; bli<bl.length; bli++) ctx.fillText(bl[bli], nd.cx, nd.cy+(bli-(bl.length-1)/2)*(lsz+1)); }
      else ctx.fillText(nd.label, nd.cx, nd.cy);
      ctx.restore();
    }

    // Scopes
    var showScopes = cam.zoom < 1.3 || (currentStep >= 0 && STEPS[currentStep] && STEPS[currentStep].showPF);
    if (W > 420 && showScopes) {
      for (var sci = 0; sci < scopeNds.length; sci++) {
        if (scopeNds[sci].type === 'pf') drawPFDisplay(scopeNds[sci]);
        else drawScopeDisplay(scopeNds[sci]);
      }
    }

    // Temperature labels
    var showTemps = (currentStep >= 0 && STEPS[currentStep].showTemps && stepFade > 0.01) || (viewMode === 'slider');
    if (showTemps) {
      var tempAlpha = currentStep >= 0 ? stepFade : 1;
      for (var tni in NODE_TEMPS) {
        if (NODE_TEMPS.hasOwnProperty(tni)) {
          var tnd = nds[tni], tdata = NODE_TEMPS[tni];
          var displayTemp = lerp(tdata.before, tdata.after, nodeFix(parseInt(tni)));
          drawTempLabel(tnd, displayTemp, tempAlpha);
        }
      }
    }

    // HQ units — drawn in parallel (offset from wire with connecting stubs)
    for (var hi = 0; hi < HQ_UNITS.length; hi++) {
      var hq = HQ_UNITS[hi]; var prog = tp(hq.phase);
      if (prog <= 0) continue;
      var he = eds[hq.edge];
      var posParam = hq.pos || 0.5;
      var anchor = edgePos(he, posParam);

      // Compute tangent direction along edge
      var pt2 = edgePos(he, clamp(posParam + 0.05, 0, 0.99));
      var tdx = pt2.x - anchor.x, tdy = pt2.y - anchor.y;
      var tlen = Math.sqrt(tdx*tdx + tdy*tdy) || 1;

      // Perpendicular normal — screen-left or screen-right of travel direction
      var nx, ny;
      if (hq.side === 'left') { nx = -tdy / tlen; ny = tdx / tlen; }
      else { nx = tdy / tlen; ny = -tdx / tlen; }

      var dr = Math.min(11, Math.max(7, W*0.011));
      var stubLen = dr + 10;
      var devX = anchor.x + nx * stubLen;
      var devY = anchor.y + ny * stubLen;
      var ua = clamp(prog*2.5, 0, 1);

      ctx.save(); ctx.globalAlpha = ua;

      // Stub line from wire to device
      ctx.strokeStyle = 'rgba(0,168,128,0.55)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(anchor.x, anchor.y); ctx.lineTo(devX, devY); ctx.stroke();

      // Junction dot on the wire
      ctx.fillStyle = '#00A880'; ctx.beginPath(); ctx.arc(anchor.x, anchor.y, 2.5, 0, TWO_PI); ctx.fill();

      // Device circle
      ctx.shadowBlur = 16; ctx.shadowColor = 'rgba(0,168,128,0.65)'; ctx.fillStyle = '#00A880';
      ctx.beginPath(); ctx.arc(devX, devY, dr, 0, TWO_PI); ctx.fill(); ctx.shadowBlur = 0;

      // Number inside circle
      ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.font = '700 '+Math.max(8,dr*0.85)+'px Inter, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(hq.num, devX, devY+0.5);

      // Label text — on the far side of device from wire
      if (prog >= 0.4) {
        var la = clamp((prog-0.4)*3, 0, 1); ctx.globalAlpha = ua*la;
        var hlsz = Math.max(7, lsz*0.80);
        var labelX = devX + nx * (dr + 4);
        ctx.textAlign = nx > 0.3 ? 'left' : (nx < -0.3 ? 'right' : 'left');
        ctx.fillStyle = 'rgba(0,168,128,0.90)'; ctx.font = '700 '+hlsz+'px Inter, sans-serif';
        ctx.fillText(hq.line1, labelX, devY-3);
        if (hq.line2) { ctx.fillStyle = 'rgba(0,168,128,0.70)'; ctx.font = '700 '+hlsz+'px Inter, sans-serif'; ctx.fillText(hq.line2, labelX, devY+hlsz-2); }
      }

      // Pulsing ring
      if (prog >= 0.99) {
        var pr = dr+4+Math.sin(t*2.5+hi*1.5)*3; ctx.globalAlpha = 0.35+Math.sin(t*3+hi)*0.15;
        ctx.strokeStyle = '#00A880'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(devX,devY,pr,0,TWO_PI); ctx.stroke();
      }
      ctx.restore();
    }

    // Heat particles (render only)
    if (showHeat !== false) {
      for (var hpi = 0; hpi < heatP.length; hpi++) {
        var hpp = heatP[hpi];
        ctx.save(); ctx.globalAlpha = hpp.a*0.6; ctx.fillStyle = '#EF4444'; ctx.shadowBlur = 4; ctx.shadowColor = 'rgba(239,68,68,0.4)';
        ctx.beginPath(); ctx.arc(hpp.x,hpp.y,hpp.sz,0,TWO_PI); ctx.fill(); ctx.restore();
      }
      for (var spi = 0; spi < sparkP.length; spi++) {
        var sk = sparkP[spi];
        var skAlpha = sk.life > 0.5 ? 1 : sk.life*2;
        ctx.save(); ctx.globalAlpha = skAlpha*(0.7+Math.random()*0.3); ctx.fillStyle = '#FEF3C7'; ctx.shadowBlur = 12; ctx.shadowColor = '#FCD34D';
        ctx.beginPath(); ctx.arc(sk.x,sk.y,sk.sz*sk.life,0,TWO_PI); ctx.fill();
        ctx.globalAlpha = skAlpha*0.3; ctx.fillStyle = '#F59E0B'; ctx.shadowBlur = 20;
        ctx.beginPath(); ctx.arc(sk.x,sk.y,sk.sz*2.5*sk.life,0,TWO_PI); ctx.fill(); ctx.restore();
      }
    }

    // Flow particles (render only — color from current morph)
    renderFlowParticles();

    ctx.restore(); // end camera transform
  }

  // ═══════════════════════════════════════════════════════
  // ── MAIN DRAW LOOP ──
  // ═══════════════════════════════════════════════════════
  function draw() {
    // ── State updates (once per frame) ──
    var camLerp = 0.06;
    cam.cx += (targetCam.cx - cam.cx) * camLerp;
    cam.cy += (targetCam.cy - cam.cy) * camLerp;
    cam.zoom += (targetCam.z - cam.zoom) * camLerp;

    var curStep = currentStep >= 0 && STEPS[currentStep] ? STEPS[currentStep] : null;
    var isPFStep = curStep && curStep.showPF;
    var isWaitZoom = curStep && curStep.waitForZoom;
    var zoomSettled = Math.abs(cam.zoom - targetCam.z) < 0.08;
    var spd = targetMorph > morph ? (isPFStep ? 0.0008 : (isWaitZoom ? 0.0012 : 0.0025)) : 0.007;
    // Hold morph until camera has zoomed out
    var morphHeld = isWaitZoom && !zoomSettled;
    if (morphHeld) { /* don't advance morph */ }
    else if (Math.abs(morph - targetMorph) < 0.003) morph = targetMorph;
    else morph += (targetMorph > morph ? spd : -spd);

    if (currentStep >= 0) {
      stepFade = Math.min(1, stepFade + 0.025);
      // Auto-advance timer: start counting once step is fully visible
      if (stepFade >= 1) {
        if (stepTime === 0) stepTime = performance.now();
        else if (performance.now() - stepTime >= STEP_AUTO_MS) advanceStep();
      }
    }
    else stepFade = Math.max(0, stepFade - 0.05);

    // Update particles
    updateFlowParticles();

    // Update heat/spark (move + remove dead + spawn)
    for (var hpi = heatP.length-1; hpi >= 0; hpi--) {
      var hpp = heatP[hpi]; hpp.x += hpp.vx; hpp.y += hpp.vy; hpp.a -= 0.007;
      if (hpp.a <= 0) heatP.splice(hpi, 1);
    }
    for (var spi = sparkP.length-1; spi >= 0; spi--) {
      var sk = sparkP[spi]; sk.life -= 0.04;
      if (sk.life <= 0) sparkP.splice(spi, 1);
    }
    // Spawn heat/spark
    if (cam.zoom < 1.3) {
      for (var ei = 0; ei < eds.length; ei++) {
        var e = eds[ei], eh = edgeHealth(e.depth, e.idx);
        if (eh < 0.55 && Math.random() < (1-eh)*0.04 && heatP.length < 30) {
          var hp = edgePos(e, 0.3+Math.random()*0.4);
          heatP.push({ x:hp.x, y:hp.y, vx:(Math.random()-0.5)*0.3, vy:-(0.2+Math.random()*0.4), a:0.4+Math.random()*0.25, sz:0.8+Math.random()*1 });
        }
        if (eh < 0.40 && Math.random() < 0.010 && sparkP.length < 6) {
          var sp = edgePos(e, 0.2+Math.random()*0.6);
          sparkP.push({ x:sp.x, y:sp.y, life:1.0, sz:2+Math.random()*2 });
        }
      }
    }

    // Hover
    updateHover();

    // Cursor
    if (currentStep >= 0) canvas.style.cursor = 'pointer';
    else if (sliderDragging) canvas.style.cursor = 'ns-resize';
    else if (viewMode === 'slider' && Math.abs(mouseY - sliderY) < 20) canvas.style.cursor = 'ns-resize';
    else if (hoveredNode >= 0 || hoveredEdge >= 0) canvas.style.cursor = 'pointer';
    else canvas.style.cursor = '';

    var t1v = tp(0), t2v = tp(1), t3v = tp(2);
    var avgFix = (t1v + t2v + t3v + tp(3) + tp(4) + tp(5)) / 6;

    // ── Background ──
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#080A0F'; ctx.fillRect(0, 0, W, H);

    // ── Slider intro animation ──
    if (viewMode === 'slider' && sliderIntro) {
      sliderIntroProgress += sliderIntro === 'scan-down' ? SLIDER_SCAN_SPEED : SLIDER_RETURN_SPEED;
      var eased = sliderIntroProgress < 1 ? (1 - Math.pow(1 - sliderIntroProgress, 2)) : 1;
      if (sliderIntro === 'scan-down') {
        sliderY = lerp(20, H * 0.78, eased);
        if (sliderIntroProgress >= 1) { sliderIntro = 'return'; sliderIntroProgress = 0; }
      } else {
        sliderY = lerp(H * 0.78, H * 0.43, eased);
        if (sliderIntroProgress >= 1) { sliderIntro = null; sliderY = H * 0.43; }
      }
    }

    // ── Render scene ──
    if (viewMode === 'slider') {
      var savedMorph = morph;

      // Top pass: WITH HARMONIQ (morph = 1)
      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, W, sliderY); ctx.clip();
      morph = 1;
      renderScene(false);
      morph = savedMorph;
      ctx.restore();

      // Bottom pass: WITHOUT (morph = 0)
      ctx.save();
      ctx.beginPath(); ctx.rect(0, sliderY, W, H - sliderY); ctx.clip();
      morph = 0;
      renderScene(true);
      morph = savedMorph;
      ctx.restore();

      // Slider UI
      drawSliderUI();

      // Metrics — max out once slider passes bottom of diagram
      var diagramBottom = H * 0.66;
      var sm = clamp(sliderY / diagramBottom, 0, 1);
      drawMetrics(sm, sm, sm);
    } else {
      // Single-pass
      renderScene();

      // Screen-space overlays
      if (currentStep >= 0 && currentStep < STEPS.length) {
        var heroId = STEPS[currentStep].heroNode;
        if (heroId >= 0 && cam.zoom > 1.5) {
          var heroAlpha = stepFade * clamp((cam.zoom - 1.5) / 0.5, 0, 1);
          var extraDist = heroId === 9 ? 0.85 : undefined;
          var heroEIdx = heroId === 10 ? 11 : (heroId === 9 ? 10 : 0);
          drawHeroWaveform(nds[heroId], 2, heroAlpha, extraDist, heroEIdx);
        }
      }

      drawMetrics(t1v, t3v, avgFix);

      if (currentStep >= 0) {
        drawCaptionText(STEPS[currentStep].caption, stepFade, currentStep, STEPS.length);
      }
    }

    // Tooltip (both modes)
    drawTooltip();

    t += 0.02;
    rafId = requestAnimationFrame(draw);
  }

  // ── Toggle button ──
  var toggleBtn = document.getElementById('pqToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      if (currentStep >= 0) return;
      if (viewMode === 'slider') {
        // Switch back to walkthrough
        viewMode = 'walkthrough';
        sliderIntro = null;
        morph = 0; targetMorph = 0;
        targetCam = { cx: W*0.5, cy: H*0.50, z: 1 };
        toggleBtn.classList.remove('active');
        toggleBtn.innerHTML = '<span class="pq-toggle-icon">&#9654;</span> See What HarmoniQ Does';
        var cmpBtn = document.getElementById('pqCompare');
        if (cmpBtn) cmpBtn.classList.remove('active');
        return;
      }
      if (morph < 0.5) {
        goToStep(0);
        toggleBtn.classList.add('active');
        toggleBtn.innerHTML = '<span class="pq-toggle-icon">&#9654;</span> Walking through\u2026';
      } else {
        currentStep = -1; stepFade = 0; captionBounds = null;
        targetMorph = 0;
        targetCam = { cx: W*0.5, cy: H*0.50, z: 1 };
        toggleBtn.classList.remove('active');
        toggleBtn.innerHTML = '<span class="pq-toggle-icon">&#9654;</span> See What HarmoniQ Does';
      }
    });
  }

  // ── Compare button ──
  var compareBtn = document.getElementById('pqCompare');
  if (compareBtn) {
    compareBtn.addEventListener('click', function() {
      if (currentStep >= 0) return;
      if (viewMode === 'slider') {
        viewMode = 'walkthrough';
        sliderIntro = null;
        compareBtn.classList.remove('active');
        if (toggleBtn) { toggleBtn.classList.remove('active'); toggleBtn.innerHTML = '<span class="pq-toggle-icon">&#9654;</span> See What HarmoniQ Does'; }
        morph = 0; targetMorph = 0;
      } else {
        viewMode = 'slider';
        compareBtn.classList.add('active');
        currentStep = -1; stepFade = 0; captionBounds = null;
        targetCam = { cx: W*0.5, cy: H*0.50, z: 1 };
        sliderY = 20; sliderHasDragged = false;
        sliderIntro = 'scan-down'; sliderIntroProgress = 0;
        if (toggleBtn) { toggleBtn.classList.remove('active'); toggleBtn.innerHTML = '<span class="pq-toggle-icon">&#9654;</span> See What HarmoniQ Does'; }
      }
    });
  }

  // ── Canvas click ──
  canvas.addEventListener('click', function(ev) {
    if (viewMode === 'slider') return;
    if (currentStep < 0 || stepFade < 0.5) return;
    var rect = canvas.getBoundingClientRect();
    var cx = (ev.clientX - rect.left) * W / rect.width;
    var cy = (ev.clientY - rect.top) * H / rect.height;
    // Check left arrow
    if (arrowLeftBounds && currentStep > 0 &&
        cx >= arrowLeftBounds.x && cx <= arrowLeftBounds.x + arrowLeftBounds.w &&
        cy >= arrowLeftBounds.y && cy <= arrowLeftBounds.y + arrowLeftBounds.h) {
      goToStep(currentStep - 1); return;
    }
    // Check right arrow or anywhere else to advance
    advanceStep();
  });

  // ── Mouse tracking ──
  canvas.addEventListener('mousemove', function(ev) {
    var rect = canvas.getBoundingClientRect();
    mouseX = (ev.clientX - rect.left) * W / rect.width;
    mouseY = (ev.clientY - rect.top) * H / rect.height;

    if (sliderDragging) {
      sliderY = clamp(mouseY, 30, H * 0.74);
    }
  });
  canvas.addEventListener('mouseleave', function() {
    mouseX = -1; mouseY = -1;
    hoveredNode = -1; hoveredEdge = -1;
    if (sliderDragging) sliderDragging = false;
  });
  canvas.addEventListener('mousedown', function(ev) {
    if (viewMode !== 'slider') return;
    var rect = canvas.getBoundingClientRect();
    var my = (ev.clientY - rect.top) * H / rect.height;
    if (Math.abs(my - sliderY) < 20 && !sliderIntro) {
      sliderDragging = true; sliderHasDragged = true;
      ev.preventDefault();
    }
  });
  canvas.addEventListener('mouseup', function() { sliderDragging = false; });

  // Touch support for slider
  canvas.addEventListener('touchstart', function(ev) {
    if (viewMode !== 'slider') return;
    var rect = canvas.getBoundingClientRect();
    var touch = ev.touches[0];
    var my = (touch.clientY - rect.top) * H / rect.height;
    if (Math.abs(my - sliderY) < 30 && !sliderIntro) {
      sliderDragging = true; sliderHasDragged = true;
      ev.preventDefault();
    }
  }, { passive: false });
  canvas.addEventListener('touchmove', function(ev) {
    if (!sliderDragging) return;
    var rect = canvas.getBoundingClientRect();
    var touch = ev.touches[0];
    mouseX = (touch.clientX - rect.left) * W / rect.width;
    mouseY = (touch.clientY - rect.top) * H / rect.height;
    sliderY = clamp(mouseY, 30, H * 0.74);
    ev.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend', function() { sliderDragging = false; });

  // ── Observer ──
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { if (!rafId) draw(); }
      else { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
    });
  }, { threshold: 0.05 });

  resize();
  observer.observe(canvas.closest('.pq-scope'));
  window.addEventListener('resize', function() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    resize();
    if (canvas.closest('.pq-scope').getBoundingClientRect().top < window.innerHeight) draw();
  });
})();


// ── Interactive Bill ──────────────────────────────────────────
(function () {
  const card = document.getElementById('ibillCard');
  if (!card) return;

  const btnBefore = document.getElementById('ibillBefore');
  const btnAfter = document.getElementById('ibillAfter');
  const explainPanel = document.getElementById('ibillExplain');
  const explainName = document.getElementById('ibillExplainName');
  const explainText = document.getElementById('ibillExplainText');
  const explainTag = document.getElementById('ibillExplainTag');
  const explainClose = document.getElementById('ibillExplainClose');
  const totalEl = document.getElementById('ibillTotal');
  const savingsEl = document.getElementById('ibillSavingsVal');
  const lines = card.querySelectorAll('.ibill-line[data-before]');

  let isAfter = false;

  function fmt(n) {
    return '$' + n.toLocaleString('en-US');
  }

  function animateValue(el, from, to, duration) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const cur = Math.round(from + (to - from) * ease);
      el.textContent = fmt(cur);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function updateBill(after) {
    isAfter = after;
    let totalBefore = 0, totalAfter = 0;

    lines.forEach(line => {
      const before = parseInt(line.dataset.before);
      const afterVal = parseInt(line.dataset.after);
      const valEl = line.querySelector('.ibill-line-val');
      totalBefore += before;
      totalAfter += afterVal;

      if (after) {
        animateValue(valEl, before, afterVal, 600);
        if (afterVal < before && afterVal > 0) {
          line.classList.add('ibill-line-changed');
          line.classList.remove('ibill-line-zero');
        } else if (afterVal === 0) {
          line.classList.add('ibill-line-zero', 'ibill-line-changed');
        } else {
          line.classList.remove('ibill-line-changed', 'ibill-line-zero');
        }
      } else {
        animateValue(valEl, afterVal, before, 400);
        line.classList.remove('ibill-line-changed', 'ibill-line-zero');
      }
    });

    // Total
    if (after) {
      const saving = totalBefore - totalAfter;
      const pct = Math.round((saving / totalBefore) * 100);
      animateValue(totalEl, totalBefore, totalAfter, 700);
      animateValue(savingsEl, 0, saving, 700);
      setTimeout(() => { savingsEl.textContent = fmt(saving) + ' (' + pct + '%)'; }, 720);
      card.classList.add('ibill-optimised');
    } else {
      animateValue(totalEl, totalAfter, totalBefore, 500);
      card.classList.remove('ibill-optimised');
    }

    // Toggle buttons
    btnBefore.classList.toggle('active', !after);
    btnAfter.classList.toggle('active', after);

    // If the explain panel is open, refresh the tag to reflect the new state
    var activeLine = card.querySelector('.ibill-line-active');
    if (activeLine && explainPanel.classList.contains('open')) {
      var tag = activeLine.dataset.tag || '';
      if (after && tag) {
        explainTag.textContent = 'HarmoniQ impact: ' + tag;
        explainTag.style.display = 'block';
      } else {
        explainTag.textContent = '';
        explainTag.style.display = 'none';
      }
    }
  }

  btnBefore.addEventListener('click', () => updateBill(false));
  btnAfter.addEventListener('click', () => updateBill(true));

  // Click to explain
  card.querySelectorAll('.ibill-actionable').forEach(line => {
    line.addEventListener('click', () => {
      const name = line.querySelector('.ibill-line-name').childNodes[0].textContent.trim();
      const explain = line.dataset.explain;
      const tag = line.dataset.tag || '';

      // Toggle active state
      card.querySelectorAll('.ibill-actionable').forEach(l => l.classList.remove('ibill-line-active'));
      line.classList.add('ibill-line-active');

      explainName.textContent = name;
      explainText.textContent = explain;
      if (isAfter && tag) {
        explainTag.textContent = 'HarmoniQ impact: ' + tag;
        explainTag.style.display = 'block';
      } else {
        explainTag.textContent = '';
        explainTag.style.display = 'none';
      }
      explainPanel.classList.add('open');

      explainPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  explainClose.addEventListener('click', () => {
    explainPanel.classList.remove('open');
    card.querySelectorAll('.ibill-actionable').forEach(l => l.classList.remove('ibill-line-active'));
  });
})();
