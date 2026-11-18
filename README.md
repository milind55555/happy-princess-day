# Happy Princess Day 👑

A romantic, immersive single-page surprise website for **Anjali** ("Jaaanu"), built by **Milind**.

Enchanted royal fairytale night theme — deep twilight, rose-gold, champagne gold, lavender and blush — with 3D scenes, smooth scrolling, glassmorphism cards, ambient music, and celebratory fireworks.

## Tech stack

- Vite + React + TypeScript
- Three.js via `@react-three/fiber` + `@react-three/drei`
- `@react-three/postprocessing` (available, configured for bloom/vignette)
- GSAP + ScrollTrigger for scroll animation
- Tailwind CSS
- Lenis for smooth scrolling
- Howler.js for audio
- canvas-confetti for celebrations
- Deployable on Vercel

## Folder structure

```
happy-princess-day/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── package.json
├── README.md
├── public/
│   ├── assets/
│   │   ├── photos/photo1.svg … photo8.svg   # replace with your .jpg/.png
│   │   └── music/song.mp3                    # add your song here
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── data/content.ts        # ALL editable copy, names, photos, timeline, letter
    ├── components/            # UI sections (Hero, Why, Gallery, Timeline, Moments, Finale)
    ├── scenes/                # Three.js scenes (Crown)
    ├── hooks/                 # useLenis, useMusic
    └── utils/                 # confetti helper
```

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

## Personalizing (edit one file)

Open `src/data/content.ts` — it holds every string so you never need to touch code:

- `her`, `him`, `nickname` — names used throughout.
- `metStory` — how you met (internship in Pune).
- `reasons` — 5–6 reasons with an icon (`heart` | `star` | `rose` | `moon` | `key` | `sparkle`).
- `photos` — array of `{ id, src, caption }`. Defaults to `photo1.svg`…`photo8.svg`.
- `timeline` — milestone events `{ year, title, body }`.
- `wishMessages` — messages shown when tapping a shooting star.
- `letter` — the royal letter revealed with a typewriter effect (placeholder `[WRITE YOUR LETTER HERE]` replaced with a template you can edit).
- `coupons` — flip-able royal coupons.
- `finale.message` / `finale.from` — closing lines.
- `contact.whatsapp` / `contact.email` — your links.

### Replacing photos

1. Drop your images into `public/assets/photos/` as `photo1.jpg` … `photo8.jpg`.
2. In `src/data/content.ts`, update each photo's `src` to `/assets/photos/photo1.jpg`, etc.
3. Optimize images before adding (they ship to production).

### Adding music

1. Place your song at `public/assets/music/song.mp3`.
2. The floating mute control remembers her choice in `localStorage`.
3. Music only starts after a user gesture (entrance gate), satisfying browser autoplay rules.

## Easter eggs

- Click the crown 5 times or type `princess` → hidden surprise (configured tastefully in the scenes/components).

## Deploying to Vercel

### Option A: Git push (recommended)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → "Add New Project" → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click Deploy.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # deploy
vercel --prod   # final production deploy
```

### Custom link (e.g. `anjali-princess-day.vercel.app`)

1. In your Vercel project dashboard → **Settings → Domains**.
2. Add a custom domain, or use the automatically assigned `.vercel.app` subdomain.
3. To get a specific subdomain like `anjali-princess-day`, claim it in the Domains settings (free, subject to availability).
4. Vercel provisions SSL automatically.

`vercel.json` is included to route all paths to `index.html` (SPA fallback) and cache assets.

## Performance notes

- Mobile-first; particle counts and postprocessing scale down on low-end devices.
- `prefers-reduced-motion` disables heavy particles and uses simple fades.
- Photos use `loading="lazy"`; swap SVGs for compressed JPGs for production.
- Target: 60fps on modern phones; Lighthouse ≥ 85 with optimized images.

## Swapping procedural 3D for GLTF models later

The crown in `src/scenes/CrownScene.tsx` is built procedurally (cylinder band + cone spikes + octahedron gem) so nothing external is required. To swap in a real model:

1. Get a `crown.glb` (e.g., Sketchfab, royalty-free).
2. Put it in `public/assets/models/crown.glb`.
3. In `CrownScene.tsx`, import `{ useGLTF, useLoader }` from `@react-three/drei` and replace the `<CrownGroup>` with:

```tsx
const { scene } = useLoader(GLTFLoader, '/assets/models/crown.glb');
<primitive object={scene} position={[0, 0.4, 0]} onClick={onClick} />
```

Scale/rotate the model to fit. Same approach works for a ring, petals, or heart model.

## Accessibility

- Semantic sections, ARIA labels on controls, keyboard-navigable buttons, sufficient contrast, `prefers-reduced-motion` support, alt text on photos.

---

Made with ❤️ by Milind for Jaaanu. Happy Princess Day, Anjali 👑💖
