import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const roles = [
  {
    id: 'frontend',
    label: 'Frontend Engineer',
    icon: 'UI',
    description: 'Master JavaScript & React from ground up',
    courses: ['Namaste JavaScript', 'Namaste React'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'fullstack',
    label: 'Fullstack Engineer',
    icon: 'FS',
    description: 'End-to-end: JS, React, and Node.js',
    courses: ['Namaste JavaScript', 'Namaste React', 'Namaste Node.js'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'ai',
    label: 'AI Engineer',
    icon: 'AI',
    description: 'ML, LLMs, Agents, RAG, Cloud AI & MLOps',
    courses: ['Full AI Stack'],
    color: 'from-purple-500 to-violet-500',
  },
]

export default function Landing() {
  const { selectRole } = useApp()
  const navigate = useNavigate()

  function handleSelect(roleId) {
    selectRole(roleId)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">Study</div>
          <h1 className="text-4xl font-bold text-white mb-3">Namaste Dev Study Plan</h1>
          <p className="text-gray-400 text-lg">Choose your learning path to get started</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            onClick={() => handleSelect(role.id)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 cursor-pointer hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10"
          >
            <div className={`text-xl font-bold mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white`}>
              {role.icon}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{role.label}</h2>
            <p className="text-gray-400 text-sm mb-4">{role.description}</p>
            <div className="space-y-1">
              {role.courses.map(c => (
                <div key={c} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-400">+</span> {c}
                </div>
              ))}
            </div>
            <button className={`mt-5 w-full py-2 rounded-lg text-sm font-semibold bg-gradient-to-r ${role.color} text-white`}>
              Start Learning -&gt;
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
