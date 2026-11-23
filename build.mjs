// Composes the Superink pitch site from shared partials. Run: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'site');

const PHONE = '0590 95 484';
const TEL = 'tel:+38659095484';
const MAIL = 'info@superink.si';

const products = [
  { img: 'hpf0v64c.png', name: 'HP OfficeJet Pro 9010e', cat: 'Večfunkcijska naprava', type: 'mfp', url: 'https://www.nolit.si/19947-hp-multifunction-hp-officejet-pro-9010e?search=9010e' },
  { img: 'hpw1a79a.png', name: 'HP Color LaserJet Pro MFP M479fdn', cat: 'Barvna večfunkcijska', type: 'mfp', url: 'https://www.nolit.si/21708-hp-multifunction-laser-jet-pro-mfp-m479fdn-w1a79a-b19?search=m479fdn' },
  { img: 'hp2z605e.png', name: 'HP LaserJet Pro 4002dne', cat: 'Laserski tiskalnik', type: 'laser', url: 'https://www.nolit.si/19590-hp-laser-printer-pro-4002dne-2z605e?search=2z605e' },
  { img: 'hp6gw62e.png', name: 'HP LaserJet M209dwe', cat: 'Laserski tiskalnik', type: 'laser', url: 'https://www.nolit.si/19623-hp-laser-printer-m209dwe?search=m209dwe' },
  { img: 'cr768a_2.jpg', name: 'HP OfficeJet 7110 Wide Format', cat: 'Tiskalnik A3', type: 'a3', url: 'https://www.nolit.si/18395-hp-officejet-7110-wide-format-eprinter?search=7110' },
  { img: 'brohl1222we.jpg', name: 'Brother HL-1222WE TonerBenefit', cat: 'Laserski tiskalnik', type: 'laser', url: 'https://www.nolit.si/17716-brother-printer-tonerbenefit-hl-1222we?search=1222we' },
];
const supplies = [
  { img: '30045-2.jpg', name: 'Fotokopirni papir Double A Premium', cat: 'A4, 80 g', url: 'https://www.nolit.si/16444-fotokopirni-papir-a4-80g-double-a-premium-1-500?search=fotokopirni%20papir' },
  { img: '49609.jpg', name: 'Papir Xerox Business', cat: 'A4, 80 g', url: 'https://www.nolit.si/16616-papir-xerox-business-a4-80g-500-5-200-003r91820?search=003r91820' },
  { img: '637666.jpg', name: 'Kocka samolepilnih lističev', cat: '75 × 75, neon mix', url: 'https://www.nolit.si/17024-kocka-sam-info-5654-75-75x75-400-4b-mix-neon-60?search=637666' },
  { img: '453611.jpg', name: 'Penac gel roler Inketti', cat: 'Moder', url: 'https://www.nolit.si/16951-penac-gel-roler-ba3601-inketti-moder?search=453611' },
  { img: 'PIBLRTFR7SET.jpg', name: 'Pilot FriXion Ball Clicker', cat: 'Set, 0,7 mm', url: 'https://www.nolit.si/21217-pilot-roler-frixion-ball-clicker-0-7-set?search=PIBLRTFR7SET' },
];

const arrow = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const logo = (cls = '') => `<a href="index.html" class="logo ${cls}" aria-label="Superink, domov"><span class="logo-mark">S</span><span class="logo-word">Superink</span></a>`;

const card = (p, i) => `
<a class="pcard" href="${p.url}" target="_blank" rel="noopener" data-type="${p.type || 'supply'}">
  <div class="pcard-img"><img src="assets/img/${p.img}" alt="${p.name}" loading="lazy"></div>
  <div class="pcard-meta"><span class="pcard-cat">${p.cat}</span><span class="pcard-name">${p.name}</span></div>
  <span class="pcard-go">Na Nolit.si ${arrow}</span>
</a>`;

