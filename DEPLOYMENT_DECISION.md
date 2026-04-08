# Deployment Decision

Canonical app repo:
- `/Users/gerryturnbow/submittal/game`

Canonical GitHub repo:
- `https://github.com/confusedonut22/submittal`

Canonical Vercel project:
- `game`
- `.vercel/project.json` in `/Users/gerryturnbow/submittal/game`

Decision:
- Use one Vercel deployment from `/Users/gerryturnbow/submittal/game`.
- That single deployment serves both desktop and mobile.
- Desktop and mobile should stay in the same app and diverge only through responsive layout logic and media-query behavior.

Reference-only repo:
- `/Users/gerryturnbow/submittal-desktop-done/game`
- Purpose: locked desktop visual reference only
- Do not treat this as the upload or deploy source of truth

Current main preview:
- `https://game-4bwh8tso4-confusedonut22s-projects.vercel.app/?_vercel_share=Md2o9qQ6pClrSuLtSE8u2W28zSRb9Ckg`

Rule going forward:
1. Make live changes in `/Users/gerryturnbow/submittal/game`
2. Deploy from `/Users/gerryturnbow/submittal/game`
3. Use `/Users/gerryturnbow/submittal-desktop-done/game` only to compare or copy approved desktop behavior when needed

Closed local preview processes on 2026-04-07:
- `vite preview` on `127.0.0.1:4185`
- `vite preview` on `127.0.0.1:4186`
- `vite` on `127.0.0.1:4188`
- `python -m http.server` on `:4190`
- `serve dist` on `:3000`
