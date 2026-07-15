# VaultX Frontend — Execution Brief for AI Agent

> Give this whole file to OpenCode/DeepSeek as the system context before asking it to build anything.
> Do NOT ask it to build everything in one shot. Follow the stages below **in order**.

---

## 0. Project Context

VaultX is a React + Tailwind RWA (Real World Asset) dApp PoC. Existing structure includes:
- `src/components/gallery/GalleryItems.jsx` — asset cards
- `src/components/home/HeroSection.jsx` — homepage hero
- `src/components/layout/Header/MainNavigation.jsx`
- `src/components/layout/Footer.jsx`
- Wallet connection via injected providers (MetaMask, Rabby, Coinbase Wallet)

**Rules for every stage:**
- Match existing Tailwind design tokens (colors, spacing, fonts) — do not invent a new theme.
- No backend or Solidity dependency for any of this work — frontend only, static/local data.
- Wallet-gated actions must stay disabled with a clear "Connect Wallet" message if wallet isn't connected.
- Mobile responsive by default.
- Smooth, award-winning UI feel — not default/generic component library look.

---

## STAGE 0 — Context Sync (run first, every session)

Prompt to give the agent:

```
Read my existing frontend structure: src/components/gallery/GalleryItems.jsx,
src/components/home/HeroSection.jsx, src/components/layout/Header/MainNavigation.jsx,
src/components/layout/Footer.jsx, and my Tailwind config.
Summarize the design tokens currently used (colors, fonts, spacing, border-radius,
shadow style, animation style) before writing any new code. Do not generate components yet.
```

Do not move to Stage 1 until it gives you an accurate design summary.

---

## STAGE 1 — FE-11: Asset Detail Drawer (Timebox: 1 day)

### Goal
Clicking an asset card opens a slide-in drawer with richer investor-style asset info, using only existing frontend data (no new API/contract).

### Files to create
- `src/components/assets/AssetDetailDrawer.jsx`
- `src/components/assets/AssetMetricGrid.jsx`
- `src/components/assets/AssetRiskSummary.jsx`
- `src/components/assets/AssetActionPanel.jsx`

### Files to touch
- `src/components/gallery/GalleryItems.jsx` (wire up click → open drawer)
- `src/components/home/HeroSection.jsx` (if featured assets are also clickable)

### Data to display
- Asset ID, asset name, asset type, location, target APY, occupancy, funding progress
- Minimum participation amount, risk level, short asset memo, investment status

### Actions/messaging
- Buttons: "View details", "Request access", "Go to presale"
- If wallet not connected: investment buttons disabled + show "Connect Wallet required" message

### Build prompt

```
Create AssetDetailDrawer.jsx that slides in from the right when an asset card is clicked.
Use Framer Motion for a smooth spring animation (no linear/default easing).
Add a backdrop blur overlay behind the drawer, closable via Esc key or backdrop click.

Build AssetMetricGrid.jsx showing APY, occupancy, and funding progress as animated
counters/progress bars (animate on mount, not static numbers).

Build AssetRiskSummary.jsx with a color-coded risk badge (low/medium/high) and a
short memo text block.

Build AssetActionPanel.jsx with "View details", "Request access", "Go to presale" buttons.
If wallet is not connected, disable investment-related buttons and show a
"Connect Wallet required" inline message instead of hiding the buttons.

Match existing Tailwind theme tokens from the Stage 0 summary. Keep it keyboard-accessible.
```

### Done checklist
- [ ] Click on asset card opens drawer
- [ ] Drawer uses current frontend asset data only
- [ ] Metric grid animates on open
- [ ] Risk badge color-coded
- [ ] Buttons disabled + message shown when wallet not connected
- [ ] Esc / backdrop click closes drawer
- [ ] No backend/Solidity calls anywhere in this component

---

## STAGE 2 — FE-21: VaultX Compliance Center Page (Timebox: 3 days)

