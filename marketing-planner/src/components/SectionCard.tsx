import type { PropsWithChildren, ReactNode } from 'react'
import clsx from 'clsx'

export function SectionCard({
  title,
  subtitle,
  children,
  className,
  right,
}: PropsWithChildren<{
  title: string
  subtitle?: string
  className?: string
  right?: ReactNode
}>) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur',
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {children}
    </section>
  )
}

