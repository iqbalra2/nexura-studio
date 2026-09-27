const DEFAULT = {
  brand: "Nexura Studio",
  brandTag: "ডেমো টেমপ্লেট শোকেস",
  demoRibbon: "🎨 ডেমো টেমপ্লেট — Nexura Studio",
  topbar: [],
  nav: [],
  hero: {},
  trustBadges: [],
  farmBanner: { stats: [] },
  categoriesHeading: "",
  categories: [],
  offer: {},
  whyChooseUsHeading: "",
  whyChooseUs: [],
  topPicksHeading: "",
  topPicksNote: "",
  topPicks: [],
  addToCart: "কার্টে যোগ করুন",
  newsletter: {},
  footer: { quickLinks: [], customerService: [], information: [] },
  contact: { whatsapp: "8801000000000", phone: "+8801000000000", messenger: "https://m.me/", meeting: "https://meet.google.com/", email: "hello@example.com" },
  tracking: { gtmId: "", ga4MeasurementId: "", metaPixelId: "", clarityProjectId: "" }
};
let C = { ...DEFAULT };

async function loadContent() {
  try {
    const r = await fetch('content.json', { cache: 'no-store' });
    const remote = await r.json();
    C = {
      ...DEFAULT,
      ...remote,
      hero: { ...DEFAULT.hero, ...remote.hero },
      farmBanner: { ...DEFAULT.farmBanner, ...remote.farmBanner },
      offer: { ...DEFAULT.offer, ...remote.offer },
      newsletter: { ...DEFAULT.newsletter, ...remote.newsletter },
      footer: { ...DEFAULT.footer, ...remote.footer },
      contact: { ...DEFAULT.contact, ...remote.contact },
      tracking: { ...DEFAULT.tracking, ...remote.tracking }
    };
  } catch (e) { console.warn('content.json could not load', e); }
  render();
  installGTM();
}

