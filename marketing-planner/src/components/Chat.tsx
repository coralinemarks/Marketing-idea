import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { QUESTIONS } from '../lib/marketingPlan'
import type { ChatMessage, MarketingState } from '../state/marketingReducer'

function ChatBubble({ m }: { m: ChatMessage }) {
  const isUser = m.role === 'user'
  return (
    <div className={clsx('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-6 shadow-sm',
          isUser
            ? 'bg-slate-900 text-white'
            : 'bg-white text-slate-800 ring-1 ring-slate-200/70',
        )}
      >
        {m.text}
      </div>
    </div>
  )
}

export function Chat({
  state,
  onSubmit,
}: {
  state: MarketingState
  onSubmit: (raw: string) => void
}) {
  const [raw, setRaw] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  const isDone = state.questionIndex >= QUESTIONS.length
  const current = QUESTIONS[state.questionIndex]

  const placeholder = useMemo(() => {
    if (isDone) return 'All set — scroll up to review.'
    return current?.placeholder ?? 'Type your answer…'
  }, [current?.placeholder, isDone])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [state.messages.length])

  return (
    <div className="flex flex-col gap-3">
      <div className="h-[320px] overflow-auto rounded-xl border border-slate-200/70 bg-white/60 p-3 shadow-inner backdrop-blur">
        <div className="flex flex-col gap-3">
          {state.messages.map((m) => (
            <ChatBubble key={m.id} m={m} />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (isDone) return
          onSubmit(raw)
          setRaw('')
        }}
      >
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="chat-input">
            Chat input
          </label>
          <input
            id="chat-input"
            className={clsx(
              'w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none',
              'border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200',
              isDone && 'cursor-not-allowed bg-slate-50 text-slate-500',
            )}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={placeholder}
            disabled={isDone}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isDone}
            className={clsx(
              'rounded-xl px-4 py-2 text-sm font-medium shadow-sm',
              isDone
                ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                : 'bg-slate-900 text-white hover:bg-slate-800',
            )}
          >
            Send
          </button>
        </div>

        {state.inputError ? (
          <p className="text-sm text-rose-700">{state.inputError}</p>
        ) : (
          <p className="text-xs text-slate-500">
            {isDone
              ? 'Completed — your chart and tips are ready below.'
              : 'Press Enter to send. Use commas for multiple channels.'}
          </p>
        )}
      </form>
    </div>
  )
}

