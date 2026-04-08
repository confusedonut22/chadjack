## Stake Engine Blackjack Side Bets

Canonical app repo:
- `https://github.com/confusedonut22/chadjack`
- app source: `/Users/gerryturnbow/chadjack/game`

Frozen submission bundle:
- `/Users/gerryturnbow/chadjack/bundle`

Key docs:
- `/Users/gerryturnbow/chadjack/docs/APPROVAL_RULESET_LOCK.md`
- `/Users/gerryturnbow/chadjack/docs/SUBMISSION_CHECKLIST.md`
- `/Users/gerryturnbow/chadjack/docs/BLACKJACK_RGS_CONTRACT.md`
- `/Users/gerryturnbow/chadjack/RGS_CLIENT_CHECK.md

Rules locked for submission:
- 6 decks
- Dealer hits soft 17
- Blackjack pays 7:5
- Double on hard 9/10/11 only
- Same-rank split only
- No DAS
- Split aces receive one card only

Bundle contents:
- `base.csv`
- `base.jsonl`
- `base.jsonl.zst`
- `compression.txt`
- `index.json`

Status:
- Python tests passing
- App tests passing
- App production build passing
- Export bundle generated and compressed with `zstd`
