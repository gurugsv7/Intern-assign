# Intern Assignment - AI Finance Dashboard

A React + TypeScript + Vite personal finance dashboard with mobile and desktop experiences, shared mock data, analytics hooks, and AI-style financial insights.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- motion/react
- Recharts
- Lucide React

## Features Implemented

- Mobile flows:
  - Home
  - Stats
  - Wallet
  - Me
- Desktop flows:
  - Home
  - Transactions
  - Spending
  - Insights
  - Settings
- Shared mock data model across all pages for consistency.
- Dynamic simulated assistant insights derived from mock data.
- Required custom hooks integrated in app behavior:
  - useFetch
  - useAnalytics
  - useDebounce
  - useLocalStorage
- Analytics events wired for navigation and key interactions.
- Loading, error, retry, and empty states in assistant data flow.
- Lazy loading and code splitting using React.lazy + Suspense.
- SEO baseline in root HTML (title, description, canonical, OG/Twitter tags).

## Project Structure

```text
src/
  App.tsx
  components/
    Layout.tsx
    Home.tsx
    Stats.tsx
    Wallet.tsx
    Me.tsx
    Onboarding.tsx
    DesktopLayout.tsx
    DesktopHome.tsx
    DesktopTransactions.tsx
    DesktopSpending.tsx
    DesktopInsights.tsx
    DesktopSettings.tsx
  hooks/
    useFetch.ts
    useAnalytics.ts
    useDebounce.ts
    useLocalStorage.ts
  lib/
    mockData.ts
  services/
    geminiService.ts
```

## Run Locally

```bash
npm install
npm run dev
```

## Build and Verify

```bash
npm run lint
npm run build
```

## Deploy to Vercel

This repository is preconfigured for Vercel with [vercel.json](vercel.json).

### Option 1: Vercel Dashboard

1. Import the GitHub repository in Vercel.
2. Framework preset: Vite.
3. Build command: npm run build.
4. Output directory: dist.
5. Deploy.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

Notes:
- SPA rewrite is configured so direct links route to index.html.
- Add your GA4 measurement script/id after deployment if needed.

## Notes

- This submission uses mock data and simulated AI insights by design.
- To enable production analytics reporting, add a live GA4 measurement script and ID after deployment.
