import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'
import dsaProblems from '../data/dsa'
import { useApp } from '../context/AppContext'

const TOPICS = ['All', 'Array', 'String', 'Linked List', 'Tree', 'Graph', 'Dynamic Programming', 'Binary Search', 'Stack', 'Sorting', 'Backtracking', 'Heap', 'Trie', 'Bit Manipulation']
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']

const diffColors = {
  Easy: 'text-green-400 bg-green-400/10 border-green-800',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-800',
  Hard: 'text-red-400 bg-red-400/10 border-red-800',
}

const patternColors = [
  'bg-purple-900/40 text-purple-300',
  'bg-blue-900/40 text-blue-300',
  'bg-teal-900/40 text-teal-300',
  'bg-orange-900/40 text-orange-300',
  'bg-pink-900/40 text-pink-300',
]

export default function DSAPage() {
  const { dsaSolved, syncDsa } = useApp()
  const [topic, setTopic] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [search, setSearch] = useState('')

  function toggleSolved(id) {
    const isSolved = dsaSolved.has(id)
    syncDsa(id, !isSolved)
  }

  const filtered = useMemo(() => dsaProblems.filter(p => {
    if (topic !== 'All' && p.topic !== topic) return false
    if (difficulty !== 'All' && p.difficulty !== difficulty) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.pattern.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }), [topic, difficulty, search])

  const solvedCount = dsaProblems.filter(p => dsaSolved.has(p.id)).length

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-white">DSA Practice</h1>
            <p className="text-gray-400 text-sm mt-1">{solvedCount} / {dsaProblems.length} solved</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 bg-gray-800 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${(solvedCount / dsaProblems.length) * 100}%` }} />
            </div>
            <span className="text-xs text-gray-500">{Math.round((solvedCount / dsaProblems.length) * 100)}%</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {['Easy', 'Medium', 'Hard'].map(d => {
            const total = dsaProblems.filter(p => p.difficulty === d).length
            const done = dsaProblems.filter(p => p.difficulty === d && dsaSolved.has(p.id)).length
            return (
              <div key={d} className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${diffColors[d]}`}>
                {d}: {done}/{total}
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search problems or patterns..."
            className="w-full max-w-md bg-gray-900 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
          />
          <div className="flex flex-wrap gap-1.5">
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${difficulty === d ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TOPICS.map(t => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${topic === t ? 'bg-gray-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-600 mb-4">{filtered.length} problems</p>

        {/* Problem list */}
        <div className="space-y-2">
          {filtered.map((problem, i) => {
            const isSolved = dsaSolved.has(problem.id)
            const patternColor = patternColors[problem.title.charCodeAt(0) % patternColors.length]
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.3) }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-orange-500/50 ${isSolved ? 'bg-green-500/5 border-green-900' : 'bg-gray-900 border-gray-800'}`}
              >
                {/* Solved checkbox */}
                <button
                  onClick={() => toggleSolved(problem.id)}
                  className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isSolved ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-orange-500'}`}
                >
                  {isSolved && <span className="text-white text-xs font-bold">✓</span>}
                </button>

                {/* Problem number */}
                <span className="text-gray-600 text-xs w-8 flex-shrink-0">#{i + 1}</span>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-medium ${isSolved ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {problem.title}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColors[problem.difficulty]}`}>
                      {problem.difficulty}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${patternColor}`}>
                      {problem.pattern}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{problem.description}</p>
                </div>

                {/* Topic tag */}
                <span className="text-xs text-gray-600 flex-shrink-0 hidden sm:block">{problem.topic}</span>

                {/* LeetCode link */}
                <a
                  href={problem.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500 border border-orange-800 hover:border-orange-500 text-orange-400 hover:text-white text-xs font-semibold rounded-lg transition-all"
                  onClick={e => e.stopPropagation()}
                >
                  Solve →
                </a>
              </motion.div>
            )
          })}
          {filtered.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-12">No problems match your filters.</p>
          )}
        </div>
      </main>
      <AIChat />
    </div>
  )
}
