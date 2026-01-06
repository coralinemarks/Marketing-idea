import { describe, expect, it } from 'vitest'
import { buildProjection } from './projection'

describe('buildProjection', () => {
  it('returns months 0..12', () => {
    const points = buildProjection({
      monthlyBudget: 1000,
      channels: ['SEO', 'Email'],
      targetAudience: 'SMB founders',
    })

    expect(points).toHaveLength(13)
    expect(points[0]?.month).toBe(0)
    expect(points[12]?.month).toBe(12)
  })

  it('keeps values within 0..100', () => {
    const points = buildProjection({
      monthlyBudget: 100000,
      channels: ['SEO', 'Paid Search', 'Paid Social', 'Email'],
      targetAudience: 'Teams needing help with procurement workflows',
    })

    for (const p of points) {
      expect(p.growth).toBeGreaterThanOrEqual(0)
      expect(p.growth).toBeLessThanOrEqual(100)
      expect(p.engagement).toBeGreaterThanOrEqual(0)
      expect(p.engagement).toBeLessThanOrEqual(100)
      expect(p.revenue).toBeGreaterThanOrEqual(0)
      expect(p.revenue).toBeLessThanOrEqual(100)
    }
  })
})

