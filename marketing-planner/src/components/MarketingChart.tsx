import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { buildProjection } from '../lib/projection'
import { isPlanComplete, type MarketingPlanAnswers } from '../lib/marketingPlan'

function Locked() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
      Complete the required questions in chat to unlock your projection.
    </div>
  )
}

export function MarketingChart({ answers }: { answers: MarketingPlanAnswers }) {
  if (!isPlanComplete(answers)) return <Locked />

  const data = buildProjection(answers)

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.35} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickFormatter={(m) => `M${m}`}
            label={{ value: 'Time (months)', position: 'insideBottom', offset: -2 }}
          />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Index (0–100)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            formatter={(v: number, k: string) => [v, k[0]?.toUpperCase() + k.slice(1)]}
            labelFormatter={(label) => `Month ${label}`}
          />
          <Legend />
          <Line type="monotone" dataKey="growth" stroke="#0f172a" strokeWidth={2.25} dot={false} />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#2563eb"
            strokeWidth={2.25}
            dot={false}
          />
          <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2.25} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

