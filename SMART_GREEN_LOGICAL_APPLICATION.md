# Smart Green — Logical Application Map

**Status:** As-implemented prototype (mobile web / PWA-style SPA)  
**Code surface:** `public/smart-green/` (`index.html`, `app.js`, `app.css`, `tw-lite.css`)  
**Runtime model:** Client-only vanilla JS SPA · localStorage persistence · no backend  
**Brand constants:** Cream `#F8F9FA` · Terracotta `#C4785A` · Tagline तुमचं हिरवं, स्मार्ट घर · Secondary line *Pack to Pan, As Healthy as You Can*

This document is the **logical closure** of the current Smart Green application: what exists, where each function lives, how it maps to Swiggy-class quick-commerce patterns, and what enterprise-grade gaps remain. It describes the **UI/UX as shipped**, not a redesign brief.

---

## 1. Purpose & product logic

Smart Green is a **family grocery + weekly kit planner**, not a generic catalogue.

| Mode | User intent | Commerce shape |
|---|---|---|
| **On-Demand** | Buy exact SKUs now | Ala-carte · ₹200 MOV · same-day or scheduled |
| **Mom’s Kitchen** | Weekly kids’ veggie/tiffin kit | Structured kit · included vs extra · scheduled only |
| **Family Kitchen** | Weekly household basket | Standard basket + proportion edits · scheduled only |

**Core UX contract (implemented):** the user should always know *what they are buying*, *what is included*, *what is extra*, *how much is in cart*, *when it arrives*, and *what to do next*.

---

## 2. Logical architecture (as-is)

```
┌─────────────────────────────────────────────────────────┐
│  Shell: index.html → #screens + profile drawer + toast  │
├─────────────────────────────────────────────────────────┤
│  Presentation   render*() screens · CSS design system   │
│  Interaction    bind() · data-* handlers · swipe        │
│  Domain         cart / MOV / kits / delivery / nutri    │
│  Persistence    localStorage key smart-green-v4         │
│  Media          remote Unsplash/Pexels + SVG fallback   │
└─────────────────────────────────────────────────────────┘
         ▲ no API · no auth server · demo OTP 1234
```

| Layer | Responsibility | Location |
|---|---|---|
| Shell | Viewport, toast, loader, profile drawer | `index.html` |
| Navigation | Screen router + bottom nav + journey tabs | `go()`, `navBar()`, `journeySwitcher()` |
| Domain rules | MOV, freebies, basket totals, cutoffs | `cartTotals()`, `ensureMomsFreebies()`, `syncFamilyToCart()` |
| State | Single in-memory `state` object | top of `app.js` |
| Styling | Brand tokens, journey/card/cart components | `app.css` + `tw-lite.css` |

**Architectural stance:** monolith SPA with full re-render on state change. Acceptable for a clickable prototype; not a production micro-frontend.

---

## 3. Swiggy-class commerce mapping

Smart Green is mapped to **Swiggy Instamart / Swiggy ecosystem** patterns (quick commerce + account + post-order), not Swiggy Food restaurant discovery. Mom’s / Family Kitchen have **no direct Instamart twin**; they map to **subscription / meal-kit** overlays on the same cart+checkout spine.

