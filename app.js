(() => {
  "use strict";

  const MOV = 200;
  const STORAGE = "smart-green-v5-dark";
  const GRAMS_PER_KIT = 500;
  const MODES = ["hub", "ondemand", "moms", "family"];

  const TEXTS = {
    en: {
      tagline: "Pack to Pan, As Healthy as You Can",
      marathiTag: "तुमचं हिरवं, स्मार्ट घर",
      selectOption: "Choose Your Order Mode",
      odTitle: "Express On-Demand",
      odBullets: ["Select exact fresh produce SKUs", "Weight-based pricing (250g - 1kg)", "Fast same-day delivery"],
      momsTitle: "Mom's Kitchen (Weekly Kids Kit)",
      momsBullets: ["Customizable kits for school tiffins", "1:1 Free Salad Allocation", "Nutritional boost tracking"],
      familyTitle: "Family Kitchen (Weekly Basket)",
      familyBullets: ["Complete household weekly staples", "Pre-cut & washed options", "Diabetes & Health Smart tags"],
      nutriSummary: "Nutritional Content Added:",
    },
    mr: {
      tagline: "पॅक टू पॅन, जितके निरोगी तितके सोपे",
      marathiTag: "तुमचं हिरवं, स्मार्ट घर",
      selectOption: "तुमचा ऑर्डर मोड निवडा",
      odTitle: "एक्सप्रेस ऑन-डिमांड",
      odBullets: ["ताजी फळे व भाज्या निवडा", "वजनानुसार किंमत (२५० ग्रॅम - १ किलो)", "त्याच दिवशी जलद डिलिव्हरी"],
      momsTitle: "मॉम्स किचन (मुलांसाठी वीकली किट)",
      momsBullets: ["टिफिनसाठी सानुकूल किट्स", "१:१ मोफत सॅलड वाटप", "पोषण मूल्य ट्रॅकिंग"],
      familyTitle: "फॅमिली किचन (साप्ताहिक बास्केट)",
      familyBullets: ["संपूर्ण घरासाठी लागणारा किराणा", "कापलेल्या व धुतलेल्या भाज्या", "आरोग्यदायी पोषण टॅग्स"],
      nutriSummary: "एकूण जोडलेले पोषण मूल्य:",
    }
  };

  const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

  const CATALOG = {
    Veggies: [
      { id: "lady-finger", name: "Lady Finger", pricePerKg: 60, photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: { iron: "2.1mg", fiber: "3.2g", cal: "33 kcal" } },
      { id: "potato", name: "Potato", pricePerKg: 36, photo: img("photo-1518977676601-b53f82aba655"), nutri: { iron: "0.8mg", fiber: "2.2g", cal: "77 kcal" } },
      { id: "tomato", name: "Tomato", pricePerKg: 48, photo: img("photo-1592924357228-91a4daadcfea"), nutri: { iron: "0.5mg", fiber: "1.2g", cal: "18 kcal" } },
      { id: "carrot", name: "Carrot", pricePerKg: 52, photo: img("photo-1598170845058-32b9d6a5da37"), nutri: { iron: "0.3mg", fiber: "2.8g", cal: "41 kcal" } },
      { id: "spinach", name: "Spinach", pricePerKg: 40, photo: img("photo-1576045057995-568f588f82fb"), nutri: { iron: "2.7mg", fiber: "2.2g", cal: "23 kcal" } },
    ],
    Fruits: [
      { id: "banana", name: "Banana", pricePerKg: 55, photo: img("photo-1571771894821-ce9b6c11b08e"), nutri: { iron: "0.3mg", fiber: "2.6g", cal: "89 kcal" } },
      { id: "apple", name: "Apple", pricePerKg: 180, photo: img("photo-1567306226416-28f0efdc88ce"), nutri: { iron: "0.1mg", fiber: "2.4g", cal: "52 kcal" } },
    ],
    Sprouts: [
      { id: "moong", name: "Moong Sprouts", pricePerKg: 120, photo: img("photo-1540420773420-3366772f4999"), nutri: { iron: "1.4mg", fiber: "1.8g", cal: "30 kcal" } },
      { id: "chana", name: "Chana Sprouts", pricePerKg: 110, photo: img("photo-1615485290382-441e4d049cb5"), nutri: { iron: "2.8mg", fiber: "3.5g", cal: "120 kcal" } },
    ]
  };

  const state = {
    screen: "splash",
    lang: "en",
    phone: "",
    user: { name: "Ananya Rao", avatar: "AR", address: "12 Palm Grove, Indiranagar", wallet: 420 },
    locationGranted: false,
    homeTab: "hub",
    numKits: 1,
    kitMode: "same",
    cart: [],
    profileOpen: false,
    delivery: { ondemand: "same-day", moms: "sun", family: "tue" },
  };

  const $ = (sel) => document.querySelector(sel);
  const screensEl = $("#screens");
  const drawerEl = $("#profile-drawer");
  const scrimEl = $("#drawer-scrim");
  const loaderEl = $("#loader");

  function save() { localStorage.setItem(STORAGE, JSON.stringify(state)); }
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE) || "{}");
      if (d.lang) state.lang = d.lang;
      if (d.phone) state.phone = d.phone;
      if (d.locationGranted) state.locationGranted = d.locationGranted;
      if (d.cart) state.cart = d.cart;
    } catch (_) {}
  }

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.hidden = false; el.textContent = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; }, 2200);
  }

  function showLoader(ms = 180) {
    loaderEl.hidden = false;
    return new Promise((r) => setTimeout(() => { loaderEl.hidden = true; r(); }, ms));
  }

  function logoSvg(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="30" width="40" height="22" rx="6" fill="#F8CB2E"/>
      <rect x="12" y="34" width="32" height="14" rx="3" fill="#121212"/>
      <circle cx="18" cy="54" r="4" fill="#F8CB2E"/>
      <circle cx="38" cy="54" r="4" fill="#F8CB2E"/>
      <rect x="28" y="14" width="18" height="26" rx="4" fill="#F36C21"/>
      <path d="M46 18c6 4 10 8 10 14a8 8 0 1 1-16 0c0-4 2-7 4-10 2 3 3 4 5 4 0-4 .5-6.5 0-8z" fill="#279B37"/>
    </svg>`;
  }

  function icon(name) {
    const paths = {
      home: `<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,
      nutri: `<path d="M12 3v18M7 8c3 0 5 2 5 5s-2 5-5 5M17 8c-3 0-5 2-5 5s2 5 5 5"/>`,
      orders: `<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/>`,
      cart: `<path d="M3 5h2l2.2 10h9.6L19 8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/>`,
      pin: `<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`,
      close: `<path d="M6 6l12 12M18 6 6 18"/>`,
      back: `<path d="M15 5 8 12l7 7"/>`,
    };
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${paths[name] || ""}</svg>`;
  }

  function cartCount() { return state.cart.reduce((n, i) => n + (i.qty || 1), 0); }
  function cartTotal() { return state.cart.reduce((n, i) => n + (i.price * (i.qty || 1)), 0); }

  async function go(screen) {
    state.screen = screen;
    if (["home"].includes(screen)) await showLoader(100);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function brandRow() {
    const t = TEXTS[state.lang];
    return `<div style="display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div class="logo-mark sm">${logoSvg(24)}</div>
        <div><h1 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Smart Green</h1>
          <p style="font-size:11px;color:var(--amber);margin:0;">${t.marathiTag}</p></div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button type="button" class="lang-btn" id="toggleLang">${state.lang === "en" ? "मराठी" : "ENG"}</button>
        <button type="button" id="openProfile" style="width:34px;height:34px;border-radius:999px;background:var(--amber);color:#121212;font-weight:800;border:none;">${state.user.avatar}</button>
      </div>
    </div>`;
  }

  function renderSplash() {
    const t = TEXTS[state.lang];
    return `<section class="screen px-6 pt-14 pb-8 justify-between">
      <div class="flex-1 flex flex-col items-center justify-center text-center">
        <div class="logo-mark mb-5" style="width:92px;height:92px;border-radius:28px">${logoSvg(58)}</div>
        <h1 class="text-4xl font-extrabold text-white">Smart Green</h1>
        <p class="mt-2 text-lg font-bold text-amber">${t.marathiTag}</p>
        <p class="mt-1 text-sm font-semibold text-ink-mute">${t.tagline}</p>
      </div>
      <button type="button" data-go="login" class="primary-cta yellow">Get Started</button>
    </section>`;
  }

  function renderLogin() {
    return `<section class="screen px-5 pt-8 pb-8">
      <div class="mb-5">${brandRow()}</div>
      <h2 class="text-2xl font-bold text-white">Welcome</h2>
      <p class="text-ink-mute font-semibold">Enter your mobile number</p>
      <div class="mt-6">
        <input id="phoneInput" type="tel" style="width:100%;height:52px;border-radius:14px;background:var(--cream-warm);border:1px solid var(--border-soft);padding:0 14px;color:#fff;font-weight:800;font-size:18px;" placeholder="Mobile Number" value="${state.phone}" />
      </div>
      <button type="button" id="sendOtp" class="primary-cta yellow mt-5">Send OTP</button>
    </section>`;
  }

  function renderOtp() {
    return `<section class="screen px-5 pt-8 pb-8">
      <h1 class="text-3xl font-extrabold text-white">Enter OTP</h1>
      <p class="text-ink-mute mt-2">Demo OTP: <strong class="text-amber">1234</strong></p>
      <div class="mt-6 flex gap-3">
        ${[0,1,2,3].map(() => `<input class="w-14 h-14 rounded-xl bg-cream-warm border border-border-soft text-center text-2xl font-bold text-white" value="1" />`).join("")}
      </div>
      <button type="button" id="verifyOtp" class="primary-cta yellow mt-6">Verify</button>
    </section>`;
  }

  function renderLocation() {
    return `<section class="screen px-5 pt-10 pb-8 justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Select Delivery Location</h1>
        <p class="text-ink-mute mt-2">Enabling GPS allows accurate slot allocation.</p>
      </div>
      <button type="button" id="grantLoc" class="primary-cta yellow">Allow Location Access</button>
    </section>`;
  }

  function renderHub() {
    const t = TEXTS[state.lang];
    return `<div class="mode-pane">
      <p style="font-size:12px;font-weight:800;color:var(--amber);text-transform:uppercase;">${t.selectOption}</p>
      
      <div class="hub-card" data-select-mode="ondemand">
        <div class="hub-title"><span>🛒 ${t.odTitle}</span><span style="color:var(--amber)">➔</span></div>
        <ul class="hub-bullets">${t.odBullets.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>

      <div class="hub-card orange-border" data-select-mode="moms">
        <div class="hub-title"><span style="color:var(--peach)">🍱 ${t.momsTitle}</span><span style="color:var(--peach)">➔</span></div>
        <ul class="hub-bullets">${t.momsBullets.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>

      <div class="hub-card green-border" data-select-mode="family">
        <div class="hub-title"><span style="color:#4ade80">🧺 ${t.familyTitle}</span><span style="color:#4ade80">➔</span></div>
        <ul class="hub-bullets">${t.familyBullets.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>
    </div>`;
  }

  function renderOnDemand() {
    const items = CATALOG.Veggies;
    return `<div class="mode-pane">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h2 style="font-size:18px;font-weight:800;color:#fff;margin:0;">On-Demand Veggies</h2>
        <button type="button" data-select-mode="hub" style="color:var(--amber);background:none;border:none;font-weight:800;">← Back to Hub</button>
      </div>
      <div class="prod-grid">${items.map(v => {
        const inCart = state.cart.some(c => c.id === v.id);
        return `<div class="prod-card">
          <div class="produce-art">${producePhoto(v)}</div>
          <div class="prod-body">
            <p class="prod-name">${v.name}</p>
            <span class="nutri-tag">⚡ ${v.nutri.iron} Iron \vert{}${v.nutri.cal}</span>
            <p class="prod-price">₹${v.pricePerKg}/kg</p>
            <button type="button" class="btn-add ${inCart ? 'added' : ''}" data-add-cart="${v.id}">${inCart ? '✓ Added' : 'Add to Cart'}</button>
          </div>
        </div>`;
      }).join("")}</div>
    </div>`;
  }

  function renderMoms() {
    return `<div class="mode-pane">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h2 style="font-size:18px;font-weight:800;color:#fff;margin:0;">Mom's Kitchen Kits</h2>
        <button type="button" data-select-mode="hub" style="color:var(--amber);background:none;border:none;font-weight:800;">← Back to Hub</button>
      </div>
      
      <div class="panel">
        <p class="panel-kicker">Number of Kits</p>
        <div style="display:flex;align-items:center;gap:14px;margin-top:8px;">
          <button type="button" id="decKits" style="width:38px;height:38px;border-radius:999px;background:#121212;color:#fff;border:1px solid var(--border-soft);font-size:18px;">-</button>
          <strong style="font-size:22px;color:var(--amber);">${state.numKits} Kit(s)</strong>
          <button type="button" id="incKits" style="width:38px;height:38px;border-radius:999px;background:#121212;color:#fff;border:1px solid var(--border-soft);font-size:18px;">+</button>
        </div>
        ${state.numKits > 1 ? `<div style="margin-top:12px;display:flex;gap:10px;">
          <button type="button" class="lang-btn ${state.kitMode==='same'?'active':''}" id="kitSame">Same Content</button>
          <button type="button" class="lang-btn ${state.kitMode==='custom'?'active':''}" id="kitCustom">Custom Content</button>
        </div>` : ''}
      </div>

      <p class="panel-kicker" style="margin-top:14px;">Horizontal Veggie Selection (Choose 6)</p>
      <div class="horizontal-card-scroll">
        ${CATALOG.Veggies.map(v => `<div class="h-card">
          <div class="produce-art mini">${producePhoto(v)}</div>
          <p style="font-size:12px;font-weight:800;color:#fff;margin:4px 0 0 0;">${v.name}</p>
          <span class="nutri-tag">${v.nutri.iron}</span>
        </div>`).join("")}
      </div>

      <button type="button" id="addMomsKit" class="primary-cta mt-4">Add Mom's Kits to Cart</button>
    </div>`;
  }

  function renderFamily() {
    return `<div class="mode-pane">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h2 style="font-size:18px;font-weight:800;color:#fff;margin:0;">Family Basket</h2>
        <button type="button" data-select-mode="hub" style="color:var(--amber);background:none;border:none;font-weight:800;">← Back to Hub</button>
      </div>

      <p class="panel-kicker">Weekly Staples & Veggies (Slide to Choose)</p>
      <div class="horizontal-card-scroll">
        ${CATALOG.Veggies.concat(CATALOG.Sprouts).map(v => `<div class="h-card selected">
          <div class="produce-art mini">${producePhoto(v)}</div>
          <p style="font-size:12px;font-weight:800;color:#fff;margin:4px 0 0 0;">${v.name}</p>
          <span class="nutri-tag">Included</span>
        </div>`).join("")}
      </div>

      <button type="button" id="addFamBasket" class="primary-cta mt-4">Add Weekly Basket to Cart</button>
    </div>`;
  }

  function producePhoto(item) {
    return `<img class="produce-img" src="${item.photo}" alt="${item.name}" />`;
  }

  function renderHome() {
    const panes = { hub: renderHub, ondemand: renderOnDemand, moms: renderMoms, family: renderFamily };
    return `<section class="screen with-nav">
      <header style="padding:10px 14px;position:sticky;top:0;z-index:25;background:rgba(18,18,18,0.95);backdrop-filter:blur(10px);">
        ${brandRow()}
      </header>
      ${(panes[state.homeTab] || renderHub)()}
      <nav class="bottom-nav">
        <button type="button" class="nav-item ${state.homeTab==='hub'?'active':''}" data-select-mode="hub">${icon("home")}<span>Hub</span></button>
        <button type="button" class="nav-item" data-go="cart">${icon("cart")}<span>Cart (${cartCount()})</span></button>
        <button type="button" class="nav-item" data-go="orders">${icon("orders")}<span>Orders</span></button>
      </nav>
    </section>`;
  }

  function renderCart() {
    const t = TEXTS[state.lang];
    return `<section class="screen">
      <header style="padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border-soft);">
        <button type="button" data-go="home" style="background:none;border:none;color:#fff;">${icon("back")}</button>
        <h1 style="font-size:18px;font-weight:800;color:#fff;margin:0;">Your Cart (${cartCount()})</h1>
      </header>
      <div style="padding:14px;">
        ${state.cart.length === 0 ? `<p style="color:var(--ink-mute);">Your cart is empty.</p>` : `
          <div class="panel">
            <p class="panel-kicker">${t.nutriSummary}</p>
            <p style="font-size:13px;color:#4ade80;font-weight:800;margin-top:4px;">🌱 Total Iron: 8.4mg | Fiber: 12.2g | 240 kcal</p>
          </div>
          ${state.cart.map(c => `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border-soft);">
            <div><strong style="color:#fff;">${c.name}</strong><br/><span style="font-size:12px;color:var(--ink-mute);">Qty: ${c.qty || 1}</span></div>
            <strong style="color:var(--amber);">₹${c.price}</strong>
          </div>`).join("")}
          <div style="margin-top:16px;display:flex;justify-content:space-between;font-size:18px;font-weight:800;color:#fff;">
            <span>Total</span><span>₹${cartTotal()}</span>
          </div>
        `}
      </div>
      ${state.cart.length > 0 ? `<div class="sticky-cta"><button type="button" id="payNow" class="primary-cta yellow">Checkout & Pay</button></div>` : ''}
    </section>`;
  }

  function renderOrders() {
    return `<section class="screen px-4 pt-4">
      <button type="button" data-go="home" style="background:none;border:none;color:#fff;margin-bottom:10px;">${icon("back")}</button>
      <h1 class="text-2xl font-bold text-white">My Orders</h1>
      <div class="panel"><p class="font-extrabold text-white">#SG-9821</p><p class="text-sm text-ink-mute">Weekly Basket · In Transit</p></div>
    </section>`;
  }

  function renderProfileDrawer() {
    return `<div class="p-4">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <h2 class="text-2xl font-bold text-white">Profile</h2>
        <button type="button" id="closeProfile" style="background:none;border:none;color:#fff;">${icon("close")}</button>
      </div>
      <p class="text-white mt-4 font-bold">${state.user.name}</p>
      <p class="text-ink-mute">${state.user.address}</p>
    </div>`;
  }

  function render() {
    const map = { splash: renderSplash, login: renderLogin, otp: renderOtp, location: renderLocation, home: renderHome, cart: renderCart, orders: renderOrders };
    screensEl.innerHTML = (map[state.screen] || renderSplash)();
    if (state.profileOpen) { drawerEl.hidden = false; scrimEl.hidden = false; drawerEl.innerHTML = renderProfileDrawer(); }
    else { drawerEl.hidden = true; scrimEl.hidden = true; drawerEl.innerHTML = ""; }
    bind();
  }

  function bind() {
    screensEl.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
    screensEl.querySelectorAll("[data-select-mode]").forEach((b) => b.addEventListener("click", () => { state.homeTab = b.dataset.selectMode; render(); }));

    $("#toggleLang")?.addEventListener("click", () => { state.lang = state.lang === "en" ? "mr" : "en"; render(); });
    $("#openProfile")?.addEventListener("click", () => { state.profileOpen = true; render(); });
    drawerEl.querySelector("#closeProfile")?.addEventListener("click", () => { state.profileOpen = false; render(); });

    $("#sendOtp")?.addEventListener("click", () => go("otp"));
    $("#verifyOtp")?.addEventListener("click", () => go("location"));
    $("#grantLoc")?.addEventListener("click", () => { state.locationGranted = true; go("home"); });

    $("#incKits")?.addEventListener("click", () => { state.numKits++; render(); });
    $("#decKits")?.addEventListener("click", () => { if (state.numKits > 1) state.numKits--; render(); });

    screensEl.querySelectorAll("[data-add-cart]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.dataset.addCart;
        const v = CATALOG.Veggies.find(x => x.id === id);
        state.cart.push({ id: v.id, name: v.name, price: v.pricePerKg, qty: 1 });
        toast("Added to Cart");
        render();
      });
    });

    $("#addMomsKit")?.addEventListener("click", () => {
      state.cart.push({ id: "moms-kit", name: `Mom's Kit (${state.numKits} Kits)`, price: 299 * state.numKits, qty: 1 });
      toast("Mom's Kits added");
      go("cart");
    });

    $("#addFamBasket")?.addEventListener("click", () => {
      state.cart.push({ id: "family-basket", name: "Weekly Family Basket", price: 499, qty: 1 });
      toast("Family Basket added");
      go("cart");
    });

    $("#payNow")?.addEventListener("click", async () => {
      await showLoader(300);
      state.cart = [];
      toast("Order Placed Successfully!");
      go("home");
    });
  }

  load();
  render();
})();
