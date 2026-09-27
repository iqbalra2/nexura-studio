/* =========================================================
   NEXURA STUDIO
   PREMIUM STATIC E-COMMERCE ENGINE

   Pure Vanilla JavaScript
   No React / PHP / Node
========================================================= */


/* =========================================================
   DEFAULT CONFIG
========================================================= */

const DEFAULT = {

  brand: "Nexura Studio",

  brandTag: "ডেমো টেমপ্লেট শোকেস",

  demoRibbon:
    "🎨 ডেমো টেমপ্লেট — Nexura Studio",

  topbar: [],

  nav: [],

  hero: {},

  trustBadges: [],

  farmBanner:{
    stats:[]
  },

  categoriesHeading:"",

  categories:[],

  offer:{},

  whyChooseUsHeading:"",

  whyChooseUs:[],

  topPicksHeading:"",

  topPicksNote:"",

  topPicks:[],

  addToCart:"কার্টে যোগ করুন",

  newsletter:{},

  footer:{
    quickLinks:[],
    customerService:[],
    information:[]
  },

  contact:{
    whatsapp:"8801000000000",

    phone:"+8801000000000",

    messenger:"https://m.me/",

    meeting:"https://meet.google.com/",

    email:"hello@example.com"
  },

  tracking:{
    gtmId:"",
    ga4MeasurementId:"",
    metaPixelId:"",
    clarityProjectId:""
  }
};


/* =========================================================
   GLOBAL STATE
========================================================= */

let C = {
  ...DEFAULT
};

let CART = [];


/* =========================================================
   CART STORAGE
========================================================= */

const CART_STORAGE_KEY =
  "nexura_studio_cart";


function loadCart(){

  try{

    const saved =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    CART =
      saved
        ? JSON.parse(saved)
        : [];

    if(!Array.isArray(CART)){
      CART = [];
    }

  }catch(error){

    console.warn(
      "Cart could not be loaded",
      error
    );

    CART = [];
  }
}


function saveCart(){

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(CART)
  );
}


/* =========================================================
   CONTENT LOADER
========================================================= */

async function loadContent(){

  try{

    const response =
      await fetch(
        "content.json",
        {
          cache:"no-store"
        }
      );

    const remote =
      await response.json();

    C = {

      ...DEFAULT,

      ...remote,

      hero:{
        ...DEFAULT.hero,
        ...remote.hero
      },

      farmBanner:{
        ...DEFAULT.farmBanner,
        ...remote.farmBanner
      },

      offer:{
        ...DEFAULT.offer,
        ...remote.offer
      },

      newsletter:{
        ...DEFAULT.newsletter,
        ...remote.newsletter
      },

      footer:{
        ...DEFAULT.footer,
        ...remote.footer
      },

      contact:{
        ...DEFAULT.contact,
        ...remote.contact
      },

      tracking:{
        ...DEFAULT.tracking,
        ...remote.tracking
      }
    };

  }catch(error){

    console.warn(
      "content.json could not load",
      error
    );
  }

  loadCart();

  render();

  installGTM();

  initializePremiumUX();

  renderCart();
}


/* =========================================================
   HTML ESCAPE
========================================================= */

