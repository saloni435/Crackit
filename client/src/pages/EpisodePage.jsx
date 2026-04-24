import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getCourseById, getEpisodeById } from '../data/index'
import { useProgress } from '../hooks/useProgress'
import InterviewQuestion from '../components/InterviewQuestion'
import MCQCard from '../components/MCQCard'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

const tabs = ['Topics', 'Interview Questions', 'MCQs']

function TopicItem({ topic, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-800 transition-colors"
      >
        <span className="text-orange-500 font-bold text-sm w-6 flex-shrink-0">{index + 1}</span>
        <span className="text-white text-sm font-medium flex-1">{topic}</span>
        <span className="text-gray-500 text-sm transition-transform duration-200" style={{ display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-800"
          >
            <div className="px-4 pb-4 pt-3 space-y-2">
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-orange-400 font-semibold">Study tip:</span> Make sure you understand <span className="text-white font-medium">{topic}</span> thoroughly before moving on. Try explaining it in your own words.
              </p>
              <p className="text-gray-500 text-xs">
                Practice this concept in the <span className="text-orange-400 cursor-pointer underline">Interview Questions</span> and <span className="text-orange-400 cursor-pointer underline">MCQs</span> tabs, or ask the AI assistant for a deeper explanation.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EpisodePage() {
  const { courseId, episodeId } = useParams()
  const course = getCourseById(courseId)
  const episode = getEpisodeById(course, episodeId)
  const { isComplete, toggle } = useProgress(courseId)
  const [tab, setTab] = useState('Topics')

  if (!course || !episode) return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 text-white">Not found.</main>
    </div>
  )

  const done = isComplete(episode.id)

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 max-w-3xl">
        <Link to={`/course/${courseId}`} className="text-gray-500 text-sm hover:text-white">
          ← {course.title}
        </Link>

        <div className="mt-4 mb-2 flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-500 text-xs mb-1">#{episode.number}</p>
            <h1 className="text-2xl font-bold text-white">{episode.title}</h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {episode.videoUrl && (
              <a
                href={episode.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1"
              >
                ▶ Watch Video
              </a>
            )}
            <button
              onClick={() => toggle(episode.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${done ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-gray-700 text-gray-400 hover:border-orange-500 hover:text-white'}`}
            >
              {done ? '✓ Complete' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {episode.season && (
          <p className="text-xs text-gray-600 mb-4">Season {episode.season}</p>
        )}

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
            <p className="text-xs text-gray-600 mb-3">Click any topic to expand study tips</p>
            {episode.topics.map((t, i) => (
              <TopicItem key={t} topic={t} index={i} />
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
