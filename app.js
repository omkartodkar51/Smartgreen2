(() => {
  "use strict";

  const MOV = 200;
  const STORAGE = "smart-green-v4-dark";
  const GRAMS_PER_KID = 250;
  const MODES = ["ondemand", "moms", "family"];
  const MODE_META = {
    ondemand: { label: "On-Demand", desc: "Pick exactly what you need" },
    moms: { label: "Mom’s Kitchen", desc: "Kids’ weekly veggie & tiffin kits" },
    family: { label: "Family Kitchen", desc: "Complete weekly family basket" },
  };
  const img = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const CATALOG = {
    Staples: [
      { id: "rice", name: "Sona Masoori Rice", blurb: "Premium rice", pricePerKg: 170, unit: "kg", photo: img("photo-1586201375761-83865001e31c") },
      { id: "atta", name: "Whole Wheat Atta", blurb: "Stone-ground", pricePerKg: 54, unit: "kg", photo: img("photo-1574323347407-f5e1ad6d020b") },
      { id: "dal", name: "Toor Dal", blurb: "Protein staple", pricePerKg: 140, unit: "kg", photo: img("photo-1516684732162-798a0062be99") },
      { id: "oil", name: "Cold-Pressed Oil", blurb: "Kitchen essential", pricePerKg: 220, unit: "L", photo: img("photo-1474979266404-7eaacbcd87c5") },
    ],
    Veggies: [
      { id: "lady-finger", name: "Lady Finger", blurb: "Farm fresh", pricePerKg: 60, photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: "potato", name: "Potato", blurb: "Everyday staple", pricePerKg: 36, photo: img("photo-1518977676601-b53f82aba655") },
      { id: "tomato", name: "Tomato", blurb: "Vine ripened", pricePerKg: 48, photo: img("photo-1592924357228-91a4daadcfea") },
      { id: "carrot", name: "Carrot", blurb: "Sweet & crisp", pricePerKg: 52, photo: img("photo-1598170845058-32b9d6a5da37") },
      { id: "beans", name: "French Beans", blurb: "Tender pods", pricePerKg: 70, photo: img("photo-1567375698348-5d9d1edb2e83") },
      { id: "capsicum", name: "Capsicum", blurb: "Crunchy & mild", pricePerKg: 80, photo: img("photo-1563565375-f3fdfdbefa83") },
    ],
    Fruits: [
      { id: "banana", name: "Banana", blurb: "Energy fruit", pricePerKg: 55, photo: img("photo-1571771894821-ce9b6c11b08e") },
      { id: "apple", name: "Apple", blurb: "Crisp & juicy", pricePerKg: 180, photo: img("photo-1567306226416-28f0efdc88ce") },
      { id: "papaya", name: "Papaya", blurb: "Vitamin rich", pricePerKg: 45, photo: img("photo-1517282009859-f000ec3b26fe") },
      { id: "orange", name: "Orange", blurb: "Fresh citrus", pricePerKg: 90, photo: img("photo-1557800636-894a64c1696f") },
    ],
    Sprouts: [
      { id: "moong", name: "Moong Sprouts", blurb: "Protein pack", pricePerKg: 120, sproutable: true, photo: img("photo-1540420773420-3366772f4999") },
      { id: "chana", name: "Chana Sprouts", blurb: "Hearty sprouts", pricePerKg: 110, sproutable: true, photo: img("photo-1615485290382-441e4d049cb5") },
      { id: "mixed", name: "Mixed Sprouts", blurb: "Variety pack", pricePerKg: 130, sproutable: true, photo: img("photo-1512621776951-a57141f2eefd") },
      { id: "methi", name: "Methi Sprouts", blurb: "Iron boost", pricePerKg: 125, sproutable: true, photo: img("photo-1508747703725-719777637510") },
    ],
    Aromatics: [
      { id: "coriander", name: "Coriander", blurb: "Fresh bunch", pricePerKg: 40, photo: img("photo-1459411621453-7b03977f4bfc") },
      { id: "mint", name: "Mint Bunch", blurb: "Cool & aromatic", pricePerKg: 50, photo: img("photo-1622206151226-18ca2c9ab4a1") },
      { id: "ginger", name: "Ginger", blurb: "Kitchen essential", pricePerKg: 160, photo: img("photo-1599940824399-b87987ceb72a") },
      { id: "lemon", name: "Lemon", blurb: "Zesty finish", pricePerKg: 90, photo: img("photo-1590502593747-42a996133562") },
    ],
  };

  const MOMS_VEG = [
    { id: "tf-lady", name: "Lady Finger Kit", price: 45, photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "tf-spin", name: "Spinach Kit", price: 35, photo: img("photo-1576045057995-568f588f82fb") },
    { id: "tf-pot", name: "Potato Kit", price: 30, photo: img("photo-1518977676601-b53f82aba655") },
    { id: "tf-tom", name: "Tomato Kit", price: 40, photo: img("photo-1592924357228-91a4daadcfea") },
    { id: "tf-carrot", name: "Carrot Kit", price: 38, photo: img("photo-1598170845058-32b9d6a5da37") },
    { id: "tf-beans", name: "Beans Kit", price: 42, photo: img("photo-1622206151226-18ca2c9ab4a1") },
  ];

  const MOMS_EXTRAS = [
    { id: "extra-salad", name: "Extra Salad", price: 40, kind: "salad" },
    { id: "extra-veg", name: "Extra Veggie Kit", price: 60, kind: "veggie" },
    { id: "extra-fruit", name: "Premium Fruit Basket", price: 199, kind: "fruit" },
  ];

  const FAMILY_STAPLES = [
    { id: "onion", name: "Onion", pricePerKg: 40, photo: img("photo-1518977956812-cd3dbadaafcd") },
    { id: "potato", name: "Potato", pricePerKg: 36, photo: img("photo-1518977676601-b53f82aba655") },
    { id: "tomato", name: "Tomato", pricePerKg: 48, photo: img("photo-1592924357228-91a4daadcfea") },
  ];

  const ORDERS = [
    { id: "SG-2401", date: "Fri, 3 Oct", total: 486, status: "In-Transit", items: "Weekly Basket · 12 items" },
    { id: "SG-2390", date: "Tue, 30 Sep", total: 320, status: "Delivered", items: "Mom’s Kitchen · 2 kids" },
  ];

  const CUTOFF = { sun: "Friday · 11:00 PM", tue: "Sunday · 11:00 PM", fri: "Wednesday · 11:00 PM" };
  const SLOT_LABEL = { sun: "Sunday", tue: "Tuesday", fri: "Friday", "same-day": "Same-Day", scheduled: "Scheduled" };

  const state = {
    screen: "splash",
    phone: "",
    country: "+91",
    user: { name: "Ananya Rao", phone: "", avatar: "AR", address: "12 Palm Grove, Indiranagar", city: "Bengaluru 560038", wallet: 420 },
    locationGranted: false,
    homeTab: "ondemand",
    odCategory: "Veggies",
    kids: 2,
    cart: [],
    savedLater: [],
    odDraft: {},
    momsExtras: { salad: 0, veggie: 0, fruit: 0 },
    delivery: { ondemand: "same-day", moms: "sun", family: "tue" },
    payment: "upi-gpay",
    profileOpen: false,
    flagsOpen: false,
    showPropEditor: false,
    family: {
      staples: { onion: 1.5, potato: 1.5, tomato: 1 },
      veggies: {},
      leafy: { spinach: false, methi: false, dill: false },
      sproutsMode: "sprouted",
      sprouts: { moong: false, chana: false },
      extras: { fruit: false },
      inCart: false,
    },
    nutri: { iron: { delivered: 68, upcoming: 18 }, protein: { delivered: 54, upcoming: 22 }, fiber: { delivered: 72, upcoming: 14 }, points: 1240, pointsGoal: 1490 },
    cartBounce: false,
    navDir: 1,
    animatePane: false,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const screensEl = $("#screens");
  const drawerEl = $("#profile-drawer");
  const scrimEl = $("#drawer-scrim");
  const loaderEl = $("#loader");

  function persistNow() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({
        phone: state.phone, user: state.user, locationGranted: state.locationGranted,
        cart: state.cart, savedLater: state.savedLater, kids: state.kids, family: state.family,
        momsExtras: state.momsExtras, delivery: state.delivery, homeTab: state.homeTab, odDraft: state.odDraft,
      }));
    } catch (_) {}
  }

  function save() { setTimeout(persistNow, 80); }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.phone) state.phone = d.phone;
      if (d.user) Object.assign(state.user, d.user);
      if (d.locationGranted) state.locationGranted = d.locationGranted;
      if (Array.isArray(d.cart)) state.cart = d.cart;
      if (Array.isArray(d.savedLater)) state.savedLater = d.savedLater;
      if (d.kids) state.kids = d.kids;
      if (d.family) Object.assign(state.family, d.family);
      if (d.momsExtras) Object.assign(state.momsExtras, d.momsExtras);
      if (d.delivery) Object.assign(state.delivery, d.delivery);
      if (d.homeTab) state.homeTab = d.homeTab;
    } catch (_) {}
  }

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.hidden = false;
    el.textContent = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; el.textContent = ""; }, 2200);
  }

  function showLoader(ms = 220) {
    loaderEl.hidden = false;
    return new Promise((r) => setTimeout(() => { loaderEl.hidden = true; r(); }, ms));
  }

  function logoSvg(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
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
      back: `<path d="M15 5 8 12l7 7"/>`,
      support: `<path d="M12 3a7 7 0 0 0-7 7v3a3 3 0 0 0 3 3h1v-6H7a5 5 0 0 1 10 0h-2v6h1a3 3 0 0 0 3-3v-3a7 7 0 0 0-7-7z"/>`,
      close: `<path d="M6 6l12 12M18 6 6 18"/>`,
      check: `<path d="M5 12l5 5L20 7"/>`,
    };
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ""}</svg>`;
  }

  function producePhoto(item, alt = "") {
    const label = alt || item.name || "Produce";
    const fallback = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340"><rect width="400" height="340" fill="#1f1f23"/><text x="200" y="180" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#F8CB2E" font-weight="700">${label}</text></svg>`
    )}`;
    return `<img class="produce-img" alt="${label}" width="400" height="340" src="${item.photo || fallback}" onerror="this.onerror=null;this.src='${fallback}'" />`;
  }

  function cartCount() { return state.cart.reduce((n, i) => n + (i.qty || 1), 0); }
  function itemsBySource(src) { return state.cart.filter((c) => c.source === src); }
  function lineTotal(item) { return item.free ? 0 : ((item.price || 0) + (item.extraCharge || 0)) * (item.qty || 1); }
  function sectionTotal(src) { return itemsBySource(src).reduce((n, i) => n + lineTotal(i), 0); }
  function momsVegSelected() { return itemsBySource("moms").filter((c) => !c.free && !c.extraKind && MOMS_VEG.some((v) => v.id === c.id)); }

  function familyBasketValue() {
    let n = 0;
    for (const s of FAMILY_STAPLES) n += Math.round((state.family.staples[s.id] || 0) * s.pricePerKg);
    for (const id of Object.keys(state.family.veggies)) {
      const meta = CATALOG.Veggies.find((v) => v.id === id);
      if (!meta) continue;
      const prefs = state.family.veggies[id];
      n += Math.round(meta.pricePerKg * 0.5) + (prefs.cut ? 5 : 0) + (prefs.washed ? 5 : 0);
    }
    for (const on of Object.values(state.family.leafy)) if (on) n += 30;
    for (const on of Object.values(state.family.sprouts)) if (on) n += 55 + (state.family.sproutsMode === "sprouted" ? 10 : 0);
    if (state.family.extras.fruit) n += 299;
    return n;
  }

  function cartTotals() {
    const onDemand = sectionTotal("ondemand");
    const moms = sectionTotal("moms");
    const family = sectionTotal("family");
    const odDelivery = onDemand > 0 && state.delivery.ondemand === "same-day" ? 40 : 0;
    const discount = onDemand + moms + family >= 1500 ? 50 : 0;
    const subtotal = onDemand + moms + family;
    const walletUse = state.payment === "wallet" ? Math.min(state.user.wallet, Math.max(0, subtotal + odDelivery - discount)) : 0;
    return {
      onDemand, moms, family, odDelivery, discount, walletUse, subtotal,
      total: Math.max(0, subtotal + odDelivery - discount - walletUse),
      movMet: onDemand === 0 || onDemand >= MOV,
      movShort: Math.max(0, MOV - onDemand),
      movPct: Math.min(100, Math.round((onDemand / MOV) * 100)),
    };
  }

  function upsertCart(item) {
    const idx = state.cart.findIndex((c) => c.key === item.key);
    if (idx >= 0) state.cart[idx] = { ...state.cart[idx], ...item };
    else state.cart.push(item);
    state.cartBounce = true;
    save();
  }
  function removeCart(key) { state.cart = state.cart.filter((c) => c.key !== key); save(); }

  async function go(screen, opts = {}) {
    state.screen = screen;
    state.profileOpen = false;
    save();
    if (["home", "cart", "checkout"].includes(screen) && !opts.silent) await showLoader(100);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navBar(active) {
    const tabs = [["home", "Home", "home"], ["nutri", "Nutri-Tracker", "nutri"], ["orders", "My Orders", "orders"]];
    return `<nav class="bottom-nav" aria-label="Primary">${tabs.map(([id, label, ic]) => `
      <button type="button" class="nav-item ${active === id ? "active" : ""}" data-go="${id}">${icon(ic)}<span>${label}</span></button>`).join("")}</nav>`;
  }

  function profileBtn() {
    return `<button type="button" id="openProfile" class="avatar-btn" aria-label="Open profile">${state.user.avatar}</button>`;
  }

  function brandRow(withProfile = true) {
    return `<div class="brand-row">
      <div class="brand-left">
        <div class="logo-mark sm shrink-0">${logoSvg(26)}</div>
        <div class="min-w-0">
          <h1 class="brand-title">Smart Green</h1>
          <p class="font-mr brand-tag">तुमचं हिरवं, स्मार्ट घर</p>
        </div>
      </div>
      ${withProfile ? profileBtn() : ""}
    </div>`;
  }

  function stickyCartBar() {
    if (!cartCount() || state.screen !== "home") return "";
    const t = cartTotals();
    return `<div class="sticky-cart"><button type="button" data-go="cart" class="sticky-cart-btn">
      <span class="sticky-cart-left"><span class="sticky-cart-icon">${icon("cart")}<em>${cartCount()}</em></span>
      <span><strong>${cartCount()} items · ₹${t.subtotal + t.odDelivery}</strong><small>View Cart</small></span></span>
      <span class="sticky-cart-cta">View Cart</span></button></div>`;
  }

  function renderSplash() {
    return `<section class="screen px-6 pt-14 pb-8 justify-between">
      <div class="flex-1 flex flex-col items-center justify-center text-center">
        <div class="logo-mark mb-5" style="width:92px;height:92px;border-radius:28px">${logoSvg(58)}</div>
        <h1 class="font-display text-4xl font-semibold tracking-tight text-white">Smart Green</h1>
        <p class="font-mr mt-2 text-lg font-bold text-amber">तुमचं हिरवं, स्मार्ट घर</p>
        <p class="mt-2 text-sm font-bold text-ink-mute">Pack to Pan, As Healthy as You Can</p>
      </div>
      <button type="button" data-go="login" class="w-full h-14 rounded-2xl bg-amber text-black font-extrabold text-lg shadow-lift">Get Started</button>
    </section>`;
  }

  function renderLogin() {
    return `<section class="screen px-5 pt-8 pb-8">
      <div class="mb-5">${brandRow(false)}</div>
      <h2 class="font-display text-2xl font-semibold text-white">Welcome back</h2>
      <p class="mt-1 text-ink-mute font-semibold text-[15px]">Login with your mobile number</p>
      <div class="mt-6">
        <div class="phone-field" id="phoneField">
          <div class="flag-chip"><span class="flag-emoji">🇮🇳</span><span class="font-extrabold">+91</span></div>
          <div class="float-wrap">
            <input id="phoneInput" type="tel" inputmode="numeric" maxlength="10" placeholder=" " value="${state.phone}" />
            <label for="phoneInput">Mobile number</label>
          </div>
        </div>
      </div>
      <button type="button" id="sendOtp" class="mt-5 w-full h-14 rounded-2xl bg-amber text-black font-extrabold text-lg shadow-lift">Send OTP</button>
      <button type="button" id="skipLoc" class="mt-4 w-full h-12 font-bold text-ink-mute">Skip to App</button>
    </section>`;
  }

  function renderOtp() {
    return `<section class="screen px-5 pt-8 pb-8">
      <button type="button" data-go="login" class="text-ink-mute mb-4">${icon("back")}</button>
      <h1 class="font-display text-3xl font-semibold text-white">Enter OTP</h1>
      <p class="mt-2 text-ink-mute font-semibold text-lg">Use demo code: <span class="text-amber font-bold">1234</span></p>
      <div class="mt-8 flex gap-3 justify-between">
        ${[0,1,2,3].map((i) => `<input data-otp="${i}" maxlength="1" inputmode="numeric" class="w-16 h-16 rounded-2xl bg-cream-warm border border-border-soft text-center text-2xl font-extrabold text-white" />`).join("")}
      </div>
      <button type="button" id="verifyOtp" class="mt-8 w-full h-14 rounded-2xl bg-amber text-black font-extrabold text-lg">Verify & Continue</button>
    </section>`;
  }

  function renderLocation() {
    return `<section class="screen px-5 pt-10 pb-8 justify-between">
      <div>
        <div class="logo-mark sm mb-4">${logoSvg(26)}</div>
        <h1 class="font-display text-[1.85rem] leading-tight font-semibold text-white">Enable Location</h1>
        <p class="mt-3 text-[16px] text-ink-mute leading-relaxed font-semibold">We use your location to find the nearest dark-store and ensure fast delivery.</p>
      </div>
      <div class="space-y-3">
        <button type="button" id="grantLoc" class="w-full h-14 rounded-2xl bg-amber text-black font-extrabold text-lg">Allow Location</button>
      </div>
    </section>`;
  }

  function journeySwitcher() {
    const idx = MODES.indexOf(state.homeTab);
    return `<div class="journey-wrap">
      <div class="journey-track">
        ${MODES.map((id) => `<button type="button" data-home-tab="${id}" class="journey-btn ${state.homeTab === id ? "active" : ""}"><span>${MODE_META[id].label}</span></button>`).join("")}
      </div>
      <p class="journey-desc">${MODE_META[state.homeTab].desc}</p>
    </div>`;
  }

  function draftFor(id) { return state.odDraft[id] || { weight: 500, cut: false, washed: false, sprouted: false, qty: 1 }; }
  function odUnitPrice(item, draft) { return Math.round(item.pricePerKg * (draft.weight / 1000)) + (draft.sprouted ? 10 : 0) + (draft.cut ? 5 : 0) + (draft.washed ? 5 : 0); }

  function odCard(item) {
    const key = `od:${item.id}`;
    const inCart = state.cart.find((c) => c.key === key);
    const draft = inCart ? { weight: inCart.weight, cut: !!inCart.cut, washed: !!inCart.washed, sprouted: !!inCart.sprouted, qty: inCart.qty || 1 } : draftFor(item.id);
    const price = odUnitPrice(item, draft);
    return `<article class="prod-card ${inCart ? "is-added" : ""}">
      <div class="produce-art relative">${producePhoto(item)}${inCart ? `<span class="added-chip">✓ Added</span>` : ""}</div>
      <div class="prod-body">
        <h3 class="prod-name">${item.name}</h3>
        <p class="prod-blurb">${item.blurb}</p>
        <div class="variant-row">${[250,500,1000].map((g) => `<button type="button" class="qty-chip ${draft.weight === g ? "active" : ""}" data-od-weight="${item.id}" data-g="${g}">${g >= 1000 ? '1kg' : g + 'g'}</button>`).join("")}</div>
        <div class="price-row"><strong class="prod-price">₹${price}</strong></div>
        <button type="button" class="btn-add" data-od-add="${item.id}">${inCart ? "Update Cart" : "Add to Cart"}</button>
      </div>
    </article>`;
  }

  function movPanel() {
    const t = cartTotals();
    return `<div class="mov-panel ${t.onDemand >= MOV ? "met" : ""}">
      <div class="mov-head"><span>ON-DEMAND CART</span><strong>₹${t.onDemand} / ₹${MOV}</strong></div>
      <div class="mov-track"><div class="mov-fill" style="width:${t.movPct}%"></div></div>
      <p class="mov-msg">${t.onDemand >= MOV ? "✓ Minimum ₹200 reached" : `₹${t.movShort} more to unlock checkout`}</p>
    </div>`;
  }

  function renderOnDemandPane() {
    const cats = Object.keys(CATALOG);
    const items = CATALOG[state.odCategory];
    return `<div class="mode-pane">
      ${movPanel()}
      <div class="pill-scroll mt-3">${cats.map((c) => `<button type="button" data-od-cat="${c}" class="cat-pill ${state.odCategory === c ? "active" : ""}">${c}</button>`).join("")}</div>
      <div class="prod-grid">${items.map(odCard).join("")}</div>
    </div>`;
  }

  function renderMomsPane() {
    const n = momsVegSelected().length;
    return `<div class="mode-pane">
      <div class="mode-hero"><h2>Mom’s Kitchen</h2><p>Smart weekly veggie kits</p></div>
      <section class="panel">
        <p class="panel-kicker">Children</p><p class="panel-title">How many children?</p>
        <div class="kids-stepper">
          <button type="button" data-kids="-1" class="step-btn">−</button>
          <div class="kids-count"><strong>${state.kids}</strong><span>children</span></div>
          <button type="button" data-kids="1" class="step-btn">+</button>
        </div>
      </section>
      <section class="panel">
        <div class="panel-row"><div><p class="panel-kicker">Veggie Kits</p><h3 class="panel-title">Choose your kits</h3></div><span class="count-pill ${n >= 6 ? "ok" : ""}">${n} / 6</span></div>
        <div class="kit-grid">${MOMS_VEG.map((item) => {
          const on = !!state.cart.find((c) => c.key === `moms:${item.id}`);
          return `<button type="button" data-moms-toggle="${item.id}" class="kit-card ${on ? "selected" : ""}">
            <div class="produce-art mini">${producePhoto(item)}</div>${on ? `<span class="sel-check">✓</span>` : ""}
            <p class="kit-name">${item.name}</p>
          </button>`;
        }).join("")}</div>
      </section>
      <button type="button" id="reviewMomsKit" class="primary-cta">Review My Kit in Cart</button>
    </div>`;
  }

  function renderFamilyPane() {
    const value = familyBasketValue();
    return `<div class="mode-pane">
      <div class="mode-hero"><h2>Family Kitchen</h2><p>Weekly family basket</p></div>
      <section class="included-panel">
        <div class="included-head"><h3>Standard Basket</h3><span class="badge-included">Included</span></div>
        <div class="staple-summary">${FAMILY_STAPLES.map((s) => `<div><span>${s.name}</span><strong>${state.family.staples[s.id]}kg</strong></div>`).join("")}</div>
        <p class="basket-value">Total Value: <strong>₹${value}</strong></p>
      </section>
      <button type="button" id="addFamilyBasket" class="primary-cta">Add Weekly Basket to Cart</button>
    </div>`;
  }

  function renderHome() {
    const panes = { ondemand: renderOnDemandPane, moms: renderMomsPane, family: renderFamilyPane };
    return `<section class="screen with-nav with-sticky-cart">
      <header class="home-header">
        ${brandRow(true)}
        <div class="loc-row">
          <button type="button" class="loc-chip" data-go="location">
            <span class="text-amber">${icon("pin")}</span>
            <span class="min-w-0 flex-1 text-left"><span class="loc-kicker">Delivering to</span>
              <span class="loc-line">${state.user.address}</span></span>
          </button>
          <button type="button" class="cart-mini" data-go="cart">${icon("cart")}${cartCount() ? `<em>${cartCount()}</em>` : ""}</button>
        </div>
        ${journeySwitcher()}
      </header>
      <div class="swipe-stage">${panes[state.homeTab]()}</div>
      ${stickyCartBar()}
      ${navBar("home")}
    </section>`;
  }

  function renderCart() {
    const t = cartTotals();
    return `<section class="screen">
      <header class="page-header">
        <button type="button" data-go="home" class="icon-back">${icon("back")}</button>
        <div class="flex-1"><h1>Your Cart</h1><p>${cartCount()} items</p></div>
      </header>
      <div class="page-body cart-body">
        ${!state.cart.length ? `<div class="empty-cart"><h2>Your cart is empty</h2><p>Add fresh items to get started.</p></div>` : `
        <section class="cart-sec">
          <div class="cart-sec-head"><div><h2>Cart Items</h2></div><strong>₹${t.subtotal}</strong></div>${state.cart.map((item) => `<article class="cart-item">
            <div class="cart-item-top"><div><p class="ci-name">${item.name}</p><p class="ci-meta">${item.meta || ''}</p></div><p class="ci-price">₹${lineTotal(item)}</p></div>
            <div class="ci-links"><button type="button" data-remove="${item.key}">Remove</button></div>
          </article>`).join("")}
        </section>
        <section class="summary-panel">
          <div class="sum-total"><span>TOTAL</span><strong>₹${t.subtotal}</strong></div>
        </section>`}
      </div>
      ${state.cart.length ? `<div class="sticky-cta"><button type="button" id="toCheckout" class="primary-cta flat">Proceed to Checkout</button></div>` : ""}
    </section>`;
  }

  function renderCheckout() {
    const t = cartTotals();
    return `<section class="screen">
      <header class="page-header"><button type="button" data-go="cart" class="icon-back">${icon("back")}</button><div class="flex-1"><h1>Checkout</h1></div></header>
      <div class="page-body" style="display:grid;gap:12px">
        <article class="panel"><p class="panel-kicker">Payment</p><p class="panel-title">Total: ₹${t.total}</p></article>
      </div>
      <div class="sticky-cta"><button type="button" id="payConfirm" class="primary-cta flat">Pay & Confirm</button></div>
    </section>`;
  }

  function renderSuccess() {
    return `<section class="screen px-6 pt-16 pb-8 items-center text-center">
      <div class="logo-mark mb-4" style="width:72px;height:72px;border-radius:22px">${logoSvg(44)}</div>
      <h1 class="font-display text-3xl font-semibold text-white">Order Confirmed!</h1>
      <p class="text-amber font-bold mt-2">तुमचं हिरवं, स्मार्ट घर</p>
      <button type="button" data-go="home" class="mt-8 w-full h-14 rounded-2xl bg-amber text-black font-extrabold text-lg">Continue Shopping</button>
    </section>`;
  }

  function renderNutri() {
    return `<section class="screen with-nav px-4 pt-4 pb-4">
      <h1 class="font-display text-3xl font-semibold text-white">Nutri-Tracker</h1>
      <article class="panel mt-3"><h2 class="font-extrabold text-lg text-amber">Green Champion</h2><p class="text-ink-mute">Points: 1,240</p></article>
      ${navBar("nutri")}
    </section>`;
  }

  function renderOrders() {
    return `<section class="screen with-nav px-4 pt-4 pb-4">
      <h1 class="font-display text-3xl font-semibold text-white">My Orders</h1>
      <div class="mt-3" style="display:grid;gap:10px">${ORDERS.map((o) => `<article class="panel"><p class="font-extrabold text-white">${o.id}</p><p class="text-sm text-ink-mute">${o.date} · ₹${o.total}</p><span class="status-tag status-transit mt-2">${o.status}</span></article>`).join("")}</div>
      ${navBar("orders")}
    </section>`;
  }

  function renderProfileDrawer() {
    return `<div class="p-4">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h2 class="font-display text-2xl font-semibold text-white">Profile</h2>
        <button type="button" id="closeProfile" class="icon-back">${icon("close")}</button>
      </div>
      <div class="rounded-2xl bg-cream-warm p-4 border border-border-soft">
        <p class="font-extrabold text-xl text-white">${state.user.name}</p>
        <p class="text-ink-mute">Wallet: ₹${state.user.wallet}</p>
      </div>
      <button type="button" id="logout" class="mt-4 w-full h-12 rounded-2xl text-amber font-bold bg-cream-warm border border-border-soft">Log out</button>
    </div>`;
  }

  function render() {
    const map = {
      splash: renderSplash, login: renderLogin, otp: renderOtp, location: renderLocation,
      home: renderHome, cart: renderCart, checkout: renderCheckout, success: renderSuccess,
      nutri: renderNutri, orders: renderOrders,
    };
    screensEl.innerHTML = (map[state.screen] || renderSplash)();
    if (state.profileOpen) {
      drawerEl.hidden = false; scrimEl.hidden = false; drawerEl.innerHTML = renderProfileDrawer();
    } else {
      drawerEl.hidden = true; scrimEl.hidden = true; drawerEl.innerHTML = "";
    }
    bind();
  }

  function bind() {
    screensEl.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
    $("#openProfile")?.addEventListener("click", () => { state.profileOpen = true; render(); });
    drawerEl.querySelector("#closeProfile")?.addEventListener("click", () => { state.profileOpen = false; render(); });
    scrimEl.onclick = () => { state.profileOpen = false; render(); };
    drawerEl.querySelector("#logout")?.addEventListener("click", () => { state.locationGranted = false; state.profileOpen = false; go("splash"); });

    $("#sendOtp")?.addEventListener("click", () => {
      state.phone = $("#phoneInput")?.value || "9876543210";
      if (state.phone.length < 10) return toast("Enter 10-digit number");
      go("otp");
    });
    $("#verifyOtp")?.addEventListener("click", () => go("location"));
    $("#skipLoc")?.addEventListener("click", () => { state.locationGranted = true; go("home"); });
    $("#grantLoc")?.addEventListener("click", () => { state.locationGranted = true; go("home"); });

    screensEl.querySelectorAll("[data-home-tab]").forEach((b) => b.addEventListener("click", () => { state.homeTab = b.dataset.homeTab; render(); }));
    screensEl.querySelectorAll("[data-od-cat]").forEach((b) => b.addEventListener("click", () => { state.odCategory = b.dataset.odCat; render(); }));
    screensEl.querySelectorAll("[data-od-weight]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.dataset.odWeight; const g = Number(b.dataset.g);
        state.odDraft[id] = { ...(state.odDraft[id] || { cut: false, washed: false, sprouted: false, qty: 1 }), weight: g };
        render();
      });
    });
    screensEl.querySelectorAll("[data-od-add]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.dataset.odAdd;
        const meta = Object.values(CATALOG).flat().find((x) => x.id === id);
        const draft = state.odDraft[id] || { weight: 500, cut: false, washed: false, sprouted: false, qty: 1 };
        upsertCart({
          key: `od:${id}`, id, name: meta.name, source: "ondemand", weight: draft.weight, qty: draft.qty,
          price: Math.round(meta.pricePerKg * (draft.weight / 1000)), meta: `${draft.weight >= 1000 ? '1kg' : draft.weight + 'g'}`,
        });
        toast("Added to cart"); render();
      });
    });
    screensEl.querySelectorAll("[data-moms-toggle]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.dataset.momsToggle; const key = `moms:${id}`; const meta = MOMS_VEG.find((v) => v.id === id);
        if (state.cart.find((c) => c.key === key)) removeCart(key);
        else upsertCart({ key, id, name: meta.name, source: "moms", price: meta.price, weight: state.kids * GRAMS_PER_KID, qty: 1, meta: `Kit · ${state.kids * GRAMS_PER_KID}g` });
        render();
      });
    });
    $("#reviewMomsKit")?.addEventListener("click", () => go("cart"));
    $("#addFamilyBasket")?.addEventListener("click", () => {
      upsertCart({ key: "family:basket", name: "Weekly Family Basket", source: "family", price: familyBasketValue(), qty: 1, meta: "Complete weekly basket" });
      toast("Weekly basket added"); go("cart");
    });
    screensEl.querySelectorAll("[data-remove]").forEach((b) => b.addEventListener("click", () => { removeCart(b.dataset.remove); render(); }));
    $("#toCheckout")?.addEventListener("click", () => go("checkout"));
    $("#payConfirm")?.addEventListener("click", async () => {
      await showLoader(300); state.cart = []; save(); go("success");
    });
    screensEl.querySelectorAll("[data-kids]").forEach((b) => {
      state.kids = Math.min(6, Math.max(1, state.kids + Number(b.dataset.kids))); render();
    });
  }

  load();
  render();
})();
