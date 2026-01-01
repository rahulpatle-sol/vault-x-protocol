# VaultX PoC Functionality README

## Overview

VaultX is a Real World Asset (RWA) proof-of-concept dApp.

The current PoC includes:

- React frontend
- Wallet connection
- RWA asset gallery
- VaultX presale page
- Contracts information modal
- Contact page
- Solidity token and presale contracts

The project is a technical PoC, not a final production platform.

---

## Main Frontend Features

### Home Page

The home page introduces VaultX as an RWA platform.

It shows:

- Hero section
- Featured assets
- Platform statistics
- Tokenomics summary
- How it works
- Roadmap-style content

### Wallet Connection

The app supports browser wallets through injected wallet providers.

Supported wallet types:

- MetaMask
- Rabby
- Coinbase Wallet extension
- Other injected EIP-1193 wallets

Wallet connection is required before Web3 actions.

### Presale Page

The presale page connects the frontend to the VaultX presale contract.

The page should:

- Detect connected wallet
- Detect current chain
- Check presale contract address
- Read presale status
- Show buyer position
- Allow deposit only when the sale is active
- Allow claim only after successful sale
- Allow refund only after failed sale

If wallet or contract config is missing, actions should stay disabled.

### Contracts Modal

The Contracts modal shows VaultX contract/address information.

It should show:

- Public VaultX address
- Token contract address
- Presale contract address
- Asset registry status
- Proxy/admin status

The modal should not show old testnet or unrelated addresses.

### Gallery Page

The Gallery page displays RWA asset cards.

Asset cards can show:

- Asset ID
- Asset name
- Asset type
- Location
- Target APY
- Occupancy
- Funding progress
- Asset image

### Other Pages

The PoC also includes:

- Stake page
- Swap page
- Mint page
- NFT holdings page
- Transactions page
- Contact page

Some of these pages may remain inactive until real contracts or backend APIs are connected.

---

## Solidity Features

### VaultXToken

The VTX token contract is used for the presale and buyer allocation.

Expected functionality:

- Token name
- Token symbol
- Decimals
- Total supply
- Token transfers

### VaultXPresale

The presale contract manages purchase, claim, and refund logic.

Expected functionality:

- Accept deposits through `deposit()`
- Reject direct ETH/BNB transfers
- Calculate VTX amount from payment amount
- Track buyer contribution
- Track purchased tokens
- Track claimed tokens
- Track refund status
- Allow claim after successful sale
- Allow refund after failed sale
- Prevent claim/refund overlap
- Prevent owner from withdrawing buyer-reserved tokens

---

## Environment Configuration

Example frontend environment variables:

```env
VITE_TOKEN_ADDRESS_11155111=0xYourTokenAddress
VITE_PRESALE_ADDRESS_11155111=0xYourPresaleAddress
VITE_PUBLIC_VAULTX_ADDRESS=0xBb569C738f56348B21a84D520f679fe41Fd01cc5
```

If contract addresses are missing, Web3 actions should remain disabled.

---

## Local Development

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

Presale route:

```text
http://localhost:5173/presale
```

---

## Basic Testing Checklist

Check these items:

- Home page loads
- `/presale` route works
- Wallet connect works
- Wallet address appears after connection
- Contracts modal opens and scrolls
- Contracts modal shows VaultX data only
- Presale buttons are disabled before wallet connection
- Presale buttons are disabled when contract address is missing
- Browser tab shows VaultX favicon

---

## Current PoC Limitations

The current project may still need:

- Backend API
- Asset registry contract
- Investor allowlist
- Stablecoin payment support
- Full dashboard
- Contract test coverage
- Deployment scripts
- Security audit

---

## Project Goal

The goal of this PoC is to show a realistic RWA dApp foundation where:

- Users can connect wallets
- RWA assets are displayed professionally
- Presale logic is contract-driven
- Contract information is visible
- Web3 actions are properly gated
