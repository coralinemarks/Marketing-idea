import { useReducer } from 'react'
import { CompanyOverview } from './components/CompanyOverview'
import { Chat } from './components/Chat'
import { MarketingChart } from './components/MarketingChart'
import { SectionCard } from './components/SectionCard'
import { Tips } from './components/Tips'
import { createInitialState, marketingReducer } from './state/marketingReducer'

function App() {
  const [state, dispatch] = useReducer(marketingReducer, undefined, createInitialState)

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.08),transparent_50%),radial-gradient(900px_circle_at_80%_30%,rgba(5,150,105,0.08),transparent_55%)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-8 sm:px-6">
        <CompanyOverview answers={state.answers} />

        <SectionCard
          title="Interactive chat"
          subtitle="Answer a few guided questions to generate your marketing projection and execution tips."
          right={
            <button
              type="button"
              onClick={() => dispatch({ type: 'reset' })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Reset
            </button>
          }
        >
          <Chat state={state} onSubmit={(raw) => dispatch({ type: 'submit', raw })} />
        </SectionCard>

        <SectionCard
          title="Marketing success projection"
          subtitle="Projected 0–100 index across growth, engagement, and revenue."
        >
          <MarketingChart answers={state.answers} />
        </SectionCard>

        <SectionCard
          title="Tips & execution guidance"
          subtitle="Actionable recommendations based on your answers."
        >
          <Tips answers={state.answers} />
        </SectionCard>

        <footer className="pb-4 text-xs text-slate-500">
          MVP uses rule-based projections (no accounts, no AI).
        </footer>
      </div>
    </div>
  )
}

export default App
