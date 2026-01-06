import { isPlanComplete, type MarketingPlanAnswers } from '../lib/marketingPlan'
import { buildTips } from '../lib/tips'

function Locked() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
      Finish the chat questions to unlock personalized tips.
    </div>
  )
}

export function Tips({ answers }: { answers: MarketingPlanAnswers }) {
  if (!isPlanComplete(answers)) return <Locked />

  const tips = buildTips(answers)

  return (
    <div className="grid gap-3">
      {tips.map((t) => (
        <div key={t.title} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm font-semibold text-slate-900">{t.title}</div>
          <p className="mt-1 text-sm leading-6 text-slate-600">{t.body}</p>
        </div>
      ))}
    </div>
  )
}

