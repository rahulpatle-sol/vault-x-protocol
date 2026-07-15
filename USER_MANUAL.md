# 🏛️ VaultX Protocol — User Manual

> **Version:** 2.1.0 · **Interface:** Web dApp (React) · **Network:** Ethereum/BSC Compatible

---

## 📋 Table of Contents

| # | Section | Page |
|---|---------|------|
| 1 | [Getting Started](#1-getting-started) | Installing & Running |
| 2 | [App Map](#2-app-map) | Route & Navigation Overview |
| 3 | [Wallet Connection](#3-wallet-connection) | Connecting Your Wallet |
| 4 | [Home Page](#4-home-page) | Landing & Hero Section |
| 5 | [Gallery & Asset Detail Drawer](#5-gallery--asset-detail-drawer) | Browse RWA Assets |
| 6 | [Compliance Center](#6-compliance-center) | Investor Compliance |
| 7 | [Presale Page](#7-presale-page) | VTX Token Presale |
| 8 | [Other Pages](#8-other-pages) | Stake, Swap, Mint, NFTs |
| 9 | [Keyboard Shortcuts](#9-keyboard-shortcuts) | Quick Actions |
| 10 | [Troubleshooting](#10-troubleshooting) | Common Issues |

---

## 1. Getting Started

### 1.1 Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

```
┌──────────────────────────────────────────────┐
│  VITE v5.x ready in 452 ms                   │
│                                              │
│  ➜  Local:   http://localhost:5173/          │
│  ➜  Network: http://10.x.x.x:5173/          │
└──────────────────────────────────────────────┘
```

### 1.2 Quick Route Reference

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, stats, roadmap |
| `/gallery` | Gallery | RWA asset cards + Asset Detail Drawer |
| `/compliance` | **🆕 Compliance Center** | Investor compliance & disclosures |
| `/presale` | Presale | VTX token presale |
| `/stake` | Stake | Token staking |
| `/swap` | Swap | Token swap |
| `/mint` | Mint | Mint tokens/NFTs |
| `/nfts` | NFTs | NFT holdings |
| `/transactions` | Transactions | Transaction history |
| `/contact` | Contact | Contact form |

---

## 2. App Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         🅽🅰🆅🅸🅶🅰🆃🅸🅾🅽 🅱🅰🆁                              │
│  ┌───┐  ┌──────────┐ ┌────────┐ ┌──────┐ ┌─────────┐ ┌─────────┐  │
│  │🔷│  │  Pre-Sale │ │  Stake │ │ Swap │ │ Gallery │ │Compliance│  │
│  │LOGO│  └──────────┘ └────────┘ └──────┘ └─────────┘ └─────────┘  │
│  └───┘                                         ┌────────┐          │
│                                                │ About  │          │
│                               ┌────────┐       └────────┘          │
│                               │Connect │                            │
│                               │Wallet  │                            │
│                               └────────┘                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         🅼🅰🅸🅽 🅲🅾🅽🆃🅴🅽🆃                              │
│                                                                     │
│  ┌─────┐  ┌──────────────┐  ┌────────────┐  ┌───────────────────┐  │
│  │Home │  │    Gallery   │  │ Compliance │  │     Presale       │  │
│  │     │  │  ┌─────────┐ │  │ ┌─────────┐│  │ ┌───────────────┐ │  │
│  │Hero │  │  │Asset    │ │  │ │Hero     ││  │ │Deposit/Claim  │ │  │
│  │Stats│  │  │Cards    │ │  │ │Steps    ││  │ │Refund         │ │  │
│  │Road │  │  │───click─┼─┼──┼─┤Panels   ││  │ └───────────────┘ │  │
│  │map  │  │  │Drawer   │ │  │ │         ││  │                   │  │
│  │     │  │  └─────────┘ │  │ └─────────┘│  │                   │  │
│  └─────┘  └──────────────┘  └────────────┘  └───────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         🅵🅾🅾🆃🅴🆁                                   │
│  Presale  │  Marketplace  │  Staking  │  Swap  │  Gallery  │  ...  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Wallet Connection

### 3.1 Supported Wallets

| Wallet | Type | Status |
|--------|------|--------|
| 🦊 MetaMask | Browser Extension | ✅ Supported |
| 🟣 Rabby | Browser Extension | ✅ Supported |
| 🔵 Coinbase Wallet | Browser Extension | ✅ Supported |
| Any EIP-1193 Wallet | Injected Provider | ✅ Compatible |

### 3.2 Connection Flow

```
   ┌──────────────┐
   │  Open dApp   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Click       │
   │ "Connect"    │◄──────────── Header / WalletGate component
   └──────┬───────┘
          │
          ▼
   ┌──────────────────┐
   │  Wallet Provider  │
   │  Pops Up          │
   └──────┬───────────┘
          │
     ┌────┴────┐
     │         │
     ▼         ▼
  ┌──────┐  ┌──────────┐
  │Approved│ │ Rejected │
  └───┬───┘ └──────────┘
      │         │
      ▼         ▼
  ┌────────┐  ┌────────────┐
  │Address │  │Wallet Gate  │
  │Shown   │  │Message Shown│
  │Actions │  │Buttons      │
  │Enabled │  │Disabled     │
  └────────┘  └────────────┘
```

### 3.3 What Changes After Connection

| Feature | Before Wallet | After Wallet |
|---------|:-------------:|:------------:|
| Asset Detail Drawer buttons | 🔒 "Connect Wallet Required" | ✅ Enabled |
| Presale deposit/claim/refund | 🔒 Disabled | ✅ Enabled |
| Contracts modal | 👁️ View only | 👁️ View only |
| Compliance Center | ✅ Accessible | ✅ Accessible |
| Header wallet pill | ❌ Hidden | ✅ Shows address |

---

## 4. Home Page

### 4.1 Layout

```
┌─────────────────────────────────────────────────────┐
│ 🅗🅔🅡🅞 🅢🅔🅒🅣🅘🅞🅅                                    │
│                                                     │
│  ● Institutional RWA Presale · Live                 │
│                                                     │
│  Tokenized property infrastructure                  │
│  for a serious capital market.                      │
│                                                     │
│  ┌──────────────┐  ┌────────────────────┐           │
│  │Join VTX      │  │View Asset          │           │
│  │Presale       │  │Marketplace         │           │
│  └──────────────┘  └────────────────────┘           │
│                                                     │
│  ┌──────────┬──────────┬──────────┐                 │
│  │Target TVL│Avg APY   │Presale   │                 │
│  │ $284M+   │  8.9%    │ 2M VTX   │                 │
│  └──────────┴──────────┴──────────┘                 │
│                                     ┌────────────┐  │
│                                     │Featured    │  │
│                                     │Asset Card  │  │
│                                     │(auto-rotate│  │
│                                     │  every 7s) │  │
│                                     └────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 4.2 Sections Below Hero

| Section | Content |
|---------|---------|
| **Stats Bar** | Platform metrics (TVL, APY, etc.) |
| **Features** | VaultX platform highlights |
| **Tokenomics** | VTX token distribution summary |
| **How It Works** | Step-by-step participation guide |
| **Roadmap** | Development timeline |
| **Partners** | Partner logos |

---

## 5. Gallery & Asset Detail Drawer 🆕

### 5.1 Gallery Page

```
┌──────────────────────────────────────────────────────┐
│  🅖🅐🅛🅛🅔🅡🅈                                       │
│                                                      │
│  Curated tokenized assets for the RWA marketplace.   │
│                                                      │
│  [All] [Residential] [Commercial] [Multifamily] ...  │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │           │
│  │ │Assets│ │  │ │Assets│ │  │ │Assets│ │           │
│  │ └──────┘ │  │ └──────┘ │  │ └──────┘ │           │
│  │ APY 8.4% │  │ APY 9.1% │  │ APY 7.8% │           │
│  │ Fund 76% │  │ Fund 63% │  │ Fund 82% │           │
│  │          │  │          │  │          │           │
│  │[View    ]│  │[View    ]│  │[View    ]│           │
│  │[Asset]  │  │[Asset]  │  │[Asset]  │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                      │
│  ─── click any card or "View Asset" button ──────►  │
│                                                      │
│           ◄═══ Asset Detail Drawer ═══►              │
│  ┌──────────────────────────────────────────┐       │
│  │ ┌────────────────────────────────┐       │       │
│  │ │        Asset Image             │ ✕     │       │
│  │ └────────────────────────────────┘       │       │
│  │  VX-MIA-101                              │       │
│  │  Brickell Residence Fund                 │       │
│  │                                          │       │
│  │  ┌──────────┬──────────┐                 │       │
│  │  │📈 APY    │🏢 Occup. │                 │       │
│  │  │  8.4%    │  96%     │                 │       │
│  │  ├──────────┼──────────┤                 │       │
│  │  │💰 Funded│🔑 Min    │                 │       │
│  │  │  76%     │  $500    │                 │       │
│  │  └──────────┴──────────┘                 │       │
│  │                                          │       │
│  │  ● Low Risk — Risk Assessment           │       │
│  │  This RWA asset has undergone...         │       │
│  │                                          │       │
│  │  ┌──────────────────────────────┐       │       │
│  │  │     View Details             │       │       │
│  │  ├──────────────────────────────┤       │       │
│  │  │🔒 Connect Wallet Required    │       │       │
│  │  ├──────────────────────────────┤       │       │
│  │  │🔒 Connect Wallet Required    │       │       │
│  │  └──────────────────────────────┘       │       │
│  └──────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────┘
```

### 5.2 Drawer Interaction

| Action | How |
|--------|-----|
| **Open Drawer** | Click any asset card OR click "View Asset" button |
| **Close Drawer** | Press `Esc` key, OR click the backdrop overlay, OR click ✕ button |
| **Navigation** | Scroll inside drawer to see full content |
| **Wallet Gating** | Buttons stay disabled with message until wallet is connected |

### 5.3 Asset Card Fields

| Field | Example | Description |
|-------|---------|-------------|
| Asset ID | `VX-MIA-101` | Unique identifier |
| Name | `Brickell Residence Fund` | Property/portfolio name |
| Type | `Residential` | Asset category |
| Location | `Miami, Florida` | Geographic location |
| Min | `$500` | Minimum participation amount |
| Target APY | `8.4%` | Annual percentage yield target |
| Funded | `76%` | Funding progress percentage |
| Status | `Open` / `Allocation` / `Priority` | Current investment status |

### 5.4 Drawer-Only Fields

| Field | Location in Drawer |
|-------|-------------------|
| Occupancy | Metric Grid (animated counter) |
| Risk Level | Risk Badge (color-coded: 🟢 Low / 🟡 Medium / 🔴 High) |
| Asset Memo | Risk Summary section |
| Investment Actions | Action Panel (3 buttons) |

### 5.5 Filter Bar

```
[ All ]  [ Residential ]  [ Commercial ]  [ Multifamily ]
[ Mixed-use ]  [ Logistics ]  [ Office ]
```

Click any filter to show only matching assets. Active filter is highlighted in gold.

---

## 6. Compliance Center 🆕

### 6.1 Page Layout

```
┌──────────────────────────────────────────────────────┐
│  🅲🅾🅼🅿🅻🅸🅰🅽🅲🅴 🅲🅴🅽🆃🅴🆁                          │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ 🅷🅴🆁🅾                                      │   │
│  │                                              │   │
│  │ ● Compliance Center · RWA Framework          │   │
│  │                                              │   │
│  │ Institutional compliance reimagined          │   │
│  │ for the on-chain era.                        │   │
│  │                                              │   │
│  │ ┌──────────────┐  ┌──────────────────┐      │   │
│  │ │0xBb56...1cc5 │  │● Framework Active│      │   │
│  │ └──────────────┘  └──────────────────┘      │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ 🅸🅽🆅🅴🆂🆃🅾🆁 🅰🅲🅲🅴🆂🆂 🆂🆃🅴🅿🆂              │   │
│  │                                              │   │
│  │ 🔗 01 ─── Connect Wallet                     │   │
│  │ 📋 02 ─── Request Access                     │   │
│  │ 📄 03 ─── Review Disclosures                 │   │
│  │ ⏳ 04 ─── Wait for Approval                  │   │
│  │ ✅ 05 ─── Participate                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ 🅹🆄🆁🅸🆂🅳🅸🅲🆃🅸🅾🅽 🅽🅾🆃🅸🅲🅴🆂                 │   │
│  │                                              │   │
│  │ ┌──────────────┐  ┌──────────────┐          │   │
│  │ │United States │  │European Union│          │   │
│  │ │Pending SEC   │  │MiCA Alignment│          │   │
│  │ └──────────────┘  └──────────────┘          │   │
│  │ ┌──────────────┐  ┌──────────────┐          │   │
│  │ │United Kingdom│  │Asia Pacific  │          │   │
│  │ │FCA Framework │  │Jurisdictional│          │   │
│  │ │              │  │Review        │          │   │
│  │ └──────────────┘  └──────────────┘          │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  🅁🅄🅂🅀 🅂🅃🅁🅄🅃🅄🅁🅄 🅂🅃🅁🅄🅃🅄🅁🅄│   │
│  │                                              │   │
│  │ 📊 Market Risk        [HIGH]                 │   │
│  │ 💧 Liquidity Risk     [HIGH]                 │   │
│  │ ⚖️ Regulatory Risk    [MEDIUM]               │   │
│  │ 🔐 Smart Contract Risk[MEDIUM]               │   │
│  │ ⚙️ Operational Risk   [LOW]                  │   │
│  │ 🎯 Concentration Risk [LOW]                  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  🅁🅄🅂🅀 🅂🅃🅁🅄🅃🅄🅁🅄 🅂🅃🅁🅄🅃🅄🅁🅄│   │
│  │                                              │   │
│  │ 📄 Asset Summary Memo        [Placeholder]   │   │
│  │ ⚖️ Legal Wrapper & SPV       [Placeholder]   │   │
│  │ 📜 Token Terms & Conditions  [Placeholder]   │   │
│  │ ⚠️ Risk Disclosure Statement [Placeholder]   │   │
│  │ 📊 Valuation & Appraisal     [Placeholder]   │   │
│  │ 📋 Operating Agreement       [Placeholder]   │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

### 6.2 Compliance Sections

| Section | Purpose | Content Type |
|---------|---------|:------------:|
| **ComplianceHero** | Introduction + VaultX address + status | Static |
| **InvestorAccessSteps** | 5-step workflow from connect to participate | Static |
| **JurisdictionNoticePanel** | Regional compliance status (US, EU, UK, APAC) | Static |
| **RiskDisclosurePanel** | 6 RWA risk categories with severity ratings | Static |
| **DocumentReadinessPanel** | 6 placeholder documents for disclosure | Static |

### 6.3 Scroll Animations

Each section of the Compliance Center triggers a **fade-in + slide-up** animation when you scroll to it. Steps and cards also have **staggered entrance delays** — each card appears slightly after the previous one.

---

## 7. Presale Page

### 7.1 Presale Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Connect  │────►│ Check    │────►│ Interact │────►│ Claim /  │
│ Wallet   │     │ Contract │     │ (Deposit)│     │ Refund   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

### 7.2 Presale States

| State | User Can | User Cannot |
|-------|:--------:|:-----------:|
| Wallet Disconnected | 👁️ View UI | ❌ Deposit / Claim / Refund |
| Contract Missing | 👁️ View UI | ❌ Any action |
| Sale Active | ✅ Deposit | ❌ Claim / Refund |
| Sale Successful | ✅ Claim | ❌ Deposit / Refund |
| Sale Failed | ✅ Refund | ❌ Deposit / Claim |

---

## 8. Other Pages

| Page | Route | Functionality |
|------|-------|:-------------:|
| **Stake** | `/stake` | View staking pools, staking guide, steps |
| **Swap** | `/swap` | Token swap interface |
| **Mint** | `/mint` | Token/NFT minting |
| **NFTs** | `/nfts` | View NFT holdings |
| **Transactions** | `/transactions` | Transaction history |
| **Contact** | `/contact` | Contact form |
| **Contracts Modal** | (Header button) | View contract addresses |

---

## 9. Keyboard Shortcuts

| Key | Action | Context |
|:---:|--------|---------|
| `Esc` | Close Asset Detail Drawer | Gallery page |
| `Esc` | Close Contracts Modal | Any page |
| `Esc` | Close Mobile Menu | Any page (mobile) |

---

## 10. Troubleshooting

### 10.1 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `vite: not found` | Missing dependencies | Run `npm install` |
| Wallet won't connect | No browser wallet installed | Install MetaMask/Rabby/Coinbase Wallet |
| "Connect Wallet Required" | Wallet not connected | Click "Connect" in header |
| Blank page | Build error | Check console, run `npm run build` |
| 404 on route | Wrong URL | Use routes from [Section 1.2](#12-quick-route-reference) |

### 10.2 Quick Fixes

```
npm install      →  Install all dependencies
npm run dev      →  Start dev server
npm run build    →  Production build
```

---

## 📊 Feature Status Matrix

| Feature | Route | Status | Wallet Required | Backend Required |
|---------|-------|:------:|:---------------:|:----------------:|
| Home | `/` | ✅ Live | ❌ No | ❌ No |
| Gallery | `/gallery` | ✅ Live | ❌ No | ❌ No |
| **Asset Detail Drawer** 🆕 | `/gallery` | ✅ Live | ❌ No (buttons: yes) | ❌ No |
| **Compliance Center** 🆕 | `/compliance` | ✅ Live | ❌ No | ❌ No |
| Presale | `/presale` | ✅ Live | ✅ Yes | ✅ Yes (Contract) |
| Stake | `/stake` | ⚠️ Partial | ✅ Yes | ✅ Yes |
| Swap | `/swap` | ⚠️ Partial | ✅ Yes | ✅ Yes |
| Mint | `/mint` | ⚠️ Partial | ✅ Yes | ✅ Yes |
| NFTs | `/nfts` | ⚠️ Partial | ✅ Yes | ✅ Yes |
| Transactions | `/transactions` | ⚠️ Partial | ✅ Yes | ✅ Yes |
| Contact | `/contact` | ✅ Live | ❌ No | ❌ No |

---

## 🎨 Design Tokens Reference

```
Colors                          Typography
──────────────────────────────────────────────────
🌑 BG:        #081311           🅰️ Manrope (Headings)
🌘 Surface:   #10211d           💻 IBM Plex Mono (Labels)
🥇 Gold:      #d7b56d
🥈 Gold-2:    #f5deb0           Border Radius
🌿 Green:     #70b58b           ───────────────
🔴 Red:       #e17c7c           Cards:   28px
📝 Text:      #f5f1e7           Panels:  20px
🔇 Muted:     #a89e8a           Buttons: 999px (Pill)
```

---

> **Need help?** Open an issue at `https://github.com/anomalyco/opencode/issues`  
> Built with React 17 · Framer Motion · MUI 5 · Ethers.js
