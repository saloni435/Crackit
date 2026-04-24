import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { getCoursesByRole } from '../data/index'
import CrackItLogo from './CrackItLogo'
import { getDueMcqs } from '../pages/RevisionPage'

const roleLabels = { frontend: 'Frontend', fullstack: 'Fullstack', ai: 'AI Engineer' }
const roleColors = { frontend: 'bg-orange-500', fullstack: 'bg-green-500', ai: 'bg-purple-500' }

export default function Sidebar() {
  const { role, user, logout, mcqState } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const courses = getCoursesByRole(role)

  const dueMcqCount = useMemo(() => getDueMcqs(courses, mcqState).length, [mcqState, courses])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function handleChangePath() {
    navigate('/')
  }

  const navLinks = [
    { to: '/dashboard', label: '🏠 Dashboard' },
    { to: '/day-plan', label: '📅 Day Wise Plan' },
    { to: '/dsa', label: '⚡ DSA Practice' },
    { to: '/interview', label: '🎤 Interview Qs' },
    { to: '/quiz', label: '📝 Quiz' },
    { to: '/mock-interview', label: '🎯 Mock Interview' },
    { to: '/revision', label: '🔁 Revision', badge: dueMcqCount > 0 ? dueMcqCount : null },
  ]

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-4">
      {/* User info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <span className="text-white text-sm font-semibold truncate">{user?.name || 'Guest'}</span>
        </div>
        <div className="flex items-center gap-2 ml-9">
          <CrackItLogo size={20} />
          <span className="text-xl font-bold text-white">CrackIt</span>
          {role && (
            <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white ${roleColors[role]}`}>
              {roleLabels[role]}
            </div>
          )}
        </div>
      </div>

      <nav className="space-y-1 mb-6">
        {navLinks.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === l.to ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <span>{l.label}</span>
            {l.badge && (
              <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {l.badge}
              </span>
            )}
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

      <div className="mt-auto pt-4 border-t border-gray-800 space-y-1">
        <button
          onClick={handleChangePath}
          className="w-full text-xs text-gray-500 hover:text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
        >
          Change Path
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-xs text-red-500 hover:text-red-400 py-2 px-3 rounded-lg hover:bg-red-500/10 transition-colors text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
