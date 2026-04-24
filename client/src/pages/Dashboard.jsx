import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getCoursesByRole, getEpisodes } from '../data/index'
import { useProgress } from '../hooks/useProgress'
import ProgressBar from '../components/ProgressBar'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'
import StudyHeatmap from '../components/StudyHeatmap'

function CourseCard({ course }) {
  const episodes = getEpisodes(course)
  const { getCourseProgress } = useProgress(course.id)
  const pct = getCourseProgress(episodes)
  return (
    <Link to={`/course/${course.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-2xl p-5 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{course.icon}</span>
          <div>
            <h3 className="text-white font-bold">{course.title}</h3>
            <p className="text-gray-500 text-xs">{episodes.length} {course.modules ? 'modules' : 'episodes'}</p>
          </div>
        </div>
        <ProgressBar percent={pct} />
        <p className="text-xs text-gray-500 mt-1">{pct}% complete</p>
      </motion.div>
    </Link>
  )
}

export default function Dashboard() {
  const { role, activityLog } = useApp()
  const courses = getCoursesByRole(role)
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 text-sm mb-8">Your courses for this path</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {courses.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <CourseCard course={c} />
            </motion.div>
          ))}
        </div>
        <StudyHeatmap activityLog={activityLog} />
      </main>
      <AIChat />
    </div>
  )
}
