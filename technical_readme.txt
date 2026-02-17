# 🐠 GLOPBIX — Technical Documentation / Documentación Técnica

> © 2026 NMFTSTUDIO | nmftstudio@gmail.com

---

## 📋 Overview / Descripción General

**EN:** Glopbix is a single-file HTML5 virtual aquarium game featuring a procedural AI genetics system, Canvas-based rendering, Web Audio API synthesis, and three embedded mini-games. Built with zero external dependencies.

**ES:** Glopbix es un juego de acuario virtual en un solo archivo HTML5 con un sistema de genética procedural, renderizado basado en Canvas, síntesis de audio con Web Audio API y tres minijuegos embebidos. Sin dependencias externas.

---

## 🏗️ Architecture / Arquitectura
```
glopbix.html (single file)
├── <style>         → CSS variables, animations, responsive layout
├── HTML            → DOM structure (screens, modals, overlays)
└── <script>
    ├── SFX         → Web Audio API engine (music + SFX)
    ├── CFG         → Global configuration constants
    ├── SPECIES     → 12 base species definitions
    ├── FOOD        → Food types & hunger values
    ├── DECOS       → Decoration catalog (Common → Legendary)
    ├── SKINS       → Tank background themes
    ├── PEARL_SHOP  → Premium shop items
    ├── ACHIEVEMENTS→ 10 achievement definitions
    ├── DNA class   → Genetic engine (inheritance + mutation)
    ├── Fish class  → Entity: physics, rendering, AI behavior
    ├── GS object   → Game State (single source of truth)
    ├── Game Loop   → requestAnimationFrame, dt-capped at 40ms
    ├── Render      → Canvas 2D drawing pipeline
    ├── UI          → DOM updates, modals, notifications
    ├── Save/Load   → localStorage persistence (key: glopbix_v4)
    ├── Tutorial    → 9-step interactive overlay
    ├── Encyclopedia→ Species discovery + scoring system
    ├── Adventure   → Hub + 3 mini-games
    └── Offline     → Offline progress calculation on startup
```

---

## ⚙️ Tech Stack / Stack Tecnológico

| Layer | Technology |
|---|---|
| Language | Vanilla JavaScript (ES6+) |
| Rendering | Canvas 2D API |
| Audio | Web Audio API (oscillator synthesis) |
| Storage | localStorage (key: `glopbix_v4`) |
| Fonts | Google Fonts: Fredoka, Poppins |
| Animations | CSS keyframes + requestAnimationFrame |
| Notifications | Web Notifications API |
| Build | None — single HTML file, zero bundler |
| Dependencies | **Zero** external JS libraries |

---

## 🧬 DNA / Genetics System

Each `DNA` instance contains 9 numeric genes:

| Gene | Type | Range | Effect |
|---|---|---|---|
| `hue` | float | 0–360 | Body color hue |
| `sat` | float | 20–100 | Color saturation |
| `lit` | float | 25–75 | Color lightness |
| `size` | float | 10–65 | Body radius (px) |
| `speed` | float | 0.4–3 | Movement velocity |
| `pat` | int | 0–3 | Pattern: none/spots/stripes/gradient |
| `fins` | float | 0.6–1.4 | Dorsal fin scale |
| `tail` | float | 0.5–1.3 | Tail fin scale |
| `pure` | string/null | SPECIES key | Species ID (null = hybrid) |

**Inheritance algorithm (`DNA._m`):**
- 45% chance → inherit from parent A
- 45% chance → inherit from parent B
- 10% chance → average of both
- ± random mutation delta added to all paths

**Rarity calculation:**
```js
score = size * 0.3 + speed * 10 + (fins + tail) * 8
// Common < 20 | Rare 20–28 | Epic 28–35 | Legendary > 35
```

---

## 🐟 Fish Class
```js
class Fish {
  constructor(dna)   // accepts DNA instance
  update(dt)         // physics, hunger decay, food-seeking AI, species behaviors
  draw(ctx)          // full Canvas 2D render: body, fins, tail, eye, patterns, overlays
  addXP(amount)      // XP gain → level up → size growth → pearl reward
  getValue()         // sell value = 15 + size*1.5 + lv*8
  ser()              // serialize to plain object for localStorage
}
```