const header = (active) => `
<div class="topbar"><span>Brezplačna dostava nad 50 €</span><span>Odpremimo isti dan za naročila do 14:00</span><a href="${TEL}">${PHONE}</a></div>
<header class="nav" id="nav">
  ${logo()}
  <nav class="nav-links" aria-label="Glavni meni">
    <button class="nav-link has-mega" aria-expanded="false" aria-controls="mega">Storitve<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button>
    <a class="nav-link ${active === 'prodaja' ? 'is-active' : ''}" href="prodaja.html">Prodaja</a>
    <a class="nav-link ${active === 'najem' ? 'is-active' : ''}" href="najem.html">Najem</a>
    <a class="nav-link ${active === 'servis' ? 'is-active' : ''}" href="servis.html">Servis</a>
    <a class="nav-link" href="index.html#trgovina">Trgovina</a>
    <a class="nav-link ${active === 'kontakt' ? 'is-active' : ''}" href="kontakt.html">Kontakt</a>
  </nav>
  <div class="nav-right">
    <a class="nav-phone" href="${TEL}">${PHONE}</a>
    <a class="btn btn-red btn-sm" href="najem.html#povprasevanje">Povpraševanje</a>
    <button class="burger" aria-label="Odpri meni" aria-expanded="false"><span></span><span></span></button>
  </div>
  <div class="mega" id="mega">
    <div class="mega-inner">
      <a class="mega-card" href="prodaja.html"><div class="mega-img"><img src="assets/img/hpw1a79a.png" alt=""></div><strong>Prodaja tiskalnikov</strong><span>Canon, HP in druge znamke. Strokovno svetovanje pri izbiri.</span></a>
      <a class="mega-card" href="najem.html"><div class="mega-img"><img src="assets/img/hp2z605e.png" alt=""></div><strong>Najem s polno storitvijo</strong><span>Toner, servis in vzdrževanje vključeni.</span></a>
      <a class="mega-card" href="servis.html"><div class="mega-img mega-img-24"><span>24 h</span></div><strong>Servis tiskalnikov</strong><span>Hiter odziv, certificirani tehniki za Canon, HP in ostale.</span></a>
      <div class="mega-list">
        <a href="index.html#trgovina">Tonerji in pisarniški material</a>
        <a href="https://ekatalog.nolit.si/" target="_blank" rel="noopener">Pisarniški katalog 2024</a>
        <a href="https://www.superink.si/index.php?route=product/special" target="_blank" rel="noopener">Akcija</a>
        <a href="https://www.superink.si/index.php?route=account/return/add" target="_blank" rel="noopener">Vračila</a>
        <a href="kontakt.html">Kontakt</a>
      </div>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <a href="prodaja.html">Prodaja</a><a href="najem.html">Najem</a><a href="servis.html">Servis</a><a href="index.html#trgovina">Trgovina</a><a href="kontakt.html">Kontakt</a>
  <div class="mobile-menu-foot"><a href="${TEL}">${PHONE}</a><a href="mailto:${MAIL}">${MAIL}</a></div>
</div>`;

const contactBlock = `
<section class="cta" id="kontakt">
  <h2 class="cta-title split">Pokličite nas.<br><span class="muted">Svetujemo brezplačno.</span></h2>
  <div class="cta-grid">
    <a class="cta-big" href="${TEL}">${PHONE}</a>
    <a class="cta-big cta-mail" href="mailto:${MAIL}">${MAIL}</a>
  </div>
  <div class="cta-locs">
    <div><strong>Superink</strong><span>MBS Vzdrževanje d.o.o.</span><span>Ulica Mire Miheličeve 10B</span><span>1000 Ljubljana</span></div>
    <div><strong>PE Nolit, Nova literatura</strong><span>Peske 10</span><span>1236 Trzin</span></div>
    <div><strong>Pisarniški material</strong><span>Več kot 3000 podjetij že naroča pri nas po prilagojenih cenah.</span><a class="link" href="kontakt.html">Pišite nam ${arrow}</a></div>
  </div>
</section>`;

