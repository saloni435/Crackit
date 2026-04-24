import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getCoursesByRole, getEpisodes } from '../data/index'
import dsaProblems from '../data/dsa'
import Sidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const DSA_PER_DAY = 1
const HOURS_PER_DAY = 2

function pickDsaForDay(dayIndex, allProblems) {
  const easy = allProblems.filter(p => p.difficulty === 'Easy')
  const medium = allProblems.filter(p => p.difficulty === 'Medium')
  const hard = allProblems.filter(p => p.difficulty === 'Hard')
  if (dayIndex < 7) return easy[dayIndex % easy.length]
  if (dayIndex < 20) return medium[(dayIndex - 7) % medium.length]
  return hard[(dayIndex - 20) % hard.length]
}

function buildPlan(course) {
  const episodes = getEpisodes(course)
  return episodes.map((ep, i) => ({
    day: i + 1,
    episode: ep,
    courseTitle: course.title,
    courseId: course.id,
    dsa: pickDsaForDay(i, dsaProblems),
    schedule: [
      { time: '0:00 – 0:30', activity: 'Review topics', detail: ep.topics.slice(0, 3).join(', ') + (ep.topics.length > 3 ? '...' : '') },
      { time: '0:30 – 1:15', activity: 'Study episode', detail: ep.title },
      { time: '1:15 – 1:45', activity: 'Practice MCQs & Interview Qs', detail: `${ep.mcqs?.length || 5} MCQs · ${ep.interviewQuestions?.length || 5} Interview Qs` },
      { time: '1:45 – 2:00', activity: 'DSA Problem', detail: pickDsaForDay(i, dsaProblems)?.title || 'LeetCode' },
    ],
  }))
}

const diffColors = {
  Easy: 'text-green-400 bg-green-400/10 border-green-800',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-800',
  Hard: 'text-red-400 bg-red-400/10 border-red-800',
}

