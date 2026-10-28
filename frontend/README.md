# RankWise AI — React frontend

Modern React/Vite starter frontend for the RankWise AI SEO product.

## Prerequisites
- Node.js 24 LTS (recommended) or another Vite-supported modern Node.js version
- npm
- VS Code (optional)

Check versions:
```bash
node -v
npm -v
```

## Run locally in WSL Ubuntu
From this `frontend` directory:
```bash
npm install
npm run dev
```
Open the local URL shown by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Pages included
- `/` — Marketing homepage
- `/login` — Sign-in form (demo only)
- `/signup` — Create account form (demo only)
- `/dashboard` — Overview dashboard
- `/audit/new` — New audit form (demo result only)
- `/reports` — Audit reports list
- `/settings` — Account/workspace settings

## Important implementation notes
- This is a frontend prototype. Login and signup are not real authentication.
- New audit currently displays a demo scan; it does not fetch or crawl the entered website yet.
- No customer data or credentials should be treated as secure in this prototype.
- Configure `VITE_API_BASE_URL` and connect the backend before using real scans, accounts, or client data.
- Before public launch, use server-side authentication, validation, rate limits, SSRF protection for URL scanning, privacy controls, and appropriate monitoring.