const footer = `
<footer class="footer">
  <div class="footer-cols">
    <div><p class="footer-lead">Vaša zaupanja vredna rešitev za prodajo, najem in servis tiskalnikov po vsej Sloveniji.</p></div>
    <div><h4>Storitve</h4><a href="prodaja.html">Prodaja tiskalnikov</a><a href="najem.html">Najem tiskalnikov</a><a href="servis.html">Servis</a><a href="https://www.superink.si/index.php?route=product/special" target="_blank" rel="noopener">Akcija</a></div>
    <div><h4>Za stranke</h4><a href="kontakt.html">Kontakt</a><a href="https://www.superink.si/index.php?route=account/return/add" target="_blank" rel="noopener">Vračila</a><a href="https://www.superink.si/index.php?route=information/sitemap" target="_blank" rel="noopener">Mapa strani</a></div>
    <div><h4>Moj račun</h4><a href="https://www.superink.si/index.php?route=account/account" target="_blank" rel="noopener">Moj račun</a><a href="https://www.superink.si/index.php?route=account/order" target="_blank" rel="noopener">Zgodovina naročil</a><a href="https://www.superink.si/index.php?route=account/wishlist" target="_blank" rel="noopener">Seznam želja</a><a href="https://www.superink.si/index.php?route=account/newsletter" target="_blank" rel="noopener">Novice</a></div>
  </div>
  <div class="footer-word" aria-hidden="true">Superink</div>
  <div class="footer-bottom"><span>© 2026 Superink d.o.o. Vse pravice pridržane.</span><span>Ljubljana, Slovenija</span></div>
</footer>`;

const page = ({ file, title, desc, active, body }) => `<!doctype html>
<html lang="sl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex">
<link rel="preload" href="assets/fonts/TT_Neoris_Pro_Trial_Medium.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
<script>
(function () {
  if (!/[?&]r=/.test(location.search)) return;
  var s = document.createElement('script');
  s.async = true;
  s.referrerPolicy = 'no-referrer';
  s.setAttribute('data-landing', location.href);
  s.src = 'https://phplaravel-758037-6569212.cloudwaysapps.com/v/script.js';
  document.head.appendChild(s);
})();
</script>
</head>
<body class="page-${active || 'home'}">
<div class="loader" aria-hidden="true"><div class="loader-mark">S</div><div class="loader-bar"><span></span></div></div>
${header(active)}
<main>
${body}
</main>
${footer}
<script src="assets/js/vendor/gsap.min.js"></script>
<script src="assets/js/vendor/ScrollTrigger.min.js"></script>
<script src="assets/js/vendor/lenis.min.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>`;

const toggles = `
<div class="toggles">
  <div class="tgl"><span>Nižji stroški</span><i class="switch"><b></b></i></div>
  <div class="tgl"><span>Barvno ali črno-belo</span><i class="switch"><b></b></i></div>
  <div class="tgl"><span>Brezskrbno tiskanje</span><i class="switch"><b></b></i></div>
</div>`;

const form = (id, title, fields, button) => `
<form class="form" id="${id}" novalidate>
  <h3 class="form-title">${title}</h3>
  ${fields.map(f => f.type === 'select'
    ? `<label class="field"><span>${f.label}</span><select name="${f.name}">${f.options.map(o => `<option>${o}</option>`).join('')}</select></label>`
    : f.type === 'textarea'
      ? `<label class="field field-wide"><span>${f.label}</span><textarea name="${f.name}" rows="4" placeholder="${f.ph || ''}"></textarea></label>`
      : `<label class="field"><span>${f.label}</span><input name="${f.name}" type="${f.type || 'text'}" ${f.req ? 'required' : ''} placeholder="${f.ph || ''}"></label>`).join('')}
  <button class="btn btn-red btn-lg" type="submit">${button} ${arrow}</button>
  <p class="form-ok" hidden>Hvala. Kmalu se vam oglasimo.</p>
</form>`;

