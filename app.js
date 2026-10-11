(() => {
  "use strict";

  const MOV = 200;
  const STORAGE = "smart-green-v5";
  const GRAMS_PER_KID = 250;
  const MODES = ["ondemand", "moms", "family"];
  const MODE_META = {
    ondemand: { label: "On-Demand", desc: "Pick exactly what you need" },
    moms: { label: "Mom’s Kitchen", desc: "Kids’ weekly veggie & tiffin kits" },
    family: { label: "Family Kitchen", desc: "Complete weekly family basket" },
  };
  const img = (id, w = 600) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const CATALOG = {
    Staples: [
      { id: "rice", name: "Sona Masoori Rice", blurb: "Premium rice", pricePerKg: 170, unit: "kg", hue: "#f0e6c8", accent: "#b89b54", photo: img("photo-1586201375761-83865001e31c"), nutri: "Carbs & Energy · Low glycemic index" },
      { id: "atta", name: "Whole Wheat Atta", blurb: "Stone-ground", pricePerKg: 54, unit: "kg", hue: "#e8d4a8", accent: "#8d6e3a", photo: img("photo-1574323347407-f5e1ad6d020b"), nutri: "High Dietary Fiber · Good for Digestion" },
      { id: "dal", name: "Toor Dal", blurb: "Protein staple", pricePerKg: 140, unit: "kg", hue: "#f3d27a", accent: "#b8860b", photo: img("photo-1516684732162-798a0062be99"), nutri: "Plant Protein & Iron · Heart Healthy" },
      { id: "oil", name: "Cold-Pressed Oil", blurb: "Kitchen essential", pricePerKg: 220, unit: "L", hue: "#f7e38a", accent: "#c9a227", photo: img("photo-1474979266404-7eaacbcd87c5"), nutri: "Healthy Fats · Zero Trans Fat" },
    ],
    Veggies: [
      { id: "lady-finger", name: "Lady Finger", blurb: "Farm fresh", pricePerKg: 60, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: "Rich in Folate & Vitamin C · Diabetes Friendly", bpSafe: true },
      { id: "potato", name: "Potato", blurb: "Everyday staple", pricePerKg: 36, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: "Potassium & Energy · ⚠️ Moderate starch (Caution for strict diabetes)", diabetesWarn: true },
      { id: "tomato", name: "Tomato", blurb: "Vine ripened", pricePerKg: 48, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: "Lycopene & Antioxidants · Great for Skin & Heart", bpSafe: true },
      { id: "carrot", name: "Carrot", blurb: "Sweet & crisp", pricePerKg: 52, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: "Beta-Carotene & Vitamin A · Supports Vision", bpSafe: true },
      { id: "beans", name: "French Beans", blurb: "Tender pods", pricePerKg: 70, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1567375698348-5d9d1edb2e83"), nutri: "Dietary Fiber & Plant Iron · Blood Sugar Regulation", bpSafe: true },
      { id: "capsicum", name: "Capsicum", blurb: "Crunchy & mild", pricePerKg: 80, hue: "#c9a227", accent: "#8a6a12", photo: img("photo-1563565375-f3fdfdbefa83"), nutri: "Vitamin C & Metabolism Boost", bpSafe: true },
    ],
    Fruits: [
      { id: "banana", name: "Banana", blurb: "Energy fruit", pricePerKg: 55, hue: "#ffe082", accent: "#f9a825", photo: img("photo-1571771894821-ce9b6c11b08e"), nutri: "Potassium & Instant Energy" },
      { id: "apple", name: "Apple", blurb: "Crisp & juicy", pricePerKg: 180, hue: "#e57373", accent: "#c62828", photo: img("photo-1567306226416-28f0efdc88ce"), nutri: "Pectin Fiber & Low GI · Heart Friendly" },
      { id: "papaya", name: "Papaya", blurb: "Vitamin rich", pricePerKg: 45, hue: "#ffb74d", accent: "#ef6c00", photo: img("photo-1517282009859-f000ec3b26fe"), nutri: "Papain Enzyme · Excellent for Digestion" },
      { id: "orange", name: "Orange", blurb: "Fresh citrus", pricePerKg: 90, hue: "#ffa726", accent: "#ef6c00", photo: img("photo-1557800636-894a64c1696f"), nutri: "High Vitamin C & Immunity Support" },
    ],
  };

  const MOMS_VEG = [
    { id: "tf-lady", name: "Lady Finger Kit", price: 45, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: "Folate & Vitamin C for Brain Development" },
    { id: "tf-spin", name: "Spinach Kit", price: 35, hue: "#8a9e5a", accent: "#556b2f", photo: img("photo-1576045057995-568f588f82fb"), nutri: "Iron & Calcium for Bone & Blood Strength" },
    { id: "tf-pot", name: "Potato Kit", price: 30, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: "Energy-dense Carbs for Active Kids" },
    { id: "tf-tom", name: "Tomato Kit", price: 40, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: "Vitamin C & Antioxidants for Immunity" },
    { id: "tf-carrot", name: "Carrot Kit", price: 38, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: "Vitamin A for Sharp Vision & Growth" },
    { id: "tf-beans", name: "Beans Kit", price: 42, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1622206151226-18ca2c9ab4a1"), nutri: "Dietary Fiber & Plant Protein for Muscles" },
  ];

  const state = {
    screen: "splash",
    phone: "",
    user: { name: "Ananya Rao", phone: "", avatar: "AR", address: "12 Palm Grove, Indiranagar", city: "Bengaluru 560038", wallet: 420 },
    locationGranted: false,
    homeTab: "ondemand",
    odCategory: "Veggies",
    kids: 2,
    childMode: "double",
    childNames: { 1: "Kit 1", 2: "Kit 2", 3: "Kit 3", 4: "Kit 4" },
    childSeparateVeggies: { 1: {}, 2: {} },
    cart: [],
    odDraft: {},
    family: {
      staples: { onion: 1.5, potato: 1.5, tomato: 1 },
      veggies: {},
      leafy: { spinach: false, methi: false, dill: false },
      sprouts: { moong: false, chana: false },
      extras: { fruit: false },
    },
    navDir: 1,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const screensEl = $("#screens");
  const loaderEl = $("#loader");

  const TITLES = {
    splash: "Smart Green",
    login: "Login · Smart Green",
    otp: "Enter OTP · Smart Green",
    location: "Location · Smart Green",
    hub: "Choose Journey · Smart Green",
    home: "Home · Smart Green",
    cart: "Your Cart · Smart Green",
    checkout: "Checkout · Smart Green",
    nutri: "Nutri-Tracker · Smart Green",
    orders: "My Orders · Smart Green",
  };

  let renderTimer = 0;

  function persistNow() {
    try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (_) {}
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      const d = JSON.parse(raw);
      Object.assign(state, d);
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

  function showLoader(ms = 150) {
    if (!loaderEl) return Promise.resolve();
    loaderEl.hidden = false;
    return new Promise((r) => setTimeout(() => { loaderEl.hidden = true; r(); }, ms));
  }

  function setTitle() {
    document.title = TITLES[state.screen] || TITLES.splash;
  }

  function priceForWeight(pricePerKg, grams) { return Math.round(pricePerKg * (grams / 1000)); }

  function logoSvg(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none"><rect x="8" y="30" width="40" height="22" rx="6" fill="#C4785A"/><rect x="12" y="34" width="32" height="14" rx="3" fill="#F8EBD3"/><circle cx="18" cy="54" r="4" fill="#212529"/><circle cx="38" cy="54" r="4" fill="#212529"/><rect x="28" y="14" width="18" height="26" rx="4" fill="#212529"/></svg>`;
  }

  function icon(name) {
    const paths = {
      home: `<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,
      nutri: `<path d="M12 3v18M7 8c3 0 5 2 5 5s-2 5-5 5M17 8c-3 0-5 2-5 5s2 5 5 5"/>`,
      orders: `<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/>`,
      cart: `<path d="M3 5h2l2.2 10h9.6L19 8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/>`,
      pin: `<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`,
      back: `<path d="M15 5 8 12l7 7"/>`,
    };
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${paths[name] || ""}</svg>`;
  }

  function producePhoto(item) {
    const fallback = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340"><rect width="400" height="340" fill="#FFF6E8"/><text x="200" y="180" text-anchor="middle" font-size="24" fill="#212529">${item.name || "Produce"}</text></svg>`)}`;
    return `<img class="produce-img" alt="${item.name || ""}" src="${item.photo || fallback}" onerror="this.onerror=null;this.src='${fallback}'"/>`;
  }

  function cartCount() { return state.cart.reduce((n, i) => n + (i.qty || 1), 0); }
  function itemsBySource(src) { return state.cart.filter((c) => c.source === src); }
  function sectionTotal(src) { return itemsBySource(src).reduce((n, i) => n + ((i.price || 0) * (i.qty || 1)), 0); }

  function cartTotals() {
    const onDemand = sectionTotal("ondemand");
    const moms = sectionTotal("moms");
    const family = sectionTotal("family");
    const subtotal = onDemand + moms + family;
    return { onDemand, moms, family, subtotal };
  }

  function upsertCart(item) {
    const idx = state.cart.findIndex((c) => c.key === item.key);
    if (idx >= 0) state.cart[idx] = { ...state.cart[idx], ...item };
    else state.cart.push(item);
    persistNow();
  }
  function removeCart(key) { state.cart = state.cart.filter((c) => c.key !== key); persistNow(); }

  async function go(screen, opts = {}) {
    state.screen = screen;
    persistNow();
    if (!opts.silent) await showLoader(80);
    scheduleRender();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navBar(active) {
    const tabs = [["hub", "Hub", "home"], ["nutri", "Nutri-Tracker", "nutri"], ["orders", "My Orders", "orders"]];
    return `<nav class="bottom-nav">${tabs.map(([id, label, ic]) => `<button type="button" class="nav-item ${active === id ? "active" : ""}" data-go="${id}">${icon(ic)}<span>${label}</span></button>`).join("")}</nav>`;
  }

  function brandRow() {
    return `<div class="brand-row"><div class="brand-left"><div class="logo-mark sm">${logoSvg(26)}</div><div><h1 class="brand-title">Smart Green</h1><p class="font-mr brand-tag">तुमचं हिरवं, स्मार्ट घर</p></div></div></div>`;
  }

  function renderSplash() {
    return `<section class="screen px-6 pt-14 pb-8 justify-between">
      <div class="flex-1 flex flex-col items-center justify-center text-center">
        <div class="logo-mark mb-5" style="width:92px;height:92px;border-radius:28px">${logoSvg(58)}</div>
        <h1 class="font-display text-4xl font-semibold">Smart Green</h1>
        <p class="font-mr mt-2 text-lg font-bold text-terra-deep">तुमचं हिरवं, स्मार्ट घर</p>
      </div>
      <button type="button" data-go="login" class="w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg">Get Started</button>
    </section>`;
  }

  function renderLogin() {
    return `<section class="screen px-5 pt-8 pb-8">
      ${brandRow()}
      <h2 class="font-display text-2xl font-semibold mt-4">Welcome back</h2>
      <div class="mt-6"><input id="phoneInput" type="tel" maxlength="10" placeholder="Mobile number" class="w-full h-14 px-4 rounded-xl border border-black/10 text-lg font-bold" value="${state.phone}" /></div>
      <button type="button" id="sendOtp" class="mt-5 w-full h-14 rounded-2xl bg-peach text-ink font-extrabold text-lg">Send OTP</button>
    </section>`;
  }

  function renderOtp() {
    return `<section class="screen px-5 pt-8 pb-8">
      <h1 class="font-display text-3xl font-semibold">Enter OTP</h1>
      <p class="mt-2 text-ink-mute">Demo OTP: 1234</p>
      <div class="mt-6"><input id="otpInput" type="text" maxlength="4" placeholder="1234" class="w-full h-14 px-4 rounded-xl border border-black/10 text-center text-2xl font-extrabold" /></div>
      <button type="button" id="verifyOtp" class="mt-6 w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg">Verify & Continue</button>
    </section>`;
  }

  function renderHub() {
    return `<section class="screen with-nav px-5 pt-6 pb-12">
      ${brandRow()}
      <h1 class="font-display text-2xl font-semibold mt-4 mb-4">What would you like to plan?</h1>
      <div class="space-y-4">
        <button type="button" data-hub-mode="ondemand" class="w-full text-left p-4 rounded-2xl bg-white border border-black/10 shadow-card block">
          <span class="text-xs font-extrabold uppercase text-amber-deep">⚡ Express Shopping</span>
          <h2 class="font-display text-xl font-semibold mt-1">On-Demand Grocery</h2>
        </button>
        <button type="button" data-hub-mode="moms" class="w-full text-left p-4 rounded-2xl bg-white border border-black/10 shadow-card block">
          <span class="text-xs font-extrabold uppercase text-amber-deep">👧 Kids Special & Tiffins</span>
          <h2 class="font-display text-xl font-semibold mt-1">Mom’s Kitchen</h2>
        </button>
        <button type="button" data-hub-mode="family" class="w-full text-left p-4 rounded-2xl bg-white border border-black/10 shadow-card block">
          <span class="text-xs font-extrabold uppercase text-amber-deep">🩺 Health-Smart Family Basket</span>
          <h2 class="font-display text-xl font-semibold mt-1">Family Kitchen</h2>
        </button>
      </div>
      ${navBar("hub")}
    </section>`;
  }

  function renderOnDemandPane() {
    const items = CATALOG[state.odCategory] || [];
    return `<div class="mode-pane">
      <div class="pill-scroll mb-3">${Object.keys(CATALOG).map((c) => `<button type="button" data-od-cat="${c}" class="cat-pill ${state.odCategory === c ? "active" : ""}">${c}</button>`).join("")}</div>
      <div class="prod-grid">${items.map((item) => `<article class="prod-card"><div class="produce-art">${producePhoto(item)}</div><h3 class="prod-name">${item.name}</h3><button type="button" class="btn-add" data-od-add="${item.id}">Add ₹${priceForWeight(item.pricePerKg || 50, 500)}</button></article>`).join("")}</div>
    </div>`;
  }

  function renderMomsPane() {
    return `<div class="mode-pane">
      <div class="mode-hero"><h2>Mom’s Kitchen</h2><p>Kids’ weekly veggie kits</p></div>
      <section class="panel">
        <p class="panel-kicker">Number of Kids / Kits</p>
        <div class="kids-stepper">
          <button type="button" data-kids="-1" class="step-btn">−</button>
          <div class="kids-count"><strong>${state.kids}</strong><span>Kits</span></div>
          <button type="button" data-kids="1" class="step-btn">+</button>
        </div>
        <div class="seg w-full mt-3 flex">
          <button type="button" data-child-mode="double" class="flex-1 ${state.childMode === "double" ? "on" : ""}">Double same kits</button>
          <button type="button" data-child-mode="separate" class="flex-1 ${state.childMode === "separate" ? "on" : ""}">Separate kits</button>
        </div>
      </section>
      ${state.childMode === "separate" ? Array.from({ length: state.kids }, (_, i) => i + 1).map((kId) => `
        <section class="panel border border-terra mb-3">
          <input type="text" class="font-display text-lg font-semibold bg-transparent border-b border-terra/30 w-full mb-2" value="${state.childNames[kId] || `Kit ${kId}`}" data-kit-name-input="${kId}" />
          <div class="kit-grid">${MOMS_VEG.map((item) => `<button type="button" data-moms-sep-toggle="${kId}:${item.id}" class="kit-card ${state.childSeparateVeggies[kId]?.[item.id] ? "selected" : ""}"><p class="kit-name">${item.name}</p></button>`).join("")}</div>
        </section>`).join("") : `
        <section class="panel">
          <div class="kit-grid">${MOMS_VEG.map((item) => `<button type="button" data-moms-toggle="${item.id}" class="kit-card ${state.cart.find((c) => c.key === `moms:${item.id}`) ? "selected" : ""}"><p class="kit-name">${item.name}</p></button>`).join("")}</div>
        </section>`}
    </div>`;
  }

  function renderFamilyPane() {
    return `<div class="mode-pane">
      <div class="mode-hero"><h2>Family Kitchen</h2><p>Weekly Family Basket with Health Tags</p></div>
      <section class="panel">
        <div class="kit-grid">${CATALOG.Veggies.map((v) => `<button type="button" data-fam-veg="${v.id}" class="kit-card ${state.family.veggies[v.id] ? "selected" : ""}"><p class="kit-name">${v.name}</p><small class="text-[10px] text-ink-mute">${v.nutri}</small></button>`).join("")}</div>
      </section>
    </div>`;
  }

  function renderHome() {
    const panes = { ondemand: renderOnDemandPane, moms: renderMomsPane, family: renderFamilyPane };
    return `<section class="screen with-nav">
      <header class="home-header">
        ${brandRow()}
        <div class="journey-wrap flex justify-between px-1 mt-2">
          <button type="button" data-go="hub" class="text-xs font-extrabold text-terra">← Hub</button>
          <span class="text-xs font-bold text-ink-mute">${MODE_META[state.homeTab]?.label || ""}</span>
        </div>
        <div class="flex gap-2 mt-2 px-1">
          ${MODES.map((m) => `<button type="button" data-home-tab="${m}" class="flex-1 py-1.5 rounded-lg text-xs font-bold ${state.homeTab === m ? "bg-terra text-white" : "bg-black/5 text-ink"}">${MODE_META[m].label.split(" ")[0]}</button>`).join("")}
        </div>
      </header>
      <div class="p-4">${panes[state.homeTab]?.() || ""}</div>
      ${navBar("hub")}
    </section>`;
  }

  function renderCart() {
    const t = cartTotals();
    return `<section class="screen px-5 pt-6 pb-8">
      <button type="button" data-go="hub" class="text-terra font-extrabold mb-4">← Back to Hub</button>
      <h1 class="font-display text-3xl font-semibold">Your Cart</h1>
      <p class="mt-2 text-ink-mute">${cartCount()} items · Total ₹${t.subtotal}</p>
      <button type="button" data-go="hub" class="mt-6 w-full h-14 rounded-2xl bg-terra text-white font-extrabold text-lg">Continue Shopping</button>
    </section>`;
  }

  function scheduleRender() {
    cancelAnimationFrame(renderTimer);
    renderTimer = requestAnimationFrame(render);
  }

  function render() {
    const map = { splash: renderSplash, login: renderLogin, otp: renderOtp, hub: renderHub, home: renderHome, cart: renderCart, nutri: renderMomsPane, orders: renderMomsPane };
    screensEl.innerHTML = (map[state.screen] || renderSplash)();
    setTitle();
    bind();
  }

  function bind() {
    screensEl.querySelectorAll("[data-go]").forEach((btn) => btn.addEventListener("click", () => go(btn.dataset.go)));
    screensEl.querySelectorAll("[data-hub-mode]").forEach((btn) => btn.addEventListener("click", () => { state.homeTab = btn.dataset.hubMode; go("home"); }));
    screensEl.querySelectorAll("[data-home-tab]").forEach((btn) => btn.addEventListener("click", () => { state.homeTab = btn.dataset.homeTab; persistNow(); scheduleRender(); }));
    
    $("#sendOtp")?.addEventListener("click", () => { state.phone = $("#phoneInput")?.value || "9876543210"; go("otp"); });
    $("#verifyOtp")?.addEventListener("click", () => go("hub"));

    screensEl.querySelectorAll("[data-kids]").forEach((btn) => {
      btn.addEventListener("click", () => { state.kids = Math.min(4, Math.max(1, state.kids + Number(btn.dataset.kids))); persistNow(); scheduleRender(); });
    });
    screensEl.querySelectorAll("[data-child-mode]").forEach((btn) => {
      btn.addEventListener("click", () => { state.childMode = btn.dataset.childMode; persistNow(); scheduleRender(); });
    });
    screensEl.querySelectorAll("[data-kit-name-input]").forEach((input) => {
      input.addEventListener("input", () => { state.childNames[input.dataset.kitNameInput] = input.value; persistNow(); });
    });
    screensEl.querySelectorAll("[data-moms-sep-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [kId, id] = btn.dataset.momsSepToggle.split(":");
        if (!state.childSeparateVeggies[kId]) state.childSeparateVeggies[kId] = {};
        state.childSeparateVeggies[kId][id] = !state.childSeparateVeggies[kId][id];
        persistNow(); scheduleRender();
      });
    });
    screensEl.querySelectorAll("[data-moms-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.momsToggle; const key = `moms:${id}`;
        if (state.cart.find((c) => c.key === key)) removeCart(key);
        else upsertCart({ key, id, name: id, source: "moms", price: 40, qty: 1 });
        scheduleRender();
      });
    });
    screensEl.querySelectorAll("[data-od-cat]").forEach((btn) => {
      btn.addEventListener("click", () => { state.odCategory = btn.dataset.odCat; scheduleRender(); });
    });
    screensEl.querySelectorAll("[data-od-add]").forEach((btn) => {
      btn.addEventListener("click", () => { toast("Added to cart"); go("cart"); });
    });
    screensEl.querySelectorAll("[data-fam-veg]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.famVeg;
        state.family.veggies[id] = !state.family.veggies[id];
        persistNow(); scheduleRender();
      });
    });
  }

  load();
  if (state.phone && state.locationGranted) state.screen = "hub";
  scheduleRender();
})();
