import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import CoursePage from './pages/CoursePage'
import EpisodePage from './pages/EpisodePage'
import InterviewPage from './pages/InterviewPage'
import QuizPage from './pages/QuizPage'

function RequireRole({ children }) {
  const { role } = useApp()
  return role ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<RequireRole><Dashboard /></RequireRole>} />
        <Route path="/course/:courseId" element={<RequireRole><CoursePage /></RequireRole>} />
        <Route path="/course/:courseId/episode/:episodeId" element={<RequireRole><EpisodePage /></RequireRole>} />
        <Route path="/interview" element={<RequireRole><InterviewPage /></RequireRole>} />
        <Route path="/quiz" element={<RequireRole><QuizPage /></RequireRole>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
