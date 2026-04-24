import { useState, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { getCoursesByRole, getEpisodes } from '../data/index'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function QuizPage() {
  const { role } = useApp()
  const courses = getCoursesByRole(role)
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || '')
  const [count, setCount] = useState(10)
  const [quiz, setQuiz] = useState(null) // null = setup, array = active
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [timer, setTimer] = useState(60)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)

  const nextQuestion = useCallback(() => {
    const isCorrect = selected === quiz[current].answer
    const newResults = [...results, { correct: isCorrect, mcq: quiz[current], selected }]
    if (current + 1 >= quiz.length) {
      setResults(newResults)
      setDone(true)
    } else {
      setResults(newResults)
      setCurrent(c => c + 1)
      setSelected(null)
      setTimer(60)
    }
  }, [selected, quiz, current, results])

  useEffect(() => {
    if (!quiz || done) return
    if (selected !== null) return
    const t = setInterval(() => {
      setTimer(s => {
        if (s <= 1) { nextQuestion(); return 60 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [quiz, done, selected, nextQuestion])

  function startQuiz() {
    const course = courses.find(c => c.id === selectedCourse)
    if (!course) return
    const allMcqs = getEpisodes(course).flatMap(ep => (ep.mcqs || []).map(m => ({ ...m, episodeTitle: ep.title })))
    const picked = shuffle(allMcqs).slice(0, count)
    setQuiz(picked)
    setCurrent(0)
    setSelected(null)
    setTimer(60)
    setResults([])
    setDone(false)
  }

  function resetQuiz() {
    setQuiz(null)
    setDone(false)
    setResults([])
  }

  const timerColor = timer > 20 ? 'text-green-400' : timer > 10 ? 'text-yellow-400' : 'text-red-400'

  if (!quiz) return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6">Start Quiz</h1>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Course</label>
              <select
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-orange-500"
              >
                {courses.map(c => <option key={c.id} value={c.id}>{c.icon} {c.title}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1">Questions</label>
              <div className="flex gap-2">
                {[5, 10, 20].map(n => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${count === n ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={startQuiz}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Start Quiz →
            </button>
          </div>
        </div>
        <AIChat />
      </main>
    </div>
  )

  if (done) {
    const score = results.filter(r => r.correct).length
    const pct = Math.round((score / results.length) * 100)
    return (
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center mb-6">
              <div className="text-5xl mb-4">{pct >= 70 ? 'Great!' : pct >= 50 ? 'Keep going' : 'Try again'}</div>
              <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
              <p className="text-gray-400 mb-4">{score}/{results.length} correct</p>
              <div className="text-5xl font-bold text-orange-500 mb-4">{pct}%</div>
              <button onClick={resetQuiz} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Try Again
              </button>
            </div>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div key={i} className={`p-4 rounded-xl border ${r.correct ? 'border-green-800 bg-green-500/5' : 'border-red-800 bg-red-500/5'}`}>
                  <p className="text-white text-sm font-medium mb-1">{r.mcq.question}</p>
                  <p className="text-xs text-gray-400">Correct: {r.mcq.options[r.mcq.answer]}</p>
                  {!r.correct && r.selected !== null && <p className="text-xs text-red-400">Your answer: {r.mcq.options[r.selected]}</p>}
                  {r.selected === null && <p className="text-xs text-yellow-400">Time ran out</p>}
                </div>
              ))}
            </div>
          </div>
          <AIChat />
        </main>
      </div>
    )
  }

  const q = quiz[current]
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400 text-sm">Question {current + 1} of {quiz.length}</p>
            <span className={`text-2xl font-bold tabular-nums ${timerColor}`}>{timer}s</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1 mb-6">
            <div className="bg-orange-500 h-1 rounded-full transition-all" style={{ width: `${((current) / quiz.length) * 100}%` }} />
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-500 mb-3">{q.episodeTitle}</p>
            <p className="text-white font-semibold mb-5">{q.question}</p>
            <div className="space-y-2 mb-6">
              {q.options.map((opt, i) => {
                let cls = 'w-full text-left px-4 py-3 rounded-xl text-sm border transition-all '
                if (selected === null) cls += 'border-gray-700 text-gray-300 hover:border-orange-500 hover:text-white hover:bg-gray-800'
                else if (i === q.answer) cls += 'border-green-500 bg-green-500/10 text-green-400'
                else if (i === selected) cls += 'border-red-500 bg-red-500/10 text-red-400'
                else cls += 'border-gray-800 text-gray-600'
                return (
                  <button key={i} className={cls} onClick={() => selected === null && setSelected(i)}>
                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                  </button>
                )
              })}
            </div>
            {selected !== null && (
              <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-400"><span className="text-orange-400 font-semibold">Explanation:</span> {q.explanation}</p>
              </div>
            )}
            <button
              onClick={nextQuestion}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              {current + 1 === quiz.length ? 'Finish Quiz' : 'Next Question →'}
            </button>
          </div>
        </div>
        <AIChat />
      </main>
    </div>
  )
}
