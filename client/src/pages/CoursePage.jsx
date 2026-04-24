import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCourseById, getEpisodes } from '../data/index'
import { useProgress } from '../hooks/useProgress'
import EpisodeCard from '../components/EpisodeCard'
import ProgressBar from '../components/ProgressBar'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

export default function CoursePage() {
  const { courseId } = useParams()
  const course = getCourseById(courseId)
  const episodes = getEpisodes(course)
  const { getCourseProgress } = useProgress(courseId)
  const pct = getCourseProgress(episodes)

  if (!course) return <div className="flex min-h-screen bg-gray-950"><Sidebar /><main className="flex-1 p-8 text-white">Course not found.</main></div>

  // Group by season for Node.js
  const seasons = course.id === 'namaste-nodejs'
    ? [1, 2, 3].map(s => ({ season: s, eps: episodes.filter(e => e.season === s) }))
    : null

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/dashboard" className="text-gray-500 text-sm hover:text-white">← Dashboard</Link>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-4xl">{course.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{course.title}</h1>
              <p className="text-gray-400 text-sm">{episodes.length} {course.modules ? 'modules' : 'episodes'} · {pct}% complete</p>
            </div>
          </div>
          <div className="mt-3 max-w-sm"><ProgressBar percent={pct} /></div>
        </div>

        {seasons ? (
          <div className="space-y-8">
            {seasons.map(({ season, eps }) => (
              <div key={season}>
                <h2 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-3">Season {season}</h2>
                <div className="space-y-2">
                  {eps.map((ep, i) => (
                    <motion.div key={ep.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <EpisodeCard episode={ep} courseId={courseId} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {episodes.map((ep, i) => (
              <motion.div key={ep.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <EpisodeCard episode={ep} courseId={courseId} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <AIChat />
    </div>
  )
}
