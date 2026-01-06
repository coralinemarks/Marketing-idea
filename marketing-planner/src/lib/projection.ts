import type { MarketingPlanAnswers } from './marketingPlan'

export type ProjectionPoint = {
  month: number
  growth: number
  engagement: number
  revenue: number
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

/**
 * Simple rule-based projection for MVP.
 * Produces 13 points (month 0..12) on an index scale 0..100.
 */
export function buildProjection(answers: MarketingPlanAnswers): ProjectionPoint[] {
  const budget = typeof answers.monthlyBudget === 'number' ? answers.monthlyBudget : 0
  const channels = Array.isArray(answers.channels) ? answers.channels : []
  const audience = answers.targetAudience ?? ''

  const budgetScore = clamp(Math.log10(budget + 10) / 4, 0, 1) // ~$0..$10k+
  const channelScore = clamp(channels.length / 4, 0, 1)
  const audienceScore = clamp(audience.trim().length / 80, 0, 1)

  const score = clamp(0.15 + 0.55 * budgetScore + 0.2 * channelScore + 0.1 * audienceScore, 0, 1)

  const points: ProjectionPoint[] = []
  for (let m = 0; m <= 12; m++) {
    const base = 18 + score * 22
    const momentum = score * 6.5 + 1.8
    const seasonality = Math.sin(m / 2) * (1.2 + score * 1.5)

    const growth = clamp(base + m * momentum + seasonality, 0, 100)
    const engagement = clamp(base + m * (momentum * 0.85) + seasonality * 1.2 + score * 6, 0, 100)

    const revenueLag = m < 2 ? 0.65 : 1
    const revenue = clamp(base + m * (momentum * 0.95) * revenueLag + score * 10, 0, 100)

    points.push({
      month: m,
      growth: Math.round(growth),
      engagement: Math.round(engagement),
      revenue: Math.round(revenue),
    })
  }
  return points
}

