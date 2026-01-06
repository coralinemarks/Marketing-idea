import { QUESTIONS, type MarketingPlanAnswers, type QuestionId } from '../lib/marketingPlan'

export type ChatRole = 'system' | 'user'

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}

export type MarketingState = {
  answers: MarketingPlanAnswers
  questionIndex: number
  messages: ChatMessage[]
  inputError?: string
}

function sysMessage(text: string): ChatMessage {
  return { id: crypto.randomUUID(), role: 'system', text }
}

function userMessage(text: string): ChatMessage {
  return { id: crypto.randomUUID(), role: 'user', text }
}

export function createInitialState(): MarketingState {
  return {
    answers: {},
    questionIndex: 0,
    messages: [sysMessage(QUESTIONS[0]?.prompt ?? 'Let’s start.')],
  }
}

export type MarketingAction =
  | { type: 'submit'; raw: string }
  | { type: 'reset' }
  | { type: 'setAnswer'; id: QuestionId; value: MarketingPlanAnswers[QuestionId] }

export function marketingReducer(state: MarketingState, action: MarketingAction): MarketingState {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'setAnswer': {
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
      }
    }
    case 'submit': {
      const q = QUESTIONS[state.questionIndex]
      if (!q) return state

      const parsed = q.parse(action.raw)
      if (parsed == null) {
        return {
          ...state,
          inputError: 'Please enter a valid answer to continue.',
        }
      }

      const formatted = q.formatAnswer ? q.formatAnswer(parsed as never) : String(parsed)

      const nextAnswers: MarketingPlanAnswers = {
        ...state.answers,
        [q.id]: parsed,
      }

      const nextIndex = state.questionIndex + 1
      const nextQuestion = QUESTIONS[nextIndex]

      const nextMessages: ChatMessage[] = [
        ...state.messages,
        userMessage(formatted),
        ...(nextQuestion ? [sysMessage(nextQuestion.prompt)] : [sysMessage('Thanks! Generating your plan…')]),
      ]

      return {
        ...state,
        answers: nextAnswers,
        questionIndex: nextIndex,
        messages: nextMessages,
        inputError: undefined,
      }
    }
    default:
      return state
  }
}