| Swiggy / Instamart concept | Smart Green equivalent | Allocation (function / UI) | Aspect |
|---|---|---|---|
| App splash / brand entry | Splash | `renderSplash()` | Brand, CTA Get Started |
| Login / OTP | Login + OTP | `renderLogin()`, `renderOtp()` | Phone, demo OTP `1234`, Google stub |
| Location / address gate | Location permission | `renderLocation()` | GPS card, skip → home |
| Home feed / storefront | Home + 3 journeys | `renderHome()`, panes | Mode switch = storefront typology |
| Category rail | OD category pills | `renderOnDemandPane()` · `data-od-cat` | Staples→Aromatics horizontal scroll |
| Product card + add | OD product card | `odCard()`, `syncOdItem()` | Variant, Cut/Washed, Added state |
| Min order / unlock cart | ₹200 MOV panel | `movPanel()`, `cartTotals().movMet` | Always visible on OD |
| Floating cart bar | Sticky cart | `stickyCartBar()` | Count, ₹, View Cart |
| Cart | Sectioned cart | `renderCart()` | 3 sources + later + summary |
| Delivery slot picker | Per-section delivery | `deliveryCards()`, `state.delivery` | OD same-day/scheduled; kits scheduled-only |
| Checkout + payments | Checkout | `renderCheckout()` | Address, schedule, UPI/wallet/cards stub |
| Order success | Success | `renderSuccess()` | Split delivery timelines |
| Orders list | My Orders | `renderOrders()` | Static demo orders |
| Profile / wallet | Profile drawer | `renderProfileDrawer()` | Avatar, address, wallet top-up |
| Bottom tabs | Home / Nutri / Orders | `navBar()` | Cart **not** a tab (by design) |
| Personalization / nudges | Recommendations | `recommendations(mode)` | Contextual, non-promo |
| Loyalty | Green Champion | `renderNutri()` rewards block | Points toward next reward |
| — (Swiggy gap) | Mom’s Kitchen kit | `renderMomsPane()` | Child count, 6 kits, free 1:1 salads |
| — (Swiggy gap) | Family Kitchen basket | `renderFamilyPane()` | Staples proportions, veg/leafy/sprouts |
| Search / store switcher | **Not implemented** | — | Prototype gap |
| Live tracking map | **Stub only** (orders status tags) | `renderOrders()` | No map/ETA engine |
| Coupons / offers engine | Soft discount rule | `cartTotals()` ≥ ₹1500 → ₹50 | Not a coupon UX |

### Flow mapping (happy path)

```
Swiggy Instamart          Smart Green (as-is)
─────────────────         ────────────────────
Open app           →      Splash → Login → OTP → Location
Browse categories  →      Journey: On-Demand (+ swipe to kits)
Add to cart        →      Add → Added state + sticky bar
Meet min order     →      MOV panel ₹x / ₹200
Cart → slot        →      Cart sections + delivery cards
Pay                →      Checkout (Razorpay-style stub)
Track              →      Success timelines → My Orders
```

---

## 4. Information architecture (screens)

| Screen id | UI surface | Entry | Exit |
|---|---|---|---|
| `splash` | Brand hero + Get Started | Cold start | → `login` |
| `login` | Phone / OTP send / Google | Splash | → `otp` / `location`/`home` |
| `otp` | 4-digit OTP | Login | → `location`/`home` |
| `location` | Allow / manual skip | Auth | → `home` |
| `home` | Header + journeys + pane | Auth complete | → cart / location / profile / tabs |
| `cart` | 3-section cart | Sticky bar / header cart | → checkout / home modes |
| `checkout` | Address · schedule · pay | Cart CTA | → `success` |
| `success` | Confirmation | Pay confirm | → orders / home |
| `nutri` | Health + rewards | Bottom nav / profile | stays |
| `orders` | Order history | Bottom nav / success | stays |
| Profile drawer | Overlay | Avatar | close / nutri / orders / logout |

**Bottom navigation (post-login):** Home · Nutri-Tracker · My Orders  
**Not in bottom nav:** Cart (sticky bar + header icon), Profile (header avatar)

---

## 5. Function allocation matrix

Each row: **function → UI aspect → state / rule → a11y / performance note**.

### 5.1 Shell & routing

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| `go(screen)` | Full screen swap + scroll reset | `state.screen`; loader on home/cart/checkout | Full re-render; no route URL/history |
| `render()` | Mount HTML into `#screens` | Calls `bind()` every time | Rebinds all listeners; OK at prototype scale |
| `navBar(active)` | Fixed bottom tabs | Highlights active | Large targets; no `aria-current` on all paths |
| `toast()` / `showLoader()` | Feedback | Ephemeral | Toast not announced to AT (`role="status"` missing) |
| `save()` / `load()` | Persistence | `smart-green-v4` (+ migrates v3) | No encryption; device-local only |
| `logoSvg()` | Brand mark | Inline SVG | Do not redraw; used splash→profile |
| `brandRow()` / `profileBtn()` | Compact header identity | Avatar initials | Senior-friendly type sizes in CSS |

