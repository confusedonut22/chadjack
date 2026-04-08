# Handoff

## Canonical Repo
- Main repo: `/Users/gerryturnbow/submittal/game`
- GitHub repo: `https://github.com/confusedonut22/submittal`
- Deploy only from: `/Users/gerryturnbow/submittal/game`

## Reference Repo
- Desktop reference only: `/Users/gerryturnbow/submittal-desktop-done/game`
- Do not deploy from this repo
- Use it only to compare approved desktop UI behavior

## Main Preview
- Preview: `https://game-4bwh8tso4-confusedonut22s-projects.vercel.app/?_vercel_share=Md2o9qQ6pClrSuLtSE8u2W28zSRb9Ckg`
- Inspect: `https://vercel.com/confusedonut22s-projects/game/HN4hKP4XsaSRn3SWcKVbr2mTbEjo`

## Deployment Decision
- One app should serve both desktop and mobile
- Keep desktop and mobile in the same codebase
- Separate behavior through responsive logic and media queries, not separate deploy sources
- Canonical decision file: `/Users/gerryturnbow/submittal/DEPLOYMENT_DECISION.md`

## Intro
- Intro workspace: `/Users/gerryturnbow/submittal/chad-labs-intro`
- Final intro render: `/Users/gerryturnbow/submittal/chad-labs-intro/renders/chad-labs-intro-powergrid-v6.mp4`
- Live intro asset in app: `/Users/gerryturnbow/submittal/game/src/assets/chad_labs_intro_powergrid.mp4`

### Intro Behavior To Preserve
1. `LABS` powers the scene first
2. `CHAD` starts descending immediately
3. `CHAD` stays silhouette-only while descending
4. `CHAD` turns fully gold on contact with `LABS`
5. A sheen passes across `CHAD`

## Logos
- Keep the old Chad Labs logo in gameplay
- Keep the newer logo treatment intro-only
- Do not switch gameplay to the neon logo

## Files That Matter Most
- Main UI: `/Users/gerryturnbow/submittal/game/src/ui/GameTable.svelte`
- Main logic: `/Users/gerryturnbow/submittal/game/src/game/store.js`
- Constants/logo source: `/Users/gerryturnbow/submittal/game/src/game/constants.js`
- Deployment decision: `/Users/gerryturnbow/submittal/DEPLOYMENT_DECISION.md`

## Logic That Must Be Preserved
- Exact-rank split only
- Split cap is 4 total hands
- Split aces receive one card only and then stand
- Sidebet edits are allowed in `RESULT`
- Main repo social wording/currency behavior stays intact
- Main repo mobile behavior stays intact

## Current Repo Rule
- Keep `/Users/gerryturnbow/submittal/game/src/game/store.js` as source of truth
- Do not overwrite it with `/Users/gerryturnbow/submittal-desktop-done/game/src/game/store.js`

## Remaining Non-Visual Work
- Active-round resume/recovery path
- Stake math/export package
- Final Stake wording/compliance sweep

## Suggested Next-Chat Prompt
```text
Work only in /Users/gerryturnbow/submittal/game.

This is the canonical repo and only deploy source:
- GitHub: https://github.com/confusedonut22/submittal
- Vercel preview baseline: https://game-4bwh8tso4-confusedonut22s-projects.vercel.app/?_vercel_share=Md2o9qQ6pClrSuLtSE8u2W28zSRb9Ckg

Reference-only desktop snapshot:
- /Users/gerryturnbow/submittal-desktop-done/game

Do not deploy from the desktop snapshot.
Do not replace main repo store.js with desktop snapshot store.js.
Keep old Chad Labs logo in gameplay.
Keep the new logo intro-only.

Final intro asset to preserve:
- /Users/gerryturnbow/submittal/chad-labs-intro/renders/chad-labs-intro-powergrid-v6.mp4

Read first:
- /Users/gerryturnbow/submittal/HANDOFF.md
- /Users/gerryturnbow/submittal/DEPLOYMENT_DECISION.md

Then continue from there.
```
