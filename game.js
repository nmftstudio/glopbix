/* Glopbix - game.js | Generated from glopbix_v4_final.html */

/* ============================================================
   JS BLOCK 1
   ============================================================ */

// Generate inline manifest for Add to Home Screen
    const _manifest = {
      name: "Glopbix - Virtual Aquarium",
      short_name: 'Glopbix',
      description: 'Raise, breed & discover unique fish with AI-generated DNA',
      start_url: '.',
      display: 'standalone',
      background_color: '#0a1628',
      theme_color: '#0a1628',
      orientation: 'portrait',
      icons: [{
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' rx='100' fill='%230a1628'/><text y='380' x='80' font-size='380'>🐙</text></svg>",
        sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable'
      }]
    };
    const _blob = new Blob([JSON.stringify(_manifest)], { type: 'application/json' });
    const _mLink = document.createElement('link');
    _mLink.rel = 'manifest';
    _mLink.href = URL.createObjectURL(_blob);
    // document.currentScript doesn't work in external .js files — use head.appendChild instead
    document.head.appendChild(_mLink);


/* ============================================================
   JS BLOCK 2
   ============================================================ */

// Spawn animated bubbles on start screen
    (function spawnStartBubbles() {
      const layer = document.getElementById('start-bubbles');
      if (!layer) return;
      for (let i = 0; i < 18; i++) {
        const b = document.createElement('div');
        b.className = 's-bubble';
        const sz = 4 + Math.random() * 16;
        b.style.cssText = `
                width:${sz}px; height:${sz}px;
                left:${Math.random() * 100}%;
                bottom:${-sz}px;
                animation-duration:${6 + Math.random() * 12}s;
                animation-delay:${Math.random() * 10}s;
            `;
        layer.appendChild(b);
      }
    })();


/* ============================================================
   JS BLOCK 3
   ============================================================ */

/**
     * Glopbix - Virtual Aquarium with AI Genetics
     * © 2026 NMFTSTUDIO | nmftstudio@gmail.com
     * v7 — Definitive Edition (v002 bugfix: optional chaining, roundRect polyfill, Cloudflare refs removed)
     */

    // ============== POLYFILLS ==============
    // roundRect polyfill for browsers that don't support it (Android WebView, older Safari)
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (typeof r === 'undefined') r = 0;
        if (typeof r === 'object') r = r[0] || 0;
        r = Math.min(r, w / 2, h / 2);
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.arcTo(x + w, y, x + w, y + r, r);
        this.lineTo(x + w, y + h - r);
        this.arcTo(x + w, y + h, x + w - r, y + h, r);
        this.lineTo(x + r, y + h);
        this.arcTo(x, y + h, x, y + h - r, r);
        this.lineTo(x, y + r);
        this.arcTo(x, y, x + r, y, r);
        this.closePath();
        return this;
      };
    }


    const SFX = {
      ctx: null, volNode: null, sfxVol: 0.5, musicNode: null, musicVol: 0.5, mId: null, ready: false,
      init() {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        this.ctx = new AC();
        this.volNode = this.ctx.createGain(); this.volNode.gain.value = this.sfxVol; this.volNode.connect(this.ctx.destination);
        this.musicNode = this.ctx.createGain(); this.musicNode.gain.value = this.musicVol; this.musicNode.connect(this.ctx.destination);
        this.ready = true;
      },
      wake() { if (!this.ready) this.init(); if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => { }); },
      t(f, d, ty, v) { if (!this.ctx || !this.ready) return; const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = ty || 'sine'; o.frequency.value = f; g.gain.setValueAtTime((v || .3), this.ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001, this.ctx.currentTime + (d || .15)); o.connect(g); g.connect(this.volNode); o.start(); o.stop(this.ctx.currentTime + (d || .15)); },
      pop() { this.t(600, .1); setTimeout(() => this.t(800, .08), 40); },
      feed() { this.t(523, .1, 'triangle'); },
      clean() { [400, 500, 600].forEach((f, i) => setTimeout(() => this.t(f, .15, 'sine', .2), i * 60)); },
      breed() { this.t(440, .2, 'triangle'); setTimeout(() => this.t(554, .2, 'triangle'), 150); setTimeout(() => this.t(659, .3, 'triangle'), 300); },
      cast() { this.t(300, .04, 'sawtooth', .1); },
      bite() { this.t(800, .05, 'square', .3); setTimeout(() => this.t(1000, .05, 'square', .3), 60); },
      caught() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.t(f, .2, 'triangle', .3), i * 100)); },
      buy() { this.t(440, .1, 'triangle', .3); setTimeout(() => this.t(880, .15, 'triangle', .2), 80); },
      err() { this.t(200, .25, 'square', .2); },
      rev() { [262, 330, 392, 523, 659].forEach((f, i) => setTimeout(() => this.t(f, .3, 'sine', .25), i * 100)); },
      levelUp() { [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => this.t(f, .25, 'triangle', .35), i * 120)); },
      startM() {
        if (this.mId) return;
        const chords = [[261, 329, 392, 493], [349, 440, 523, 659], [220, 261, 329, 392], [196, 246, 293, 349]];
        const p = () => {
          if (!this.ctx || !this.ready) return;
          const c = chords[Math.random() * chords.length | 0];
          c.forEach((n, i) => {
            setTimeout(() => {
              if (!this.ctx) return;
              const o = this.ctx.createOscillator(), g = this.ctx.createGain();
              o.type = 'triangle'; o.frequency.value = n;
              g.gain.setValueAtTime(.04, this.ctx.currentTime);
              g.gain.exponentialRampToValueAtTime(.001, this.ctx.currentTime + 3.5);
              o.connect(g); g.connect(this.musicNode); o.start(); o.stop(this.ctx.currentTime + 3.5);
            }, i * 180 + Math.random() * 50);
          });
        };
        p(); this.mId = setInterval(p, 6000 + Math.random() * 2000);
      },
      setVol(ty, v) { if (ty === 'sfx') { this.sfxVol = v; if (this.volNode) this.volNode.gain.value = v; } else { this.musicVol = v; if (this.musicNode) this.musicNode.gain.value = v; } }
    };

    // ============== HAPTIC FEEDBACK ==============
    const HAP = {
      light() { if (navigator.vibrate) navigator.vibrate(10); },
      medium() { if (navigator.vibrate) navigator.vibrate(25); },
      heavy() { if (navigator.vibrate) navigator.vibrate([30, 10, 30]); },
      success() { if (navigator.vibrate) navigator.vibrate([15, 10, 15, 10, 50]); },
      error() { if (navigator.vibrate) navigator.vibrate([60, 20, 60]); }
    };


    // ─── ANDROID / LOW-END DEVICE DETECTION ───────────────────────────────────
    // Runs once synchronously so every subsequent function can read _LOWEND flag.
    const _LOWEND = (() => {
      const ua = navigator.userAgent || '';
      const isAndroid = /android/i.test(ua);
      const isMobile = isAndroid || /iPhone|iPad/.test(ua);
      // Check WebGL availability (Pixi needs it; Canvas-fallback devices are always low-end)
      let hasWebGL = false;
      try {
        const t = document.createElement('canvas');
        hasWebGL = !!(t.getContext('webgl') || t.getContext('experimental-webgl'));
      } catch (e) { }
      // Tiny CPU benchmark: >12ms on a busy loop → low-end
      const t0 = performance.now();
      let x = 0; for (let i = 0; i < 200000; i++) x += i;
      const slow = (performance.now() - t0) > 12;
      const lowEnd = isAndroid || slow || !hasWebGL;
      // Apply body class immediately so CSS can react
      if (lowEnd) document.documentElement.classList.add('android-low-end');
      if (isAndroid) document.body.classList.add('no-water-filter'); // disables SVG displacement CSS
      return lowEnd;
    })();

    // ─── BACKGROUND GRADIENT CACHE ─────────────────────────────────────────────
    // Gradients are expensive to create — cache them, rebuild only on resize/skin change
    const _bgCache = { skin: null, W: 0, H: 0, bg: null, sand: null, dirty: true };

    const CFG = { DAY_MS: 180000, MAX_FISH: 12, CATCH_MULT: 15, MAX_P: _LOWEND ? 12 : 25, MAX_B: _LOWEND ? 5 : 12, BREED_COST: 80 };
    // Tank capacity tiers: [maxFish, coinCost, label, emoji]
    const TANK_TIERS = [
      { cap: 12, cost: 0, label: 'Starter Bowl', emoji: '🐠', desc: 'Your cozy starter tank' },
      { cap: 16, cost: 500, label: 'Small Tank', emoji: '🪣', desc: 'Room for a few more friends' },
      { cap: 20, cost: 900, label: 'Home Aquarium', emoji: '🐟', desc: 'A proper home aquarium' },
      { cap: 25, cost: 1500, label: 'Display Tank', emoji: '🌊', desc: 'Show-worthy display tank' },
      { cap: 30, cost: 2400, label: 'Community Tank', emoji: '🏊', desc: 'A bustling community' },
      { cap: 40, cost: 4000, label: 'Public Exhibit', emoji: '🏛️', desc: 'Museum-grade exhibit' },
      { cap: 50, cost: 6500, label: 'Mega Aquarium', emoji: '🌐', desc: 'Mega aquarium tier' },
      { cap: 66, cost: 11000, label: 'Ocean Preserve', emoji: '🦈', desc: 'You run a preserve!' },
      { cap: 77, cost: 18000, label: '🌟 The Deep Blue', emoji: '🌌', desc: 'Maximum capacity — you are an Ocean Master!' },
    ];
    // Science data: real species names, habitat, conservation status, fun facts
    const SCIENCE_DATA = {
      goldfish: { latin: 'Carassius auratus', family: 'Cyprinidae', habitat: 'Freshwater ponds & slow rivers, East Asia', origin: 'China, 700+ years of selective breeding', conservation: 'Least Concern (LC)', funFact: 'Goldfish have a memory span of at least 3 months — the "3-second memory" myth is false!', diet: 'Omnivore — algae, insects, crustaceans', lifespan: '10–15 years', maxSize: '30–45 cm in natural ponds' },
      guppy: { latin: 'Poecilia reticulata', family: 'Poeciliidae', habitat: 'Freshwater streams, Trinidad & Venezuela', origin: 'Northern South America & Caribbean', conservation: 'Least Concern (LC)', funFact: 'Guppies are livebearers — females give birth to up to 200 fry per month!', diet: 'Omnivore — algae, mosquito larvae, small invertebrates', lifespan: '2–5 years', maxSize: '6 cm (females larger)' },
      neon: { latin: 'Paracheirodon innesi', family: 'Characidae', habitat: 'Clear & blackwater tributaries of the Amazon Basin', origin: 'Northeastern Peru & Colombia', conservation: 'Least Concern (LC)', funFact: 'Their iridescent blue stripe is produced by iridophores — not pigment, but structural color!', diet: 'Omnivore — algae, small invertebrates, zooplankton', lifespan: '5–10 years', maxSize: '4 cm' },
      betta: { latin: 'Betta splendens', family: 'Osphronemidae', habitat: 'Rice paddies, ponds, slow streams — Thailand & Southeast Asia', origin: 'Mekong basin, Thailand', conservation: 'Vulnerable (VU) — wild populations threatened', funFact: 'Bettas have a labyrinth organ that allows them to breathe atmospheric air — they can survive in oxygen-poor water!', diet: 'Carnivore — insects, larvae, small crustaceans', lifespan: '2–4 years', maxSize: '7 cm' },
      clown: { latin: 'Amphiprioninae (30 species)', family: 'Pomacentridae', habitat: 'Warm coral reefs of the Indian & Pacific Oceans', origin: 'Indo-Pacific region', conservation: 'Least Concern (LC) — but threatened by bleaching', funFact: 'All clownfish are born male — the dominant fish can change sex to become female!', diet: 'Omnivore — algae, zooplankton, small invertebrates', lifespan: '6–10 years', maxSize: '11 cm' },
      angel: { latin: 'Pterophyllum scalare', family: 'Cichlidae', habitat: 'Slow-flowing Amazon & Orinoco river systems', origin: 'South America — Brazil, Peru, Colombia', conservation: 'Least Concern (LC)', funFact: 'Angelfish pair-bond for life and are dedicated parents, guarding eggs and fanning them for oxygenation.', diet: 'Carnivore — small fish, invertebrates, insect larvae', lifespan: '10–15 years', maxSize: '15 cm' },
      pleco: { latin: 'Hypostomus plecostomus', family: 'Loricariidae', habitat: 'Fast-flowing rivers & streams of Northeastern South America', origin: 'Brazil, Guiana, Trinidad', conservation: 'Least Concern (LC)', funFact: 'Plecos use their sucker mouths to cling to rocks and rasp algae — and can breathe through their intestines!', diet: 'Herbivore/Detritivore — algae, wood, organic matter', lifespan: '10–15 years', maxSize: '50+ cm in the wild' },
      shark: { latin: 'Triakidae / various families', family: 'Carcharhiniformes (order)', habitat: 'Coastal & open oceans worldwide', origin: 'Pelagic ocean — global distribution', conservation: 'Many species Endangered (EN) or Vulnerable (VU)', funFact: 'Sharks have electroreceptors called the Ampullae of Lorenzini that can detect the electrical fields of prey hidden under sand!', diet: 'Carnivore — fish, cephalopods, marine mammals', lifespan: '20–30 years (up to 400+ for Greenland shark)', maxSize: '1.2–18 m depending on species' },
      axolotl: { latin: 'Ambystoma mexicanum', family: 'Ambystomatidae', habitat: 'Lake Xochimilco canal system, Mexico City', origin: 'Mexico — nearly endemic to a single lake system', conservation: 'Critically Endangered (CR) — fewer than 50–1000 wild individuals', funFact: 'Axolotls are neotenic — they retain larval features (gills, aquatic lifestyle) into adulthood, essentially remaining "eternal juveniles"!', diet: 'Carnivore — worms, insects, small fish, crustaceans', lifespan: '10–15 years', maxSize: '23–45 cm' },
      turtle: { latin: 'Chelonia mydas (Green sea turtle)', family: 'Cheloniidae', habitat: 'Tropical & subtropical coastal waters worldwide', origin: 'Circumglobal — nesting on tropical beaches', conservation: 'Endangered (EN) — threatened by pollution, bycatch, habitat loss', funFact: 'Sea turtles use the Earth\'s magnetic field as a GPS to navigate back to the exact beach where they were born — sometimes after 30 years at sea!', diet: 'Herbivore (adults) — seagrass & algae; Omnivore (juveniles)', lifespan: '80+ years', maxSize: '1.5 m, 300 kg' },
      jelly: { latin: 'Aurelia aurita', family: 'Ulmaridae', habitat: 'Coastal waters worldwide — temperate to tropical', origin: 'Circumglobal distribution', conservation: 'Least Concern (LC) — populations increasing due to ocean warming', funFact: 'Moon jellies have no brain, heart, or bones — they are 95% water and have been on Earth for 500 million years!', diet: 'Planktivore — zooplankton, small fish eggs, larvae', lifespan: '6–12 months per cycle (biologically immortal under stress via transdifferentiation)', maxSize: '40 cm bell diameter' },
      star: { latin: 'Asterias rubens / Pisaster ochraceus', family: 'Asteriidae', habitat: 'Rocky intertidal & subtidal coastal zones', origin: 'Atlantic & Pacific coastal seas', conservation: 'Least Concern (LC) — but affected by Sea Star Wasting Disease', funFact: 'Starfish (sea stars) can regenerate entire limbs — and some species can regrow a whole body from a single severed arm!', diet: 'Carnivore — mussels, clams, oysters, sea urchins', lifespan: '5–35 years', maxSize: '25–60 cm across' },
    };

    const SPECIES = {
      goldfish: { name: 'Goldfish', hue: 35, sat: 90, lit: 55, size: 22, speed: 1.2, pat: 0, fins: 1, tail: .9, price: 0, maxSz: 35, food: 'basic', optTempLow: 18, optTempHigh: 24, desc: 'Loves cool water' },
      guppy: { name: 'Guppy', hue: 190, sat: 85, lit: 55, size: 16, speed: 1.8, pat: 1, fins: .8, tail: .7, price: 40, maxSz: 24, food: 'basic', optTempLow: 22, optTempHigh: 28, desc: 'Easy to raise' },
      neon: { name: 'Neon Tetra', hue: 350, sat: 80, lit: 50, size: 14, speed: 2, pat: 2, fins: .7, tail: .6, price: 80, maxSz: 22, food: 'basic', optTempLow: 20, optTempHigh: 26, desc: 'Glowing beauty' },
      betta: { name: 'Betta Fish', hue: 260, sat: 90, lit: 55, size: 20, speed: 1.0, pat: 3, fins: 1.6, tail: 1.4, price: 140, maxSz: 30, food: 'basic', optTempLow: 24, optTempHigh: 30, desc: 'Majestic flowing fins' },
      clown: { name: 'Clownfish', hue: 22, sat: 95, lit: 58, size: 18, speed: 1.4, pat: 2, fins: .9, tail: .8, price: 220, maxSz: 28, food: 'basic', optTempLow: 24, optTempHigh: 30, desc: 'Classic orange & white' },
      angel: { name: 'Angelfish', hue: 45, sat: 30, lit: 70, size: 28, speed: .9, pat: 2, fins: 1.8, tail: 1.2, price: 300, maxSz: 45, food: 'basic', optTempLow: 24, optTempHigh: 29, desc: 'Elegant triangle shape' },
      pleco: { name: 'Pleco (Cleaner)', hue: 120, sat: 40, lit: 40, size: 25, speed: .8, pat: 1, fins: .9, tail: .8, price: 180, maxSz: 40, food: 'waste', optTempLow: 22, optTempHigh: 28, desc: 'Eats waste, cleans tank' },
      shark: { name: 'Mini Shark', hue: 200, sat: 20, lit: 40, size: 35, speed: 2.2, pat: 3, fins: 1.2, tail: 1.1, price: 800, maxSz: 60, food: 'meat', optTempLow: 20, optTempHigh: 26, desc: 'Eats small fish!' },
      axolotl: { name: 'Axolotl', hue: 330, sat: 90, lit: 85, size: 28, speed: .6, pat: 0, fins: 1.4, tail: .6, price: 480, maxSz: 35, food: 'meat', optTempLow: 16, optTempHigh: 22, desc: 'Unique but messy — loves cold water' },
      turtle: { name: 'Sea Turtle', hue: 150, sat: 60, lit: 50, size: 40, speed: .5, pat: 1, fins: 1.5, tail: .4, price: 620, maxSz: 65, food: 'veg', optTempLow: 24, optTempHigh: 31, desc: 'Loves veggies and warm water' },
      jelly: { name: 'Moon Jelly', hue: 280, sat: 80, lit: 90, size: 30, speed: .3, pat: 3, fins: 2, tail: 2, price: 950, maxSz: 50, food: 'none', optTempLow: 15, optTempHigh: 20, desc: 'Glowing beauty — prefers cold' },
      star: { name: 'Starfish', hue: 10, sat: 80, lit: 60, size: 15, speed: .2, pat: 1, fins: 0, tail: 0, price: 240, maxSz: 20, food: 'waste', optTempLow: 21, optTempHigh: 27, desc: 'Bottom feeder' }
    };

    // ══════════════════════════════════════════════════════════════
    // SPECIES BLUEPRINTS — 65 AI-generated species (total = 12 + 65 = 77)
    // unlockLevel = player level required · AI fills in stats on demand
    // ══════════════════════════════════════════════════════════════
    const SPECIES_BLUEPRINTS = [
      // ── TIER 1 — Common (level 2–8, price ~100-350) ──
      { id: 'ai_puffer', name: 'Pufferfish', emoji: '🐡', unlockLevel: 2, hint: 'colorful marine pufferfish that inflates when threatened, clumsy swimmer', priceMin: 110, priceMax: 280, foodHint: 'meat' },
      { id: 'ai_danio', name: 'Zebra Danio', emoji: '🐟', unlockLevel: 3, hint: 'fast striped freshwater danio fish, silver-blue with horizontal yellow stripes', priceMin: 60, priceMax: 150, foodHint: 'basic' },
      { id: 'ai_discus', name: 'Discus Fish', emoji: '🎯', unlockLevel: 3, hint: 'laterally compressed disc-shaped tropical cichlid, vivid red-orange markings', priceMin: 200, priceMax: 380, foodHint: 'meat' },
      { id: 'ai_molly', name: 'Molly Fish', emoji: '🐠', unlockLevel: 4, hint: 'peaceful livebearer freshwater fish, black or dalmatian coloring', priceMin: 50, priceMax: 120, foodHint: 'basic' },
      { id: 'ai_corydoras', name: 'Corydoras', emoji: '🐡', unlockLevel: 4, hint: 'small armored bottom-dwelling catfish, pale with dark spots, peaceful cleaner', priceMin: 70, priceMax: 180, foodHint: 'waste' },
      { id: 'ai_swordtail', name: 'Swordtail', emoji: '🐟', unlockLevel: 5, hint: 'elongated freshwater fish with a distinctive long sword-like lower tail fin, vivid red', priceMin: 80, priceMax: 200, foodHint: 'basic' },
      { id: 'ai_platy', name: 'Platy Fish', emoji: '🐠', unlockLevel: 5, hint: 'colorful robust livebearer, short-bodied with a fan tail, orange-yellow', priceMin: 55, priceMax: 140, foodHint: 'basic' },
      { id: 'ai_rainbowfish', name: 'Rainbowfish', emoji: '🌈', unlockLevel: 6, hint: 'Australian rainbowfish with iridescent multicolor flanks that shimmer in light', priceMin: 120, priceMax: 260, foodHint: 'basic' },
      { id: 'ai_oscar', name: 'Oscar Fish', emoji: '🐡', unlockLevel: 7, hint: 'large intelligent cichlid with orange tiger markings, bold and charismatic personality', priceMin: 200, priceMax: 350, foodHint: 'meat' },
      { id: 'ai_cichlid', name: 'African Cichlid', emoji: '🐠', unlockLevel: 8, hint: 'vivid African rift lake cichlid with bright electric blue and yellow stripes', priceMin: 180, priceMax: 340, foodHint: 'basic' },

      // ── TIER 2 — Rare (level 9–16, price ~350-750) ──
      { id: 'ai_seahorse', name: 'Seahorse', emoji: '🐴', unlockLevel: 9, hint: 'vertical swimming marine seahorse with prehensile tail, mottled golden-brown', priceMin: 380, priceMax: 600, foodHint: 'none' },
      { id: 'ai_surgeonfish', name: 'Blue Tang', emoji: '🐠', unlockLevel: 9, hint: 'oval vivid electric-blue tang with a sharp spine near its tail, coral reef dweller', priceMin: 400, priceMax: 620, foodHint: 'veg' },
      { id: 'ai_parrotfish', name: 'Parrotfish', emoji: '🦜', unlockLevel: 10, hint: 'colorful parrotfish with beak-like fused teeth, turquoise and pink scales, coral eater', priceMin: 360, priceMax: 580, foodHint: 'veg' },
      { id: 'ai_wrasse', name: 'Wrasse', emoji: '🐟', unlockLevel: 11, hint: 'cigar-shaped reef wrasse with vivid green-purple pattern and pointed snout', priceMin: 340, priceMax: 560, foodHint: 'meat' },
      { id: 'ai_triggerfish', name: 'Triggerfish', emoji: '🔱', unlockLevel: 11, hint: 'oval-bodied aggressive triggerfish with intricate blue-green line pattern on face', priceMin: 420, priceMax: 680, foodHint: 'meat' },
      { id: 'ai_moray', name: 'Moray Eel', emoji: '🐍', unlockLevel: 12, hint: 'long serpentine moray eel, olive-green with yellow spots, hides in rock crevices', priceMin: 450, priceMax: 720, foodHint: 'meat' },
      { id: 'ai_flounder', name: 'Flounder', emoji: '🫓', unlockLevel: 12, hint: 'flat bottom-dwelling flounder with both eyes on one side, sandy speckled camouflage', priceMin: 350, priceMax: 560, foodHint: 'meat' },
      { id: 'ai_pipefish', name: 'Pipefish', emoji: '🌿', unlockLevel: 13, hint: 'thin elongated seahorse relative, green pipe-like body hiding in sea grass beds', priceMin: 380, priceMax: 600, foodHint: 'none' },
      { id: 'ai_lionfish', name: 'Lionfish', emoji: '🦁', unlockLevel: 14, hint: 'striped red-white venomous lionfish with dramatic feathery spines fanning outward', priceMin: 500, priceMax: 750, foodHint: 'meat' },
      { id: 'ai_butterflyfish', name: 'Butterflyfish', emoji: '🦋', unlockLevel: 15, hint: 'disc-shaped coral reef butterflyfish with bright yellow body and black eye stripe', priceMin: 400, priceMax: 640, foodHint: 'basic' },
      { id: 'ai_damselfish', name: 'Damselfish', emoji: '💙', unlockLevel: 15, hint: 'territorial small reef damselfish, deep sapphire blue body, very defensive of territory', priceMin: 340, priceMax: 520, foodHint: 'basic' },
      { id: 'ai_basslet', name: 'Royal Gramma', emoji: '💜', unlockLevel: 16, hint: 'stunning bicolor basslet, front half vivid purple fading to bright yellow-orange rear', priceMin: 450, priceMax: 680, foodHint: 'meat' },

      // ── TIER 3 — Epic (level 17–25, price ~750-2500) ──
      { id: 'ai_mandarin', name: 'Mandarinfish', emoji: '🌈', unlockLevel: 17, hint: 'the most colorful fish alive — psychedelic blue-orange wavy maze pattern, toxic skin', priceMin: 800, priceMax: 1400, foodHint: 'none' },
      { id: 'ai_seadragon', name: 'Leafy Seadragon', emoji: '🐉', unlockLevel: 17, hint: 'ornate Australian seadragon with elaborate leaf-like appendages for camouflage', priceMin: 750, priceMax: 1300, foodHint: 'none' },
      { id: 'ai_frogfish', name: 'Frogfish', emoji: '🐸', unlockLevel: 18, hint: 'bizarre ambush predator frogfish that mimics coral, uses lure to attract prey', priceMin: 700, priceMax: 1200, foodHint: 'meat' },
      { id: 'ai_boxfish', name: 'Boxfish', emoji: '📦', unlockLevel: 18, hint: 'boxy rigid-bodied boxfish with polka dot pattern, secretes toxic mucus when stressed', priceMin: 680, priceMax: 1100, foodHint: 'veg' },
      { id: 'ai_anthias', name: 'Anthias', emoji: '🌸', unlockLevel: 19, hint: 'brilliant orange-pink school fish from deep coral reefs, dramatic sexual dichromatism', priceMin: 720, priceMax: 1200, foodHint: 'none' },
      { id: 'ai_chromis', name: 'Blue Chromis', emoji: '🔵', unlockLevel: 19, hint: 'elegant pale blue schooling chromis fish, forked tail, found in open water above reefs', priceMin: 660, priceMax: 1050, foodHint: 'basic' },
      { id: 'ai_emperor', name: 'Emperor Angelfish', emoji: '👑', unlockLevel: 20, hint: 'majestic angelfish with bold electric blue-yellow horizontal stripes on dark body', priceMin: 900, priceMax: 1600, foodHint: 'veg' },
      { id: 'ai_flameback', name: 'Flameback Angelfish', emoji: '🔥', unlockLevel: 21, hint: 'pygmy angelfish with vivid orange-yellow body and sapphire blue eye ring and fins', priceMin: 850, priceMax: 1450, foodHint: 'basic' },
      { id: 'ai_manta', name: 'Manta Ray', emoji: '🦅', unlockLevel: 22, hint: 'graceful giant manta ray with wing-like pectoral fins gliding slowly through open ocean', priceMin: 1100, priceMax: 2000, foodHint: 'none' },
      { id: 'ai_stingray', name: 'Stingray', emoji: '⚡', unlockLevel: 23, hint: 'flat disc-shaped stingray with barbed venomous tail, sandy coloration for camouflage', priceMin: 950, priceMax: 1700, foodHint: 'meat' },
      { id: 'ai_cuttlefish', name: 'Cuttlefish', emoji: '🎨', unlockLevel: 24, hint: 'intelligent mollusc with W-shaped pupils that can change color and pattern instantly', priceMin: 1200, priceMax: 2200, foodHint: 'meat' },
      { id: 'ai_octopus', name: 'Octopus', emoji: '🐙', unlockLevel: 25, hint: 'clever red-orange octopus with eight arms, master of camouflage and problem solving', priceMin: 1400, priceMax: 2400, foodHint: 'meat' },

      // ── TIER 4 — Epic-Legendary (level 26–33, price ~2000-5500) ──
      { id: 'ai_nautilus', name: 'Nautilus', emoji: '🐚', unlockLevel: 26, hint: 'ancient chambered nautilus with spiral shell and tentacles, living fossil 500M years old', priceMin: 2000, priceMax: 3500, foodHint: 'meat' },
      { id: 'ai_squid', name: 'Humboldt Squid', emoji: '🦑', unlockLevel: 26, hint: 'large squid that flashes bioluminescent red-white colors when communicating or hunting', priceMin: 1800, priceMax: 3200, foodHint: 'meat' },
      { id: 'ai_horsecrab', name: 'Horseshoe Crab', emoji: '🦀', unlockLevel: 27, hint: 'ancient marine arthropod with dome shell and long spike tail, blue blood survivor', priceMin: 1900, priceMax: 3300, foodHint: 'waste' },
      { id: 'ai_nudibranch', name: 'Nudibranch', emoji: '🌺', unlockLevel: 27, hint: 'flamboyant sea slug with toxic warning colors — neon pink, orange, electric blue cerata', priceMin: 1700, priceMax: 3000, foodHint: 'none' },
      { id: 'ai_seaurchin', name: 'Sea Urchin', emoji: '🪨', unlockLevel: 28, hint: 'spiny purple-black sea urchin slowly moving on tube feet grazing algae off rocks', priceMin: 1600, priceMax: 2800, foodHint: 'veg' },
      { id: 'ai_seacucumber', name: 'Sea Cucumber', emoji: '🥒', unlockLevel: 28, hint: 'elongated echinoderm sea cucumber filtering sediment and expelling water in defense', priceMin: 1500, priceMax: 2700, foodHint: 'waste' },
      { id: 'ai_featherduster', name: 'Feather Duster Worm', emoji: '🌸', unlockLevel: 29, hint: 'tube-dwelling marine worm with spectacular feathery plume used for filter feeding', priceMin: 1400, priceMax: 2500, foodHint: 'none' },
      { id: 'ai_cleanershrimp', name: 'Cleaner Shrimp', emoji: '🦐', unlockLevel: 29, hint: 'translucent scarlet cleaner shrimp with white antennae that removes parasites from fish', priceMin: 1600, priceMax: 2800, foodHint: 'waste' },
      { id: 'ai_lobster', name: 'Spiny Lobster', emoji: '🦞', unlockLevel: 30, hint: 'red spiny lobster without claws, decorated with orange spots, walks on rocky seafloor', priceMin: 2200, priceMax: 3800, foodHint: 'meat' },
      { id: 'ai_mantisshrimp', name: 'Mantis Shrimp', emoji: '🔨', unlockLevel: 31, hint: 'peacock mantis shrimp with 16 color-receptors and punch force of a bullet, strikingly colorful', priceMin: 2500, priceMax: 4200, foodHint: 'meat' },

      // ── TIER 5 — Legendary (level 32–44, price ~4000-10000) ──
      { id: 'ai_whaleshark', name: 'Whale Shark', emoji: '🐳', unlockLevel: 32, hint: 'gentle giant whale shark with checkerboard pale dot pattern, filter feeder, huge', priceMin: 4000, priceMax: 7000, foodHint: 'none' },
      { id: 'ai_hammerhead', name: 'Hammerhead Shark', emoji: '🦈', unlockLevel: 33, hint: 'fearsome hammerhead shark with wide flat head, dark grey above, white below', priceMin: 4500, priceMax: 7500, foodHint: 'meat' },
      { id: 'ai_sawfish', name: 'Sawfish', emoji: '🪚', unlockLevel: 34, hint: 'critically endangered sawfish with long toothed rostrum saw, ray-like flat body', priceMin: 5000, priceMax: 8500, foodHint: 'meat' },
      { id: 'ai_oarfish', name: 'Giant Oarfish', emoji: '📏', unlockLevel: 35, hint: 'long silver ribbon-like oarfish, the sea serpent of legend, up to 11m in reality', priceMin: 5500, priceMax: 9000, foodHint: 'none' },
      { id: 'ai_anglerfish', name: 'Anglerfish', emoji: '🔦', unlockLevel: 36, hint: 'deep-sea anglerfish with bioluminescent lure dangling from head, extreme sexual dimorphism', priceMin: 5000, priceMax: 8500, foodHint: 'meat' },
      { id: 'ai_coelacanth', name: 'Coelacanth', emoji: '🏛️', unlockLevel: 37, hint: 'ancient living fossil coelacanth unchanged for 400 million years, dark blue with white spots', priceMin: 6000, priceMax: 10000, foodHint: 'meat' },
      { id: 'ai_goblinshark', name: 'Goblin Shark', emoji: '👺', unlockLevel: 38, hint: 'deep-sea goblin shark with protrusible jaws and flabby pink body, extremely rare', priceMin: 6500, priceMax: 10500, foodHint: 'meat' },
      { id: 'ai_fangtooth', name: 'Fangtooth Fish', emoji: '🦷', unlockLevel: 39, hint: 'deep sea fangtooth with enormous teeth proportional to body, pitch black with red eyes', priceMin: 5500, priceMax: 9500, foodHint: 'meat' },
      { id: 'ai_dragonfish', name: 'Black Dragonfish', emoji: '🐉', unlockLevel: 40, hint: 'deep-sea dragonfish with bioluminescent organs along body and light-producing chin barbel', priceMin: 6000, priceMax: 10000, foodHint: 'meat' },
      { id: 'ai_barreleye', name: 'Barreleye Fish', emoji: '👁️', unlockLevel: 42, hint: 'transparent-headed barreleye fish with tubular eyes that rotate and glow green inside', priceMin: 7000, priceMax: 11000, foodHint: 'none' },

      // ── TIER 6 — Mythic (level 43–60, price ~10000-22000) ──
      { id: 'ai_vampiresquid', name: 'Vampire Squid', emoji: '🧛', unlockLevel: 43, hint: 'deep-sea vampire squid with dark cloak-like webbing and blue bioluminescent organs', priceMin: 10000, priceMax: 16000, foodHint: 'none' },
      { id: 'ai_sealion', name: 'Sea Lion', emoji: '🦭', unlockLevel: 44, hint: 'playful intelligent California sea lion with dark brown body and long flippers', priceMin: 9000, priceMax: 14000, foodHint: 'meat' },
      { id: 'ai_narwhal', name: 'Narwhal', emoji: '🦄', unlockLevel: 45, hint: 'arctic unicorn of the sea narwhal with single long twisted ivory tusk, mottled grey-white', priceMin: 11000, priceMax: 17000, foodHint: 'meat' },
      { id: 'ai_beluga', name: 'Beluga Whale', emoji: '🐳', unlockLevel: 46, hint: 'pure snow-white beluga whale that can turn its head, echolocates with melon organ', priceMin: 12000, priceMax: 18000, foodHint: 'meat' },
      { id: 'ai_manatee', name: 'Manatee', emoji: '🐘', unlockLevel: 47, hint: 'gentle grey sea cow manatee grazing underwater vegetation with paddle-like flippers', priceMin: 10000, priceMax: 16000, foodHint: 'veg' },
      { id: 'ai_dolphin', name: 'Dolphin', emoji: '🐬', unlockLevel: 48, hint: 'intelligent bottlenose dolphin with grey streamlined body and curved dorsal fin', priceMin: 11000, priceMax: 17000, foodHint: 'meat' },
      { id: 'ai_seaangel', name: 'Sea Angel', emoji: '👼', unlockLevel: 50, hint: 'tiny translucent sea angel pteropod with angelic parapodia wings, drifts in Arctic water', priceMin: 13000, priceMax: 20000, foodHint: 'none' },
      { id: 'ai_dumbo', name: 'Dumbo Octopus', emoji: '🎪', unlockLevel: 52, hint: 'deep sea dumbo octopus with large ear-like fins atop mantle used for swimming, tiny body', priceMin: 14000, priceMax: 21000, foodHint: 'meat' },
      { id: 'ai_giantisopod', name: 'Giant Isopod', emoji: '🦗', unlockLevel: 54, hint: 'massive deep-sea isopod crustacean armored like a roly-poly, 40cm long, detritivore', priceMin: 12000, priceMax: 18500, foodHint: 'waste' },
      { id: 'ai_gulpereel', name: 'Gulper Eel', emoji: '👾', unlockLevel: 56, hint: 'abyssal gulper eel with enormous hinged jaw that can swallow prey larger than itself', priceMin: 15000, priceMax: 22000, foodHint: 'meat' },
      { id: 'ai_viperfish', name: 'Viperfish', emoji: '⚡', unlockLevel: 58, hint: 'terrifying deep-sea viperfish with fang teeth longer than its head, bioluminescent body', priceMin: 16000, priceMax: 22000, foodHint: 'meat' },
    ];

    // Build emoji lookup for AI species (used by encyclopedia)
    const AI_SPECIES_EMOJIS = {};
    SPECIES_BLUEPRINTS.forEach(b => { AI_SPECIES_EMOJIS[b.id] = b.emoji; });

    // ── Restore AI species from saved data into SPECIES at startup ──
    function restoreAISpecies() {
      const saved = GS.aiSpecies || {};
      Object.entries(saved).forEach(([id, data]) => {
        if (!SPECIES[id]) SPECIES[id] = data;
      });
    }

    // ── Get a blueprint by id ──
    function getBlueprint(id) {
      return SPECIES_BLUEPRINTS.find(b => b.id === id);
    }

    // ── Check if species is unlocked (player level >= required) ──
    function isSpeciesUnlocked(blueprintId) {
      const bp = getBlueprint(blueprintId);
      if (!bp) return false;
      return GS.level >= bp.unlockLevel;
    }

    // ── Generate AI stats for a single blueprint via Claude API ──
    // ══════════════════════════════════════════════════════════════════════════
    // GEMINI AI HELPER
    // Uses Google Gemini Flash 2.0 (FREE tier: 1500 req/day, no credit card).
    // Restrict your key to your app package ID in:
    //   https://console.cloud.google.com → APIs & Services → Credentials
    // ══════════════════════════════════════════════════════════════════════════
    const GEMINI_API_KEY = 'AIzaSyA808ELxI0zZ7_Znseu7BYnnB5Aha71Gno'; // Gemini API key
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    async function callGemini(prompt, systemInstruction = null, maxTokens = 400) {
      const body = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 }
      };
      if (systemInstruction) {
        body.systemInstruction = { parts: [{ text: systemInstruction }] };
      }
      const resp = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!resp.ok) throw new Error(`Gemini API error: ${resp.status}`);
      const data = await resp.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return text.trim();
    }

    async function generateAISpecies(blueprint) {
      if (SPECIES[blueprint.id]) return; // already exists
      if (GS.aiSpeciesPending[blueprint.id]) return; // already generating
      GS.aiSpeciesPending[blueprint.id] = true;

      const priceRange = `${blueprint.priceMin}–${blueprint.priceMax}`;
      const prompt = `You are a video game designer creating a virtual aquarium fish species. Generate balanced stats for: "${blueprint.name}" (${blueprint.hint}).

Return ONLY valid JSON with EXACTLY these fields (no extra text, no markdown):
{
  "hue": (0-360, color hue — pick one visually fitting this species),
  "sat": (40-100, saturation %),
  "lit": (35-75, lightness %),
  "size": (12-50, body radius in pixels),
  "speed": (0.2-2.5, movement speed),
  "pat": (0-3, pattern: 0=plain, 1=spotted, 2=striped, 3=wavy),
  "fins": (0.4-2.2, fin size multiplier),
  "tail": (0.3-2.2, tail size multiplier),
  "price": (integer between ${blueprint.priceMin} and ${blueprint.priceMax}),
  "maxSz": (size+8 to size+22),
  "food": ("${blueprint.foodHint}"),
  "optTempLow": (14-28, lower optimal temperature °C),
  "optTempHigh": (optTempLow+4 to optTempLow+10, upper temp),
  "desc": "fun one-line description max 48 chars"
}`;

      try {
        let text = await callGemini(prompt);
        // Strip markdown fences if present
        text = text.replace(/```json[\s\S]*?```|```/g, '').trim();
        // Extract JSON if wrapped in extra text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('No JSON in Gemini response');
        const stats = JSON.parse(jsonMatch[0]);

        // Validate required fields and clamp values
        const spec = {
          name: blueprint.name,
          hue: Math.max(0, Math.min(360, Number(stats.hue) || 180)),
          sat: Math.max(40, Math.min(100, Number(stats.sat) || 75)),
          lit: Math.max(35, Math.min(75, Number(stats.lit) || 55)),
          size: Math.max(12, Math.min(50, Number(stats.size) || 20)),
          speed: Math.max(0.2, Math.min(2.5, Number(stats.speed) || 1.2)),
          pat: Math.round(Math.max(0, Math.min(3, Number(stats.pat) || 0))),
          fins: Math.max(0.4, Math.min(2.2, Number(stats.fins) || 1.0)),
          tail: Math.max(0.3, Math.min(2.2, Number(stats.tail) || 0.9)),
          price: Math.round(Math.max(blueprint.priceMin, Math.min(blueprint.priceMax, Number(stats.price) || blueprint.priceMin))),
          maxSz: Math.max(20, Math.min(75, Number(stats.maxSz) || 40)),
          food: ['basic', 'meat', 'veg', 'waste', 'none'].includes(stats.food) ? stats.food : blueprint.foodHint,
          optTempLow: Math.max(14, Math.min(28, Number(stats.optTempLow) || 22)),
          optTempHigh: Math.max(18, Math.min(36, Number(stats.optTempHigh) || 28)),
          desc: String(stats.desc || blueprint.hint).substring(0, 60),
          _aiGenerated: true,
          _unlockLevel: blueprint.unlockLevel,
          _emoji: blueprint.emoji
        };

        SPECIES[blueprint.id] = spec;
        GS.aiSpecies[blueprint.id] = spec;
        delete GS.aiSpeciesPending[blueprint.id];
        saveGame();
        // Refresh shop if it's open on the fish tab
        if (GS.tab === 'fish' && document.getElementById('shop-modal')?.classList.contains('active')) {
          shopTab('fish');
        }
        notify(`🧬 New species unlocked: ${blueprint.name}! Check the Shop 🐟`, 'success');
        SFX.levelUp && SFX.levelUp();
      } catch (e) {
        console.warn('AI species generation failed for', blueprint.id, e);
        // Fallback: generate deterministic stats from hash of blueprint name
        const h = blueprint.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const fallback = {
          name: blueprint.name,
          hue: (h * 37) % 360,
          sat: 55 + (h % 30),
          lit: 45 + (h % 25),
          size: 14 + (h % 28),
          speed: 0.5 + ((h % 18) / 10),
          pat: h % 4,
          fins: 0.7 + ((h % 12) / 10),
          tail: 0.6 + ((h % 14) / 10),
          price: blueprint.priceMin + Math.floor((h % (blueprint.priceMax - blueprint.priceMin + 1))),
          maxSz: 28 + (h % 30),
          food: blueprint.foodHint,
          optTempLow: 18 + (h % 10),
          optTempHigh: 24 + (h % 8),
          desc: blueprint.hint.substring(0, 55),
          _aiGenerated: true,
          _fallback: true,
          _unlockLevel: blueprint.unlockLevel,
          _emoji: blueprint.emoji
        };
        SPECIES[blueprint.id] = fallback;
        GS.aiSpecies[blueprint.id] = fallback;
        delete GS.aiSpeciesPending[blueprint.id];
        saveGame();
        if (GS.tab === 'fish' && document.getElementById('shop-modal')?.classList.contains('active')) {
          shopTab('fish');
        }
      }
    }

    // ── Check which blueprints just got unlocked at the new player level ──
    function checkNewSpeciesUnlocks(newLevel) {
      SPECIES_BLUEPRINTS.forEach(bp => {
        if (bp.unlockLevel === newLevel && !SPECIES[bp.id] && !GS.aiSpeciesPending[bp.id]) {
          setTimeout(() => generateAISpecies(bp), 500); // slight delay to not block UI
        }
      });
    }

    // ── Pre-generate next batch of species (call on init to warm up upcoming unlocks) ──
    function warmUpSpeciesGeneration() {
      const upcoming = SPECIES_BLUEPRINTS.filter(bp =>
        bp.unlockLevel <= GS.level + 2 && !SPECIES[bp.id] && !GS.aiSpeciesPending[bp.id]
      );
      upcoming.forEach((bp, i) => setTimeout(() => generateAISpecies(bp), i * 600));
    }

    // Pearl shop items (premium cosmetics)
    const PEARL_SHOP = [
      { id: 'skin_tropical', type: 'skin', sid: 'tropical', name: 'Tropical Reef', icon: '🪸', desc: 'Turquoise waters and golden sand', price: 8 },
      { id: 'skin_deep', type: 'skin', sid: 'deep', name: 'Deep Abyss', icon: '🌑', desc: 'The darkest ocean depths', price: 12 },
      { id: 'skin_sunset', type: 'skin', sid: 'sunset', name: 'Sunset Lagoon', icon: '🌅', desc: 'Scarlet sunset lagoon', price: 10 },
      { id: 'skin_arctic', type: 'skin', sid: 'arctic', name: 'Arctic Waters', icon: '❄️', desc: 'Icy polar waters', price: 10 },
      { id: 'deco_trident', type: 'deco', did: 'Golden Trident', name: 'Golden Trident', icon: '🔱', desc: 'Legendary Poseidon decoration', price: 15 },
      { id: 'deco_egg', type: 'deco', did: 'Dragon Egg', name: 'Dragon Egg', icon: '🥚', desc: 'A mysterious egg from the abyss', price: 20 },
      { id: 'food_x10', type: 'food', fid: 'premium', qty: 10, name: 'Pellets ×10', icon: '🎯', desc: '10 servings of premium pellets', price: 5 },
      { id: 'expand', type: 'upgrade', uid: 'expand', name: 'Tank Tier Skip', icon: '📏', desc: 'Skip to next tank tier instantly (saves coins!)', price: 18 },
    ];

    const FOOD = {
      basic: { name: 'Flakes', power: 18, price: 15, type: 'basic' },
      premium: { name: 'Pellets', power: 38, price: 35, type: 'basic' },
      meat: { name: 'Meat Chunks', power: 55, price: 100, type: 'meat' },
      veg: { name: 'Veggies', power: 45, price: 55, type: 'veg' },
      waste: { name: 'Waste', power: 10, price: 0, type: 'waste' }
    };

    const DECOS = [
      { name: 'Pebbles', r: 'common', price: 15, sz: 1 },
      { name: 'Seaweed', r: 'common', price: 20, sz: 1.2 },
      { name: 'Small Coral', r: 'common', price: 25, sz: 1.3 },
      { name: 'Shell', r: 'common', price: 30, sz: 1.4 },
      { name: 'Anemone', r: 'rare', price: 80, sz: 1.8 },
      { name: 'Treasure Chest', r: 'rare', price: 100, sz: 2 },
      { name: 'Sunken Ship', r: 'rare', price: 120, sz: 2.2 },
      { name: 'Ancient Statue', r: 'epic', price: 250, sz: 2.5 },
      { name: 'Crystal Cave', r: 'epic', price: 300, sz: 2.8 },
      { name: 'Golden Trident', r: 'legendary', price: 800, sz: 3 },
      { name: 'Dragon Egg', r: 'legendary', price: 1000, sz: 3.2 }
    ];

    const RC = { common: '#a8d8ff', rare: '#c9a8ff', epic: '#ff9dc6', legendary: '#ffd700' };

    const SKINS = [
      { id: 'default', name: 'Ocean Blue', bg1: '#b8e4ff', bg2: '#5a9fd4', sand: '#e8d4a8', price: 0 },
      { id: 'tropical', name: 'Tropical Reef', bg1: '#42e6c5', bg2: '#0891b2', sand: '#fde68a', price: 200 },
      { id: 'deep', name: 'Deep Abyss', bg1: '#334155', bg2: '#0f172a', sand: '#475569', price: 400 },
      { id: 'sunset', name: 'Sunset Lagoon', bg1: '#fda4af', bg2: '#9f1239', sand: '#fecaca', price: 300 },
      { id: 'arctic', name: 'Arctic Waters', bg1: '#e0f2fe', bg2: '#bae6fd', sand: '#f1f5f9', price: 350 }
    ];

    const ACHIEVEMENTS = [
      { id: 'first_fish', name: 'Fish Parent', desc: 'Own your first fish', icon: '🐟', check: gs => gs.fish.length >= 1 },
      { id: 'ten_fish', name: 'Aquarium Master', desc: 'Own 10 fish at once', icon: '🐠', check: gs => gs.fish.length >= 10 },
      { id: 'twenty_fish', name: 'Marine Biologist', desc: 'Own 20 fish at once', icon: '🐟', check: gs => gs.fish.length >= 20 },
      { id: 'fifty_fish', name: 'Ocean Curator', desc: 'Own 50 fish at once', icon: '🌊', check: gs => gs.fish.length >= 50 },
      { id: 'deepblue', name: '🌌 The Deep Blue', desc: 'Reach maximum capacity: 77 fish!', icon: '🌌', check: gs => gs.fish.length >= 77 },
      { id: 'first_breed', name: 'Geneticist', desc: 'Breed your first fish', icon: '🧬', check: gs => gs.stats.bred >= 1 },
      { id: 'breeder', name: 'Breeder', desc: 'Breed 10 fish', icon: '💕', check: gs => gs.stats.bred >= 10 },
      { id: 'first_catch', name: 'Angler', desc: 'Catch your first fish', icon: '🎣', check: gs => gs.stats.caught >= 1 },
      { id: 'rich', name: 'Coin Collector', desc: 'Accumulate 1000 coins', icon: '🪙', check: gs => gs.coins >= 1000 },
      { id: 'legendary', name: 'Rarity Hunter', desc: 'Own a legendary fish', icon: '⭐', check: gs => gs.fish.some(f => f.dna.rarity() === 'Legendary') },
      { id: 'clean_freak', name: 'Clean Freak', desc: 'Clean tank 5 times', icon: '💧', check: gs => gs.stats.cleaned >= 5 },
      { id: 'day10', name: 'Dedicated', desc: 'Survive 10 days', icon: '📅', check: gs => gs.day >= 10 },
      { id: 'decor', name: 'Interior Designer', desc: 'Place 5 decorations', icon: '🪸', check: gs => gs.decos.length >= 5 },
      // Flora achievements
      { id: 'first_plant', name: 'Green Thumb', desc: 'Grow your first plant', icon: '🌱', check: gs => (gs.plants || []).length >= 1 || (gs.stats.harvested || 0) >= 1 },
      { id: 'first_coral', name: 'Reef Keeper', desc: 'Place your first coral', icon: '🪸', check: gs => (gs.corals || []).length >= 1 },
      { id: 'eco_balance', name: 'Eco Balance', desc: 'Have plants AND corals simultaneously', icon: '⚖️', check: gs => (gs.plants || []).length >= 1 && (gs.corals || []).length >= 1 },
      { id: 'harvester5', name: 'Farmer', desc: 'Harvest 5 plants or corals', icon: '✂️', check: gs => (gs.stats.harvested || 0) >= 5 },
      { id: 'full_garden', name: 'Aquatic Garden', desc: 'Have 4+ plants and 4+ corals', icon: '🌊', check: gs => (gs.plants || []).length >= 4 && (gs.corals || []).length >= 4 },
      { id: 'dna_codex', name: 'Geneticist Elite', desc: 'Complete DNA Codex Genome II (level 6)', icon: '🧬', check: gs => (gs.stats.dnaCodexMax || 0) >= 6 },
      { id: 'temp_master', name: 'Thermologist', desc: 'Keep tank at optimal temp for 5 days', icon: '🌡️', check: gs => (gs.stats.optTempDays || 0) >= 5 },
    ];

    // ============== DNA ==============
    class DNA {
      constructor(p1, p2) {
        if (p1 && p2) {
          this.hue = this._m(p1.hue, p2.hue, 15);
          this.sat = this._m(p1.sat, p2.sat, 5);
          this.lit = this._m(p1.lit, p2.lit, 5);
          this.size = this._m(p1.size, p2.size, 2);
          this.speed = this._m(p1.speed, p2.speed, .15);
          this.pat = Math.random() < .2 ? Math.random() * 4 | 0 : (Math.random() < .5 ? p1.pat : p2.pat);
          this.fins = this._m(p1.fins, p2.fins, .1);
          this.tail = this._m(p1.tail, p2.tail, .1);
          this.pure = null;
        } else {
          this.hue = Math.random() * 360;
          this.sat = 60 + Math.random() * 35;
          this.lit = 40 + Math.random() * 25;
          this.size = 14 + Math.random() * 20;
          this.speed = .8 + Math.random() * 1.4;
          this.pat = Math.random() * 4 | 0;
          this.fins = .7 + Math.random() * .7;
          this.tail = .6 + Math.random() * .7;
          this.pure = null;
        }
      }
      _m(a, b, m) { const p = Math.random(); return (p < .45 ? a : p < .9 ? b : (a + b) / 2) + (Math.random() - .5) * m; }
      static fromSpecies(id) {
        const s = SPECIES[id], d = new DNA();
        d.hue = s.hue + (Math.random() - .5) * 8; d.sat = s.sat + (Math.random() - .5) * 6;
        d.lit = s.lit + (Math.random() - .5) * 6; d.size = s.size + (Math.random() - .5) * 3;
        d.speed = s.speed + (Math.random() - .5) * .2; d.pat = s.pat;
        d.fins = s.fins + (Math.random() - .5) * .1; d.tail = s.tail + (Math.random() - .5) * .1;
        d.pure = id; return d;
      }
      c1() { return `hsl(${((this.hue % 360) + 360) % 360},${Math.max(20, Math.min(100, this.sat))}%,${Math.max(25, Math.min(75, this.lit))}%)`; }
      c2() { return `hsl(${(((this.hue + 35) % 360) + 360) % 360},${Math.max(20, Math.min(100, this.sat - 10))}%,${Math.max(20, Math.min(60, this.lit - 12))}%)`; }
      c3() { return `hsl(${((this.hue % 360) + 360) % 360},${Math.max(20, Math.min(100, this.sat))}%,${Math.max(50, Math.min(85, this.lit + 15))}%)`; }
      label() { return this.pure && SPECIES[this.pure] ? SPECIES[this.pure].name : 'Hybrid'; }
      rarity() { const sc = this.size * .3 + this.speed * 10 + (this.fins + this.tail) * 8; return sc > 35 ? 'Legendary' : sc > 28 ? 'Epic' : sc > 20 ? 'Rare' : 'Common'; }
      maxSize() { return this.pure && SPECIES[this.pure] ? SPECIES[this.pure].maxSz : 45; }
    }

    // ============== STATE ==============
    let GS = {
      coins: 150, pearls: 5,
      day: 1, time: 0, clean: 100, hunger: 100, fish: [], food: [],
      inv: { basic: 8, premium: 0, meat: 0, veg: 0 }, decos: [], graveyard: [],
      level: 1, xp: 0, fishing: false, fishTarget: null, fishPhase: '',
      breeding: false, breedParents: [], editing: false, dragDeco: null,
      stats: { fed: 0, cleaned: 0, bred: 0, caught: 0, harvested: 0 },
      tab: 'fish', started: false, skin: 'default',
      achievements: {}, passiveIncome: 0, discovered: {},
      encComplete: false, loginStreak: 0, lastLogin: 0, lastSeen: 0,
      notifPerm: false,
      plants: [], corals: [],
      temp: 24, // °C - water temperature (18–32 range)
      aiSpecies: {},        // id → generated species data (persisted)
      aiSpeciesPending: {}  // id → true while generating (not persisted)
    };

    // ============== PLANTS DATA ==============
    const PLANT_TYPES = {
      anubias: {
        name: 'Anubias', emoji: '🌿', price: 80,
        desc: 'Slow grower. Feeds fish a little and boosts mood. Barely dirties water.',
        growTime: 120,
        feedPower: 5, dirtyRate: 0.3, moodBoost: 6,
        harvestCoins: 160, color: '#2d6a2d', stages: ['🌱', '🪴', '🌿']
      },
      vallisneria: {
        name: 'Vallisneria', emoji: '🎋', price: 60,
        desc: 'Medium grower. Good feed power but dirties water noticeably.',
        growTime: 60,
        feedPower: 14, dirtyRate: 1.2, moodBoost: 8,
        harvestCoins: 130, color: '#3a8a3a', stages: ['🌱', '🎋', '🎋']
      },
      pistia: {
        name: 'Water Lettuce', emoji: '🥬', price: 45,
        desc: 'Fast grower. High feed power but dirties water fast.',
        growTime: 40,
        feedPower: 22, dirtyRate: 2.0, moodBoost: 3,
        harvestCoins: 110, color: '#5cb85c', stages: ['🌱', '🥬', '🥬']
      },
      cabomba: {
        name: 'Cabomba', emoji: '🌾', price: 70,
        desc: 'Greatly boosts fish happiness. Low pollution.',
        growTime: 80,
        feedPower: 9, dirtyRate: 0.6, moodBoost: 16,
        harvestCoins: 150, color: '#4a9e4a', stages: ['🌱', '🌾', '🌾']
      }
    };

    // ============== CORALS DATA ==============
    const CORAL_TYPES = {
      brain: {
        name: 'Brain Coral', emoji: '🧠', price: 120,
        desc: 'Very slow grower. Significantly cleans the water.',
        growTime: 180, cleanRate: 2.5,
        harvestCoins: 280, color: '#b06030', stages: ['🪨', '🧠', '🧠']
      },
      fire: {
        name: 'Fire Coral', emoji: '🔥', price: 100,
        desc: 'Cleans water and boosts fish mood.',
        growTime: 150, cleanRate: 1.2, moodBoost: 10,
        harvestCoins: 230, color: '#cc4400', stages: ['🪨', '🔥', '🔥']
      },
      acropora: {
        name: 'Acropora', emoji: '🌺', price: 160,
        desc: 'The rarest coral. Cleans massively and earns a premium on harvest.',
        growTime: 200, cleanRate: 3.5,
        harvestCoins: 390, color: '#d44090', stages: ['🪨', '🌺', '🌺']
      },
      mushroom: {
        name: 'Mushroom Coral', emoji: '🍄', price: 75,
        desc: 'Faster than other corals. Moderate cleaning power.',
        growTime: 100, cleanRate: 0.9,
        harvestCoins: 175, color: '#884488', stages: ['🪨', '🍄', '🍄']
      }
    };

    let cv, ctx, W = 0, H = 0;

    function resize() {
      if (!cv) return;
      const w = cv.parentElement; if (!w) return;
      // Cap DPR: 1 on low-end Android/mobile (saves huge fillrate), 2 on good devices, 3 on desktop
      const rawDPR = window.devicePixelRatio || 1;
      const d = _LOWEND ? Math.min(rawDPR, 1) : Math.min(rawDPR, 2);
      W = w.clientWidth; H = w.clientHeight;
      cv.width = W * d; cv.height = H * d;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(d, 0, 0, d, 0, 0);
      // Invalidate background gradient cache + ray gradient cache on resize
      _bgCache.dirty = true;
      _rayGrads = null;
    }

    function drawCoin(c, x, y, s) {
      c.save(); c.translate(x, y); c.scale(s || 1, s || 1);
      const g = c.createRadialGradient(-1, -2, 0, 0, 0, 8);
      g.addColorStop(0, '#fff3b0'); g.addColorStop(.5, '#ffd700'); g.addColorStop(1, '#b8860b');
      c.fillStyle = g; c.beginPath(); c.arc(0, 0, 8, 0, 6.283); c.fill();
      c.strokeStyle = '#daa520'; c.lineWidth = 1; c.beginPath(); c.arc(0, 0, 6, 0, 6.283); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.arc(-2, -2, 2.5, 0, 6.283); c.fill();
      c.restore();
    }

    // Returns an inline SVG pearl for premium currency
    function pearlSVG(size = 14) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" style="vertical-align:middle;margin-right:2px" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" fill="#c084fc" stroke="#a855f7" stroke-width="1"/>
    <circle cx="8" cy="8" r="7.5" fill="url(#_pgGlobal)" stroke="#a855f7" stroke-width="1"/>
    <ellipse cx="5.5" cy="5.5" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.65)" transform="rotate(-25,5.5,5.5)"/>
  </svg>`;
    }
    function coinSVG(size) {
      size = size || 14;
      // Use data URI approach with unique gradient using CSS to avoid duplicate id="cg" in DOM
      return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" style="vertical-align:middle;margin-right:2px" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" fill="#ffd700" stroke="#daa520" stroke-width="1"/>
    <circle cx="8" cy="8" r="7.5" fill="url(#_cgGlobal)" stroke="#daa520" stroke-width="1"/>
    <circle cx="8" cy="8" r="5.5" fill="none" stroke="#daa520" stroke-width=".7" opacity=".6"/>
    <ellipse cx="6" cy="6" rx="2.5" ry="1.5" fill="rgba(255,255,255,.45)" transform="rotate(-20,6,6)"/>
  </svg>`;
    }

    // ============== FISH CLASS ==============
    class Fish {
      constructor(dna) {
        this.id = Math.random().toString(36).substr(2, 6);
        this.dna = dna || new DNA();
        this.born = 0;
        this.x = W ? W * (.2 + Math.random() * .6) : 100;
        this.y = H ? H * (.2 + Math.random() * .5) : 100;
        this.size = Math.max(10, this.dna.size);
        this.speed = Math.max(.4, this.dna.speed);
        this.vx = (Math.random() - .5) * .5;
        this.vy = (Math.random() - .5) * .5;
        this.tx = this.x; this.ty = this.y;
        this.timer = Math.random() * 2;
        this.phase = Math.random() * 6.28;
        this.happy = 80; this.hunger = 80;
        this.lv = 1; this.xp = 0;
        this.food = null; this.caught = false; this.hookPhase = 0;
      }

      update(dt) {
        if (this.caught) {
          this.hookPhase += dt;
          const hx = W / 2, hy = H * .4 + 10;
          if (this.hookPhase < .6) { this.x += (hx - this.x) * dt * 8; this.y += (hy - this.y) * dt * 8; }
          else { this.y -= dt * 150; this.x = hx + Math.sin(this.hookPhase * 15) * 3; }
          this.phase += dt * 15; return;
        }

        // ===== TEMPERATURE EFFECTS ON FISH =====
        // Each species has an optimal temp range; deviation stresses the fish.
        const curTemp = GS.temp || 24;
        const specData = this.dna.pure && SPECIES[this.dna.pure] ? SPECIES[this.dna.pure] : null;
        const optTLow = specData && specData.optTempLow ? specData.optTempLow : 22;
        const optTHigh = specData && specData.optTempHigh ? specData.optTempHigh : 28;
        const tempStress = Math.max(0, Math.max(optTLow - curTemp, curTemp - optTHigh)); // 0 = perfect
        const tempMult = 1 + tempStress * 0.04; // stress multiplies hunger & reduces happiness

        this.phase += dt * (3 + this.speed * (curTemp > 26 ? 1.15 : curTemp < 20 ? 0.8 : 1));
        this.born += dt;
        this.hunger -= dt * (.4 + this.size * .008) * tempMult;

        // Happiness: decays slowly, rises if well-fed, drops if starving or stressed
        if (this.hunger > 70 && tempStress < 2) {
          this.happy = Math.min(100, this.happy + dt * 1.5);
        } else if (this.hunger < 30 || tempStress > 5) {
          this.happy = Math.max(0, this.happy - dt * (3 + tempStress * 0.5));
        } else {
          this.happy = Math.max(0, this.happy - dt * 0.5);
        }
        // Temperature stress visual: show cold/hot icon on fish
        this._tempStress = tempStress;
        // Happy fish glow slightly
        if (this.happy > 90 && !this.caught && Math.random() < dt * 0.3) {
          spawnP(this.x + (Math.random() - 0.5) * this.size, this.y - this.size, this.dna.c3(), 1);
        }

        // Species behaviours
        const sp = this.dna.pure;
        if (sp === 'jelly') this.hunger = Math.max(this.hunger, 80); // Jelly never starves
        if (sp === 'pleco' || sp === 'star') {
          if (this.y < H - 60) this.ty = H - 40;
          GS.clean = Math.min(100, GS.clean + dt * .06);
        }
        if (sp === 'shark' && this.hunger < 40) {
          const prey = GS.fish.find(f => f !== this && f.size < this.size * .4 && !f.caught);
          if (prey) {
            this.tx = prey.x; this.ty = prey.y;
            if (Math.hypot(prey.x - this.x, prey.y - this.y) < this.size) {
              GS.fish = GS.fish.filter(f => f !== prey);
              GS.graveyard.push({ dna: prey.dna, lv: prey.lv, size: prey.size });
              this.hunger = 100; spawnP(this.x, this.y, '#f44336', 12);
              notify('🦈 Shark ate a fish!', 'warning');
            }
          }
        }

        // Food seeking — hungrier fish are more aggressive and get a speed boost
        const hungerThreshold = this.hunger < 50 ? 100 : this.hunger < 75 ? 95 : 90;
        if (this.hunger < hungerThreshold && GS.food.length && !this.food) {
          const diet = sp ? SPECIES[sp].food : 'basic';
          let n = null, md = 99999;
          for (let i = 0; i < GS.food.length; i++) {
            const f = GS.food[i];
            if (!f) continue; // safety guard
            if (diet !== 'waste' && f.type === 'waste') continue;
            if (diet === 'meat' && f.type !== 'meat') continue;
            if (diet === 'veg' && f.type !== 'veg') continue;
            // Hungry fish (hunger < 40) ignore diet restrictions except hard ones
            if (this.hunger < 40 && diet === 'basic' && f.type !== 'waste') {
              const d = Math.hypot(f.x - this.x, f.y - this.y);
              if (d < md) { n = f; md = d; }
              continue;
            }
            const d = Math.hypot(f.x - this.x, f.y - this.y);
            if (d < md) { n = f; md = d; }
          }
          if (n) this.food = n;
        }

        if (this.food) {
          // Guard: food may have been eaten by another fish or removed by physics in same frame
          if (!GS.food.includes(this.food)) { this.food = null; }
          else {
            const fx = this.food.x, fy = this.food.y;
            const dx = fx - this.x, dy = fy - this.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < this.size) {
              // Capture type BEFORE removing from array
              const eatType = this.food.type || 'basic';
              const eatPower = (FOOD[eatType] || FOOD['basic']).power;
              const fi = GS.food.indexOf(this.food);
              if (fi !== -1) GS.food.splice(fi, 1);
              this.food = null; // clear BEFORE any further reads
              this.hunger = Math.min(100, this.hunger + eatPower);
              this.happy = Math.min(100, this.happy + 5);
              this.addXP(5);
              spawnP(this.x, this.y, this.dna.c3(), 2);
              if (sp === 'axolotl') GS.clean = Math.max(0, GS.clean - 2);
              else GS.clean = Math.max(0, GS.clean - .3);
            } else {
              this.tx = fx; this.ty = fy; this.timer = .5;
            }
          }
        }

        this.timer -= dt;
        if (this.timer <= 0 && !this.food) {
          this.tx = 40 + Math.random() * (W - 80);
          this.ty = 40 + Math.random() * (H - 140);
          this.timer = 2 + Math.random() * 4;
        }

        const dx = this.tx - this.x, dy = this.ty - this.y, d = Math.sqrt(dx * dx + dy * dy);
        // Hungrier fish swim faster toward food
        const hungerBoost = this.food ? (1 + Math.max(0, (70 - this.hunger) / 70) * 1.8) : 1;
        if (d > 3) { const f = this.speed * dt * 1.5 * hungerBoost; this.vx += (dx / d) * f; this.vy += (dy / d) * f; }
        this.vx *= .96; this.vy *= .96;
        this.x += this.vx; this.y += this.vy;

        const m = this.size + 8;
        if (this.x < m) { this.x = m; this.vx = Math.abs(this.vx); }
        if (this.x > W - m) { this.x = W - m; this.vx = -Math.abs(this.vx); }
        if (this.y < m) { this.y = m; this.vy = Math.abs(this.vy); }
        if (this.y > H - 60 - m) { this.y = H - 60 - m; this.vy = -Math.abs(this.vy); }
      }

      draw(c) {
        const dir = this.vx >= 0 ? 1 : -1, s = this.size;
        const tw = Math.sin(this.phase * 1.8) * .35;
        const fw = Math.sin(this.phase) * .25;
        c.save(); c.translate(this.x, this.y); c.scale(dir, 1);
        if (this.caught) { c.rotate(-Math.PI / 2 * dir); c.globalAlpha = .8; }

        // ── Breeding selection ring ──
        if (GS.breeding && GS.breedParents.includes(this)) {
          const idx = GS.breedParents.indexOf(this) + 1;
          const pulse = 0.7 + Math.abs(Math.sin(Date.now() / 280)) * 0.3;
          if (!_LOWEND) { c.shadowColor = '#e91e63'; c.shadowBlur = 20 * pulse; }
          c.strokeStyle = `rgba(255,64,129,${0.7 + pulse * 0.3})`; c.lineWidth = 2.5;
          c.beginPath(); c.arc(0, 0, s * 1.6, 0, 6.283); c.stroke();
          c.strokeStyle = `rgba(255,157,198,${0.3 * pulse})`; c.lineWidth = 5;
          c.beginPath(); c.arc(0, 0, s * 1.9, 0, 6.283); c.stroke();
          if (!_LOWEND) c.shadowBlur = 0;
          c.fillStyle = '#e91e63';
          c.beginPath(); c.arc(s * 1.2, -s * 1.2, s * 0.45, 0, 6.283); c.fill();
          c.fillStyle = '#fff'; c.font = `bold ${Math.max(7, s * .35)}px Fredoka`; c.textAlign = 'center';
          c.fillText(idx, s * 1.2, -s * 1.2 + Math.max(2.5, s * .12));
        }

        const sp = this.dna.pure;

        // ════════════════════════════════════════
        //   SPECIES-SPECIFIC DRAWING
        // ════════════════════════════════════════
        if (sp === 'goldfish') {
          // ── Goldfish: chubby round orange body, elaborate fan tail ──
          const col1 = `hsl(${this.dna.hue},90%,58%)`;
          const col2 = `hsl(${this.dna.hue},80%,45%)`;
          // Fan tail
          c.save(); c.translate(-s * .7, 0); c.rotate(tw * 0.8);
          c.fillStyle = col2; c.globalAlpha = 0.8;
          for (let i = -1; i <= 1; i++) {
            c.beginPath();
            c.moveTo(0, i * s * .2);
            c.quadraticCurveTo(-s * .5, i * s * .7 * this.dna.tail, -s * .5 * this.dna.tail, i * s * .9 * this.dna.tail);
            c.quadraticCurveTo(-s * .2, i * s * .5, 0, i * s * .2);
            c.fill();
          }
          c.globalAlpha = 1; c.restore();
          // Chubby body (wider aspect ratio)
          const bg = c.createRadialGradient(s * .2, -s * .2, s * .05, 0, 0, s);
          bg.addColorStop(0, '#fff3c4'); bg.addColorStop(.35, col1); bg.addColorStop(1, col2);
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .72, 0, 0, 6.283); c.fill();
          // Scales pattern
          c.strokeStyle = col2; c.lineWidth = .6; c.globalAlpha = .3;
          for (let row = -1; row <= 1; row++) for (let col2p = -1; col2p <= 1; col2p++) {
            c.beginPath(); c.arc(col2p * s * .28 + (row % 2) * s * .14, row * s * .22, s * .14, 0, 6.283); c.stroke();
          }
          c.globalAlpha = 1;
          // Dorsal fin
          c.fillStyle = col1; c.globalAlpha = .7;
          c.beginPath();
          c.moveTo(s * .1, -s * .55); c.bezierCurveTo(s * .05, -s * .95, -s * .15, -s * .95, -s * .3, -s * .55);
          c.lineTo(s * .1, -s * .55); c.fill(); c.globalAlpha = 1;
          // Sheen
          c.fillStyle = 'rgba(255,255,255,.22)';
          c.beginPath(); c.ellipse(s * .15, -s * .18, s * .38, s * .18, -.4, 0, 6.283); c.fill();

        } else if (sp === 'guppy') {
          // ── Guppy: slender iridescent body, colorful flowy tail ──
          const col1 = this.dna.c1(), col2 = this.dna.c2(), col3 = this.dna.c3();
          // Tail (colorful fan)
          c.save(); c.translate(-s * .75, 0); c.rotate(tw);
          c.globalAlpha = .85;
          const tg = c.createLinearGradient(0, -s * .8 * this.dna.tail, 0, s * .8 * this.dna.tail);
          tg.addColorStop(0, col3); tg.addColorStop(.5, col2); tg.addColorStop(1, col1);
          c.fillStyle = tg;
          c.beginPath(); c.moveTo(0, 0);
          c.bezierCurveTo(-s * .25, -s * .5 * this.dna.tail, -s * .55, -s * .25 * this.dna.tail, -s * .45, -s * .8 * this.dna.tail);
          c.bezierCurveTo(-s * .2, -s * .15 * this.dna.tail, -s * .2, s * .15 * this.dna.tail, -s * .45, s * .8 * this.dna.tail);
          c.bezierCurveTo(-s * .55, s * .25 * this.dna.tail, -s * .25, s * .5 * this.dna.tail, 0, 0);
          c.fill(); c.globalAlpha = 1; c.restore();
          // Slender body
          const bg = c.createLinearGradient(-s * .3, -s * .4, s * .5, s * .4);
          bg.addColorStop(0, col1); bg.addColorStop(.5, col3); bg.addColorStop(1, col2);
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .42, 0, 0, 6.283); c.fill();
          // Iridescent sheen
          c.fillStyle = 'rgba(255,255,255,.28)'; c.beginPath(); c.ellipse(s * .2, -s * .1, s * .45, s * .15, -.3, 0, 6.283); c.fill();
          // Dorsal
          c.fillStyle = col2; c.globalAlpha = .65;
          c.beginPath(); c.moveTo(s * .2, -s * .45); c.quadraticCurveTo(-s * .05, -s * .8, -s * .25, -s * .42); c.lineTo(s * .2, -s * .45); c.fill(); c.globalAlpha = 1;
          // Ventral stripe
          c.strokeStyle = col3; c.lineWidth = s * .07; c.globalAlpha = .4;
          c.beginPath(); c.moveTo(s * .5, 0); c.lineTo(-s * .4, 0); c.stroke(); c.globalAlpha = 1;
          // Pectoral fin
          c.save(); c.translate(s * .05, s * .28); c.rotate(fw);
          c.fillStyle = col2; c.globalAlpha = .55;
          c.beginPath(); c.ellipse(0, 0, s * .22, s * .1, .3, 0, 6.283); c.fill(); c.globalAlpha = 1; c.restore();

        } else if (sp === 'neon') {
          // ── Neon Tetra: small silver body with ICONIC electric-blue + red stripes ──
          // Body (silver/grey)
          const bg = c.createLinearGradient(0, -s * .5, 0, s * .5);
          bg.addColorStop(0, '#e8f4fc'); bg.addColorStop(.4, '#b8d8f0'); bg.addColorStop(1, '#7ab4d4');
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .4, 0, 0, 6.283); c.fill();
          // Tail
          c.fillStyle = '#7ab4d4'; c.save(); c.translate(-s * .75, 0); c.rotate(tw);
          c.beginPath(); c.moveTo(0, 0); c.lineTo(-s * .4 * this.dna.tail, -s * .55 * this.dna.tail); c.lineTo(-s * .4 * this.dna.tail, s * .55 * this.dna.tail); c.closePath(); c.fill(); c.restore();
          // ICONIC blue neon stripe (back half)
          c.fillStyle = '#00e5ff'; c.globalAlpha = .9;
          c.beginPath(); c.ellipse(-s * .1, -s * .1, s * .6, s * .1, -.08, 0, 6.283); c.fill();
          c.globalAlpha = 1;
          // ICONIC red stripe (front half, bottom)
          c.fillStyle = '#ff1744'; c.globalAlpha = .85;
          c.beginPath(); c.ellipse(s * .25, s * .08, s * .3, s * .09, .1, 0, 6.283); c.fill();
          c.globalAlpha = 1;
          // Glow effect
          if (!_LOWEND) { c.shadowColor = '#00e5ff'; c.shadowBlur = 6; }
          c.strokeStyle = 'rgba(0,229,255,0.6)'; c.lineWidth = 1;
          c.beginPath(); c.ellipse(-s * .1, -s * .1, s * .6, s * .1, -.08, 0, 6.283); c.stroke();
          if (!_LOWEND) c.shadowBlur = 0;
          // Sheen
          c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(s * .1, -s * .15, s * .3, s * .12, -.2, 0, 6.283); c.fill();

        } else if (sp === 'betta') {
          // ── Betta: vibrant jewel-toned body, spectacular flowing fins ──
          const col1 = this.dna.c1(), col2 = this.dna.c2(), col3 = this.dna.c3();
          // Long flowing ventral fins (trailing below)
          c.save(); c.globalAlpha = .45; c.fillStyle = col2;
          c.beginPath(); c.moveTo(-s * .1, s * .3); c.bezierCurveTo(-s * .5, s * 1.4, s * .3, s * 1.6, s * .2, s * .7); c.bezierCurveTo(s * .1, s * .4, -s * .1, s * .3, -s * .1, s * .3); c.fill();
          c.fillStyle = col3;
          c.beginPath(); c.moveTo(-s * .3, s * .25); c.bezierCurveTo(-s * .9, s * 1.5, -s * .1, s * 1.8, s * .1, s * .8); c.bezierCurveTo(0, s * .4, -s * .3, s * .25, -s * .3, s * .25); c.fill();
          c.globalAlpha = 1; c.restore();
          // Tail fan
          c.save(); c.translate(-s * .7, 0); c.rotate(tw * .6);
          const tfg = c.createLinearGradient(0, -s * this.dna.tail, 0, s * this.dna.tail);
          tfg.addColorStop(0, col3); tfg.addColorStop(.5, col2); tfg.addColorStop(1, col1);
          c.fillStyle = tfg; c.globalAlpha = .8;
          c.beginPath(); c.moveTo(0, 0);
          c.bezierCurveTo(-s * .2, -s * .6 * this.dna.tail, -s * .6, -s * .4 * this.dna.tail, -s * .5, -s * this.dna.tail);
          c.bezierCurveTo(-s * .3, 0, -s * .3, 0, -s * .5, s * this.dna.tail);
          c.bezierCurveTo(-s * .6, s * .4 * this.dna.tail, -s * .2, s * .6 * this.dna.tail, 0, 0);
          c.fill(); c.globalAlpha = 1; c.restore();
          // Body (jewel gradient)
          const bg = c.createLinearGradient(-s * .5, -s * .5, s * .5, s * .5);
          bg.addColorStop(0, col3); bg.addColorStop(.5, col1); bg.addColorStop(1, col2);
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .55, 0, 0, 6.283); c.fill();
          // Iridescent overlay
          c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.ellipse(s * .2, -s * .15, s * .5, s * .2, -.35, 0, 6.283); c.fill();
          // Dorsal fin (tall, dramatic)
          c.fillStyle = col1; c.globalAlpha = .7;
          c.beginPath(); c.moveTo(s * .15, -s * .55); c.bezierCurveTo(s * .1, -s * 1.1, -s * .2, -s * 1.1, -s * .35, -s * .55); c.lineTo(s * .15, -s * .55); c.fill(); c.globalAlpha = 1;

        } else if (sp === 'clown') {
          // ── Clownfish: orange with 3 white bands edged in black ──
          // Body orange
          const bg = c.createRadialGradient(s * .2, -s * .15, s * .05, 0, 0, s);
          bg.addColorStop(0, '#ffcc80'); bg.addColorStop(.4, '#ff6d00'); bg.addColorStop(1, '#e65100');
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .6, 0, 0, 6.283); c.fill();
          // Tail
          c.save(); c.translate(-s * .75, 0); c.rotate(tw);
          c.fillStyle = '#e65100';
          c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(-s * .3, -s * .5, -s * .5, -s * .3, -s * .4, -s * .75 * this.dna.tail);
          c.bezierCurveTo(-s * .3, -s * .1, -s * .3, s * .1, -s * .4, s * .75 * this.dna.tail);
          c.bezierCurveTo(-s * .5, s * .3, -s * .3, s * .5, 0, 0); c.fill(); c.restore();
          // 3 white bars with black outlines
          const bars = [s * .35, s * .0, -s * .35];
          bars.forEach(bx => {
            c.strokeStyle = '#000'; c.lineWidth = s * .08;
            c.beginPath(); c.ellipse(bx, 0, s * .13, s * .52, 0, 0, 6.283); c.stroke();
            c.fillStyle = '#fff';
            c.beginPath(); c.ellipse(bx, 0, s * .1, s * .48, 0, 0, 6.283); c.fill();
          });
          // Fins
          c.fillStyle = '#e65100'; c.globalAlpha = .7;
          c.beginPath(); c.moveTo(s * .2, -s * .55); c.bezierCurveTo(s * .1, -s * .85, -s * .15, -s * .85, -s * .3, -s * .55); c.lineTo(s * .2, -s * .55); c.fill(); c.globalAlpha = 1;
          c.save(); c.translate(s * .05, s * .38); c.rotate(fw);
          c.fillStyle = '#e65100'; c.globalAlpha = .5;
          c.beginPath(); c.ellipse(0, 0, s * .25, s * .1, .3, 0, 6.283); c.fill(); c.globalAlpha = 1; c.restore();
          // Sheen
          c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.ellipse(s * .15, -s * .2, s * .4, s * .18, -.3, 0, 6.283); c.fill();

        } else if (sp === 'angel') {
          // ── Angelfish: tall diamond body, long dorsal+ventral fins ──
          const col1 = this.dna.c1(), col2 = this.dna.c2();
          // Tail
          c.save(); c.translate(-s * .6, 0); c.rotate(tw * .6);
          c.fillStyle = col2; c.globalAlpha = .75;
          c.beginPath(); c.moveTo(0, 0); c.lineTo(-s * .4, -s * .5); c.lineTo(-s * .5, 0); c.lineTo(-s * .4, s * .5); c.closePath(); c.fill(); c.globalAlpha = 1; c.restore();
          // Very long dorsal fin
          c.fillStyle = col1; c.globalAlpha = .65;
          c.beginPath(); c.moveTo(s * .2, -s * .6); c.bezierCurveTo(s * .0, -s * 1.3, -s * .25, -s * 1.2, -s * .4, -s * .6); c.lineTo(s * .2, -s * .6); c.fill(); c.globalAlpha = 1;
          // Tall triangular body
          const bg = c.createLinearGradient(-s * .5, -s * .7, s * .5, s * .7);
          bg.addColorStop(0, col1); bg.addColorStop(.5, '#fff'); bg.addColorStop(1, col2);
          c.fillStyle = bg;
          c.beginPath(); c.ellipse(0, 0, s * .75, s * .85, 0, 0, 6.283); c.fill();
          // Stripes
          c.strokeStyle = col2; c.lineWidth = s * .09; c.globalAlpha = .4;
          [s * .2, -s * .1, -s * .35].forEach(bx => {
            c.beginPath(); c.moveTo(bx, -s * .75); c.lineTo(bx, s * .75); c.stroke();
          });
          c.globalAlpha = 1;
          // Long ventral fin (trailing below)
          c.fillStyle = col1; c.globalAlpha = .5;
          c.beginPath(); c.moveTo(s * .1, s * .6); c.bezierCurveTo(s * .05, s * 1.2, -s * .2, s * 1.15, -s * .3, s * .6); c.lineTo(s * .1, s * .6); c.fill(); c.globalAlpha = 1;
          c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.ellipse(s * .1, -s * .2, s * .4, s * .25, -.3, 0, 6.283); c.fill();

        } else if (sp === 'pleco') {
          // ── Pleco: flat armored brown, sucker mouth, spiky dorsal ──
          const col1 = `hsl(${this.dna.hue},40%,35%)`;
          const col2 = `hsl(${this.dna.hue},30%,25%)`;
          // Wide flat body
          const bg = c.createLinearGradient(0, -s * .5, 0, s * .5);
          bg.addColorStop(0, col1); bg.addColorStop(1, col2);
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .5, 0, 0, 6.283); c.fill();
          // Armored plates
          c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = .8;
          for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(s * .5 - i * s * .25, -s * .4); c.lineTo(s * .5 - i * s * .25, s * .4); c.stroke(); }
          // Spotted pattern
          c.fillStyle = 'rgba(0,0,0,.2)';
          for (let i = 0; i < 6; i++) {
            const px = s * .4 - i * s * .2; const py = (i % 2 - 0.5) * s * .25;
            c.beginPath(); c.arc(px, py, s * .07, 0, 6.283); c.fill();
          }
          // Spiky dorsal
          c.fillStyle = col1; c.globalAlpha = .8;
          c.beginPath(); c.moveTo(-s * .2, -s * .5);
          for (let i = 0; i < 4; i++) { c.lineTo(-s * .1 + i * s * .18, -s * .75 - i % 2 * s * .2); c.lineTo(s * .05 + i * s * .15, -s * .5); }
          c.fill(); c.globalAlpha = 1;
          // Tail
          c.fillStyle = col2; c.save(); c.translate(-s * .75, 0); c.rotate(tw);
          c.beginPath(); c.moveTo(0, -s * .1); c.lineTo(-s * .35, -s * .45); c.lineTo(-s * .45, 0); c.lineTo(-s * .35, s * .45); c.lineTo(0, s * .1); c.closePath(); c.fill(); c.restore();
          // Sucker mouth
          c.fillStyle = 'rgba(0,0,0,.5)'; c.beginPath(); c.ellipse(s * .7, s * .1, s * .15, s * .1, 0, 0, 6.283); c.fill();
          c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 1;
          c.beginPath(); c.arc(s * .7, s * .1, s * .12, 0, 6.283); c.stroke();

        } else if (sp === 'shark') {
          // ── Mini Shark: torpedo grey, white belly, multiple fins ──
          const bodyTop = '#607d8b', bodyBot = '#eceff1', bodyMid = '#90a4ae';
          // Body (torpedo ellipse)
          const bg = c.createLinearGradient(0, -s * .5, 0, s * .5);
          bg.addColorStop(0, bodyTop); bg.addColorStop(.4, bodyMid); bg.addColorStop(1, bodyBot);
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .45, 0, 0, 6.283); c.fill();
          // Crescent tail
          c.save(); c.translate(-s * .8, 0); c.rotate(tw * .4);
          c.fillStyle = bodyTop;
          c.beginPath(); c.moveTo(0, -s * .1); c.lineTo(-s * .5, -s * .6); c.lineTo(-s * .3, 0); c.lineTo(-s * .5, s * .6); c.lineTo(0, s * .1); c.fill(); c.restore();
          // Large dorsal fin
          c.fillStyle = bodyTop;
          c.beginPath(); c.moveTo(s * .1, -s * .45); c.lineTo(-s * .05, -s * 1.05); c.lineTo(-s * .35, -s * .45); c.lineTo(s * .1, -s * .45); c.fill();
          // Pectoral fin
          c.fillStyle = bodyMid; c.globalAlpha = .8;
          c.beginPath(); c.moveTo(s * .2, s * .1); c.bezierCurveTo(s * .3, s * .6, -s * .1, s * .65, -s * .2, s * .1); c.fill(); c.globalAlpha = 1;
          // Gill slits
          c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = 1;
          [s * .3, s * .4, s * .5].forEach(gx => { c.beginPath(); c.moveTo(gx, -s * .3); c.quadraticCurveTo(gx + s * .04, 0, gx, s * .3); c.stroke(); });
          // White belly sheen
          c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(s * .05, s * .18, s * .55, s * .15, .1, 0, 6.283); c.fill();

        } else if (sp === 'axolotl') {
          // ── Axolotl: salamander-like, external pink gills, wide head ──
          const bodyCol = `hsl(${this.dna.hue},80%,82%)`;
          const darkCol = `hsl(${this.dna.hue},70%,65%)`;
          // Body (chubby, salamander)
          const bg = c.createRadialGradient(s * .2, -s * .1, s * .05, 0, 0, s);
          bg.addColorStop(0, '#fce4ec'); bg.addColorStop(.5, bodyCol); bg.addColorStop(1, darkCol);
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .55, 0, 0, 6.283); c.fill();
          // Frilly tail fin
          c.save(); c.translate(-s * .7, 0); c.rotate(tw * .7);
          c.fillStyle = bodyCol; c.globalAlpha = .7;
          c.beginPath(); c.moveTo(0, 0);
          for (let i = 0; i < 5; i++) {
            c.quadraticCurveTo(-s * .2 - i * s * .05, (i % 2 - .5) * s * .6 * this.dna.tail, -s * .3 - i * s * .08, 0);
          }
          c.fill(); c.globalAlpha = 1; c.restore();
          // External gill plumes (3 on top of head area)
          const gillColor = '#f48fb1';
          c.fillStyle = gillColor;
          [{ x: s * .15, y: -s * .45 }, { x: s * .3, y: -s * .5 }, { x: s * .45, y: -s * .42 }].forEach(({ x, y }) => {
            c.save(); c.translate(x, y); c.rotate(Math.sin(this.phase) * 0.25);
            // Plume stalk
            c.fillStyle = darkCol;
            c.beginPath(); c.rect(-s * .025, 0, s * .05, -s * .35); c.fill();
            // Fluffy tip
            c.fillStyle = gillColor;
            for (let i = -1; i <= 1; i++) {
              c.beginPath(); c.ellipse(i * s * .08, -s * .3, s * .07, s * .14, 0, 0, 6.283); c.fill();
            }
            c.restore();
          });
          // Limbs (4 stubby)
          c.fillStyle = bodyCol;
          [{ x: s * .3, y: s * .45 }, { x: .0, y: s * .5 }, { x: -s * .2, y: s * .5 }, { x: s * .45, y: s * .38 }].forEach(({ x, y }) => {
            c.beginPath(); c.ellipse(x, y, s * .1, s * .06, .3, 0, 6.283); c.fill();
          });
          // Spots
          c.fillStyle = 'rgba(180,90,120,.25)';
          [[-s * .2, s * .1], [s * .1, -s * .15], [-s * .4, -s * .1]].forEach(([px, py]) => {
            c.beginPath(); c.arc(px, py, s * .08, 0, 6.283); c.fill();
          });
          // Sheen
          c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.ellipse(s * .2, -s * .2, s * .4, s * .18, -.3, 0, 6.283); c.fill();

        } else if (sp === 'turtle') {
          // ── Sea Turtle: round shell, four flippers ──
          const shellTop = '#388e3c', shellMid = '#4caf50', shellDark = '#2e7d32';
          // Flippers (4 limbs)
          c.fillStyle = '#66bb6a';
          [{ x: s * .4, y: s * .45, r: .7 }, { x: -s * .1, y: s * .52, r: .5 }, { x: s * .35, y: -s * .45, r: -.6 }, { x: -s * .05, y: -s * .5, r: -.45 }].forEach(({ x, y, r }) => {
            c.save(); c.translate(x, y); c.rotate(r + fw * .3);
            c.beginPath(); c.ellipse(0, 0, s * .3, s * .12, 0, 0, 6.283); c.fill(); c.restore();
          });
          // Shell main
          const sbg = c.createRadialGradient(s * .1, -s * .1, s * .05, 0, 0, s * .75);
          sbg.addColorStop(0, '#81c784'); sbg.addColorStop(.4, shellMid); sbg.addColorStop(1, shellDark);
          c.fillStyle = sbg; c.beginPath(); c.ellipse(0, 0, s * .8, s * .7, 0, 0, 6.283); c.fill();
          // Shell scutes (hexagonal pattern)
          c.strokeStyle = shellDark; c.lineWidth = 1.2;
          c.beginPath(); c.ellipse(0, 0, s * .38, s * .32, 0, 0, 6.283); c.stroke();
          [[s * .28, -s * .1], [-s * .2, s * .22], [-s * .2, -s * .22], [s * .28, s * .2]].forEach(([px, py]) => {
            c.beginPath(); c.ellipse(px, py, s * .18, s * .16, 0, 0, 6.283); c.stroke();
          });
          // Head
          const hbg = c.createRadialGradient(s * .75, 0, s * .05, s * .7, 0, s * .25);
          hbg.addColorStop(0, '#aed581'); hbg.addColorStop(1, '#558b2f');
          c.fillStyle = hbg; c.beginPath(); c.ellipse(s * .75, 0, s * .28, s * .22, 0, 0, 6.283); c.fill();
          // Shell sheen
          c.fillStyle = 'rgba(255,255,255,.15)'; c.beginPath(); c.ellipse(s * .1, -s * .2, s * .35, s * .2, -.4, 0, 6.283); c.fill();

        } else if (sp === 'jelly') {
          // ── Moon Jelly: translucent bell + trailing tentacles, bioluminescent ──
          const col1 = this.dna.c1();
          const glow = `hsla(${this.dna.hue},80%,80%,0.6)`;
          // Glow aura — skipped on low-end (shadowBlur is very expensive per draw call)
          if (!_LOWEND) c.shadowColor = col1; c.shadowBlur = _LOWEND ? 0 : 22;
          // Tentacles (trailing below bell)
          c.strokeStyle = glow; c.lineWidth = 1.2; c.globalAlpha = .55;
          for (let i = 0; i < 8; i++) {
            const tx = (i - 3.5) * s * .2;
            const wave = Math.sin(this.phase * 1.2 + i * .8) * s * .35;
            c.beginPath(); c.moveTo(tx, s * .4);
            c.bezierCurveTo(tx + wave, s * .8, tx - wave, s * 1.2, tx + wave * 0.5, s * 1.6 * this.dna.tail);
            c.stroke();
          }
          c.globalAlpha = 1;
          // Bell (dome shape)
          const bg = c.createRadialGradient(0, -s * .1, 0, 0, s * .1, s * .75);
          bg.addColorStop(0, 'rgba(255,255,255,0.5)');
          bg.addColorStop(.4, `hsla(${this.dna.hue},70%,85%,0.5)`);
          bg.addColorStop(1, `hsla(${this.dna.hue},60%,65%,0.35)`);
          c.fillStyle = bg;
          c.beginPath(); c.arc(0, 0, s * .75, Math.PI, 0); c.ellipse(0, s * .1, s * .75, s * .25, 0, 0, Math.PI); c.fill();
          // Inner organs (4 circles)
          c.fillStyle = `hsla(${this.dna.hue},80%,75%,0.5)`;
          [[-s * .28, s * .08], [s * .28, s * .08], [-s * .0, -s * .08]].forEach(([px, py]) => {
            c.beginPath(); c.arc(px, py, s * .14, 0, 6.283); c.fill();
          });
          // Rim highlight
          c.strokeStyle = 'rgba(255,255,255,0.5)'; c.lineWidth = 1.5;
          c.beginPath(); c.arc(0, 0, s * .75, Math.PI, 0); c.stroke();
          c.shadowBlur = 0;

        } else if (sp === 'star') {
          // ── Starfish: 5-pointed star shape, textured ──
          const col1 = `hsl(${this.dna.hue},80%,58%)`;
          const col2 = `hsl(${this.dna.hue},70%,45%)`;
          c.save(); c.rotate(this.phase * 0.03); // slow rotate
          // 5-arm star body
          c.fillStyle = col1; c.beginPath();
          for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? s : s * .4;
            const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
            if (i === 0) c.moveTo(Math.cos(a) * r, Math.sin(a) * r);
            else c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          c.closePath(); c.fill();
          // Texture dots on each arm
          c.fillStyle = 'rgba(0,0,0,.15)';
          for (let arm = 0; arm < 5; arm++) {
            const a = (arm / 5) * Math.PI * 2 - Math.PI / 2;
            for (let d2 = 0.3; d2 <= 0.9; d2 += 0.3) {
              c.beginPath(); c.arc(Math.cos(a) * s * d2, Math.sin(a) * s * d2, s * .05, 0, 6.283); c.fill();
            }
          }
          // Center dome
          const cbg = c.createRadialGradient(0, 0, 0, 0, 0, s * .35);
          cbg.addColorStop(0, 'rgba(255,255,255,0.4)'); cbg.addColorStop(1, `hsla(${this.dna.hue},70%,45%,0.67)`);
          c.fillStyle = cbg; c.beginPath(); c.arc(0, 0, s * .35, 0, 6.283); c.fill();
          c.restore();

        } else {
          // ── Generic/Hybrid fish — beautiful DNA-colored body ──
          const bg = c.createRadialGradient(s * .25, -s * .15, s * .1, 0, 0, s * 1.1);
          bg.addColorStop(0, this.dna.c3()); bg.addColorStop(.4, this.dna.c1()); bg.addColorStop(1, this.dna.c2());
          // Tail
          c.save(); c.translate(-s * .75, 0); c.rotate(tw); c.fillStyle = this.dna.c2();
          c.beginPath(); const t = this.dna.tail; c.moveTo(0, 0);
          c.bezierCurveTo(-s * .3 * t, -s * .5 * t, -s * .6 * t, -s * .3 * t, -s * .5 * t, -s * .8 * t);
          c.bezierCurveTo(-s * .3 * t, -s * .2 * t, -s * .3 * t, s * .2 * t, -s * .5 * t, s * .8 * t);
          c.bezierCurveTo(-s * .6 * t, s * .3 * t, -s * .3 * t, s * .5 * t, 0, 0);
          c.fill(); c.restore();
          // Dorsal
          c.save(); c.fillStyle = this.dna.c2(); c.globalAlpha = .7;
          c.beginPath(); c.moveTo(s * .3, -s * .55); c.bezierCurveTo(s * .1, -s * (.7 + this.dna.fins * .35), -s * .2, -s * (.7 + this.dna.fins * .3), -s * .35, -s * .5); c.lineTo(s * .3, -s * .55); c.fill(); c.globalAlpha = 1; c.restore();
          // Body
          c.fillStyle = bg; c.beginPath(); c.ellipse(0, 0, s, s * .6, 0, 0, 6.283); c.fill();
          c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.ellipse(s * .15, -s * .2, s * .5, s * .2, -.3, 0, 6.283); c.fill();
          // Pattern
          if (this.dna.pat === 1) {
            c.fillStyle = this.dna.c2(); c.globalAlpha = .5;
            for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(-s * .4 + i * s * .25, (i % 2 - .5) * s * .35, s * .1, 0, 6.283); c.fill(); }
            c.globalAlpha = 1;
          } else if (this.dna.pat === 2) {
            c.strokeStyle = this.dna.c2(); c.lineWidth = s * .1; c.globalAlpha = .4;
            for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(s * .35 - i * s * .3, -s * .45); c.lineTo(s * .35 - i * s * .3, s * .45); c.stroke(); }
            c.globalAlpha = 1;
          }
          // Pectoral fin
          c.save(); c.translate(s * .1, s * .35); c.rotate(fw); c.fillStyle = this.dna.c2(); c.globalAlpha = .5;
          c.beginPath(); c.ellipse(0, 0, s * .25, s * .12, .3, 0, 6.283); c.fill(); c.globalAlpha = 1; c.restore();
        }

        // ════════ EYE (shared, with species variations) ════════
        if (sp !== 'star') { // starfish has no eye
          const eyeX = sp === 'turtle' ? s * .75 : sp === 'jelly' ? 0 : s * .5;
          const eyeY = sp === 'turtle' ? -s * .06 : sp === 'jelly' ? -s * .35 : -s * .12;
          const eyeR = sp === 'shark' ? s * .14 : sp === 'axolotl' ? s * .15 : s * .17;
          // Sclera
          c.fillStyle = '#fff'; c.beginPath(); c.arc(eyeX, eyeY, eyeR, 0, 6.283); c.fill();
          // Iris (species-colored)
          const irisColors = { jelly: '#9c27b0', shark: '#37474f', turtle: '#33691e', axolotl: '#ad1457', betta: '#b71c1c' };
          c.fillStyle = irisColors[sp] || '#222';
          c.beginPath(); c.arc(eyeX + eyeR * .2, eyeY, eyeR * .52, 0, 6.283); c.fill();
          // Pupil slit (vertical for shark/betta, round for others)
          c.fillStyle = '#000';
          if (sp === 'shark' || sp === 'betta') {
            c.beginPath(); c.ellipse(eyeX + eyeR * .2, eyeY, eyeR * .1, eyeR * .38, 0, 0, 6.283); c.fill();
          } else {
            c.beginPath(); c.arc(eyeX + eyeR * .2, eyeY, eyeR * .25, 0, 6.283); c.fill();
          }
          // Specular highlight
          c.fillStyle = '#fff'; c.beginPath(); c.arc(eyeX + eyeR * .35, eyeY - eyeR * .28, eyeR * .13, 0, 6.283); c.fill();
        }

        // ════════ RARITY GLOW RING ════════
        const r = this.dna.rarity();
        c.strokeStyle = RC[r]; c.lineWidth = 1.5; c.globalAlpha = .35;
        c.beginPath(); c.ellipse(0, 0, s * 1.15, s * .75, 0, 0, 6.283); c.stroke(); c.globalAlpha = 1;

        // ════════ NAME LABEL ════════
        c.font = `bold ${Math.max(7, s * .2)}px Fredoka`; c.textAlign = 'center';
        c.fillStyle = 'rgba(0,0,0,.3)'; c.fillText(this.dna.label(), 1, s + 1);
        c.fillStyle = RC[r]; c.fillText(this.dna.label(), 0, s);
        if (this.lv > 1) {
          c.fillStyle = '#ffd700'; c.font = `bold ${Math.max(7, s * .18)}px Fredoka`;
          c.fillText('Lv' + this.lv, 0, -s * .9);
        }

        // ════════ STATUS INDICATORS ════════
        // Hunger warning
        if (this.hunger < 30 && !this.caught) {
          const pulse = 0.45 + Math.abs(Math.sin(Date.now() / 350)) * 0.55;
          c.save(); c.globalAlpha = pulse;
          c.font = `${Math.max(9, s * .7)}px serif`; c.textAlign = 'center';
          c.fillText(this.hunger < 15 ? '😵' : '🍽', 0, -s * (sp === 'jelly' ? 1.1 : 1.45));
          c.globalAlpha = 1; c.restore();
        }
        // Temperature stress
        if (!this.caught && this._tempStress > 3) {
          const p2 = 0.5 + Math.abs(Math.sin(Date.now() / 400 + 1.5)) * 0.5;
          c.save(); c.globalAlpha = p2 * .85;
          c.font = `${Math.max(8, s * .55)}px serif`; c.textAlign = 'center';
          c.fillText((GS.temp || 24) > 28 ? '🌡️' : '❄️', s * 1.05, -s * .85);
          c.globalAlpha = 1; c.restore();
        }

        // ════════ MOUTH ════════
        if (sp !== 'star' && sp !== 'pleco' && sp !== 'jelly') {
          const mouthX = sp === 'turtle' ? s * .98 : s * .78;
          if (!this.caught) {
            c.strokeStyle = sp === 'clown' ? '#bf360c' : this.dna.c2();
            c.lineWidth = .8; c.beginPath(); c.arc(mouthX, s * .05, s * .1, .15, 1.1); c.stroke();
          }
        }

        c.restore();
      }

      addXP(a) {
        this.xp += a;
        if (this.xp >= this.lv * 40) {
          this.xp = 0; this.lv++;
          this.size = Math.min(this.dna.maxSize(), this.size * 1.05);
          GS.xp += 10;
          if (GS.xp >= GS.level * 100) {
            GS.xp = 0; GS.level++;
            notify('✨ Level Up! Level ' + GS.level, 'success');
            SFX.levelUp();
            checkNewSpeciesUnlocks(GS.level);
          }
        }
      }

      getValue() { return Math.floor(15 + this.size * 1.5 + this.lv * 8); }
      getAge() { return Math.floor(this.born / 60); }
      getHunger() { return Math.floor(this.hunger); }
      ser() { return { dna: this.dna, lv: this.lv, xp: this.xp, happy: this.happy, hunger: this.hunger, size: this.size, x: this.x, y: this.y, born: this.born }; }
    }

    // ============== PARTICLES ==============
    const _p = [];
    function spawnP(x, y, c, n) {
      for (let i = 0; i < (n || 2) && _p.length < CFG.MAX_P; i++)
        _p.push({ x, y, vx: (Math.random() - .5) * 2.5, vy: -1.5 - Math.random() * 2.5, l: 1, c, r: 2 + Math.random() * 3 });
    }
    function tickP(dt) {
      for (let i = _p.length - 1; i >= 0; i--) {
        const p = _p[i]; p.x += p.vx; p.y += p.vy; p.l -= dt * 1.5;
        if (p.l <= 0) _p.splice(i, 1);
      }
    }
    function drawP(c) {
      for (let i = 0; i < _p.length; i++) {
        c.globalAlpha = Math.max(0, _p[i].l); c.fillStyle = _p[i].c;
        c.beginPath(); c.arc(_p[i].x, _p[i].y, _p[i].r, 0, 6.283); c.fill();
      }
      c.globalAlpha = 1;
    }

    // Bubbles
    const _b = [];
    let _bTimer = 0;
    function tickB(dt) {
      _bTimer -= dt;
      if (_bTimer <= 0 && _b.length < CFG.MAX_B) {
        _bTimer = .5 + Math.random() * .8;
        _b.push({ x: 20 + Math.random() * (W - 40), y: H - 55, r: 2 + Math.random() * 4, sp: 20 + Math.random() * 30, w: Math.random() * 6.28 });
      }
      for (let i = _b.length - 1; i >= 0; i--) {
        const b = _b[i]; b.y -= b.sp * dt; b.x += Math.sin(b.w + b.y * .05) * .4;
        if (b.y < -10) _b.splice(i, 1);
      }
    }
    function drawB(c) {
      for (let i = 0; i < _b.length; i++) {
        const b = _b[i], a = Math.max(0, Math.min(1, b.y / (H - 55)));
        c.strokeStyle = `rgba(255,255,255,${a * .6})`; c.lineWidth = 1;
        c.beginPath(); c.arc(b.x, b.y, b.r, 0, 6.283); c.stroke();
        c.fillStyle = `rgba(255,255,255,${a * .15})`; c.fill();
      }
    }

    // Light rays
    let _lT = 0;
    let _rayGrads = null; // cached ray gradients (rebuilt on resize)
    function drawRays(c) {
      _lT += .005;
      // Rebuild gradient templates only when size changes
      if (!_rayGrads || _rayGrads.W !== W) {
        _rayGrads = { W, list: [] };
        for (let i = 0; i < 4; i++) {
          const rg = c.createLinearGradient(0, 0, 40, H * .7);
          rg.addColorStop(0, 'rgba(255,255,255,0.06)');
          rg.addColorStop(1, 'rgba(255,255,255,0)');
          _rayGrads.list.push(rg);
        }
      }
      for (let i = 0; i < 4; i++) {
        const x = W * (.1 + i * .25 + Math.sin(_lT + i) * .05);
        c.fillStyle = _rayGrads.list[i];
        c.beginPath();
        c.moveTo(x - 15, 0); c.lineTo(x + 55, 0); c.lineTo(x + 30, H * .7); c.lineTo(x - 5, H * .7);
        c.fill();
      }
    }

    // ============== GLOOBY AI ==============
    // ════════════════════════════════════════════════════
    //   GLOOBY CHAT SYSTEM
    // ════════════════════════════════════════════════════
    let _gloobyOpen = false;

    const GLOOBY_TIPS = [
      "💡 Breed two fish of the same rarity for a better chance at higher rarity offspring!",
      "🌿 Plants automatically feed your fish every few seconds. Buy them in Shop → Plants!",
      "🌡️ Each species has an optimal temperature range. Check the Fish Info panel!",
      "🦑 The deeper you dive in Abyssal Hunt, the rarer the fish you can find!",
      "🧬 DNA Codex is the best way to earn bonus coins fast — try Level 1 first!",
      "💧 Pleco fish eat waste and help keep the tank clean automatically!",
      "🪸 Corals clean your water passively. Pair them with plants for an Eco Bonus!",
      "⚡ Activate the 2× Boost before fishing or catching visitors for double rewards!",
      "🏆 Completing the Encyclopedia gives you 25 pearls + 2000 coins as reward!",
      "🌊 Moon Jellyfish prefer cold water (15–20°C). Keep your tank cool for them!",
      "🐙 Axolotls are messy eaters — they dirty the tank faster than other fish!",
      "🦈 Mini Sharks are fast! They generate coins quickly but eat a lot.",
    ];

    const GLOOBY_QUESTIONS = [
      { label: '🐟 Tank status?', key: 'status' },
      { label: '💡 Give me a tip', key: 'tip' },
      { label: '🍽 Should I feed?', key: 'feed' },
      { label: '💧 Water quality?', key: 'water' },
      { label: '🌡️ Temperature?', key: 'temp' },
      { label: '💰 Earn coins?', key: 'coins' },
      { label: '🧬 Best breed?', key: 'breed' },
      { label: '🔬 AI Naturalist', key: 'naturalist' },
    ];

    function gloobyAnswer(key) {
      const fish = GS.fish || [];
      const avgHunger = fish.length ? Math.round(fish.reduce((s, f) => s + f.hunger, 0) / fish.length) : 100;
      const hungry = fish.filter(f => f.hunger < 30).length;
      const temp = (GS.temp || 24).toFixed(1);
      const plants = (GS.plants || []).length, corals = (GS.corals || []).length;
      const coins = Math.floor(GS.coins);

      const map = {
        status: `Your tank has ${fish.length} fish${hungry ? ` — ⚠️ ${hungry} are hungry!` : ' and everyone is fed ✅'}. Cleanliness ${Math.round(GS.clean)}%, temp ${temp}°C, 🪙${coins} coins. ${fish.length >= CFG.MAX_FISH ? 'Tank is FULL!' : 'Room for ' + (CFG.MAX_FISH - fish.length) + ' more.'}`,

        tip: GLOOBY_TIPS[Math.random() * GLOOBY_TIPS.length | 0],

        feed: hungry > 0
          ? `Yes! ${hungry} fish ${hungry === 1 ? 'has' : 'have'} hunger below 30%. Feed them now before they start losing happiness! 🍽`
          : avgHunger < 65
            ? `Average hunger is ${avgHunger}%. Not critical yet, but feed them soon. 🐟`
            : `All full! Average hunger is ${avgHunger}%. Take a break. 😊`,

        water: GS.clean < 30
          ? `⚠️ Water quality is critical at ${Math.round(GS.clean)}%! Clean the tank NOW! ${plants > 0 ? 'Your plants are getting sick!' : ''}`
          : GS.clean < 60
            ? `Water is ${Math.round(GS.clean)}% clean. Clean it soon. Corals and Pleco fish help passively!`
            : `Water looks great at ${Math.round(GS.clean)}%! ${corals > 0 ? 'Your ' + corals + ' coral(s) are working hard!' : ''}`,

        temp: (() => {
          const t = GS.temp || 24;
          const stressed = fish.filter(f => { const sp = SPECIES[f.dna.pure]; if (!sp) return false; return t < sp.optTempLow || t > sp.optTempHigh; });
          return `Temp is ${temp}°C. ${stressed.length > 0 ? `⚠️ ${stressed.length} fish stressed! Adjust in Settings → Temperature.` : '✅ All fish comfortable!'} ${GS.upgrades && GS.upgrades.tempctrl ? 'Temp Control upgrade active.' : 'Buy Temp Control to automate this!'}`;
        })(),

        coins: (() => {
          const opts = ['🎣 Go fishing — rarer fish = more coins', '🌊 Play Leviathan in Adventure — 600+ coins if you win!', '🌿 Harvest mature plants and corals', '🧬 Try DNA Codex level 3+ for big rewards'];
          if (!_boostActive) opts.push('⚡ Activate 2× Boost then fish for double coins!');
          return `You have 🪙${coins}. Try: ${opts[Math.random() * opts.length | 0]}`;
        })(),

        breed: (() => {
          if (fish.length < 2) return `Need 2+ fish to breed! Buy one from the Shop. 🐟`;
          const r = { Legendary: [], Epic: [], Rare: [], Common: [] };
          fish.forEach(f => r[f.dna.rarity()].push(f));
          if (r.Legendary.length >= 2) return `🌟 Breed two Legendaries for another Legendary or an epic Hybrid!`;
          if (r.Epic.length >= 2) return `✨ Breed two Epics — good chance of a Legendary offspring!`;
          if (r.Rare.length >= 2) return `💜 Breed two Rares for a shot at Epic or Legendary!`;
          return `Mostly Common fish. Breed the two highest-level ones and work up over time!`;
        })(),

        naturalist: `🔬 Naturalist mode activated! You have ${fish.length} species in your tank. Open the 🔬 Science panel for full scientific profiles of each creature, or ask me something like "what is an axolotl?" and I'll answer with AI. ${fish.length > 0 ? 'Your current species: ' + [...new Set(fish.filter(f => f.dna.pure).map(f => SPECIES[f.dna.pure]?.name || 'Hybrid'))].join(', ') + '.' : 'Buy your first fish in the Shop!'}`,
      };
      return map[key] || 'Hmm, ask me something else! 🐙';
    }

    // Glooby: send text message via Claude API
    async function gloobyAskClaude(userMsg) {
      const fish = GS.fish || [];
      const fishList = [...new Set(fish.filter(f => f.dna.pure).map(f => SPECIES[f.dna.pure]?.name || 'Hybrid'))];
      const plants = (GS.plants || []).length, corals = (GS.corals || []).length;
      const systemPrompt = `You are Glooby, a friendly AI aquarium assistant and marine naturalist in the Glopbix virtual aquarium game. The player's tank currently has: ${fish.length} fish (${fishList.join(', ') || 'none'}), ${plants} plants, ${corals} corals. Tank temp: ${(GS.temp || 24).toFixed(1)}°C, cleanliness: ${Math.round(GS.clean)}%, coins: ${Math.floor(GS.coins)}. Respond in the same language the user writes in. Be concise, warm, and scientifically accurate. Use emojis naturally. Max 3 sentences.`;
      gloobyAddMessage(userMsg, 'user');
      const typing = document.getElementById('glooby-typing');
      if (typing) typing.style.display = 'block';
      try {
        const reply = await callGemini(userMsg, systemPrompt, 200);
        if (typing) typing.style.display = 'none';
        gloobyAddMessage(reply || 'Something went wrong, please try again! 🐙', 'bot');
      } catch (e) {
        if (typing) typing.style.display = 'none';
        gloobyAddMessage("Can't connect right now. Check your connection! 🐙", "bot");
      }
      const msgs = document.getElementById('glooby-messages');
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }

    function gloobyAddMessage(text, role) {
      const msgs = document.getElementById('glooby-messages');
      if (!msgs) return;
      const div = document.createElement('div');
      div.className = 'glooby-msg ' + role;
      div.textContent = text;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function gloobyAsk(key, label) {
      if (key === 'naturalist') {
        gloobyAskClaude('Tell me about the species in my aquarium and give me a fascinating scientific fact about one of them.');
        return;
      }
      gloobyAddMessage(label, 'user');
      const typing = document.getElementById('glooby-typing');
      if (typing) typing.style.display = 'block';
      const msgs = document.getElementById('glooby-messages');
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
      setTimeout(() => {
        if (typing) typing.style.display = 'none';
        gloobyAddMessage(gloobyAnswer(key), 'bot');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
      }, 380 + Math.random() * 280);
    }

    function renderGloobyQuickBtns() {
      const cont = document.getElementById('glooby-quick-btns');
      if (!cont) return;
      cont.innerHTML = GLOOBY_QUESTIONS.map(q =>
        `<button class="glooby-qbtn" onclick="gloobyAsk('${q.key}','${q.label}')">${q.label}</button>`
      ).join('');
    }

    function toggleGloobyChat() {
      _gloobyOpen = !_gloobyOpen;
      const chat = document.getElementById('glooby-chat');
      const dot = document.getElementById('glooby-notif-dot');
      if (!chat) return;
      if (_gloobyOpen) {
        chat.classList.add('open');
        if (dot) dot.style.display = 'none';
        const msgs = document.getElementById('glooby-messages');
        if (msgs && msgs.children.length === 0) {
          gloobyAddMessage(`Hey! 🐙 I'm Glooby, your aquarium AI! Tap a question below or just ask me anything about your tank, fish, or how to earn coins.`, 'bot');
        }
        renderGloobyQuickBtns();
      } else {
        chat.classList.remove('open');
      }
    }
    function closeGlooby() { _gloobyOpen = false; const c = document.getElementById('glooby-chat'); if (c) c.classList.remove('open'); }

    // Periodic status checks — notify dot + urgent glow
    setInterval(() => {
      if (!GS.started) return;
      const hungry = (GS.fish || []).filter(f => f.hunger < 20).length;
      const dirty = GS.clean < 22;
      if (!_gloobyOpen && (hungry > 0 || dirty)) {
        const dot = document.getElementById('glooby-notif-dot');
        const face = document.getElementById('glooby-face');
        if (dot) dot.style.display = 'block';
        if (face && hungry > 0) { face.style.filter = 'drop-shadow(0 0 10px #ff1744)'; setTimeout(() => { if (face) face.style.filter = ''; }, 2500); }
      }
      if (_gloobyOpen) {
        let msg = GLOOBY_TIPS[Math.random() * GLOOBY_TIPS.length | 0];
        if (hungry > 0) msg = `⚠️ ${hungry} fish ${hungry === 1 ? 'is' : 'are'} critically hungry! Feed them fast!`;
        else if (dirty) msg = `🤢 Tank is very dirty (${Math.round(GS.clean)}%)! Clean it before plants die!`;
        gloobyAddMessage(msg, 'bot');
      }
    }, 22000);

    // ============== DECORATIONS RENDERING ==============
    function drawDeco(c, d, i) {
      let x = d.x || (30 + (i * 80) % (W - 60));
      const y = H - 42;
      const s = d.sz || 1, rc = RC[d.r];
      c.save(); c.translate(x, y); c.scale(s, s);
      if (GS.dragDeco === d && !_LOWEND) { c.shadowColor = '#fff'; c.shadowBlur = 15; }

      if (d.name.includes('Pebble')) {
        c.fillStyle = '#9e9e9e';
        for (let j = 0; j < 4; j++) { c.beginPath(); c.ellipse(-6 + j * 5, 0, 3 + j % 2, 2, 0, 0, 6.283); c.fill(); }
      } else if (d.name.includes('Seaweed')) {
        c.strokeStyle = '#4CAF50'; c.lineWidth = 2.5;
        for (let j = 0; j < 2; j++) {
          c.beginPath(); c.moveTo(j * 8 - 4, 0);
          c.bezierCurveTo(j * 8 - 8, -12, j * 8, j % 2 ? -18 : -22, j * 8 - 4, -28 - j * 5); c.stroke();
        }
        c.fillStyle = '#66BB6A';
        for (let j = 0; j < 3; j++) { c.beginPath(); c.ellipse(j * 6 - 6, -10 - j * 8, 3, 5, .3, 0, 6.283); c.fill(); }
      } else if (d.name.includes('Coral')) {
        c.fillStyle = '#ef5350';
        for (let j = 0; j < 5; j++) { c.beginPath(); c.ellipse(-8 + j * 4, 0, 2.5, 6 + j % 3 * 4, (j - .5) * .15, 0, 6.283); c.fill(); }
        c.fillStyle = '#ff8a80';
        for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(-4 + j * 4, -8 - j % 2 * 3, 1.5, 0, 6.283); c.fill(); }
      } else if (d.name.includes('Shell')) {
        const sg = c.createRadialGradient(0, -4, 1, 0, -4, 10); sg.addColorStop(0, '#fff'); sg.addColorStop(1, '#ffcdd2');
        c.fillStyle = sg; c.beginPath(); c.arc(0, -5, 8, Math.PI, 0); c.fill();
        c.strokeStyle = '#e57373'; c.lineWidth = .5;
        for (let j = 0; j < 4; j++) { c.beginPath(); c.moveTo(0, -5); c.lineTo(-8 + j * 5, -1); c.stroke(); }
      } else if (d.name.includes('Anemone')) {
        for (let j = 0; j < 8; j++) {
          const a = -Math.PI / 2 + j * .4 - .8;
          c.strokeStyle = `hsl(${300 + j * 10},70%,60%)`; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 0);
          const ex = Math.cos(a) * 14, ey = Math.sin(a) * 14;
          c.bezierCurveTo(ex * .3, ey * .5, ex * .7, ey * .8, ex, ey); c.stroke();
          c.fillStyle = `hsl(${300 + j * 10},80%,70%)`; c.beginPath(); c.arc(ex, ey, 2, 0, 6.283); c.fill();
        }
      } else if (d.name.includes('Chest')) {
        c.fillStyle = '#6d4c41'; c.fillRect(-10, -14, 20, 14);
        c.fillStyle = '#5d4037'; c.fillRect(-10, -14, 20, 3);
        c.fillStyle = '#ffd700'; c.fillRect(-2, -12, 4, 4);
        c.fillStyle = '#ffeb3b';
        c.beginPath(); c.arc(-4, -8, 2, 0, 6.283); c.fill();
        c.beginPath(); c.arc(5, -6, 1.5, 0, 6.283); c.fill();
        c.beginPath(); c.arc(0, -4, 2.5, 0, 6.283); c.fill();
      } else if (d.name.includes('Ship')) {
        c.fillStyle = '#5d4037'; c.beginPath();
        c.moveTo(-16, 0); c.lineTo(-12, -18); c.lineTo(12, -18); c.lineTo(16, 0); c.fill();
        c.fillStyle = '#4e342e'; c.fillRect(-2, -18, 4, 5);
        c.strokeStyle = '#795548'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, -18); c.lineTo(0, -30); c.stroke();
        c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(2, -30, 8, 6);
      } else if (d.name.includes('Statue')) {
        c.fillStyle = '#90a4ae'; c.fillRect(-5, -24, 10, 24);
        c.beginPath(); c.arc(0, -27, 7, 0, 6.283); c.fill();
        c.fillStyle = '#78909c'; c.fillRect(-8, -8, 16, 3);
        c.fillStyle = '#b0bec5';
        c.beginPath(); c.arc(-2, -28, 1.5, 0, 6.283); c.fill();
        c.beginPath(); c.arc(2, -28, 1.5, 0, 6.283); c.fill();
      } else if (d.name.includes('Cave')) {
        for (let j = 0; j < 5; j++) {
          const cg = c.createLinearGradient(0, 0, 0, -20 - j * 6); cg.addColorStop(0, rc); cg.addColorStop(1, 'rgba(255,255,255,.6)');
          c.fillStyle = cg; c.beginPath();
          c.moveTo(-10 + j * 5, 0); c.lineTo(-7 + j * 5, -15 - j * 5); c.lineTo(-4 + j * 5, 0); c.fill();
        }
        c.fillStyle = 'rgba(255,255,255,.2)';
        for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(-5 + j * 5, -10 - j * 4, 1, 0, 6.283); c.fill(); }
      } else if (d.name.includes('Trident')) {
        c.strokeStyle = '#ffd700'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -30); c.stroke();
        c.lineWidth = 2.5; c.beginPath();
        c.moveTo(-8, -24); c.lineTo(-8, -28); c.moveTo(0, -30); c.lineTo(0, -32); c.moveTo(8, -24); c.lineTo(8, -28); c.stroke();
        c.strokeStyle = '#ffb300'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-8, -24); c.lineTo(8, -24); c.stroke();
      } else if (d.name.includes('Egg')) {
        const eg = c.createRadialGradient(-1, -10, 2, 0, -8, 12);
        eg.addColorStop(0, '#ffab00'); eg.addColorStop(.6, '#ff6d00'); eg.addColorStop(1, '#bf360c');
        c.fillStyle = eg; c.beginPath(); c.ellipse(0, -10, 8, 12, 0, 0, 6.283); c.fill();
        c.fillStyle = 'rgba(255,255,255,.15)'; c.beginPath(); c.ellipse(-2, -14, 3, 4, -.3, 0, 6.283); c.fill();
        c.strokeStyle = '#ff8f00'; c.lineWidth = .5;
        for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(-3 + j * 3, -8 + j % 2 * 4, 3, .5, 2.5); c.stroke(); }
      } else {
        c.fillStyle = rc; c.beginPath(); c.arc(0, -10, 8, 0, 6.283); c.fill();
        c.fillStyle = '#fff'; c.font = '10px Arial'; c.textAlign = 'center'; c.fillText(d.name.substr(0, 1), 0, -6);
      }
      c.restore();
    }

    // ============== PLANTS & CORALS LOGIC ==============

    // Temperature drifts slowly over time (called each day)
    function tickTemperature(dt) {
      // If tempctrl upgrade active: lock near 25°C optimal
      if (GS.upgrades && GS.upgrades.tempctrl) {
        GS.temp = 24.5 + Math.sin(_t * 0.05) * 0.3; // stable ~24.5°C
        return;
      }
      // Slow random drift ±0.5°C per minute, clamped 18–32
      GS.temp = Math.max(18, Math.min(32,
        GS.temp + (Math.random() - 0.5) * dt * 0.01
      ));
    }

    function getTempMultiplier(isPlant) {
      // Plants: optimal 22–26°C. Corals: optimal 26–30°C (warm water species)
      const opt = isPlant ? 24 : 28;
      const diff = Math.abs(GS.temp - opt);
      return Math.max(0.35, 1 - diff * 0.065);
    }

    function getEcosystemBonus() {
      // Combo: having both plants AND corals gives a happiness multiplier
      const hasPlants = (GS.plants || []).filter(p => !p.harvested && p.maturity > 0.5).length;
      const hasCorals = (GS.corals || []).filter(c => !c.harvested && c.maturity > 0.5).length;
      if (hasPlants >= 2 && hasCorals >= 2) return 1.35;
      if (hasPlants >= 1 && hasCorals >= 1) return 1.15;
      return 1.0;
    }

    function tickPlantsCorals(dt) {
      tickTemperature(dt);
      const ecosystemBonus = getEcosystemBonus();

      const allFlora = [...(GS.plants || []), ...(GS.corals || [])];
      allFlora.forEach(item => {
        if (item.harvested) return;
        const data = item.isPlant ? PLANT_TYPES[item.typeId] : CORAL_TYPES[item.typeId];
        if (!data) return;

        // Temperature affects growth speed
        const tempMult = getTempMultiplier(item.isPlant);
        const fertMult = (item.isPlant && GS.upgrades && GS.upgrades.fertilizer) ? 1.5 : 1.0;
        item.age = (item.age || 0) + dt * tempMult * fertMult;

        const maturity = Math.min(1, item.age / data.growTime);
        item.maturity = maturity;
        item.ready = maturity >= 1;

        // Disease: plants wilt if water very dirty
        if (item.isPlant && GS.clean < 20 && maturity > 0.3) {
          item.sick = true;
          item.age = Math.max(0, item.age - dt * 0.5); // regress growth when sick
        } else {
          item.sick = false;
        }

        // Plant effects every 5 seconds when mature enough
        if (item.isPlant && maturity > 0.4 && !item.sick) {
          item._effectT = (item._effectT || 0) + dt;
          if (item._effectT >= 5) {
            item._effectT = 0;
            const radius = 130;
            GS.fish.forEach(f => {
              if (Math.hypot(f.x - item.x, f.y - (H - 60)) < radius) {
                f.hunger = Math.min(100, f.hunger + data.feedPower * 0.3 * maturity);
                f.happy = Math.min(100, f.happy + data.moodBoost * 0.2 * maturity * ecosystemBonus);
              }
            });
            GS.clean = Math.max(0, GS.clean - data.dirtyRate * maturity * 0.15);
          }
        }

        // Coral effects every 8 seconds when mature enough
        if (!item.isPlant && maturity > 0.3) {
          item._effectT = (item._effectT || 0) + dt;
          if (item._effectT >= 8) {
            item._effectT = 0;
            GS.clean = Math.min(100, GS.clean + data.cleanRate * maturity * 0.4);
            if (data.moodBoost) {
              GS.fish.forEach(f => { f.happy = Math.min(100, f.happy + data.moodBoost * 0.1 * ecosystemBonus); });
            }
          }
        }
      });
    }

    function drawPlantsCorals(c) {
      const sandY = H - 55;
      const allFlora = [...(GS.plants || []), ...(GS.corals || [])];

      allFlora.forEach(item => {
        if (item.harvested) return;
        const data = item.isPlant ? PLANT_TYPES[item.typeId] : CORAL_TYPES[item.typeId];
        if (!data) return;
        const mat = Math.max(0, Math.min(1, item.maturity || 0));
        const bx = Math.max(22, Math.min(W - 22, item.x));
        const sz = Math.round(26 + mat * 20);          // 26–46
        const sway = item.isPlant ? Math.sin(_t * 1.4 + bx * 0.06) * (1 + mat * 5) : 0;
        const stemH = 10 + mat * 36;
        const headX = bx + sway;
        const headY = item.isPlant ? sandY - stemH - sz * 0.4
          : sandY - sz * 0.5 + 4;

        // ── main drawing ──────────────────────────────────────────────
        c.save();
        if (item.sick) c.globalAlpha = 0.55;

        if (item.isPlant) {
          const id = item.typeId;

          // ══ ANUBIAS — broad waxy heart-shaped leaves on rhizome ══════
          if (id === 'anubias') {
            // Petiole stem
            c.strokeStyle = item.sick ? '#8B4513' : '#3b6b22';
            c.lineWidth = Math.max(1.5, sz * 0.055); c.lineCap = 'round';
            c.beginPath(); c.moveTo(bx, sandY - 3);
            c.quadraticCurveTo(bx + sway * 0.4, sandY - stemH * 0.55, headX, headY + sz * 0.18);
            c.stroke();

            const leafCount = mat < 0.28 ? 1 : mat < 0.58 ? 2 : mat < 0.82 ? 3 : 5;
            const leafCfg = [
              { dx: 0, dy: 0, rot: 0.0, sc: 1.00 },
              { dx: -sz * 0.17, dy: sz * 0.08, rot: -0.62, sc: 0.82 },
              { dx: sz * 0.17, dy: sz * 0.06, rot: 0.68, sc: 0.88 },
              { dx: -sz * 0.08, dy: -sz * 0.07, rot: -1.12, sc: 0.72 },
              { dx: sz * 0.10, dy: -sz * 0.10, rot: 1.22, sc: 0.67 },
            ].slice(0, leafCount);

            leafCfg.forEach((cfg, i) => {
              const sw = Math.sin(_t * 1.1 + i * 1.8 + bx * 0.04) * 0.07 * mat;
              c.save();
              c.translate(headX + cfg.dx, headY + cfg.dy);
              c.rotate(cfg.rot + sw);
              const lw = sz * 0.37 * cfg.sc; const lh = sz * 0.54 * cfg.sc;
              const g = c.createLinearGradient(0, -lh, 0, lh * 0.35);
              g.addColorStop(0, item.sick ? '#6a7a28' : '#6ab840');
              g.addColorStop(0.55, item.sick ? '#3a5018' : '#3a8522');
              g.addColorStop(1, item.sick ? '#1e3a0e' : '#1e5c10');
              c.fillStyle = g;
              c.beginPath();
              c.moveTo(0, lh * 0.46);
              c.bezierCurveTo(-lw, lh * 0.14, -lw * 1.06, -lh * 0.26, -lw * 0.44, -lh * 0.52);
              c.bezierCurveTo(-lw * 0.10, -lh * 0.90, 0, -lh * 0.74, 0, -lh * 0.62);
              c.bezierCurveTo(0, -lh * 0.74, lw * 0.10, -lh * 0.90, lw * 0.44, -lh * 0.52);
              c.bezierCurveTo(lw * 1.06, -lh * 0.26, lw, lh * 0.14, 0, lh * 0.46);
              c.fill();
              // Midrib
              c.strokeStyle = 'rgba(255,255,255,0.28)'; c.lineWidth = Math.max(0.5, sz * 0.022);
              c.beginPath(); c.moveTo(0, -lh * 0.52); c.quadraticCurveTo(lw * 0.09, 0, 0, lh * 0.36); c.stroke();
              // Veins
              c.strokeStyle = 'rgba(255,255,255,0.13)'; c.lineWidth = Math.max(0.3, sz * 0.012);
              [[-0.30, 0.08], [0.30, 0.08], [-0.52, -0.10], [0.52, -0.10]].forEach(([vx, vy]) => {
                c.beginPath();
                c.moveTo(lw * 0.08 * Math.sign(vx), -lh * 0.15 + vy * lh);
                c.lineTo(lw * vx, vy * lh + lh * 0.22);
                c.stroke();
              });
              c.restore();
            });

            // ══ VALLISNERIA — long ribbon-like grass blades ══════════════
          } else if (id === 'vallisneria') {
            const bladeCount = mat < 0.28 ? 2 : mat < 0.60 ? 4 : 6;
            const bladeH = stemH + sz * 0.65;
            const palettes = ['#50cc32', '#38aa22', '#28980e', '#60d840', '#4ab828', '#38a418'];
            for (let i = 0; i < bladeCount; i++) {
              const phase = (i / bladeCount) * Math.PI * 2;
              const bOff = (i - (bladeCount - 1) / 2) * sz * 0.13;
              const bSway = Math.sin(_t * 1.3 + phase + bx * 0.045) * (3 + mat * 9);
              const bw = Math.max(1.2, sz * 0.058 - i * 0.3);
              const bh = bladeH * (0.60 + (i % 3) * 0.16);
              const x0 = bx + bOff; const y0 = sandY - 2;
              const x2 = x0 + bSway; const y2 = y0 - bh;
              const x1 = x0 + bSway * 0.38; const y1 = y0 - bh * 0.52;
              const col = item.sick ? '#7a8a2a' : palettes[i % palettes.length];
              const g = c.createLinearGradient(x0, y0, x2, y2);
              g.addColorStop(0, col); g.addColorStop(1, 'rgba(80,200,40,0.18)');
              c.strokeStyle = g; c.lineWidth = bw; c.lineCap = 'round';
              c.beginPath(); c.moveTo(x0, y0);
              c.bezierCurveTo(x1, y1, x2 - bSway * 0.18, y2 + bh * 0.1, x2, y2);
              c.stroke();
              // Highlight stripe
              if (mat > 0.45 && !item.sick) {
                c.strokeStyle = 'rgba(200,255,170,0.28)'; c.lineWidth = bw * 0.35;
                c.beginPath(); c.moveTo(x0 + bw * 0.18, y0);
                c.bezierCurveTo(x1 + bw * 0.18, y1, x2 + bw * 0.18, y2 + bh * 0.08, x2, y2);
                c.stroke();
              }
            }

            // ══ PISTIA / Water Lettuce — ribbed fan-shaped rosette ════════
          } else if (id === 'pistia') {
            // Short fleshy stem
            c.strokeStyle = item.sick ? '#6a7820' : '#7ab830';
            c.lineWidth = Math.max(1.8, sz * 0.055); c.lineCap = 'round';
            c.beginPath(); c.moveTo(bx, sandY - 2);
            c.quadraticCurveTo(bx + sway * 0.28, sandY - stemH * 0.5, headX, headY + sz * 0.22);
            c.stroke();

            const petalCount = mat < 0.32 ? 3 : mat < 0.65 ? 5 : 7;
            c.save(); c.translate(headX, headY);
            for (let i = 0; i < petalCount; i++) {
              const pa = (i / petalCount) * Math.PI * 2 - Math.PI * 0.5;
              const psw = Math.sin(_t * 1.0 + i * 1.5 + bx * 0.045) * 0.055 * mat;
              c.save(); c.rotate(pa + psw);
              const pw = sz * 0.21; const ph = sz * 0.50 + (mat > 0.6 ? sz * 0.09 : 0);
              const g = c.createLinearGradient(0, 0, 0, -ph);
              g.addColorStop(0, item.sick ? '#7a9228' : '#90d058');
              g.addColorStop(0.5, item.sick ? '#5a7218' : '#68b835');
              g.addColorStop(1, item.sick ? '#3a5210' : '#4a9820');
              c.fillStyle = g;
              // Fan-shaped leaf with wavy edge
              c.beginPath(); c.moveTo(0, sz * 0.04);
              c.bezierCurveTo(-pw * 0.7, -ph * 0.22, -pw * 1.08, -ph * 0.62, -pw * 0.3, -ph * 0.96);
              c.bezierCurveTo(-pw * 0.1, -ph * 1.02, 0, -ph, pw * 0.1, -ph * 1.02);
              c.bezierCurveTo(pw * 0.3, -ph * 0.96, pw * 1.08, -ph * 0.62, pw * 0.7, -ph * 0.22);
              c.bezierCurveTo(pw * 0.5, -ph * 0.08, pw * 0.2, sz * 0.04, 0, sz * 0.04);
              c.fill();
              // Parallel ribs (parallel to leaf axis)
              if (!item.sick) {
                c.strokeStyle = 'rgba(255,255,255,0.20)'; c.lineWidth = Math.max(0.3, sz * 0.016);
                for (let r = 0; r < 5; r++) {
                  const rx = (r / 4 - 0.5) * pw * 1.55;
                  c.beginPath(); c.moveTo(rx * 0.15, 0);
                  c.quadraticCurveTo(rx * 0.75, -ph * 0.5, rx * 0.25, -ph * 0.88); c.stroke();
                }
              }
              c.restore();
            }
            // Center rosette hub
            c.fillStyle = item.sick ? '#6a8218' : '#a0e050';
            c.beginPath(); c.arc(0, 0, sz * 0.07, 0, Math.PI * 2); c.fill();
            c.restore();

            // ══ CABOMBA — feathery whorled needle-leaflets ══════════════
          } else if (id === 'cabomba') {
            const nodeCount = mat < 0.28 ? 2 : mat < 0.55 ? 3 : mat < 0.82 ? 4 : 6;
            const totalH = stemH + sz * 0.42;
            const nodeSpacing = totalH / nodeCount;
            // Main stem
            c.strokeStyle = item.sick ? '#5a7820' : '#28b825';
            c.lineWidth = Math.max(1.0, sz * 0.040); c.lineCap = 'round';
            c.beginPath(); c.moveTo(bx, sandY - 2);
            for (let n = 0; n <= nodeCount; n++) {
              const ny = sandY - 2 - n * nodeSpacing;
              const nsw = sway * (n / nodeCount);
              if (n === 0) c.moveTo(bx + nsw, ny); else c.lineTo(bx + nsw, ny);
            }
            c.stroke();
            // Whorls at each node (fan of fine needles)
            for (let n = 1; n <= nodeCount; n++) {
              const ny = sandY - 2 - n * nodeSpacing;
              const nx = bx + sway * (n / nodeCount);
              const wRadius = sz * (0.18 + n * 0.045) * Math.min(1, mat * 1.8);
              const needles = n % 2 === 0 ? 8 : 6;
              const nSw = Math.sin(_t * 1.2 + n * 1.55 + bx * 0.04) * 0.12 * mat;
              c.save(); c.translate(nx, ny);
              for (let ni = 0; ni < needles; ni++) {
                const na = (ni / needles) * Math.PI * 2 + nSw;
                const len = wRadius * (0.75 + 0.28 * Math.sin(ni * 2.4));
                const ex = Math.cos(na) * len; const ey = Math.sin(na) * len;
                const g = c.createLinearGradient(0, 0, ex, ey);
                g.addColorStop(0, item.sick ? '#7a9020' : '#35d835');
                g.addColorStop(1, item.sick ? 'rgba(80,90,15,0.1)' : 'rgba(30,180,30,0.08)');
                c.strokeStyle = g; c.lineWidth = Math.max(0.6, sz * 0.030);
                c.beginPath(); c.moveTo(0, 0); c.lineTo(ex, ey); c.stroke();
              }
              // Node dot
              c.fillStyle = item.sick ? '#6a8018' : '#50e050';
              c.beginPath(); c.arc(0, 0, Math.max(1, sz * 0.045), 0, Math.PI * 2); c.fill();
              c.restore();
            }
          }

          // ════════════════════════════════════════════
          // CORALS
          // ════════════════════════════════════════════
        } else {
          const id = item.typeId;
          const pulse = 1 + Math.sin(_t * 0.9 + bx * 0.04) * 0.028;
          c.translate(headX, headY); c.scale(pulse, pulse); c.translate(-headX, -headY);

          // ══ BRAIN CORAL — dome with labyrinthine grooves ════════════
          if (id === 'brain') {
            const r = sz * 0.72;
            // Shadow ellipse
            c.fillStyle = 'rgba(0,0,0,0.16)';
            c.beginPath(); c.ellipse(headX, headY + r * 0.88, r * 0.92, r * 0.16, 0, 0, Math.PI * 2); c.fill();
            // Base (slightly flattened bottom half for 3D)
            const bg2 = c.createRadialGradient(headX, headY + r * 0.3, r * 0.05, headX, headY, r * 1.05);
            bg2.addColorStop(0, '#a87040'); bg2.addColorStop(1, '#6a3c18');
            c.fillStyle = bg2;
            c.beginPath(); c.ellipse(headX, headY + r * 0.18, r * 0.95, r * 0.25, 0, 0, Math.PI * 2); c.fill();
            // Main dome
            const dg = c.createRadialGradient(headX - r * 0.24, headY - r * 0.28, r * 0.04, headX, headY, r);
            dg.addColorStop(0, item.sick ? '#a09068' : '#e8c878');
            dg.addColorStop(0.45, item.sick ? '#907040' : '#c09040');
            dg.addColorStop(1, item.sick ? '#604020' : '#804820');
            c.fillStyle = dg;
            c.beginPath(); c.arc(headX, headY, r, Math.PI, 0); c.closePath(); c.fill();
            // Labyrinth maze grooves — clipped to dome
            if (mat > 0.18) {
              c.save();
              c.beginPath(); c.arc(headX, headY, r * 0.98, Math.PI, 0); c.closePath(); c.clip();
              c.strokeStyle = item.sick ? 'rgba(80,50,20,0.5)' : 'rgba(100,58,16,0.52)';
              c.lineWidth = Math.max(0.8, r * 0.058); c.lineCap = 'round';
              const rows = Math.floor(3 + mat * 5);
              for (let row = 0; row <= rows; row++) {
                const ry = headY - r + (row / rows) * r * 1.82;
                const amp = r * 0.17 * mat;
                c.beginPath();
                for (let px = headX - r; px <= headX + r; px += 1.5) {
                  const py = ry
                    + Math.sin((px - headX) / r * (3.5 + row * 0.28) * Math.PI + row * 1.1) * amp
                    + Math.sin((px - headX) / r * (3.5 + row * 0.28) * Math.PI * 0.68 + row) * amp * 0.38;
                  px === headX - r ? c.moveTo(px, py) : c.lineTo(px, py);
                }
                c.stroke();
              }
              c.restore();
            }
            // Specular highlight
            if (!item.sick) {
              c.fillStyle = 'rgba(255,245,200,0.20)';
              c.beginPath(); c.ellipse(headX - r * 0.22, headY - r * 0.32, r * 0.30, r * 0.14, -0.38, 0, Math.PI * 2); c.fill();
            }

            // ══ FIRE CORAL — branching warm colony with polyp tips ═══════
          } else if (id === 'fire') {
            const baseH = sz * 1.55;
            // Shadow
            c.fillStyle = 'rgba(0,0,0,0.13)';
            c.beginPath(); c.ellipse(headX, headY + baseH * 0.52, sz * 0.62, sz * 0.10, 0, 0, Math.PI * 2); c.fill();
            // Recursive branch drawing
            const drawBranch = function (x, y, angle, len, depth) {
              if (depth <= 0 || len < 2) return;
              const bSw = Math.sin(_t * 0.82 + depth * 2.1 + bx * 0.04) * 0.065 * mat;
              const ex = x + Math.sin(angle + bSw) * len;
              const ey = y - Math.cos(angle + bSw) * len;
              const thick = Math.max(1, sz * 0.062 * (depth / 4));
              const g = c.createLinearGradient(x, y, ex, ey);
              g.addColorStop(0, depth >= 3 ? (item.sick ? '#886030' : '#cc5500') : (item.sick ? '#a07820' : '#ff7020'));
              g.addColorStop(1, depth <= 1 ? (item.sick ? '#bca030' : '#ffdd00') : (item.sick ? '#986818' : '#ff9830'));
              c.strokeStyle = g; c.lineWidth = thick; c.lineCap = 'round';
              c.beginPath(); c.moveTo(x, y); c.lineTo(ex, ey); c.stroke();
              // Polyp bumps at tips
              if (depth <= 2 && mat > 0.45) {
                c.fillStyle = item.sick ? 'rgba(160,130,40,0.65)' : 'rgba(255,230,80,0.72)';
                for (let p = 0; p < 2; p++) {
                  const pf = 0.38 + p * 0.38;
                  c.beginPath();
                  c.arc(x + Math.sin(angle + bSw) * len * pf,
                    y - Math.cos(angle + bSw) * len * pf,
                    Math.max(0.9, thick * 0.75), 0, Math.PI * 2);
                  c.fill();
                }
              }
              if (depth > 1) {
                const sp = 0.38 + mat * 0.28;
                drawBranch(ex, ey, angle - sp, len * 0.64, depth - 1);
                drawBranch(ex, ey, angle + sp, len * 0.64, depth - 1);
              }
            };
            const startY = headY + baseH * 0.46;
            const maxDepth = mat < 0.3 ? 1 : mat < 0.6 ? 2 : mat < 0.85 ? 3 : 4;
            const segLen = baseH * (0.34 + mat * 0.14);
            [-0.32, 0, 0.32, -0.62].slice(0, mat < 0.4 ? 2 : mat < 0.75 ? 3 : 4).forEach(a =>
              drawBranch(headX, startY, a, segLen, maxDepth)
            );

            // ══ ACROPORA — staghorn/table coral with fine branches ════════
          } else if (id === 'acropora') {
            const baseH = sz * 1.45;
            // Shadow
            c.fillStyle = 'rgba(0,0,0,0.10)';
            c.beginPath(); c.ellipse(headX, headY + baseH * 0.52, sz * 0.65, sz * 0.09, 0, 0, Math.PI * 2); c.fill();
            const drawAcro = function (x, y, angle, len, depth) {
              if (depth <= 0 || len < 1.5) return;
              const ex = x + Math.sin(angle) * len;
              const ey = y - Math.cos(angle) * len;
              const thick = Math.max(0.8, sz * 0.042 * (depth / 5));
              const progress = 1 - depth / 5.5;
              const hue = item.sick ? (200 + progress * 30) : (278 + progress * 42);
              const sat = item.sick ? 20 : 72;
              const lit = item.sick ? (38 + progress * 18) : (44 + progress * 32);
              c.strokeStyle = `hsl(${hue},${sat}%,${lit}%)`; c.lineWidth = thick; c.lineCap = 'round';
              c.beginPath(); c.moveTo(x, y); c.lineTo(ex, ey); c.stroke();
              // Coloured tip polyp
              if (depth === 1) {
                c.fillStyle = item.sick ? `hsl(${hue + 10},25%,${lit + 14}%)` : `hsl(${hue + 18},88%,${lit + 22}%)`;
                c.beginPath(); c.arc(ex, ey, Math.max(1.2, thick * 1.3), 0, Math.PI * 2); c.fill();
              }
              if (depth > 1) {
                const sp = 0.32 + mat * 0.22;
                drawAcro(ex, ey, angle - sp, len * 0.60, depth - 1);
                drawAcro(ex, ey, angle + sp, len * 0.60, depth - 1);
                if (depth > 2 && mat > 0.55) drawAcro(ex, ey, angle, len * 0.54, depth - 1);
              }
            };
            const maxDepth = mat < 0.28 ? 2 : mat < 0.60 ? 3 : mat < 0.88 ? 4 : 5;
            const branchAngles = mat < 0.45 ? [-0.22, 0.22] : [-0.42, -0.12, 0.14, 0.44];
            branchAngles.forEach(a =>
              drawAcro(headX, headY + baseH * 0.46, a, baseH * (0.27 + mat * 0.10), maxDepth)
            );

            // ══ MUSHROOM CORAL — disc with radiating ridges and tentacles ═
          } else if (id === 'mushroom') {
            const rw = sz * 0.92; const rh = sz * 0.44;
            // Shadow
            c.fillStyle = 'rgba(0,0,0,0.14)';
            c.beginPath(); c.ellipse(headX, headY + rh * 0.62, rw * 0.88, rh * 0.22, 0, 0, Math.PI * 2); c.fill();
            // Underside (slightly visible below)
            const ug = c.createRadialGradient(headX, headY + rh * 0.12, rw * 0.04, headX, headY, rw * 0.95);
            ug.addColorStop(0, item.sick ? '#806090' : '#c080e0');
            ug.addColorStop(1, item.sick ? '#402850' : '#6028a0');
            c.fillStyle = ug;
            c.beginPath(); c.ellipse(headX, headY + rh * 0.12, rw, rh * 0.55, 0, 0, Math.PI, true); c.closePath(); c.fill();
            // Top disc face
            const dg2 = c.createRadialGradient(headX - rw * 0.22, headY - rh * 0.22, rw * 0.04, headX, headY, rw);
            dg2.addColorStop(0, item.sick ? '#b090c0' : '#e2a0ff');
            dg2.addColorStop(0.4, item.sick ? '#806098' : '#b058d8');
            dg2.addColorStop(1, item.sick ? '#503070' : '#6625a8');
            c.fillStyle = dg2;
            c.beginPath(); c.ellipse(headX, headY, rw, rh, 0, 0, Math.PI * 2); c.fill();
            // Radiating tentacle ridges
            if (mat > 0.18) {
              c.save();
              c.beginPath(); c.ellipse(headX, headY, rw * 0.98, rh * 0.98, 0, 0, Math.PI * 2); c.clip();
              const ridges = Math.floor(8 + mat * 9);
              const waveT = _t * 0.55;
              for (let r = 0; r < ridges; r++) {
                const ra = (r / ridges) * Math.PI * 2;
                const wAmp = rw * 0.065 * mat;
                c.strokeStyle = 'rgba(255,200,255,0.28)'; c.lineWidth = Math.max(0.5, sz * 0.024);
                c.beginPath();
                for (let step = 0; step <= 20; step++) {
                  const t2 = step / 20;
                  const wave = Math.sin(t2 * 10 + r * 1.3 + waveT) * wAmp * t2;
                  const rx = headX + (rw * t2 * Math.cos(ra) + wave * Math.sin(ra));
                  const ry = headY + (rh * t2 * Math.sin(ra) - wave * Math.cos(ra) * (rh / rw));
                  step === 0 ? c.moveTo(rx, ry) : c.lineTo(rx, ry);
                }
                c.stroke();
              }
              // Central disc ring
              c.strokeStyle = item.sick ? 'rgba(160,130,180,0.45)' : 'rgba(255,220,255,0.52)';
              c.lineWidth = Math.max(0.8, sz * 0.036);
              c.beginPath(); c.ellipse(headX, headY, rw * 0.16, rh * 0.16, 0, 0, Math.PI * 2); c.stroke();
              // Tentacle tips (tiny dots on edge when mature)
              if (mat > 0.6 && !item.sick) {
                c.fillStyle = 'rgba(255,240,255,0.55)';
                for (let r = 0; r < ridges; r++) {
                  const ra = (r / ridges) * Math.PI * 2;
                  c.beginPath();
                  c.arc(headX + rw * 0.88 * Math.cos(ra), headY + rh * 0.88 * Math.sin(ra),
                    Math.max(1, sz * 0.028), 0, Math.PI * 2);
                  c.fill();
                }
              }
              c.restore();
            }
            // Specular sheen
            if (!item.sick) {
              c.fillStyle = 'rgba(255,240,255,0.17)';
              c.beginPath(); c.ellipse(headX - rw * 0.22, headY - rh * 0.26, rw * 0.28, rh * 0.17, -0.32, 0, Math.PI * 2); c.fill();
            }
          }
        } // end corals

        c.globalAlpha = 1;
        c.restore(); // end main drawing save

        // ── Growth arc at sand base ─────────────────────────────────
        if (mat < 1) {
          const tempOk = getTempMultiplier(item.isPlant) > 0.85;
          const arcCol = tempOk
            ? (item.isPlant ? 'rgba(80,220,80,0.8)' : 'rgba(255,140,50,0.8)')
            : 'rgba(255,215,50,0.8)';
          c.save();
          c.strokeStyle = arcCol; c.lineWidth = 2.5; c.lineCap = 'round';
          c.beginPath();
          c.arc(bx, sandY - 4, 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * mat);
          c.stroke();
          c.restore();
        }

        // ── Sick label ───────────────────────────────────────────────
        if (item.sick) {
          c.save();
          c.font = 'bold 9px Fredoka'; c.fillStyle = '#ff4444';
          c.textAlign = 'center'; c.textBaseline = 'middle';
          c.fillText('💧 dirty water!', bx, headY - sz * 0.72);
          c.restore();
        }

        // ── Ready-to-harvest scissors ────────────────────────────────
        if (item.ready) {
          const glow = 0.55 + Math.abs(Math.sin(_t * 3.5)) * 0.45;
          c.save();
          c.globalAlpha = glow;
          if (!_LOWEND) {
            c.shadowColor = item.isPlant ? '#60ff60' : '#ffaa30';
            c.shadowBlur = 10 + Math.sin(_t * 4) * 5;
          }
          c.font = '16px serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
          c.fillText('✂️', headX, headY - sz * 0.88);
          if (!_LOWEND) c.shadowBlur = 0;
          c.fillStyle = '#ffd700'; c.font = 'bold 9px Fredoka';
          c.fillText('+' + data.harvestCoins + '🪙', headX, headY - sz * 0.88 - 14);
          c.globalAlpha = 1;
          c.restore();
        }
      }); // end forEach
    }

    function harvestFlora(x, y) {
      const sandY = H - 55;
      const allFlora = [...(GS.plants || []), ...(GS.corals || [])];
      for (let i = allFlora.length - 1; i >= 0; i--) {
        const item = allFlora[i];
        if (!item.ready || item.harvested) continue;
        const mat = Math.max(0, Math.min(1, item.maturity || 0));
        const sz = Math.round(26 + mat * 20);
        const sway = item.isPlant ? Math.sin(_t * 1.4 + item.x * 0.06) * (1 + mat * 5) : 0;
        const headX = item.x + sway;
        const headY = item.isPlant ? sandY - (10 + mat * 36) - sz * 0.4
          : sandY - sz * 0.5 + 4;
        // Generous hitbox around the emoji head
        if (Math.hypot(x - headX, y - headY) < sz * 0.8 + 10) {
          const data = item.isPlant ? PLANT_TYPES[item.typeId] : CORAL_TYPES[item.typeId];
          const reward = Math.floor(data.harvestCoins * getBoostMultiplier());
          GS.coins += reward;
          GS.stats.harvested = (GS.stats.harvested || 0) + 1;
          const arr = item.isPlant ? GS.plants : GS.corals;
          const idx = arr.indexOf(item);
          if (idx !== -1) arr.splice(idx, 1);
          notify(`${data.emoji} ${data.name} harvested! +🪙${reward}${getBoostMultiplier() > 1 ? ' ⚡2×' : ''}`, 'success');
          SFX.buy();
          spawnP(item.x, sandY, item.isPlant ? '#80ff80' : '#ff8040', 14);
          save();
          return true;
        }
      }
      return false;
    }

    // ============== RENDER ==============
    let _t = 0;
    function render() {
      const sk = SKINS.find(s => s.id === GS.skin) || SKINS[0];

      // ── Cached background gradient (rebuilt only on resize or skin change) ──
      if (_bgCache.dirty || _bgCache.skin !== GS.skin || _bgCache.W !== W || _bgCache.H !== H) {
        _bgCache.bg = ctx.createLinearGradient(0, 0, 0, H);
        _bgCache.bg.addColorStop(0, sk.bg1); _bgCache.bg.addColorStop(1, sk.bg2);
        _bgCache.sand = ctx.createLinearGradient(0, H - 55, 0, H);
        _bgCache.sand.addColorStop(0, sk.sand);
        _bgCache.sand.addColorStop(1, sk.sand === '#f1f5f9' ? '#e2e8f0' : '#c4a96a');
        _bgCache.skin = GS.skin; _bgCache.W = W; _bgCache.H = H; _bgCache.dirty = false;
      }
      ctx.fillStyle = _bgCache.bg; ctx.fillRect(0, 0, W, H);

      // Dirty water overlay
      if (GS.clean < 60) {
        ctx.fillStyle = `rgba(100,120,50,${(60 - GS.clean) / 350})`;
        ctx.fillRect(0, 0, W, H);
      }

      // Light rays — skip on low-end with many fish (fill-rate killer)
      if (!_LOWEND || GS.fish.length <= 4) drawRays(ctx);

      // Canvas bubbles only when Pixi not running
      if (!_pApp) drawB(ctx);

      // Sand bottom
      ctx.fillStyle = _bgCache.sand; ctx.fillRect(0, H - 55, W, 55);

      // Pebble texture — skip on low-end
      if (!_LOWEND) {
        ctx.fillStyle = 'rgba(0,0,0,.06)';
        for (let i = 0; i < 12; i++) {
          const px = ((i * 73 + 17) % (W - 20)) + 10;
          ctx.beginPath(); ctx.ellipse(px, H - 42, 4 + (i % 3), 2 + (i % 2), i * .4, 0, 6.283); ctx.fill();
        }
      }

      GS.decos.forEach((d, i) => drawDeco(ctx, d, i));
      drawPlantsCorals(ctx);

      // Food particles
      for (let i = 0; i < GS.food.length; i++) {
        const f = GS.food[i];
        const col = f.type === 'meat' ? '#e57373' : f.type === 'veg' ? '#81c784' : f.type === 'waste' ? '#795548' : '#ffe082';
        ctx.fillStyle = col;
        ctx.save(); ctx.translate(f.x, f.y);
        // Food glow only on non-low-end
        if (!_LOWEND && f.type !== 'waste' && f._floatOrigin !== null && f._floatOrigin !== undefined) {
          ctx.shadowColor = col; ctx.shadowBlur = 6;
        }
        if (f.type === 'waste') {
          ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(0, 0, 2.5, 0, 6.283); ctx.fill();
        } else if (f.type === 'meat') {
          ctx.beginPath(); ctx.arc(0, 0, 3.5, 0, 6.283); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.beginPath(); ctx.arc(-1, -1, 1.2, 0, 6.283); ctx.fill();
        } else if (f.type === 'veg') {
          ctx.beginPath(); ctx.moveTo(0, -3.5); ctx.lineTo(3, 2); ctx.lineTo(-3, 2); ctx.closePath(); ctx.fill();
        } else {
          ctx.beginPath(); ctx.ellipse(0, 0, 3, 2, Math.PI / 5, 0, 6.283); ctx.fill();
        }
        if (!_LOWEND) ctx.shadowBlur = 0;
        ctx.restore();
      }

      for (let i = 0; i < GS.fish.length; i++) GS.fish[i].draw(ctx);

      if (GS.fishing) {
        const hx = W / 2, hy = H * .4 + 10;
        ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(hx, 0); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.strokeStyle = '#ccc'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(hx + 5, hy + 5, 5, -Math.PI / 2, Math.PI / 2); ctx.stroke();
      }

      drawP(ctx);
    }

    // ============== GAME LOOP ==============
    let last = 0;
    let _loopPaused = false;

    // When tab goes to background RAF stops firing — reset `last` on return
    // so fish don't teleport / freeze from a huge accumulated dt
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        last = performance.now(); // reset timer, discard background time
        if (GS.started && _loopPaused) {
          _loopPaused = false;
          requestAnimationFrame(loop);
        }
      } else {
        _loopPaused = true;
        // Save and send push notifications when app goes to background
        if (GS.started) {
          save();
          if (GS.clean < 35) sendPushNotification('💧 Dirty tank!', 'Your aquarium needs urgent cleaning.');
          if (GS.fish.some(f => f.hunger < 25)) sendPushNotification('😰 Fish in danger!', 'Some fish are almost out of food.');
        }
      }
    });

    const _FRAME_MS = _LOWEND ? 33 : 16; // 30fps on low-end, 60fps otherwise
    let _lastFrameAt = 0;

    function loop(t) {
      if (!GS.started) {
        console.log('⚠️ Loop called but game not started');
        return;
      }
      if (document.hidden) {
        _loopPaused = true;
        // Don't call rAF while hidden — visibilitychange will restart the loop
        // This saves battery on Android when the app is in background
        return;
      }
      _loopPaused = false;

      // ── Adaptive FPS throttle ──
      if (t - _lastFrameAt < _FRAME_MS - 1) { requestAnimationFrame(loop); return; }
      _lastFrameAt = t;

      // Cap dt hard — guards against tab wake-up spikes
      const raw = (t - last) / 1000;
      const dt = (last === 0 || raw > 1) ? 0.016 : Math.min(raw, .04);
      last = t; _t += dt;

      // Day progression
      GS.time += dt * 1000;
      const d = Math.floor(GS.time / CFG.DAY_MS) + 1;
      if (d > GS.day) { GS.day = d; onNewDay(); }

      // Tank cleanliness decay
      if (GS.fish.length) GS.clean = Math.max(0, GS.clean - dt * (0.008 + GS.fish.length * 0.004));

      // Average hunger across all fish
      if (GS.fish.length) {
        GS.hunger = GS.fish.reduce((sum, f) => sum + f.hunger, 0) / GS.fish.length;
      } else {
        GS.hunger = 100;
      }

      // Starvation deaths (rare check)
      if (GS.fish.length > 0 && Math.random() < dt * .004) {
        const starvers = GS.fish.filter(f => f.hunger <= 0);
        if (starvers.length) {
          const dead = starvers[0];
          GS.fish = GS.fish.filter(f => f !== dead);
          GS.graveyard.push({ dna: dead.dna, lv: dead.lv, size: dead.size });
          notify('💀 A fish died of hunger!', 'danger');
          SFX.err();
        }
      }

      // Update fish - wrapped in try/catch so one bad fish never freezes the game
      for (let i = 0; i < GS.fish.length; i++) {
        try { GS.fish[i].update(dt); }
        catch (e) { console.warn('Fish update error (skipping):', e.message); }
      }

      // Food physics - floating behavior (no gravity)
      for (let i = GS.food.length - 1; i >= 0; i--) {
        const f = GS.food[i];
        if (!f) { GS.food.splice(i, 1); continue; }
        // Life countdown first - food disappears after ~60s if uneaten
        if (f.life !== undefined) {
          f.life -= dt;
          if (f.life <= 0) { GS.food.splice(i, 1); continue; }
        }
        // Initialize float properties on first frame (guard H>0)
        if (H <= 0) continue;
        if (f._floatOrigin === undefined) {
          f._floatOrigin = null;
          f._sinkSpeed = 18 + Math.random() * 12;
          f._bobPhase = Math.random() * Math.PI * 2;
          f._bobAmp = 1.5 + Math.random() * 1.5;
          f._floatTargetY = H * (0.30 + Math.random() * 0.25);
          f._driftVx = (Math.random() - 0.5) * 8;
        }
        if (f._floatOrigin === null) {
          // Gently descend to float level
          if (f.y < f._floatTargetY) {
            f.y += f._sinkSpeed * dt;
            f.x += f._driftVx * dt;
            if (f.y >= f._floatTargetY) {
              f.y = f._floatTargetY;
              f._floatOrigin = f._floatTargetY;
            }
          } else {
            f._floatOrigin = f.y;
          }
        } else {
          // Gentle bob in place
          f._bobPhase += dt * 1.2;
          f.y = f._floatOrigin + Math.sin(f._bobPhase) * f._bobAmp;
          // Very slow horizontal drift, bouncing off walls
          f.x += (f._driftVx || 0) * dt * 0.15;
          const margin = 20;
          if (f.x < margin) { f.x = margin; f._driftVx = Math.abs(f._driftVx || 1); }
          else if (f.x > W - margin) { f.x = W - margin; f._driftVx = -Math.abs(f._driftVx || 1); }
        }
      }

      // Check achievements
      checkAchievements();

      // Visitor fish countdown — fixed: use actual dt instead of hardcoded 0.016
      for (let i = GS.fish.length - 1; i >= 0; i--) {
        const f = GS.fish[i];
        if (f.isVisitor) {
          f.visitorTimer = (f.visitorTimer || 30) - dt;
          if (f.visitorTimer <= 0) {
            notify(`🌊 The ${f.dna.label()} returned to the ocean...`, 'info');
            GS.fish.splice(i, 1);
          }
        }
      }

      try {
        tickP(dt); tickB(dt); tickPlantsCorals(dt); render(); updateUI(); renderPixiLayer(dt);
      } catch (e) {
        console.warn('Render error:', e);
      }

      requestAnimationFrame(loop);
    }

    // ============== ACHIEVEMENTS ==============
    function checkAchievements() {
      ACHIEVEMENTS.forEach(a => {
        if (!GS.achievements[a.id] && a.check(GS)) {
          GS.achievements[a.id] = true;
          notify(`${a.icon} Achievement: ${a.name}!`, 'success');
        }
      });
    }

    // ============== ENCYCLOPEDIA CACHE (defined here so updateUI can use it) ==============
    let _encCache = null, _encCacheKey = '';
    function getEncyclopedia() {
      const key = GS.fish.length + '|' + GS.graveyard.length + '|' + Object.keys(GS.discovered || {}).join(',');
      if (_encCacheKey === key && _encCache) return _encCache;
      const owned = {};
      GS.fish.forEach(f => { if (f.dna && f.dna.pure) owned[f.dna.pure] = (owned[f.dna.pure] || 0) + 1; });
      GS.graveyard.forEach(g => { if (g.dna && g.dna.pure) owned[g.dna.pure] = Math.max(owned[g.dna.pure] || 0, 1); });
      if (GS.discovered) Object.keys(GS.discovered).forEach(k => {
        if (k !== 'hybrid') owned[k] = Math.max(owned[k] || 0, GS.discovered[k] || 1);
      });
      _encCache = owned; _encCacheKey = key;
      return owned;
    }

    // ============== UI UPDATE ==============
    function updateUI() {
      document.getElementById('coins').textContent = Math.floor(GS.coins);
      const pearlEl = document.getElementById('pearls');
      if (pearlEl) pearlEl.textContent = Math.floor(GS.pearls || 0);
      document.getElementById('day').textContent = GS.day;
      document.getElementById('fish-count').textContent = GS.fish.length;
      document.getElementById('level').textContent = GS.level;

      const dayProgress = (GS.time % CFG.DAY_MS) / CFG.DAY_MS;
      const hours = Math.floor(dayProgress * 24);
      const mins = Math.floor((dayProgress * 24 * 60) % 60);
      const timeEl = document.getElementById('time');
      if (timeEl) timeEl.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

      const cb = document.getElementById('clean-bar');
      if (cb) { cb.style.width = Math.max(0, Math.floor(GS.clean)) + '%'; cb.style.background = GS.clean > 60 ? '#a8d8ff' : GS.clean > 30 ? '#ffde7d' : '#ff9dc6'; }

      const hb = document.getElementById('hunger-bar');
      if (hb) { hb.style.width = Math.max(0, Math.floor(GS.hunger)) + '%'; hb.style.background = GS.hunger > 60 ? '#a8ffb8' : GS.hunger > 30 ? '#ffde7d' : '#ff9dc6'; }

      const bb = document.getElementById('btn-breed');
      if (bb) { if (GS.breeding) bb.classList.add('active'); else bb.classList.remove('active'); }

      const eb = document.getElementById('btn-edit-deco');
      if (eb) {
        eb.style.display = GS.decos.length ? 'block' : 'none';
        if (GS.editing) eb.classList.add('active'); else eb.classList.remove('active');
      }

      const fb = document.getElementById('btn-fish');
      if (fb) { if (GS.fishing) fb.classList.add('active'); else fb.classList.remove('active'); }

      const rb = document.getElementById('btn-revive');
      if (rb) {
        rb.style.background = GS.graveyard.length > 0
          ? 'linear-gradient(135deg,#ffe082,#ffca3a)'
          : 'linear-gradient(135deg,#a8ffb8,#6fdb7f)';
      }

      // Encyclopedia progress bar in top bar
      const total77 = 12 + SPECIES_BLUEPRINTS.length; // always 77
      const disc77 = Object.keys(getEncyclopedia()).filter(k => k !== 'hybrid').length;
      const pct = Math.round(disc77 / total77 * 100);
      const encBar = document.getElementById('enc-bar');
      const encPct = document.getElementById('enc-pct');
      if (encBar) encBar.style.width = pct + '%';
      if (encPct) encPct.textContent = disc77 + '/' + total77;

      // Check encyclopedia completion (one-time reward — all 77 species)
      if (disc77 >= total77 && !GS.encComplete) {
        GS.encComplete = true;
        GS.pearls = (GS.pearls || 0) + 25;
        GS.coins += 2000;
        save();
        showEncComplete();
      }

      // Temperature display
      const tempEl = document.getElementById('temp-display');
      if (tempEl) {
        const t = GS.temp || 24;
        tempEl.textContent = t.toFixed(1) + '°C';
        tempEl.style.color = t > 29 ? '#ff9dc6' : t < 21 ? '#a8d8ff' : '#a8ffb8';
      }

      // Ecosystem bonus display
      const ecoStat = document.getElementById('eco-stat');
      const ecoDisplay = document.getElementById('eco-display');
      const bonus = getEcosystemBonus ? getEcosystemBonus() : 1;
      if (ecoStat && ecoDisplay) {
        if (bonus > 1) {
          ecoStat.style.display = '';
          ecoDisplay.textContent = 'x' + bonus.toFixed(2);
          ecoDisplay.style.color = bonus >= 1.3 ? '#ffd700' : '#80ff80';
        } else {
          ecoStat.style.display = 'none';
        }
      }

      // Boost button state
      const boostBtn = document.getElementById('btn-boost');
      if (boostBtn) {
        if (_boostActive && Date.now() / 1000 < _boostTimer) {
          const rem = Math.ceil(_boostTimer - Date.now() / 1000);
          boostBtn.querySelector('span').textContent = `⚡${rem}s`;
          boostBtn.classList.add('active');
        } else {
          boostBtn.querySelector('span').textContent = '⚡ 2×';
          boostBtn.classList.remove('active');
          _boostActive = false;
        }
      }
      if (GS.clean < 20 && (GS.plants || []).some(p => !p.harvested)) {
        // Throttle: only notify once every 60s using a timestamp flag
        const now = Date.now();
        if (!GS._lastDirtyWarn || now - GS._lastDirtyWarn > 60000) {
          GS._lastDirtyWarn = now;
          notify('🥀 Water is very dirty! Your plants are getting sick.', 'danger');
        }
      }

    }

    // ============== NOTIFICATIONS ==============
    function notify(msg, type = 'info') {
      const n = document.getElementById('notifs');
      if (!n) { console.warn('[notify missing #notifs]', msg); return; }
      const div = document.createElement('div');
      div.className = `notif notif-${type}`;
      div.textContent = msg;
      n.appendChild(div);
      // Limit to max 4 simultaneous notifications to avoid stacking overflows
      const all = n.querySelectorAll('.notif');
      if (all.length > 4) all[0].remove();
      // haptic feedback per type
      if (type === 'success') HAP.light();
      else if (type === 'danger') HAP.error();
      else if (type === 'warning') HAP.medium();
      setTimeout(() => { try { div.remove(); } catch (e) { } }, 3000);
    }

    // ============== PEARL PURCHASES ==============
    function buyPearl(id) {
      SFX.wake();
      const item = PEARL_SHOP.find(i => i.id === id);
      if (!item) return;
      if ((GS.pearls || 0) < item.price) { notify('Not enough pearls!', 'warning'); SFX.err(); return; }
      GS.pearls -= item.price;
      if (item.type === 'skin') {
        GS.skin = item.sid;
        notify(`🎨 Skin ${item.name} activated!`, 'success');
      } else if (item.type === 'deco') {
        const decoMatch = DECOS.find(d => d.name === item.did);
        if (decoMatch) { GS.decos.push({ ...decoMatch }); notify(`🪸 ${item.name} placed!`, 'success'); }
      } else if (item.type === 'food') {
        GS.inv[item.fid] = (GS.inv[item.fid] || 0) + item.qty;
        notify(`${item.icon} Received ${item.name}!`, 'success');
      } else if (item.type === 'upgrade') {
        if (!GS.upgrades) GS.upgrades = {};
        GS.upgrades[item.uid] = true;
        if (item.uid === 'expand') {
          // Skip to next tier
          const currentTierIdx = TANK_TIERS.findIndex(t => t.cap === CFG.MAX_FISH);
          const nextTier = TANK_TIERS[Math.min(currentTierIdx + 1, TANK_TIERS.length - 1)];
          if (nextTier && nextTier.cap > CFG.MAX_FISH) { CFG.MAX_FISH = nextTier.cap; GS.tankTierCap = nextTier.cap; notify(`${nextTier.emoji} Tank expanded to ${nextTier.cap} slots — ${nextTier.label}!`, 'success'); }
          else notify('Already at max tier!', 'info');
        } else {
          notify(`⚡ ${item.name} activated!`, 'success');
        }
      }
      SFX.buy(); shopTab('pearls'); save();
    }

    // ============== PEARL REWARDS IN ADDXP ==============
    // Injected pearl reward into Fish.addXP — patched via wrapper:
    const _origAddXP = Fish.prototype.addXP;
    Fish.prototype.addXP = function (a) {
      const prevLv = this.lv;
      _origAddXP.call(this, a);
      if (this.lv > prevLv) {
        GS.pearls = (GS.pearls || 0) + 1;
        notify(`⬆️ ${this.dna.label()} reached level ${this.lv}! +🫧1 pearl`, 'success');
      }
    };

    // Breed reward
    function awardBreedPearl() {
      if (GS.stats.bred % 5 === 0 && GS.stats.bred > 0) {
        GS.pearls = (GS.pearls || 0) + 2;
        notify('🧬 Breeding bonus! +🫧2 pearls (every 5 offspring)', 'success');
      }
    }

    // Species discovery pearl reward — called BEFORE incrementing GS.discovered
    function awardDiscoveryPearl(specId) {
      GS.pearls = (GS.pearls || 0) + 2;
      const name = SPECIES[specId] ? SPECIES[specId].name : specId;
      notify(`📖 New species: ${name}! +🫧2 pearls`, 'success');
    }

    // ============== OFFLINE PROGRESS ==============
    function calcOfflineProgress() {
      const now = Date.now();
      const lastSeen = GS.lastSeen || now;
      const elapsedSec = Math.min((now - lastSeen) / 1000, 86400); // cap at 24h
      if (elapsedSec < 30) return; // ignore tiny gaps

      const hrs = elapsedSec / 3600;

      // Hunger decay (offline)
      GS.fish.forEach(f => {
        const decay = (0.4 + f.size * 0.008) * elapsedSec * 0.4; // 40% of real rate offline
        f.hunger = Math.max(0, (f.hunger || 80) - decay);
        if (f.hunger === 0) f.happy = Math.max(0, (f.happy || 80) - 20);
      });

      // Clean decay
      const cleanDecay = (0.008 + GS.fish.length * 0.004) * elapsedSec * 0.3;
      GS.clean = Math.max(0, GS.clean - cleanDecay);

      // Offline flora growth — plants and corals advance their maturity while away
      const fertMult = (GS.upgrades && GS.upgrades.fertilizer) ? 1.5 : 1;
      const tempOk = (GS.temp || 24) >= 24 && (GS.temp || 24) <= 30;
      const tempMult = tempOk ? 1 : 0.6;
      const floraOfflineRate = 0.5; // 50% of normal grow speed while offline
      ; (GS.plants || []).forEach(plant => {
        if (plant.ready) return;
        const pType = PLANT_TYPES[plant.typeId];
        if (!pType) return;
        plant.age = (plant.age || 0) + elapsedSec * floraOfflineRate * fertMult;
        plant.maturity = Math.min(1, plant.age / pType.growTime);
        if (plant.maturity >= 1) plant.ready = true;
      });
      ; (GS.corals || []).forEach(coral => {
        if (coral.ready) return;
        const cType = CORAL_TYPES[coral.typeId];
        if (!cType) return;
        coral.age = (coral.age || 0) + elapsedSec * floraOfflineRate * tempMult;
        coral.maturity = Math.min(1, coral.age / cType.growTime);
        if (coral.maturity >= 1) coral.ready = true;
      });

      // Offline passive income (30% of normal rate)
      const daysAway = elapsedSec / CFG.DAY_MS * 1000;
      const income = Math.floor(daysAway * GS.fish.reduce((sum, f) => {
        const rareMult = { Common: 1, Rare: 1.8, Epic: 3, Legendary: 6 }[f.dna.rarity()] || 1;
        return sum + ((f.happy || 80) * 0.18 + (f.lv || 1) * 3) * rareMult;
      }, 0));
      const cappedIncome = Math.min(income, 2000);
      GS.coins += cappedIncome;

      // Show welcome back modal
      setTimeout(() => showOfflineModal(hrs, cappedIncome), 800);
    }

    function showOfflineModal(hrs, income) {
      const hungryCount = GS.fish.filter(f => f.hunger < 40).length;
      const deadCount = GS.fish.filter(f => f.hunger === 0).length;
      const hrsStr = hrs < 1 ? `${Math.round(hrs * 60)} min` : `${hrs.toFixed(1)} hs`;

      let statusLines = [];
      if (income > 0) statusLines.push(`🪙 Your fish earned <strong>+${income} coins</strong> while you were away`);
      if (hungryCount) statusLines.push(`🍽 <strong>${hungryCount} fish</strong> are hungry — feed them!`);
      if (deadCount) statusLines.push(`💀 <strong>${deadCount} fish</strong> starved while you were gone...`);
      if (GS.clean < 50) statusLines.push(`💧 Water quality dropped to <strong>${Math.round(GS.clean)}%</strong> cleanliness`);

      const modal = document.createElement('div');
      modal.setAttribute('data-welcome-overlay', '1');
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(90,74,92,0.65);backdrop-filter:blur(8px);z-index:900;display:flex;align-items:center;justify-content:center';
      modal.innerHTML = `
    <div style="background:white;border-radius:26px;padding:28px 26px;max-width:320px;width:90%;text-align:center;box-shadow:0 16px 50px rgba(0,0,0,0.25);animation:modalSlide 0.35s ease">
      <div style="font-size:52px;margin-bottom:8px">${hungryCount > GS.fish.length / 2 ? '😰' : '🌊'}</div>
      <h2 style="font-family:Fredoka;font-size:20px;color:#ff9dc6;margin-bottom:4px">Welcome Back!</h2>
      <p style="font-size:12px;color:#8a7a8c;margin-bottom:16px">You were away for <strong>${hrsStr}</strong></p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;text-align:left">
        ${statusLines.map(l => `<div style="padding:9px 12px;background:#f8f4fc;border-radius:12px;font-size:13px;font-family:Fredoka;color:#5a4a5c">${l}</div>`).join('')}
      </div>
      ${hungryCount > 0 ? `<button onclick="var ov=this.closest('[data-welcome-overlay]');if(ov)ov.remove();feedFish();" style="width:100%;padding:13px;background:linear-gradient(135deg,#ffa8cc,#ff7eb9);border:none;border-radius:16px;font-family:Fredoka;font-size:15px;font-weight:700;color:white;cursor:pointer;margin-bottom:8px">🍽 Feed Now!</button>` : ''}
      <button onclick="var ov=this.closest('[data-welcome-overlay]');if(ov)ov.remove();" style="width:100%;padding:11px;background:#f0ecf4;border:none;border-radius:16px;font-family:Fredoka;font-size:14px;cursor:pointer;color:#8a7a8c">Continue</button>
    </div>`;
      document.body.appendChild(modal);
    }

    // ============== ENCYCLOPEDIA COMPLETE CELEBRATION ==============
    function showEncComplete() {
      const modal = document.createElement('div');
      modal.setAttribute('data-enc-overlay', '1');
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(10,5,30,0.85);backdrop-filter:blur(12px);z-index:950;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0';
      modal.innerHTML = `
    <div style="text-align:center;padding:32px 28px;max-width:340px;animation:modalSlide 0.4s ease">
      <div style="font-size:72px;margin-bottom:12px;animation:titleBounce 1.5s ease-in-out infinite">📖</div>
      <h2 style="font-family:Fredoka;font-size:26px;color:#ffd700;margin-bottom:8px;text-shadow:0 0 20px rgba(255,215,0,0.5)">ENCYCLOPEDIA COMPLETE!</h2>
      <p style="font-family:Fredoka;font-size:14px;color:rgba(255,255,255,0.8);margin-bottom:20px;line-height:1.5">You have discovered all species in the Glopbix ocean. You are a true <strong style="color:#ffd700">Ocean Master</strong>.</p>
      <div style="display:flex;gap:12px;justify-content:center;margin-bottom:24px">
        <div style="background:rgba(255,215,0,0.15);border:2px solid rgba(255,215,0,0.4);border-radius:16px;padding:14px 20px;text-align:center">
          <div style="font-size:22px;font-weight:700;color:#ffd700;font-family:Fredoka">+🪙2000</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.6)">coins</div>
        </div>
        <div style="background:rgba(168,85,247,0.15);border:2px solid rgba(168,85,247,0.4);border-radius:16px;padding:14px 20px;text-align:center">
          <div style="font-size:22px;font-weight:700;color:#c084fc;font-family:Fredoka">+🫧25</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.6)">pearls</div>
        </div>
      </div>
      <button onclick="this.closest('[data-enc-overlay]').remove()" style="width:100%;padding:14px;background:linear-gradient(135deg,#ffd700,#ffca3a);border:none;border-radius:18px;font-family:Fredoka;font-size:16px;font-weight:700;color:#333;cursor:pointer">Keep Fishing! 🐟</button>
    </div>`;

      // Add particle rain
      document.body.appendChild(modal);
      SFX.levelUp();
      for (let i = 0; i < 30; i++) setTimeout(() => spawnP(Math.random() * W, 0, '#ffd700', 3), i * 80);
    }

    // ============== PUSH NOTIFICATIONS ==============
    function requestNotifPermission() {
      if (!('Notification' in window)) return;
      if (Notification.permission === 'default') {
        setTimeout(() => {
          Notification.requestPermission().then(perm => {
            GS.notifPerm = perm === 'granted';
            if (GS.notifPerm) notify('🔔 Notifications enabled. We will alert you when your fish are hungry.', 'success');
          });
        }, 5000); // ask after 5s so it doesn't feel aggressive
      } else {
        GS.notifPerm = Notification.permission === 'granted';
      }

      // Schedule hunger notification for ~4 hours from now (real time)
      if (GS.notifPerm || Notification.permission === 'granted') {
        scheduleHungerNotif();
      }
    }

    function sendPushNotification(title, body) {
      if (!('Notification' in window)) return;
      if (Notification.permission !== 'granted') return;
      try { new Notification(title, { body, icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐠</text></svg>' }); }
      catch (e) { }
    }

    function scheduleHungerNotif() {
      const avgHunger = GS.fish.length ? GS.fish.reduce((s, f) => s + f.hunger, 0) / GS.fish.length : 100;
      const msToHungry = Math.max(60000, (avgHunger / 100) * 3.5 * 3600000); // estimate time to reach 0
      setTimeout(() => {
        if (document.hidden) {
          sendPushNotification('🍽 Your fish are hungry!', 'Return to Glopbix and feed them before it is too late.');
        }
        scheduleHungerNotif(); // reschedule
      }, msToHungry);
    }

    // Page visibility: send "dirty tank" notif when leaving if tank is bad
    function setMusicVol(v) {
      SFX.setVol('mus', v / 100);
      GS.musicVol = v;
      try { localStorage.setItem('glopbix_musicVol', v); } catch (e) { }
    }
    function setSFXVol(v) {
      SFX.setVol('sfx', v / 100);
      GS.sfxVol = v;
      try { localStorage.setItem('glopbix_sfxVol', v); } catch (e) { }
    }
    function loadVolumeSettings() {
      try {
        const mv = localStorage.getItem('glopbix_musicVol');
        const sv = localStorage.getItem('glopbix_sfxVol');
        if (mv !== null) { SFX.setVol('mus', mv / 100); }
        if (sv !== null) { SFX.setVol('sfx', sv / 100); }
        // Update sliders once settings modal is opened
        const musicSlider = document.querySelector('#settings-modal input[oninput*="MusicVol"]');
        const sfxSlider = document.querySelector('#settings-modal input[oninput*="SFXVol"]');
        if (musicSlider && mv !== null) musicSlider.value = mv;
        if (sfxSlider && sv !== null) sfxSlider.value = sv;
      } catch (e) { }
    }
    function openSettings() {
      document.getElementById('settings-modal').classList.add('active');
      // Sync temp slider
      const slider = document.querySelector('#temp-slider-item input[type=range]');
      const valEl = document.getElementById('temp-slider-val');
      const descEl = document.getElementById('temp-slider-desc');
      if (slider) {
        slider.value = (GS.temp || 24);
        slider.disabled = !!(GS.upgrades && GS.upgrades.tempctrl);
      }
      if (valEl) valEl.textContent = (GS.temp || 24).toFixed(1) + '°C';
      if (descEl) descEl.textContent = (GS.upgrades && GS.upgrades.tempctrl)
        ? '🔒 Controlled by Temperature Control upgrade (optimal)' : 'Drag to adjust tank temperature';
    }
    function closeSettings() { document.getElementById('settings-modal').classList.remove('active'); }

    // ============== INSTRUCTIONS ==============
    function showInstructions() { document.getElementById('instructions-modal').classList.add('active'); }
    function closeInstructions() { document.getElementById('instructions-modal').classList.remove('active'); }

    // ============== ACHIEVEMENTS MODAL ==============
    function openAchievements() {
      let h = `
    <div style="display:flex;gap:8px;margin-bottom:16px;justify-content:center">
      <button onclick="closeAchievements();openEncyclopedia()" style="flex:1;padding:12px;background:linear-gradient(135deg,#667eea,#764ba2);border:none;border-radius:16px;font-family:Fredoka;font-size:14px;font-weight:700;color:white;cursor:pointer">
        📖 Fish Encyclopedia<br><span style="font-size:11px;opacity:0.8">View collection progress</span>
      </button>
    </div>
    <h3 style="margin-bottom:12px;color:var(--accent-pink)">🏆 Achievements</h3>`;
      ACHIEVEMENTS.forEach(a => {
        const unlocked = GS.achievements[a.id];
        h += `<div class="achievement ${unlocked ? 'unlocked' : ''}">
      <div style="font-size:24px;min-width:32px;text-align:center">${a.icon}</div>
      <div class="ach-info">
        <div class="ach-name">${a.name} ${unlocked ? '✓' : ''}</div>
        <div class="ach-desc">${a.desc}</div>
      </div>
    </div>`;
      });

      // Stats section
      h += `<h3 style="margin:16px 0 10px;color:var(--accent-pink)">📊 Stats</h3>`;
      h += `<div class="info-row"><span>Fish Fed</span><span>${GS.stats.fed}</span></div>`;
      h += `<div class="info-row"><span>Tank Cleaned</span><span>${GS.stats.cleaned}</span></div>`;
      h += `<div class="info-row"><span>Fish Bred</span><span>${GS.stats.bred}</span></div>`;
      h += `<div class="info-row"><span>Fish Caught</span><span>${GS.stats.caught}</span></div>`;
      h += `<div class="info-row"><span>Plants Harvested</span><span>${GS.stats.harvested || 0}</span></div>`;
      h += `<div class="info-row"><span>Days Survived</span><span>${GS.day}</span></div>`;
      h += `<div class="info-row"><span>Player Level</span><span>${GS.level}</span></div>`;
      h += `<div class="info-row"><span>XP</span><span>${GS.xp} / ${GS.level * 100}</span></div>`;

      // Flora summary
      const floraTotal = (GS.plants || []).length + (GS.corals || []).length;
      const floraReady = (GS.plants || []).filter(p => p.ready).length + (GS.corals || []).filter(c => c.ready).length;
      const ecoBonus = getEcosystemBonus ? getEcosystemBonus() : 1;
      if (floraTotal > 0) {
        h += `<h3 style="margin:16px 0 10px;color:var(--accent-green)">🌿 Aquarium Flora</h3>`;
        h += `<div class="info-row"><span>Active plants</span><span>${(GS.plants || []).length}</span></div>`;
        h += `<div class="info-row"><span>Active corals</span><span>${(GS.corals || []).length}</span></div>`;
        h += `<div class="info-row"><span>Ready to harvest</span><span>${floraReady}</span></div>`;
        h += `<div class="info-row"><span>Water temperature</span><span style="color:${(GS.temp || 24) > 29 ? '#ff9dc6' : (GS.temp || 24) < 21 ? '#a8d8ff' : '#a8ffb8'}">${(GS.temp || 24).toFixed(1)}°C</span></div>`;
        h += `<div class="info-row"><span>Ecosystem bonus</span><span style="color:${ecoBonus > 1.2 ? '#ffd700' : '#80ff80'}">x${ecoBonus.toFixed(2)}</span></div>`;
      }

      document.getElementById('ach-content').innerHTML = h;
      document.getElementById('ach-modal').classList.add('active');
    }
    function closeAchievements() { document.getElementById('ach-modal').classList.remove('active'); }

    // ============== DECO EDITING ==============
    function toggleEditDeco() {
      GS.editing = !GS.editing;
      notify(GS.editing ? '✋ Drag decorations to move' : '✅ Editing saved', 'info');
    }

    // ============== CANVAS INTERACTIONS ==============
    function setupClick() {
      cv.addEventListener('mousedown', e => { handleDrag(e, 'down'); });
      cv.addEventListener('mousemove', e => { handleDrag(e, 'move'); });
      cv.addEventListener('mouseup', e => { handleDrag(e, 'up'); });
      cv.addEventListener('touchstart', e => { handleDrag(e.touches[0], 'down'); e.preventDefault(); }, { passive: false });
      cv.addEventListener('touchmove', e => { handleDrag(e.touches[0], 'move'); e.preventDefault(); }, { passive: false });
      cv.addEventListener('touchend', e => { handleDrag(e.changedTouches[0] || e, 'up'); e.preventDefault(); }, { passive: false });
    }

    function handleDrag(e, type) {
      const r = cv.getBoundingClientRect();
      const x = e.clientX !== undefined ? (e.clientX - r.left) * (W / r.width) : 0;
      const y = e.clientY !== undefined ? (e.clientY - r.top) * (H / r.height) : 0;

      if (GS.editing) {
        if (type === 'down') {
          for (let i = GS.decos.length - 1; i >= 0; i--) {
            const d = GS.decos[i];
            const dx = d.x || (30 + (i * 80) % (W - 60));
            if (Math.hypot(x - dx, y - (H - 42)) < 35 * (d.sz || 1)) {
              GS.dragDeco = d; SFX.pop(); return;
            }
          }
        } else if (type === 'move' && GS.dragDeco) {
          GS.dragDeco.x = Math.max(20, Math.min(W - 20, x));
        } else if (type === 'up') {
          GS.dragDeco = null;
        }
        return;
      }

      if (type === 'down') {
        // Fishing tap
        if (GS.fishPhase === 'bite') {
          catchFish(); return;
        }
        // Harvest plants/corals
        if (harvestFlora(x, y)) return;
        // Fish click
        for (let i = GS.fish.length - 1; i >= 0; i--) {
          const f = GS.fish[i];
          if (Math.hypot(f.x - x, f.y - y) < f.size * 1.4) {
            SFX.wake();
            if (GS.breeding) {
              if (GS.breedParents.includes(f)) GS.breedParents = GS.breedParents.filter(p => p !== f);
              else { if (GS.breedParents.length < 2) GS.breedParents.push(f); if (GS.breedParents.length === 2) doBreed(); }
              SFX.pop(); return;
            }
            showFI(f); return;
          }
        }
      }
    }

    // ============== ACTIONS ==============
    function feedFish() {
      SFX.wake();
      const avail = Object.keys(FOOD).filter(k => k !== 'waste' && (GS.inv[k] || 0) > 0);
      if (avail.length === 0) { notify('🍽 No food! Buy some in the shop.', 'warning'); SFX.err(); return; }
      // Always show the picker popup for a clear, deliberate choice
      showFoodPicker();
    }

    function doFeed(k) {
      if (GS.inv[k] > 0) {
        GS.inv[k]--;
        const foodType = FOOD[k] ? FOOD[k].type : 'basic';
        // Scatter food across tank width; if hungry fish exist, drop more food near them
        const hungryFish = GS.fish.filter(f => f.hunger < 50);
        for (let i = 0; i < 6; i++) {
          let fx;
          if (hungryFish.length && i < 3) {
            // Some pellets fall near hungry fish x-positions
            const target = hungryFish[i % hungryFish.length];
            fx = Math.max(20, Math.min(W - 20, target.x + (Math.random() - 0.5) * 60));
          } else {
            fx = 20 + Math.random() * (W - 40);
          }
          GS.food.push({ x: fx, y: 5, type: foodType, life: 60 });
        }
        GS.stats.fed++;
        notify(`🍽 Fed ${FOOD[k] ? FOOD[k].name : k}!`, 'success');
        SFX.feed();
      }
    }

    function showFoodPicker() {
      const FOOD_ICONS = { basic: '🐟', premium: '🎯', meat: '🥩', veg: '🥦', waste: '💩' };
      const FOOD_COLORS = { basic: '#ffe082', premium: '#a8d8ff', meat: '#ef9a9a', veg: '#a8ffb8', waste: '#bcaaa4' };

      let h = `<p style="font-size:12px;color:var(--text-light);margin-bottom:14px;text-align:center">Choose food to scatter in the tank</p>`;

      const avail = Object.keys(FOOD).filter(k => k !== 'waste' && (GS.inv[k] || 0) > 0);

      avail.forEach(k => {
        const f = FOOD[k];
        const icon = FOOD_ICONS[f.type] || '🍽';
        const color = FOOD_COLORS[f.type] || '#ffe082';
        h += `
      <div onclick="doFeed('${k}');closeFoodPicker()" style="
        display:flex; align-items:center; gap:14px; padding:14px 16px;
        border-radius:18px; background:rgba(255,255,255,.55);
        border:2px solid ${color}; margin-bottom:10px; cursor:pointer;
        transition:all .2s ease; box-shadow:0 3px 12px rgba(0,0,0,.07);
      " onmouseenter="this.style.transform='scale(1.02)'" onmouseleave="this.style.transform='scale(1)'">
        <div style="font-size:32px;min-width:40px;text-align:center">${icon}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:15px;color:var(--text-dark)">${f.name}</div>
          <div style="font-size:12px;color:var(--text-light);margin-top:2px">Fills <b style="color:var(--accent-pink)">${f.power}</b> hunger · In stock: <b>${GS.inv[k]}</b></div>
        </div>
        <div style="
          background:${color}; border-radius:12px; padding:6px 12px;
          font-weight:700; font-size:13px; color:var(--text-dark); white-space:nowrap;
        ">Feed</div>
      </div>`;
      });

      // If no food available at all
      if (avail.length === 0) {
        h += `<div style="text-align:center;padding:20px;color:var(--text-light)">
      <div style="font-size:40px">😢</div>
      <p style="margin-top:8px">No food in stock! Buy some in the Shop.</p>
    </div>`;
      }

      document.getElementById('food-content').innerHTML = h;
      document.getElementById('food-modal').classList.add('active');
    }
    function closeFoodPicker() { document.getElementById('food-modal').classList.remove('active'); }

    function cleanTank() {
      SFX.wake(); HAP.medium();
      if (GS.clean >= 95) { notify('💧 Tank is already clean!', 'info'); return; }
      GS.clean = Math.min(100, GS.clean + 40);
      GS.stats.cleaned++;
      // Remove waste food
      GS.food = GS.food.filter(f => f.type !== 'waste');
      notify('💧 Tank cleaned!', 'success');
      SFX.clean();
      spawnP(W / 2, H / 2, '#a8d8ff', 15);
    }

    function breedFish() {
      SFX.wake();
      if (GS.breeding) {
        GS.breeding = false; GS.breedParents = [];
        notify('Breeding cancelled', 'info');
      } else {
        if (GS.fish.length < 2) { notify('Need at least 2 fish to breed!', 'warning'); SFX.err(); return; }
        if (GS.coins < CFG.BREED_COST) { notify(`Need ${CFG.BREED_COST} coins to breed!`, 'warning'); SFX.err(); return; }
        if (GS.fish.length >= CFG.MAX_FISH) { notify('Tank is full! Max ' + CFG.MAX_FISH + ' fish.', 'warning'); SFX.err(); return; }
        GS.breeding = true;
        notify(`💕 Tap 2 fish to breed! (${CFG.BREED_COST} coins)`, 'info');
      }
    }

    function doBreed() {
      HAP.success();
      GS.coins -= CFG.BREED_COST;
      const b = new Fish(new DNA(GS.breedParents[0].dna, GS.breedParents[1].dna));
      b.size = 10; b.x = W / 2; b.y = H / 2;
      GS.fish.push(b);
      GS.breeding = false; GS.breedParents = [];
      GS.stats.bred++;
      awardBreedPearl();
      // Track hybrid in encyclopedia
      if (!GS.discovered) GS.discovered = {};
      GS.discovered['hybrid'] = (GS.discovered['hybrid'] || 0) + 1;
      notify('🐣 Baby fish born! ' + b.dna.label(), 'success');
      SFX.breed();
      spawnP(b.x, b.y, '#ff4081', 20);
    }

    function toggleFishing() {
      SFX.wake();
      if (GS.fishing) {
        GS.fishing = false; GS.fishPhase = '';
        const msg = document.getElementById('fishing-msg');
        if (msg) { msg.classList.remove('active'); msg.style.borderColor = ''; }
        notify('Fishing cancelled', 'info');
      } else {
        if (GS.fish.length < 1) { notify('You need at least 1 fish!', 'warning'); SFX.err(); return; }
        GS.fishing = true; GS.fishPhase = 'waiting';
        SFX.cast();
        const msg = document.getElementById('fishing-msg');
        if (msg) { msg.classList.add('active'); msg.textContent = '🎣 Waiting for a bite...'; msg.style.borderColor = ''; msg.onclick = null; }
        notify('🎣 Fishing...', 'info');
        const delay = 2500 + Math.random() * 4000;
        setTimeout(() => {
          if (!GS.fishing) return;
          GS.fishTarget = GS.fish[Math.floor(Math.random() * GS.fish.length)];
          GS.fishPhase = 'bite';
          SFX.bite();
          if (msg) { msg.textContent = '⚡ TAP NOW!'; msg.style.borderColor = 'red'; msg.onclick = catchFish; }
          // Auto-miss after 1.2s
          setTimeout(() => {
            if (GS.fishPhase === 'bite') {
              GS.fishing = false; GS.fishPhase = '';
              if (msg) { msg.classList.remove('active'); msg.style.borderColor = ''; }
              notify('🐟 The fish got away!', 'warning');
            }
          }, 1200);
        }, delay);
      }
    }

    function catchFish() {
      if (GS.fishPhase !== 'bite' || !GS.fishTarget) return;
      HAP.heavy();
      const fish = GS.fishTarget;
      fish.caught = true;
      GS.fishPhase = 'reeling';
      const msg = document.getElementById('fishing-msg');
      if (msg) { msg.textContent = '🎉 Got one!'; msg.style.borderColor = ''; msg.onclick = null; }
      SFX.caught();

      setTimeout(() => {
        const val = Math.floor(fish.getValue() * CFG.CATCH_MULT * getBoostMultiplier());
        GS.coins += val;
        GS.fish = GS.fish.filter(f => f !== fish);
        GS.stats.caught++;
        GS.fishing = false; GS.fishPhase = '';
        if (msg) msg.classList.remove('active');
        const boostMult = getBoostMultiplier();
        notify(`🪙 Sold ${fish.dna.label()} for ${val} coins!${boostMult > 1 ? ' ⚡2× BOOST!' : ''}`, 'success');
        spawnP(W / 2, H * .3, '#ffd700', 20);
      }, 800);
    }

    // ============== SHOP ==============
    function openShop() { document.getElementById('shop-modal').classList.add('active'); shopTab('fish'); }
    function closeShop() { document.getElementById('shop-modal').classList.remove('active'); }

    // ══════════════════ SCIENCE / ENCYCLOPEDIA ══════════════════
    const CONSERVATION_COLORS = {
      'Least Concern (LC)': '#4caf50', 'Vulnerable (VU)': '#ff9800',
      'Endangered (EN)': '#f44336', 'Critically Endangered (CR)': '#9c27b0'
    };
    const FISH_EMOJIS_SCI = { goldfish: '🐠', guppy: '🐟', neon: '🐡', betta: '🐠', clown: '🐠', angel: '🐟', pleco: '🐟', shark: '🦈', axolotl: '🦎', turtle: '🐢', jelly: '🪼', star: '⭐' };

    let _sciTab = 'fish';
    function openScience() {
      document.getElementById('science-modal').classList.add('active');
      renderScienceBody(_sciTab);
    }
    function closeScience() { document.getElementById('science-modal').classList.remove('active'); }
    function sciTab(t) {
      _sciTab = t;
      document.querySelectorAll('.sci-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.sci-tab').forEach(b => { if (b.textContent.toLowerCase().includes(t === 'fish' ? 'fish' : t === 'plants' ? 'plant' : t === 'corals' ? 'coral' : t === 'decos' ? 'decor' : 'life')) b.classList.add('active'); });
      renderScienceBody(t);
    }

    function renderScienceBody(tab) {
      const body = document.getElementById('science-body');
      if (!body) return;
      let items = [];

      if (tab === 'fish' || tab === 'all') {
        const presentSpecies = [...new Set((GS.fish || []).filter(f => f.dna?.pure && SPECIES[f.dna.pure]).map(f => f.dna.pure))];
        if (presentSpecies.length === 0 && tab === 'fish') {
          body.innerHTML = `<div class="sci-empty">🐟 No fish in your tank yet!<br>Buy some from the Shop to see their science cards.</div>`; return;
        }
        presentSpecies.forEach(sp => items.push({ type: 'fish', id: sp }));
      }
      if (tab === 'plants' || tab === 'all') {
        const pts = [...new Set((GS.plants || []).map(p => p.type))];
        pts.forEach(t => items.push({ type: 'plant', id: t }));
      }
      if (tab === 'corals' || tab === 'all') {
        const cts = [...new Set((GS.corals || []).map(c => c.type))];
        cts.forEach(t => items.push({ type: 'coral', id: t }));
      }
      if (tab === 'decos' || tab === 'all') {
        const dts = [...new Set((GS.decos || []).map(d => d.name))];
        dts.forEach(n => items.push({ type: 'deco', id: n }));
      }

      if (items.length === 0) {
        body.innerHTML = `<div class="sci-empty">🌊 Nothing here yet!<br>Add some life to your aquarium first.</div>`; return;
      }

      let html = '';
      items.forEach(item => {
        if (item.type === 'fish') {
          const sp = SPECIES[item.id], sci = SCIENCE_DATA[item.id];
          if (!sp) return;
          const emoji = FISH_EMOJIS_SCI[item.id] || '🐟';
          const consColor = sci ? (CONSERVATION_COLORS[sci.conservation] || '#aaa') : '#aaa';
          html += `<div class="sci-card" id="sci-card-${item.id}">
        <div class="sci-card-header">
          <span class="sci-emoji">${emoji}</span>
          <div>
            <div class="sci-card-name">${sp.name}</div>
            <div class="sci-card-latin">${sci?.latin || 'Species data loading...'}</div>
          </div>
          ${sci ? `<span class="sci-conservation" style="margin-left:auto;background:${consColor}22;color:${consColor};border:1px solid ${consColor}44;font-size:9px">${sci.conservation}</span>` : ''}
        </div>
        ${sci ? `
        <div class="sci-grid">
          <div class="sci-field"><div class="sci-field-label">Family</div><div class="sci-field-val">${sci.family}</div></div>
          <div class="sci-field"><div class="sci-field-label">Origin</div><div class="sci-field-val">${sci.origin}</div></div>
          <div class="sci-field"><div class="sci-field-label">Diet</div><div class="sci-field-val">${sci.diet}</div></div>
          <div class="sci-field"><div class="sci-field-label">Lifespan</div><div class="sci-field-val">${sci.lifespan}</div></div>
          <div class="sci-field" style="grid-column:1/-1"><div class="sci-field-label">Natural Habitat</div><div class="sci-field-val">${sci.habitat}</div></div>
        </div>
        <div class="sci-funfact">💡 <b>Fun fact:</b> ${sci.funFact}</div>
        `: ''}
        <button class="sci-btn-ai" id="sci-ai-btn-${item.id}" onclick="sciAskClaude('${item.id}','${sp.name}','fish')">
          🤖 Preguntarle a Claude sobre ${sp.name}
        </button>
        <div id="sci-ai-resp-${item.id}"></div>
      </div>`;
        } else if (item.type === 'plant') {
          const PLANT_NAMES = { java_fern: 'Java Fern', anubias: 'Anubias', amazon_sword: 'Amazon Sword', hornwort: 'Hornwort', vallisneria: 'Vallisneria', dwarf_hair: 'Dwarf Hair Grass', moss_ball: 'Moss Ball', water_lily: 'Water Lily' };
          const name = PLANT_NAMES[item.id] || item.id;
          html += `<div class="sci-card" id="sci-card-plant-${item.id}">
        <div class="sci-card-header"><span class="sci-emoji">🌿</span><div><div class="sci-card-name">${name}</div><div class="sci-card-latin">Aquatic plant — ${item.id}</div></div></div>
        <button class="sci-btn-ai" onclick="sciAskClaude('${item.id}','${name}','plant')">🤖 Claude: info científica sobre ${name}</button>
        <div id="sci-ai-resp-plant-${item.id}"></div>
      </div>`;
        } else if (item.type === 'coral') {
          const CORAL_NAMES = { staghorn: 'Staghorn Coral', brain: 'Brain Coral', mushroom: 'Mushroom Coral', torch: 'Torch Coral', frog_spawn: 'Frog Spawn', hammer: 'Hammer Coral', bubble: 'Bubble Coral', plate: 'Plate Coral' };
          const name = CORAL_NAMES[item.id] || item.id;
          html += `<div class="sci-card" id="sci-card-coral-${item.id}">
        <div class="sci-card-header"><span class="sci-emoji">🪸</span><div><div class="sci-card-name">${name}</div><div class="sci-card-latin">Coral polyp colony</div></div></div>
        <button class="sci-btn-ai" onclick="sciAskClaude('${item.id}','${name}','coral')">🤖 Claude: info científica sobre ${name}</button>
        <div id="sci-ai-resp-coral-${item.id}"></div>
      </div>`;
        } else if (item.type === 'deco') {
          html += `<div class="sci-card">
        <div class="sci-card-header"><span class="sci-emoji">🪸</span><div><div class="sci-card-name">${item.id}</div><div class="sci-card-latin">Aquarium decoration</div></div></div>
        <button class="sci-btn-ai" onclick="sciAskClaude('${item.id}','${item.id}','decoration')">🤖 Claude: curiosidades sobre ${item.id}</button>
        <div id="sci-ai-resp-deco-${item.id.replace(/\s/g, '_')}"></div>
      </div>`;
        }
      });
      body.innerHTML = html;
    }

    async function sciAskClaude(id, name, type) {
      const btnId = `sci-ai-btn-${type === 'fish' ? '' : type + '-'}${id}`;
      const respId = `sci-ai-resp-${type === 'fish' ? '' : type + '-'}${id}`;
      const btn = document.getElementById(btnId) || document.querySelector(`[onclick*="sciAskClaude('${id}'"]`);
      const respDiv = document.getElementById(respId);
      if (!respDiv) return;
      if (btn) { btn.disabled = true; btn.textContent = '⏳ Consultando a Claude...'; }
      respDiv.innerHTML = '';

      const sci = SCIENCE_DATA[id];
      let prompt = '';
      if (type === 'fish') {
        const sp = SPECIES[id];
        const tankContext = `The player has ${(GS.fish || []).filter(f => f.dna?.pure === id).length} ${name}(s) in their virtual aquarium at ${(GS.temp || 24).toFixed(1)}°C.`;
        prompt = `You are a marine biologist and naturalist. Give me a rich, engaging 3-4 sentence scientific profile of the ${name} (${sci?.latin || name}). ${tankContext} Include: its natural habitat and behavior, a fascinating biological adaptation or fact, and a care tip relevant to its current tank temperature. Write in a warm, David Attenborough style. Respond in English.`;
      } else if (type === 'plant') {
        prompt = `You are an aquatic botanist. Give me a 3-4 sentence scientific profile of the aquarium plant "${name}". Include its natural habitat, scientific classification, ecological role in aquariums, and an interesting biological fact. Respond in English.`;
      } else if (type === 'coral') {
        prompt = `You are a marine biologist specializing in coral reef ecosystems. Give me a 3-4 sentence scientific profile of "${name}" coral. Include its taxonomy, natural reef habitat, symbiotic relationship with zooxanthellae, and its conservation status. Respond in English.`;
      } else {
        prompt = `Give me 2-3 interesting historical, cultural, or scientific facts about "${name}" as it relates to real ocean environments or marine exploration. Keep it fun and educational. Respond in English.`;
      }

      try {
        const text = await callGemini(prompt, null, 400);
        respDiv.innerHTML = `<div class="sci-ai-response">🤖 <b>Gemini says:</b><br>${text || 'No information available.'}</div>`;
        if (btn) { btn.textContent = '✅ AI response'; }
      } catch (e) {
        respDiv.innerHTML = `<div class="sci-ai-response" style="color:#ff9dc6">❌ No connection to AI. Check your network.</div>`;
        if (btn) { btn.disabled = false; btn.textContent = '🔄 Try again'; }
      }
    }

    function shopTab(t) {
      GS.tab = t;
      document.querySelectorAll('.shop-tab').forEach(b => { b.classList.toggle('active', b.dataset.tab === t); });
      let h = '';

      if (t === 'fish') {
        const canBuy = GS.fish.length < CFG.MAX_FISH;
        const unlockedBpIds = new Set(SPECIES_BLUEPRINTS.filter(bp => isSpeciesUnlocked(bp)).map(b => b.id));

        h += `<p style="font-size:12px;color:var(--text-light);margin-bottom:10px">🐟 ${Object.keys(SPECIES).length}/77 species generated · Level up to unlock more!</p>`;

        // ── Section: Starter / Classic species (hardcoded 12) ──
        h += `<div style="font-family:Fredoka;font-size:12px;font-weight:700;color:var(--accent-blue);margin:8px 0 4px;letter-spacing:.5px">⚓ CLASSIC SPECIES</div>`;
        Object.entries(SPECIES).filter(([k]) => !k.startsWith('ai_')).forEach(([k, s]) => {
          const owned = (GS.discovered && GS.discovered[k]) ? `<span style="color:#a8ffb8;font-size:10px">Owned ✓</span>` : '';
          const emoji = SPEC_EMOJIS[k] || '🐟';
          h += `<div class="shop-item">
        <div class="info">
          <div style="font-size:28px;min-width:36px;text-align:center;line-height:36px">${emoji}</div>
          <div class="details">
            <div class="name" style="display:flex;align-items:center;gap:6px">${s.name} ${owned}
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:hsl(${s.hue},80%,55%);border:1.5px solid rgba(0,0,0,0.15)"></span>
            </div>
            <div class="desc">${s.desc || 'Great addition to your tank!'}</div>
          </div>
        </div>
        <button class="shop-buy" onclick="buy('fish','${k}')" ${!canBuy ? 'disabled title="Tank full"' : ''}>
          ${s.price === 0 ? '<span style="color:#a8ffb8;font-weight:700">Free!</span>' : coinSVG() + s.price}
        </button>
      </div>`;
        });

        // ── Section: AI species (unlocked and generated) ──
        const generatedAI = SPECIES_BLUEPRINTS.filter(bp => isSpeciesUnlocked(bp) && SPECIES[bp.id]);
        if (generatedAI.length > 0) {
          h += `<div style="font-family:Fredoka;font-size:12px;font-weight:700;color:#a8ffb8;margin:12px 0 4px;letter-spacing:.5px">🧬 AI-GENERATED SPECIES (${generatedAI.length})</div>`;
          generatedAI.forEach(bp => {
            const s = SPECIES[bp.id];
            const owned = (GS.discovered && GS.discovered[bp.id]) ? `<span style="color:#a8ffb8;font-size:10px">Owned ✓</span>` : '';
            const isFallback = s._fallback ? ` <span style="font-size:9px;color:rgba(255,157,198,0.6)" title="Generated offline">⚙️</span>` : '';
            h += `<div class="shop-item">
          <div class="info">
            <div style="font-size:28px;min-width:36px;text-align:center;line-height:36px">${bp.emoji}</div>
            <div class="details">
              <div class="name" style="display:flex;align-items:center;gap:6px">${s.name} ${owned}${isFallback}
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:hsl(${s.hue},80%,55%);border:1.5px solid rgba(0,0,0,0.15)"></span>
              </div>
              <div class="desc">${s.desc}</div>
              <div class="desc" style="margin-top:2px;color:rgba(168,216,255,0.6);font-size:10px">🌡️ ${s.optTempLow}–${s.optTempHigh}°C · 🍽 ${s.food}</div>
            </div>
          </div>
          <button class="shop-buy" onclick="buy('fish','${bp.id}')" ${!canBuy ? 'disabled title="Tank full"' : ''}>
            ${coinSVG()} ${s.price}
          </button>
        </div>`;
          });
        }

        // ── Generating now (pending) ──
        const pendingBps = SPECIES_BLUEPRINTS.filter(bp => GS.aiSpeciesPending[bp.id]);
        if (pendingBps.length > 0) {
          h += `<div style="font-family:Fredoka;font-size:12px;font-weight:700;color:#ffde7d;margin:12px 0 4px;letter-spacing:.5px">⏳ GENERATING…</div>`;
          pendingBps.forEach(bp => {
            h += `<div class="shop-item" style="opacity:0.7">
          <div class="info">
            <div style="font-size:28px;min-width:36px;text-align:center;line-height:36px">${bp.emoji}</div>
            <div class="details">
              <div class="name">${bp.name} <span style="color:#ffde7d;font-size:10px">⏳ AI is generating…</span></div>
              <div class="desc">Please wait a moment!</div>
            </div>
          </div>
          <button class="shop-buy" disabled>⏳</button>
        </div>`;
          });
        }

        // ── Unlocked but not yet generated (rare edge case) ──
        const unlockedNotGenerated = SPECIES_BLUEPRINTS.filter(bp =>
          isSpeciesUnlocked(bp) && !SPECIES[bp.id] && !GS.aiSpeciesPending[bp.id]
        );
        unlockedNotGenerated.forEach(bp => {
          h += `<div class="shop-item" style="opacity:0.8">
        <div class="info">
          <div style="font-size:28px;min-width:36px;text-align:center;line-height:36px">${bp.emoji}</div>
          <div class="details">
            <div class="name">${bp.name} <span style="color:#c9a8ff;font-size:10px">✨ New unlock!</span></div>
            <div class="desc">Tap to start AI generation</div>
          </div>
        </div>
        <button class="shop-buy" onclick="generateAISpecies(getBlueprint('${bp.id}'));shopTab('fish')">🧬 Generate</button>
      </div>`;
        });

        // ── Coming soon section ──
        const upcoming = SPECIES_BLUEPRINTS.filter(bp => !isSpeciesUnlocked(bp))
          .sort((a, b) => a.unlockLevel - b.unlockLevel)
          .slice(0, 5);
        if (upcoming.length > 0) {
          h += `<div style="font-family:Fredoka;font-size:12px;font-weight:700;color:rgba(201,168,255,0.8);margin:12px 0 4px;letter-spacing:.5px">🔒 COMING SOON (next ${upcoming.length})</div>`;
          upcoming.forEach(bp => {
            h += `<div class="shop-item" style="opacity:0.5;pointer-events:none">
          <div class="info">
            <div style="font-size:28px;min-width:36px;text-align:center;line-height:36px">🔒</div>
            <div class="details">
              <div class="name">${bp.name}</div>
              <div class="desc">Unlock at Player Level ${bp.unlockLevel}</div>
            </div>
          </div>
          <button class="shop-buy" disabled>Lv ${bp.unlockLevel}</button>
        </div>`;
          });
          const remaining = SPECIES_BLUEPRINTS.filter(bp => !isSpeciesUnlocked(bp)).length - upcoming.length;
          if (remaining > 0) h += `<p style="text-align:center;font-size:11px;color:var(--text-light);padding:8px">…and ${remaining} more hidden species await 🌊</p>`;
        }
      } else if (t === 'food') {
        Object.entries(FOOD).forEach(([k, f]) => {
          if (k !== 'waste') {
            h += `<div class="shop-item">
          <div class="info"><div class="details"><div class="name">${f.name}</div><div class="desc">Fills ${f.power} hunger · In stock: ${GS.inv[k] || 0}</div></div></div>
          <button class="shop-buy" onclick="buy('food','${k}')">${coinSVG()} ${f.price}</button>
        </div>`;
          }
        });
      } else if (t === 'deco') {
        DECOS.forEach((d, i) => {
          h += `<div class="shop-item">
        <div class="info"><div class="details">
          <div class="name">${d.name} <span style="color:${RC[d.r]};font-size:11px">[${d.r}]</span></div>
          <div class="desc">Rarity: ${d.r}</div>
        </div></div>
        <button class="shop-buy" onclick="buy('deco',${i})">${coinSVG()} ${d.price}</button>
      </div>`;
        });
      } else if (t === 'plants') {
        const curTemp = (GS.temp || 24).toFixed(1);
        const fertActive = GS.upgrades && GS.upgrades.fertilizer;
        h += `<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">
      <div style="flex:1;background:rgba(168,255,184,0.15);border:2px solid var(--accent-green);border-radius:12px;padding:8px;font-size:11px;color:var(--text-dark)">
        <b>🌿 Your flora:</b> ${(GS.plants || []).length} plants · ${(GS.plants || []).filter(p => p.ready).length} ready · 🌡️${curTemp}°C${fertActive ? ' · 🌱+50% speed' : ''}
      </div>
    </div>
    <p style="font-size:11px;color:var(--text-light);margin-bottom:10px">Plants feed and cheer up your fish, but dirty the water. ✂️ Click a mature plant in the aquarium to harvest it and earn coins.</p>`;
        Object.entries(PLANT_TYPES).forEach(([k, p]) => {
          const canBuy = GS.coins >= p.price;
          const count = (GS.plants || []).filter(pl => pl.typeId === k).length;
          h += `<div class="shop-item">
        <div class="info">
          <div style="font-size:30px;min-width:36px;text-align:center">${p.emoji}</div>
          <div class="details">
            <div class="name">${p.name} ${count > 0 ? `<span style="color:var(--accent-green);font-size:11px">(You have ${count})</span>` : ''}</div>
            <div class="desc">${p.desc}</div>
            <div class="desc" style="margin-top:3px">⏱ ${p.growTime}s · 🍽+${p.feedPower} · 💧-${p.dirtyRate} · 😊+${p.moodBoost} · ✂️${p.harvestCoins}🪙</div>
          </div>
        </div>
        <button class="shop-buy" onclick="buyFlora('plant','${k}')" ${!canBuy ? 'disabled' : ''}>
          ${coinSVG()} ${p.price}
        </button>
      </div>`;
        });
      } else if (t === 'corals') {
        const curTemp = (GS.temp || 24).toFixed(1);
        const tempOk = (GS.temp || 24) >= 24 && (GS.temp || 24) <= 30;
        h += `<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">
      <div style="flex:1;background:rgba(255,200,150,0.15);border:2px solid var(--accent-yellow);border-radius:12px;padding:8px;font-size:11px;color:var(--text-dark)">
        <b>🪸 Your flora:</b> ${(GS.corals || []).length} corals · ${(GS.corals || []).filter(c => c.ready).length} ready · 🌡️${curTemp}°C ${tempOk ? '✅ optimal' : '⚠️ suboptimal'}
      </div>
    </div>
    <p style="font-size:11px;color:var(--text-light);margin-bottom:10px">Corals clean the water and grow slowly. They do not feed fish but yield more at harvest. ✂️ Click a mature coral in the tank to harvest.</p>`;
        Object.entries(CORAL_TYPES).forEach(([k, cr]) => {
          const canBuy = GS.coins >= cr.price;
          const count = (GS.corals || []).filter(co => co.typeId === k).length;
          h += `<div class="shop-item">
        <div class="info">
          <div style="font-size:30px;min-width:36px;text-align:center">${cr.emoji}</div>
          <div class="details">
            <div class="name">${cr.name} ${count > 0 ? `<span style="color:var(--accent-yellow);font-size:11px">(You have ${count})</span>` : ''}</div>
            <div class="desc">${cr.desc}</div>
            <div class="desc" style="margin-top:3px">⏱ ${cr.growTime}s · 💧+${cr.cleanRate} · ✂️${cr.harvestCoins}🪙${cr.moodBoost ? ` · 😊+${cr.moodBoost}` : ''}</div>
          </div>
        </div>
        <button class="shop-buy" onclick="buyFlora('coral','${k}')" ${!canBuy ? 'disabled' : ''}>
          ${coinSVG()} ${cr.price}
        </button>
      </div>`;
        });
      } else if (t === 'skins') {
        SKINS.forEach(s => {
          const owned = GS.skin === s.id;
          h += `<div class="shop-item">
        <div class="info">
          <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,${s.bg1},${s.bg2});border:2px solid rgba(0,0,0,.1)"></div>
          <div class="details"><div class="name">${s.name}</div><div class="desc">${owned ? '✓ Active' : ''}</div></div>
        </div>
        <button class="shop-buy" onclick="buy('skin','${s.id}')" ${owned ? 'disabled' : ''}>
          ${owned ? 'Active' : s.price === 0 ? 'Free!' : coinSVG() + s.price}
        </button>
      </div>`;
        });
      } else if (t === 'upgrade') {
        // Progressive Tank Expansion Tiers
        const currentTierIdx = TANK_TIERS.findIndex(tier => tier.cap === CFG.MAX_FISH);
        const nextTier = TANK_TIERS[currentTierIdx + 1];
        h += `<div style="background:linear-gradient(135deg,rgba(0,201,167,0.08),rgba(0,140,117,0.05));border:1px solid rgba(0,201,167,0.2);border-radius:16px;padding:14px;margin-bottom:12px">
      <div style="font-family:Fredoka;font-size:13px;font-weight:700;color:#00c9a7;margin-bottom:8px">🐠 Tank Capacity — Progressive Expansion</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:10px">`;
        TANK_TIERS.forEach((tier, i) => {
          const owned = CFG.MAX_FISH >= tier.cap;
          const isCurrent = CFG.MAX_FISH === tier.cap;
          const isNext = !owned && nextTier && nextTier.cap === tier.cap;
          h += `<div style="text-align:center;padding:7px 4px;border-radius:10px;background:${owned ? 'rgba(0,201,167,0.15)' : 'rgba(255,255,255,0.03)'};border:1px solid ${isCurrent ? '#00c9a7' : owned ? 'rgba(0,201,167,0.3)' : 'rgba(255,255,255,0.08)'}">
        <div style="font-size:16px">${tier.emoji}</div>
        <div style="font-family:Fredoka;font-size:10px;color:${owned ? '#00c9a7' : 'rgba(255,255,255,0.4)'};font-weight:${isCurrent ? 700 : 400}">${tier.cap} 🐟</div>
        ${isCurrent ? '<div style="font-size:8px;color:#00c9a7;font-family:Fredoka">CURRENT</div>' : owned ? '<div style="font-size:9px">✅</div>' : `<div style="font-size:8px;color:rgba(255,222,125,0.6);font-family:Fredoka">🪙${tier.cost}</div>`}
      </div>`;
        });
        h += `</div>`;
        if (nextTier) {
          h += `<div style="font-family:Fredoka;font-size:12px;color:rgba(168,216,255,0.7);margin-bottom:8px">Next: <b style="color:#00c9a7">${nextTier.emoji} ${nextTier.label}</b> — ${nextTier.desc}</div>
      <button class="shop-buy" style="width:100%;justify-content:center;background:linear-gradient(135deg,#00c9a7,#00876a);color:white;border:none" onclick="buy('upgrade','tankTier')">
        ${coinSVG()}${nextTier.cost} → Unlock ${nextTier.cap} fish slots
      </button>`;
        } else {
          h += `<div style="font-family:Fredoka;font-size:13px;color:#ffd700;text-align:center">🌟 Maximum Capacity Reached — You are an Ocean Master!</div>`;
        }
        h += `</div>`;

        const upgrades = [
          { name: 'Turbo Food', desc: 'Food lasts 2x longer in water', price: 300, id: 'turbofood', done: GS.upgrades && GS.upgrades.turbofood },
          { name: '🌡️ Temperature Control', desc: 'Stabilizes water at 25°C — optimal for all your flora', price: 400, id: 'tempctrl', done: GS.upgrades && GS.upgrades.tempctrl },
          { name: '🌿 Premium Fertilizer', desc: 'Plants grow 50% faster', price: 350, id: 'fertilizer', done: GS.upgrades && GS.upgrades.fertilizer },
        ];
        upgrades.forEach(u => {
          h += `<div class="shop-item">
        <div class="info"><div class="details"><div class="name">${u.name}</div><div class="desc">${u.desc}</div></div></div>
        <button class="shop-buy" onclick="buy('upgrade','${u.id}')" ${u.done ? 'disabled' : ''}>
          ${u.done ? 'Owned' : coinSVG() + u.price}
        </button>
      </div>`;
        });
      } else if (t === 'pearls') {
        h += `<div style="text-align:center;margin-bottom:12px;padding:10px;background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(192,132,252,0.1));border-radius:14px;border:1px solid rgba(168,85,247,0.2)">
      <div style="font-size:11px;color:var(--text-light)">Your pearls</div>
      <div style="font-size:26px;font-weight:700;color:#a855f7">${pearlSVG(20)}${Math.floor(GS.pearls || 0)}</div>
      <div style="font-size:10px;color:var(--text-light);margin-top:3px">Earn pearls every day you log in, by completing adventures and leveling up.</div>
    </div>`;
        PEARL_SHOP.forEach(item => {
          const owned = item.type === 'skin' ? GS.skin === item.sid : (item.type === 'upgrade' ? (GS.upgrades && GS.upgrades[item.uid]) : false);
          const canBuy = (GS.pearls || 0) >= item.price;
          h += `<div class="shop-item">
        <div class="info">
          <div style="font-size:28px;min-width:36px;text-align:center">${item.icon}</div>
          <div class="details"><div class="name">${item.name}</div><div class="desc">${item.desc}</div></div>
        </div>
        <button class="shop-buy" onclick="buyPearl('${item.id}')" ${owned || !canBuy ? 'disabled' : ''} style="background:${canBuy && !owned ? 'linear-gradient(135deg,#c084fc,#a855f7)' : 'rgba(0,0,0,0.1)'};color:${canBuy && !owned ? 'white' : '#999'}">
          ${owned ? '✓ Active' : pearlSVG(12) + item.price}
        </button>
      </div>`;
        });
      }
      document.getElementById('shop-content').innerHTML = h;
    }

    function buy(type, k) {
      SFX.wake();
      if (type === 'fish') {
        const s = SPECIES[k];
        if (!s) { notify('Unknown species!', 'warning'); return; }
        if (GS.fish.length >= CFG.MAX_FISH) { notify('Tank is full! Max ' + CFG.MAX_FISH + ' fish.', 'warning'); SFX.err(); return; }
        if (GS.coins < s.price) { notify(`Need ${Math.ceil(s.price - GS.coins)} more coins to buy ${s.name}!`, 'warning'); SFX.err(); return; }
        GS.coins -= s.price;
        let f;
        try {
          f = new Fish(DNA.fromSpecies(k));
        } catch (e) {
          GS.coins += s.price; // refund on failure
          notify('Error creating fish, please try again!', 'danger');
          console.error('Fish creation failed:', e);
          return;
        }
        GS.fish.push(f);
        if (!GS.discovered) GS.discovered = {};
        const isNew = !GS.discovered[k];
        GS.discovered[k] = (GS.discovered[k] || 0) + 1;
        if (isNew) awardDiscoveryPearl(k);
        notify(`🐟 ${s.name} added to your tank!`, 'success'); SFX.buy();
        spawnP(f.x, f.y, f.dna.c1(), 8);
        HAP.light();
        shopTab('fish');   // refresh so "Tank full" state updates
        save();
      } else if (type === 'food') {
        const f = FOOD[k];
        if (!f) return;
        if (GS.coins < f.price) { notify(`Not enough coins! Need ${f.price}.`, 'warning'); SFX.err(); return; }
        GS.coins -= f.price;
        GS.inv[k] = (GS.inv[k] || 0) + 1;
        notify(`🍽 ${f.name} ×1 added to inventory!`, 'success'); SFX.buy();
        shopTab('food'); save();
      } else if (type === 'deco') {
        const d = DECOS[k];
        if (!d) return;
        if (GS.coins < d.price) { notify(`Not enough coins! Need ${d.price}.`, 'warning'); SFX.err(); return; }
        GS.coins -= d.price;
        // Place deco at a random x along the tank bottom
        const decoX = 40 + Math.random() * Math.max(10, W - 80);
        GS.decos.push({ ...d, x: decoX });
        notify(`🪸 ${d.name} placed in tank!`, 'success'); SFX.buy();
        HAP.light();
        shopTab('deco'); save();
      } else if (type === 'skin') {
        const s = SKINS.find(sk => sk.id === k);
        if (!s) return;
        if (GS.skin === k) { notify('Skin already active!', 'info'); return; }
        if (GS.coins < s.price) { notify(`Need ${s.price - Math.floor(GS.coins)} more coins!`, 'warning'); SFX.err(); return; }
        GS.coins -= s.price;
        GS.skin = k; _bgCache.dirty = true;
        notify(`🎨 ${s.name} activated!`, 'success'); SFX.buy();
        shopTab('skins'); save();
      } else if (type === 'upgrade') {
        if (!GS.upgrades) GS.upgrades = {};
        if (k === 'tankTier') {
          // Find next tier above current cap
          const currentTierIdx = TANK_TIERS.findIndex(t => t.cap === CFG.MAX_FISH);
          const nextTier = TANK_TIERS[currentTierIdx + 1];
          if (!nextTier) { notify('Already at maximum capacity!', 'info'); return; }
          if (GS.coins < nextTier.cost) { notify(`Need ${nextTier.cost - Math.floor(GS.coins)} more coins!`, 'warning'); SFX.err(); return; }
          GS.coins -= nextTier.cost;
          CFG.MAX_FISH = nextTier.cap;
          GS.tankTierCap = nextTier.cap; // persist
          notify(`${nextTier.emoji} Tank expanded to ${nextTier.cap} fish! ${nextTier.label}!`, 'success');
          SFX.levelUp(); HAP.success();
          // Celebration particles
          for (let i = 0; i < 8; i++) setTimeout(() => spawnParticle && spawnParticle(Math.random() * W, Math.random() * H * 0.5), i * 80);
          shopTab('upgrade'); save(); return;
        }
        const prices = { expand: 500, turbofood: 300, tempctrl: 400, fertilizer: 350 };
        const price = prices[k] || 999;
        if (GS.upgrades[k]) { notify('Already owned!', 'info'); return; }
        if (GS.coins < price) { notify(`Need ${price - Math.floor(GS.coins)} more coins!`, 'warning'); SFX.err(); return; }
        GS.coins -= price;
        GS.upgrades[k] = true;
        if (k === 'expand') CFG.MAX_FISH = 16;
        notify('⚡ Upgrade activated!', 'success'); SFX.buy(); HAP.success();
        shopTab('upgrade'); save();
      }
    }

    // ============== BUY PLANTS / CORALS ==============
    function buyFlora(kind, typeId) {
      SFX.wake();
      const data = kind === 'plant' ? PLANT_TYPES[typeId] : CORAL_TYPES[typeId];
      if (!data) return;
      if (GS.coins < data.price) { notify('Not enough coins!', 'warning'); SFX.err(); return; }
      GS.coins -= data.price;
      const maxSlots = 8;
      const allFlora = [...(GS.plants || []), ...(GS.corals || [])];
      if (allFlora.length >= maxSlots) { notify('Aquarium flora is full! Harvest some first.', 'warning'); SFX.err(); GS.coins += data.price; return; }
      // Place at a random spot on the sand, avoiding overlaps
      const usedX = allFlora.map(f => f.x);
      let x;
      for (let attempt = 0; attempt < 20; attempt++) {
        x = 40 + Math.random() * (W - 80);
        if (!usedX.some(ux => Math.abs(ux - x) < 55)) break;
      }
      const newItem = { typeId, x, age: 0, maturity: 0, ready: false, harvested: false, isPlant: kind === 'plant' };
      if (kind === 'plant') { if (!GS.plants) GS.plants = []; GS.plants.push(newItem); }
      else { if (!GS.corals) GS.corals = []; GS.corals.push(newItem); }
      notify(`${data.emoji} ${data.name} planted in the aquarium!`, 'success');
      SFX.buy();
      spawnP(x, H - 60, kind === 'plant' ? '#80ff80' : '#ff8040', 8);
      shopTab(kind === 'plant' ? 'plants' : 'corals');
      save();
    }

    // ============== FISH INFO POPUP ==============
    function showFI(f) {
      const age = f.getAge();
      const r = f.dna.rarity();
      const specData = f.dna.pure && SPECIES[f.dna.pure];
      const optLo = specData ? specData.optTempLow : 22;
      const optHi = specData ? specData.optTempHigh : 28;
      const curTemp = GS.temp || 24;
      const tempOk = curTemp >= optLo && curTemp <= optHi;
      const tempStress = Math.max(0, Math.max(optLo - curTemp, curTemp - optHi));
      const tempIcon = tempOk ? '✅' : curTemp > optHi ? '🌡️ Hot' : '❄️ Cold';
      let h = `
    <div style="text-align:center;margin-bottom:12px">
      <div style="font-size:40px">${f.happy > 60 ? '😊' : f.happy > 30 ? '😐' : '😢'}</div>
      <h3 style="color:${RC[r]};margin:4px 0">${f.dna.label()}</h3>
      <div style="font-size:12px;color:${RC[r]};font-weight:700">${r}</div>
    </div>
    <div class="info-row"><span>Level</span><span>Lv ${f.lv}</span></div>
    <div class="info-row"><span>Age</span><span>${age} min</span></div>
    <div class="info-row"><span>Hunger</span><span>${Math.floor(f.hunger)}%</span></div>
    <div class="info-row"><span>Happiness</span><span>${Math.floor(f.happy)}%</span></div>
    <div class="info-row"><span>Size</span><span>${f.size.toFixed(1)}</span></div>
    <div class="info-row"><span>Speed</span><span>${f.dna.speed.toFixed(2)}</span></div>
    <div style="margin-top:10px;padding:8px 12px;background:${tempOk ? 'rgba(168,255,184,0.15)' : 'rgba(255,157,100,0.15)'};border-radius:10px;border:1.5px solid ${tempOk ? '#80ff80' : '#ff9d60'}">
      <div style="font-size:12px;font-weight:700;color:${tempOk ? '#60d060' : '#ff8040'}">🌡️ Temperature: ${curTemp.toFixed(1)}°C ${tempIcon}</div>
      <div style="font-size:11px;color:var(--text-light);margin-top:3px">Optimal range: ${optLo}–${optHi}°C${tempStress > 0 ? ` · Stress: ${tempStress.toFixed(1)}°` : ''}</div>
    </div>
    <div style="margin-top:14px;font-weight:700;margin-bottom:6px;color:var(--accent-pink)">🧬 DNA</div>
    <div class="info-row"><span>Hue</span><span style="color:hsl(${f.dna.hue},80%,55%)">${Math.round(f.dna.hue)}°</span></div>
    <div class="info-row"><span>Pattern</span><span>${['None', 'Spots', 'Stripes', 'Gradient'][f.dna.pat | 0]}</span></div>
    <div class="info-row"><span>Fin Size</span><span>${f.dna.fins.toFixed(2)}</span></div>
    <div class="info-row"><span>Tail Size</span><span>${f.dna.tail.toFixed(2)}</span></div>
    <div class="info-row" style="margin-top:8px"><span>Sell Value</span><span style="color:#ffd700">${coinSVG()} ${f.getValue() * CFG.CATCH_MULT}</span></div>`;
      document.getElementById('fish-info-content').innerHTML = h;
      document.getElementById('fish-info-modal').classList.add('active');
    }
    function closeFishInfo() { document.getElementById('fish-info-modal').classList.remove('active'); }

    // ============== REVIVE ==============
    function showRevive() {
      if (GS.graveyard.length === 0) {
        notify('No fish to revive!', 'info'); return;
      }
      const FISH_EMOJIS = { goldfish: '🐠', guppy: '🐟', neon: '🐡', betta: '🐠', clown: '🐠', angel: '🐟', pleco: '🐟', shark: '🦈', axolotl: '🦎', turtle: '🐢', jelly: '🪼', star: '⭐' };
      let h = `<p style="font-size:12px;color:var(--text-light);margin-bottom:14px;text-align:center">Bring your fish back to life!</p>`;
      GS.graveyard.forEach((gf, i) => {
        const cost = Math.floor(50 + (gf.lv || 1) * 20 + (gf.size || 15) * 2);
        const label = (gf.dna && gf.dna.pure && SPECIES[gf.dna.pure]) ? SPECIES[gf.dna.pure].name : (gf.dna ? 'Hybrid' : 'Unknown');
        const emoji = (gf.dna && gf.dna.pure) ? (FISH_EMOJIS[gf.dna.pure] || '🐟') : '🐟';
        const canAfford = GS.coins >= cost;
        const tankFull = GS.fish.length >= CFG.MAX_FISH;
        h += `<div class="shop-item" style="${canAfford && !tankFull ? '' : 'opacity:0.6'}">
      <div class="info">
        <div style="font-size:28px;min-width:36px;text-align:center">${emoji}</div>
        <div class="details">
          <div class="name">${label}</div>
          <div class="desc">Lv ${gf.lv || 1} · Size ${(gf.size || 15).toFixed(0)} · ${tankFull ? '⚠ Tank full' : canAfford ? '✓ Can afford' : '✗ Not enough coins'}</div>
        </div>
      </div>
      <button class="shop-buy" onclick="doRevive(${i})" ${!canAfford || tankFull ? 'disabled' : ''} style="background:linear-gradient(135deg,#a8d8ff,#7eb9ff)">
        ${coinSVG()} ${cost}
      </button>
    </div>`;
      });
      document.getElementById('revive-content').innerHTML = h;
      document.getElementById('revive-modal').classList.add('active');
    }
    function closeRevive() { document.getElementById('revive-modal').classList.remove('active'); }

    function doRevive(i) {
      const gf = GS.graveyard[i];
      if (!gf) { notify('Fish not found!', 'warning'); return; }
      const cost = Math.floor(50 + (gf.lv || 1) * 20 + (gf.size || 15) * 2);
      if (GS.coins < cost) { notify('Not enough coins!', 'warning'); SFX.err(); return; }
      if (GS.fish.length >= CFG.MAX_FISH) { notify('Tank is full!', 'warning'); SFX.err(); return; }
      GS.coins -= cost;

      // Properly reconstruct DNA from saved plain object
      let dna = new DNA();
      if (gf.dna && typeof gf.dna === 'object') {
        const fields = ['hue', 'sat', 'lit', 'size', 'speed', 'pat', 'fins', 'tail', 'pure'];
        fields.forEach(k => { if (gf.dna[k] !== undefined) dna[k] = gf.dna[k]; });
      }

      const f = new Fish(dna);
      f.lv = gf.lv || 1;
      f.size = gf.size || dna.size || 16;
      f.hunger = 50; // revived fish start half hungry
      f.happy = 60;
      f.x = W / 2 + (Math.random() - 0.5) * 80;
      f.y = H / 2 + (Math.random() - 0.5) * 60;

      GS.fish.push(f);
      GS.graveyard.splice(i, 1);
      closeRevive();
      notify(`✨ ${f.dna.label()} revived!`, 'success');
      SFX.rev();
      spawnP(W / 2, H / 2, '#a8d8ff', 20);
      save();
    }

    // ============== DAILY EVENTS ==============
    function onNewDay() {
      // Rebalanced passive income: scales with happiness, level, and species rarity
      const income = Math.floor(GS.fish.reduce((sum, f) => {
        const rareMult = { Common: 1, Rare: 1.8, Epic: 3, Legendary: 6 }[f.dna.rarity()] || 1;
        return sum + Math.floor((f.happy * 0.18 + f.lv * 3) * rareMult);
      }, 0) * getBoostMultiplier());
      GS.coins += income;

      // Daily login pearl reward
      const todayMs = Date.now();
      const lastMs = GS.lastLogin || 0;
      const hoursSince = (todayMs - lastMs) / 3600000;
      let streakBonus = 0;
      if (hoursSince < 30) {
        GS.loginStreak = (GS.loginStreak || 0) + 1;
        streakBonus = GS.loginStreak >= 7 ? 3 : 1;
      } else if (hoursSince > 48) {
        GS.loginStreak = 1;
        streakBonus = 1;
      }
      GS.lastLogin = todayMs;
      if (streakBonus) {
        GS.pearls = (GS.pearls || 0) + streakBonus;
        notify(`🌅 Day ${GS.day}! +🪙${income} · +${streakBonus}🫧 pearl${streakBonus > 1 ? 's' : ''} (streak: ${GS.loginStreak} days)`, 'success');
      } else {
        notify(`🌅 Day ${GS.day}! +🪙${income} from your fish`, 'success');
      }
      // Track temperature quality for achievement
      const tempNow = GS.temp || 24;
      const allOptimal = GS.fish.length > 0 && GS.fish.every(f => {
        const sp = f.dna.pure && SPECIES[f.dna.pure];
        const lo = sp ? sp.optTempLow : 22;
        const hi = sp ? sp.optTempHigh : 28;
        return tempNow >= lo && tempNow <= hi;
      });
      if (allOptimal) GS.stats.optTempDays = (GS.stats.optTempDays || 0) + 1;

      spawnP(W * .5, H * .4, '#ffd700', 12);

      // Random rare visitor event (10% chance)
      if (Math.random() < 0.10 && GS.fish.length < CFG.MAX_FISH) {
        const rareSpecies = ['jelly', 'shark', 'turtle', 'axolotl'];
        const rid = rareSpecies[Math.floor(Math.random() * rareSpecies.length)];
        setTimeout(() => {
          notify(`🌟 A wild ${SPECIES[rid].name} is visiting your aquarium! (watch it swim)`, 'success');
          const visitor = new Fish(DNA.fromSpecies(rid));
          visitor.isVisitor = true;
          visitor.visitorTimer = 30; // seconds then leaves
          GS.fish.push(visitor);
          sendPushNotification(`🌟 Special visitor!`, `A ${SPECIES[rid].name} appeared in your aquarium`);
        }, 3000);
      }

      if (GS.clean < 40) notify('💧 Tank is very dirty! Clean it soon.', 'warning');
      if (GS.fish.some(f => f.hunger < 30)) {
        notify('🍽 Some fish are very hungry!', 'warning');
        sendPushNotification('🍽 Your fish are hungry', 'Return to Glopbix and feed them before they die.');
      }
    }

    // ============== COIN BOOST (2× reward system) ==============
    let _boostActive = false;
    let _boostTimer = 0;
    let _boostCooldown = 0;
    const BOOST_DURATION = 60; // seconds
    const BOOST_COOLDOWN = 300; // 5 min cooldown

    function openBoost() {
      SFX.wake(); HAP.light();
      const now = Date.now() / 1000;
      const cd = Math.max(0, _boostCooldown - now);
      let html;
      if (_boostActive) {
        const rem = Math.ceil(_boostTimer - now);
        html = `
      <div style="font-size:52px;margin-bottom:10px">⚡</div>
      <h2 style="font-size:20px;color:#ffd700;margin-bottom:8px">Boost Active!</h2>
      <p style="font-size:13px;color:var(--text-light);margin-bottom:16px">2× coins on all earnings for</p>
      <div style="font-size:40px;font-weight:700;color:#ff9dc6;margin-bottom:20px" id="boost-countdown">${rem}s</div>
      <div style="font-size:12px;color:var(--text-light)">Keep playing — your coins are doubling! 🚀</div>`;
      } else if (cd > 0) {
        const cdMin = Math.ceil(cd / 60);
        html = `
      <div style="font-size:52px;margin-bottom:10px">⏳</div>
      <h2 style="font-size:20px;color:var(--accent-pink);margin-bottom:8px">Boost Cooling Down</h2>
      <p style="font-size:13px;color:var(--text-light);margin-bottom:16px">Next boost available in</p>
      <div style="font-size:28px;font-weight:700;color:#a8d8ff;margin-bottom:20px">${cdMin} min</div>
      <div style="font-size:12px;color:var(--text-light)">Come back soon for your next 2× earnings boost!</div>`;
      } else {
        html = `
      <div style="font-size:52px;margin-bottom:10px">⚡</div>
      <h2 style="font-size:20px;color:var(--accent-pink);margin-bottom:6px">2× Coin Boost!</h2>
      <p style="font-size:13px;color:var(--text-light);margin-bottom:16px">Double all coin earnings for 60 seconds — fishing, passive income, and harvests!</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:18px">
        <div style="flex:1;min-width:100px;padding:10px;background:rgba(255,215,0,0.1);border:2px solid rgba(255,215,0,0.3);border-radius:12px">
          <div style="font-size:20px">🎣</div><div style="font-size:11px;color:var(--text-dark)">2× Fishing</div>
        </div>
        <div style="flex:1;min-width:100px;padding:10px;background:rgba(255,215,0,0.1);border:2px solid rgba(255,215,0,0.3);border-radius:12px">
          <div style="font-size:20px">🌿</div><div style="font-size:11px;color:var(--text-dark)">2× Harvest</div>
        </div>
        <div style="flex:1;min-width:100px;padding:10px;background:rgba(255,215,0,0.1);border:2px solid rgba(255,215,0,0.3);border-radius:12px">
          <div style="font-size:20px">🪙</div><div style="font-size:11px;color:var(--text-dark)">2× Passive</div>
        </div>
      </div>
      <button onclick="activateBoost();closeBoost()" style="width:100%;padding:14px;background:linear-gradient(135deg,#ffd700,#ffca3a);border:none;border-radius:18px;font-family:Fredoka;font-size:17px;font-weight:700;color:#333;cursor:pointer;box-shadow:0 6px 24px rgba(255,215,0,0.4)">⚡ Activate 2× Boost!</button>
      <p style="font-size:10px;color:var(--text-light);margin-top:10px">Available once every 5 minutes</p>`;
      }
      document.getElementById('boost-content').innerHTML = html;
      document.getElementById('boost-modal').classList.add('active');
    }

    function activateBoost() {
      const now = Date.now() / 1000;
      _boostActive = true;
      _boostTimer = now + BOOST_DURATION;
      _boostCooldown = now + BOOST_COOLDOWN;
      HAP.success(); SFX.levelUp();
      spawnCoinRain();
      notify('⚡ 2× Coin Boost activated for 60 seconds!', 'success');
      // Update boost button appearance
      const btn = document.getElementById('btn-boost');
      if (btn) btn.classList.add('active');
      // Auto-deactivate
      setTimeout(() => {
        _boostActive = false;
        notify('⚡ Boost expired. Back to normal earnings.', 'info');
        const b = document.getElementById('btn-boost');
        if (b) b.classList.remove('active');
      }, BOOST_DURATION * 1000);
    }

    function getBoostMultiplier() { return _boostActive && Date.now() / 1000 < _boostTimer ? 2 : 1; }

    function spawnCoinRain() {
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const el = document.createElement('div');
          el.className = 'coin-rain';
          el.textContent = '🪙';
          el.style.left = (10 + Math.random() * 80) + 'vw';
          el.style.top = (10 + Math.random() * 40) + 'vh';
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 1300);
        }, i * 80);
      }
    }

    function closeBoost() { document.getElementById('boost-modal').classList.remove('active'); }

    // ============== SAVE / LOAD ==============
    function save() {
      // Defer to idle time to avoid blocking render
      const doSave = () => {
        try {
          GS.lastSeen = Date.now();
          const d = {
            v: 8, // save version for migration
            coins: GS.coins, pearls: GS.pearls || 0,
            day: GS.day, time: GS.time, clean: GS.clean, hunger: GS.hunger,
            inv: GS.inv, decos: GS.decos, graveyard: GS.graveyard.map(g => ({
              dna: g.dna, lv: g.lv, size: g.size
            })),
            level: GS.level, xp: GS.xp, stats: GS.stats, skin: GS.skin,
            achievements: GS.achievements, upgrades: GS.upgrades || {},
            discovered: GS.discovered || {},
            encComplete: GS.encComplete || false,
            loginStreak: GS.loginStreak || 0,
            lastLogin: GS.lastLogin || 0,
            lastSeen: GS.lastSeen,
            plants: GS.plants || [],
            corals: GS.corals || [],
            temp: GS.temp || 24,
            tankTierCap: CFG.MAX_FISH,
            aiSpecies: GS.aiSpecies || {},
            fish: GS.fish.map(f => f.ser())
          };
          localStorage.setItem('glopbix_v7', JSON.stringify(d));
          // Keep v4 key for backward compat
          localStorage.setItem('glopbix_v4', JSON.stringify(d));
        } catch (e) {
          console.warn('Save failed:', e);
          // Show visible warning if storage is full or unavailable
          notify('⚠️ Save failed! Your device storage may be full.', 'danger');
        }
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(doSave, { timeout: 2000 });
      } else {
        doSave();
      }
    }

    function load() {
      const raw = localStorage.getItem('glopbix_v7') || localStorage.getItem('glopbix_v4') || localStorage.getItem('gloobix_v4') || localStorage.getItem('gloobix_v3');
      if (!raw) return false;
      try {
        const s = JSON.parse(raw);
        GS.coins = s.coins || 150;
        GS.pearls = s.pearls || 0;
        GS.day = s.day || 1;
        GS.time = s.time || 0;
        GS.clean = s.clean !== undefined ? s.clean : 100;
        const defaultInv = { basic: 0, premium: 0, meat: 0, veg: 0 };
        GS.inv = Object.assign({}, defaultInv, s.inv || {});
        GS.decos = s.decos || [];
        GS.graveyard = s.graveyard || [];
        GS.level = s.level || 1;
        GS.xp = s.xp || 0;
        GS.stats = Object.assign({ fed: 0, cleaned: 0, bred: 0, caught: 0, harvested: 0, dnaCodexMax: 0, optTempDays: 0 }, s.stats || {});
        GS.skin = s.skin || 'default';
        GS.achievements = s.achievements || {};
        GS.upgrades = s.upgrades || {};
        GS.discovered = s.discovered || {};
        GS.encComplete = s.encComplete || false;
        GS.loginStreak = s.loginStreak || 0;
        GS.lastLogin = s.lastLogin || 0;
        GS.lastSeen = s.lastSeen || Date.now();
        GS.plants = s.plants || [];
        GS.corals = s.corals || [];
        GS.temp = s.temp || 24;
        GS.aiSpecies = s.aiSpecies || {};
        GS.aiSpeciesPending = {};
        restoreAISpecies(); // inject saved AI species back into SPECIES object
        if (GS.upgrades.expand) CFG.MAX_FISH = 16;
        // Restore progressive tank tier
        if (s.tankTierCap && s.tankTierCap > CFG.MAX_FISH) CFG.MAX_FISH = s.tankTierCap;

        GS.fish = (s.fish || []).map(fd => {
          try {
            const f = new Fish(new DNA());
            const sd = fd.dna; delete fd.dna;
            Object.assign(f, fd);
            if (sd) Object.assign(f.dna, sd);
            // Restore runtime-only properties not saved by ser()
            if (!f.food) f.food = null;
            if (!f.caught) f.caught = false;
            if (!f.hookPhase) f.hookPhase = 0;
            if (!f.timer) f.timer = Math.random() * 2;
            if (!f.tx) f.tx = f.x;
            if (!f.ty) f.ty = f.y;
            if (f._tempStress === undefined) f._tempStress = 0;
            return f;
          } catch (e) {
            console.warn('Skipping corrupt fish on load:', e.message);
            return null;
          }
        }).filter(Boolean); // remove any corrupt fish that failed to load
        return true;
      } catch (e) {
        console.error('Load failed:', e);
        return false;
      }
    }

    function openResetConfirm() {
      closeSettings();
      const inp = document.getElementById('reset-input');
      const btn = document.getElementById('reset-confirm-btn');
      if (inp) inp.value = '';
      if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
      document.getElementById('reset-confirm-modal').classList.add('active');
      setTimeout(() => inp && inp.focus(), 100);
    }
    function closeResetConfirm() {
      document.getElementById('reset-confirm-modal').classList.remove('active');
    }
    function doResetGame() {
      const inp = document.getElementById('reset-input');
      if (!inp || inp.value !== 'RESET') return;
      closeResetConfirm();
      localStorage.removeItem('gloobix_v4');
      localStorage.removeItem('glopbix_v4');
      localStorage.removeItem('glopbix_v7');
      localStorage.removeItem('glopbix_v001');
      localStorage.removeItem('gloobix_v3');
      location.reload();
    }
    function resetGame() { openResetConfirm(); }

    // ============== INIT / START ==============
    function startGame() {
      try {
        SFX.init();
        SFX.wake();
      } catch (e) {
        console.log('Audio init failed (ok on some devices):', e);
      }
      document.getElementById('start-screen').style.display = 'none';
      document.getElementById('game-screen').classList.add('active');
      init();
      // Init WebGL layer and daily quests (deferred to let canvas size settle)
      setTimeout(() => {
        try {
          initPixi();
          initDailyQuests();
        } catch (e) {
          console.log('Pixi/Quest init failed:', e);
        }
      }, 200);
    }

    function init() {
      console.log('🐠 Initializing Glopbix...');
      cv = document.getElementById('aquarium');
      ctx = cv.getContext('2d', { alpha: false, desynchronized: true, willReadFrequently: false });
      // Hint: reduce power consumption on low-end devices
      if (ctx.imageSmoothingEnabled !== undefined) ctx.imageSmoothingEnabled = false;
      resize();
      window.addEventListener('resize', resize);
      setupClick();
      const hadSave = load();
      if (!hadSave) {
        GS.fish.push(new Fish(DNA.fromSpecies('goldfish')));
        GS.fish.push(new Fish(DNA.fromSpecies('guppy')));
        GS.inv = { basic: 8, premium: 0, meat: 0, veg: 0 };
        GS.coins = 150; GS.pearls = 5;
      } else {
        // Offline progress
        calcOfflineProgress();
      }

      GS.fish.forEach(f => {
        if (!f.x || f.x > W - f.size) f.x = W * (.2 + Math.random() * .6);
        if (!f.y || f.y > H - 70) f.y = H * (.2 + Math.random() * .5);
      });

      // Mark initial discovery of starting species
      if (!GS.discovered) GS.discovered = {};
      GS.fish.forEach(f => { if (f.dna && f.dna.pure) GS.discovered[f.dna.pure] = (GS.discovered[f.dna.pure] || 0) + 1; });

      GS.started = true;
      console.log('✅ Game started! Fish count:', GS.fish.length);
      // Warm up AI species generation for upcoming unlocks
      setTimeout(warmUpSpeciesGeneration, 3000);

      try {
        SFX.startM();
      } catch (e) {
        console.log('Music start failed (ok):', e);
      }

      loadVolumeSettings();
      requestNotifPermission();
      // Save every 30s, deferred to idle time
      setInterval(() => { if ('requestIdleCallback' in window) requestIdleCallback(save, { timeout: 5000 }); else save(); }, 30000);

      // Auto-launch tutorial for first-time players, after a brief moment to let fish spawn
      if (!hadSave) {
        setTimeout(() => startTutorial(), 900);
      }
      // Dynamic browser tab title (updates every 5s)
      setInterval(() => {
        if (!GS.started) return;
        const hungry = GS.fish.filter(f => f.hunger < 30).length;
        document.title = hungry > 0
          ? `⚠️ Fish hungry! — Glopbix`
          : `🐙 Glopbix · ${GS.fish.length} fish · 🪙${Math.floor(GS.coins)}`;
      }, 5000);
      // ESC key closes the top-most open modal
      document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        const closers = [
          () => { const el = document.getElementById('shop-modal'); return el && el.classList.contains('active') && closeShop(); },
          () => { const el = document.getElementById('ach-modal'); return el && el.classList.contains('active') && closeAchievements(); },
          () => { const el = document.getElementById('settings-modal'); return el && el.classList.contains('active') && closeSettings(); },
          () => { const el = document.getElementById('food-modal'); return el && el.classList.contains('active') && closeFoodPicker(); },
          () => { const el = document.getElementById('adventure-modal'); return el && el.classList.contains('active') && closeAdventure(); },
          () => { const el = document.getElementById('instructions-modal'); return el && el.classList.contains('active') && closeInstructions(); },
        ];
        for (const fn of closers) { if (fn()) break; }
      });
      last = performance.now();
      console.log('🎮 Starting game loop...');
      requestAnimationFrame(loop);
    }

    // ============== EXPORT / IMPORT SAVE ==============
    function exportSave() {
      try {
        const raw = localStorage.getItem('glopbix_v7');
        if (!raw) { notify('No save data to export!', 'warning'); return; }
        const blob = new Blob([raw], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `glopbix_save_day${GS.day}.json`; a.click();
        URL.revokeObjectURL(url);
        notify('💾 Save exported!', 'success');
      } catch (e) { notify('Export failed: ' + e.message, 'danger'); }
    }
    function importSave() {
      const input = document.createElement('input');
      input.type = 'file'; input.accept = '.json,application/json';
      input.onchange = () => {
        const file = input.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          try {
            JSON.parse(ev.target.result); // validate
            localStorage.setItem('glopbix_v7', ev.target.result);
            notify('✅ Save imported! Reloading...', 'success');
            setTimeout(() => location.reload(), 1200);
          } catch (e) { notify('❌ Invalid save file!', 'danger'); }
        };
        reader.readAsText(file);
      };
      input.click();
    }

    // ============================================================
    //   PIXI.JS WebGL VISUAL LAYER
    //   GPU-accelerated: fish glow halos, caustic light, bubbles
    // ============================================================
    let _pApp = null;        // PIXI.Application
    let _pBubbles = [];      // GPU bubble sprites
    let _pFishGlows = {};    // Fish glow containers, keyed by fish.id
    let _pShimmer = null;    // Water caustic shimmer layer

    function initPixi() {
      if (_LOWEND) {
        console.log('[Glopbix] Pixi skipped on low-end device — Canvas 2D only');
        return;
      }
      if (!window.PIXI) {
        console.warn('[Glopbix] Pixi.js not loaded — running Canvas 2D only');
        return;
      }
      const aqWrap = document.getElementById('aquarium-wrap');
      const overlay = document.getElementById('pixi-overlay');
      if (!aqWrap || !overlay) return;

      try {
        _pApp = new PIXI.Application({
          view: overlay,
          width: aqWrap.clientWidth || 400,
          height: aqWrap.clientHeight || 600,
          backgroundAlpha: 0,
          antialias: false,                        // saves fill-rate on all devices
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true,
        });

        // Layer 0: water caustic shimmer
        _pShimmer = new PIXI.Graphics();
        _pApp.stage.addChild(_pShimmer);

        // Layer 1: GPU bubbles
        _initPBubbles();

        // Layer 2+: fish glows (added dynamically)

        window.addEventListener('resize', _resizePixi);
        console.log('[Glopbix] Pixi.js WebGL active ✓', _pApp.renderer.type === 1 ? 'WebGL' : 'Canvas');
      } catch (e) {
        console.warn('[Glopbix] Pixi init error:', e.message);
        _pApp = null;
      }
    }

    function _resizePixi() {
      if (!_pApp) return;
      const aq = document.getElementById('aquarium-wrap');
      if (!aq) return;
      _pApp.renderer.resize(aq.clientWidth, aq.clientHeight);
      _initPBubbles();
    }

    function _initPBubbles() {
      if (!_pApp) return;
      _pBubbles.forEach(b => { if (b.parent) b.parent.removeChild(b); try { b.destroy(); } catch (e) { } });
      _pBubbles = [];
      const SW = _pApp.screen.width, SH = _pApp.screen.height;
      const N = Math.min(100, Math.floor(SW * 0.14));
      for (let i = 0; i < N; i++) {
        const g = new PIXI.Graphics();
        const r = 1.5 + Math.random() * 4;
        g.lineStyle(0.8, 0xb8dfff, 0.55);
        g.beginFill(0xb8dfff, 0.04 + Math.random() * 0.04);
        g.drawCircle(0, 0, r);
        g.endFill();
        // Highlight glint
        g.beginFill(0xffffff, 0.35);
        g.drawCircle(-r * 0.3, -r * 0.3, r * 0.22);
        g.endFill();
        g._r = r;
        g._spd = 14 + Math.random() * 26;
        g._drift = (Math.random() - 0.5) * 5;
        g._wob = Math.random() * Math.PI * 2;
        g._wobSpd = 0.4 + Math.random() * 1.3;
        g.x = Math.random() * SW;
        g.y = Math.random() * SH;
        // Insert above shimmer (index 1)
        _pApp.stage.addChildAt(g, 1);
        _pBubbles.push(g);
      }
    }

    // Convert DNA HSL values to Pixi hex integer
    function _hslToHex(h, s, l) {
      h = ((h % 360) + 360) % 360;
      s = Math.max(20, Math.min(100, s)) / 100;
      l = Math.max(25, Math.min(75, l)) / 100;
      const a = s * Math.min(l, 1 - l);
      const f = n => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
      };
      return (f(0) << 16) | (f(8) << 8) | f(4);
    }

    let _lastQTick = 0;

    function renderPixiLayer(dt) {
      // Always animate SVG water even if Pixi failed
      _animateSVGWater();

      // Throttle quest progress checks to every 3 seconds
      const now = Date.now();
      if (now - _lastQTick > 3000) { _lastQTick = now; updateQuestProgress(); }

      if (!_pApp || !GS.started) return;

      const SW = _pApp.screen.width, SH = _pApp.screen.height;
      const t = now * 0.001;

      // ── GPU Bubbles ──
      _pBubbles.forEach(b => {
        b._wob += b._wobSpd * dt;
        b.y -= b._spd * dt;
        b.x += b._drift * dt + Math.sin(b._wob) * 0.3;
        b.alpha = 0.22 + Math.sin(b._wob * 0.45) * 0.14;
        if (b.y < -10) { b.y = SH + 10; b.x = Math.random() * SW; }
        if (b.x < -10) b.x = SW + 10;
        if (b.x > SW + 10) b.x = -10;
      });

      // ── Water Caustic Shimmer (light bands from above) ──
      _pShimmer.clear();
      for (let i = 0; i < 5; i++) {
        const bx = (Math.sin(t * 0.21 + i * 1.95) * 0.5 + 0.5) * SW;
        const bw = 18 + Math.sin(t * 0.6 + i * 1.1) * 10;
        const ba = 0.011 + Math.sin(t * 0.35 + i * 0.85) * 0.007;
        _pShimmer.beginFill(0xa8d4ff, ba);
        _pShimmer.drawRect(bx - bw * 0.5, 0, bw, SH * 0.5);
        _pShimmer.endFill();
      }

      // ── Fish Glow Halos (additive blend = bioluminescence) ──
      _updateFishGlows(t);
    }

    function _animateSVGWater() {
      if (_LOWEND) return; // SVG filter disabled on Android — no point animating it
      const turb = document.getElementById('water-turb');
      if (!turb) return;
      const ph = Date.now() * 0.000093;
      turb.setAttribute('baseFrequency',
        (0.012 + Math.sin(ph) * 0.0035).toFixed(5) + ' ' +
        (0.008 + Math.cos(ph * 0.71) * 0.0025).toFixed(5)
      );
    }

    function _updateFishGlows(t) {
      if (!_pApp) return;

      // Remove glows for fish that no longer exist
      const liveIds = {};
      GS.fish.forEach(f => { liveIds[f.id] = true; });
      Object.keys(_pFishGlows).forEach(id => {
        if (!liveIds[id]) {
          const ctr = _pFishGlows[id];
          if (ctr && ctr.parent) ctr.parent.removeChild(ctr);
          if (ctr) { try { ctr.destroy({ children: true }); } catch (e) { } }
          delete _pFishGlows[id];
        }
      });

      GS.fish.forEach(fish => {
        // Create glow container if new
        if (!_pFishGlows[fish.id]) {
          const ctr = new PIXI.Container();
          const g = new PIXI.Graphics();
          ctr.addChild(g);
          ctr.blendMode = PIXI.BLEND_MODES.ADD;
          const bf = new PIXI.filters.BlurFilter(Math.max(4, fish.size * 0.65));
          bf.quality = 3;
          ctr.filters = [bf];
          ctr._g = g; ctr._bf = bf;
          _pApp.stage.addChild(ctr);
          _pFishGlows[fish.id] = ctr;
        }

        const ctr = _pFishGlows[fish.id];
        const g = ctr._g;
        const rarity = fish.dna.rarity();
        const isLeg = rarity === 'Legendary';
        const isEpic = rarity === 'Epic';
        const isRare = rarity === 'Rare';

        // Pulsing glow intensity
        const seed = fish.id.charCodeAt ? fish.id.charCodeAt(0) : 42;
        const pulse = 0.80 + Math.sin(t * 1.8 + seed * 0.4) * 0.20;
        const baseA = isLeg ? 0.55 : isEpic ? 0.38 : isRare ? 0.26 : 0.16;
        const alpha = baseA * pulse * (0.45 + fish.happy * 0.0055);
        const radius = fish.size * (isLeg ? 2.5 : isEpic ? 2.1 : isRare ? 1.75 : 1.45);
        const col = _hslToHex(fish.dna.hue, fish.dna.sat, fish.dna.lit + 24);

        g.clear();
        g.beginFill(col, alpha);
        g.drawCircle(0, 0, radius);
        g.endFill();

        // Legendary: outer pulsing gold halo
        if (isLeg) {
          const gp = 0.25 + Math.sin(t * 2.5 + seed) * 0.18;
          g.lineStyle(2.5, 0xffd700, gp);
          g.drawCircle(0, 0, radius * 1.35);
          g.lineStyle(0);
          // Inner bright core
          g.beginFill(0xffffff, alpha * 0.25);
          g.drawCircle(0, 0, radius * 0.35);
          g.endFill();
        }

        ctr.x = fish.x;
        ctr.y = fish.y;
        ctr._bf.blur = Math.max(4, fish.size * (isLeg ? 1.15 : isEpic ? 0.85 : 0.65));
      });
    }

    // ============================================================
    //   DAILY QUEST SYSTEM
    // ============================================================
    const QUEST_POOL = [
      { id: 'q_feed3', icon: '🍽', label: 'Feed fish 3 times', stat: 'fed', target: 3, reward: { coins: 40 } },
      { id: 'q_feed5', icon: '🍽', label: 'Feed fish 5 times', stat: 'fed', target: 5, reward: { coins: 70 } },
      { id: 'q_feed10', icon: '🍽', label: 'Feed fish 10 times', stat: 'fed', target: 10, reward: { coins: 120, pearls: 1 } },
      { id: 'q_clean1', icon: '💧', label: 'Clean tank once', stat: 'cleaned', target: 1, reward: { coins: 20 } },
      { id: 'q_clean2', icon: '💧', label: 'Clean tank 2 times', stat: 'cleaned', target: 2, reward: { coins: 35 } },
      { id: 'q_clean5', icon: '💧', label: 'Clean tank 5 times', stat: 'cleaned', target: 5, reward: { coins: 100, pearls: 1 } },
      { id: 'q_breed', icon: '💕', label: 'Breed a fish', stat: 'bred', target: 1, reward: { coins: 80, pearls: 1 } },
      { id: 'q_catch', icon: '🎣', label: 'Catch a wild fish', stat: 'caught', target: 1, reward: { coins: 60 } },
      { id: 'q_harvest', icon: '✂️', label: 'Harvest a plant or coral', stat: 'harvested', target: 1, reward: { coins: 50 } },
      { id: 'q_happy', icon: '😊', label: 'Have 3+ very happy fish', stat: 'happyFish', target: 3, reward: { coins: 45 } },
      { id: 'q_legendary', icon: '⭐', label: 'Own a Legendary fish', stat: 'legendary', target: 1, reward: { coins: 200, pearls: 2 } },
    ];

    let QS = null;
    let _questPanelOpen = false;

    function initDailyQuests() {
      const today = new Date().toDateString();
      let saved = null;
      try { saved = JSON.parse(localStorage.getItem('glopbix_dq') || 'null'); } catch (e) { }

      if (saved && saved.date === today) {
        QS = saved;
      } else {
        // Pick 3 quests: 1 from easy tier (first 5), 2 from full pool
        const easy = QUEST_POOL.slice(0, 5);
        const all = [...QUEST_POOL];
        const pick = (arr) => { const i = Math.floor(Math.random() * arr.length); return arr.splice(i, 1)[0]; };
        const e1 = pick(easy);
        const rest = all.filter(q => q.id !== e1.id);
        const q2 = pick(rest);
        const q3 = pick(rest.filter(q => q.id !== q2.id));
        QS = {
          date: today,
          quests: [e1, q2, q3].map(q => ({ ...q, progress: 0, done: false, claimed: false })),
          baseStats: {
            fed: GS.stats.fed || 0,
            cleaned: GS.stats.cleaned || 0,
            bred: GS.stats.bred || 0,
            caught: GS.stats.caught || 0,
            harvested: GS.stats.harvested || 0,
          }
        };
        _saveQS();
      }

      const dateEl = document.getElementById('quest-date-label');
      if (dateEl) dateEl.textContent = new Date().toDateString();

      // Check if any unclaimed completed quests → show dot
      if (QS.quests.some(q => q.done && !q.claimed)) _showQuestDot();
    }

    function _saveQS() {
      try { localStorage.setItem('glopbix_dq', JSON.stringify(QS)); } catch (e) { }
    }

    function updateQuestProgress() {
      if (!QS || !GS.started) return;
      let changed = false;
      const bs = QS.baseStats || {};

      QS.quests.forEach(q => {
        if (q.claimed) return;
        let prog = q.progress;

        if (q.stat === 'fed') prog = Math.max(0, (GS.stats.fed || 0) - (bs.fed || 0));
        else if (q.stat === 'cleaned') prog = Math.max(0, (GS.stats.cleaned || 0) - (bs.cleaned || 0));
        else if (q.stat === 'bred') prog = Math.max(0, (GS.stats.bred || 0) - (bs.bred || 0));
        else if (q.stat === 'caught') prog = Math.max(0, (GS.stats.caught || 0) - (bs.caught || 0));
        else if (q.stat === 'harvested') prog = Math.max(0, (GS.stats.harvested || 0) - (bs.harvested || 0));
        else if (q.stat === 'happyFish') prog = (GS.fish || []).filter(f => f.happy > 75).length;
        else if (q.stat === 'legendary') prog = (GS.fish || []).some(f => f.dna.rarity() === 'Legendary') ? 1 : 0;

        if (prog !== q.progress) { q.progress = prog; changed = true; }
        if (!q.done && prog >= q.target) {
          q.done = true; changed = true;
          notify(q.icon + ' Quest complete: ' + q.label + '! Tap 📋 to claim.', 'success');
          SFX.levelUp();
          _showQuestDot();
        }
      });

      if (changed) { _saveQS(); if (_questPanelOpen) renderQuestPanel(); }
    }

    function claimQuestReward(idx) {
      if (!QS) return;
      const q = QS.quests[idx];
      if (!q || !q.done || q.claimed) return;
      q.claimed = true;
      GS.coins += q.reward.coins || 0;
      if (q.reward.pearls) GS.pearls += q.reward.pearls;
      SFX.levelUp(); HAP.success();
      notify('🎁 Claimed! +🪙' + (q.reward.coins || 0) + (q.reward.pearls ? ' +🫧' + q.reward.pearls : ''), 'success');
      _saveQS(); save();
      renderQuestPanel();
      if (QS.quests.every(q => !q.done || q.claimed)) {
        const dot = document.getElementById('quest-notif-dot');
        if (dot) dot.style.display = 'none';
      }
    }

    function toggleQuestPanel() {
      _questPanelOpen = !_questPanelOpen;
      const panel = document.getElementById('quest-panel');
      if (panel) panel.style.display = _questPanelOpen ? 'flex' : 'none';
      if (_questPanelOpen) {
        const dot = document.getElementById('quest-notif-dot');
        if (dot) dot.style.display = 'none';
        renderQuestPanel();
      }
    }

    function _showQuestDot() {
      if (_questPanelOpen) return;
      const dot = document.getElementById('quest-notif-dot');
      if (dot) dot.style.display = 'block';
    }

    function renderQuestPanel() {
      const el = document.getElementById('quest-panel-content');
      if (!el || !QS) return;
      el.innerHTML = QS.quests.map((q, i) => {
        const pct = Math.min(1, q.progress / q.target);
        const cls = q.claimed ? 'qclaimed' : q.done ? 'qdone' : '';
        const barBg = q.claimed ? '#a8ffb8' : q.done ? 'linear-gradient(90deg,#ffd700,#ffaa00)' : 'linear-gradient(90deg,#a8d8ff,#c9a8ff)';
        const labelCol = q.claimed ? '#a8ffb8' : q.done ? '#ffd700' : 'rgba(255,255,255,0.88)';
        return '<div class="quest-card ' + cls + '">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px">' +
          '<div style="font-family:Fredoka;font-size:13px;font-weight:700;color:' + labelCol + ';line-height:1.3">' +
          (q.claimed ? '🏅 ' : q.done ? '✅ ' : '') + q.icon + ' ' + q.label +
          '</div>' +
          '<div style="font-family:Fredoka;font-size:11px;color:#ffd700;white-space:nowrap;margin-left:8px">🪙' +
          q.reward.coins + (q.reward.pearls ? '+🫧' + q.reward.pearls : '') +
          '</div>' +
          '</div>' +
          '<div style="background:rgba(0,0,0,0.35);border-radius:8px;height:5px;margin-bottom:7px">' +
          '<div style="background:' + barBg + ';width:' + Math.round(pct * 100) + '%;height:100%;border-radius:8px;transition:width 0.5s"></div>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<span style="font-family:Fredoka;font-size:11px;color:rgba(255,255,255,0.38)">' + Math.min(q.progress, q.target) + ' / ' + q.target + '</span>' +
          (q.done && !q.claimed
            ? '<button class="quest-claim-btn" onclick="claimQuestReward(' + i + ')">Claim!</button>'
            : q.claimed ? '<span style="font-family:Fredoka;font-size:11px;color:#a8ffb8">Claimed ✓</span>' : '') +
          '</div>' +
          '</div>';
      }).join('');
    }


/* ============================================================
   JS BLOCK 4 (file was truncated — ends mid-function)
   ============================================================ */

// ============== TUTORIAL ==============
    let TUT = { step: 0, active: false };
    const TUT_STEPS = [
      {
        sel: null,
        mascot: '🐙', title: 'Welcome to Glopbix! 🎉',
        body: 'Hi! I am Glooby and I will teach you all about your aquarium. You will raise unique fish with their own DNA, like a cool scientist! 🧬',
        tip: '💡 Every fish in Glopbix has unique AI-generated DNA — millions of possible combinations. No two fish are ever the same!',
        pos: 'center', arrow: null
      },
      {
        sel: '#aquarium-wrap',
        mascot: '🌊', title: 'Your Aquarium 🏊',
        body: 'Your fish live here! Tap or click any fish to see its stats, DNA, rarity and value. Rare fish shimmer with special colors.',
        tip: '✨ Fish have 4 rarities: Common · Rare · Epic · Legendary. Try breeding a Legendary one!',
        pos: 'below', arrow: '👆'
      },
      {
        sel: '#btn-feed',
        mascot: '🍽️', title: 'Feed Your Fish 🍽',
        body: 'Throw food to your fish by tapping here. Hungry fish will swim toward it automatically. If you forget to feed them, they die! 😱',
        tip: '🐟 Tip: hungrier fish swim faster toward food. Well-fed fish are happier and generate more coins.',
        pos: 'above', arrow: '👇'
      },
      {
        sel: '#btn-clean',
        mascot: '💧', title: 'Clean the Water 💧',
        body: 'Fish dirty the water constantly. If the water gets too dirty, your plants get sick and fish get sad. Clean often!',
        tip: '🌿 Pro tip: buy plants from the Shop → Plants. Plants clean the water and feed fish automatically.',
        pos: 'above', arrow: '👇'
      },
      {
        sel: '#btn-breed',
        mascot: '💕', title: 'Breed Fish 💕',
        body: 'Select 2 fish and combine their DNA to create a unique offspring. Offspring inherit colors, patterns and size from their parents with random mutations!',
        tip: '🧬 The genetic system has 8+ genes: color, pattern, fin size, speed, and more. Two Epic parents can have a Legendary child.',
        pos: 'above', arrow: '👇'
      },
      {
        sel: '.btn-shop',
        mascot: '🏪', title: 'The Shop 🏪',
        body: 'Buy new fish species, special food, plants 🌿, corals 🪸, decorations and upgrades for your aquarium. There is a lot to explore!',
        tip: '🪸 New: plants grow on the tank floor and feed fish. Corals clean the water. Harvest them when mature to earn coins!',
        pos: 'above', arrow: '👇'
      },
      {
        sel: '#adventure-btn',
        mascot: '🌊', title: 'Ocean Adventure 🌊',
        body: 'Head out to the ocean with 4 mini-games! Catch rare fish in the Abyssal Hunt, dodge obstacles in the Reef Rush, face the Leviathan 🦈, or test your memory in DNA Codex 🧬.',
        tip: '🏆 Mini-games reward coins and pearls. DNA Codex perfect runs can summon rare visitor fish to your tank!',
        pos: 'above', arrow: '👇'
      },
      {
        sel: '#btn-revive',
        mascot: '✨', title: 'Revive Fish ✨',
        body: 'If a fish dies of hunger it goes to the graveyard. You can spend coins to bring it back. Rare fish are worth reviving!',
        tip: '⚰️ Tip: if you have a Legendary fish, make sure to feed it! Reviving can be costly.',
        pos: 'above', arrow: '👇'
      },
      {
        sel: null,
        mascot: '🎉', title: 'You are a true aquarist! 🏆',
        body: 'Collect all 77 species in the Encyclopedia 📖, unlock all achievements, accumulate coins and breed the ultimate fish. New species are generated by AI as you level up — the ocean has no limit!',
        tip: '🌟 Final goal: completing the Encyclopedia earns you 25 pearls + 2000 coins. Good luck!',
        pos: 'center', arrow: null
      }
    ];

    function startTutorial() {
      if (!GS.started) {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').classList.add('active');
        init();
      }
      TUT.step = 0; TUT.active = true;
      renderTutStep();
    }

    function renderTutStep() {
      const s = TUT_STEPS[TUT.step];
      const ov = document.getElementById('tutorial-overlay');
      const spot = document.getElementById('tut-spotlight');
      const box = document.getElementById('tut-box');
      const arr = document.getElementById('tut-arrow');

      ov.style.display = 'block';
      ov.style.pointerEvents = 'all';

      // Clear old highlights
      document.querySelectorAll('.tut-hl').forEach(e => e.classList.remove('tut-hl'));
      spot.style.opacity = '0';
      arr.style.display = 'none';

      // Fill content
      document.getElementById('tut-mascot').textContent = s.mascot || '🐙';
      document.getElementById('tut-title').textContent = s.title;
      document.getElementById('tut-body').textContent = s.body;
      document.getElementById('tut-step').textContent = `${TUT.step + 1} of ${TUT_STEPS.length}`;

      const tipEl = document.getElementById('tut-tip');
      if (s.tip) { tipEl.textContent = s.tip; tipEl.style.display = 'block'; }
      else { tipEl.style.display = 'none'; }

      document.getElementById('tut-prev').style.opacity = TUT.step === 0 ? '0.3' : '1';
      document.getElementById('tut-prev').style.pointerEvents = TUT.step === 0 ? 'none' : 'all';
      const isLast = TUT.step === TUT_STEPS.length - 1;
      document.getElementById('tut-next').textContent = isLast ? "Let's Play! 🎉" : 'Next →';

      // Progress dots
      document.getElementById('tut-dots').innerHTML = TUT_STEPS.map((_, i) => {
        const active = i === TUT.step;
        return `<div style="
      width:${active ? 18 : 7}px; height:7px; border-radius:4px;
      background:${active ? '#ff9dc6' : 'rgba(255,157,198,0.22)'};
      transition:width .3s,background .3s;
    "></div>`;
      }).join('');

      // Reflow so we can measure tut-box size
      box.style.top = box.style.bottom = box.style.left = box.style.transform = '';

      if (s.sel) {
        const el = document.querySelector(s.sel);
        if (el) {
          el.classList.add('tut-hl');
          const r = el.getBoundingClientRect();
          const pad = 10;
          const vw = window.innerWidth;
          const vh = window.innerHeight;

          // Spotlight (fixed coords)
          spot.style.left = (r.left - pad) + 'px';
          spot.style.top = (r.top - pad) + 'px';
          spot.style.width = (r.width + pad * 2) + 'px';
          spot.style.height = (r.height + pad * 2) + 'px';
          spot.style.opacity = '1';

          // Measure box height by forcing layout
          box.style.visibility = 'hidden';
          box.style.top = '0px'; box.style.left = '0px';
          const bw = box.offsetWidth || 280;
          const bh = box.offsetHeight || 240;
          box.style.visibility = '';

          // Horizontal: centre on element, clamp to viewport
          const margin = 8;
          let bLeft = Math.round(r.left + r.width / 2 - bw / 2);
          bLeft = Math.max(margin, Math.min(vw - bw - margin, bLeft));
          box.style.left = bLeft + 'px';

          // Vertical: prefer the side with more space
          const spaceAbove = r.top - pad;
          const spaceBelow = vh - r.bottom - pad;
          const gap = 14;

          if (spaceAbove >= bh + gap + 30 && s.pos === 'above') {
            // Box ABOVE the element
            box.style.top = 'auto';
            box.style.bottom = (vh - r.top + gap) + 'px';
            arr.style.display = 'block';
            arr.textContent = '👇';
            arr.style.left = (r.left + r.width / 2 - 12) + 'px';
            arr.style.top = (r.top - 38) + 'px';
          } else if (spaceBelow >= bh + gap) {
            // Box BELOW the element
            box.style.bottom = 'auto';
            box.style.top = (r.bottom + gap) + 'px';
            arr.style.display = 'block';
            arr.textContent = '👆';
            arr.style.left = (r.left + r.width / 2 - 12) + 'px';
            arr.style.top = (r.bottom + 2) + 'px';
          } else {
            // Not enough space above OR below — park at bottom of screen
            box.style.bottom = margin + 'px';
            box.style.top = 'auto';
            arr.style.display = 'none';
          }

          // Safety: make sure box doesn't go off top of screen
          const computedTop = parseFloat(box.style.top);
          if (!isNaN(computedTop) && computedTop < margin) {
            box.style.top = margin + 'px';
          }
        }
      } else {
        // No target element — centre in viewport
        spot.style.opacity = '0';
        arr.style.display = 'none';
        box.style.top = '50%';
        box.style.left = '50%';
        box.style.transform = 'translate(-50%, -50%)';
      }
    }

    function nextTutStep() {
      if (TUT.step >= TUT_STEPS.length - 1) { closeTutorial(); return; }
      TUT.step++; renderTutStep();
    }
    function prevTutStep() {
      if (TUT.step > 0) { TUT.step--; renderTutStep(); }
    }
    function closeTutorial() {
      document.getElementById('tutorial-overlay').style.display = 'none';
      document.querySelectorAll('.tut-hl').forEach(e => e.classList.remove('tut-hl'));
      TUT.active = false;
    }

    // ============== ENCYCLOPEDIA ==============
    // ============== ENCYCLOPEDIA (cached) ==============
    // Note: _encCache, _encCacheKey and getEncyclopedia() are defined earlier
    // in the main script block so updateUI() can access them.

    function calcEncyclopediaScore() {
      const owned = getEncyclopedia();
      const total = 12 + SPECIES_BLUEPRINTS.length; // 77
      const disc = Object.keys(owned).filter(k => k !== 'hybrid').length;
      const specPts = Math.round((disc / total) * 500);
      const fishPts = Math.min(200, GS.fish.length * 16);
      const dayPts = Math.min(120, GS.day * 5);
      const achPts = Math.min(100, Object.values(GS.achievements).filter(Boolean).length * 10);
      const breedPts = Math.min(80, (GS.discovered && GS.discovered.hybrid ? GS.discovered.hybrid : 0) * 4);
      return Math.min(1000, specPts + fishPts + dayPts + achPts + breedPts);
    }

    function speciesRarityLabel(id) {
      const s = SPECIES[id]; if (!s) return 'common';
      if (s.price >= 400) return 'Legendary';
      if (s.price >= 150) return 'Epic';
      if (s.price >= 50) return 'Rare';
      return 'Common';
    }

    function scoreRank(s) {
      if (s >= 950) return '🏆 Ocean Master';
      if (s >= 800) return '⭐ Grand Aquarist';
      if (s >= 600) return '🥇 Marine Expert';
      if (s >= 400) return '🥈 Advanced Hobbyist';
      if (s >= 200) return '🥉 Beginner';
      return '🐣 Just Getting Started';
    }

    const SPEC_EMOJIS = { goldfish: '🐠', guppy: '🐟', neon: '🐡', betta: '🐠', clown: '🤿', angel: '🐟', pleco: '🐟', shark: '🦈', axolotl: '🦎', turtle: '🐢', jelly: '🪼', star: '⭐' };
    // Merge AI species emojis (populated from blueprints above)
    Object.assign(SPEC_EMOJIS, AI_SPECIES_EMOJIS);
    const RARITY_COLS = { Common: '#a8d8ff', Rare: '#c9a8ff', Epic: '#ff9dc6', Legendary: '#ffd700' };

    function openEncyclopedia() {
      const owned = getEncyclopedia();
      const score = calcEncyclopediaScore();
      // Total = hardcoded + all AI blueprints (whether generated yet or not)
      const totalHardcoded = 12;
      const totalBlueprints = SPECIES_BLUEPRINTS.length;
      const total = totalHardcoded + totalBlueprints; // = 77
      const disc = Object.keys(owned).filter(k => k !== 'hybrid').length;
      const pct = Math.round(disc / total * 100);
      const hybCnt = GS.discovered && GS.discovered.hybrid ? GS.discovered.hybrid : 0;

      // Group blueprints by unlock status for the encyclopedia info
      const aiUnlocked = SPECIES_BLUEPRINTS.filter(bp => isSpeciesUnlocked(bp));
      const aiLocked = SPECIES_BLUEPRINTS.filter(bp => !isSpeciesUnlocked(bp));
      const nextUnlock = aiLocked.length > 0 ? aiLocked.reduce((a, b) => a.unlockLevel < b.unlockLevel ? a : b) : null;

      let h = `
    <div style="text-align:center;margin-bottom:14px">
      <div style="font-size:36px;margin-bottom:4px">📖</div>
      <div style="font-family:Fredoka;font-size:13px;color:var(--text-light)">${disc}/${total} species discovered · ${hybCnt} hybrids created</div>
      ${nextUnlock ? `<div style="font-family:Fredoka;font-size:11px;color:#c9a8ff;margin-top:2px">🔒 Next unlock: <b>${nextUnlock.name}</b> at Player Lv${nextUnlock.unlockLevel} · ${aiLocked.length} species still hidden</div>` : '<div style="font-family:Fredoka;font-size:11px;color:#a8ffb8;margin-top:2px">🌊 All species unlocked!</div>'}
      <div style="margin:10px auto;width:85%;height:12px;background:rgba(0,0,0,0.08);border-radius:10px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--accent-pink),var(--accent-blue));border-radius:10px;transition:width 0.8s ease"></div>
      </div>
      <div style="font-family:Fredoka;font-size:24px;font-weight:700;color:var(--accent-yellow)">${score} <span style="font-size:14px;color:var(--text-light)">/ 1000 pts</span></div>
      <div style="font-family:Fredoka;font-size:13px;color:var(--text-light);margin-top:2px">${scoreRank(score)}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;

      // Hardcoded species
      Object.entries(SPECIES).filter(([k]) => !k.startsWith('ai_')).forEach(([k, s]) => {
        const has = owned[k] > 0;
        const rar = speciesRarityLabel(k);
        const col = RARITY_COLS[rar] || '#a8d8ff';
        const emj = SPEC_EMOJIS[k] || '🐟';
        h += `
      <div style="padding:12px 8px;border-radius:16px;text-align:center;
        background:${has ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.03)'};
        border:2px solid ${has ? col : 'rgba(0,0,0,0.07)'};
        opacity:${has ? 1 : 0.45};transition:all 0.2s">
        <div style="font-size:30px;margin-bottom:4px">${has ? emj : '❓'}</div>
        <div style="font-family:Fredoka;font-size:13px;font-weight:700;color:var(--text-dark)">${has ? s.name : '???'}</div>
        ${has ? `<div style="font-size:10px;color:${col};font-weight:700;margin-top:2px">${rar}</div><div style="font-size:10px;color:var(--text-light)">× ${owned[k]}</div>` : ''}
      </div>`;
      });

      // AI species (unlocked)
      SPECIES_BLUEPRINTS.filter(bp => isSpeciesUnlocked(bp)).forEach(bp => {
        const s = SPECIES[bp.id];
        const has = s && owned[bp.id] > 0;
        const pending = GS.aiSpeciesPending[bp.id];
        const rar = s ? speciesRarityLabel(bp.id) : 'Common';
        const col = RARITY_COLS[rar] || '#a8d8ff';
        h += `
      <div style="padding:12px 8px;border-radius:16px;text-align:center;
        background:${has ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.03)'};
        border:2px solid ${has ? col : s ? 'rgba(0,0,0,0.07)' : 'rgba(201,168,255,0.2)'};
        opacity:${has || s ? 1 : 0.5};transition:all 0.2s">
        <div style="font-size:30px;margin-bottom:4px">${has ? bp.emoji : s ? '❓' : '⏳'}</div>
        <div style="font-family:Fredoka;font-size:13px;font-weight:700;color:var(--text-dark)">
          ${has ? bp.name : s ? '???' : pending ? 'Generating…' : bp.name + '?'}
        </div>
        ${has ? `<div style="font-size:10px;color:${col};font-weight:700;margin-top:2px">${rar}</div><div style="font-size:10px;color:var(--text-light)">× ${owned[bp.id]}</div>` : ''}
      </div>`;
      });

      // Locked (not yet unlocked)
      aiLocked.slice(0, 8).forEach(bp => {
        h += `
      <div style="padding:12px 8px;border-radius:16px;text-align:center;
        background:rgba(0,0,0,0.04);border:2px dashed rgba(0,0,0,0.08);opacity:0.4">
        <div style="font-size:30px;margin-bottom:4px">🔒</div>
        <div style="font-family:Fredoka;font-size:12px;color:var(--text-light)">Level ${bp.unlockLevel}</div>
      </div>`;
      });
      if (aiLocked.length > 8) {
        h += `<div style="grid-column:1/-1;text-align:center;padding:10px;font-family:Fredoka;font-size:12px;color:var(--text-light)">+${aiLocked.length - 8} more species locked — keep leveling up! 🌊</div>`;
      }

      h += `</div>
  <div style="margin-top:14px;padding:12px;background:rgba(255,222,125,0.15);border:2px solid var(--accent-yellow);border-radius:14px;font-size:12px;color:var(--text-dark)">
    💡 Buy from the Shop, breed hybrids and explore the ocean via <strong>Adventure</strong> to complete the encyclopedia.
  </div>`;

      document.getElementById('encyclopedia-content').innerHTML = h;
      document.getElementById('encyclopedia-modal').classList.add('active');
    }

    function closeEncyclopedia() { document.getElementById('encyclopedia-modal').classList.remove('active'); }

    // ============== ADVENTURE HUB ==============
    function openAdventure() {
      const CARDS = [
        {
          icon: '🤿', name: 'Abyssal Hunt',
          desc: 'Dive to extreme depths. The deeper you go, the rarer the fish. Watch your oxygen!',
          bg: 'linear-gradient(135deg,#0f172a,#1e3a5f)', btn: 'rgba(168,216,255,0.85)', onclick: "openAbyss()",
          tags: ['🐟 Common', '🐠 Rare', '🐡 Epic', '🦑 Legendary']
        },
        {
          icon: '🪸', name: 'Reef Rush',
          desc: 'Frantic runner through coral. Dodge jellyfish and sharks while collecting exotic fish.',
          bg: 'linear-gradient(135deg,#064e3b,#065f46)', btn: 'rgba(168,255,184,0.85)', onclick: "openReef()",
          tags: ['⏱ 30 seconds', '❤️ 3 lives', '⚡ Speed increases']
        },
        {
          icon: '🦈', name: 'The Leviathan',
          desc: 'A legendary creature rises from the deep! Follow the symbol sequence to defeat it.',
          bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', btn: 'rgba(201,168,255,0.85)', onclick: "openLeviathan()",
          tags: ['⚡ 8 moves', '💥 Epic QTE', '🪙 Big reward']
        },
        {
          icon: '🧬', name: 'DNA Codex',
          desc: 'Study the secret color code written in fish DNA. Memorize the sequence, then recreate it. The longer the chain, the bigger the reward.',
          bg: 'linear-gradient(135deg,#0a1628,#0d3b2e)', btn: 'rgba(168,255,184,0.9)', onclick: "openDNACodex()",
          tags: ['🎯 Memory game', '🔬 6 levels', '💎 Rare fish unlock']
        }
      ];
      let h = '';
      CARDS.forEach(c => {
        h += `
    <div onclick="${c.onclick}" style="background:${c.bg};border-radius:20px;padding:16px;margin-bottom:10px;cursor:pointer;border:1px solid rgba(255,255,255,0.08);transition:transform 0.2s;user-select:none"
      onmouseenter="this.style.transform='scale(1.02)'" onmouseleave="this.style.transform='scale(1)'">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="font-size:46px;min-width:56px;text-align:center">${c.icon}</div>
        <div style="flex:1">
          <div style="font-family:Fredoka;font-size:16px;font-weight:700;color:white;margin-bottom:4px">${c.name}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.65);line-height:1.4;margin-bottom:8px">${c.desc}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${c.tags.map(t => `<span style="background:rgba(255,255,255,0.12);padding:2px 8px;border-radius:20px;font-size:10px;color:rgba(255,255,255,0.7);font-family:Fredoka">${t}</span>`).join('')}
          </div>
        </div>
        <button onclick="event.stopPropagation();${c.onclick}" style="background:${c.btn};border:none;border-radius:12px;padding:9px 14px;font-family:Fredoka;font-size:13px;font-weight:700;cursor:pointer;color:#333;white-space:nowrap;min-width:64px">Play →</button>
      </div>
    </div>`;
      });
      document.getElementById('adventure-cards').innerHTML = h;
      document.getElementById('adventure-modal').classList.add('active');
    }
    function closeAdventure() { document.getElementById('adventure-modal').classList.remove('active'); }

    // ============== MINI-GAME 1: ABYSSAL HUNT ==============
    let AH = null;

    function openAbyss() {
      closeAdventure();
      document.getElementById('abyss-result').style.display = 'none';
      document.getElementById('abyss-modal').classList.add('active');
      setTimeout(startAbyssGame, 80);
    }
    function closeAbyss() {
      if (AH) { AH.running = false; AH = null; }
      document.getElementById('abyss-modal').classList.remove('active');
    }

    function startAbyssGame() {
      const cv = document.getElementById('abyss-canvas');
      const c = cv.getContext('2d');
      const W = 400, H = 370;
      AH = { running: true, ox: 100, depth: 0, fish: [], caught: [], spawnT: 0, t: 0, score: 0, done: false, mx: W / 2, flash: null };

      cv.onmousemove = e => { const r = cv.getBoundingClientRect(); if (AH) AH.mx = (e.clientX - r.left) * (W / r.width); };
      cv.ontouchmove = e => { e.preventDefault(); const r = cv.getBoundingClientRect(); if (AH) AH.mx = (e.touches[0].clientX - r.left) * (W / r.width); };
      cv.onclick = e => {
        if (!AH || AH.done) return;
        const r = cv.getBoundingClientRect();
        const cx = (e.clientX - r.left) * (W / r.width);
        const cy = (e.clientY - r.top) * (H / r.height);
        for (let i = AH.fish.length - 1; i >= 0; i--) {
          const f = AH.fish[i];
          if (Math.hypot(cx - f.x, cy - f.y) < f.sz + 16) {
            AH.caught.push(f); AH.score += f.val;
            AH.flash = { x: f.x, y: f.y, t: 0.8, col: f.col, val: f.val, emoji: f.emoji };
            AH.fish.splice(i, 1); SFX.pop(); break;
          }
        }
      };

      const TIERS = [
        { minD: 0, emoji: '🐟', val: 15, sz: 13, col: '#ffd700', label: '' },
        { minD: 180, emoji: '🐠', val: 45, sz: 17, col: '#a8d8ff', label: 'Rare' },
        { minD: 420, emoji: '🐡', val: 120, sz: 21, col: '#c9a8ff', label: 'Epic' },
        { minD: 800, emoji: '🦑', val: 350, sz: 26, col: '#ff9dc6', label: '✨ Legendary' }
      ];

      function spawnFish() {
        const avail = TIERS.filter(t => AH.depth >= t.minD);
        const r = Math.random();
        let tier = avail[0];
        if (avail.length > 1 && r > 0.58) tier = avail[1];
        if (avail.length > 2 && r > 0.84) tier = avail[2];
        if (avail.length > 3 && r > 0.96) tier = avail[3];
        const dir = Math.random() > 0.5 ? 1 : -1;
        AH.fish.push({ x: dir > 0 ? -tier.sz : W + tier.sz, y: 55 + Math.random() * (H - 120), vx: dir * (1 + Math.random() * 2.2), phase: Math.random() * 6.28, ...tier });
      }

      let last = performance.now();
      function loop(now) {
        if (!AH || !AH.running) return;
        const dt = Math.min((now - last) / 1000, 0.05); last = now;
        AH.t += dt; AH.depth += dt * 32;
        AH.ox -= dt * (2.2 + AH.depth * 0.0015);
        if (AH.ox <= 0) { AH.ox = 0; finishAbyss(); return; }
        AH.spawnT -= dt;
        if (AH.spawnT <= 0) { spawnFish(); AH.spawnT = 0.75 + Math.random() * 1.1; }
        for (let i = AH.fish.length - 1; i >= 0; i--) {
          const f = AH.fish[i]; f.x += f.vx; f.phase += dt * 2; f.y += Math.sin(f.phase) * 0.4;
          if (f.x < -60 || f.x > W + 60) AH.fish.splice(i, 1);
        }
        if (AH.flash) { AH.flash.t -= dt * 1.8; if (AH.flash.t <= 0) AH.flash = null; }

        // Background (deepens with depth)
        const df = Math.min(1, AH.depth / 1100);
        const bg = c.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, `hsl(215,80%,${55 - df * 42}%)`); bg.addColorStop(1, `hsl(228,75%,${26 - df * 20}%)`);
        c.fillStyle = bg; c.fillRect(0, 0, W, H);

        // Floating particles (bubbles rising)
        c.fillStyle = 'rgba(255,255,255,0.1)';
        for (let i = 0; i < 7; i++) {
          const bx = ((i * 107 + AH.t * 22 * (i % 2 ? 1 : -1)) % W + W) % W;
          const by = (H - ((AH.t * 55 + i * 60) % (H - 20) + H) % H);
          c.beginPath(); c.arc(bx, Math.max(5, by), 1 + i % 3, 0, 6.283); c.fill();
        }

        // Depth zone label
        const zoneLabels = [{ d: 0, col: 'rgba(255,255,255,0.35)', t: 'Surface Zone · Common Fish' }, { d: 180, col: 'rgba(168,216,255,0.45)', t: 'Mid Zone · Rare Fish' }, { d: 420, col: 'rgba(201,168,255,0.5)', t: 'Deep Zone · Epic Fish' }, { d: 800, col: 'rgba(255,157,198,0.6)', t: '✨ Abyss · Legendary Creatures' }];
        const zone = [...zoneLabels].reverse().find(z => AH.depth >= z.d) || zoneLabels[0];
        c.fillStyle = zone.col; c.font = '10px Fredoka'; c.textAlign = 'center'; c.fillText(zone.t, W / 2, H - 8);

        // Fish
        AH.fish.forEach(f => {
          c.save(); c.translate(f.x, f.y); c.scale(f.vx > 0 ? 1 : -1, 1);
          if (f.label) { c.shadowColor = f.col; c.shadowBlur = 15; }
          c.font = `${f.sz * 1.6}px serif`; c.textAlign = 'center'; c.fillText(f.emoji, 0, f.sz / 2); c.shadowBlur = 0;
          if (f.label) { c.scale(f.vx > 0 ? 1 : -1, 1); c.fillStyle = f.col; c.font = `bold 9px Fredoka`; c.fillText(f.label, 0, -f.sz / 2 - 5); }
          c.restore();
        });

        // Catch flash
        if (AH.flash) {
          c.save(); c.globalAlpha = Math.max(0, AH.flash.t);
          c.font = '20px serif'; c.textAlign = 'center'; c.fillText('✨', AH.flash.x, AH.flash.y - 10);
          c.fillStyle = AH.flash.col; c.font = 'bold 13px Fredoka'; c.fillText('+' + AH.flash.val, AH.flash.x, AH.flash.y - 28);
          c.restore();
        }

        // Player diver + crosshair line
        const px = Math.max(20, Math.min(W - 20, AH.mx));
        c.save(); c.translate(px, H - 48);
        c.strokeStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 1; c.setLineDash([4, 8]);
        c.beginPath(); c.moveTo(0, -10); c.lineTo(0, -(H - 70)); c.stroke(); c.setLineDash([]);
        c.font = '28px serif'; c.textAlign = 'center'; c.fillText('🤿', 0, 12); c.restore();

        // Oxygen bar
        c.fillStyle = 'rgba(0,0,0,0.45)'; c.beginPath(); c.roundRect(8, 8, 148, 18, 9); c.fill();
        const oxc = AH.ox > 50 ? '#42e6c5' : AH.ox > 25 ? '#ffde7d' : '#ff4444';
        c.fillStyle = oxc; c.beginPath(); c.roundRect(8, 8, AH.ox * 1.48, 18, 9); c.fill();
        c.fillStyle = '#fff'; c.font = 'bold 10px Fredoka'; c.textAlign = 'left'; c.fillText('💨 Oxygen', 13, 22);

        // Score chip
        c.fillStyle = 'rgba(0,0,0,0.4)'; c.beginPath(); c.roundRect(W / 2 - 46, 8, 92, 18, 9); c.fill();
        c.fillStyle = '#ffd700'; c.font = 'bold 12px Fredoka'; c.textAlign = 'center'; c.fillText('🪙 ' + AH.score, W / 2, 22);

        // Depth chip
        c.fillStyle = 'rgba(255,255,255,0.18)'; c.font = 'bold 11px Fredoka'; c.textAlign = 'right'; c.fillText(Math.floor(AH.depth) + 'm', W - 8, 22);

        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    }

    function finishAbyss() {
      if (!AH || AH.done) return;
      AH.done = true; AH.running = false;
      GS.coins += AH.score;
      // Pearl reward for deep dives
      if (AH.depth > 600) { GS.pearls = (GS.pearls || 0) + 2; notify('🤿 Deep dive bonus: +🫧2 pearls', 'success'); }
      else if (AH.depth > 300) { GS.pearls = (GS.pearls || 0) + 1; notify('🤿 Good expedition: +🫧1 pearl', 'success'); }
      save();
      document.getElementById('abyss-caught-count').textContent = AH.caught.length;
      document.getElementById('abyss-reward').textContent = AH.score;
      document.getElementById('abyss-result').style.display = 'flex';
      if (AH.score > 0) SFX.caught();
    }
    function surfaceEarly() { if (AH && !AH.done) finishAbyss(); }

    // ============== MINI-GAME 2: REEF RUSH ==============
    let RR = null;

    function openReef() {
      closeAdventure();
      document.getElementById('reef-result').style.display = 'none';
      document.getElementById('reef-modal').classList.add('active');
      setTimeout(startReefGame, 80);
    }
    function closeReef() {
      if (RR) { RR.running = false; RR = null; }
      document.getElementById('reef-modal').classList.remove('active');
    }

    function startReefGame() {
      const cv = document.getElementById('reef-canvas');
      const c = cv.getContext('2d');
      const W = 400, H = 300, PX = 70;
      RR = { running: true, py: H / 2, pvy: 0, lives: 3, score: 0, t: 0, spawnT: 0, items: [], done: false, scrollX: 0, collected: 0, speed: 3 };

      cv.onclick = handleReefInput;
      cv.ontouchstart = e => { e.preventDefault(); handleReefInput(); };

      function handleReefInput() {
        if (!RR || RR.done) return;
        RR.pvy = -320; SFX.pop();
      }

      const OBS = ['🪼', '🦈', '🦀', '💣'];
      const FISH2 = ['🐟', '🐠', '🐡', '🦐', '🐙'];

      function spawnItem() {
        const obs = Math.random() < 0.42;
        RR.items.push({
          x: W + 30, y: 55 + Math.random() * (H - 110),
          speed: RR.speed, obstacle: obs,
          emoji: obs ? OBS[Math.floor(Math.random() * OBS.length)] : FISH2[Math.floor(Math.random() * FISH2.length)],
          val: obs ? 0 : 20 + Math.floor(RR.t * 3),
          hit: false, flashT: 0
        });
      }

      let last = performance.now();
      const DURATION = 30;

      function loop(now) {
        if (!RR || !RR.running) return;
        const dt = Math.min((now - last) / 1000, 0.05); last = now;
        if (RR.done) return;
        RR.t += dt; RR.scrollX += dt * 75; RR.speed = 3 + RR.t * 0.08;
        if (RR.t >= DURATION || RR.lives <= 0) { finishReef(); return; }

        // Physics - single dt integration
        RR.pvy += dt * 480; RR.py += RR.pvy * dt;
        if (RR.py < 32) { RR.py = 32; RR.pvy = 0; }
        if (RR.py > H - 32) { RR.py = H - 32; RR.pvy = 0; }

        RR.spawnT -= dt;
        if (RR.spawnT <= 0) { spawnItem(); RR.spawnT = 0.5 + Math.random() * 0.75; }

        // Items
        for (let i = RR.items.length - 1; i >= 0; i--) {
          const item = RR.items[i];
          item.x -= item.speed * 60 * dt;
          if (item.flashT > 0) item.flashT -= dt * 3;
          if (item.x < -50) { RR.items.splice(i, 1); continue; }
          if (!item.hit && Math.hypot(PX - item.x, RR.py - item.y) < 24) {
            item.hit = true; item.flashT = 1;
            if (item.obstacle) { RR.lives--; item.emoji = '💥'; SFX.err(); }
            else { RR.score += item.val; RR.collected++; item.emoji = '✨'; SFX.pop(); }
          }
        }

        // Draw
        const bg2 = c.createLinearGradient(0, 0, 0, H);
        bg2.addColorStop(0, '#0284c7'); bg2.addColorStop(0.7, '#0891b2'); bg2.addColorStop(1, '#065f46');
        c.fillStyle = bg2; c.fillRect(0, 0, W, H);

        // Light rays
        c.fillStyle = 'rgba(255,255,255,0.04)';
        for (let i = 0; i < 4; i++) {
          const rx = ((i * 110 - RR.scrollX * 0.12) % W + W) % W;
          c.beginPath(); c.moveTo(rx, 0); c.lineTo(rx + 25, 0); c.lineTo(rx + 10, H); c.fill();
        }

        // Scrolling coral
        c.fillStyle = 'rgba(255,100,160,0.25)';
        for (let i = 0; i < 10; i++) {
          const cx = ((i * 48 - RR.scrollX * 0.28) % W + W) % W;
          for (let j = 0; j < 3; j++) { c.beginPath(); c.ellipse(cx + j * 7 - 7, H, 2.5, 8 + j * 4, 0, 0, Math.PI); c.fill(); }
        }

        // Items
        RR.items.forEach(item => {
          c.save(); c.globalAlpha = item.hit ? Math.max(0, item.flashT) : 1;
          c.font = '24px serif'; c.textAlign = 'center'; c.fillText(item.emoji, item.x, item.y + 8);
          if (!item.hit && !item.obstacle) { c.fillStyle = '#ffd700'; c.font = 'bold 9px Fredoka'; c.fillText('+' + item.val, item.x, item.y - 20); }
          c.restore();
        });

        // Player
        c.font = '26px serif'; c.textAlign = 'center'; c.fillText('🐙', PX, RR.py + 10);
        // Motion trail
        c.fillStyle = 'rgba(168,216,255,0.2)';
        c.beginPath(); c.ellipse(PX - 15, RR.py, 8, 4, 0, 0, 6.283); c.fill();

        // Timer bar (top)
        const tl = DURATION - RR.t;
        c.fillStyle = 'rgba(0,0,0,0.35)'; c.fillRect(0, 0, W, 6);
        c.fillStyle = tl > 10 ? '#42e6c5' : tl > 5 ? '#ffde7d' : '#ff4444';
        c.fillRect(0, 0, W * (tl / DURATION), 6);

        // HUD strip
        c.fillStyle = 'rgba(0,0,0,0.45)'; c.fillRect(0, 6, W, 26);
        // Lives - clamped to prevent RangeError on repeat()
        const livesShow = Math.max(0, Math.min(3, RR.lives));
        c.font = '14px serif'; c.textAlign = 'left';
        c.fillText('❤️'.repeat(livesShow) + '🖤'.repeat(3 - livesShow), 8, 26);
        // Score
        c.fillStyle = '#ffd700'; c.font = 'bold 13px Fredoka'; c.textAlign = 'center'; c.fillText('🪙 ' + RR.score, W / 2, 26);
        // Time
        c.fillStyle = '#fff'; c.font = 'bold 12px Fredoka'; c.textAlign = 'right'; c.fillText('⏱ ' + Math.ceil(tl) + 's', W - 8, 26);

        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    }

    function finishReef() {
      if (!RR || RR.done) return;
      RR.done = true; RR.running = false;
      GS.coins += RR.score;
      if (RR.collected >= 8) { GS.pearls = (GS.pearls || 0) + 2; notify('🪸 Reef conquered! +🫧2 pearls', 'success'); }
      else if (RR.collected >= 4) { GS.pearls = (GS.pearls || 0) + 1; notify('🪸 Good reef run! +🫧1 pearl', 'success'); }
      save();
      document.getElementById('reef-caught-count').textContent = RR.collected;
      document.getElementById('reef-reward').textContent = RR.score;
      document.getElementById('reef-result').style.display = 'flex';
      if (RR.score > 0) SFX.buy();
    }

    // ============== MINI-GAME 3: LEVIATHAN ==============
    let LEV = null;
    const LEV_SYMS = [
      { emoji: '🔴', col: '#ff4444' },
      { emoji: '🔵', col: '#4499ff' },
      { emoji: '🟡', col: '#ffdd00' },
      { emoji: '🟢', col: '#44dd44' }
    ];

    function openLeviathan() {
      closeAdventure();
      document.getElementById('leviathan-result').style.display = 'none';
      document.getElementById('lev-buttons').innerHTML = '';
      document.getElementById('leviathan-modal').classList.add('active');
      setTimeout(startLevGame, 80);
    }
    function closeLeviathan() {
      if (LEV) { LEV.running = false; if (LEV._iv) clearInterval(LEV._iv); LEV = null; }
      document.getElementById('leviathan-modal').classList.remove('active');
    }

    function startLevGame() {
      const cv = document.getElementById('lev-canvas');
      const c = cv.getContext('2d');
      const W = 400, H = 240, SEQ = 8;

      LEV = {
        running: true, done: false, t: 0,
        hp: 100, hits: 0, misses: 0, score: 0,
        seq: Array.from({ length: SEQ }, () => Math.floor(Math.random() * LEV_SYMS.length)),
        cur: 0, promptT: 0, timePerPrompt: 2.5,
        phase: 'approach', feedback: null, fbT: 0
      };

      // Canvas render loop
      let last = performance.now();
      function renderCanvas(now) {
        if (!LEV || !LEV.running) return;
        const dt = Math.min((now - last) / 1000, 0.05); last = now;
        LEV.t += dt; if (LEV.fbT > 0) LEV.fbT -= dt * 2;

        // BG
        const bg = c.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, '#0f0a2e'); bg.addColorStop(1, '#1a0540');
        c.fillStyle = bg; c.fillRect(0, 0, W, H);

        // Ambient particles
        c.fillStyle = 'rgba(255,255,255,0.12)';
        for (let i = 0; i < 12; i++) {
          const px = ((i * 171 + LEV.t * 12 * (i % 2 ? 1 : -1)) % W + W) % W;
          const py = ((i * 89 + LEV.t * 7) % H + H) % H;
          c.beginPath(); c.arc(px, py, 0.7 + i % 2, 0, 6.283); c.fill();
        }

        // Creature
        const sc = LEV.phase === 'approach' ? Math.min(1, LEV.t * 0.65) : 1;
        const shake = LEV.fbT > 0 && LEV.feedback === 'hit' ? Math.sin(LEV.t * 55) * 5 : 0;
        const hpPct = Math.max(0, LEV.hp / 100);
        c.save(); c.translate(W * 0.62 + shake, H * 0.52); c.scale(sc, sc);
        c.shadowColor = 'rgba(139,92,246,0.7)'; c.shadowBlur = 50 * (0.3 + hpPct * 0.7);
        c.font = `${80 + hpPct * 18}px serif`; c.textAlign = 'center'; c.fillText('🦈', 0, 28); c.shadowBlur = 0;
        c.restore();

        // HP bar
        c.fillStyle = 'rgba(0,0,0,0.5)'; c.beginPath(); c.roundRect(W / 2 - 90, 10, 180, 14, 7); c.fill();
        const hpCol = hpPct > 0.5 ? '#ff4444' : hpPct > 0.25 ? '#ff8800' : '#ff2200';
        c.fillStyle = hpCol; c.beginPath(); c.roundRect(W / 2 - 90, 10, 180 * hpPct, 14, 7); c.fill();
        c.fillStyle = '#fff'; c.font = 'bold 9px Fredoka'; c.textAlign = 'center'; c.fillText('LEVIATHAN HP', W / 2, 20);

        // Current prompt symbol (big) during fight
        if (LEV.phase === 'fight' && LEV.cur < LEV.seq.length && !LEV.done) {
          const sym = LEV_SYMS[LEV.seq[LEV.cur]];
          const pulse = 1 + Math.sin(LEV.t * 8) * 0.06;
          c.save(); c.translate(W * 0.26, H * 0.55); c.scale(pulse, pulse);
          c.shadowColor = sym.col; c.shadowBlur = 30;
          c.font = '56px serif'; c.textAlign = 'center'; c.fillText(sym.emoji, 0, 20); c.shadowBlur = 0;
          c.restore();
          // Time bar under prompt
          const pct = LEV.promptT / LEV.timePerPrompt;
          c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(16, H - 14, W * 0.4 - 8, 8);
          c.fillStyle = pct > 0.5 ? '#42e6c5' : pct > 0.25 ? '#ffde7d' : '#ff4444';
          c.fillRect(16, H - 14, (W * 0.4 - 8) * pct, 8);
        }

        // Approach text
        if (LEV.phase === 'approach') {
          c.fillStyle = 'rgba(255,255,255,0.75)'; c.font = 'bold 15px Fredoka'; c.textAlign = 'left';
          const dots = '.'.repeat(Math.floor(LEV.t * 3) % 4);
          c.fillText('The Leviathan approaches' + dots, 16, H - 18);
        }

        // Feedback text
        if (LEV.fbT > 0) {
          c.save(); c.globalAlpha = Math.max(0, LEV.fbT);
          c.fillStyle = LEV.feedback === 'hit' ? '#42e6c5' : '#ff5555';
          c.font = 'bold 18px Fredoka'; c.textAlign = 'left';
          c.fillText(LEV.feedback === 'hit' ? '💥 IMPACT!' : '❌ MISSED!', 16, H - 32);
          c.restore();
        }

        // Progress
        if (LEV.phase === 'fight') {
          c.fillStyle = 'rgba(255,255,255,0.4)'; c.font = '10px Fredoka'; c.textAlign = 'right';
          c.fillText(LEV.cur + '/' + LEV.seq.length, W - 10, H - 16);
        }

        requestAnimationFrame(renderCanvas);
      }
      requestAnimationFrame(renderCanvas);

      // Start fight after approach animation
      setTimeout(() => {
        if (!LEV) return;
        LEV.phase = 'fight';
        renderLevButtons();
      }, 1600);
    }

    function renderLevButtons() {
      if (!LEV || LEV.cur >= LEV.seq.length || LEV.done) return;
      const cont = document.getElementById('lev-buttons');
      let h = '<div style="display:flex;gap:10px;justify-content:center">';
      LEV_SYMS.forEach((sym, i) => {
        h += `<button class="lev-btn" id="lev-btn-${i}" onclick="levTap(${i})">${sym.emoji}</button>`;
      });
      h += '</div>';
      cont.innerHTML = h;

      // Prompt timer interval
      if (LEV._iv) clearInterval(LEV._iv);
      LEV.promptT = LEV.timePerPrompt;
      LEV._iv = setInterval(() => {
        if (!LEV || LEV.done) { clearInterval(LEV._iv); return; }
        LEV.promptT -= 0.05;
        if (LEV.promptT <= 0) {
          clearInterval(LEV._iv);
          LEV.misses++; LEV.feedback = 'miss'; LEV.fbT = 1;
          levAdvance();
        }
      }, 50);
    }

    function levTap(i) {
      if (!LEV || LEV.phase !== 'fight' || LEV.done || LEV.cur >= LEV.seq.length) return;
      clearInterval(LEV._iv);
      const correct = i === LEV.seq[LEV.cur];
      if (correct) {
        LEV.hits++; LEV.hp -= 100 / LEV.seq.length; LEV.score += 140;
        LEV.feedback = 'hit'; LEV.fbT = 1; SFX.pop();
        const btn = document.getElementById('lev-btn-' + i);
        if (btn) { btn.classList.add('correct-flash'); setTimeout(() => btn.classList.remove('correct-flash'), 300); }
      } else {
        LEV.misses++; LEV.feedback = 'miss'; LEV.fbT = 1; SFX.err();
        const btn = document.getElementById('lev-btn-' + i);
        if (btn) { btn.classList.add('wrong-flash'); setTimeout(() => btn.classList.remove('wrong-flash'), 300); }
      }
      setTimeout(levAdvance, 280);
    }

    function levAdvance() {
      if (!LEV) return;
      LEV.cur++;
      if (LEV.cur >= LEV.seq.length) { setTimeout(levFinish, 300); }
      else { renderLevButtons(); }
    }

    function levFinish() {
      if (!LEV || LEV.done) return;
      LEV.done = true; LEV.running = false;
      if (LEV._iv) clearInterval(LEV._iv);
      document.getElementById('lev-buttons').innerHTML = '';
      const success = LEV.hits >= Math.ceil(LEV.seq.length * 0.5);
      const reward = success ? LEV.score + 600 : Math.floor(LEV.score * 0.25);
      GS.coins += reward; save();
      document.getElementById('lev-result-icon').textContent = success ? '🏆' : '😔';
      document.getElementById('lev-result-title').textContent = success ? 'Leviathan Defeated!' : 'The Leviathan Escaped...';
      document.getElementById('lev-result-msg').textContent = success ? `${LEV.hits}/${LEV.seq.length} hits! Perfect timing!` : `${LEV.hits}/${LEV.seq.length} hits. Try again!`;
      document.getElementById('lev-reward').textContent = reward;
      document.getElementById('leviathan-result').style.display = 'flex';
      if (success) { SFX.levelUp(); if (LEV.hits >= LEV.seq.length) { GS.pearls = (GS.pearls || 0) + 3; notify('🦈 Perfect! +🫧3 pearls', 'success'); save(); } }
    }

    // ============== MINI-GAME 4: DNA CODEX ==============
    let DC = null;

    // DNA color palette — mirrors game rarity colors
    const DC_GENES = [
      { id: 'A', col: '#ff9dc6', label: 'Pink', glow: 'rgba(255,157,198,0.7)' },
      { id: 'T', col: '#a8d8ff', label: 'Blue', glow: 'rgba(168,216,255,0.7)' },
      { id: 'G', col: '#a8ffb8', label: 'Green', glow: 'rgba(168,255,184,0.7)' },
      { id: 'C', col: '#ffde7d', label: 'Yellow', glow: 'rgba(255,222,125,0.7)' },
      { id: 'X', col: '#c9a8ff', label: 'Purple', glow: 'rgba(201,168,255,0.7)' },
      { id: 'Z', col: '#ff8050', label: 'Orange', glow: 'rgba(255,128,80,0.7)' }
    ];

    // Difficulty levels: how many genes, how long to show, how many rounds
    const DC_LEVELS = [
      { seq: 3, showMs: 2600, rounds: 1, reward: 120, label: 'Strand I' },
      { seq: 4, showMs: 2400, rounds: 1, reward: 200, label: 'Strand II' },
      { seq: 5, showMs: 2200, rounds: 2, reward: 310, label: 'Helix I' },
      { seq: 6, showMs: 2000, rounds: 2, reward: 450, label: 'Helix II' },
      { seq: 7, showMs: 1800, rounds: 3, reward: 620, label: 'Genome I' },
      { seq: 8, showMs: 1500, rounds: 3, reward: 900, label: 'Genome II' }
    ];

    function openDNACodex() {
      closeAdventure();
      document.getElementById('dna-result').style.display = 'none';
      document.getElementById('dna-buttons').innerHTML = '';
      document.getElementById('dna-codex-modal').classList.add('active');
      setTimeout(() => startDNACodexLevel(0), 100);
    }

    function closeDNACodex() {
      if (DC) { DC.running = false; DC = null; }
      document.getElementById('dna-codex-modal').classList.remove('active');
    }

    function startDNACodexLevel(lvlIdx) {
      const cfg = DC_LEVELS[lvlIdx] || DC_LEVELS[DC_LEVELS.length - 1];
      const seqLen = cfg.seq;
      // Build random sequence using available genes (more genes at higher levels)
      const genePool = DC_GENES.slice(0, Math.min(4 + Math.floor(lvlIdx / 2), DC_GENES.length));
      const sequence = Array.from({ length: seqLen }, () => genePool[Math.floor(Math.random() * genePool.length)]);

      DC = {
        running: true, done: false,
        lvl: lvlIdx, cfg,
        sequence,                // correct sequence
        genePool,
        player: [],              // player's input
        phase: 'show',           // 'show' → 'input' → 'result'
        showIdx: -1,             // which gene is currently lit during show
        t: 0,
        coins: 0,
        totalRounds: cfg.rounds,
        roundNum: 1,
        totalScore: 0
      };

      updateDNASubtitle(`Level ${lvlIdx + 1} — ${cfg.label} — Round ${DC.roundNum}/${DC.totalRounds}`);
      renderDNAButtons(genePool, false);
      startDNAShow();
    }

    function updateDNASubtitle(txt) {
      const el = document.getElementById('dna-codex-subtitle');
      if (el) el.textContent = txt;
    }

    function startDNAShow() {
      if (!DC) return;
      DC.phase = 'show';
      DC.showIdx = -1;
      renderDNAButtons(DC.genePool, false);
      renderDNACanvas();

      // Light up genes one by one
      let i = 0;
      const interval = DC.cfg.showMs / DC.sequence.length;
      const iv = setInterval(() => {
        if (!DC || !DC.running) { clearInterval(iv); return; }
        DC.showIdx = i;
        i++;
        if (i > DC.sequence.length) {
          clearInterval(iv);
          DC.showIdx = -1;
          // Short pause then input phase
          setTimeout(() => {
            if (!DC) return;
            DC.phase = 'input';
            DC.player = [];
            renderDNAButtons(DC.genePool, true);
            updateDNASubtitle('Your turn! Tap the sequence you saw 👆');
          }, 400);
        }
      }, interval);
    }

    function renderDNACanvas() {
      if (!DC) return;
      const cv = document.getElementById('dna-canvas');
      if (!cv) return;
      const c = cv.getContext('2d');
      const W = 400, H = 200;

      function drawFrame() {
        if (!DC || !DC.running) return;
        c.fillStyle = '#0d1b2a'; c.fillRect(0, 0, W, H);

        // Title
        c.fillStyle = 'rgba(168,255,184,0.7)'; c.font = 'bold 13px Fredoka'; c.textAlign = 'left';
        c.fillText('🧬 DNA SEQUENCE', 14, 22);

        // Phase label
        c.fillStyle = DC.phase === 'show' ? '#a8d8ff' : DC.phase === 'input' ? '#ffde7d' : '#a8ffb8';
        c.font = 'bold 11px Fredoka'; c.textAlign = 'right';
        c.fillText(DC.phase === 'show' ? 'MEMORIZE' : DC.phase === 'input' ? 'INPUT' : 'DONE', W - 14, 22);

        // Draw sequence as helix-style dots
        const seq = DC.sequence;
        const cellW = Math.min(44, (W - 28) / seq.length);
        const startX = (W - cellW * seq.length) / 2 + cellW / 2;
        const midY = 80;

        // Draw connecting line
        c.strokeStyle = 'rgba(255,255,255,0.08)'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(startX - cellW / 2, midY); c.lineTo(startX + cellW * (seq.length - 0.5), midY); c.stroke();

        seq.forEach((gene, idx) => {
          const cx = startX + idx * cellW;
          const yOff = Math.sin(idx * 0.9) * 14; // sinusoidal helix effect
          const isLit = DC.phase === 'show' && idx === DC.showIdx;
          const isInput = DC.phase === 'input' && idx < DC.player.length;
          const playerGene = isInput ? DC.player[idx] : null;
          const displayGene = isInput ? playerGene : isLit ? gene : null;
          const radius = isLit ? 20 : 16;

          // Glow when lit
          if (isLit) {
            c.save(); c.shadowColor = gene.glow; c.shadowBlur = 28;
            c.fillStyle = gene.col;
            c.beginPath(); c.arc(cx, midY + yOff, radius, 0, 6.283); c.fill();
            c.restore();
          } else if (isInput) {
            // Show player's answer colored
            const correct = playerGene && playerGene.id === gene.id;
            c.fillStyle = correct ? 'rgba(168,255,184,0.3)' : 'rgba(255,80,80,0.3)';
            c.beginPath(); c.arc(cx, midY + yOff, radius, 0, 6.283); c.fill();
            c.strokeStyle = correct ? '#a8ffb8' : '#ff5050'; c.lineWidth = 2;
            c.beginPath(); c.arc(cx, midY + yOff, radius, 0, 6.283); c.stroke();
            if (displayGene) {
              c.fillStyle = correct ? '#a8ffb8' : '#ff5050'; c.font = `bold 10px Fredoka`; c.textAlign = 'center';
              c.fillText(displayGene.label.substring(0, 3), cx, midY + yOff + 4);
            }
          } else {
            // Unlit — grey placeholder
            c.fillStyle = 'rgba(255,255,255,0.06)'; c.strokeStyle = 'rgba(255,255,255,0.12)'; c.lineWidth = 1.5;
            c.beginPath(); c.arc(cx, midY + yOff, radius, 0, 6.283); c.fill(); c.stroke();
            if (DC.phase === 'show') {
              c.fillStyle = 'rgba(255,255,255,0.2)'; c.font = '10px Fredoka'; c.textAlign = 'center';
              c.fillText('?', cx, midY + yOff + 4);
            }
          }

          // Index dot below
          c.fillStyle = 'rgba(255,255,255,0.2)'; c.font = '8px Fredoka'; c.textAlign = 'center';
          c.fillText(idx + 1, cx, midY + yOff + radius + 12);
        });

        // Player progress bar
        if (DC.phase === 'input') {
          const pct = DC.player.length / seq.length;
          c.fillStyle = 'rgba(255,255,255,0.08)'; c.beginPath(); c.roundRect(14, H - 26, W - 28, 10, 5); c.fill();
          c.fillStyle = pct >= 1 ? '#a8ffb8' : '#ffde7d';
          c.beginPath(); c.roundRect(14, H - 26, (W - 28) * pct, 10, 5); c.fill();
          c.fillStyle = 'rgba(255,255,255,0.5)'; c.font = '9px Fredoka'; c.textAlign = 'center';
          c.fillText(`${DC.player.length} / ${seq.length}`, W / 2, H - 19);
        }

        // Score
        if (DC.totalScore > 0) {
          c.fillStyle = '#ffd700'; c.font = 'bold 12px Fredoka'; c.textAlign = 'right';
          c.fillText('🪙 ' + DC.totalScore, W - 14, H - 8);
        }

        if (DC.running) requestAnimationFrame(drawFrame);
      }
      requestAnimationFrame(drawFrame);
    }

    function renderDNAButtons(pool, enabled) {
      const cont = document.getElementById('dna-buttons');
      if (!cont) return;
      let h = '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">';
      pool.forEach(gene => {
        h += `<button class="lev-btn" onclick="dnaCodexTap('${gene.id}')"
      style="background:${gene.col}22;border-color:${gene.col}55;color:${gene.col};
             pointer-events:${enabled ? 'all' : 'none'};opacity:${enabled ? 1 : 0.35};
             width:72px;height:56px;font-family:Fredoka;font-size:13px;font-weight:700;flex-direction:column;gap:2px">
      <span style="font-size:18px">⬤</span>${gene.label}
    </button>`;
      });
      h += '</div>';
      cont.innerHTML = h;
    }

    function dnaCodexTap(geneId) {
      if (!DC || DC.phase !== 'input' || DC.done) return;
      const gene = DC.genePool.find(g => g.id === geneId);
      if (!gene) return;

      SFX.pop();
      DC.player.push(gene);

      // Check if sequence complete
      if (DC.player.length >= DC.sequence.length) {
        setTimeout(() => evaluateDNARound(), 200);
      }
    }

    function evaluateDNARound() {
      if (!DC) return;
      DC.phase = 'result';

      // Score this round
      let correct = 0;
      DC.player.forEach((g, i) => { if (DC.sequence[i] && g.id === DC.sequence[i].id) correct++; });
      const pct = correct / DC.sequence.length;
      const roundPts = Math.floor(DC.cfg.reward * pct * (1 + DC.lvl * 0.15));
      DC.totalScore += roundPts;
      GS.coins += roundPts;

      if (pct === 1) { SFX.levelUp(); HAP.success(); }
      else if (pct >= 0.5) { SFX.buy(); HAP.light(); }
      else { SFX.err(); HAP.error(); }

      // More rounds?
      if (DC.roundNum < DC.totalRounds) {
        DC.roundNum++;
        // Generate new sequence, same difficulty
        const genePool = DC.genePool;
        DC.sequence = Array.from({ length: DC.cfg.seq }, () => genePool[Math.floor(Math.random() * genePool.length)]);
        DC.player = [];
        updateDNASubtitle(`Round ${DC.roundNum}/${DC.totalRounds} — ${pct === 1 ? '🎉 Perfect!' : correct + '/' + DC.sequence.length + ' correct'} · +🪙${roundPts}`);
        setTimeout(() => { if (DC) startDNAShow(); }, 1400);
        return;
      }

      // All rounds done — finish
      DC.done = true; DC.running = false;
      const perfectRun = DC.totalScore >= DC.cfg.reward * DC.totalRounds;

      // Bonus: perfect run on hard levels unlocks a rare visitor
      if (perfectRun && DC.lvl >= 4 && GS.fish.length < CFG.MAX_FISH) {
        const rareVisitors = ['jelly', 'axolotl', 'shark', 'turtle'];
        const rid = rareVisitors[DC.lvl % rareVisitors.length];
        const visitor = new Fish(DNA.fromSpecies(rid));
        visitor.isVisitor = true;
        visitor.visitorTimer = 60;
        GS.fish.push(visitor);
        notify(`🌟 Perfect DNA run! A rare ${SPECIES[rid]?.name || rid} appears in your tank!`, 'success');
      }

      // Show result screen
      const rEl = document.getElementById('dna-result');
      if (rEl) {
        document.getElementById('dna-result-icon').textContent = perfectRun ? '🏆' : DC.totalScore > 0 ? '🧬' : '💔';
        document.getElementById('dna-result-title').textContent = perfectRun ? 'Perfect Run! 🎉' : DC.totalScore > 0 ? 'Good Effort!' : 'Keep Practicing!';
        document.getElementById('dna-result-msg').textContent = `${DC.totalRounds} round${DC.totalRounds > 1 ? 's' : ''} complete · ${DC.totalScore} coins earned`;
        document.getElementById('dna-reward').textContent = DC.totalScore;
        rEl.style.display = 'flex';
      }
      saveGame();
    }
