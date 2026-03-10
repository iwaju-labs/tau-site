# Tau — Landing Page & Distribution Plan

## Overview

This document outlines the plan for building the **usetau.app** marketing and distribution site. The site serves as the primary acquisition, conversion, and download point for the Tau desktop app.

**Goal**: Visitor lands → understands the value → pays → gets license key → downloads from GitHub Releases → activates in app.

---

## Tech Stack (Recommended)

| Concern | Tool | Why |
|---|---|---|
| Runtime | [Bun](https://bun.sh) | Fast, drop-in Node replacement, native Astro support |
| Site framework | [Astro](https://astro.build) | Fast, static, great for landing pages |
| Styling | Tailwind CSS | Consistent with the app |
| Payments | [Lemon Squeezy](https://lemonsqueezy.com) | Built-in license key API, handles VAT globally |
| Email | [Resend](https://resend.com) | Simple transactional email, great DX |
| Hosting | [Vercel](https://vercel.com) | Free tier, easy deploys, native Bun support |
| Binary hosting | GitHub Releases | Free, reliable, public |

> **Why Lemon Squeezy over raw Stripe?** It has a built-in License Keys API that handles key generation, activation limits, and device counts — saving weeks of backend work.

> **Why Bun?** Bun is a fast all-in-one JS runtime and package manager. Astro has official Bun support, Vercel deploys Bun natively, and it's a drop-in replacement for Node/npm — use `bun` everywhere you'd otherwise use `npm` or `node`.

---

## Getting Started

```bash
bun create astro@latest tau-site
cd tau-site
bun install
bun dev        # local dev server
bun run build  # production build
bun run preview
```

> Use `bun.lockb` (not `package-lock.json`) — commit this to the repo.

---

## Repository Structure

```
tau-site/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Landing page
│   │   ├── pricing.astro        # Pricing (or section on index)
│   │   └── thank-you.astro      # Post-purchase confirmation
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Pricing.astro
│   │   ├── FAQ.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Base.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── og-image.png             # Social share preview
│   ├── demo.mp4                 # Hero demo video
│   └── screenshots/
├── astro.config.mjs
├── package.json
└── .env                         # Lemon Squeezy API keys
```

---

## Landing Page Sections

### 1. Hero
- **Headline**: Something punchy about timelapses being boring / Tau fixes that
  - e.g. *"Your timelapses deserve better."* or *"Make timelapses people actually watch."*
- **Subheadline**: 1–2 sentences on what Tau does
- **CTA**: `Download for Windows` + `Buy Now` (or a single primary CTA)
- **Visual**: Looping demo video or animated GIF showing the app in action

### 2. Social Proof / Context
- Who it's for: developers, designers, artists, students — anyone doing deep work
- Short quote or stat if available

### 3. Features
Highlight the key differentiators:
- 📹 Record directly from camera or screen
- ⏱️ Smart timer overlays (clock, stopwatch, custom fonts)
- ✂️ Minimal editor — trim, add music, export
- 🎨 Filters & templates (fisheye, color correction)
- 🏷️ "Worked X hours on Y task" card — shareable moment
- 📦 Export to MP4, ready to post

### 4. Demo / Screenshots
- Short screen recording of the full flow (record → edit → export)
- Before/after: boring raw timelapse vs Tau output

### 5. Pricing
See [Pricing Tiers](#pricing-tiers) below.

### 6. FAQ
- Is there a free trial?
- What platforms are supported?
- How does the license work?
- Can I use it on multiple devices?
- Do I get free updates?

### 7. Footer
- Links: Download, Pricing, FAQ, Contact, Privacy Policy, Terms
- Social links
- Copyright

---

## Pricing Tiers

| Tier | Price | Activations | Notes |
|------|-------|-------------|-------|
| **Solo** | $19 one-time | 1 device | Best for personal use |
| **Pro** | $39 one-time | 3 devices | Best for creators with multiple machines |
| ~~Subscription~~ | — | — | Avoid for v1 — one-time is simpler to sell |

> Start with one-time pricing. It converts better for indie desktop apps and reduces churn anxiety.

---

## License Key System (via Lemon Squeezy)

### How It Works

1. User selects a tier and pays via Lemon Squeezy checkout
2. Lemon Squeezy automatically generates a license key and sends it via their built-in email
3. User downloads Tau from GitHub Releases
4. On first launch, user enters their license key in the app
5. App calls Lemon Squeezy's License Validation API to activate
6. Lemon Squeezy tracks how many devices the key has been activated on (enforces tier limits)

### Lemon Squeezy License API

```
# Activate a license
POST https://api.lemonsqueezy.com/v1/licenses/activate
{
  "license_key": "TAU-XXXX-XXXX-XXXX",
  "instance_name": "MacBook Pro"  // device identifier
}

# Validate a license (on each app launch)
POST https://api.lemonsqueezy.com/v1/licenses/validate
{
  "license_key": "TAU-XXXX-XXXX-XXXX",
  "instance_id": "<stored-instance-id>"
}
```

> Store the `instance_id` returned on activation in local app storage. Use it for all subsequent validations.

### In-App License Flow (to implement in Tau)

```
App Launch
  └── Check local storage for license data
        ├── No license → Show license key entry screen
        └── Has license → Call validate API
              ├── Valid → Unlock app, proceed
              └── Invalid / expired → Show re-entry screen (with grace period for offline use)
```

---

## GitHub Releases Setup

- Tag each release with semver: `v1.0.0`, `v1.1.0`, etc.
- Upload Windows installer as a release asset: `Tau-Windows-1.0.0-Setup.exe`
- The download button on the site links directly to the latest release asset
- Future: add Mac/Linux builds when ready

**Direct asset URL format:**
```
https://github.com/iwaju-labs/tau/releases/latest/download/Tau-Windows-{version}-Setup.exe
```

---

## Post-Purchase Flow

```
Lemon Squeezy Checkout
  └── Payment confirmed
        ├── Lemon Squeezy sends email with license key (built-in)
        └── Redirect to /thank-you page on site
              └── Show: key instructions + download button
```

The `/thank-you` page should include:
1. Confirmation message
2. Instructions to check email for license key
3. Prominent download button → GitHub Release
4. How to activate: "Open Tau → Settings → Enter License Key"

---

## SEO & Meta

- `og:title` — "Tau — Timelapse Editor for Creators"
- `og:description` — "Record, edit, and export timelapses that people actually want to watch."
- `og:image` — App screenshot or styled promo image
- Target keywords: timelapse editor, timelapse app windows, screen recording timelapse, study timelapse app

---

## Launch Checklist

### Site
- [ ] Hero section with demo video
- [ ] Features section
- [ ] Pricing section with Lemon Squeezy checkout links
- [ ] FAQ section
- [ ] `/thank-you` page
- [ ] Privacy Policy page (required by Lemon Squeezy / GDPR)
- [ ] Terms of Service page
- [ ] OG image for social sharing
- [ ] Domain configured (`usetau.app`)

### Payments & Licensing
- [ ] Lemon Squeezy account created
- [ ] Product created with correct tiers (Solo, Pro)
- [ ] License key generation enabled per product
- [ ] Checkout links embedded in site
- [ ] Test purchase end-to-end

### App
- [ ] License key entry screen implemented
- [ ] Lemon Squeezy activation API integrated
- [ ] Lemon Squeezy validation API called on launch
- [ ] Offline grace period handled (e.g. 7 days without re-validation)
- [ ] Feature gating tied to license tier

### Distribution
- [ ] GitHub Release created with production build
- [ ] Download link on site points to release asset
- [ ] Version bump process documented

### Pre-launch
- [ ] Test full flow: pay → receive key → download → activate
- [ ] Test activation limit enforcement (Solo = 1 device, Pro = 3)
- [ ] Test invalid/expired key handling in app

---

## Future Considerations

- **Mac support** — add macOS build to GitHub Releases, update site download button
- **Auto-updates** — `electron-updater` checking GitHub Releases for new versions
- **Affiliate program** — Lemon Squeezy has built-in affiliate support
- **Upgrade flow** — allow Solo users to upgrade to Pro (Lemon Squeezy supports this)
- **Analytics** — add Plausible or Fathom (privacy-friendly) to track conversion
