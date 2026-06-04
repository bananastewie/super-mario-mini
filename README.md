# Super Mario Mini

Ein browser-basierter Super Mario Klon, gebaut mit Phaser 3 + TypeScript + Vite.
Entwickelt von einem autonomen Claude-Nacht-Agenten.

> **Der Agent läuft in Anthropics Cloud** — unabhängig davon, ob dein Computer an oder aus ist.
> Er startet täglich um **18:00 Uhr Berlin** automatisch und implementiert die nächste offene Aufgabe aus `project.md`.

---

## Projektstatus überprüfen

### GitHub — Commits & Code
Öffne im Browser:
```
https://github.com/bananastewie/super-mario-mini
```
Unter **Commits** siehst du, was der Agent in der letzten Nacht gebaut hat.

### project.md — Fortschritt im Tagesplan
Öffne `project.md` in diesem Ordner. Abgehakte Aufgaben (`- [x]`) sind fertig.

### Routine-Übersicht (Claude)
```
https://claude.ai/code/routines/trig_01DjpNPVLKdpy8buSpVHxDUp
```
Hier siehst du wann der Agent zuletzt gelaufen ist und ob er aktiv ist.

---

## Spiel lokal starten

Sobald Nacht 1 abgeschlossen ist (Phaser-Setup vorhanden):

```bash
# Im Terminal:
cd "/Users/sandboxuser/Claude Projects/Little Fighter 2 Rem"
git pull
npm install
npm run dev
```

Dann im Browser öffnen: `http://localhost:5173`

---

## Agenten stoppen

### Temporär pausieren (empfohlen)
Öffne die Routine-Seite:
```
https://claude.ai/code/routines/trig_01DjpNPVLKdpy8buSpVHxDUp
```
Dort den Schalter auf **Disabled** setzen. Agent stoppt nach der aktuellen Session.

### Dauerhaft löschen
Auf derselben Seite: Routine löschen.

---

## Agenten wieder aktivieren

Der Agent wird automatisch deaktiviert wenn das monatliche Token-Budget aufgebraucht ist.

**So schaltest du ihn wieder ein:**

1. Öffne die Routine-Seite:
   ```
   https://claude.ai/code/routines/trig_01DjpNPVLKdpy8buSpVHxDUp
   ```
2. Setze den Schalter auf **Enabled**
3. Optional: Klicke **Run now** um sofort eine Session zu starten, ohne auf 18:00 Uhr zu warten

**Alternativ über Claude Code CLI** (im Terminal):
```
! claude
```
Dann eintippen:
```
/schedule
```
→ Dort "Super Mario Mini — Nacht-Agent" auswählen und aktivieren.

Der Agent läuft dann wieder täglich um **18:00 Uhr Berlin**.

---

## Nacht-Zeitplan

| Nacht | Ziel |
|---|---|
| Nacht 1 | Projekt-Setup + Mario bewegt sich |
| Nacht 2 | Goomba-Gegner + Münzen + Tod |
| Nacht 3 | Level + UI + Screens |
| Nacht 4 | Sprites + Audio + Polish |