// ---------------- HOME ----------------
const home = `
<section class="hero" id="hero">
  <div class="hero-sticky">
    <h1 class="hero-title">
      <span class="pl"><span class="pl-in">Prodaja, najem</span></span>
      <span class="pl"><span class="pl-in">in servis <span class="red">tiskalnikov</span></span></span>
    </h1>
    <div class="hero-stage">
      <img class="hero-printer" src="assets/img/hp6gw62e.png" alt="HP LaserJet M209dwe">
    </div>
      <div class="sheet" aria-hidden="true">
      <div class="sheet-inner">
        <p class="sheet-big">Originalni tonerji, najem s polno storitvijo in hiter servis po vsej Sloveniji.</p>
        <div class="sheet-row">
          <div><strong>50 €</strong><span>Brezplačna dostava nad</span></div>
          <div><strong>24 h</strong><span>Odziv servisa na domu</span></div>
          <div><strong>14:00</strong><span>Odprema isti dan do</span></div>
          <div><strong>3000+</strong><span>Podjetij nam zaupa</span></div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <p>Profesionalne rešitve za vaše pisarniške potrebe. Canon in HP partner.</p>
      <div class="hero-ctas"><a class="btn btn-dark btn-lg" href="prodaja.html">Oglejte si ponudbo ${arrow}</a><a class="btn btn-ghost btn-lg" href="najem.html#povprasevanje">Povpraševanje za najem</a></div>
    </div>
  </div>
</section>

<section class="services" id="storitve">
  <h2 class="h2 split">Vse za vaše tiskalnike.<br><span class="muted">En partner, od nakupa do servisa.</span></h2>
  <div class="svc-list">
    <a class="svc" href="prodaja.html" data-img="assets/img/hpw1a79a.png">
      <span class="svc-title">Prodaja</span>
      <span class="svc-text">Canon, HP in druge znamke. Strokovno svetovanje pri izbiri.</span>
      <span class="svc-go">${arrow}</span>
      <img class="svc-img-m" src="assets/img/hpw1a79a.png" alt="">
    </a>
    <a class="svc" href="najem.html" data-img="assets/img/hp2z605e.png">
      <span class="svc-title">Najem</span>
      <span class="svc-text">Mesečni najem s polno storitvijo. Toner, servis in vzdrževanje vključeni.</span>
      <span class="svc-go">${arrow}</span>
      <img class="svc-img-m" src="assets/img/hp2z605e.png" alt="">
    </a>
    <a class="svc" href="servis.html" data-img="assets/img/hpf0v64c.png">
      <span class="svc-title">Servis</span>
      <span class="svc-text">Hiter odziv, certificirani tehniki za Canon, HP in ostale.</span>
      <span class="svc-go">${arrow}</span>
      <img class="svc-img-m" src="assets/img/hpf0v64c.png" alt="">
    </a>
  </div>
  <div class="svc-float" aria-hidden="true"><img src="assets/img/hpw1a79a.png" alt=""></div>
</section>

<section class="rent" id="najem">
  <div class="rent-left">
    <h2 class="h2 split">Najem s polno storitvijo.</h2>
    <p class="lead">Brez skrbi za tiskalnike. Plačujete mesečno, za toner, servis in vzdrževanje poskrbimo mi.</p>
    <ul class="chips"><li>Toner</li><li>Servis</li><li>Vzdrževanje</li><li>Barvno ali črno-belo</li></ul>
    <a class="btn btn-red btn-lg" href="najem.html#povprasevanje">Povpraševanje za najem ${arrow}</a>
  </div>
  <div class="rent-right">
    <div class="rent-device"><img src="assets/img/hp2z605e.png" alt="HP LaserJet Pro 4002dne"></div>
    ${toggles}
  </div>
</section>

<section class="service24">
  <div class="s24-ring">
    <svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" class="ring-bg"/><circle cx="100" cy="100" r="92" class="ring-fg"/></svg>
    <div class="s24-num"><span class="count" data-to="24">24</span><small>h</small></div>
  </div>
  <div class="s24-copy">
    <h2 class="h2 split">Servis na domu.<br><span class="muted">Odziv v 24 urah.</span></h2>
    <p class="lead">Certificirani tehniki za Canon, HP in ostale znamke pridejo k vam, po vsej Sloveniji.</p>
    <a class="btn btn-dark btn-lg" href="servis.html#narocilo">Naročite servis ${arrow}</a>
  </div>
</section>

<section class="shop" id="trgovina">
  <div class="shop-head">
    <h2 class="h2 split">Novosti in akcije.</h2>
    <div class="rail-ctrl"><button class="rail-btn" data-dir="-1" aria-label="Nazaj">${arrow}</button><button class="rail-btn" data-dir="1" aria-label="Naprej">${arrow}</button></div>
  </div>
  <div class="rail" data-rail>${[...products, ...supplies].map(card).join('')}</div>
</section>

<section class="partners">
  <p class="partners-lead">Canon partner. HP partner.</p>
  <div class="partners-logos">
    <span class="plogo plogo-canon">Canon</span>
    <span class="plogo plogo-hp"><svg viewBox="0 0 100 100" aria-label="HP"><circle cx="50" cy="50" r="48" fill="currentColor"/><text x="50" y="66" text-anchor="middle" font-size="46" font-weight="700" fill="#F4F3F1" font-family="Helvetica, Arial">hp</text></svg></span>
  </div>
</section>

<section class="stats">
  <div class="stats-num"><span class="count" data-to="3000">3000</span>+</div>
  <div class="stats-copy">
    <p>Pridružite se več kot 3000 podjetjem, ki že uporabljajo naše storitve, in izkoristite prilagojene cene.</p>
    <a class="btn btn-red btn-lg" href="kontakt.html">Pišite nam ${arrow}</a>
  </div>
</section>

<section class="catalog">
  <div class="catalog-img"><img src="assets/img/katalog-strip.jpg" alt="Pisarniški material"></div>
  <div class="catalog-copy">
    <h2 class="h2 split">Pisarniški katalog 2024.</h2>
    <p class="lead">Papir, pisala, mape in vse, kar pisarna porabi. Pregledno na enem mestu.</p>
    <div class="hero-ctas"><a class="btn btn-dark btn-lg" href="https://ekatalog.nolit.si/" target="_blank" rel="noopener">Odpri e-katalog ${arrow}</a><a class="btn btn-ghost btn-lg" href="https://katalogi.nolit.si/pisarniski-material/" target="_blank" rel="noopener">Aktualni pisarniški izdelki</a></div>
  </div>
</section>
${contactBlock}`;

