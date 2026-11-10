# Slope — Salla Twilight theme (سلوب)

Modern blue-and-white theme for Slope Roastery. One codebase, fully bilingual: Arabic (RTL) and English (LTR)
switch automatically with the store language (`theme.is_rtl`, `src/locales/ar.json` + `en.json`, 142 keys each, identical).

## Two packages
| File | Dashboard language | Use when |
|---|---|---|
| `slope-theme-ar.zip` | Arabic field labels | the store team works in Arabic |
| `slope-theme-en.zip` | English field labels | the team works in English |

Storefront output is identical in both; only the theme-editor labels differ.

## What is inside (follows the approved V5 design)
- **Header + hero:** header sits on the blue hero and takes the active slide's colour; hero slides with counter, giant background word,
  floating product PNG, flavour accordion, dots/arrows (auto-advance, swipe, reduced-motion safe).
- **Home sections** (theme editor → add section): Hero slides · Build-your-bundle card (overlaps the hero, swappable products, live total) ·
  Trust strip · Best sellers · "Something for every taste" cut-out tiles · Ad banners (white + navy) · Flavour finder (interactive) ·
  Bundles shelf · Customer photos & reviews · Brand story · optional FAQ and contact band.
  A fresh install shows all ten V5 sections in order, with the real Slope product images bundled in `public/images/slope/`.
  Every text/image is editable; empty fields fall back to ready Arabic/English copy, so no section is ever blank.
- **Other pages restyled:** shop/category head with sub-category pills, product, cart, thank-you, wishlist, orders, profile,
  wallet, notifications, blog, brands, reviews, loyalty, information pages, footer (promo band + link columns).
- Transparent-background product images, 28–48 px rounded white cards on light blue, pill buttons. Responsive 320 px → 1440 px+.

## Install
1. Partners Portal → Themes → create a theme (private) → connect the GitHub repo it creates.
2. Push the contents of the zip to the repo's default branch.
3. Assign the theme to a demo store and add the Slope sections to the home page.

## Build notes
`public/` is committed pre-built (as in the Raed starter). The Slope layer is plain CSS at `src/assets/slope/slope.css`
plus `slope.js` (hero, bundle, finder; copied to `public/` by webpack's CopyPlugin and by hand in this package). To rebuild the base: `pnpm install && pnpm production`.

## Fill before launch (shown as [brackets])
Free-shipping amount (announcement bar) · Blue Friday % (banner, bundle) · customer count / harvest count / years (story) ·
real review names and quotes · FAQ delivery/freshness times · category and banner links · product PNGs (transparent).

## Verified
56 Twig templates parse with the real Twig engine; every Slope section, header, footer, home and listing page render in AR and EN,
with and without merchant data; no missing translation keys; no horizontal overflow at 1440 / 834 / 390 px.
