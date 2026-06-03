# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Super Mario Mini** — a browser-based Mario clone built with Phaser 3 + TypeScript + Vite. Developed by a nightly autonomous agent (18:00–06:00 Berlin time via Claude Code Routines). The directory is named "Little Fighter 2 Rem" for historical reasons; the actual project is Super Mario Mini.

Check `project.md` for the current phase plan and task checklist. Ticked items (`- [x]`) are done.

## Commands

```bash
npm install        # first time setup
npm run dev        # dev server → http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Planned Architecture

```
src/
  main.ts               # Phaser game config, scene registration
  scenes/
    MenuScene.ts        # start screen
    GameScene.ts        # main gameplay loop
    GameOverScene.ts    # game-over and win screens
  entities/
    Mario.ts            # player: movement, jump, lives
    Goomba.ts           # enemy: patrol, stomp detection
  assets/               # sprites, audio (loaded in GameScene preload)
public/                 # static assets served as-is
```

## Agent Workflow

Each night session the agent should:
1. Read `project.md` to find the next unchecked task.
2. Implement that one task fully before moving on.
3. Commit with a descriptive message and `git push`.
4. Check off the task in `project.md` (`- [ ]` → `- [x]`).

GitHub remote: `https://github.com/bananastewie/super-mario-mini`

## Phase Summary

| Night | Goal |
|---|---|
| 1 | Phaser/TS/Vite setup · Mario moves and jumps on platforms |
| 2 | Goomba AI · coins · death by pit |
| 3 | Full level · HUD · start/game-over/win screens |
| 4 | Pixel-art sprites · audio · animations · polish |