### 5.2 Authentication & location

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| `renderLogin()` | Floating phone field, flag, Google | `phone`, `country` | Google is stub; no OAuth |
| Send OTP | Peach CTA micro-bounce | Requires 10 digits | Demo only |
| `renderOtp()` | 4 boxes, auto-advance | Accepts `1234`/`0000` | No rate limit / SMS |
| `renderLocation()` | Map preview + Allow | `locationGranted` | No real Geolocation API call |

### 5.3 Home journeys

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| `journeySwitcher()` | 3 elevated journey buttons + descriptor + `1/3 · swipe` | `homeTab` ∈ MODES | Communicates journeys ≠ filters |
| `bindSwipe()` | Horizontal swipe between modes | dx threshold 48px | Touch only; no keyboard alternative |
| `loc-chip` | Delivering to · Change | Opens location | Compact; address truncated |
| `cart-mini` | Header cart badge | `cartCount()` | Separated from loc button (a11y) |

### 5.4 On-Demand

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| `movPanel()` | ₹x/₹200 bar + copy | `onDemand` sum vs `MOV=200` | Critical; never buried in checkout only |
| Category pills | Horizontal cats | `odCategory` | Scroll-snap pills |
| `odCard()` not added | Image · blurb · 250/500/1kg · attrs · price · Add | `odDraft[id]` | Draft ≠ cart until Add |
| `odCard()` added | ✓ Added · selected line · qty stepper · Update · Remove | Cart key `od:{id}` | Card transforms in place |
| `syncOdItem()` | Price + extras (cut/wash/sprout) | Writes cart line | Attribute surcharges ₹5/₹5/₹10 |
| `stickyCartBar()` | Persistent bottom commerce CTA | Hidden if cart empty / not home | Sits above bottom nav |

### 5.5 Mom’s Kitchen

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| Kids stepper | How many children? | `kids` 1–6; grams = kids×250 | Auto-scales kit weights |
| Standard kit panel | Included benefits list | Visual only until veggies chosen | Peach “FREE INCLUDED” language |
| Veggie kit grid | Select up to 6 | Toggle `moms:{id}` | Included badge ≠ paid extra |
| Free benefits | Salads 1:1 max 6 + aromatic | `ensureMomsFreebies()` | Auto-injected free cart lines |
| Paid extras | Salad / veg / fruit steppers | `momsExtras` → `syncMomsExtrasToCart()` | Badge **+ Extra** + price |
| Review My Kit | CTA → cart | Requires ≥1 veggie | Guided closure |

### 5.6 Family Kitchen

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| Standard basket summary | Onion/Potato/Tomato defaults | `family.staples` | Shown before edits |
| Proportion editor | ± 0.5kg | `showPropEditor` toggle | Live basket value |
| Sorted veggies | Up to 6 + Cut/Washed | `family.veggies` | Count pill N/6 |
| Leafy greens | Up to 3 | spinach/methi/dill | Value note when reducing |
| Sprouts | 2 packs · Raw/Sprouted | +₹10 sprouted | Segmented control |
| Free aromatic | Included ₹0 | Auto on `syncFamilyToCart()` | Not user-added |
| Optional fruit | Extra ₹299 | `family.extras.fruit` | Clearly paid |
| Add Weekly Basket | Sync → cart | Replaces prior family lines | Scheduled delivery assumption |

