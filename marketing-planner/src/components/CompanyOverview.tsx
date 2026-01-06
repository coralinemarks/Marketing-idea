import type { MarketingPlanAnswers } from '../lib/marketingPlan'

export function CompanyOverview({ answers }: { answers: MarketingPlanAnswers }) {
  const name = answers.companyName?.trim()
  const desc = answers.productDescription?.trim()

  return (
    <header className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Marketing Planner
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {name ? name : 'Your company name'}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          {desc ? desc : 'Describe your product or service to see it here.'}
        </p>
      </div>
    </header>
  )
}

