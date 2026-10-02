# Chorm Chandouern — Full-Stack Developer Portfolio

A premium, dark-atmosphere developer portfolio built with **Vue 3**, **Vite**, **TypeScript**,
**Tailwind CSS v4**, **Vue Router** and **Lucide** icons.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # vue-tsc --noEmit
npm run build      # typecheck + production build
npm run preview    # serve the production build
```

---

## Design system

| Token | Value | Role |
| --- | --- | --- |
| Background | `#020707` / `#031111` | Near-black base with a deep teal wash |
| Primary | `#00E5D4` | Cyan accent — glows, borders, CTAs |
| Secondary | `#0A5F61` | Atmospheric orb depth |
| Text | `#F4FFFF` | Primary type |
| Muted text | `#9BAFAF` | Secondary type |
| Borders | `rgba(0, 229, 212, 0.20)` | Thin cyan hairlines |

Tokens are defined once in `src/assets/main.css` via Tailwind v4 `@theme`, so every colour,
radius, shadow and easing is available as a utility (`bg-ink-950`, `text-primary`,
`border-line`, `rounded-4xl`, `shadow-glow`, `ease-out-expo`).

Typography: **Sora** for display, **Inter** for body, **Noto Sans Khmer** for the KH locale.

---

## Architecture

```
src/
├── components/
│   ├── AmbientBackdrop.vue      # glow orbs, grid, grain (fixed, decorative)
│   ├── Navbar.vue               # floating pill nav, mobile drawer, EN/KH
│   ├── HeroSection.vue          # two-column hero + portrait
│   ├── AboutSection.vue
│   ├── SkillsSection.vue        # pill groups + infinite marquee
│   ├── ProjectsSection.vue      # featured + grid, owns the detail modal
│   ├── ProjectCard.vue          # featured (wide) and grid variants
│   ├── ProjectDetailModal.vue   # focus-trapped dialog, prev/next
│   ├── ServicesSection.vue
│   ├── ExperienceSection.vue    # timeline / learning journey
│   ├── ContactSection.vue       # channels + validated form
│   ├── Footer.vue
│   ├── SectionHeading.vue       # shared eyebrow + display heading
│   └── TechPill.vue             # reusable technology pill
├── composables/
│   ├── useLocale.ts             # EN/KH with localStorage + SEO sync
│   ├── useSeo.ts                # title + meta description per locale
│   ├── useReveal.ts             # IntersectionObserver scroll reveal
│   └── useGithubRepos.ts        # live GitHub API fetch + curated fallback
├── data/
│   ├── projects.ts              # verified repository data + profile/contact
│   ├── skills.ts                # skill groups (verified flags)
│   ├── services.ts              # services, journey timeline, stats
│   └── i18n.ts                  # all EN + KH copy
├── router/index.ts
├── views/HomeView.vue
└── assets/main.css              # design tokens + utilities
```

---

## Project data is real

Every project in `src/data/projects.ts` was verified against the actual public repositories at
[github.com/Doeurn708](https://github.com/Doeurn708?tab=repositories) — file trees, `package.json`
manifests and SQL schemas were inspected. Features listed in the detail modal exist in the code
(for example the `api/` endpoint groups, `middleware/auth.php`, `public/uploads` and the
`users` / `categories` / `products` tables in `crud-midleware`).

At runtime `useGithubRepos.ts` fetches
`https://api.github.com/users/Doeurn708/repos` and merges live metadata — description, primary
language, stars, last push — over the curated baseline. If the request fails or GitHub rate-limits
it, the section silently falls back to the curated dataset, so a visitor never sees an error.

To add a project, append an entry to `src/data/projects.ts`. Repository links are derived from the
`repo` field, so a new entry automatically produces a correct GitHub URL.

---

## Contact details

Update `profile` in `src/data/projects.ts`:

```ts
export const profile = {
  name: 'Chorm Chandouern',
  github: 'https://github.com/Doeurn708',
  email: 'chormchandouern@gmail.com',
  linkedin: 'https://www.linkedin.com/in/Doeurn708',
  telegram: 'https://t.me/Doeurn708',
  // ...
}
```

The contact form validates in the browser and then hands off to the visitor's mail client via a
pre-filled `mailto:` link — no backend or third-party form service required.

---

## Portrait image

`src/assets/image.png` is the master photo — drop your replacement straight in there, keeping the
name, then run:

```bash
npm run optimize:portrait
```

`image.webp` (24 KB) and `image.jpg` (47 KB) are regenerated from it at 900px wide, and those are
what the site actually loads. `HeroSection.vue` uses a `<picture>` element so browsers pick the
WebP and fall back to JPEG.

---

## Accessibility & performance

- Semantic landmarks, one `<h1>`, labelled form fields, `role="alert"` validation messages
- Skip-to-content link, visible `:focus-visible` rings
- Focus trap, `Escape` handling and scroll lock in the project dialog
- `aria-current` on the active nav item, `aria-pressed` on the language switcher
- Full `prefers-reduced-motion` support — reveals resolve instantly, animation is disabled
- Lazy-loaded route chunk, `fetchpriority="high"` on the portrait, no render-blocking framework JS
- All decorative layers are `aria-hidden` and `pointer-events-none`

Verified with `scripts/smoke-test.mjs` (requires a local Chrome or Edge):

```bash
npm run build && npm run preview
CHROME_PATH="/path/to/chrome" node scripts/smoke-test.mjs
```

It checks desktop/tablet/mobile for console errors, horizontal overflow, broken images, missing
`alt` text, dead in-page anchors, unlabelled buttons, dialog behaviour and the EN/KH switch.

---

## Adding a language

1. Add a locale code and a `Messages` object in `src/data/i18n.ts`.
2. Register it in the `messages` record.
3. Add the button to `languages` in `Navbar.vue`.

`useLocale` persists the choice to `localStorage`, sets `<html lang>` and `data-locale`, and
`useSeo` updates the document title and meta description automatically.
