const PASSWORD_HASH = "61ebc0c467ee2f9ffa496ca5a6b731ac2a355f91ce233c094eb2933861eb152e"; // password: 8866
let DATA = null, tokenMemory = "";
const $ = id => document.getElementById(id);

async function sha(s) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
$('loginBtn').onclick = async () => {
  const h = await sha($('password').value);
  if (h === PASSWORD_HASH) { sessionStorage.admin = '1'; openPanel(); }
  else alert('ভুল পাসওয়ার্ড');
};
if (sessionStorage.admin === '1') openPanel();

async function openPanel() {
  $('login').classList.add('hidden');
  $('panel').classList.remove('hidden');
  try { const r = await fetch('content.json?' + Date.now()); DATA = await r.json(); }
  catch (e) { DATA = {}; }
  normalize();
  fill();
}

function normalize() {
  DATA.topbar = DATA.topbar || [];
  DATA.nav = DATA.nav || [];
  DATA.hero = DATA.hero || {};
  DATA.trustBadges = DATA.trustBadges || [];
  DATA.farmBanner = DATA.farmBanner || {};
  DATA.farmBanner.stats = DATA.farmBanner.stats || [];
  DATA.categories = DATA.categories || [];
  DATA.offer = DATA.offer || {};
  DATA.whyChooseUs = DATA.whyChooseUs || [];
  DATA.topPicks = DATA.topPicks || [];
  DATA.newsletter = DATA.newsletter || {};
  DATA.footer = DATA.footer || {};
  DATA.footer.quickLinks = DATA.footer.quickLinks || [];
  DATA.footer.customerService = DATA.footer.customerService || [];
  DATA.footer.information = DATA.footer.information || [];
  DATA.contact = DATA.contact || {};
  DATA.tracking = DATA.tracking || {};
}