function esc(x) {
  return String(x ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function render() {
  const h = C.hero || {}, fb = C.farmBanner || {}, of = C.offer || {}, nl = C.newsletter || {}, ft = C.footer || {};
  const cats = C.categories || [], why = C.whyChooseUs || [], picks = C.topPicks || [], badges = C.trustBadges || [];

  document.querySelector('#app').innerHTML = `
  <svg width="0" height="0" style="position:absolute">
    <defs>
      <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
        <path d="M0.5,0.94 C0.5,0.94 0.05,0.62 0.05,0.34 C0.05,0.14 0.21,0.02 0.37,0.02 C0.45,0.02 0.5,0.09 0.5,0.16 C0.5,0.09 0.55,0.02 0.63,0.02 C0.79,0.02 0.95,0.14 0.95,0.34 C0.95,0.62 0.5,0.94 0.5,0.94 Z"></path>
      </clipPath>
    </defs>
  </svg>

  <div class="demo-ribbon">${esc(C.demoRibbon)}</div>

  <div class="topbar"><div class="container">
    ${(C.topbar || []).map(t => `<span>${esc(t)}</span>`).join('')}
  </div></div>

  <div class="nav"><div class="container navin">
    <div class="logo-block">
      <div class="logo-mark">🌿</div>
      <div class="logo-text"><b>${esc(C.brand)}</b><small>${esc(C.brandTag)}</small></div>
    </div>
    <nav class="links">${(C.nav || []).map((x, i) => `<a href="#">${esc(x)}</a>`).join('')}</nav>
    <div class="navicons">
      <span class="icon">🔍</span>
      <span class="icon">👤</span>
      <span class="icon">🛒<span class="cart-count">2</span></span>
    </div>
  </div></div>

  <section class="hero"><div class="container">
    <div class="hero-copy">
      <h1>${esc(h.titleLine1)}<br>${esc(h.titleLine2)}<br><span class="accent">${esc(h.titleLine3)}</span></h1>
      <p class="desc">${esc(h.text)}</p>
      <a href="#" class="btn primary">${esc(h.primaryCta)} →</a>
      <div class="hero-badges">
        ${badges.map(b => `<div class="badge-item"><span class="ic">${esc(b.icon)}</span><div><b>${esc(b.title)}</b><small>${esc(b.sub)}</small></div></div>`).join('')}
      </div>
    </div>
    <div class="hero-media-wrap">
      <div class="hero-media">${h.image ? `<img src="${esc(h.image)}" alt="${esc(C.brand)}">` : ''}</div>
      <div class="hero-circle-badge"><span class="l1">${esc(h.badgeLine1)}</span><span>${esc(h.badgeLine2)}</span></div>
    </div>
  </div></section>

  <section class="farm"><div class="container farm-box">
    <div class="farm-photo">${fb.image ? `<img src="${esc(fb.image)}" alt="">` : ''}</div>
    <div class="farm-mid">
      <div class="farm-eyebrow">${esc(fb.eyebrow)}</div>
      <h2>${esc(fb.titleNormal)} <span class="accent">${esc(fb.titleAccent)}</span></h2>
      <p>${esc(fb.text)}</p>
      <a href="#" class="btn primary">${esc(fb.cta)} →</a>
    </div>
    <div class="farm-stats">
      ${(fb.stats || []).map(s => `<div class="stat"><b>${esc(s.number)}</b><small>${esc(s.label)}</small></div>`).join('')}
    </div>
  </div></section>

  <section class="categories"><div class="container">
    <div class="section-head"><h2>${esc(C.categoriesHeading)}</h2><a href="#" class="viewall">সবগুলো দেখুন →</a></div>
    <div class="cat-grid">
      ${cats.map(c => `<div class="cat-card"><div class="cat-img"><img src="${esc(c.image)}" alt="${esc(c.name)}"></div><b>${esc(c.name)}</b><small>${esc(c.count)}</small></div>`).join('')}
    </div>
  </div></section>

  <section class="offer"><div class="container">
    <div class="offer-box">
      ${of.image ? `<img src="${esc(of.image)}" alt="">` : ''}
      <div class="offer-content">
        <div class="eyebrow">${esc(of.eyebrow)}</div>
        <h2>${esc(of.title)}</h2>
        <p>${esc(of.subtitle)}</p>
        <a href="#" class="btn gold">${esc(of.cta)}</a>
      </div>
      <div class="offer-badge"><span>${esc(of.badgeLine1)}</span><span>${esc(of.badgeLine2)}</span></div>
    </div>
  </div></section>

  <section class="why"><div class="container">
    <div class="section-head"><h2>${esc(C.whyChooseUsHeading)}</h2></div>
    <div class="why-grid">
      ${why.map(w => `<div class="why-card"><span class="ic">${esc(w.icon)}</span><div><b>${esc(w.title)}</b><small>${esc(w.sub)}</small></div></div>`).join('')}
    </div>
  </div></section>

  <section class="picks"><div class="container">
    <div class="section-head"><h2>${esc(C.topPicksHeading)}</h2><a href="#" class="viewall">সবগুলো দেখুন →</a></div>
    <p class="picks-note">${esc(C.topPicksNote)}</p>
    <div class="picks-grid">
      ${picks.map(p => `
        <div class="pick-card">
          <span class="heart">♡</span>
          <div class="pick-img"><img src="${esc(p.image)}" alt="${esc(p.name)}"></div>
          <b class="name">${esc(p.name)}</b>
          <span class="price"><strong>${esc(p.price)}</strong> ${esc(p.unit)}</span>
          <button class="btn addcart">${esc(C.addToCart)}</button>
        </div>`).join('')}
    </div>
  </div></section>

  <section class="newsletter"><div class="container">
    <div class="newsletter-box">
      <div class="newsletter-left">
        <span class="ic">✉️</span>
        <div><b>${esc(nl.title)}</b><p>${esc(nl.text)}</p></div>
      </div>
      <form class="newsletter-form" onsubmit="return false">
        <input type="email" placeholder="${esc(nl.placeholder)}" required>
        <button class="btn primary" type="submit">${esc(nl.button)}</button>
      </form>
    </div>
  </div></section>

  <footer class="footer"><div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo-block"><div class="logo-mark">🌿</div><div class="logo-text"><b>${esc(C.brand)}</b></div></div>
        <p>${esc(ft.about)}</p>
      </div>
      <div><h4>${esc(ft.quickLinksHeading)}</h4><ul>${(ft.quickLinks || []).map(x => `<li><a href="#">${esc(x)}</a></li>`).join('')}</ul></div>
      <div><h4>${esc(ft.serviceHeading)}</h4><ul>${(ft.customerService || []).map(x => `<li><a href="#">${esc(x)}</a></li>`).join('')}</ul></div>
      <div><h4>${esc(ft.infoHeading)}</h4><ul>${(ft.information || []).map(x => `<li><a href="#">${esc(x)}</a></li>`).join('')}</ul></div>
      <div><h4>${esc(ft.paymentHeading)}</h4><div class="pay-icons"><span>VISA</span><span>Mastercard</span><span>PayPal</span><span>SSL</span></div></div>
    </div>
    <div class="footer-bottom">
      <div>© ${new Date().getFullYear()} ${esc(C.brand)}. সর্বস্বত্ব সংরক্ষিত।</div>
      <div class="footer-note">${esc(ft.bottomNote)}</div>
    </div>
  </div></footer>

  <a class="adminlink" href="admin.html">Admin</a>
  `;
}

function installGTM() {
  const id = C.tracking?.gtmId?.trim();
  if (!id || !/^GTM-[A-Z0-9]+$/i.test(id)) return;
  if (window.__gtmInstalled) return; window.__gtmInstalled = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);
  const ns = document.createElement('noscript');
  ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(id)}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.prepend(ns);
}

loadContent();