function esc(value){

  return String(
    value ?? ""
  ).replace(
    /[&<>"']/g,
    character =>({

      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"

    }[character])
  );
}


/* =========================================================
   MONEY
========================================================= */

function money(value){

  const number =
    Number(value) || 0;

  return (
    "৳" +
    number.toLocaleString(
      "en-BD"
    )
  );
}


/* =========================================================
   PRICE PARSER
=========================================================

   content.json-এর price যদি:
   "৳250"
   "250"
   "250 টাকা"

   যেকোনো format-এ থাকে,
   আমরা numeric price বের করার চেষ্টা করি।
========================================================= */

function parsePrice(price){

  const number =
    String(price ?? "")
      .replace(/[^\d.]/g,"");

  return Number(number) || 0;
}


/* =========================================================
   RENDER WEBSITE
========================================================= */

function render(){

  const h =
    C.hero || {};

  const fb =
    C.farmBanner || {};

  const of =
    C.offer || {};

  const nl =
    C.newsletter || {};

  const ft =
    C.footer || {};

  const cats =
    C.categories || [];

  const why =
    C.whyChooseUs || [];

  const picks =
    C.topPicks || [];

  const badges =
    C.trustBadges || [];


  document.querySelector(
    "#app"
  ).innerHTML = `

  <!-- SVG CLIP PATH -->
  <svg width="0" height="0"
       style="position:absolute">

    <defs>

      <clipPath
        id="heartClip"
        clipPathUnits="objectBoundingBox">

        <path d="
          M0.5,0.94
          C0.5,0.94
          0.05,0.62
          0.05,0.34
          C0.05,0.14
          0.21,0.02
          0.37,0.02
          C0.45,0.02
          0.5,0.09
          0.5,0.16
          C0.5,0.09
          0.55,0.02
          0.63,0.02
          C0.79,0.02
          0.95,0.14
          0.95,0.34
          C0.95,0.62
          0.5,0.94
          0.5,0.94
          Z">
        </path>

      </clipPath>

    </defs>

  </svg>


  <!-- DEMO RIBBON -->

  <div class="demo-ribbon">
    ${esc(C.demoRibbon)}
  </div>


  <!-- TOP BAR -->

  <div class="topbar">

    <div class="container">

      ${(C.topbar || [])
        .map(
          item =>
            `<span>${esc(item)}</span>`
        )
        .join("")}

    </div>

  </div>


  <!-- HEADER -->

  <header class="nav">

    <div class="container navin">

      <div class="logo-block">

        <div class="logo-mark">
          🌿
        </div>

        <div class="logo-text">

          <b>
            ${esc(C.brand)}
          </b>

          <small>
            ${esc(C.brandTag)}
          </small>

        </div>

      </div>


      <!-- DESKTOP NAV -->

      <nav class="links">

        ${(C.nav || [])
          .map(
            item =>
              `<a href="#">${esc(item)}</a>`
          )
          .join("")}

      </nav>


      <!-- MOBILE MENU BUTTON -->

      <button
        class="menu-toggle"
        id="menuToggle"
        aria-label="Menu">

        <span></span>
        <span></span>
        <span></span>

      </button>


      <!-- NAV ICONS -->

      <div class="navicons">

        <span class="icon">
          🔍
        </span>

        <span class="icon">
          👤
        </span>

        <span
          class="icon cart-icon"
          id="cartOpenBtn">

          🛒

          <span
            class="cart-count">
            0
          </span>

        </span>

      </div>

    </div>


    <!-- MOBILE MENU -->

    <div
      class="mobile-menu"
      id="mobileMenu">

      ${(C.nav || [])
        .map(
          item =>
            `<a href="#">${esc(item)}</a>`
        )
        .join("")}

      <a
        href="#"
        id="mobileCartLink">

        🛒 কার্ট খুলুন

      </a>

    </div>

  </header>


  <!-- HERO -->

  <section
    class="hero reveal">

    <div class="container">

      <div class="hero-copy">

        <h1>

          ${esc(h.titleLine1)}
          <br>

          ${esc(h.titleLine2)}
          <br>

          <span class="accent">
            ${esc(h.titleLine3)}
          </span>

        </h1>

        <p class="desc">
          ${esc(h.text)}
        </p>

        <a
          href="#"
          class="btn primary order-btn">

          ${esc(h.primaryCta)}
          →

        </a>


        <div class="hero-badges">

          ${badges
            .map(
              (badge,index) => `

              <div
                class="badge-item reveal"
                style="--delay:${index * 100}ms">

                <span class="ic">
                  ${esc(badge.icon)}
                </span>

                <div>

                  <b>
                    ${esc(badge.title)}
                  </b>

                  <small>
                    ${esc(badge.sub)}
                  </small>

                </div>

              </div>

            `
            )
            .join("")}

        </div>

      </div>


      <div
        class="hero-media-wrap reveal"
        style="--delay:150ms">

        <div class="hero-media">

          ${
            h.image
              ? `
                <img
                  src="${esc(h.image)}"
                  alt="${esc(C.brand)}"
                  loading="eager">
              `
              : ""
          }

        </div>


        <div class="hero-circle-badge">

          <span class="l1">
            ${esc(h.badgeLine1)}
          </span>

          <span>
            ${esc(h.badgeLine2)}
          </span>

        </div>

      </div>

    </div>

  </section>


  <!-- FARM -->

  <section class="farm">

    <div
      class="container farm-box reveal">

      <div class="farm-photo">

        ${
          fb.image
            ? `
              <img
                src="${esc(fb.image)}"
                alt=""
                loading="lazy">
            `
            : ""
        }

      </div>


      <div class="farm-mid">

        <div class="farm-eyebrow">
          ${esc(fb.eyebrow)}
        </div>

        <h2>

          ${esc(fb.titleNormal)}

          <span class="accent">
            ${esc(fb.titleAccent)}
          </span>

        </h2>

        <p>
          ${esc(fb.text)}
        </p>

        <a
          href="#"
          class="btn primary order-btn">

          ${esc(fb.cta)}
          →

        </a>

      </div>


      <div class="farm-stats">

        ${(fb.stats || [])
          .map(
            (stat,index) => `

            <div
              class="stat reveal"
              style="--delay:${index * 100}ms">

              <b>
                ${esc(stat.number)}
              </b>

              <small>
                ${esc(stat.label)}
              </small>

            </div>

          `
          )
          .join("")}

      </div>

    </div>

  </section>


  <!-- CATEGORIES -->

  <section class="categories">

    <div class="container">

      <div class="section-head reveal">

        <h2>
          ${esc(C.categoriesHeading)}
        </h2>

        <a
          href="#"
          class="viewall">
          সবগুলো দেখুন →
        </a>

      </div>


      <div class="cat-grid">

        ${cats
          .map(
            (category,index) => `

            <div
              class="cat-card reveal"
              style="--delay:${index * 80}ms">

              <div class="cat-img">

                <img
                  src="${esc(category.image)}"
                  alt="${esc(category.name)}"
                  loading="lazy">

              </div>

              <b>
                ${esc(category.name)}
              </b>

              <small>
                ${esc(category.count)}
              </small>

            </div>

          `
          )
          .join("")}

      </div>

    </div>

  </section>


  <!-- OFFER -->

  <section class="offer">

    <div class="container">

      <div class="offer-box reveal">

        ${
          of.image
            ? `
              <img
                src="${esc(of.image)}"
                alt=""
                loading="lazy">
            `
            : ""
        }


        <div class="offer-content">

          <div class="eyebrow">
            ${esc(of.eyebrow)}
          </div>

          <h2>
            ${esc(of.title)}
          </h2>

          <p>
            ${esc(of.subtitle)}
          </p>

          <a
            href="#"
            class="btn gold order-btn">

            ${esc(of.cta)}

          </a>

        </div>


        <div class="offer-badge">

          <span>
            ${esc(of.badgeLine1)}
          </span>

          <span>
            ${esc(of.badgeLine2)}
          </span>

        </div>

      </div>

    </div>

  </section>


  <!-- WHY -->

  <section class="why">

    <div class="container">

      <div class="section-head reveal">

        <h2>
          ${esc(C.whyChooseUsHeading)}
        </h2>

      </div>


      <div class="why-grid">

        ${why
          .map(
            (item,index) => `

            <div
              class="why-card reveal"
              style="--delay:${index * 80}ms">

              <span class="ic">
                ${esc(item.icon)}
              </span>

              <div>

                <b>
                  ${esc(item.title)}
                </b>

                <small>
                  ${esc(item.sub)}
                </small>

              </div>

            </div>

          `
          )
          .join("")}

      </div>

    </div>

  </section>


  <!-- PRODUCTS -->

  <section class="picks">

    <div class="container">

      <div class="section-head reveal">

        <h2>
          ${esc(C.topPicksHeading)}
        </h2>

        <a
          href="#"
          class="viewall">
          সবগুলো দেখুন →
        </a>

      </div>


      <p class="picks-note reveal">
        ${esc(C.topPicksNote)}
      </p>


      <div class="picks-grid">

        ${picks
          .map(
            (product,index) => {

              const productId =
                product.id ||
                `product-${index + 1}`;

              const price =
                parsePrice(product.price);

              return `

              <article
                class="pick-card reveal"
                data-product-id="${esc(productId)}"
                style="--delay:${index * 80}ms">

                <button
                  class="heart"
                  aria-label="Wishlist">
                  ♡
                </button>


                <div class="pick-img">

                  <img
                    src="${esc(product.image)}"
                    alt="${esc(product.name)}"
                    loading="lazy">

                </div>


                <b class="name">
                  ${esc(product.name)}
                </b>


                <span class="price">

                  <strong>
                    ${esc(product.price)}
                  </strong>

                  ${esc(product.unit)}

                </span>


                <button
                  class="btn addcart"
                  data-add-cart
                  data-product-id="${esc(productId)}">

                  ${esc(C.addToCart)}

                </button>

              </article>

              `;
            }
          )
          .join("")}

      </div>

    </div>

  </section>


  <!-- NEWSLETTER -->

  <section class="newsletter">

    <div class="container">

      <div class="newsletter-box reveal">

        <div class="newsletter-left">

          <span class="ic">
            ✉️
          </span>

          <div>

            <b>
              ${esc(nl.title)}
            </b>

            <p>
              ${esc(nl.text)}
            </p>

          </div>

        </div>


        <form
          class="newsletter-form"
          id="newsletterForm">

          <input
            type="email"
            placeholder="${esc(nl.placeholder)}"
            required>

          <button
            class="btn primary"
            type="submit">

            ${esc(nl.button)}

          </button>

        </form>

      </div>

    </div>

  </section>


  <!-- FOOTER -->

  <footer class="footer">

    <div class="container">

      <div class="footer-grid">


        <div class="footer-brand">

          <div class="logo-block">

            <div class="logo-mark">
              🌿
            </div>

            <div class="logo-text">

              <b>
                ${esc(C.brand)}
              </b>

            </div>

          </div>

          <p>
            ${esc(ft.about)}
          </p>

        </div>


        <div>

          <h4>
            ${esc(ft.quickLinksHeading)}
          </h4>

          <ul>

            ${(ft.quickLinks || [])
              .map(
                item =>
                  `<li><a href="#">${esc(item)}</a></li>`
              )
              .join("")}

          </ul>

        </div>


        <div>

          <h4>
            ${esc(ft.serviceHeading)}
          </h4>

          <ul>

            ${(ft.customerService || [])
              .map(
                item =>
                  `<li><a href="#">${esc(item)}</a></li>`
              )
              .join("")}

          </ul>

        </div>


        <div>

          <h4>
            ${esc(ft.infoHeading)}
          </h4>

          <ul>

            ${(ft.information || [])
              .map(
                item =>
                  `<li><a href="#">${esc(item)}</a></li>`
              )
              .join("")}

          </ul>

        </div>


        <div>

          <h4>
            ${esc(ft.paymentHeading)}
          </h4>

          <div class="pay-icons">

            <span>VISA</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>SSL</span>

          </div>

        </div>


      </div>


      <div class="footer-bottom">

        <div>
          © ${new Date().getFullYear()}
          ${esc(C.brand)}.
          সর্বস্বত্ব সংরক্ষিত।
        </div>

        <div class="footer-note">
          ${esc(ft.bottomNote)}
        </div>

      </div>

    </div>

  </footer>


  <a
    class="adminlink"
    href="admin.html">
    Admin
  </a>

  `;
}


/* =========================================================
   PRODUCT LOOKUP
========================================================= */

function findProduct(productId){

  const products =
    C.topPicks || [];

  const index =
    products.findIndex(
      (product,index) =>
        String(
          product.id ||
          `product-${index + 1}`
        ) === String(productId)
    );

  if(index === -1){
    return null;
  }

  const product =
    products[index];

  return {

    ...product,

    id:
      product.id ||
      `product-${index + 1}`,

    numericPrice:
      parsePrice(product.price)

  };
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId){

  const product =
    findProduct(productId);

  if(!product){
    return;
  }


  const existing =
    CART.find(
      item =>
        String(item.id) ===
        String(product.id)
    );


  if(existing){

    existing.quantity += 1;

  }else{

    CART.push({

      id:product.id,

      name:product.name,

      image:product.image,

      price:product.numericPrice,

      unit:product.unit || "",

      quantity:1
    });
  }


  saveCart();

  renderCart();

  openCart();

  trackEvent(
    "add_to_cart",
    {
      product_id:product.id,
      product_name:product.name,
      value:product.numericPrice
    }
  );
}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(
  productId,
  amount
){

  const item =
    CART.find(
      product =>
        String(product.id) ===
        String(productId)
    );

  if(!item){
    return;
  }


  item.quantity += amount;


  if(item.quantity <= 0){

    CART =
      CART.filter(
        product =>
          String(product.id) !==
          String(productId)
      );
  }


  saveCart();

  renderCart();
}


/* =========================================================
   CART CALCULATIONS
========================================================= */

function getCartSubtotal(){

  return CART.reduce(
    (total,item) =>
      total +
      (
        Number(item.price) *
        Number(item.quantity)
      ),
    0
  );
}


/* =========================================================
   DELIVERY LOGIC
=========================================================

   Example logic:

   0 = empty cart

   subtotal >= 2000
   → Free delivery

   otherwise
   → ৳80

   আপনি চাইলে এখানে
   Dhaka / Outside Dhaka
   আলাদা logic বসাতে পারবেন।
========================================================= */

function getDeliveryFee(){

  const subtotal =
    getCartSubtotal();

  if(subtotal <= 0){
    return 0;
  }

  if(subtotal >= 2000){
    return 0;
  }

  return 80;
}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal(){

  return (
    getCartSubtotal() +
    getDeliveryFee()
  );
}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart(){

  const cartItems =
    document.getElementById(
      "cartItems"
    );

  const cartEmpty =
    document.getElementById(
      "cartEmpty"
    );


  if(!cartItems){
    return;
  }


  const subtotal =
    getCartSubtotal();

  const delivery =
    getDeliveryFee();

  const total =
    subtotal + delivery;


  /* Quantity badge */

  const totalQuantity =
    CART.reduce(
      (sum,item) =>
        sum + item.quantity,
      0
    );


  document.querySelectorAll(
    ".cart-count"
  ).forEach(
    badge => {
      badge.textContent =
        totalQuantity;
    }
  );


  document.getElementById(
    "cartSubtotal"
  ).textContent =
    money(subtotal);


  document.getElementById(
    "cartDelivery"
  ).textContent =
    delivery === 0 &&
    subtotal > 0
      ? "FREE"
      : money(delivery);


  document.getElementById(
    "cartTotal"
  ).textContent =
    money(total);


  document.getElementById(
    "mobileCartTotal"
  ).textContent =
    money(total);


  /* Empty state */

  if(CART.length === 0){

    cartItems.innerHTML = "";

    cartEmpty.style.display =
      "block";

    return;
  }


  cartEmpty.style.display =
    "none";


  cartItems.innerHTML =
    CART.map(
      item => `

      <div class="cart-item">

        <div class="cart-item-image">

          ${
            item.image
              ? `
                <img
                  src="${esc(item.image)}"
                  alt="${esc(item.name)}">
              `
              : ""
          }

        </div>


        <div>

          <span class="cart-item-name">
            ${esc(item.name)}
          </span>

          <span class="cart-item-price">
            ${money(item.price)}
            ${esc(item.unit)}
          </span>


          <div class="qty-control">

            <button
              data-qty-minus="${esc(item.id)}">
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              data-qty-plus="${esc(item.id)}">
              +
            </button>

          </div>

        </div>


        <div class="cart-item-total">

          ${money(
            item.price *
            item.quantity
          )}

        </div>

      </div>

      `
    ).join("");


  /* Checkout preview */

  const checkoutItems =
    document.getElementById(
      "checkoutItems"
    );

  const checkoutDelivery =
    document.getElementById(
      "checkoutDelivery"
    );

  const checkoutTotal =
    document.getElementById(
      "checkoutTotal"
    );


  if(checkoutItems){

    checkoutItems.textContent =
      totalQuantity;
  }

  if(checkoutDelivery){

    checkoutDelivery.textContent =
      delivery === 0 &&
      subtotal > 0
        ? "FREE"
        : money(delivery);
  }

  if(checkoutTotal){

    checkoutTotal.textContent =
      money(total);
  }
}


/* =========================================================
   CART OPEN
========================================================= */

function openCart(){

  const drawer =
    document.getElementById(
      "cartDrawer"
    );

  const overlay =
    document.getElementById(
      "cartOverlay"
    );


  drawer?.classList.add(
    "open"
  );

  overlay?.classList.add(
    "open"
  );

  document.body.classList.add(
    "cart-open"
  );
}


/* =========================================================
   CART CLOSE
========================================================= */

function closeCart(){

  document.getElementById(
    "cartDrawer"
  )?.classList.remove(
    "open"
  );

  document.getElementById(
    "cartOverlay"
  )?.classList.remove(
    "open"
  );

  document.body.classList.remove(
    "cart-open"
  );
}


/* =========================================================
   ORDER MODAL
========================================================= */

function openOrderModal(){

  if(CART.length === 0){

    showToast(
      "কার্ট খালি",
      "আগে একটি পণ্য কার্টে যোগ করুন।",
      false
    );

    openCart();

    return;
  }


  renderCart();


  document.getElementById(
    "orderModal"
  )?.classList.add(
    "open"
  );

  document.body.classList.add(
    "modal-open"
  );

  trackEvent(
    "begin_checkout",
    {
      value:getCartTotal(),
      items:CART.length
    }
  );
}


function closeOrderModal(){

  document.getElementById(
    "orderModal"
  )?.classList.remove(
    "open"
  );

  document.body.classList.remove(
    "modal-open"
  );
}


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateField(
  field,
  message
){

  const wrapper =
    field.closest(
      ".form-field"
    );

  const error =
    wrapper.querySelector(
      ".field-error"
    );


  if(!field.value.trim()){

    wrapper.classList.add(
      "invalid",
      "shake"
    );

    error.textContent =
      message;

    setTimeout(
      () =>
        wrapper.classList.remove(
          "shake"
        ),
      450
    );

    return false;
  }


  wrapper.classList.remove(
    "invalid"
  );

  error.textContent = "";

  return true;
}


/* =========================================================
   BANGLADESH PHONE VALIDATION
========================================================= */

function validatePhone(){

  const field =
    document.getElementById(
      "custPhone"
    );

  const wrapper =
    field.closest(
      ".form-field"
    );

  const error =
    wrapper.querySelector(
      ".field-error"
    );


  /*
    Accept:

    01XXXXXXXXX

    Also accepts spaces/hyphens
    and normalizes them.
  */

  const phone =
    field.value
      .replace(/[\s-]/g,"");


  const valid =
    /^01[3-9]\d{8}$/.test(
      phone
    );


  if(!valid){

    wrapper.classList.add(
      "invalid",
      "shake"
    );

    error.textContent =
      "সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন।";


    setTimeout(
      () =>
        wrapper.classList.remove(
          "shake"
        ),
      450
    );

    return false;
  }


  wrapper.classList.remove(
    "invalid"
  );

  error.textContent = "";

  return true;
}


/* =========================================================
   FORM SETUP
========================================================= */

function setupOrderForm(){

  const form =
    document.getElementById(
      "orderForm"
    );

  if(!form){
    return;
  }


  const name =
    document.getElementById(
      "custName"
    );

  const phone =
    document.getElementById(
      "custPhone"
    );

  const address =
    document.getElementById(
      "custAddress"
    );


  /* Real-time validation */

  name.addEventListener(
    "blur",
    () =>
      validateField(
        name,
        "আপনার নাম লিখুন।"
      )
  );


  address.addEventListener(
    "blur",
    () =>
      validateField(
        address,
        "সম্পূর্ণ ঠিকানা লিখুন।"
      )
  );


  phone.addEventListener(
    "input",
    () => {

      const cleaned =
        phone.value
          .replace(/\D/g,"")
          .slice(0,11);

      phone.value =
        cleaned;

      if(cleaned.length === 11){

        validatePhone();
      }
    }
  );


  form.addEventListener(
    "submit",
    handleOrderSubmit
  );
}


/* =========================================================
   ORDER SUBMIT
========================================================= */

function handleOrderSubmit(event){

  event.preventDefault();


  const name =
    document.getElementById(
      "custName"
    );

  const phone =
    document.getElementById(
      "custPhone"
    );

  const address =
    document.getElementById(
      "custAddress"
    );

  const payment =
    document.getElementById(
      "paymentMethod"
    );


  const validName =
    validateField(
      name,
      "আপনার নাম লিখুন।"
    );

  const validPhone =
    validatePhone();

  const validAddress =
    validateField(
      address,
      "সম্পূর্ণ ঠিকানা লিখুন।"
    );


  if(
    !validName ||
    !validPhone ||
    !validAddress
  ){

    return;
  }


  if(CART.length === 0){

    showToast(
      "কার্ট খালি",
      "অর্ডারের আগে পণ্য যোগ করুন।",
      false
    );

    return;
  }


  const subtotal =
    getCartSubtotal();

  const delivery =
    getDeliveryFee();

  const total =
    subtotal + delivery;


  /* =====================================================
     PROFESSIONAL WHATSAPP MESSAGE
  ===================================================== */

  const productLines =
    CART.map(
      (item,index) => {

        const itemTotal =
          item.price *
          item.quantity;

        return (
          `${index + 1}. ` +
          `${item.name}\n` +
          `   Qty: ${item.quantity}\n` +
          `   Price: ${money(item.price)}\n` +
          `   Subtotal: ${money(itemTotal)}`
        );

      }
    ).join("\n\n");


  const deliveryText =
    delivery === 0
      ? "FREE"
      : money(delivery);


  const message =

`━━━━━━━━━━━━━━━━━━━━
🌿 *NEW ORDER*
*Nexura Studio*
━━━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

Name:
${name.value.trim()}

Phone:
${phone.value.trim()}

Address:
${address.value.trim()}

Payment:
${payment.value}

━━━━━━━━━━━━━━━━━━━━
🛍️ *ORDER ITEMS*
━━━━━━━━━━━━━━━━━━━━

${productLines}

━━━━━━━━━━━━━━━━━━━━
💰 *ORDER SUMMARY*
━━━━━━━━━━━━━━━━━━━━

Subtotal:
${money(subtotal)}

Delivery:
${deliveryText}

*TOTAL:
${money(total)}*

━━━━━━━━━━━━━━━━━━━━
Thank you for ordering from
*Nexura Studio* 🌿`;


  const waNumber =
    String(
      C.contact?.whatsapp ||
      ""
    )
      .replace(/\D/g,"");


  if(!waNumber){

    showToast(
      "WhatsApp নম্বর সেট করা হয়নি",
      "content.json-এর contact.whatsapp চেক করুন।",
      false
    );

    return;
  }


  const whatsappURL =
    `https://wa.me/${waNumber}` +
    `?text=${encodeURIComponent(
      message
    )}`;


  /* Analytics */

  trackEvent(
    "purchase_intent",
    {
      value:total,
      currency:"BDT",
      items:CART.map(
        item => ({
          id:item.id,
          name:item.name,
          quantity:item.quantity
        })
      )
    }
  );


  /* Premium success toast */

  showToast(
    "অর্ডার প্রস্তুত!",
    "WhatsApp-এ পাঠানো হচ্ছে..."
  );


  /*
    Small delay gives the user
    enough time to see success state.
  */

  setTimeout(
    () => {

      window.open(
        whatsappURL,
        "_blank"
      );

    },
    900
  );
}


/* =========================================================
   PREMIUM TOAST
========================================================= */

function showToast(
  title,
  subtitle,
  success = true
){

  const toast =
    document.getElementById(
      "premiumToast"
    );

  if(!toast){
    return;
  }


  toast.innerHTML = `

    <div
      class="toast-check"
      style="${
        success
          ? ""
          : "background:var(--danger);color:white;"
      }">

      ${success ? "✓" : "!"}

    </div>

    <div>

      <strong>
        ${esc(title)}
      </strong>

      <span>
        ${esc(subtitle)}
      </span>

    </div>
  `;


  toast.classList.add(
    "show"
  );


  setTimeout(
    () =>
      toast.classList.remove(
        "show"
      ),
    3000
  );
}


/* =========================================================
   STICKY HEADER
========================================================= */

function setupStickyHeader(){

  const nav =
    document.querySelector(
      ".nav"
    );

  if(!nav){
    return;
  }


  const update =
    () => {

      nav.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );
    };


  window.addEventListener(
    "scroll",
    update,
    {
      passive:true
    }
  );


  update();
}


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

