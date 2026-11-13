NCAA Totals + Spread Intelligence (No Sportsbook Integration)

Features: ESPN daily schedules, last four completed games, scoring averages, opponent-adjusted projected total, predicted margin, live edits, CSV export. No DraftKings, odds provider, API key, market lines, or sportsbook integration.

Deploy: Upload index.html, netlify.toml and netlify/functions/basketball.mjs to the root of your GitHub repository, retaining the function folder path. Netlify should deploy automatically. No environment variables are needed.

Test: Open https://YOUR-SITE.netlify.app/api/basketball?mode=games&date=2026-11-13 and verify JSON is returned.

Note: This is a lightweight four-game model, not a calibrated betting or forecasting system. ESPN availability and ranking indicators can vary.
