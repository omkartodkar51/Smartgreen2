(() => {
  "use strict";

  const MOV = 200;
  const STORAGE = "smart-green-v7";
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
      { id: "rice", name: "Sona Masoori Rice", pricePerKg: 170, photo: img("photo-1586201375761-83865001e31c"), nutri: "Carbs & Energy · Low glycemic index" },
      { id: "atta", name: "Whole Wheat Atta", pricePerKg: 54, photo: img("photo-1574323347407-f5e1ad6d020b"), nutri: "High Dietary Fiber · Good for Digestion" },
      { id: "dal", name: "Toor Dal", pricePerKg: 140, photo: img("photo-1516684732162-798a0062be99"), nutri: "Plant Protein & Iron · Heart Healthy" },
    ],
    Veggies: [
      { id: "lady-finger", name: "Lady Finger", pricePerKg: 60, photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: "Rich in Folate & Vitamin C · ✅ Diabetes Friendly" },
      { id: "potato", name: "Potato", pricePerKg: 36, photo: img("photo-1518977676601-b53f82aba655"), nutri: "Potassium & Energy · ⚠️ Caution for strict diabetes" },
      { id: "tomato", name: "Tomato", pricePerKg: 48, photo: img("photo-1592924357228-91a4daadcfea"), nutri: "Lycopene & Antioxidants · ✅ Heart Healthy" },
      { id: "carrot", name: "Carrot", pricePerKg: 52, photo: img("photo-1598170845058-32b9d6a5da37"), nutri: "Beta-Carotene & Vitamin A · Supports Vision" },
    ],
  };

  const MOMS_VEG = [
    { id: "tf-lady", name: "Lady Finger Kit", price: 45, photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: "Folate & Vitamin C for Brain Development" },
    { id: "tf-spin", name: "Spinach Kit", price: 35, photo: img("photo-1576045057995-568f588f82fb"), nutri: "Iron & Calcium for Strong Bones" },
    { id: "tf-pot", name: "Potato Kit", price: 30, photo: img("photo-1518977676601-b53f82aba655"), nutri: "Energy-dense Carbs for Active Kids" },
    { id: "tf-tom", name: "Tomato Kit", price: 40, photo: img("photo-1592924357228-91a4daadcfea"), nutri: "Vitamin C & Antioxidants for Immunity" },
  ];

  const ORDERS = [
    { id: "SG-2401", date: "Fri, 3 Oct", total: 486, status: "In-Transit", items: "Weekly Basket · 12 items" },
    { id: "SG-2390", date: "Tue, 30 Sep", total: 320, status: "Delivered", items: "Mom’s Kitchen · 2 kids" },
  ];

  const state = {
    screen: "splash",
    phone: "",
    user: { name: "Ananya Rao", avatar: "AR", address: "12 Palm Grove, Bengaluru", wallet: 420 },
    homeTab: "ondemand",
    odCategory: "Veggies",
    kids: 2,
    childMode: "double",
    childNames: { 1: "Kit 1", 2: "Kit 2", 3: "Kit 3", 4: "Kit 4" },
    childSeparateVeggies: { 1: {}, 2: {} },
    cart: [],
    family: { veggies: {} },
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const screensEl = $("#screens");
  const loaderEl = $("#loader");

  function persistNow() {
    try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (_) {}
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) Object.assign(state, JSON.parse(raw));
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

  function showLoader(ms = 100) {
    if (!loaderEl) return Promise.resolve();
    loaderEl.hidden = false;
    return new Promise((r) => setTimeout(() => { loaderEl.hidden = true; r(); }, ms));
  }

  function priceForWeight(pricePerKg, grams) { return Math.round(pricePerKg * (grams / 1000)); }

  function logoSvg(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none"><rect x="8" y="30" width="40" height="22" rx="6" fill="#F8CB2E"/><rect x="12" y="34" width="32" height="14" rx="3" fill="#111111"/><circle cx="18" cy="54" r="4" fill="#111111"/><circle cx="38" cy="54" r="4" fill="#111111"/><rect x="28" y="14" width="18" height="26" rx="4" fill="#279B37"/></svg>`;
  }

  function icon(name) {
    const paths = {
      home: `<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,
      nutri: `<path d="M12 3v18M7 8c3 0 5 2 5 5s-2 5-5 5M17 8c-3 0-5 2-5 5s2 5 5 5"/>`,
      orders: `<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/>`,
      cart: `<path d="M3 5h2l2.2 10h9.6L19 8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/>`,
      back: `<path d="M15 5 8 12l7 7"/>`,
      check: `<path d="M5 12l5 5L20 7"/>`,
    };
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${paths[name] || ""}</svg>`;
  }

  function producePhoto(item) {
    const fallback = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340"><rect width="400" height="340" fill="#FFF6E8"/><text x="200" y="180" text-anchor="middle" font-size="24" fill="#212529">${item.name || "Produce"}</text></svg>`)}`;
    return `<img class="produce-img" alt="${item.name || ""}" src="${item.photo || fallback}" onerror="this.onerror=null;this.src='${fallback}'"/>`;
  }

  function cartCount() { return state.cart.reduce((n, i) => n + (i.qty || 1), 0); }
  function itemsBySource(src) { return state.cart.filter((c) => c.source === src); }
  function sectionTotal(src) { return itemsBySource(src).reduce((n, i) => n + ((i.price || 0) * (i.qty || 1)), 0); }
  function cartTotals() {
    const subtotal = sectionTotal("ondemand") + sectionTotal("moms") + sectionTotal("family");
    return { subtotal };
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
    const tabs = [["hub", "Hub", "home"], ["nutri", "Tracker", "nutri"], ["orders", "Orders", "orders"]];
    return `<nav class="bottom-nav">${tabs.map(([id, label, ic]) => `<button type="button" class="nav-item ${active === id ? "active" : ""}" data-go="${id}">${icon(ic)}<span>${label}</span></button>`).join("")}</nav>`;
  }

  function brandRow() {
    return `<div class="brand-row flex items-center justify-between"><div class="brand-left flex items-center gap-2"><div class="logo-mark sm">${logoSvg(28)}</div><div><h1 class="brand-title font-extrabold text-lg">Smart Green</h1><p class="font-mr brand-tag text-xs font-bold text-green-700">तुमचं हिरवं, स्मार्ट घर</p></div></div></div>`;
  }

  function renderSplash() {
    return `<section class="screen px-6 pt-14 pb-8 justify-between flex flex-col items-center h-full min-h-[90vh]">
      <div class="flex-1 flex flex-col items-center justify-center text-center">
        <div class="logo-mark mb-5" style="width:92px;height:92px;border-radius:28px">${logoSvg(56)}</div>
        <h1 class="font-display text-4xl font-extrabold text-black">Smart Green</h1>
        <p class="font-mr mt-2 text-lg font-extrabold text-green-700">तुमचं हिरवं, स्मार्ट घर</p>
      </div>
      <button type="button" data-go="login" class="primary-cta w-full h-14 rounded-2xl text-lg">Get Started</button>
    </section>`;
  }

  function renderLogin() {
    return `<section class="screen px-5 pt-8 pb-8">
      ${brandRow()}
      <h2 class="font-display text-2xl font-extrabold mt-4">Welcome back</h2>
      <div class="mt-6"><input id="phoneInput" type="tel" maxlength="10" placeholder="Mobile number" class="w-full h-14 px-4 rounded-xl border-2 border-black text-lg font-extrabold bg-white" value="${state.phone}" /></div>
      <button type="button" id="sendOtp" class="primary-cta mt-5 w-full h-14 rounded-2xl text-lg">Send OTP</button>
    </section>`;
  }

  function renderOtp() {
    return `<section class="screen px-5 pt-8 pb-8">
      <h1 class="font-display text-3xl font-extrabold">Enter OTP</h1>
      <p class="mt-2 font-bold text-gray-700">Demo OTP: 1234</p>
      <div class="mt-6"><input id="otpInput" type="text" maxlength="4" placeholder="1234" class="w-full h-14 px-4 rounded-xl border-2 border-black text-center text-2xl font-extrabold bg-white" /></div>
      <button type="button" id="verifyOtp" class="primary-cta mt-6 w-full h-14 rounded-2xl text-lg">Verify & Continue</button>
    </section>`;
  }

  function renderHub() {
    return `<section class="screen with-nav px-5 pt-6 pb-20">
      ${brandRow()}
      <h1 class="font-display text-2xl font-extrabold mt-4 mb-4">What would you like to plan?</h1>
      <div class="space-y-4">
        <button type="button" data-hub-mode="ondemand" class="hub-box w-full text-left p-4 rounded-2xl block">
          <span class="text-xs font-extrabold uppercase bg-[#f8cb2e] px-2 py-0.5 rounded border border-black">⚡ Express</span>
          <h2 class="font-display text-xl font-extrabold mt-2">On-Demand Grocery</h2>
          <p class="text-sm font-bold text-gray-700 mt-1">Pick exact fresh veggies & staples with ₹200 MOV.</p>
        </button>
        <button type="button" data-hub-mode="moms" class="hub-box w-full text-left p-4 rounded-2xl block">
          <span class="text-xs font-extrabold uppercase bg-green-200 px-2 py-0.5 rounded border border-black">👧 Kids Special</span>
          <h2 class="font-display text-xl font-extrabold mt-2">Mom’s Kitchen</h2>
          <p class="text-sm font-bold text-gray-700 mt-1">Multi-child weekly veggie kits with separate customizer.</p>
        </button>
        <button type="button" data-hub-mode="family" class="hub-box w-full text-left p-4 rounded-2xl block">
          <span class="text-xs font-extrabold uppercase bg-orange-200 px-2 py-0.5 rounded border border-black">🩺 Health-Smart</span>
          <h2 class="font-display text-xl font-extrabold mt-2">Family Kitchen</h2>
          <p class="text-sm font-bold text-gray-700 mt-1">Weekly family basket with Diabetes & BP health tags.</p>
        </button>
      </div>
      ${navBar("hub")}
    </section>`;
  }

  function renderOnDemandPane() {
    const items = CATALOG[state.odCategory] || [];
    return `<div class="mode-pane">
      <div class="pill-scroll mb-3 flex gap-2 overflow-x-auto pb-1">${Object.keys(CATALOG).map((c) => `<button type="button" data-od-cat="${c}" class="cat-pill px-3 py-1.5 rounded-xl border-2 border-black font-extrabold text-xs ${state.odCategory === c ? "bg-[#f8cb2e]" : "bg-white"}">${c}</button>`).join("")}</div>
      <div class="prod-grid grid grid-cols-2 gap-3">${items.map((item) => `<article class="prod-card p-3 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000]"><div class="produce-art rounded-xl overflow-hidden mb-2">${producePhoto(item)}</div><h3 class="font-extrabold text-sm">${item.name}</h3><p class="text-[10px] font-bold text-gray-600 mb-2">${item.nutri || ""}</p><button type="button" class="btn-add w-full py-2 rounded-xl bg-[#f8cb2e] border-2 border-black font-extrabold text-xs shadow-[2px_2px_0px_#000]" data-od-add="${item.id}">Add ₹${priceForWeight(item.pricePerKg || 50, 500)}</button></article>`).join("")}</div>
    </div>`;
  }

  function renderMomsPane() {
    return `<div class="mode-pane">
      <div class="mode-hero p-4 rounded-2xl bg-green-100 border-2 border-black mb-4 shadow-[4px_4px_0px_#000]">
        <h2 class="font-display text-xl font-extrabold">Mom’s Kitchen</h2>
        <p class="text-xs font-bold text-gray-700">Kids’ weekly veggie kits with custom options</p>
      </div>
      <section class="panel p-4 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] mb-4">
        <p class="text-xs font-extrabold uppercase text-gray-500 mb-2">Number of Kids / Kits</p>
        <div class="kids-stepper flex items-center gap-3">
          <button type="button" data-kids="-1" class="step-btn w-10 h-10 rounded-xl bg-[#f8cb2e] border-2 border-black font-extrabold text-lg">−</button>
          <div class="kids-count font-extrabold text-lg"><strong>${state.kids}</strong> Kits</div>
          <button type="button" data-kids="1" class="step-btn w-10 h-10 rounded-xl bg-[#f8cb2e] border-2 border-black font-extrabold text-lg">+</button>
        </div>
        <div class="seg w-full mt-3 flex gap-2">
          <button type="button" data-child-mode="double" class="flex-1 py-2 rounded-xl border-2 border-black font-extrabold text-xs ${state.childMode === "double" ? "bg-[#f8cb2e]" : "bg-white"}">Double same kits</button>
          <button type="button" data-child-mode="separate" class="flex-1 py-2 rounded-xl border-2 border-black font-extrabold text-xs ${state.childMode === "separate" ? "bg-[#f8cb2e]" : "bg-white"}">Separate kits</button>
        </div>
      </section>
      ${state.childMode === "separate" ? Array.from({ length: state.kids }, (_, i) => i + 1).map((kId) => `
        <section class="panel p-4 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] mb-3">
          <input type="text" class="font-display text-base font-extrabold bg-gray-50 border-2 border-black p-2 rounded-xl w-full mb-3" value="${state.childNames[kId] || `Kit ${kId}`}" data-kit-name-input="${kId}" />
          <div class="kit-grid grid grid-cols-2 gap-2">${MOMS_VEG.map((item) => `<button type="button" data-moms-sep-toggle="${kId}:${item.id}" class="kit-card p-2 rounded-xl border-2 border-black text-left text-xs font-extrabold ${state.childSeparateVeggies[kId]?.[item.id] ? "bg-green-300" : "bg-white"}"><p>${item.name}</p></button>`).join("")}</div>
        </section>`).join("") : `
        <section class="panel p-4 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
          <div class="kit-grid grid grid-cols-2 gap-2">${MOMS_VEG.map((item) => `<button type="button" data-moms-toggle="${item.id}" class="kit-card p-2 rounded-xl border-2 border-black text-left text-xs font-extrabold ${state.cart.find((c) => c.key === `moms:${item.id}`) ? "bg-green-300" : "bg-white"}"><p>${item.name}</p></button>`).join("")}</div>
        </section>`}
    </div>`;
  }

  function renderFamilyPane() {
    return `<div class="mode-pane">
      <div class="mode-hero p-4 rounded-2xl bg-orange-100 border-2 border-black mb-4 shadow-[4px_4px_0px_#000]">
        <h2 class="font-display text-xl font-extrabold">Family Kitchen</h2>
        <p class="text-xs font-bold text-gray-700">Weekly family basket with health tags</p>
      </div>
      <section class="panel p-4 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
        <div class="kit-grid grid gap-3">${CATALOG.Veggies.map((v) => `<button type="button" data-fam-veg="${v.id}" class="kit-card p-3 rounded-xl border-2 border-black text-left ${state.family.veggies[v.id] ? "bg-orange-200" : "bg-white"}"><p class="font-extrabold text-sm">${v.name}</p><small class="text-[11px] font-bold text-gray-700 block mt-1">${v.nutri}</small></button>`).join("")}</div>
      </section>
    </div>`;
  }

  function renderHome() {
    const panes = { ondemand: renderOnDemandPane, moms: renderMomsPane, family: renderFamilyPane };
    return `<section class="screen with-nav pb-24">
      <header class="home-header p-4 bg-[#f8cb2e] border-b-2 border-black">
        ${brandRow()}
        <div class="journey-wrap flex justify-between items-center mt-3">
          <button type="button" data-go="hub" class="text-xs font-extrabold bg-black text-white px-3 py-1.5 rounded-lg border border-black shadow-[2px_2px_0px_#fff]">← Hub</button>
          <span class="text-xs font-extrabold uppercase bg-white px-2.5 py-1 rounded-lg border-2 border-black">${MODE_META[state.homeTab]?.label || ""}</span>
        </div>
        <div class="flex gap-2 mt-3">
          ${MODES.map((m) => `<button type="button" data-home-tab="${m}" class="flex-1 py-2 rounded-xl text-xs font-extrabold border-2 border-black ${state.homeTab === m ? "bg-white shadow-[2px_2px_0px_#000]" : "bg-yellow-100"}">${MODE_META[m].label.split(" ")[0]}</button>`).join("")}
        </div>
      </header>
      <div class="p-4">${panes[state.homeTab]?.() || ""}</div>
      <div class="p-4"><button type="button" data-go="cart" class="primary-cta w-full h-14 rounded-2xl text-lg shadow-[4px_4px_0px_#000]">View Cart (${cartCount()} items)</button></div>
      ${navBar("hub")}
    </section>`;
  }

  function renderCart() {
    const t = cartTotals();
    return `<section class="screen px-5 pt-6 pb-12">
      <button type="button" data-go="hub" class="text-xs font-extrabold bg-black text-white px-3 py-1.5 rounded-lg mb-4">← Back to Hub</button>
      <h1 class="font-display text-3xl font-extrabold">Your Cart</h1>
      <p class="mt-2 font-bold text-gray-700">${cartCount()} items · Total ₹${t.subtotal}</p>
      <div class="mt-6 space-y-3">
        ${state.cart.map((c) => `<div class="p-3 bg-white border-2 border-black rounded-xl flex justify-between items-center shadow-[2px_2px_0px_#000]"><span class="font-extrabold text-sm">${c.name}</span><button type="button" data-remove="${c.key}" class="text-xs font-extrabold text-red-600 bg-red-100 px-2 py-1 rounded border border-red-300">Remove</button></div>`).join("")}
      </div>
      <button type="button" data-go="checkout" class="primary-cta mt-6 w-full h-14 rounded-2xl text-lg">Proceed to Checkout</button>
    </section>`;
  }

  function renderCheckout() {
    return `<section class="screen px-5 pt-6 pb-12">
      <button type="button" data-go="cart" class="text-xs font-extrabold bg-black text-white px-3 py-1.5 rounded-lg mb-4">← Back to Cart</button>
      <h1 class="font-display text-3xl font-extrabold">Checkout</h1>
      <p class="mt-2 font-bold text-gray-700">Delivering to: ${state.user.address}</p>
      <button type="button" data-go="success" class="primary-cta mt-6 w-full h-14 rounded-2xl text-lg">Pay & Confirm Order</button>
    </section>`;
  }

  function renderSuccess() {
    return `<section class="screen px-6 pt-16 pb-8 items-center text-center flex flex-col justify-center min-h-[90vh]">
      <div class="w-16 h-16 rounded-full bg-[#f8cb2e] border-2 border-black grid place-items-center text-black mb-4 shadow-[4px_4px_0px_#000] mx-auto">${icon("check")}</div>
      <h1 class="font-display text-3xl font-extrabold">Order Confirmed!</h1>
      <p class="font-mr mt-2 text-green-700 font-bold text-lg">तुमचं हिरवं, स्मार्ट घर</p>
      <button type="button" data-go="hub" class="primary-cta mt-8 w-full h-14 rounded-2xl text-lg">Back to Hub</button>
    </section>`;
  }

  function renderNutri() {
    return `<section class="screen with-nav px-4 pt-6 pb-20">
      <h1 class="font-display text-3xl font-extrabold mb-4">Nutri-Tracker</h1>
      <div class="p-4 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000]">
        <p class="font-extrabold text-lg">Green Champion Points</p>
        <p class="text-2xl font-extrabold text-green-600 mt-2">1,240 pts</p>
      </div>
      ${navBar("nutri")}
    </section>`;
  }

  function renderOrders() {
    return `<section class="screen with-nav px-4 pt-6 pb-20">
      <h1 class="font-display text-3xl font-extrabold mb-4">My Orders</h1>
      <div class="space-y-3">
        ${ORDERS.map((o) => `<div class="p-4 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000]"><div class="flex justify-between"><strong>${o.id}</strong><span class="text-xs bg-green-200 px-2 py-0.5 rounded border border-black">${o.status}</span></div><p class="text-xs text-gray-600 mt-1">${o.date} ·${o.items}</p><p class="font-extrabold mt-2">₹${o.total}</p></div>`).join("")}
      </div>
      ${navBar("orders")}
    </section>`;
  }

  function scheduleRender() {
    cancelAnimationFrame(renderTimer);
    renderTimer = requestAnimationFrame(render);
  }

  function render() {
    const map = {
      splash: renderSplash, login: renderLogin, otp: renderOtp, hub: renderHub, home: renderHome,
      cart: renderCart, checkout: renderCheckout, success: renderSuccess, nutri: renderNutri, orders: renderOrders
    };
    screensEl.innerHTML = (map[state.screen] || renderSplash)();
    setTitle();
    bind();
  }

  function setTitle() { document.title = TITLES[state.screen] || "Smart Green"; }

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
      btn.addEventListener("click", () => {
        const id = btn.dataset.odAdd;
        const item = CATALOG.Veggies.concat(CATALOG.Staples).find((x) => x.id === id);
        if (item) {
          upsertCart({ key: `od:${id}`, id, name: item.name, source: "ondemand", price: priceForWeight(item.pricePerKg || 50, 500), qty: 1 });
          toast("Added to cart");
        }
      });
    });
    screensEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => { removeCart(btn.dataset.remove); render(); });
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
  if (state.phone) state.screen = "hub";
  scheduleRender();
})();
