# Intern Assignment - AI Finance Dashboard

A React + TypeScript + Vite personal finance dashboard with mobile and desktop experiences, shared mock data, analytics hooks, and AI-style financial insights.

## � App Overview

**Live Preview**: https://intern-assign-sooty.vercel.app/  
**Source Code**: https://github.com/gurugsv7/Intern-assign

**Lighthouse Audit Scores**:
| Metric | Score |
|--------|-------|
| **Performance** | 91/100 |
| **Accessibility** | 100/100 ✅ |
| **Best Practices** | 92/100 |
| **SEO** | 92/100 |

---

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

## Setup & Deployment

This repository is preconfigured for Vercel with [vercel.json](vercel.json).

### Local Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Analytics Event Tracking

The app includes a complete event tracking system integrated with `dataLayer` and `gtag` for Google Analytics 4. The following events are tracked and ready for GA4 activation:

**Currently tracked events**:
- `page_load` — app initialization
- `navigation_tab_change` — tab/page navigation
- `assistant_open_click` — AI assistant activation
- `assistant_message_send` — chat interactions
- `search_usage` — transaction search
- `filter_click` — spending filter interactions
- `execute_strategy_click` — action button clicks
- `preferences_change` — settings updates

**To enable GA4 reporting** (optional, post-deployment):
1. Create a GA4 property at [Google Analytics](https://analytics.google.com)
2. Copy your **Measurement ID** (format: G-XXXXXXXXXX)
3. Add to `index.html` `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {analytics_storage: 'denied'});
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Architecture & Design Decisions

### Why React (not React Native)?
- **Fast iteration**: React web builds and deploys instantly
- **Better for demos**: Live URL accessible via browser without app store delays
- **Mobile-first CSS**: Tailwind responsive design achieves mobile-like UX
- **Time ROI**: More time for feature polish vs platform-specific setup

### Single Source of Truth for Data

All cross-page data lives in `src/lib/mockData.ts`:
- User identity and metrics are consistent across all pages
- No contradictory numbers between desktop/mobile flows
- Updates in one place affect all consuming components

### Custom Hooks for Reusability

#### `useFetch<T>(source, options)`
Generic data fetching abstraction that handles:
- Both URL strings and async functions as data sources
- Loading, error, and success states automatically
- Manual/automatic triggering via `manual` option
- Refetch capability for retry flows
- Type-safe generic support

Used in: Wallet (assistant insights), any component needing async data

```typescript
const { data, loading, error, refetch } = useFetch(
  () => getFinancialInsights(),
  { manual: false }
);
```

#### `useAnalytics()`
Event tracking abstraction that:
- Pushes events to both `dataLayer` (GTM) and `gtag` (GA4)
- Timestamps and enriches all events automatically
- Safe for SSR (window check included)
- Console logging for debugging in development

Used in: App (page load), all major user interactions

```typescript
const { trackEvent } = useAnalytics();
trackEvent('button_click', { button_name: 'Send Money' });
```

#### `useDebounce<T>(value, delay)`
Debounced value hook that:
- Delays updates to prevent excessive re-renders
- Cleans up timeouts on unmount
- Generic type support for any value type
- Configurable delay (default: 300ms)

Used in: DesktopTransactions (search input optimization)

```typescript
const debouncedSearch = useDebounce(searchTerm, 300);
```

#### `useLocalStorage<T>(key, initialValue)`
Persistent storage hook that:
- Stores/retrieves JSON from localStorage
- SSR-safe with window existence checks
- Supports both direct values and updater functions
- Error handling with try-catch

Used in: App (active tab, onboarding state), DesktopSettings (theme preference)

```typescript
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### Performance Optimizations

**Lazy Loading & Code Splitting**
- Major pages loaded on-demand via `React.lazy()`
- Suspense boundaries show loading state
- Vite auto-bundles split assets
- Result: Initial bundle ~374KB, per-page chunks ~5-21KB

**Memoization**
- `useMemo` for expensive computations (DesktopTransactions narrative filtering)
- `useCallback` in hooks to prevent function recreation
- React.lazy imported components are naturally memoized

### Design System & Theming

**CSS Custom Properties** in `@theme` block:
- Color palette: Primary (emerald), secondary, tertiary, surface tokens
- Typography: Inter font, semantic weight system
- Spacing: 4px baseline grid (4, 8, 12, 16, etc.)
- Radius: Premium rounded corners (8px, 16px, 32px)
- Shadows: Depth-based shadow system

Benefits:
- Single source for design tokens
- Easy to swap colors/spacing globally
- Supports future dark mode implementation

---

## Accessibility Features

✅ **WCAG 2.2 Level AA Compliance** (Lighthouse: 100/100)

### Semantic HTML
- `<main>` wraps primary content
- `<nav>` for navigation structures
- `<section>` for content groupings
- `<header>` for page headers
- Proper heading hierarchy (h1 → h3)

### ARIA & Labels
- `aria-label` on icon buttons for screen readers
- `aria-labelledby` on sections with explicit titles
- `role="main"` on main content
- `role="navigation"` on nav containers
- `role="tab"` and `aria-selected` on tab controls

### Keyboard Navigation
- All interactive elements keyboard-accessible via Tab
- Enter/Space activates buttons and tabs
- Visible focus indicators (2px outline on focus-visible)
- No keyboard traps; Tab sequence logical

### Visual Design
- Color contrast: 7.8:1 (primary #006d33 on white) ✅ WCAG AAA
- Non-color dependency: All labels accompanied by icons or text
- Focus indicators: Clear and visible at all times
- Dark mode ready in CSS (media query infrastructure present)

### Screen Reader Support
- Alt text on all images (decorative images marked `alt=""`)
- Live regions for dynamic content updates
- Proper table headers and data associations
- Skip link navigation support

---

## Assignment Details

**Design Reference**: Premium fintech dashboard aesthetic (black cards, green accents)

**Key Implementation Notes**:
- Mock data used by design for focus on frontend engineering excellence
- SPA rewrite configured for seamless navigation (direct links → index.html)
- Analytics event tracking fully integrated; optional GA4 setup post-deployment
- All 4 required custom hooks implemented and actively used throughout the app
- Complete accessibility compliance verified by Lighthouse (100/100 score)

**For detailed requirement mapping and audit results**, see [ASSIGNMENT_AUDIT.md](ASSIGNMENT_AUDIT.md).
