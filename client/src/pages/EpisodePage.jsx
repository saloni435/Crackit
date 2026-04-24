import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCourseById, getEpisodeById } from '../data/index'
import { useProgress } from '../hooks/useProgress'
import InterviewQuestion from '../components/InterviewQuestion'
import MCQCard from '../components/MCQCard'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

const tabs = ['Topics', 'Interview Questions', 'MCQs']

export default function EpisodePage() {
  const { courseId, episodeId } = useParams()
  const course = getCourseById(courseId)
  const episode = getEpisodeById(course, episodeId)
  const { isComplete, toggle } = useProgress(courseId)
  const [tab, setTab] = useState('Topics')

  if (!course || !episode) return <div className="flex min-h-screen bg-gray-950"><Sidebar /><main className="flex-1 p-8 text-white">Not found.</main></div>

  const done = isComplete(episode.id)

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 max-w-3xl">
        <Link to={`/course/${courseId}`} className="text-gray-500 text-sm hover:text-white">← {course.title}</Link>
        <div className="mt-4 mb-6 flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-xs mb-1">#{episode.number}</p>
            <h1 className="text-2xl font-bold text-white">{episode.title}</h1>
          </div>
          <button
            onClick={() => toggle(episode.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${done ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-gray-700 text-gray-400 hover:border-orange-500 hover:text-white'}`}
          >
            {done ? '✓ Complete' : 'Mark Complete'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-900 p-1 rounded-xl w-fit">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Topics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            {episode.topics.map(t => (
              <div key={t} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-orange-500">▸</span>
                <span className="text-gray-200 text-sm">{t}</span>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'Interview Questions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {episode.interviewQuestions.map((q, i) => (
              <InterviewQuestion key={i} question={q} index={i} />
            ))}
          </motion.div>
        )}

        {tab === 'MCQs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {episode.mcqs.map((mcq, i) => (
              <MCQCard key={i} mcq={mcq} index={i} />
            ))}
          </motion.div>
        )}
      </main>
      <AIChat />
    </div>
  )
}
