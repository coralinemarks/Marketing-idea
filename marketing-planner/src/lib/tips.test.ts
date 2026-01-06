import { describe, expect, it } from 'vitest'
import { buildTips } from './tips'

describe('buildTips', () => {
  it('suggests narrowing when audience is broad', () => {
    const tips = buildTips({
      targetAudience: 'Everyone',
      channels: ['Instagram'],
      monthlyBudget: 200,
    })

    expect(tips.some((t) => t.title.toLowerCase().includes('narrow'))).toBe(true)
  })

  it('adds budget guidance for small budgets', () => {
    const tips = buildTips({
      targetAudience: 'Busy parents',
      channels: ['SEO'],
      monthlyBudget: 100,
    })

    expect(tips.some((t) => t.title.toLowerCase().includes('organic'))).toBe(true)
  })
})