**Special species behaviors in `update()`:**
- `pleco` / `star` → drift to tank bottom, passively increase `GS.clean`
- `shark` → hunts and eats small fish when hunger < 40
- `axolotl` → decreases tank cleanliness on feeding
- `jelly` → hunger locked at 80 (never starves)
- `turtle` → requires `veg` food type

---

## 🎮 Game Loop
```js
requestAnimationFrame(loop)
// dt = capped at 40ms to prevent physics explosion on tab-resume
// Sequence per frame:
// 1. Time progression → day events
// 2. Tank cleanliness decay (fish count weighted)
// 3. Starvation death check (probabilistic)
// 4. Fish.update(dt) for each fish
// 5. Food physics (gravity + bottom decay → waste)
// 6. Achievement checks
// 7. Particle + Bubble tick
// 8. Full Canvas render
// 9. DOM UI update
```

**Tab visibility handling:**
- `visibilitychange` → resets `last` timestamp on return
- Prevents accumulated dt causing physics teleportation
- Triggers `save()` and push notifications on hide

---

## 💾 Save / Load System

**Storage key:** `localStorage['glopbix_v4']`

**Saved fields:**
```
coins, pearls, day, time, clean, hunger,
inv, decos, graveyard[], level, xp,
stats{fed, cleaned, bred, caught},
skin, achievements{}, upgrades{},
discovered{}, encComplete, loginStreak,
lastLogin, lastSeen, fish[]
```

**Fish serialized via `Fish.ser()`:**
```js
{ dna, lv, xp, happy, hunger, size, x, y, born }
```

**Offline progress (`calcOfflineProgress`):**
- Caps at 24h of elapsed time
- Hunger decay at 40% of real-time rate
- Clean decay at 30% of real-time rate
- Passive income at 30% of real-time rate (capped at 2000 coins)
- Triggers welcome-back modal with status summary

**Legacy key migration:** Also reads `gloobix_v4` and `gloobix_v3` for backward compatibility.

---

## 🎵 Audio Engine (SFX)

Built entirely on Web Audio API — no audio files needed.
```js
SFX.init()      // Creates AudioContext, gain nodes
SFX.wake()      // Resumes suspended context (required on mobile)
SFX.t(freq, duration, type, volume)  // Base oscillator tone
// Named sounds: pop, feed, clean, breed, cast, bite, caught,
//               buy, err, rev, levelUp
SFX.startM()    // Ambient generative music (chord arpeggios, setInterval 6s)
SFX.setVol(type, value)  // 'sfx' or 'mus', 0.0–1.0
```

---

## 🖼️ Rendering Pipeline

Per frame, in order:

1. **Background gradient** — skin-dependent linear gradient
2. **Dirty water overlay** — green tint when `clean < 60`
3. **Light rays** — 4 animated diagonal beams
4. **Bubbles** — procedural rising spheres with wobble
5. **Sand bottom** — gradient + static pebble texture
6. **Decorations** — per-item hand-drawn Canvas shapes
7. **Food particles** — type-coded shapes (flake/pellet/meat/veg/waste)
8. **Fish** — per-fish full body render (see DNA for gene→visual mapping)
9. **Fishing line** — wire + hook when active
10. **Particles** — generic alpha-faded circles

**DPR scaling:** Canvas uses `devicePixelRatio` (capped at 2×) for crisp rendering on retina displays.

---

## 🌊 Adventure Mini-Games

### 1. Abyssal Hunt (`openAbyss`)
- Own Canvas loop, separate from main game
- Click-to-catch fish; depth increases over time
- 4 fish tiers unlock at depth thresholds: 0 / 180 / 420 / 800m
- Oxygen bar depletes; `finishAbyss()` on empty
- Pearl bonus: +1 at 300m depth, +2 at 600m

### 2. Reef Rush (`openReef`)
- Tap-to-fly gravity runner, 30 second duration
- Player `vy` += gravity each frame, tap sets `vy = -6.5`
- Obstacles (40%) and collectibles (60%) spawn from right
- 3 lives system; speed scales with time
- Pearl bonus: +1 for 4+ collected, +2 for 8+

