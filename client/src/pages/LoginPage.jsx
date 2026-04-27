import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import CrackItLogo from '../components/CrackItLogo'

export default function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ username: '', name: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = tab === 'login'
        ? { username: form.username, password: form.password }
        : { username: form.username, name: form.name, password: form.password }

      const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); return }

      login(data.token, data.user, data.user)
      navigate(data.user.role ? '/dashboard' : '/')
    } catch {
      setError('Could not connect to server. Make sure it is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CrackItLogo size={36} />
            <h1 className="text-2xl font-bold text-white">CrackIt</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">Crack your next tech interview</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-800 p-1 mb-6">
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError('') }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {t === 'login' ? 'Login' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="text-gray-400 text-xs block mb-1.5">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Akshay Kumar"
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-3 py-2.5 rounded-lg outline-none focus:border-orange-500 transition-colors placeholder-gray-600"
                />
              </div>
            )}

            <div>
              <label className="text-gray-400 text-xs block mb-1.5">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="akshay123"
                required
                autoComplete="username"
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-3 py-2.5 rounded-lg outline-none focus:border-orange-500 transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs block mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                  className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-3 py-2.5 rounded-lg outline-none focus:border-orange-500 transition-colors placeholder-gray-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-900 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition-colors text-sm mt-2"
            >
              {loading ? 'Please wait…' : tab === 'login' ? 'Login →' : 'Create Account →'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Study smart · Track daily · Grow consistently
        </p>
      </motion.div>
    </div>
  )
}