function val(id, v) { if ($(id)) $(id).value = v ?? ''; }
function esc(x) { return String(x ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

function fill() {
  val('brand', DATA.brand); val('brandTag', DATA.brandTag); val('demoRibbon', DATA.demoRibbon);
  val('topbar', (DATA.topbar || []).join('\n'));
  val('nav', (DATA.nav || []).join('\n'));

  val('hTitle1', DATA.hero.titleLine1); val('hTitle2', DATA.hero.titleLine2); val('hTitle3', DATA.hero.titleLine3);
  val('hText', DATA.hero.text); val('hCta', DATA.hero.primaryCta); val('hImage', DATA.hero.image);
  val('hBadge1', DATA.hero.badgeLine1); val('hBadge2', DATA.hero.badgeLine2);
  renderTrust();

  val('fbEyebrow', DATA.farmBanner.eyebrow); val('fbTitleN', DATA.farmBanner.titleNormal); val('fbTitleA', DATA.farmBanner.titleAccent);
  val('fbText', DATA.farmBanner.text); val('fbCta', DATA.farmBanner.cta); val('fbImage', DATA.farmBanner.image);
  renderStats();

  val('catHeading', DATA.categoriesHeading);
  renderCategories();

  val('ofEyebrow', DATA.offer.eyebrow); val('ofTitle', DATA.offer.title); val('ofSubtitle', DATA.offer.subtitle);
  val('ofCta', DATA.offer.cta); val('ofBadge1', DATA.offer.badgeLine1); val('ofBadge2', DATA.offer.badgeLine2); val('ofImage', DATA.offer.image);

  val('whyHeading', DATA.whyChooseUsHeading);
  renderWhy();

  val('picksHeading', DATA.topPicksHeading); val('picksNote', DATA.topPicksNote); val('addToCartText', DATA.addToCart);
  renderPicks();

  val('nlTitle', DATA.newsletter.title); val('nlText', DATA.newsletter.text);
  val('nlPlaceholder', DATA.newsletter.placeholder); val('nlButton', DATA.newsletter.button);

  val('ftAbout', DATA.footer.about);
  val('ftQuickHeading', DATA.footer.quickLinksHeading); val('ftQuickLinks', (DATA.footer.quickLinks || []).join('\n'));
  val('ftServiceHeading', DATA.footer.serviceHeading); val('ftCustomerService', (DATA.footer.customerService || []).join('\n'));
  val('ftInfoHeading', DATA.footer.infoHeading); val('ftInformation', (DATA.footer.information || []).join('\n'));
  val('ftPaymentHeading', DATA.footer.paymentHeading); val('ftBottomNote', DATA.footer.bottomNote);

  val('whatsapp', DATA.contact.whatsapp); val('phone', DATA.contact.phone);
  val('messenger', DATA.contact.messenger); val('meeting', DATA.contact.meeting); val('email', DATA.contact.email);

  val('gtmId', DATA.tracking.gtmId); val('ga4Id', DATA.tracking.ga4MeasurementId);
  val('metaId', DATA.tracking.metaPixelId); val('clarityId', DATA.tracking.clarityProjectId);
}

/* ---- repeater renderers ---- */
function renderTrust() {
  $('trustBadges').innerHTML = (DATA.trustBadges || []).map((x, i) => `
    <div class="repeat-item">
      <button class="rm" onclick="removeItem('trustBadges',${i})">✕</button>
      <div class="row3">
        <div><label>আইকন (ইমোজি)</label><input type="text" data-arr="trustBadges" data-i="${i}" data-k="icon" value="${esc(x.icon)}"></div>
        <div><label>টাইটেল</label><input type="text" data-arr="trustBadges" data-i="${i}" data-k="title" value="${esc(x.title)}"></div>
        <div><label>সাব-টেক্সট</label><input type="text" data-arr="trustBadges" data-i="${i}" data-k="sub" value="${esc(x.sub)}"></div>
      </div>
    </div>`).join('');
}
function renderStats() {
  $('fbStats').innerHTML = (DATA.farmBanner.stats || []).map((x, i) => `
    <div class="repeat-item">
      <button class="rm" onclick="removeStat(${i})">✕</button>
      <div class="row">
        <div><label>সংখ্যা</label><input type="text" data-stat="${i}" data-k="number" value="${esc(x.number)}"></div>
        <div><label>লেবেল</label><input type="text" data-stat="${i}" data-k="label" value="${esc(x.label)}"></div>
      </div>
    </div>`).join('');
}
function renderCategories() {
  $('categories').innerHTML = (DATA.categories || []).map((x, i) => `
    <div class="repeat-item">
      <button class="rm" onclick="removeItem('categories',${i})">✕</button>
      <div class="row3">
        <div><label>নাম</label><input type="text" data-arr="categories" data-i="${i}" data-k="name" value="${esc(x.name)}"></div>
        <div><label>আইটেম সংখ্যা টেক্সট</label><input type="text" data-arr="categories" data-i="${i}" data-k="count" value="${esc(x.count)}"></div>
        <div><label>ছবির লিংক</label><input type="text" data-arr="categories" data-i="${i}" data-k="image" value="${esc(x.image)}"></div>
      </div>
    </div>`).join('');
}
function renderWhy() {
  $('whyItems').innerHTML = (DATA.whyChooseUs || []).map((x, i) => `
    <div class="repeat-item">
      <button class="rm" onclick="removeItem('whyChooseUs',${i})">✕</button>
      <div class="row3">
        <div><label>আইকন</label><input type="text" data-arr="whyChooseUs" data-i="${i}" data-k="icon" value="${esc(x.icon)}"></div>
        <div><label>টাইটেল</label><input type="text" data-arr="whyChooseUs" data-i="${i}" data-k="title" value="${esc(x.title)}"></div>
        <div><label>সাব-টেক্সট</label><input type="text" data-arr="whyChooseUs" data-i="${i}" data-k="sub" value="${esc(x.sub)}"></div>
      </div>
    </div>`).join('');
}
function renderPicks() {
  $('picks').innerHTML = (DATA.topPicks || []).map((x, i) => `
    <div class="repeat-item">
      <button class="rm" onclick="removeItem('topPicks',${i})">✕</button>
      <div class="row">
        <div><label>প্রোডাক্টের নাম</label><input type="text" data-arr="topPicks" data-i="${i}" data-k="name" value="${esc(x.name)}"></div>
        <div><label>ছবির লিংক</label><input type="text" data-arr="topPicks" data-i="${i}" data-k="image" value="${esc(x.image)}"></div>
      </div>
      <div class="row">
        <div><label>দাম</label><input type="text" data-arr="topPicks" data-i="${i}" data-k="price" value="${esc(x.price)}"></div>
        <div><label>একক (/ কেজি, / পিস...)</label><input type="text" data-arr="topPicks" data-i="${i}" data-k="unit" value="${esc(x.unit)}"></div>
      </div>
    </div>`).join('');
}

window.removeItem = function (key, i) { collect(); DATA[key].splice(i, 1); fill(); };
window.removeStat = function (i) { collect(); DATA.farmBanner.stats.splice(i, 1); fill(); };

$('addTrust').onclick = () => { collect(); DATA.trustBadges.push({ icon: '🌱', title: 'নতুন সুবিধা', sub: 'বিবরণ লিখুন' }); renderTrust(); };
$('addStat').onclick = () => { collect(); DATA.farmBanner.stats.push({ number: '০+', label: 'নতুন স্ট্যাট' }); renderStats(); };
$('addCat').onclick = () => { collect(); DATA.categories.push({ name: 'নতুন ক্যাটাগরি', count: '০ আইটেম', image: 'assets/placeholder.jpg' }); renderCategories(); };
$('addWhy').onclick = () => { collect(); DATA.whyChooseUs.push({ icon: '⭐', title: 'নতুন কারণ', sub: 'বিবরণ লিখুন' }); renderWhy(); };
$('addPick').onclick = () => { collect(); DATA.topPicks.push({ name: 'নতুন প্রোডাক্ট', price: '৳০', unit: '/ পিস', image: 'assets/placeholder.jpg' }); renderPicks(); };

function collect() {
  DATA.brand = $('brand').value; DATA.brandTag = $('brandTag').value; DATA.demoRibbon = $('demoRibbon').value;
  DATA.topbar = $('topbar').value.split('\n').map(x => x.trim()).filter(Boolean);
  DATA.nav = $('nav').value.split('\n').map(x => x.trim()).filter(Boolean);

  DATA.hero = {
    ...DATA.hero,
    titleLine1: $('hTitle1').value, titleLine2: $('hTitle2').value, titleLine3: $('hTitle3').value,
    text: $('hText').value, primaryCta: $('hCta').value, image: $('hImage').value,
    badgeLine1: $('hBadge1').value, badgeLine2: $('hBadge2').value
  };

  DATA.farmBanner = {
    ...DATA.farmBanner,
    eyebrow: $('fbEyebrow').value, titleNormal: $('fbTitleN').value, titleAccent: $('fbTitleA').value,
    text: $('fbText').value, cta: $('fbCta').value, image: $('fbImage').value
  };

  DATA.categoriesHeading = $('catHeading').value;

  DATA.offer = {
    ...DATA.offer,
    eyebrow: $('ofEyebrow').value, title: $('ofTitle').value, subtitle: $('ofSubtitle').value,
    cta: $('ofCta').value, badgeLine1: $('ofBadge1').value, badgeLine2: $('ofBadge2').value, image: $('ofImage').value
  };

  DATA.whyChooseUsHeading = $('whyHeading').value;
  DATA.topPicksHeading = $('picksHeading').value; DATA.topPicksNote = $('picksNote').value; DATA.addToCart = $('addToCartText').value;

  DATA.newsletter = { title: $('nlTitle').value, text: $('nlText').value, placeholder: $('nlPlaceholder').value, button: $('nlButton').value };

  DATA.footer = {
    ...DATA.footer,
    about: $('ftAbout').value,
    quickLinksHeading: $('ftQuickHeading').value, quickLinks: $('ftQuickLinks').value.split('\n').map(x => x.trim()).filter(Boolean),
    serviceHeading: $('ftServiceHeading').value, customerService: $('ftCustomerService').value.split('\n').map(x => x.trim()).filter(Boolean),
    infoHeading: $('ftInfoHeading').value, information: $('ftInformation').value.split('\n').map(x => x.trim()).filter(Boolean),
    paymentHeading: $('ftPaymentHeading').value, bottomNote: $('ftBottomNote').value
  };

  DATA.contact = { whatsapp: $('whatsapp').value, phone: $('phone').value, messenger: $('messenger').value, meeting: $('meeting').value, email: $('email').value };
  DATA.tracking = { gtmId: $('gtmId').value, ga4MeasurementId: $('ga4Id').value, metaPixelId: $('metaId').value, clarityProjectId: $('clarityId').value };

  document.querySelectorAll('[data-arr]').forEach(e => {
    const arr = e.dataset.arr, i = +e.dataset.i, k = e.dataset.k;
    if (DATA[arr] && DATA[arr][i]) DATA[arr][i][k] = e.value;
  });
  document.querySelectorAll('[data-stat]').forEach(e => {
    const i = +e.dataset.stat, k = e.dataset.k;
    if (DATA.farmBanner.stats[i]) DATA.farmBanner.stats[i][k] = e.value;
  });

  return DATA;
}

$('saveLocal').onclick = () => { collect(); localStorage.nexuraContent = JSON.stringify(DATA); alert('এই ব্রাউজারে সেভ হয়েছে। পাবলিশ করতে content.json ডাউনলোড করুন।'); };
$('download').onclick = () => {
  collect();
  const b = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'content.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};

document.querySelectorAll('nav button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.add('hidden'));
  document.querySelectorAll('nav button').forEach(x => x.classList.remove('active'));
  $(b.dataset.tab).classList.remove('hidden');
  b.classList.add('active');
});

$('publishNow').onclick = async () => {
  collect();
  tokenMemory = $('ghToken').value.trim();
  if (!tokenMemory) return alert('একটি GitHub টোকেন দিন।');
  const owner = $('ghOwner').value.trim(), repo = $('ghRepo').value.trim();
  const branch = $('ghBranch').value.trim() || 'main', path = $('ghPath').value.trim() || 'content.json';
  if (!owner || !repo) return alert('Owner এবং Repository দিন।');
  const api = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path.split('/').map(encodeURIComponent).join('/')}`;
  let shaVal = null;
  try {
    const old = await fetch(api + `?ref=${encodeURIComponent(branch)}`, { headers: { Authorization: `Bearer ${tokenMemory}`, Accept: 'application/vnd.github+json' } });
    if (old.ok) { const j = await old.json(); shaVal = j.sha; }
  } catch (e) { }
  const body = { message: 'Update website content', content: btoa(unescape(encodeURIComponent(JSON.stringify(DATA, null, 2)))), branch };
  if (shaVal) body.sha = shaVal;
  const r = await fetch(api, { method: 'PUT', headers: { Authorization: `Bearer ${tokenMemory}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  $('publishStatus').textContent = r.ok ? 'পাবলিশ সম্পন্ন হয়েছে। GitHub Pages আপডেট হতে কিছুক্ষণ সময় লাগতে পারে।' : `পাবলিশ ব্যর্থ হয়েছে: ${await r.text()}`;
  tokenMemory = ''; $('ghToken').value = '';
};
