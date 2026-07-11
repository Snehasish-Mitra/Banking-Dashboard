# Ledgerline — Banking Transaction Dashboard

A frontend-only banking transaction dashboard built with **React 19**, **Vite**, and **Tailwind CSS v4**. No backend — all data is generated client-side with a seeded mock dataset (180 transactions) so the app behaves the same on every load.

## Features

- **Search** — matches against description, merchant, and reference number
- **Filters** — date range, min/max amount, transaction type (credit/debit), and category, combinable with search
- **Pagination** — configurable page size (10/25/50/100) with page-number controls
- **Export to CSV** — exports the *currently filtered* result set, not just the visible page
- **Transaction details** — click any row to open a detail panel with reference, account, method, and running balance

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Sidebar.jsx                 navigation shell
    SummaryStats.jsx            balance / money in / money out cards
    Toolbar.jsx                 search bar + filter panel + CSV export
    TransactionsTable.jsx       results table
    Pagination.jsx               page controls
    TransactionDetailsDrawer.jsx slide-over detail panel
    Badges.jsx                  status/type pill components
  data/
    transactions.js             seeded mock data generator
  utils/
    format.js                   currency/date formatting
    csv.js                      CSV export
  App.jsx                       state, filtering logic, layout
```

## Notes on approach

- All filtering/search/pagination state lives in `App.jsx` and is derived with `useMemo`, so the table always reflects the active filters without extra network round-trips (there's no backend to call).
- The mock dataset uses a seeded PRNG so results are reproducible across reloads/screen recordings during review, rather than re-randomizing every render.
- CSV export intentionally exports the full filtered set (not just the current page), matching how export normally behaves in production banking UIs.
