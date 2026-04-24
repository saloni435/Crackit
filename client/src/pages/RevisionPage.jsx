import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getCoursesByRole, getEpisodes } from '../data/index'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

const TODAY = new Date().toISOString().slice(0, 10)

export function getDueMcqs(courses, mcqState) {
  const due = []
  for (const course of courses) {
    for (const ep of getEpisodes(course)) {
      for (let i = 0; i < (ep.mcqs || []).length; i++) {
        const mcq = ep.mcqs[i]
        const id = `${ep.id}-mcq-${i}`
        const state = mcqState[id]
        const isDue = !state || state.nextReview <= TODAY
        if (isDue) due.push({ ...mcq, id, episodeTitle: ep.title, courseId: course.id })
      }
    }
  }
  return due
}

export default function RevisionPage() {
  const { role, mcqState, syncMcqState } = useApp()
  const courses = getCoursesByRole(role)

  const dueMcqs = useMemo(() => getDueMcqs(courses, mcqState), [mcqState, courses])

  const [queue, setQueue] = useState(() => dueMcqs.slice())
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [sessionResults, setSessionResults] = useState([])
  const [done, setDone] = useState(false)

  function handleOption(idx) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
  }

  async function handleNext(correct) {
    const mcq = queue[current]
    await syncMcqState(mcq.id, correct)
    const newResults = [...sessionResults, { mcq, correct }]
    setSessionResults(newResults)

    if (current + 1 >= queue.length) {
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  if (queue.length === 0 || (done && queue.length === 0)) {
    return (
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-white text-xl font-bold mb-2">All caught up!</h2>
            <p className="text-gray-400 text-sm mb-6">No MCQs due for review today. Come back tomorrow!</p>
            <div className="bg-gray-800 rounded-xl p-4 text-left space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Next due</p>
              {Object.entries(mcqState)
                .filter(([, s]) => s.nextReview > TODAY)
                .sort((a, b) => a[1].nextReview.localeCompare(b[1].nextReview))
                .slice(0, 3)
                .map(([id, s]) => (
                  <div key={id} className="flex justify-between text-xs">
                    <span className="text-gray-400 truncate">{id}</span>
                    <span className="text-orange-400 ml-2 flex-shrink-0">{s.nextReview}</span>
                  </div>
                ))}
            </div>
          </motion.div>
          <AIChat />
        </main>
      </div>
    )
  }

  if (done) {
    const correct = sessionResults.filter(r => r.correct).length
    const wrong = sessionResults.length - correct

    // Next session info
    const nextDue = Object.values(mcqState)
      .filter(s => s.nextReview > TODAY)
      .sort((a, b) => a.nextReview.localeCompare(b.nextReview))
    const nextDate = nextDue[0]?.nextReview || 'tomorrow'

    return (
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-white text-xl font-bold mb-1">Session Complete!</h2>
            <p className="text-gray-400 text-sm mb-6">{queue.length} cards reviewed</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-green-500/10 border border-green-900 rounded-xl p-3">
                <p className="text-green-400 text-2xl font-bold">{correct}</p>
                <p className="text-gray-500 text-xs">Got it</p>
              </div>
              <div className="bg-red-500/10 border border-red-900 rounded-xl p-3">
                <p className="text-red-400 text-2xl font-bold">{wrong}</p>
                <p className="text-gray-500 text-xs">Again</p>
              </div>
            </div>

            <p className="text-gray-500 text-xs mb-6">
              Next review session: <span className="text-orange-400">{nextDate}</span>
            </p>

            <button
              onClick={() => { setQueue(dueMcqs.slice()); setCurrent(0); setSelected(null); setAnswered(false); setSessionResults([]); setDone(false) }}
              className="w-full py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm transition-all"
            >
              Back to start
            </button>
          </motion.div>
          <AIChat />
        </main>
      </div>
    )
  }

  const mcq = queue[current]
  const isCorrect = selected === mcq.answer
  const progress = Math.round((current / queue.length) * 100)

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
            <span>🔁 Revision — {current + 1} / {queue.length}</span>
            <span className="text-orange-400 font-medium">{queue.length - current} left today</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5 mb-8">
            <div className="bg-orange-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <p className="text-xs text-gray-600 mb-3">{mcq.episodeTitle}</p>
              <h2 className="text-white text-base font-semibold leading-relaxed mb-5">{mcq.question}</h2>

              {/* Options */}
              <div className="space-y-2 mb-5">
                {mcq.options.map((opt, idx) => {
                  let cls = 'border-gray-700 text-gray-300 hover:border-gray-500'
                  if (answered) {
                    if (idx === mcq.answer) cls = 'border-green-500 bg-green-500/10 text-green-300'
                    else if (idx === selected) cls = 'border-red-500 bg-red-500/10 text-red-300'
                    else cls = 'border-gray-800 text-gray-600'
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOption(idx)}
                      disabled={answered}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}
                    >
                      <span className="text-gray-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  )
                })}
              </div>

              {/* Explanation + next */}
              {answered && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className={`rounded-xl p-3 mb-4 text-xs ${isCorrect ? 'bg-green-500/10 border border-green-900 text-green-300' : 'bg-red-500/10 border border-red-900 text-red-300'}`}>
                    {isCorrect ? '✅ Correct! ' : '❌ Incorrect. '}{mcq.explanation}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleNext(false)}
                      className="flex-1 py-2.5 rounded-xl border border-red-900 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
                    >
                      Again
                    </button>
                    <button
                      onClick={() => handleNext(true)}
                      className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-all"
                    >
                      Got it ✓
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <AIChat />
    </div>
  )
}
