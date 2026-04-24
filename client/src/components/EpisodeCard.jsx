import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

export default function EpisodeCard({ episode, courseId }) {
  const { isComplete, toggle } = useProgress(courseId)
  const done = isComplete(episode.id)

  return (
    <div className={`flex items-center gap-4 p-4 bg-gray-900 rounded-xl border ${done ? 'border-green-800' : 'border-gray-800'} hover:border-orange-500 transition-all`}>
      <button
        onClick={e => { e.preventDefault(); toggle(episode.id) }}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${done ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-orange-500'}`}
      >
        {done && <span className="text-white text-xs">✓</span>}
      </button>
      <Link to={`/course/${courseId}/episode/${episode.id}`} className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">#{episode.number}</span>
          <span className="text-white font-medium text-sm truncate">{episode.title}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {episode.topics.slice(0, 3).map(t => (
            <span key={t} className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{t}</span>
          ))}
          {episode.topics.length > 3 && <span className="text-xs text-gray-600">+{episode.topics.length - 3}</span>}
        </div>
      </Link>
      <span className="text-xs text-gray-600 flex-shrink-0">
        {episode.interviewQuestions?.length || 0}Q · {episode.mcqs?.length || 0}MCQ
      </span>
    </div>
  )
}
