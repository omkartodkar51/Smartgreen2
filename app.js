(() => {
  "use strict";

  const MOV = 200;
  const STORAGE = "smart-green-v8";
  const GRAMS_PER_KIT = 250;
  const MODES = ["ondemand", "moms", "family"];
  const MODE_META = {
    ondemand: { label: "On-Demand", desc: "Pick exactly what you need instantly" },
    moms: { label: "Mom’s Kitchen", desc: "Kids’ weekly veggie & custom tiffin kits" },
    family: { label: "Family Kitchen", desc: "Complete weekly family basket with health tags" },
  };
  const img = (id, w = 600) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const CATALOG = {
    Staples: [
      { id: "rice", name: "Sona Masoori Rice", blurb: "Premium rice", pricePerKg: 170, unit: "kg", hue: "#f0e6c8", accent: "#b89b54", photo: img("photo-1586201375761-83865001e31c"), nutri: { vitamins: "B-Complex", protein: "7g", fiber: "2.8g" } },
      { id: "atta", name: "Whole Wheat Atta", blurb: "Stone-ground", pricePerKg: 54, unit: "kg", hue: "#e8d4a8", accent: "#8d6e3a", photo: img("photo-1574323347407-f5e1ad6d020b"), nutri: { vitamins: "B1, B3", protein: "12g", fiber: "10.7g" } },
      { id: "dal", name: "Toor Dal", blurb: "Protein staple", pricePerKg: 140, unit: "kg", hue: "#f3d27a", accent: "#b8860b", photo: img("photo-1516684732162-798a0062be99"), nutri: { vitamins: "Folate, Iron", protein: "22g", fiber: "15g" } },
      { id: "oil", name: "Cold-Pressed Oil", blurb: "Kitchen essential", pricePerKg: 220, unit: "L", hue: "#f7e38a", accent: "#c9a227", photo: img("photo-1474979266404-7eaacbcd87c5"), nutri: { vitamins: "Vitamin E", protein: "0g", fiber: "0g" } },
    ],
    Veggies: [
      { id: "lady-finger", name: "Lady Finger", blurb: "Farm fresh", pricePerKg: 60, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: { vitamins: "Vit C, K", protein: "2g", fiber: "3.2g" } },
      { id: "potato", name: "Potato", blurb: "Everyday staple", pricePerKg: 36, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: { vitamins: "Vit C, B6", protein: "2g", fiber: "2.1g" } },
      { id: "tomato", name: "Tomato", blurb: "Vine ripened", pricePerKg: 48, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: { vitamins: "Vit A, C", protein: "0.9g", fiber: "1.2g" } },
      { id: "carrot", name: "Carrot", blurb: "Sweet & crisp", pricePerKg: 52, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: { vitamins: "Vit A, K", protein: "0.9g", fiber: "2.8g" } },
      { id: "beans", name: "French Beans", blurb: "Tender pods", pricePerKg: 70, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1567375698348-5d9d1edb2e83"), nutri: { vitamins: "Vit A, C, K", protein: "1.8g", fiber: "3.4g" } },
      { id: "capsicum", name: "Capsicum", blurb: "Crunchy & mild", pricePerKg: 80, hue: "#c9a227", accent: "#8a6a12", photo: img("photo-1563565375-f3fdfdbefa83"), nutri: { vitamins: "Vit C, A", protein: "1g", fiber: "2.1g" } },
    ],
    Fruits: [
      { id: "banana", name: "Banana", blurb: "Energy fruit", pricePerKg: 55, hue: "#ffe082", accent: "#f9a825", photo: img("photo-1571771894821-ce9b6c11b08e"), nutri: { vitamins: "Vit B6, C", protein: "1.1g", fiber: "2.6g" } },
      { id: "apple", name: "Apple", blurb: "Crisp & juicy", pricePerKg: 180, hue: "#e57373", accent: "#c62828", photo: img("photo-1567306226416-28f0efdc88ce"), nutri: { vitamins: "Vit C", protein: "0.3g", fiber: "2.4g" } },
      { id: "papaya", name: "Papaya", blurb: "Vitamin rich", pricePerKg: 45, hue: "#ffb74d", accent: "#ef6c00", photo: img("photo-1517282009859-f000ec3b26fe"), nutri: { vitamins: "Vit C, A", protein: "0.5g", fiber: "1.8g" } },
      { id: "orange", name: "Orange", blurb: "Fresh citrus", pricePerKg: 90, hue: "#ffa726", accent: "#ef6c00", photo: img("photo-1557800636-894a64c1696f"), nutri: { vitamins: "Vit C", protein: "0.9g", fiber: "2.4g" } },
    ],
    Sprouts: [
      { id: "moong", name: "Moong Sprouts", blurb: "Protein pack", pricePerKg: 120, hue: "#c4b454", accent: "#8a7a28", sproutable: true, photo: img("photo-1540420773420-3366772f4999"), nutri: { vitamins: "Vit C, Folate", protein: "9g", fiber: "2g" } },
      { id: "chana", name: "Chana Sprouts", blurb: "Hearty sprouts", pricePerKg: 110, hue: "#c4a35a", accent: "#7a5a28", sproutable: true, photo: img("photo-1615485290382-441e4d049cb5"), nutri: { vitamins: "Vit B, Iron", protein: "13g", fiber: "7g" } },
      { id: "mixed", name: "Mixed Sprouts", blurb: "Variety pack", pricePerKg: 130, hue: "#b8a45a", accent: "#7a6528", sproutable: true, photo: img("photo-1512621776951-a57141f2eefd"), nutri: { vitamins: "Vit A, C", protein: "10g", fiber: "5g" } },
      { id: "methi", name: "Methi Sprouts", blurb: "Iron boost", pricePerKg: 125, hue: "#a8b45a", accent: "#6a7528", sproutable: true, photo: img("photo-1508747703725-719777637510"), nutri: { vitamins: "Iron, Vit K", protein: "4g", fiber: "3g" } },
    ],
    Aromatics: [
      { id: "coriander", name: "Coriander", blurb: "Fresh bunch", pricePerKg: 40, hue: "#a8b86a", accent: "#6a7a32", photo: img("photo-1459411621453-7b03977f4bfc"), nutri: { vitamins: "Vit A, C, K", protein: "2.2g", fiber: "3g" } },
      { id: "mint", name: "Mint Bunch", blurb: "Cool & aromatic", pricePerKg: 50, hue: "#b0c070", accent: "#708030", photo: img("photo-1622206151226-18ca2c9ab4a1"), nutri: { vitamins: "Vit A, C", protein: "3.8g", fiber: "8g" } },
      { id: "ginger", name: "Ginger", blurb: "Kitchen essential", pricePerKg: 160, hue: "#d7ccc8", accent: "#8d6e63", photo: img("photo-1599940824399-b87987ceb72a"), nutri: { vitamins: "Vit B6", protein: "1.8g", fiber: "2g" } },
      { id: "lemon", name: "Lemon", blurb: "Zesty finish", pricePerKg: 90, hue: "#e8d86a", accent: "#b8a020", photo: img("photo-1590502593747-42a996133562"), nutri: { vitamins: "Vit C", protein: "1.1g", fiber: "2.8g" } },
    ],
  };

  const MOMS_VEG = [
    { id: "tf-lady", name: "Lady Finger Kit", price: 45, hue: "#9aaa5a", accent: "#6b7a32", photo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600", nutri: { vitamins: "Vit C, K", protein: "2g", fiber: "3.2g" } },
    { id: "tf-spin", name: "Spinach Kit", price: 35, hue: "#8a9e5a", accent: "#556b2f", photo: img("photo-1576045057995-568f588f82fb"), nutri: { vitamins: "Iron, Vit A", protein: "2.9g", fiber: "2.2g" } },
    { id: "tf-pot", name: "Potato Kit", price: 30, hue: "#d4a35a", accent: "#8a6230", photo: img("photo-1518977676601-b53f82aba655"), nutri: { vitamins: "Vit C, B6", protein: "2g", fiber: "2.1g" } },
    { id: "tf-tom", name: "Tomato Kit", price: 40, hue: "#d4543a", accent: "#9a2f1c", photo: img("photo-1592924357228-91a4daadcfea"), nutri: { vitamins: "Vit A, C", protein: "0.9g", fiber: "1.2g" } },
    { id: "tf-carrot", name: "Carrot Kit", price: 38, hue: "#e07a2f", accent: "#a04a12", photo: img("photo-1598170845058-32b9d6a5da37"), nutri: { vitamins: "Vit A, K", protein: "0.9g", fiber: "2.8g" } },
    { id: "tf-beans", name: "Beans Kit", price: 42, hue: "#8a9e4a", accent: "#5a6b28", photo: img("photo-1622206151226-18ca2c9ab4a1"), nutri: { vitamins: "Vit A, C, K", protein: "1.8g", fiber: "3.4g" } },
  ];

  const MOMS_EXTRAS = [
    { id: "extra-salad", name: "Extra Salad", price: 40, kind: "salad", nutri: { vitamins: "Mixed Vit", protein: "1.5g", fiber: "2.5g" } },
    { id: "extra-veg", name: "Extra Veggie Kit", price: 60, kind: "veggie", nutri: { vitamins: "Vitamins A & C", protein: "2g", fiber: "3g" } },
    { id: "extra-fruit", name: "Premium Fruit Basket", price: 199, kind: "fruit", nutri: { vitamins: "Multi-Vit", protein: "1g", fiber: "4g" } },
  ];

  const FAMILY_STAPLES = [
    { id: "onion", name: "Onion", pricePerKg: 40, photo: img("photo-1518977956812-cd3dbadaafcd"), hue: "#e8d4c8", accent: "#8d6e63", nutri: { vitamins: "Vit C, B6", protein: "1.1g", fiber: "1.7g" }, healthTag: "BP Cautious" },
    { id: "potato", name: "Potato", pricePerKg: 36, photo: img("photo-1518977676601-b53f82aba655"), hue: "#d4a35a", accent: "#8a6230", nutri: { vitamins: "Vit C, B6", protein: "2g", fiber: "2.1g" }, healthTag: "Diabetes Cautious" },
    { id: "tomato", name: "Tomato", pricePerKg: 48, photo: img("photo-1592924357228-91a4daadcfea"), hue: "#d4543a", accent: "#9a2f1c", nutri: { vitamins: "Vit A, C", protein: "0.9g", fiber: "1.2g" }, healthTag: "Diabetes Friendly" },
  ];

  const ORDERS = [
    { id: "SG-2401", date: "Fri, 3 Oct", total: 486, status: "In-Transit", items: "Weekly Basket · 12 items" },
    { id: "SG-2390", date: "Tue, 30 Sep", total: 320, status: "Delivered", items: "Mom’s Kitchen · 2 kits" },
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
    kitsCount: 2,
    kitMode: "identical",
    customKitNames: { 1: "Kit 1 (Aarav)", 2: "Kit 3 (Ananya)" },
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

  const TITLES = {
    splash: "Smart Green",
    login: "Login · Smart Green",
    otp: "Enter OTP · Smart Green",
    location: "Location · Smart Green",
    home: "Home · Smart Green",
    hubdetail: "Journey Hub Detail · Smart Green",
    cart: "Your Cart · Smart Green",
    checkout: "Checkout · Smart Green",
    success: "Order Confirmed · Smart Green",
    nutri: "Nutri-Tracker · Smart Green",
    orders: "My Orders · Smart Green",
  };

  let saveTimer = 0;
  let renderTimer = 0;
  let focusKey = null;
  let ignoreHash = false;

  function persistNow() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({
        phone: state.phone, user: state.user, locationGranted: state.locationGranted,
        cart: state.cart, savedLater: state.savedLater, kitsCount: state.kitsCount, kitMode: state.kitMode,
        customKitNames: state.customKitNames, family: state.family,
        momsExtras: state.momsExtras, delivery: state.delivery, homeTab: state.homeTab, odDraft: state.odDraft,
      }));
    } catch (_) {}
  }

  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persistNow, 80);
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE) || localStorage.getItem("smart-green-v7");
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.phone) state.phone = d.phone;
      if (d.user) Object.assign(state.user, d.user);
      if (d.locationGranted) state.locationGranted = d.locationGranted;
      if (Array.isArray(d.cart)) state.cart = d.cart;
      if (Array.isArray(d.savedLater)) state.savedLater = d.savedLater;
      if (d.kitsCount) state.kitsCount = d.kitsCount;
      if (d.kitMode) state.kitMode = d.kitMode;
      if (d.customKitNames) state.customKitNames = d.customKitNames;
      if (d.family) {
        state.family = { ...state.family, ...d.family, staples: { ...state.family.staples, ...(d.family.staples || {}) }, leafy: { ...state.family.leafy, ...(d.family.leafy || {}) }, sprouts: { ...state.family.sprouts, ...(d.family.sprouts || {}) }, extras: { ...state.family.extras, ...(d.family.extras || {}) } };
      }
      if (d.momsExtras) Object.assign(state.momsExtras, d.momsExtras);
      if (d.delivery) Object.assign(state.delivery, d.delivery);
      if (d.homeTab) state.homeTab = d.homeTab;
      if (d.odDraft) state.odDraft = d.odDraft;
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
    loaderEl.setAttribute("aria-busy", "true");
    return new Promise((r) => setTimeout(() => {
      loaderEl.hidden = true;
      loaderEl.setAttribute("aria-busy", "false");
      r();
    }, ms));
  }

  function setTitle() {
    document.title = TITLES[state.screen] || TITLES.splash;
  }

  function syncHash(replace = false) {
    let hash = `#/${state.screen}`;
    if (state.screen === "hubdetail") hash += `/${state.homeTab}`;
    if (location.hash === hash) return;
    ignoreHash = true;
    if (replace) history.replaceState(null, "", hash);
    else history.pushState(null, "", hash);
    queueMicrotask(() => { ignoreHash = false; });
  }

  function applyHash() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (!raw) return false;
    const [screen, tab] = raw.split("/");
    const allowed = Object.keys(TITLES);
    if (!allowed.includes(screen)) return false;
    if (["home", "hubdetail", "cart", "checkout", "nutri", "orders", "success"].includes(screen) && !(state.locationGranted && state.phone)) {
      state.screen = state.phone ? "location" : "login";
      return true;
    }
    state.screen = screen;
    if (screen === "hubdetail" && MODES.includes(tab)) state.homeTab = tab;
    return true;
  }

  function restoreFocus() {
    if (state.profileOpen) {
      drawerEl.querySelector("#closeProfile")?.focus();
      return;
    }
    if (focusKey) {
      const hit = screensEl.querySelector(`[data-focus="${focusKey}"], #${CSS.escape(focusKey)}`);
      if (hit) { hit.focus({ preventScroll: true }); focusKey = null; return; }
    }
  }

  function formatGrams(g) { return g >= 1000 ? `${(g / 1000).toFixed(g % 1000 === 0 ? 0 : 1)}kg` : `${g}g`; }
  function priceForWeight(pricePerKg, grams) { return Math.round(pricePerKg * (grams / 1000)); }

  function logoSvg(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="8" y="30" width="40" height="22" rx="6" fill="#1B4D3E"/>
      <rect x="12" y="34" width="32" height="14" rx="3" fill="#E8F5E9"/>
      <circle cx="18" cy="54" r="4" fill="#112921"/>
      <circle cx="38" cy="54" r="4" fill="#112921"/>
      <rect x="28" y="14" width="18" height="26" rx="4" fill="#112921"/>
      <rect x="31" y="18" width="12" height="16" rx="2" fill="#81C784"/>
      <path d="M46 18c6 4 10 8 10 14a8 8 0 1 1-16 0c0-4 2-7 4-10 2 3 3 4 5 4 0-4 .5-6.5 0-8z" fill="#4CAF50"/>
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
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340"><rect width="400" height="340" fill="#E8F5E9"/><text x="200" y="180" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#112921" font-weight="700">${label}</text></svg>`
    )}`;
    return `<img class="produce-img" alt="${label}" src="${item.photo || fallback}" onerror="this.onerror=null;this.src='${fallback}'" />`;
  }

  function cartCount() { return state.cart.reduce((n, i) => n + (i.qty || 1), 0); }
  function itemsBySource(src) { return state.cart.filter((c) => c.source === src); }
  function lineTotal(item) { return item.free ? 0 : ((item.price || 0) + (item.extraCharge || 0)) * (item.qty || 1); }
  function sectionTotal(src) { return itemsBySource(src).reduce((n, i) => n + lineTotal(i), 0); }
  function momsVegSelected() {
    return itemsBySource("moms").filter((c) => !c.free && !c.extraKind && MOMS_VEG.some((v) => v.id === c.id));
  }

  function familyBasketValue() {
    let n = 0;
    for (const s of FAMILY_STAPLES) n += Math.round((state.family.staples[s.id] || 0) * s.pricePerKg);
    for (const id of Object.keys(state.family.veggies)) {
      const meta = CATALOG.Veggies.find((v) => v.id === id);
      if (!meta) continue;
      const prefs = state.family.veggies[id];
      n += priceForWeight(meta.pricePerKg, 500) + (prefs.cut ? 5 : 0) + (prefs.washed ? 5 : 0);
    }
    return n;
  }

  function cartTotals() {
    const onDemand = sectionTotal("ondemand");
    const moms = sectionTotal("moms");
    const family = sectionTotal("family");
    const odDelivery = onDemand > 0 && state.delivery.ondemand === "same-day" ? 40 : 0;
    const subtotal = onDemand + moms + family;
    return {
      onDemand, moms, family, odDelivery,
      subtotal,
      total: Math.max(0, subtotal + odDelivery),
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
    syncHash(!!opts.replaceHash);
    if (["home", "hubdetail", "cart", "checkout"].includes(screen) && !opts.silent) await showLoader(120);
    render(opts);
    if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div class="brand-left" style="display:flex;align-items:center;gap:10px">
        <div class="logo-mark sm">${logoSvg(26)}</div>
        <div><h1 class="brand-title">Smart Green</h1><p class="brand-tag">तुमचं हिरवं, स्मार्ट घर</p></div>
      </div>
      ${withProfile ? profileBtn() : ""}
    </div>`;
  }

  function stickyCartBar() {
    if (!cartCount() || (state.screen !== "home" && state.screen !== "hubdetail")) return "";
    const t = cartTotals();
    return `<div class="sticky-cart ${state.cartBounce ? "pop" : ""}"><button type="button" data-go="cart" class="sticky-cart-btn">
      <span class="sticky-cart-left"><span class="sticky-cart-icon">${icon("cart")}<em>${cartCount()}</em></span>
      <span><strong>${cartCount()} items · ₹${t.subtotal + t.odDelivery}</strong><small>Your basket</small></span></span>
      <span class="sticky-cart-cta">View Cart</span></button></div>`;
  }

  function recommendations(mode) {
    const cards = [];
    if (mode === "moms") {
      const n = momsVegSelected().length;
      if (n > 0 && n < 4) cards.push({ title: "Complete your kit", body: `You’ve selected ${n} veggie kits.` });
    }
    if (!cards.length) return "";
    return `<div class="reco-stack">${cards.slice(0, 1).map((c) => `
      <aside class="reco-card"><div><p class="reco-kicker">Recommended</p><p class="reco-title">${c.title}</p><p class="reco-body">${c.body}</p></div></aside>`).join("")}</div>`;
  }

  function renderSplash() {
    return `<section class="screen px-6 pt-14 pb-8 justify-between">
      <div class="flex-1 flex flex-col items-center justify-center text-center">
        <div class="logo-mark mb-5" style="width:92px;height:92px;border-radius:28px">${logoSvg(58)}</div>
        <h1 class="font-display text-4xl font-semibold">Smart Green</h1>
        <p class="font-mr mt-2 text-lg font-bold text-terra-deep">तुमचं हिरवं, स्मार्ट घर</p>
        <p class="mt-2 text-sm font-bold text-ink-mute">Pack to Pan, As Healthy as You Can</p>
      </div>
      <button type="button" data-go="home" class="primary-cta">Get Started</button>
    </section>`;
  }

  function renderHome() {
    return `<section class="screen with-nav">
      <header class="home-header">${brandRow(true)}</header>
      <div class="welcome-hub-container px-4 py-4">
        <div class="welcome-hub-header mb-3">
          <h2>Welcome Hub</h2>
          <p>Explore your tailor-made sustainable grocery pathways</p>
        </div>
        <div class="journey-cards-grid">
          ${MODES.map((id) => {
            const meta = MODE_META[id];
            const iconsMap = { ondemand: "⚡", moms: "👩‍🍳", family: "👨‍👩‍👧‍👦" };
            return `<button type="button" data-open-hub="${id}" class="journey-card-item animated-card">
              <div class="journey-card-icon">${iconsMap[id]}</div>
              <div class="journey-card-content">
                <h3>${meta.label}</h3>
                <p>${meta.desc}</p>
              </div>
              <span class="journey-card-arrow">→</span>
            </button>`;
          }).join("")}
        </div>
      </div>
      ${stickyCartBar()}
      ${navBar("home")}
    </section>`;
  }

  function renderHubDetail() {
    const mode = state.homeTab;
    const panes = { ondemand: renderOnDemandPane, moms: renderMomsPane, family: renderFamilyPane };
    const titles = { ondemand: "⚡ On-Demand Quick Picks", moms: "👩‍🍳 Mom's Kitchen Weekly Kits", family: "👨‍👩‍👧‍👦 Family Health Basket" };
    
    const cardDetails = {
      ondemand: [
        "**Instant Delivery Slots**: Same-day lightning delivery right at your doorstep.",
        "**Pick Exactly What You Need**: No rigid bundle constraints, pure flexibility.",
        "**AI Freshness Assurance**: Farm-picked greens harvested within 24 hours."
      ],
      moms: [
        "**Multi-Kit Customizer**: Manage independent custom kits with editable names.",
        "**Portion Scaler**: Perfectly proportioned 250g+ vegetable tiffin kits.",
        "**Free Perks**: Automatic free salads and free aromatic herb kits included."
      ],
      family: [
        "**Health-Smart Tags**: Dedicated Diabetes-Friendly & BP Cautious wellness highlights.",
        "**Proportion Customizer**: Easily adjust staple weights (Onion, Potato, Tomato).",
        "**Complete Weekly Basket**: Sorted veggies, leafy greens, and organic sprouts."
      ]
    };

    return `<section class="screen with-nav with-sticky-cart">
      <header class="page-header" style="display:flex;align-items:center;padding:16px;background:#fff;border-bottom:1px solid var(--border-subtle)">
        <button type="button" data-go="home" style="background:none;border:none;font-size:1.2rem;cursor:pointer;margin-right:12px">${icon("back")}</button>
        <div class="flex-1"><h1>${titles[mode]}</h1><p style="font-size:0.8rem;color:var(--ink-mute)">Detailed journey overview & shopping</p></div>
        ${profileBtn()}
      </header>
      <div class="page-body p-4">
        <div class="panel mb-4" style="background:#fff;padding:16px;border-radius:20px;box-shadow:var(--shadow-card)">
          <p style="font-size:0.75rem;font-weight:800;color:var(--terra);text-transform:uppercase">Journey Highlights</p>
          <ul class="styled-bullet-list mt-2" style="padding-left:18px;display:grid;gap:6px">
            ${cardDetails[mode].map(b => `<li style="font-size:0.85rem;color:var(--ink-base);font-weight:600">${b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join("")}
          </ul>
        </div>
        ${panes[mode]()}
      </div>
      ${stickyCartBar()}
      ${navBar("home")}
    </section>`;
  }

  function draftFor(id) {
    return state.odDraft[id] || { weight: 500, cut: false, washed: false, sprouted: false, qty: 1 };
  }
  function odUnitPrice(item, draft) {
    return priceForWeight(item.pricePerKg, draft.weight) + (draft.sprouted ? 10 : 0) + (draft.cut ? 5 : 0) + (draft.washed ? 5 : 0);
  }

  function renderOnDemandPane() {
    const items = CATALOG[state.odCategory] || CATALOG.Veggies;
    return `
      <div class="pill-scroll mt-2 mb-3" style="display:flex;gap:8px;overflow-x:auto">${Object.keys(CATALOG).map((c) => `<button type="button" data-od-cat="${c}" style="padding:6px 14px;border-radius:12px;background:${state.odCategory === c ? 'var(--forest-main)' : '#fff'};color:${state.odCategory === c ? '#fff' : 'var(--ink-base)'};border:1px solid var(--border-subtle);font-weight:700;font-size:0.8rem;cursor:pointer">${c}</button>`).join("")}</div>
      <div class="prod-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${items.map((item) => {
          const key = `od:${item.id}`;
          const inCart = state.cart.find((c) => c.key === key);
          const draft = inCart ? { weight: inCart.weight } : draftFor(item.id);
          const price = odUnitPrice(item, draft);
          return `<div class="prod-card" style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid var(--border-subtle);padding:10px">
            <div style="height:100px;border-radius:10px;overflow:hidden">${producePhoto(item)}</div>
            <h3 style="font-size:0.85rem;font-weight:800;margin-top:8px">${item.name}</h3>
            <p style="font-size:0.75rem;font-weight:700;color:var(--terra);margin-top:4px">₹${price} /${formatGrams(draft.weight)}</p>
            <button type="button" data-od-add="${item.id}" style="width:100\%;margin-top:8px;background:var(--forest-main);color:#fff;border:none;border-radius:8px;padding:6px;font-weight:800;font-size:0.75rem;cursor:pointer">${inCart ? "In Cart ✓" : "Add to Cart"}</button>
          </div>`;
        }).join("")}
      </div>
      <div class="panel mt-4 p-4 rounded-2xl" style="background:var(--amber-soft);border:1px solid rgba(230,161,92,0.4)">
        <h4 style="font-weight:800;color:var(--terra-deep);font-size:0.85rem;margin-bottom:6px">💡 Expert On-Demand Suggestions (Try These!):</h4>
        <ul style="font-size:0.75rem;color:var(--ink-mute);font-weight:600;padding-left:16px;display:grid;gap:4px">
          <li><strong>Organic Hydroponic Herbs Combo:</strong> Pair fresh mint and coriander with lemon for immunity detox water.</li>
          <li><strong>Instant Salad Express Pack:</strong> Select pre-washed carrots, tomatoes, and cucumber with cold-pressed oil for quick meal prep.</li>
        </ul>
        <p style="font-size:0.7rem;color:var(--forest-dark);font-weight:800;margin-top:8px">Tumhala he suggestions on-demand cart madhye add karayche ahet ka?</p>
      </div>
    `;
  }

  function renderMomsPane() {
    const selected = momsVegSelected();
    const n = selected.length;
    const g = state.kitsCount * GRAMS_PER_KIT;
    return `
      <div class="mode-hero mb-3"><h2>Mom’s Kitchen</h2><p>Smart weekly veggie kits & custom tiffins</p></div>
      <section class="panel" style="background:#fff;padding:16px;border-radius:20px;box-shadow:var(--shadow-card)">
        <p style="font-size:0.75rem;font-weight:800;color:var(--terra)">Kit Counter & Customizer</p>
        <p style="font-size:0.95rem;font-weight:800;margin-top:2px">Kiti kits havayt?</p>
        <div style="display:flex;align-items:center;gap:16px;margin-top:10px">
          <button type="button" data-kits-delta="-1" style="width:36px;height:36px;border-radius:10px;background:var(--surface-subtle);border:none;font-weight:800;cursor:pointer">−</button>
          <div style="text-align:center"><strong>${state.kitsCount}</strong> <span style="font-size:0.75rem;color:var(--ink-mute)">kits</span></div>
          <button type="button" data-kits-delta="1" style="width:36px;height:36px;border-radius:10px;background:var(--surface-subtle);border:none;font-weight:800;cursor:pointer">+</button>
        </div>
        <div class="animated-instructions-box mt-3 p-3" style="background:var(--surface-subtle);border-radius:12px;margin-top:12px">
          <p style="font-size:0.78rem;font-weight:800;color:var(--forest-dark);margin-bottom:4px">✨ Quick Kit Guidelines:</p>
          <ul style="font-size:0.75rem;color:var(--ink-mute);padding-left:16px;display:grid;gap:3px;font-weight:600">
            <li>Eka kits madhye tumhala etak delect karta yeil.</li>
            <li>Qty tumhala change karta yeil.</li>
            <li>Pratyek kit sathi separate vegetable selection set karu shakta.</li>
          </ul>
        </div>
        <p style="font-size:0.75rem;color:var(--ink-mute);margin-top:8px">Quantities automatically scale for ${state.kitsCount} kits · ${formatGrams(g)} per selection</p>
      </section>
      <section class="panel mt-3" style="background:#fff;padding:16px;border-radius:20px;box-shadow:var(--shadow-card)">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h3 style="font-size:0.9rem;font-weight:800">Choose your veggie kits</h3>
          <span style="font-size:0.75rem;font-weight:800;background:var(--surface-subtle);padding:2px 8px;border-radius:8px">${n} / 4</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          ${MOMS_VEG.map((item) => {
            const on = !!state.cart.find((c) => c.key === `moms:${item.id}`);
            return `<button type="button" data-moms-toggle="${item.id}" style="background:${on ? '#E8F5E9' : '#fff'};border:2px solid ${on ? 'var(--sage)' : 'var(--border-subtle)'};border-radius:14px;padding:10px;text-align:left;cursor:pointer">
              <div style="height:70px;border-radius:8px;overflow:hidden">${producePhoto(item)}</div>
              <p style="font-size:0.8rem;font-weight:800;margin-top:6px">${item.name}</p>
              <p style="font-size:0.7rem;color:var(--ink-mute);font-weight:700;margin-top:2px">${on ? '✓ Selected' : 'Tap to add'}</p>
            </button>`;
          }).join("")}
        </div>
      </section>
      <button type="button" data-go="cart" class="primary-cta mt-4">Review My Kit in Cart</button>
    `;
  }

  function renderFamilyPane() {
    const value = familyBasketValue();
    return `
      <div class="mode-hero mb-3"><h2>Family Kitchen</h2><p>Build your weekly family basket with health-smart tags</p></div>
      <section class="panel" style="background:#fff;padding:16px;border-radius:20px;box-shadow:var(--shadow-card)">
        <h3 style="font-size:0.9rem;font-weight:800">Your Standard Weekly Basket</h3>
        <div style="margin-top:10px;display:grid;gap:8px">
          ${FAMILY_STAPLES.map((s) => `
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;font-weight:700">
              <span>${s.name} <span style="font-size:9px;background:#FFF3E0;color:#EF6C00;padding:2px 6px;border-radius:6px">${s.healthTag}</span></span>
              <strong>1.5kg</strong>
            </div>`).join("")}
        </div>
        <p style="font-size:0.85rem;font-weight:800;color:var(--forest-dark);margin-top:12px">Basket value: ₹${value}</p>
      </section>
      <button type="button" data-go="cart" class="primary-cta mt-4">Proceed with Family Basket</button>
    `;
  }

  function renderCart() {
    const t = cartTotals();
    const empty = !state.cart.length;
    return `<section class="screen">
      <header class="page-header" style="display:flex;align-items:center;padding:16px;background:#fff;border-bottom:1px solid var(--border-subtle)">
        <button type="button" data-go="home" style="background:none;border:none;font-size:1.2rem;cursor:pointer;margin-right:12px">${icon("back")}</button>
        <div class="flex-1"><h1>Your Cart</h1><p style="font-size:0.8rem;color:var(--ink-mute)">${cartCount()} items</p></div>
      </header>
      <div class="page-body p-4">
        ${empty ? `<div style="text-align:center;padding:40px 0"><p style="font-weight:800;font-size:1.1rem">Your cart is empty</p><button type="button" data-go="home" class="primary-cta mt-4">Explore Hub</button></div>` : `
          <div style="display:grid;gap:10px">
            ${state.cart.map(item => `<div style="background:#fff;padding:12px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;border:1px solid var(--border-subtle)">
              <div><p style="font-weight:800;font-size:0.85rem">${item.name}</p><p style="font-size:0.72rem;color:var(--ink-mute)">${item.meta || formatGrams(item.weight || 0)}</p></div>
              <div style="text-align:right"><p style="font-weight:800;font-size:0.85rem">₹${lineTotal(item)}</p><button type="button" data-remove="${item.key}" style="background:none;border:none;color:var(--terra);font-size:0.7rem;font-weight:800;cursor:pointer">Remove</button></div>
            </div>`).join("")}
          </div>
          <div class="summary-panel mt-4" style="background:#fff;padding:16px;border-radius:16px;border:1px solid var(--border-subtle)">
            <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1rem"><span>Total Payable</span><strong>₹${t.subtotal + t.odDelivery}</strong></div>
          </div>
          <button type="button" data-go="checkout" class="primary-cta mt-4">Proceed to Checkout</button>
        `}
      </div>
    </section>`;
  }

  function renderCheckout() {
    return `<section class="screen px-4 pt-4">
      <h1 class="font-display text-2xl font-semibold">Checkout</h1>
      <p class="text-ink-mute mt-2">Payment simulation successful.</p>
      <button type="button" data-go="success" class="primary-cta mt-6">Confirm Order</button>
    </section>`;
  }

  function renderSuccess() {
    return `<section class="screen px-6 pt-16 pb-8 items-center text-center">
      <div class="logo-mark mb-4 mx-auto" style="width:72px;height:72px;border-radius:22px">${logoSvg(44)}</div>
      <h1 class="font-display text-2xl font-semibold text-forest-dark">Order Confirmed!</h1>
      <p class="font-mr mt-2 text-forest-light font-bold text-base">तुमचं हिरवं, स्मार्ट घर</p>
      <button type="button" data-go="home" class="primary-cta mt-6">Back to Home</button>
    </section>`;
  }

  function renderNutri() {
    return `<section class="screen with-nav px-4 pt-4">
      <h1 class="font-display text-2xl font-semibold">Nutri-Tracker</h1>
      <p class="text-ink-mute">Health dashboard.</p>
      ${navBar("nutri")}
    </section>`;
  }

  function renderOrders() {
    return `<section class="screen with-nav px-4 pt-4">
      <h1 class="font-display text-2xl font-semibold">My Orders</h1>
      <p class="text-ink-mute">Order history.</p>
      ${navBar("orders")}
    </section>`;
  }

  function render() {
    const map = {
      splash: renderSplash, home: renderHome, hubdetail: renderHubDetail,
      cart: renderCart, checkout: renderCheckout, success: renderSuccess,
      nutri: renderNutri, orders: renderOrders
    };
    screensEl.innerHTML = (map[state.screen] || renderSplash)();
    setTitle();
    bind();
  }

  function bind() {
    screensEl.querySelectorAll("[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => go(btn.dataset.go));
    });
    screensEl.querySelectorAll("[data-open-hub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.homeTab = btn.dataset.openHub;
        go("hubdetail");
      });
    });
    screensEl.querySelectorAll("[data-od-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.odCategory = btn.dataset.odCat;
        render();
      });
    });
    screensEl.querySelectorAll("[data-od-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.odAdd;
        const item = CATALOG[state.odCategory]?.find(x => x.id === id) || CATALOG.Veggies.find(x => x.id === id);
        if (!item) return;
        const key = `od:${id}`;
        if (state.cart.find(c => c.key === key)) removeCart(key);
        else upsertCart({ key, id, name: item.name, source: "ondemand", weight: 500, price: item.pricePerKg ? priceForWeight(item.pricePerKg, 500) : 50, qty: 1 });
        toast("Cart updated");
        render();
      });
    });
    screensEl.querySelectorAll("[data-kits-delta]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.kitsCount = Math.max(1, state.kitsCount + Number(btn.dataset.kitsDelta));
        render();
      });
    });
    screensEl.querySelectorAll("[data-moms-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.momsToggle;
        const key = `moms:${id}`;
        const meta = MOMS_VEG.find(v => v.id === id);
        if (state.cart.find(c => c.key === key)) removeCart(key);
        else upsertCart({ key, id, name: meta.name, source: "moms", price: meta.price, weight: state.kitsCount * GRAMS_PER_KIT, qty: 1 });
        render();
      });
    });
    screensEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeCart(btn.dataset.remove);
        render();
      });
    });
  }

  load();
  if (!applyHash()) { if (state.locationGranted) state.screen = "home"; }
  syncHash(true);
  render();
})();