// ---------------- PRODAJA ----------------
const prodaja = `
<section class="sub-hero">
  <h1 class="sub-title split">Prodaja tiskalnikov.</h1>
  <p class="lead sub-lead">Canon, HP in druge znamke. Pomagamo izbrati napravo, ki ustreza vašemu obsegu tiskanja, naročila do 14:00 pa odpremimo isti dan.</p>
  <div class="sub-hero-img"><img src="assets/img/hpw1a79a.png" alt="HP Color LaserJet Pro MFP M479fdn"></div>
</section>
<section class="shop shop-grid-wrap">
  <div class="shop-head">
    <h2 class="h2">Izbrane naprave.</h2>
    <div class="filters" role="tablist">
      <button class="filter is-on" data-f="all">Vse</button>
      <button class="filter" data-f="laser">Laserski</button>
      <button class="filter" data-f="mfp">Večfunkcijski</button>
      <button class="filter" data-f="a3">A3</button>
    </div>
  </div>
  <div class="grid">${products.map(card).join('')}</div>
</section>
<section class="advice">
  <h2 class="h2 split">Ne veste, kateri tiskalnik izbrati?<br><span class="muted">Povejte nam, koliko tiskate.</span></h2>
  <div class="advice-steps">
    <div><strong>Obseg</strong><span>Koliko strani mesečno, barvno ali črno-belo.</span></div>
    <div><strong>Funkcije</strong><span>Skeniranje, kopiranje, faks, format A3, omrežje.</span></div>
    <div><strong>Strošek</strong><span>Primerjamo nakup in najem, da veste, kaj se splača.</span></div>
  </div>
  <a class="btn btn-red btn-lg" href="kontakt.html">Pišite nam ${arrow}</a>
</section>
${contactBlock}`;

