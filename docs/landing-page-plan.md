# Tau — Landing Page & Distribution Plan

## Overview

This document outlines the plan for building the **usetau.app** marketing and distribution site. The site serves as the primary acquisition, conversion, and download point for the Tau desktop app.

**Goal**: Visitor lands → understands the value → pays → gets license key → downloads from Cloudflare R2 → activates in app.

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
| Binary hosting | [Cloudflare R2](https://developers.cloudflare.com/r2/) | Free egress, custom domain, public URLs, works with private source repo |

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
3. User downloads Tau from `downloads.usetau.app`
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

## Cloudflare R2 Setup

> R2 is used instead of GitHub Releases because the `tau` source repo is private — GitHub Release download URLs on private repos require authentication and break public download links.

- Create an R2 bucket in your Cloudflare account (e.g. `tau-releases`)
- Connect a custom domain: `downloads.usetau.app`
- Upload builds as public objects with a consistent naming convention:
  - `Tau-Setup-1.0.0.exe` (Windows installer)
  - `Tau-1.0.0.dmg` (macOS disk image)
- Also maintain a `latest` pointer — either via a fixed alias path or a `latest.json` manifest for `electron-updater`

**Public download URL format:**
```
https://downloads.usetau.app/Tau-Setup-{version}.exe
https://downloads.usetau.app/Tau-{version}.dmg
```

**Auto-update manifest (for `electron-updater`):**
```
https://downloads.usetau.app/latest.yml        # Windows
https://downloads.usetau.app/latest-mac.yml    # macOS
```

### CI/CD Upload (GitHub Actions)

Your private `tau` repo's release workflow uploads to R2 using the Cloudflare R2 action or `rclone`:

```yaml
- name: Upload to R2
  uses: ryand56/r2-upload-action@latest
  with:
    r2-account-id: ${{ secrets.CF_ACCOUNT_ID }}
    r2-access-key-id: ${{ secrets.CF_R2_ACCESS_KEY }}
    r2-secret-access-key: ${{ secrets.CF_R2_SECRET_KEY }}
    r2-bucket: tau-releases
    source-dir: dist/
    destination-dir: ./
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
3. Prominent download button → `downloads.usetau.app` (Mac or Windows, detected via user agent)
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
- [ ] Cloudflare R2 bucket created (`tau-releases`)
- [ ] Custom domain configured (`downloads.usetau.app`)
- [ ] GitHub Actions workflow in `tau` repo uploads builds to R2 on release
- [ ] Windows build uploaded: `Tau-Setup-{version}.exe`
- [ ] macOS build uploaded: `Tau-{version}.dmg`
- [ ] `latest.yml` / `latest-mac.yml` manifests uploaded for `electron-updater`
- [ ] Download links on site point to `downloads.usetau.app`
- [ ] OS detection on site/thank-you page serves correct download (Mac vs Windows)

### Pre-launch
- [ ] Test full flow: pay → receive key → download → activate
- [ ] Test activation limit enforcement (Solo = 1 device, Pro = 3)
- [ ] Test invalid/expired key handling in app

---

## Future Considerations

- **Mac support** — macOS `.dmg` already planned in R2 setup; add notarization step to CI/CD
- **Auto-updates** — `electron-updater` pointing to `downloads.usetau.app` for update manifests
- **Affiliate program** — Lemon Squeezy has built-in affiliate support
- **Upgrade flow** — allow Solo users to upgrade to Pro (Lemon Squeezy supports this)
- **Analytics** — add Plausible or Fathom (privacy-friendly) to track conversion
