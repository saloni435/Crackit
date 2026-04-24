import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { getCoursesByRole, getEpisodes } from '../data/index'
import InterviewQuestion from '../components/InterviewQuestion'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

export default function InterviewPage() {
  const { role } = useApp()
  const courses = getCoursesByRole(role)
  const [activeCourse, setActiveCourse] = useState('all')
  const [search, setSearch] = useState('')

  const filteredCourses = activeCourse === 'all' ? courses : courses.filter(c => c.id === activeCourse)

  const allQuestions = filteredCourses.flatMap(c =>
    getEpisodes(c).flatMap(ep =>
      (ep.interviewQuestions || []).map(q => ({ ...q, courseTitle: c.title, episodeTitle: ep.title }))
    )
  ).filter(q => !search || q.q.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Interview Questions</h1>
        <p className="text-gray-400 text-sm mb-6">{allQuestions.length} questions</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCourse('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCourse === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          {courses.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCourse(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCourse === c.id ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              {c.icon} {c.title}
            </button>
          ))}
        </div>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full max-w-md bg-gray-900 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg mb-6 outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
        />

        <div className="space-y-3 max-w-3xl">
          {allQuestions.map((q, i) => (
            <div key={i}>
              <p className="text-xs text-gray-600 mb-1 px-1">{q.courseTitle} · {q.episodeTitle}</p>
              <InterviewQuestion question={q} index={i} />
            </div>
          ))}
          {allQuestions.length === 0 && (
            <p className="text-gray-500 text-sm">No questions found.</p>
          )}
        </div>
      </main>
      <AIChat />
    </div>
  )
}
