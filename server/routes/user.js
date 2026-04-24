import { Router } from 'express'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { verifyToken } from '../middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const USERS_FILE = join(__dirname, '../data/users.json')

function readUsers() {
  try { return JSON.parse(readFileSync(USERS_FILE, 'utf8')) }
  catch { return {} }
}

function writeUsers(users) {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

function ensureNewFields(user) {
  if (!user.activityLog) user.activityLog = {}
  if (!user.mcqState) user.mcqState = {}
  if (!user.interviewAttempts) user.interviewAttempts = []
}

const router = Router()
router.use(verifyToken)

router.get('/me', (req, res) => {
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  ensureNewFields(user)
  const { passwordHash, ...safe } = user
  res.json(safe)
})

router.put('/role', (req, res) => {
  const { role } = req.body
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  user.role = role
  if (!user.studyStartDate) {
    user.studyStartDate = new Date().toISOString().slice(0, 10)
  }
  writeUsers(users)
  res.json({ ok: true })
})

router.put('/progress', (req, res) => {
  const { episodeId, completed } = req.body
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (completed) {
    user.progress[episodeId] = true
  } else {
    delete user.progress[episodeId]
  }
  writeUsers(users)
  res.json({ ok: true })
})

router.put('/dayplan', (req, res) => {
  const { key, completed } = req.body
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (completed) {
    if (!user.dayplanCompleted.includes(key)) user.dayplanCompleted.push(key)
  } else {
    user.dayplanCompleted = user.dayplanCompleted.filter(k => k !== key)
  }
  writeUsers(users)
  res.json({ ok: true })
})

router.put('/dsa', (req, res) => {
  const { problemId, solved } = req.body
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (solved) {
    if (!user.dsaSolved.includes(problemId)) user.dsaSolved.push(problemId)
  } else {
    user.dsaSolved = user.dsaSolved.filter(id => id !== problemId)
  }
  writeUsers(users)
  res.json({ ok: true })
})

// Log daily activity (episodes, dsa, mcqs, interviews)
router.put('/activity', (req, res) => {
  const { date, type } = req.body
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (!user.activityLog) user.activityLog = {}
  if (!user.activityLog[date]) user.activityLog[date] = { episodes: 0, dsa: 0, mcqs: 0, interviews: 0 }
  if (user.activityLog[date][type] !== undefined) user.activityLog[date][type]++
  writeUsers(users)
  res.json({ ok: true })
})

// Spaced repetition MCQ state update (simplified SM-2)
router.put('/mcq-state', (req, res) => {
  const { mcqId, correct } = req.body
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (!user.mcqState) user.mcqState = {}

  const prev = user.mcqState[mcqId] || { interval: 0, easeFactor: 2.5, repetitions: 0 }
  let { interval, easeFactor, repetitions } = prev

  if (correct) {
    repetitions++
    interval = repetitions === 1 ? 1 : repetitions === 2 ? 3 : Math.round(interval * easeFactor)
    easeFactor = Math.min(3.0, easeFactor + 0.1)
  } else {
    repetitions = 0
    interval = 1
    easeFactor = Math.max(1.3, easeFactor - 0.2)
  }

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)
  user.mcqState[mcqId] = {
    interval,
    easeFactor: Math.round(easeFactor * 100) / 100,
    repetitions,
    nextReview: nextReview.toISOString().slice(0, 10),
  }
  writeUsers(users)
  res.json({ ok: true, state: user.mcqState[mcqId] })
})

// Save interview attempt
router.put('/interview-attempt', (req, res) => {
  const { courseId, knew, partial, missed, total, date } = req.body
  const users = readUsers()
  const user = users[req.user.username]
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (!user.interviewAttempts) user.interviewAttempts = []
  user.interviewAttempts.push({ courseId, knew, partial, missed, total, date })
  writeUsers(users)
  res.json({ ok: true })
})

export default router
