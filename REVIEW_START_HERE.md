## Stake Engine Blackjack Side Bets

Canonical app repo:
- `/Users/gerryturnbow/submittal/game`
- `https://github.com/confusedonut22/submittal`

Frozen submission bundle:
- `/Users/gerryturnbow/stake-engine-blackjack-side-bets/bundle`

Key docs:
- `/Users/gerryturnbow/stake-engine-blackjack-side-bets/docs/APPROVAL_RULESET_LOCK.md`
- `/Users/gerryturnbow/stake-engine-blackjack-side-bets/docs/SUBMISSION_CHECKLIST.md`
- `/Users/gerryturnbow/stake-engine-blackjack-side-bets/docs/BLACKJACK_RGS_CONTRACT.md`
- `/Users/gerryturnbow/stake-engine-blackjack-side-bets/RGS_CLIENT_CHECK.md`

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
