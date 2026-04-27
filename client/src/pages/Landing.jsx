import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CrackItLogo from '../components/CrackItLogo'

const roles = [
  {
    id: 'frontend',
    label: 'Frontend Engineer',
    icon: 'UI',
    description: 'Master JavaScript & React from ground up',
    courses: ['JavaScript', 'React'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'fullstack',
    label: 'Fullstack Engineer',
    icon: 'FS',
    description: 'Master Frontend, Backend, System Design & DevOps',
    courses: ['JavaScript', 'React', 'Node.js', 'System Design', 'Project Design', 'DevOps'],
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
  const { syncRole } = useApp()
  const navigate = useNavigate()

  async function handleSelect(roleId) {
    await syncRole(roleId)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CrackItLogo size={44} />
            <h1 className="text-4xl font-bold text-white">CrackIt</h1>
          </div>
          <p className="text-gray-400 text-lg">Choose your path and start cracking interviews</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full items-stretch">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            onClick={() => handleSelect(role.id)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 cursor-pointer hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 flex flex-col h-full"
          >
            <div className={`text-xl font-bold mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex-shrink-0 flex items-center justify-center text-white`}>
              {role.icon}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{role.label}</h2>
            <p className="text-gray-400 text-sm mb-4">{role.description}</p>
            <div className="space-y-1 mb-8">
              {role.courses.map(c => (
                <div key={c} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-400">+</span> {c}
                </div>
              ))}
            </div>
            <button className={`mt-auto w-full py-2 rounded-lg text-sm font-semibold bg-gradient-to-r ${role.color} text-white`}>
              Start Learning
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
