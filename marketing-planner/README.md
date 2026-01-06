# Marketing Planner Web App (MVP)

A React + TypeScript single-page app that collects marketing-plan inputs via a guided chat, then unlocks:

- A **projected “marketing success” chart** over time (Growth / Engagement / Revenue index)
- **Personalized tips & execution guidance** based on the answers

This is the MVP described in the PRD: rule-based projections (no auth, no AI).

## Local development

Prereqs: **Node.js 18+**

```bash
cd marketing-planner
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## How it works

- **Company Overview** updates after you answer the first two questions (company name + product/service).
- **Chart + Tips** remain locked until you complete the required marketing questions.

Required questions live in `src/lib/marketingPlan.ts`.

## Scripts

```bash
# Lint
npm run lint

# Unit tests
npm run test
npm run test:run

# Production build
npm run build
npm run preview
```

## Tech

- React (functional components) + TypeScript
- Tailwind CSS (via Vite plugin)
- Recharts for data visualization
- Vitest + Testing Library for fast unit tests
