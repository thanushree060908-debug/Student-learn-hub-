# Student Learn Hub

A practical-skills learning platform for college students (Excel, Power BI,
Accounting, Finance, Business Communication, Basic Technology).

## What's inside
- React + Vite single-page app
- Every visitor's progress, badges, and login are saved in their own browser
  (`localStorage`) — so it persists on refresh and repeat visits from the
  same device/browser
- Fully responsive, with a dark mode toggle

## Run it locally
```bash
npm install
npm run dev
```
Then open the URL shown in the terminal (usually http://localhost:5173).

## Deploy it publicly (so anyone can open it on any phone)

### Option A — Vercel (easiest)
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com, sign in, click **Add New → Project**, and import
   the repo.
3. Vercel auto-detects Vite — just click **Deploy**.
4. You'll get a live URL like `student-learn-hub.vercel.app` that works on
   any phone or computer.

### Option B — Netlify
1. Push this folder to a GitHub repo.
2. Go to https://netlify.com → **Add new site → Import an existing project**.
3. Build command: `npm run build`  ·  Publish directory: `dist`
4. Deploy — you'll get a URL like `student-learn-hub.netlify.app`.

### Option C — no GitHub, drag-and-drop
1. Run `npm install && npm run build` locally.
2. Drag the generated `dist` folder onto https://app.netlify.com/drop.
3. Netlify gives you a live public link instantly.

## Notes on "accounts"
Login/signup in this app is a **demo** — it doesn't check a password against
a server, it just remembers the name you typed, in that browser. If you want
real shared accounts (so the same student sees their progress on both their
phone and laptop), that needs a backend and database — I can help you add
Supabase or Firebase for that next, if you'd like.
