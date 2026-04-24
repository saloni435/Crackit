import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import CoursePage from './pages/CoursePage'
import EpisodePage from './pages/EpisodePage'
import InterviewPage from './pages/InterviewPage'
import QuizPage from './pages/QuizPage'
import DSAPage from './pages/DSAPage'
import DayPlanPage from './pages/DayPlanPage'
import MockInterviewPage from './pages/MockInterviewPage'
import RevisionPage from './pages/RevisionPage'

function RequireAuth({ children }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/login" replace />
}

function RequireRole({ children }) {
  const { role } = useApp()
  return role ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RequireAuth><Landing /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><RequireRole><Dashboard /></RequireRole></RequireAuth>} />
        <Route path="/course/:courseId" element={<RequireAuth><RequireRole><CoursePage /></RequireRole></RequireAuth>} />
        <Route path="/course/:courseId/episode/:episodeId" element={<RequireAuth><RequireRole><EpisodePage /></RequireRole></RequireAuth>} />
        <Route path="/interview" element={<RequireAuth><RequireRole><InterviewPage /></RequireRole></RequireAuth>} />
        <Route path="/quiz" element={<RequireAuth><RequireRole><QuizPage /></RequireRole></RequireAuth>} />
        <Route path="/dsa" element={<RequireAuth><RequireRole><DSAPage /></RequireRole></RequireAuth>} />
        <Route path="/day-plan" element={<RequireAuth><RequireRole><DayPlanPage /></RequireRole></RequireAuth>} />
        <Route path="/mock-interview" element={<RequireAuth><RequireRole><MockInterviewPage /></RequireRole></RequireAuth>} />
        <Route path="/revision" element={<RequireAuth><RequireRole><RevisionPage /></RequireRole></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
