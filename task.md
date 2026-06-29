# Task Checklist — Telegram Pipeline Upgrades

- [x] Convert Telegram parse_mode from Markdown to HTML to eliminate character parse errors
- [x] Configure HTML tag escape utilities for user inputs
- [x] Implement timeout wraps (8s limit) and 5xx retries
- [x] Create app/api/debug/telegram/route.ts endpoint checking connectivity latency
- [x] Build 🟢 Test Telegram action inside customizer analytics tab
- [x] Resolve canvas onWheel passive event listener console warnings using manual useEffect event binds
- [x] Create .env.example configuration mapping documentation
- [x] Run compilation checks `npx tsc --noEmit`
- [x] Run linting checks `npm run lint`
- [x] Build Next.js app `npm run build`
- [x] Push updates to GitHub
