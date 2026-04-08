# Sidebets Blackjack

Canonical submission repo and only upload target.

Absolute path:
- `/Users/gerryturnbow/submittal/game`

Use this repo for:
- Stake upload packaging
- Vercel previews that represent the real submission candidate
- final gameplay, intro, replay, and compliance changes

Do not treat `/Users/gerryturnbow/submittal-desktop-done/game` as a competing submission repo. That repo is now reference-only.

## Current status

- Intro uses the locked `v6` power-grid render.
- In-game logo stays on the original Chad Labs logo.
- This repo is the source of truth for remaining submission work.

## Remaining blockers before upload

1. Final reviewer submission QA pass against the frozen bundle.
2. Final Stake Engine handoff/upload using the canonical repo and frozen artifact folder.

## Build

```bash
npm install
npm run build
```

## Deploy preview

```bash
npx vercel --yes --scope confusedonut22s-projects
```
