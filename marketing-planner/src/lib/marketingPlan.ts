export type MarketingPlanAnswers = {
  companyName?: string
  productDescription?: string
  targetAudience?: string
  channels?: string[]
  monthlyBudget?: number
}

export type QuestionId = keyof MarketingPlanAnswers

export type MarketingQuestion<T extends QuestionId = QuestionId> = {
  id: T
  prompt: string
  placeholder?: string
  /**
   * Parse the raw user input. Return null if invalid.
   */
  parse: (raw: string) => MarketingPlanAnswers[T] | null
  /**
   * Used to echo a cleaned value back in chat UI.
   */
  formatAnswer?: (value: MarketingPlanAnswers[T]) => string
}

export const QUESTIONS: MarketingQuestion[] = [
  {
    id: 'companyName',
    prompt: "What is your company name?",
    placeholder: "e.g., Acme Co",
    parse: (raw) => {
      const v = raw.trim()
      return v.length >= 2 ? v : null
    },
  },
  {
    id: 'productDescription',
    prompt: "What product or service do you provide?",
    placeholder: "A short description in one sentence",
    parse: (raw) => {
      const v = raw.trim()
      return v.length >= 10 ? v : null
    },
  },
  {
    id: 'targetAudience',
    prompt: "Who is your target audience?",
    placeholder: "e.g., Busy parents in urban areas",
    parse: (raw) => {
      const v = raw.trim()
      return v.length >= 5 ? v : null
    },
  },
  {
    id: 'channels',
    prompt: "What marketing channels are you planning to use?",
    placeholder: "e.g., SEO, Instagram, Email",
    parse: (raw) => {
      const channels = raw
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .slice(0, 10)

      if (channels.length === 0) return null

      // De-duplicate (case-insensitive) while preserving original casing.
      const seen = new Set<string>()
      const deduped: string[] = []
      for (const c of channels) {
        const key = c.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        deduped.push(c)
      }
      return deduped
    },
    formatAnswer: (value) => (Array.isArray(value) ? value.join(', ') : ''),
  },
  {
    id: 'monthlyBudget',
    prompt: "What is your monthly marketing budget (USD)?",
    placeholder: "e.g., 1500",
    parse: (raw) => {
      const normalized = raw.replace(/[$,]/g, '').trim()
      const n = Number(normalized)
      if (!Number.isFinite(n) || n <= 0) return null
      return Math.round(n)
    },
    formatAnswer: (value) =>
      typeof value === 'number' ? `$${value.toLocaleString()}` : '',
  },
]

export function isPlanComplete(a: MarketingPlanAnswers): a is Required<MarketingPlanAnswers> {
  return Boolean(
    a.companyName &&
      a.productDescription &&
      a.targetAudience &&
      a.channels &&
      a.channels.length > 0 &&
      typeof a.monthlyBudget === 'number' &&
      a.monthlyBudget > 0,
  )
}

