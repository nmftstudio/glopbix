# Glopbix v7 - Technical Documentation

## 🏗 ARCHITECTURE OVERVIEW
Glopbix is a high-performance Progressive Web Application (PWA) built with Vanilla JavaScript and HTML5 Canvas. It uses an Entity-Component-System (ECS) architecture to manage hundreds of simultaneous entities with minimal CPU overhead.

### Key Modules:
- **Genetics Engine (`DNAManager`):** Handles unique visual and behavioral traits for fish using procedural generation and AI fallback.
- **AI Integration (Gemini Flash 2.0):** Dynamically generates new fish species stats and powers the "Glooby" conversational UI.
- **Rendering Engine:** Uses a hybrid approach: PIXI.js (WebGL) for high-end devices (caustics, blooms, advanced particles) and standard Canvas 2D for low-end devices.
- **State Management:** Uses Encrypted LocalStorage for game persistence with Export/Import functionality.

## 🐧 ANDROID OPTIMIZATIONS
- **Low-End Mode:** Automatically detects device capability via a micro-benchmark. If triggered, it disables WebGL/PIXI.js, `backdrop-filter`, and reduces particle/raycast counts.
- **Memory Management:** Implements object pooling to prevent Garbage Collector (GC) spikes.

© 2026 NMFTSTUDIO