### Goal
New standalone `/compliance` route explaining investor access, jurisdiction readiness, disclosure status, and risk review — static frontend content only.

### Files to create
- `src/containers/compliance/index.jsx`
- `src/components/compliance/ComplianceHero.jsx`
- `src/components/compliance/InvestorAccessSteps.jsx`
- `src/components/compliance/JurisdictionNoticePanel.jsx`
- `src/components/compliance/RiskDisclosurePanel.jsx`
- `src/components/compliance/DocumentReadinessPanel.jsx`

### Files to touch
- `src/App.jsx` (add `/compliance` route)
- `src/components/layout/Header/MainNavigation.jsx` (nav link)
- `src/components/layout/Footer.jsx` (footer link)

### Content requirements
- ComplianceHero: title, short VaultX compliance positioning text, public VaultX address, compliance status label
- InvestorAccessSteps: Connect wallet → Request access → Review disclosures → Wait for approval → Participate when eligible
- JurisdictionNoticePanel: static placeholder notices
- RiskDisclosurePanel: static RWA risk categories
- DocumentReadinessPanel: placeholders — Asset memo, Legal wrapper, Token terms, Risk disclosure
- No backend calls, no Solidity calls — static content only

### Stage 2a — Structure build prompt

```
Create /compliance route rendering src/containers/compliance/index.jsx.
Build ComplianceHero, InvestorAccessSteps, JurisdictionNoticePanel,
RiskDisclosurePanel, DocumentReadinessPanel as separate components.
All content is static (no API/contract calls). Match existing page layout patterns
and Tailwind tokens. Add nav link in header and footer.
```

### Stage 2b — Polish build prompt (do NOT skip this)

```
Add scroll-triggered fade/slide-in animations to each Compliance Center section
(Intersection Observer or Framer Motion whileInView).
Add subtle hover micro-interactions on InvestorAccessSteps cards.
Ensure full mobile responsiveness (stack panels, adjust spacing).
Lazy-load below-the-fold sections to keep initial load fast.
```

### Done checklist
- [ ] `/compliance` route works locally
- [ ] All 5 panels present and populated with placeholder content
- [ ] Nav + footer link added
- [ ] Scroll animations working
- [ ] Mobile responsive
- [ ] No backend/Solidity dependency

---

## STAGE 3 — Smooth + Fast Pass (apply to BOTH FE-11 and FE-21)

> This is the stage that makes it feel "award-winning" instead of generic AI output. Do not skip.

### Build prompt

```
Audit AssetDetailDrawer and the Compliance Center page for:
- Layout shift (CLS) — reserve space for images/async content
- Animation jank — use transform/opacity (will-change) instead of animating top/left/width
- Unnecessary re-renders — memoize where needed

Add smooth page/section transitions using Framer Motion AnimatePresence
or the View Transitions API.

Compress and lazy-load all images using next-gen formats (webp/avif) with
proper width/height attributes to prevent layout shift.

Confirm all animations run at 60fps on a mid-range mobile device (throttle test).
```

---

## STAGE 4 — Final QA (both tasks)

Run through this before calling it done:

- [ ] Asset card click → drawer opens smoothly, closes via Esc/backdrop
- [ ] Wallet-gated buttons disabled + message shown pre-connect
- [ ] `/compliance` loads directly via URL (not just via nav click)
- [ ] Nav/footer links work
- [ ] No console errors
- [ ] No backend or Solidity calls triggered anywhere in these two features
- [ ] Responsive check: mobile, tablet, desktop
- [ ] Lighthouse performance score checked (aim 90+ on these routes)

---

## How to use this file with OpenCode/DeepSeek

Run stages **one at a time**, in order, in separate prompts/sessions if possible. Feeding all
stages at once tends to produce generic, unpolished output. After each stage, review the
diff before moving to the next stage — don't let the agent chain straight through Stage 3
without you checking Stage 1/2 output first.