function setupScrollReveal(){

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if(!("IntersectionObserver" in window)){

    elements.forEach(
      element =>
        element.classList.add(
          "is-visible"
        )
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if(
              entry.isIntersecting
            ){

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }

          }
        );

      },
      {
        threshold:.12,

        rootMargin:
          "0px 0px -40px 0px"
      }
    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );
}


/* =========================================================
   PRODUCT 3D TILT
========================================================= */

function setupProductTilt(){

  /*
    Disable on touch devices.
  */

  if(
    window.matchMedia(
      "(hover: none)"
    ).matches
  ){
    return;
  }


  document
    .querySelectorAll(
      ".pick-card"
    )
    .forEach(
      card => {

        card.addEventListener(
          "pointermove",
          event => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;


            const centerX =
              rect.width / 2;

            const centerY =
              rect.height / 2;


            const rotateY =
              (
                (x - centerX) /
                centerX
              ) * 4;


            const rotateX =
              (
                (centerY - y) /
                centerY
              ) * 4;


            card.style.transform =
              `
              perspective(900px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(-5px)
              scale(1.012)
              `;
          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );
}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu(){

  const toggle =
    document.getElementById(
      "menuToggle"
    );

  const menu =
    document.getElementById(
      "mobileMenu"
    );


  if(!toggle || !menu){
    return;
  }


  toggle.addEventListener(
    "click",
    () => {

      const open =
        menu.classList.toggle(
          "open"
        );

      toggle.classList.toggle(
        "active",
        open
      );

    }
  );


  menu.addEventListener(
    "click",
    event => {

      if(
        event.target.tagName === "A"
      ){

        menu.classList.remove(
          "open"
        );

        toggle.classList.remove(
          "active"
        );
      }

    }
  );
}


/* =========================================================
   GLOBAL CLICK EVENTS
========================================================= */

function setupClickEvents(){

  document.addEventListener(
    "click",
    event => {

      /* Add to cart */

      const addButton =
        event.target.closest(
          "[data-add-cart]"
        );

      if(addButton){

        event.preventDefault();

        addToCart(
          addButton.dataset
            .productId
        );

        return;
      }


      /* Quantity minus */

      const minusButton =
        event.target.closest(
          "[data-qty-minus]"
        );

      if(minusButton){

        changeQuantity(
          minusButton.dataset
            .qtyMinus,
          -1
        );

        return;
      }


      /* Quantity plus */

      const plusButton =
        event.target.closest(
          "[data-qty-plus]"
        );

      if(plusButton){

        changeQuantity(
          plusButton.dataset
            .qtyPlus,
          1
        );

        return;
      }


      /* Order buttons */

      const orderButton =
        event.target.closest(
          ".order-btn"
        );

      if(orderButton){

        event.preventDefault();

        openOrderModal();

        return;
      }


      /* Cart icon */

      if(
        event.target.closest(
          "#cartOpenBtn"
        )
      ){

        openCart();

        return;
      }


      /* Close cart */

      if(
        event.target.closest(
          "#cartClose"
        ) ||
        event.target.closest(
          "#cartOverlay"
        )
      ){

        closeCart();

        return;
      }


      /* Checkout */

      if(
        event.target.closest(
          "#checkoutBtn"
        )
      ){

        closeCart();

        setTimeout(
          openOrderModal,
          120
        );

        return;
      }


      /* Modal close */

      if(
        event.target.closest(
          "#modalClose"
        )
      ){

        closeOrderModal();

        return;
      }


      /* Mobile cart */

      if(
        event.target.closest(
          "#mobileOrderBtn"
        )
      ){

        openOrderModal();

        return;
      }


      /* Mobile cart link */

      if(
        event.target.closest(
          "#mobileCartLink"
        )
      ){

        event.preventDefault();

        openCart();

      }

    }
  );


  /* ESC closes overlays */

  document.addEventListener(
    "keydown",
    event => {

      if(event.key === "Escape"){

        closeCart();

        closeOrderModal();

      }

    }
  );
}


/* =========================================================
   NEWSLETTER
========================================================= */

function setupNewsletter(){

  const form =
    document.getElementById(
      "newsletterForm"
    );

  if(!form){
    return;
  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      showToast(
        "ধন্যবাদ!",
        "আপনি আমাদের newsletter-এ যুক্ত হয়েছেন।"
      );

      form.reset();

    }
  );
}


/* =========================================================
   GTM
========================================================= */

function installGTM(){

  const id =
    C.tracking?.gtmId?.trim();


  if(
    !id ||
    !/^GTM-[A-Z0-9]+$/i.test(id)
  ){

    return;
  }


  if(window.__gtmInstalled){
    return;
  }


  window.__gtmInstalled =
    true;


  window.dataLayer =
    window.dataLayer || [];


  window.dataLayer.push({

    "gtm.start":
      new Date().getTime(),

    event:"gtm.js"

  });


  const script =
    document.createElement(
      "script"
    );

  script.async = true;

  script.src =
    "https://www.googletagmanager.com/gtm.js?id=" +
    encodeURIComponent(id);

  document.head.appendChild(
    script
  );
}


/* =========================================================
   ANALYTICS DATA LAYER
========================================================= */

function trackEvent(
  eventName,
  parameters = {}
){

  window.dataLayer =
    window.dataLayer || [];


  window.dataLayer.push({

    event:eventName,

    ...parameters

  });

  console.debug(
    "[Nexura Event]",
    eventName,
    parameters
  );
}


/* =========================================================
   INITIALIZE ALL PREMIUM UX
========================================================= */

function initializePremiumUX(){

  setupStickyHeader();

  setupScrollReveal();

  setupProductTilt();

  setupMobileMenu();

  setupClickEvents();

  setupNewsletter();

  setupOrderForm();
}


/* =========================================================
   START APPLICATION
========================================================= */

loadContent();