### 5.7 Cart, delivery, later

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| `cartStatusLines()` | ✓ / ⚠ smart status | MOV, kit completeness, leafy/veg gaps | Reduces mental math |
| Section: On-Demand | Items + delivery options | Same-day ₹40 or scheduled free | Unavailable options not fake-enabled for kits |
| Section: Mom’s / Family | Included vs extras blocks | Scheduled Sun/Tue/Fri only | Same-day card `unavailable` |
| Cutoffs | Friday/Sun/Wed 11pm copy | `CUTOFF` map | Informational; not enforced by clock |
| Qty / weight edit | In-cart steppers | Reprices OD via `syncOdItem` | No leave-cart for qty |
| Buy Later | ♡ → Save for Later | `savedLater[]` | Profile-associated via localStorage only |
| Add More | Returns to mode | `data-go-tab` | Preserves cart |
| Empty cart | Brand empty state + 3 CTAs | — | Mode-specific re-entry |
| Order summary | Per-mode subtotals | Discount if subtotal ≥ 1500 | Wallet applied at checkout pay |

### 5.8 Checkout → orders → nutri → profile

| Function | UI / UX aspect | State / rule | Enterprise note |
|---|---|---|---|
| Checkout schedule | Per-mode timeline lines | Reads `state.delivery` | No calendar service |
| Payment methods | Wallet / GPay / PhonePe / Paytm / Cards | Stub authorize toast | Not real Razorpay |
| Pay & Confirm | Clears cart, bumps points | Blocks if OD MOV unmet | Success keeps last delivery snapshot |
| Nutri-Tracker | Dual progress bars | Static `state.nutri` % | Demo metrics |
| Rewards | Green Champion points | Goal distance copy | Secondary to grocery |
| Orders | Status tags + Support | Hardcoded `ORDERS` | No live tracking |
| Profile | Wallet top-up +logout | Clears location flag on logout | Drawer overlay pattern |

### 5.9 Recommendations

| Trigger (as-is) | Message intent | UI |
|---|---|---|
| OD cart below MOV | ₹ shortfall | Reco card on OD |
| Moms kits 1–5 | Complete kit | Reco + free salad note |
| Kids ≥ 2 | Quantities adjusted | Informational |
| Family veg/leafy incomplete | Finish basket | Reco |
| No fruit extra | Suggest fruit basket | CTA sets `extras.fruit` |

---

## 6. Domain model (cart line)

```
CartLine {
  key, id?, name, source: ondemand|moms|family,
  price, extraCharge?, qty, weight?,
  cut?, washed?, sprouted?,
  free?, extraKind?, meta
}
```

| Source | Delivery affinity | MOV impact |
|---|---|---|
| `ondemand` | same-day (paid) or scheduled (free) | Counts toward ₹200 |
| `moms` | scheduled only | No MOV |
| `family` | scheduled only | No MOV |

**Invariant:** free Mom’s lines are regenerated by `ensureMomsFreebies()` from selected veggie kits — users do not manually add free salads.

---

## 7. UI/UX system (as-is visual language)

| Token / pattern | Role |
|---|---|
| Terracotta | Primary actions, active journey, selected chips |
| Amber | Recommendations, rewards, MOV attention |
| Soft peach | Secondary CTA, included badges |
| Sage (sparing) | Success / MOV met / health |
| Included badge | ✓ Included / FREE INCLUDED |
| Extra badge | + Extra + price |
| Journey buttons | Elevated terracotta when active |
| Product Added state | Border + chip + stepper + Update/Remove |
| Sticky cart | Dark bar above bottom nav |

Reference frame: **390×844** mobile-first; safe-area padding on nav/CTAs.

**RSL + motion (client)**
- Journey panes use directional enter (`from-left` / `from-right`) only when `animatePane` is set (tab/swipe), not on micro re-renders
- Screen routes use `nav-fwd` / `nav-back`; pane swaps suppress screen re-fade via `is-pane-swap`
- Produce images reveal only during pane motion; GPU `translate3d` + `--ease-out` tokens
- `prefers-reduced-motion` disables pane/screen/image motion

---

## 8. Accessibility (baseline & gaps)

**Present**
- Skip link, landmarks, live regions; route-level `document.title`
- Large touch targets on steppers, journey buttons, CTAs (≥40px in most controls)
- `aria-label` on profile / cart mini; `role="tab"` + `aria-selected` on journeys; arrow-key journey switch
- Focus restore keys; profile drawer `inert` + escape; high-contrast charcoal on cream
- `prefers-reduced-motion` kills decorative animation
- Image `width`/`height` + lazy decode on produce photos

