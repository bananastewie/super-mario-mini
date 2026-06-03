# Super Mario Mini — Projektplan

## Projektziel

Spielbarer Super-Mario-Klon im Browser. Ein Level, klassische Plattformer-Mechanik, fertig in ~4 Tagen.

**Stack:** Phaser 3 + TypeScript + Vite  
**Ziel-URL:** läuft lokal via `npm run dev`, deploybar via GitHub Pages

---

## Tagesplan (4 Nächte)

### Nacht 1 — Fundament
- [ ] Phaser 3 + TypeScript + Vite Projekt-Setup
- [ ] Mario-Figur (Rechteck als Placeholder, später Sprite)
- [ ] Links/rechts bewegen, Sprung (Spacebar / Arrow Keys)
- [ ] Boden und Plattform-Kollision
- [ ] Kamera folgt Mario

**Definition of Done:** Mario läuft und springt auf Plattformen.

---

### Nacht 2 — Gameplay
- [ ] Goomba-Gegner (laufen hin und her, fallen von Kanten)
- [ ] Stomp-Mechanik (Draufspringen = Goomba stirbt)
- [ ] Seitenkollision mit Goomba = Mario verliert Leben
- [ ] Münzen sammeln (Collectibles auf Plattformen)
- [ ] Tod durch Fallgrube

**Definition of Done:** Gegner, Münzen und Tod funktionieren.

---

### Nacht 3 — Level & UI
- [ ] Vollständiges Level-Design (Plattformen, Lücken, Gegner, Münzen)
- [ ] HUD: Münz-Zähler, Leben, Timer
- [ ] Ziel-Flagge am Level-Ende
- [ ] Start-Screen, Game-Over-Screen, Win-Screen

**Definition of Done:** Vollständig spielbares Level mit Anfang und Ende.

---

### Nacht 4 — Polish
- [ ] Pixel-Art Sprites (Mario, Goomba, Münze, Plattform)
- [ ] Sprung-Sound, Münz-Sound, Tod-Sound
- [ ] Hintergrundmusik
- [ ] Animationen (Walk-Cycle, Sprung)
- [ ] Bugfixes & Balancing

**Definition of Done:** Sieht gut aus, fühlt sich gut an.

---

## Token-Schätzung

| Nacht | Sessionen (stündlich) | Tokens/Session | Nacht gesamt |
|---|---|---|---|
| Nacht 1 | ~4 | ~15.000 | ~60.000 |
| Nacht 2 | ~5 | ~20.000 | ~100.000 |
| Nacht 3 | ~5 | ~20.000 | ~100.000 |
| Nacht 4 | ~4 | ~15.000 | ~60.000 |
| **Gesamt** | **~18** | | **~320.000** |

---

## Projekt-Struktur

```
super-mario-mini/
├── src/
│   ├── scenes/
│   │   ├── GameScene.ts      # Hauptspiel
│   │   ├── MenuScene.ts      # Start-Screen
│   │   └── GameOverScene.ts  # Game Over / Win
│   ├── entities/
│   │   ├── Mario.ts          # Spieler
│   │   └── Goomba.ts         # Gegner
│   ├── assets/               # Sprites, Audio
│   └── main.ts
├── public/
├── package.json
└── vite.config.ts
```

---

## Setup-Schritte (einmalig, manuell)

1. GitHub-Repo erstellen: `super-mario-mini`
2. Lokal initialisieren und pushen
3. Nacht-Agenten-Routine in Claude Code anlegen
4. Agent arbeitet jede Nacht 18–06 Uhr selbstständig

---

## Agenten-Prompt (für Nacht-Routine)

Der Agent bekommt jeden Abend diesen Kontext:
> "Du arbeitest am Super Mario Mini Projekt. Lies project.md für den aktuellen Stand. Implementiere die nächste noch nicht abgehakte Aufgabe aus dem Tagesplan. Committe deinen Fortschritt mit aussagekräftiger Commit-Message. Arbeite eine Aufgabe vollständig durch, bevor du zur nächsten gehst."