function CalendarView({ plan, selectedCourseId, isDayComplete, studyStartDate, onDayClick }) {
  const today = new Date()
  const startDate = studyStartDate ? new Date(studyStartDate) : today
  const CALENDAR_DAYS = 30

  // Compute streak (consecutive completed days from day 1)
  let streak = 0
  for (let i = 1; i <= plan.length; i++) {
    if (isDayComplete(i)) streak++
    else break
  }

  const completedCount = plan.filter(d => isDayComplete(d.day)).length

  function daysSinceStart(dayNum) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + dayNum - 1)
    return d
  }

  function isToday(dayNum) {
    const d = daysSinceStart(dayNum)
    return d.toDateString() === today.toDateString()
  }

  const calendarDays = Array.from({ length: CALENDAR_DAYS }, (_, i) => i + 1)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            📅 30-Day Journey
            {studyStartDate && (
              <span className="text-gray-500 font-normal text-xs">
                Started: {new Date(studyStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {streak > 0 && (
            <span className="text-orange-400 font-semibold">🔥 {streak}-day streak</span>
          )}
          <span className="text-gray-400">✓ {completedCount} / {Math.min(plan.length, CALENDAR_DAYS)} done</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-10 gap-1.5">
        {calendarDays.map(dayNum => {
          const done = isDayComplete(dayNum)
          const today_ = isToday(dayNum)
          const hasPlan = dayNum <= plan.length
          return (
            <button
              key={dayNum}
              onClick={() => hasPlan && onDayClick(dayNum)}
              title={hasPlan ? `Day ${dayNum}${done ? ' ✓' : ''}` : `Day ${dayNum} (no episode)`}
              className={`
                relative w-full aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all
                ${!hasPlan ? 'bg-gray-800/30 text-gray-700 cursor-default' : 'cursor-pointer'}
                ${hasPlan && done ? 'bg-green-500 text-white shadow-sm shadow-green-500/30' : ''}
                ${hasPlan && !done ? 'bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-300' : ''}
                ${today_ ? 'ring-2 ring-orange-500 ring-offset-1 ring-offset-gray-900' : ''}
              `}
            >
              {dayNum}
              {done && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-gray-900" />}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-500 inline-block" />Done</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-800 inline-block" />Pending</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-800 border border-orange-500 inline-block" />Today</span>
      </div>
    </div>
  )
}

export default function DayPlanPage() {
  const { role, user, dayplanCompleted, syncDayplan } = useApp()
  const courses = getCoursesByRole(role)

  // Auto-detect which course the user has been working on
  const activeCourseId = useMemo(() => {
    for (const c of courses) {
      if ([...dayplanCompleted].some(k => k.startsWith(`${c.id}-day-`))) return c.id
    }
    return courses[0]?.id || ''
  }, [dayplanCompleted, courses])

  const [selectedCourseId, setSelectedCourseId] = useState(activeCourseId)
  // Skip course-selection screen if the user already has progress
  const [planGenerated, setPlanGenerated] = useState(
    () => courses.some(c => [...dayplanCompleted].some(k => k.startsWith(`${c.id}-day-`)))
  )
  const [expandedDay, setExpandedDay] = useState(null)

  // When server data arrives after mount, sync to the active course
  useEffect(() => {
    if (activeCourseId && activeCourseId !== selectedCourseId) {
      setSelectedCourseId(activeCourseId)
      setPlanGenerated(true)
    }
  }, [activeCourseId])

  const selectedCourse = courses.find(c => c.id === selectedCourseId)
  const plan = useMemo(() => selectedCourse ? buildPlan(selectedCourse) : [], [selectedCourseId])

  function isDayComplete(day) {
    return dayplanCompleted.has(`${selectedCourseId}-day-${day}`)
  }

  function toggleDayComplete(day) {
    const key = `${selectedCourseId}-day-${day}`
    syncDayplan(key, !dayplanCompleted.has(key))
  }

  const completedCount = plan.filter(d => isDayComplete(d.day)).length
  const progressPct = plan.length ? Math.round((completedCount / plan.length) * 100) : 0

  if (!planGenerated) {
    return (
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-lg"
          >
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">📅</div>
              <h1 className="text-2xl font-bold text-white mb-2">Day Wise Plan</h1>
              <p className="text-gray-400 text-sm">2 hours/day · 1 DSA problem/day · Episode by episode</p>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Choose a course to start with</label>
                <div className="space-y-2">
                  {courses.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCourseId(c.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${selectedCourseId === c.id ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <p className="text-white font-medium text-sm">{c.title}</p>
                        <p className="text-gray-500 text-xs">{getEpisodes(c).length} episodes · {getEpisodes(c).length * HOURS_PER_DAY} hours total</p>
                      </div>
                      {selectedCourseId === c.id && <span className="ml-auto text-orange-500">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-white text-sm font-semibold mb-3">Daily Schedule (2 hours)</h3>
                <div className="space-y-2">
                  {[
                    { time: '0:00 – 0:30', label: 'Review topics', color: 'text-blue-400' },
                    { time: '0:30 – 1:15', label: 'Study episode (video + notes)', color: 'text-purple-400' },
                    { time: '1:15 – 1:45', label: 'Practice MCQs & Interview Qs', color: 'text-green-400' },
                    { time: '1:45 – 2:00', label: '⚡ DSA Problem (compulsory)', color: 'text-orange-400' },
                  ].map(s => (
                    <div key={s.time} className="flex items-center gap-3 text-xs">
                      <span className="text-gray-500 font-mono w-28 flex-shrink-0">{s.time}</span>
                      <span className={s.color}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setPlanGenerated(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Generate My {plan.length}-Day Plan →
            </button>
          </motion.div>
          <AIChat />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <button onClick={() => setPlanGenerated(false)} className="text-gray-500 text-sm hover:text-white mb-2 block">← Change course</button>
            <h1 className="text-2xl font-bold text-white">
              {selectedCourse?.icon} {selectedCourse?.title} — {plan.length}-Day Plan
            </h1>
            <p className="text-gray-400 text-sm mt-1">2 hours/day · {completedCount}/{plan.length} days done</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-500">{progressPct}%</p>
            <p className="text-gray-600 text-xs">complete</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
          <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>

        {/* 30-Day Calendar */}
        <CalendarView
          plan={plan}
          selectedCourseId={selectedCourseId}
          isDayComplete={isDayComplete}
          studyStartDate={user?.studyStartDate}
          onDayClick={day => setExpandedDay(expandedDay === day ? null : day)}
        />

        {/* Day cards */}
        <div className="space-y-3">
          {plan.map((dayPlan, i) => {
            const done = isDayComplete(dayPlan.day)
            const isExpanded = expandedDay === dayPlan.day

            return (
              <motion.div
                key={dayPlan.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
                className={`rounded-xl border transition-all ${done ? 'border-green-900 bg-green-500/5' : 'border-gray-800 bg-gray-900'}`}
              >
                {/* Day header */}
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors"
                  onClick={() => setExpandedDay(isExpanded ? null : dayPlan.day)}
                >
                  {/* Complete toggle */}
                  <button
                    onClick={e => { e.stopPropagation(); toggleDayComplete(dayPlan.day) }}
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${done ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-orange-500'}`}
                  >
                    {done && <span className="text-white text-xs font-bold">✓</span>}
                  </button>

                  {/* Day number */}
                  <div className={`w-12 text-center py-1 rounded-lg text-xs font-bold flex-shrink-0 ${done ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                    Day {dayPlan.day}
                  </div>

                  {/* Episode title */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${done ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {dayPlan.episode.title}
                    </p>
                    <p className="text-gray-600 text-xs truncate">
                      {dayPlan.episode.topics.slice(0, 2).join(' · ')}
                    </p>
                  </div>

                  {/* DSA badge */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {dayPlan.dsa && (
                      <span className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full border ${diffColors[dayPlan.dsa.difficulty]}`}>
                        ⚡ {dayPlan.dsa.difficulty}
                      </span>
                    )}
                    <span className="text-gray-600 text-sm">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 pb-4 border-t border-gray-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {/* Schedule */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Today's Schedule</h4>
                        <div className="space-y-2">
                          {dayPlan.schedule.map((slot, si) => (
                            <div key={si} className="flex items-start gap-3 text-xs">
                              <span className="text-gray-600 font-mono w-28 flex-shrink-0 mt-0.5">{slot.time}</span>
                              <div>
                                <p className="text-white font-medium">{slot.activity}</p>
                                <p className="text-gray-500">{slot.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* DSA + Episode info */}
                      <div className="space-y-3">
                        {/* Episode link */}
                        <div className="bg-gray-800 rounded-xl p-3">
                          <p className="text-xs text-gray-500 mb-1">Episode</p>
                          <p className="text-white text-sm font-medium mb-2">#{dayPlan.episode.number} — {dayPlan.episode.title}</p>
                          <div className="flex flex-wrap gap-1">
                            {dayPlan.episode.topics.slice(0, 4).map(t => (
                              <span key={t} className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">{t}</span>
                            ))}
                          </div>
                          {dayPlan.episode.videoUrl && (
                            <a
                              href={dayPlan.episode.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                            >
                              ▶ Watch Video
                            </a>
                          )}
                        </div>

                        {/* DSA problem */}
                        {dayPlan.dsa && (
                          <div className="bg-orange-500/5 border border-orange-900 rounded-xl p-3">
                            <p className="text-xs text-orange-400 mb-1 font-semibold">⚡ DSA Problem (compulsory)</p>
                            <p className="text-white text-sm font-medium mb-1">{dayPlan.dsa.title}</p>
                            <p className="text-gray-500 text-xs mb-2">{dayPlan.dsa.pattern} · {dayPlan.dsa.topic}</p>
                            <a
                              href={dayPlan.dsa.leetcode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
                            >
                              Solve on LeetCode →
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </main>
      <AIChat />
    </div>
  )
}
