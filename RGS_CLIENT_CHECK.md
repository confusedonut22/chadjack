## RGS Client Check

RGS/client compliance pass completed against `/Users/gerryturnbow/submittal/game`.

Confirmed:
- Launch/session parsing is implemented in `/Users/gerryturnbow/submittal/game/src/game/session.js`.
- Authenticate, play, balance, event, end-round, and replay client calls are implemented in `/Users/gerryturnbow/submittal/game/src/game/rgsClient.js`.
- Stake-mode split no longer mutates the round locally before backend authority. It emits a `playerAction: split` event from `/Users/gerryturnbow/submittal/game/src/game/store.js`.
- Stake-mode play now fails closed if the backend does not return a compatible `round.state` payload.
- Active-round bootstrap now uses the finalized `resumed` status and only hydrates when the backend state is compatible.
- Resume-blocked UI copy now accurately says the backend returned an incompatible round state.

Submission-facing files:
- `/Users/gerryturnbow/submittal/game/src/game/store.js`
- `/Users/gerryturnbow/submittal/game/src/game/bootstrap.js`
- `/Users/gerryturnbow/submittal/game/src/game/sessionBootstrapModel.js`
- `/Users/gerryturnbow/submittal/game/src/game/rgsClient.js`
- `/Users/gerryturnbow/stake-engine-blackjack-side-bets/bundle/index.json`

Validation:
- `python3 -m unittest tests.test_mock_rgs_server tests.test_math_readiness`
- `npm test`
- `npm run build`
