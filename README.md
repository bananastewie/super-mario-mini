# Super Mario Mini

Ein browser-basierter Super Mario Klon, gebaut mit Phaser 3 + TypeScript + Vite.
Entwickelt von einem autonomen Claude-Nacht-Agenten.

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

Auf der Routine-Seite den Schalter auf **Enabled** setzen.
Der Agent läuft dann wieder jeden Abend 18–06 Uhr.

---

## Nacht-Zeitplan

| Nacht | Ziel |
|---|---|
| Nacht 1 | Projekt-Setup + Mario bewegt sich |
| Nacht 2 | Goomba-Gegner + Münzen + Tod |
| Nacht 3 | Level + UI + Screens |
| Nacht 4 | Sprites + Audio + Polish |