### 3. The Leviathan (`startLevGame`)
- 8-step QTE (Quick Time Event) sequence
- Random symbol sequence from 4 symbols (🔴🔵🟡🟢)
- 2.5s timer per prompt; `setInterval` at 50ms tick
- HP bar depletes proportionally per correct hit
- Win condition: ≥ 50% hits correct
- Pearl bonus: +3 on victory

---

## 📖 Encyclopedia System
```js
getEncyclopedia()         // Merges fish[], graveyard[], discovered{}
calcEncyclopediaScore()   // 0–1000 pts: species(500) + fish(200) + days(120) + achievements(100) + breeds(80)
scoreRank(score)          // 6-tier rank label
```

**Completion reward** (one-time):
- +2000 coins
- +25 pearls
- Celebration modal with particle rain

---

## 💎 Pearl Economy

**Earn:**
| Source | Amount |
|---|---|
| Daily login (streak < 7d) | +1 |
| Daily login (streak ≥ 7d) | +3 |
| Fish level up | +1 |
| Every 5 breeds | +2 |
| New species discovery | +2 |
| Abyssal Hunt (deep) | +1 to +2 |
| Reef Rush (good run) | +1 to +2 |
| Leviathan victory | +3 |
| Encyclopedia complete | +25 |

**Spend (PEARL_SHOP):**
- Tank skins: 8–12 pearls
- Legendary decorations: 15–20 pearls
- Premium food ×10: 5 pearls
- Tank expansion (→16 fish): 18 pearls

---

## 🔔 Push Notifications

Uses `Notification` Web API (requires permission). Requested 5 seconds after game start.

Triggers:
- Hunger notification: scheduled dynamically based on average fish hunger decay
- Dirty tank: fires on `visibilitychange` (hide) if `clean < 35`
- Emergency: fires if any fish has `hunger < 25`
- Daily events: rare visitor species, day milestone

---

## 🧩 Tutorial System

9-step interactive overlay with:
- Spotlight cutout via `box-shadow: 0 0  0 9999px rgba(0,0,0,0.72)`
- `DOMRect`-based positioning per target element
- Animated arrow indicator (above/below based on position)
- Progress dots, prev/next navigation
- `.tut-hl` class adds pulsing pink glow to highlighted element

---

## 📐 Responsive Design

- Mobile-first layout (flex column, `100vh`/`100vw`)
- `touch-action: none` on body — all touch handled manually
- `user-scalable=no` in viewport meta
- Canvas redrawn on `resize` event
- Logo hidden on screens < 600px (`@media`)
- Bottom bar wraps on narrow screens (`flex-wrap: wrap`)

---

## 🗂️ Configuration Constants (CFG)
```js
const CFG = {
  DAY_MS:     180000,  // Real milliseconds per in-game day (3 min)
  MAX_FISH:   12,      // Max fish in tank (upgradeable to 16)
  CATCH_MULT: 15,      // Fishing sell value multiplier
  MAX_P:      25,      // Max active particles
  MAX_B:      12,      // Max active bubbles
  BREED_COST: 50       // Coins required to breed
}
```

---

## 🔧 Known Constraints

- **localStorage only** — no server-side persistence
- **Single HTML file** — all logic, styles and assets inline
- **No bundler/transpiler** — ES6+ features, no IE support
- **Web Audio API** — may require user gesture on iOS to init
- **Canvas 2D** — no WebGL; rendering scales linearly with fish count
- **Notification API** — requires HTTPS in production

---

## 📦 Deployment

No build step required. Deploy as a single static `.html` file:
```bash
# Local dev
open glopbix.html

# Static hosting (any)
cp glopbix.html /var/www/html/

# PWA-ready — add manifest.json + service worker for installable app
```

---

## 📁 File Structure
```
glopbix.html          ← Entire game (single file, ~2200 lines)
README_GooglePlay.md  ← Store listing README (this repo)
README_Technical.md   ← Technical documentation (this file)
```

---

<p align="center">
  <strong>© 2026 NMFTSTUDIO</strong> · nmftstudio@gmail.com<br>
  <em>All rights reserved. Built with Vanilla JS, Canvas 2D & Web Audio API.</em>
</p>