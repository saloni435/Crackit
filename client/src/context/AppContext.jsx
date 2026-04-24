import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('role') || null)
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('progress') || '{}') }
    catch { return {} }
  })

  function selectRole(newRole) {
    setRole(newRole)
    localStorage.setItem('role', newRole)
  }

  function markComplete(episodeId) {
    const next = { ...progress, [episodeId]: true }
    setProgress(next)
    localStorage.setItem('progress', JSON.stringify(next))
  }

  function markIncomplete(episodeId) {
    const next = { ...progress }
    delete next[episodeId]
    setProgress(next)
    localStorage.setItem('progress', JSON.stringify(next))
  }

  function clearRole() {
    setRole(null)
    localStorage.removeItem('role')
  }

  return (
    <AppContext.Provider value={{ role, progress, selectRole, markComplete, markIncomplete, clearRole }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
