(() => {
  const root = document.documentElement;
  const hasGsap = !!window.gsap;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => matchMedia('(min-width: 901px)').matches;
  if (hasGsap) root.classList.add('js');

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Nav: mega menu, mobile menu, hide on scroll ---------- */
  const nav = $('#nav');
  const megaBtn = $('.has-mega');
  const mega = $('#mega');
  let megaT;
  const setMega = (open) => { mega.classList.toggle('is-open', open); megaBtn.setAttribute('aria-expanded', open); };
  let hoverAt = 0;
  megaBtn?.addEventListener('click', () => { if (Date.now() - hoverAt < 600) return; setMega(!mega.classList.contains('is-open')); });
  megaBtn?.addEventListener('mouseenter', () => { clearTimeout(megaT); if (!mega.classList.contains('is-open')) hoverAt = Date.now(); setMega(true); });
  [megaBtn, mega].forEach(el => el?.addEventListener('mouseleave', () => { megaT = setTimeout(() => setMega(false), 220); }));
  mega?.addEventListener('mouseenter', () => clearTimeout(megaT));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMega(false); setMobile(false); } });

  const burger = $('.burger');
  const mm = $('#mobileMenu');
  const setMobile = (open) => { mm.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open); mm.setAttribute('aria-hidden', !open); document.body.style.overflow = open ? 'hidden' : ''; };
  burger?.addEventListener('click', () => setMobile(!mm.classList.contains('is-open')));
  $$('a', mm).forEach(a => a.addEventListener('click', () => setMobile(false)));

  let lastY = 0;
  const onScroll = (y) => {
    const down = y > lastY && y > 400;
    if (!mega.classList.contains('is-open') && !mm.classList.contains('is-open')) nav.classList.toggle('is-hidden', down && !document.body.classList.contains('page-home-hero'));
    lastY = y;
  };

  /* ---------- Forms (pitch: client-side confirmation) ---------- */
  $$('form.form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('input[required]', f).forEach(i => { const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)); i.closest('.field').classList.toggle('is-err', bad); if (bad) ok = false; });
    if (!ok) return;
    $('.form-ok', f).hidden = false; f.querySelector('button[type=submit]').disabled = true;
  }));

  /* ---------- Product filters ---------- */
  $$('.filter').forEach(b => b.addEventListener('click', () => {
    $$('.filter').forEach(x => x.classList.toggle('is-on', x === b));
    $$('.grid .pcard').forEach(c => c.classList.toggle('is-hidden', b.dataset.f !== 'all' && c.dataset.type !== b.dataset.f));
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }));

  /* ---------- Rail: buttons + drag ---------- */
  $$('[data-rail]').forEach(rail => {
    $$('.rail-btn').forEach(b => b.addEventListener('click', () => rail.scrollBy({ left: +b.dataset.dir * rail.clientWidth * .6, behavior: 'smooth' })));
    let down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; });
    window.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; rail.classList.add('is-drag'); } rail.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', () => { down = false; rail.classList.remove('is-drag'); });
    rail.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  });

  /* ---------- Services: cursor-follow product image ---------- */
  const float = $('.svc-float');
  if (float && hasGsap) {
    const img = $('img', float);
    const xTo = gsap.quickTo(float, 'x', { duration: .6, ease: 'power3' });
    const yTo = gsap.quickTo(float, 'y', { duration: .6, ease: 'power3' });
    $$('.svc').forEach(s => {
      s.addEventListener('mouseenter', () => { if (!isDesktop()) return; img.src = s.dataset.img; gsap.to(float, { opacity: 1, scale: 1, duration: .45, ease: 'power3.out' }); });
      s.addEventListener('mouseleave', () => gsap.to(float, { opacity: 0, scale: .6, duration: .35, ease: 'power3.in' }));
      s.addEventListener('mousemove', e => { xTo(e.clientX - float.offsetWidth * .5); yTo(e.clientY - float.offsetHeight * .5); });
    });
  }

  /* ---------- Toggle helper ---------- */
  const flipToggles = (wrap, delay = 0) => $$('.tgl', wrap).forEach((t, i) => setTimeout(() => t.classList.add('is-on'), delay + i * 380));

  /* ---------- Without GSAP: show everything ---------- */
  const finishLoader = () => root.classList.add('loaded');
  if (!hasGsap) { finishLoader(); $$('.toggles').forEach(t => flipToggles(t)); return; }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smooth scroll ---------- */
  let lenis;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: .1, smoothWheel: true });
    lenis.on('scroll', ({ scroll }) => { ScrollTrigger.update(); onScroll(scroll); });
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"], a[href*=".html#"]').forEach(a => a.addEventListener('click', e => {
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const t = document.querySelector(url.hash); if (!t) return;
      e.preventDefault(); lenis.scrollTo(t, { offset: -40 });
    }));
  } else {
    addEventListener('scroll', () => onScroll(scrollY), { passive: true });
  }

  /* ---------- Split headings into words ---------- */
  $$('.split').forEach(el => {
    const walk = (node) => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part; w.append(inner); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  });

  /* ---------- Loader ---------- */
  const tl = gsap.timeline({ onComplete: finishLoader });
  tl.to('.loader-bar span', { width: '100%', duration: reduce ? 0 : .7, ease: 'power2.inOut' })
    .to('.loader-mark', { scale: .6, opacity: 0, duration: .35, ease: 'power2.in' }, '-=.05')
    .to('.loader', { opacity: 0, duration: .35 }, '<.1');

  /* ---------- Hero: print-head headline + printed sheet ---------- */
  const hero = $('#hero');
  if (hero) {
    const lines = $$('.pl', hero);
    lines.forEach((l, i) => {
      const inner = $('.pl-in', l);
      const at = 1.0 + i * .55;
      tl.set(l, { '--o': 1 }, at);
      tl.fromTo(inner, { clipPath: 'inset(-10% 100% -20% 0)' }, { clipPath: 'inset(-10% 0% -20% 0)', duration: .75, ease: 'power2.inOut' }, at - .15);
      // red print head sweeping across the line
      const head = document.createElement('i'); head.className = 'phead';
      Object.assign(head.style, { position: 'absolute', top: '6%', bottom: '2%', left: '0', width: '.08em', background: 'var(--red)', borderRadius: '2px', opacity: 0 });
      l.append(head);
      tl.fromTo(head, { left: '0%', opacity: 1 }, { left: '100%', duration: .75, ease: 'power2.inOut' }, at - .15).to(head, { opacity: 0, duration: .2 });
    });
    tl.from('.hero-printer', { y: 80, opacity: 0, duration: 1.1, ease: 'power3.out' }, 1.1)
      .from('.hero-foot > *', { y: 30, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out' }, 1.6);

    ScrollTrigger.matchMedia({
      '(min-width: 901px)': () => {
        const st = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: .6, invalidateOnRefresh: true } });
        const pr = $('.hero-printer'), sticky = $('.hero-sticky');
        const trayX = () => { const r = pr.getBoundingClientRect(), s = sticky.getBoundingClientRect(); return r.left + r.width * .5 - (s.left + s.width * .5); };
        const trayY = () => { const r = pr.getBoundingClientRect(), s = sticky.getBoundingClientRect(); return r.top + r.height * .78 - (s.top + s.height * .5); };
        st.fromTo('.sheet', { scale: 0, yPercent: -50, xPercent: -50, x: trayX, y: trayY, rotate: -4 }, { scale: 1, x: 0, y: 0, rotate: 0, ease: 'power2.inOut', duration: 1 }, .15)
          .to('.hero-printer', { scale: .7, y: -40, opacity: .0, ease: 'power2.inOut', duration: .8 }, .2)
          .to('.hero-title', { y: -60, opacity: 0, ease: 'power2.in', duration: .6 }, .2)
          .to('.hero-foot', { y: 40, opacity: 0, ease: 'power2.in', duration: .5 }, .2)
          .from('.sheet-row > div', { y: 40, opacity: 0, stagger: .08, duration: .4 }, .85)
          .to({}, { duration: .4 });
      },
    });
  }

  /* ---------- Generic reveals ---------- */
  $$('.split').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.from($$('.w > span', el), { yPercent: 110, duration: 1, ease: 'power4.out', stagger: .04, scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  $$('.lead, .chips, .svc, .pcard, .stats-copy, .inc, .advice-steps > div, .steps-list li, .cta-big, .cta-locs > div, .form, .partners-logos > *, .hero-ctas, .rent-right').forEach(el => {
    if (el.closest('.hero') || el.closest('.mega')) return;
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  /* ---------- Toggles flip on when seen ---------- */
  $$('.toggles').forEach(t => ScrollTrigger.create({ trigger: t, start: 'top 80%', once: true, onEnter: () => flipToggles(t, 200) }));

  /* ---------- Counters + 24h ring ---------- */
  $$('.count').forEach(c => {
    const to = +c.dataset.to; const o = { v: 0 };
    ScrollTrigger.create({ trigger: c, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: () => { c.textContent = Math.round(o.v); } }) });
  });
  $$('.ring-fg').forEach(r => gsap.to(r, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: r.closest('.s24-ring'), start: 'top 80%' } }));

  /* ---------- Parallax ---------- */
  $$('.catalog-img img').forEach(img => gsap.fromTo(img, { yPercent: -18 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('.rent-device img, .sub-hero-img img').forEach(img => gsap.fromTo(img, { y: 30 }, { y: -30, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }));
  const fw = $('.footer-word');
  if (fw) gsap.from(fw, { yPercent: 40, opacity: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: fw, start: 'top 95%' } });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
