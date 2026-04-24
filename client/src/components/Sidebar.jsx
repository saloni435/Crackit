import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getCoursesByRole } from '../data/index'

const roleLabels = { frontend: 'Frontend', fullstack: 'Fullstack', ai: 'AI Engineer' }
const roleColors = { frontend: 'bg-orange-500', fullstack: 'bg-green-500', ai: 'bg-purple-500' }

export default function Sidebar() {
  const { role, clearRole } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const courses = getCoursesByRole(role)

  function handleChangePath() {
    clearRole()
    navigate('/')
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/interview', label: 'Interview Qs' },
    { to: '/quiz', label: 'Quiz' },
  ]

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-4">
      <div className="mb-6">
        <span className="text-xl font-bold text-white">StudyPlan</span>
        <div className={`inline-block mt-2 ml-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${roleColors[role]}`}>
          {roleLabels[role]}
        </div>
      </div>

      <nav className="space-y-1 mb-6">
        {navLinks.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === l.to ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-800 pt-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Courses</p>
        <div className="space-y-1">
          {courses.map(c => (
            <Link
              key={c.id}
              to={`/course/${c.id}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname.startsWith(`/course/${c.id}`) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <span className="mr-2">{c.icon}</span>{c.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <button
          onClick={handleChangePath}
          className="w-full text-xs text-gray-500 hover:text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
        >
          Change Path
        </button>
      </div>
    </aside>
  )
}
