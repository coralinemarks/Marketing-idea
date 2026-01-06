import type { MarketingPlanAnswers } from './marketingPlan'

function normalize(s: string) {
  return s.trim().toLowerCase()
}

export type Tip = {
  title: string
  body: string
}

export function buildTips(answers: MarketingPlanAnswers): Tip[] {
  const tips: Tip[] = []

  const audience = answers.targetAudience ?? ''
  const audienceNorm = normalize(audience)
  const channels = Array.isArray(answers.channels) ? answers.channels : []
  const channelsNorm = channels.map((c) => normalize(c))
  const budget = typeof answers.monthlyBudget === 'number' ? answers.monthlyBudget : undefined

  if (audienceNorm.includes('everyone') || audienceNorm.includes('anyone') || audienceNorm.includes('all')) {
    tips.push({
      title: 'Narrow your audience',
      body: 'Replace “everyone” with a specific segment (role, industry, geography, urgency). Clear targeting improves messaging, creatives, and channel efficiency.',
    })
  }

  if (channels.length >= 6) {
    tips.push({
      title: 'Focus your channels',
      body: 'Pick 2–3 primary channels to execute consistently. Too many channels early usually means shallow execution and noisy results.',
    })
  } else if (channels.length <= 2) {
    tips.push({
      title: 'Add one complementary channel',
      body: 'Pair your main channel with a support channel (e.g., SEO + email, paid social + landing page optimization) so you can capture and nurture demand.',
    })
  }

  const hasEmail = channelsNorm.some((c) => c.includes('email'))
  if (!hasEmail) {
    tips.push({
      title: 'Build an email capture loop',
      body: 'Use a lead magnet or newsletter to collect emails and run a simple nurture sequence. This compounds results across all channels.',
    })
  }

  const hasContent = channelsNorm.some((c) => c.includes('seo') || c.includes('content') || c.includes('blog'))
  if (!hasContent) {
    tips.push({
      title: 'Add a content/SEO backbone',
      body: 'Publish 2–4 pieces/month targeting high-intent keywords or customer questions. Content improves trust and reduces paid spend over time.',
    })
  }

  if (budget != null) {
    if (budget < 500) {
      tips.push({
        title: 'Lean into organic execution',
        body: 'With a small budget, prioritize distribution (partners, communities, referrals) and one repeatable content format. Save paid spend for small tests noticing what converts.',
      })
    } else if (budget >= 5000) {
      tips.push({
        title: 'Allocate budget with guardrails',
        body: 'Split budget into: 70% proven channel(s), 20% experiments, 10% retention (email, onboarding). Review weekly and double down on what hits your KPI.',
      })
    }
  }

  tips.push({
    title: 'Clarify your core message',
    body: 'Write one sentence: “For [audience], we help you [outcome] by [unique approach].” Use it across ads, landing pages, and sales outreach for consistency.',
  })

  tips.push({
    title: 'Measure a single north-star KPI',
    body: 'Choose one metric tied to business value (leads, trials, booked calls, revenue). Track it weekly, and keep channel experiments small and time-boxed.',
  })

  return tips
}