// ---------------- NAJEM ----------------
const najem = `
<section class="sub-hero sub-hero-rent">
  <h1 class="sub-title split">Najem tiskalnika.</h1>
  <p class="lead sub-lead">Mesečni najem s polno storitvijo. Toner, servis in vzdrževanje so vključeni, vi samo tiskate.</p>
  <div class="rent-right rent-right-hero">
    <div class="rent-device"><img src="assets/img/hp2z605e.png" alt="HP LaserJet Pro 4002dne"></div>
    ${toggles}
  </div>
</section>
<section class="included">
  <h2 class="h2 split">Kaj je vključeno.</h2>
  <div class="inc-grid">
    <div class="inc"><strong>Originalni tonerji</strong><span>Vključeni v mesečni najem.</span></div>
    <div class="inc"><strong>Servis in popravila</strong><span>Servis na domu z odzivom v 24 urah.</span></div>
    <div class="inc"><strong>Redno vzdrževanje</strong><span>Naprava ostane v brezhibnem stanju.</span></div>
    <div class="inc"><strong>Barvno ali črno-belo</strong><span>Izberete napravo po svojih potrebah.</span></div>
  </div>
</section>
<section class="steps">
  <h2 class="h2 split">Kako poteka.</h2>
  <ol class="steps-list">
    <li><strong>Povpraševanje</strong><span>Izpolnite obrazec ali nas pokličite.</span></li>
    <li><strong>Ponudba</strong><span>Pripravimo ponudbo glede na vaš obseg tiskanja.</span></li>
    <li><strong>Najem</strong><span>Tiskalnik je vaš za mesečni znesek.</span></li>
    <li><strong>Brezskrbno tiskanje</strong><span>Za vse ostalo poskrbimo mi.</span></li>
  </ol>
</section>
<section class="form-wrap" id="povprasevanje">
  <div class="form-side"><h2 class="h2 split">Povpraševanje za najem.</h2><p class="lead">Pripravimo ponudbo po vaši meri.</p><a class="cta-big" href="${TEL}">${PHONE}</a></div>
  ${form('rentForm', 'Vaši podatki', [
    { label: 'Ime in priimek', name: 'ime', req: true },
    { label: 'Podjetje', name: 'podjetje' },
    { label: 'E-naslov', name: 'email', type: 'email', req: true },
    { label: 'Telefon', name: 'tel', type: 'tel' },
    { label: 'Tiskanje', name: 'barva', type: 'select', options: ['Črno-belo', 'Barvno', 'Oboje'] },
    { label: 'Mesečno število strani', name: 'obseg', type: 'select', options: ['Do 1.000', '1.000 do 5.000', '5.000 do 20.000', 'Več kot 20.000'] },
    { label: 'Sporočilo', name: 'msg', type: 'textarea', ph: 'Npr. potrebujemo večfunkcijsko napravo A3 za pisarno s 15 zaposlenimi.' },
  ], 'Pošlji povpraševanje')}
</section>`;

