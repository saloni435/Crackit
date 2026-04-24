import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getCoursesByRole, getEpisodes } from '../data/index'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const COUNTS = [5, 10, 15]
const RATINGS = [
  { key: 'knew', label: '✅ Knew it', color: 'bg-green-500 hover:bg-green-600', text: 'text-green-400' },
  { key: 'partial', label: '😐 Partial', color: 'bg-yellow-500 hover:bg-yellow-600', text: 'text-yellow-400' },
  { key: 'missed', label: '❌ Missed', color: 'bg-red-500 hover:bg-red-600', text: 'text-red-400' },
]

export default function MockInterviewPage() {
  const { role, saveInterviewAttempt } = useApp()
  const courses = getCoursesByRole(role)

  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '')
  const [count, setCount] = useState(5)
  const [questions, setQuestions] = useState(null)
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)

  const selectedCourse = courses.find(c => c.id === selectedCourseId)

  function startInterview() {
    const episodes = getEpisodes(selectedCourse)
    const all = episodes.flatMap(ep =>
      (ep.interviewQuestions || []).map(q => ({ ...q, episodeTitle: ep.title }))
    )
    setQuestions(shuffle(all).slice(0, count))
    setCurrent(0)
    setRevealed(false)
    setResults([])
    setDone(false)
  }

  function rate(key) {
    const q = questions[current]
    const newResults = [...results, { q, rating: key }]
    setResults(newResults)

    if (current + 1 >= questions.length) {
      setDone(true)
      const knew = newResults.filter(r => r.rating === 'knew').length
      const partial = newResults.filter(r => r.rating === 'partial').length
      const missed = newResults.filter(r => r.rating === 'missed').length
      saveInterviewAttempt({
        courseId: selectedCourseId,
        knew, partial, missed,
        total: questions.length,
        date: new Date().toISOString().slice(0, 10),
      })
    } else {
      setCurrent(c => c + 1)
      setRevealed(false)
    }
  }

  function retryMissed() {
    const missed = results.filter(r => r.rating !== 'knew').map(r => r.q)
    if (!missed.length) return
    setQuestions(missed)
    setCurrent(0)
    setRevealed(false)
    setResults([])
    setDone(false)
  }

  // Setup screen
  if (!questions) {
    return (
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-lg">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🎯</div>
              <h1 className="text-2xl font-bold text-white mb-2">Mock Interview</h1>
              <p className="text-gray-400 text-sm">Question → Think → Reveal → Rate yourself</p>
            </div>

            <div className="space-y-5 mb-8">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Choose course</label>
                <div className="space-y-2">
                  {courses.map(c => (
                    <button key={c.id} onClick={() => setSelectedCourseId(c.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selectedCourseId === c.id ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                      <span className="text-xl">{c.icon}</span>
                      <span className="text-white text-sm font-medium">{c.title}</span>
                      {selectedCourseId === c.id && <span className="ml-auto text-orange-500 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Number of questions</label>
                <div className="flex gap-2">
                  {COUNTS.map(n => (
                    <button key={n} onClick={() => setCount(n)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${count === n ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={startInterview}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm">
              Start Interview →
            </button>
          </motion.div>
          <AIChat />
        </main>
      </div>
    )
  }

  // Results screen
  if (done) {
    const knew = results.filter(r => r.rating === 'knew').length
    const partial = results.filter(r => r.rating === 'partial').length
    const missed = results.filter(r => r.rating === 'missed').length
    const weakCount = results.filter(r => r.rating !== 'knew').length

    return (
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 p-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🏁</div>
              <h1 className="text-2xl font-bold text-white mb-1">Interview Complete!</h1>
              <p className="text-gray-400 text-sm">{questions.length} questions · {selectedCourse?.title}</p>
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Knew it', count: knew, color: 'text-green-400', bg: 'bg-green-500/10 border-green-900' },
                { label: 'Partial', count: partial, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-900' },
                { label: 'Missed', count: missed, color: 'text-red-400', bg: 'bg-red-500/10 border-red-900' },
              ].map(s => (
                <div key={s.label} className={`rounded-xl border p-4 text-center ${s.bg}`}>
                  <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
                  <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={() => setQuestions(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm transition-all">
                New Session
              </button>
              {weakCount > 0 && (
                <button onClick={retryMissed}
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all">
                  Retry {weakCount} Weak →
                </button>
              )}
            </div>

            {/* Review */}
            <h3 className="text-white font-semibold text-sm mb-3">Question Review</h3>
            <div className="space-y-3">
              {results.map((r, i) => {
                const rating = RATINGS.find(rt => rt.key === r.rating)
                return (
                  <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-white text-sm font-medium">{r.q.q}</p>
                      <span className={`text-xs flex-shrink-0 ${rating.text}`}>{rating.label}</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{r.q.a}</p>
                    <p className="text-gray-700 text-xs mt-1">{r.q.episodeTitle}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </main>
        <AIChat />
      </div>
    )
  }

  // Active question screen
  const q = questions[current]
  const progress = Math.round(((current) / questions.length) * 100)

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
            <span>Question {current + 1} of {questions.length}</span>
            <span className="text-gray-600">{selectedCourse?.title}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5 mb-8">
            <div className="bg-orange-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">{q.episodeTitle}</p>
              <h2 className="text-white text-lg font-semibold leading-relaxed mb-6">{q.q}</h2>

              {!revealed ? (
                <button onClick={() => setRevealed(true)}
                  className="w-full py-3 rounded-xl border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-sm font-medium transition-all">
                  Show Answer →
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="border-t border-gray-800 pt-4 mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Answer</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{q.a}</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 text-center">How well did you know this?</p>
                  <div className="flex gap-2">
                    {RATINGS.map(r => (
                      <button key={r.key} onClick={() => rate(r.key)}
                        className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all ${r.color}`}>
                        {r.label}
                      </button>
                    ))}
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