**Gaps (enterprise backlog)**
- Full innerHTML re-render remains; focus restore covers primary paths only
- Color is not the sole signal everywhere, but MOV/status could use icons + text more uniformly
- Remote images still hotlinked (CLS mitigated, not eliminated)

---

## 9. Performance profile

| Concern | Current behavior | Strict guidance |
|---|---|---|
| Render model | Full DOM replace; rAF-coalesced | Fine &lt; ~200 nodes; adopt incremental DOM before scale |
| Images | Hotlinked Unsplash/Pexels + dims | CDN + responsive `srcset`, offline fallback pack |
| CSS | Two stylesheets, utility lite | Keep; avoid Tailwind CDN (already removed) |
| JS | Single IIFE ~1.5k LOC | Split domain vs view when adding API layer |
| Persistence | Batched localStorage | Guard quota; never store PII beyond demo phone |
| Network | No API | Introduce BFF with idempotent cart/checkout before production |
| Animation | Directional pane/screen; gated | Keep GPU-friendly; never animate on qty/draft micro-updates |

---

## 10. Enterprise readiness — logical closure

### Done (prototype-complete)
- End-to-end clickable path: auth → three journeys → cart → checkout → success → orders/nutri/profile
- Clear mode separation and included-vs-extra language
- MOV, sticky cart, Added card state, Buy Later, delivery unavailability UX
- Brand-consistent visual system; Pages/static deploy path under `docs/` + `public/smart-green/`

### Explicitly out of scope (must not be mistaken for production)
| Area | Required for enterprise |
|---|---|
| Identity | Real OTP, OAuth, session/JWT, device binding |
| Catalog | CMS/PIM, pricing service, inventory, dark-store ETA |
| Cart | Server cart, conflict merge, tax/GST, coupons |
| Payments | PCI-compliant gateway, webhooks, refunds |
| Fulfillment | Slot engine, cutoff enforcement, tracking |
| Privacy | Consent, encryption, audit logs, data residency |
| Quality | Contract tests, visual regression, a11y CI (axe), RUM |
| Ops | Feature flags, observability, error budgets |

### Recommended next architecture (when leaving prototype)
1. Keep **UI contracts** in this map as the acceptance source.  
2. Extract domain (MOV, freebies, basket) to pure modules with unit tests.  
3. Introduce API-backed cart with the same three `source` partitions.  
4. Preserve journey IA — do not collapse modes into generic categories.

---

## 11. File & ownership map

| Path | Owns |
|---|---|
| `public/smart-green/index.html` | Document shell, fonts, PWA-ish meta |
| `public/smart-green/app.js` | All screens, domain, events |
| `public/smart-green/app.css` | Brand + v4 UX components |
| `public/smart-green/tw-lite.css` | Local layout utilities (CDN-free) |
| `docs/` | Static mirror for GitHub Pages fallback |
| `.github/workflows/deploy-smart-green-pages.yml` | Pages publish pipeline |
| `scripts/smart-green-*.mjs` | Historical E2E helpers |

---

## 12. Demo invariants (operator checklist)

| Item | Value |
|---|---|
| OTP | `1234` |
| MOV | ₹200 On-Demand |
| Storage key | `smart-green-v4` |
| Kit free salads | 1:1 with veggie kits, max 6 |
| OD same-day fee | ₹40 when OD present |
| Scheduled days | Sunday / Tuesday / Friday |
| Bottom nav | Home · Nutri · Orders (cart via sticky/header) |

---

## 13. Closure statement

This application is **logically closed as a senior-grade interactive prototype**: commerce spine, three differentiated journeys, cart semantics, and Swiggy-class storefront→checkout mapping are defined and implemented in UI.  

It is **not** closed as an enterprise production system until identity, catalog, payments, fulfillment, accessibility CI, and observability in §10 are addressed — without changing the brand or the journey IA documented here.
