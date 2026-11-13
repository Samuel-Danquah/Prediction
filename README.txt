NCAA Top 25 Totals Lab — Netlify deployment

1. Extract this ZIP to a folder.
2. Deploy using Netlify's Git-based deployment (recommended for functions), or upload the folder via Netlify Drop if your Netlify workflow supports functions in manual deploys.
3. Confirm /api/espn-scores?date=2026-11-13 returns JSON on your Netlify domain.
4. Open your site's homepage. Recent game scores should load automatically.

IMPORTANT: This version intentionally uses the fixed November 13, 2026 schedule and date, matching the original dashboard. It is not yet a rolling daily Top 25 schedule. For a future daily version, the schedule and rankings must be loaded dynamically.

The backend uses ESPN's unofficial scoreboard JSON endpoint. The endpoint can change or become unavailable. Some teams may have fewer than four completed games. This model is experimental and is not a validated wagering forecast.