// ---------------- SERVIS ----------------
const servis = `
<section class="sub-hero sub-hero-servis">
  <div class="s24-ring s24-ring-hero">
    <svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" class="ring-bg"/><circle cx="100" cy="100" r="92" class="ring-fg"/></svg>
    <div class="s24-num"><span class="count" data-to="24">24</span><small>h</small></div>
  </div>
  <div>
    <h1 class="sub-title split">Servis tiskalnikov.</h1>
    <p class="lead sub-lead">Servis na domu z odzivom v 24 urah. Certificirani tehniki za Canon, HP in ostale znamke, po vsej Sloveniji.</p>
    <a class="btn btn-red btn-lg" href="#narocilo">Naročite servis ${arrow}</a>
  </div>
</section>
<section class="steps">
  <h2 class="h2 split">Od klica do delujočega tiskalnika.</h2>
  <ol class="steps-list">
    <li><strong>Prijava okvare</strong><span>Pokličite ali izpolnite obrazec spodaj.</span></li>
    <li><strong>Odziv v 24 urah</strong><span>Tehnik vas pokliče in dogovori termin.</span></li>
    <li><strong>Popravilo na domu</strong><span>Tehnik pride k vam.</span></li>
    <li><strong>Tiskalnik dela</strong><span>Spet tiskate brez skrbi.</span></li>
  </ol>
</section>
<section class="brands-band">
  <h2 class="h2 split">Canon, HP in ostale znamke.</h2>
  <div class="partners-logos"><span class="plogo plogo-canon">Canon</span><span class="plogo plogo-text">HP</span><span class="plogo plogo-text">Brother</span><span class="plogo plogo-text plogo-more">in ostale</span></div>
</section>
<section class="form-wrap" id="narocilo">
  <div class="form-side"><h2 class="h2 split">Naročite servis.</h2><p class="lead">Ali pokličite in opišite težavo.</p><a class="cta-big" href="${TEL}">${PHONE}</a></div>
  ${form('serviceForm', 'Prijava okvare', [
    { label: 'Ime in priimek', name: 'ime', req: true },
    { label: 'Podjetje', name: 'podjetje' },
    { label: 'E-naslov', name: 'email', type: 'email', req: true },
    { label: 'Telefon', name: 'tel', type: 'tel', req: true },
    { label: 'Znamka', name: 'znamka', type: 'select', options: ['Canon', 'HP', 'Brother', 'Drugo'] },
    { label: 'Model naprave', name: 'model', ph: 'Npr. HP LaserJet Pro 4002dne' },
    { label: 'Opis težave', name: 'msg', type: 'textarea', ph: 'Kaj se zgodi, katera napaka se izpiše na zaslonu?' },
  ], 'Pošlji prijavo')}
</section>`;

// ---------------- KONTAKT ----------------
const kontakt = `
<section class="sub-hero">
  <h1 class="sub-title split">Kontakt.</h1>
  <p class="lead sub-lead">Pokličite, pišite ali nas obiščite. Svetujemo brezplačno.</p>
</section>
<section class="form-wrap">
  <div class="form-side">
    <a class="cta-big" href="${TEL}">${PHONE}</a>
    <a class="cta-big cta-mail" href="mailto:${MAIL}">${MAIL}</a>
    <div class="cta-locs cta-locs-col">
      <div><strong>Superink</strong><span>MBS Vzdrževanje d.o.o.</span><span>Ulica Mire Miheličeve 10B</span><span>1000 Ljubljana</span></div>
      <div><strong>PE Nolit, Nova literatura</strong><span>Peske 10</span><span>1236 Trzin</span></div>
    </div>
  </div>
  ${form('contactForm', 'Pišite nam', [
    { label: 'Ime', name: 'ime', req: true },
    { label: 'E-naslov', name: 'email', type: 'email', req: true },
    { label: 'Povpraševanje', name: 'msg', type: 'textarea' },
  ], 'Pošlji')}
</section>`;

const pages = [
  { file: 'index.html', title: 'Superink | Prodaja, najem in servis tiskalnikov', desc: 'Prodaja, najem in servis tiskalnikov po vsej Sloveniji. Originalni tonerji, najem s polno storitvijo in servis na domu v 24 urah.', active: '', body: home },
  { file: 'prodaja.html', title: 'Prodaja tiskalnikov | Superink', desc: 'Tiskalniki Canon, HP in Brother s strokovnim svetovanjem.', active: 'prodaja', body: prodaja },
  { file: 'najem.html', title: 'Najem tiskalnika | Superink', desc: 'Mesečni najem tiskalnika s tonerjem, servisom in vzdrževanjem.', active: 'najem', body: najem },
  { file: 'servis.html', title: 'Servis tiskalnikov | Superink', desc: 'Servis tiskalnikov na domu z odzivom v 24 urah.', active: 'servis', body: servis },
  { file: 'kontakt.html', title: 'Kontakt | Superink', desc: 'Kontakt Superink, Ljubljana in Trzin.', active: 'kontakt', body: kontakt },
];

for (const p of pages) fs.writeFileSync(path.join(root, p.file), page(p));
console.log('Built', pages.map(p => p.file).join(', '));
