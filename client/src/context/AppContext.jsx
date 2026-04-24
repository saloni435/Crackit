import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function AppProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('sp-token'))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sp-user')) } catch { return null }
  })
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sp-progress')) || {} } catch { return {} }
  })
  const [dsaSolved, setDsaSolved] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('sp-dsa') || '[]')) } catch { return new Set() }
  })
  const [dayplanCompleted, setDayplanCompleted] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('sp-dayplan') || '[]')) } catch { return new Set() }
  })
  const [activityLog, setActivityLog] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sp-activity') || '{}') } catch { return {} }
  })
  const [mcqState, setMcqState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sp-mcqstate') || '{}') } catch { return {} }
  })

  // Verify token on mount; sync all data from server
  useEffect(() => {
    if (!token) return
    fetch(`${API}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('invalid')
        return res.json()
      })
      .then(data => {
        setUser(data)
        localStorage.setItem('sp-user', JSON.stringify(data))
        const prog = data.progress || {}
        setProgress(prog)
        localStorage.setItem('sp-progress', JSON.stringify(prog))
        setDsaSolved(new Set(data.dsaSolved || []))
        localStorage.setItem('sp-dsa', JSON.stringify(data.dsaSolved || []))
        setDayplanCompleted(new Set(data.dayplanCompleted || []))
        localStorage.setItem('sp-dayplan', JSON.stringify(data.dayplanCompleted || []))
        const activity = data.activityLog || {}
        setActivityLog(activity)
        localStorage.setItem('sp-activity', JSON.stringify(activity))
        const mcqs = data.mcqState || {}
        setMcqState(mcqs)
        localStorage.setItem('sp-mcqstate', JSON.stringify(mcqs))
      })
      .catch(() => clearSession())
  }, [])

  function authFetch(path, opts = {}) {
    return fetch(`${API}${path}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(opts.headers || {}),
      },
    })
  }

  function login(newToken, userData, serverData = {}) {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('sp-token', newToken)
    localStorage.setItem('sp-user', JSON.stringify(userData))

    const prog = serverData.progress || {}
    const dsa = new Set(serverData.dsaSolved || [])
    const dayplan = new Set(serverData.dayplanCompleted || [])
    const activity = serverData.activityLog || {}
    const mcqs = serverData.mcqState || {}

    setProgress(prog)
    setDsaSolved(dsa)
    setDayplanCompleted(dayplan)
    setActivityLog(activity)
    setMcqState(mcqs)
    localStorage.setItem('sp-progress', JSON.stringify(prog))
    localStorage.setItem('sp-dsa', JSON.stringify([...dsa]))
    localStorage.setItem('sp-dayplan', JSON.stringify([...dayplan]))
    localStorage.setItem('sp-activity', JSON.stringify(activity))
    localStorage.setItem('sp-mcqstate', JSON.stringify(mcqs))
  }

  function clearSession() {
    setToken(null)
    setUser(null)
    setProgress({})
    setDsaSolved(new Set())
    setDayplanCompleted(new Set())
    setActivityLog({})
    setMcqState({})
    localStorage.removeItem('sp-token')
    localStorage.removeItem('sp-user')
    localStorage.removeItem('sp-progress')
    localStorage.removeItem('sp-dsa')
    localStorage.removeItem('sp-dayplan')
    localStorage.removeItem('sp-activity')
    localStorage.removeItem('sp-mcqstate')
  }

  function logout() { clearSession() }

  const role = user?.role || null

  // Log one unit of activity for today
  function logActivity(type) {
    const date = new Date().toISOString().slice(0, 10)
    setActivityLog(prev => {
      const next = { ...prev }
      if (!next[date]) next[date] = { episodes: 0, dsa: 0, mcqs: 0, interviews: 0 }
      next[date] = { ...next[date], [type]: (next[date][type] || 0) + 1 }
      localStorage.setItem('sp-activity', JSON.stringify(next))
      return next
    })
    authFetch('/api/user/activity', { method: 'PUT', body: JSON.stringify({ date, type }) })
  }

  async function syncRole(newRole) {
    const updated = { ...user, role: newRole }
    if (!updated.studyStartDate) {
      updated.studyStartDate = new Date().toISOString().slice(0, 10)
    }
    setUser(updated)
    localStorage.setItem('sp-user', JSON.stringify(updated))
    await authFetch('/api/user/role', { method: 'PUT', body: JSON.stringify({ role: newRole }) })
  }

  async function syncProgress(episodeId, completed) {
    const next = { ...progress }
    if (completed) { next[episodeId] = true; logActivity('episodes') }
    else delete next[episodeId]
    setProgress(next)
    localStorage.setItem('sp-progress', JSON.stringify(next))
    await authFetch('/api/user/progress', { method: 'PUT', body: JSON.stringify({ episodeId, completed }) })
  }

  async function syncDayplan(key, completed) {
    setDayplanCompleted(prev => {
      const next = new Set(prev)
      completed ? next.add(key) : next.delete(key)
      localStorage.setItem('sp-dayplan', JSON.stringify([...next]))
      return next
    })
    await authFetch('/api/user/dayplan', { method: 'PUT', body: JSON.stringify({ key, completed }) })
  }

  async function syncDsa(problemId, solved) {
    setDsaSolved(prev => {
      const next = new Set(prev)
      solved ? next.add(problemId) : next.delete(problemId)
      localStorage.setItem('sp-dsa', JSON.stringify([...next]))
      return next
    })
    if (solved) logActivity('dsa')
    await authFetch('/api/user/dsa', { method: 'PUT', body: JSON.stringify({ problemId, solved }) })
  }

  async function syncMcqState(mcqId, correct) {
    logActivity('mcqs')
    const res = await authFetch('/api/user/mcq-state', { method: 'PUT', body: JSON.stringify({ mcqId, correct }) })
    if (res.ok) {
      const { state } = await res.json()
      setMcqState(prev => {
        const next = { ...prev, [mcqId]: state }
        localStorage.setItem('sp-mcqstate', JSON.stringify(next))
        return next
      })
    }
  }

  async function saveInterviewAttempt(attempt) {
    logActivity('interviews')
    await authFetch('/api/user/interview-attempt', { method: 'PUT', body: JSON.stringify(attempt) })
  }

  function markComplete(episodeId) { syncProgress(episodeId, true) }
  function markIncomplete(episodeId) { syncProgress(episodeId, false) }

  return (
    <AppContext.Provider value={{
      token, user, role, progress, dsaSolved, dayplanCompleted,
      activityLog, mcqState,
      login, logout,
      syncRole, syncProgress, syncDayplan, syncDsa, syncMcqState,
      saveInterviewAttempt, logActivity,
      markComplete, markIncomplete,
      authFetch,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
