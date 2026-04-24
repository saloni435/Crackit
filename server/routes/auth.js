import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const USERS_FILE = join(__dirname, '../data/users.json')

function readUsers() {
  try { return JSON.parse(readFileSync(USERS_FILE, 'utf8')) }
  catch { return {} }
}

function writeUsers(users) {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

function makeToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const router = Router()

router.post('/register', async (req, res) => {
  const { username, name, password } = req.body
  if (!username || !name || !password) return res.status(400).json({ error: 'All fields required' })

  const users = readUsers()
  if (users[username]) return res.status(409).json({ error: 'Username already taken' })

  const passwordHash = await bcrypt.hash(password, 10)
  const now = new Date().toISOString().slice(0, 10)
  users[username] = {
    username,
    name,
    passwordHash,
    role: null,
    progress: {},
    dayplanCompleted: [],
    dsaSolved: [],
    studyStartDate: null,
    joinedAt: now,
    activityLog: {},
    mcqState: {},
    interviewAttempts: [],
  }
  writeUsers(users)

  const token = makeToken(username)
  const { passwordHash: _, ...user } = users[username]
  res.json({ token, user })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' })

  const users = readUsers()
  const stored = users[username]
  if (!stored) return res.status(401).json({ error: 'Invalid username or password' })

  const match = await bcrypt.compare(password, stored.passwordHash)
  if (!match) return res.status(401).json({ error: 'Invalid username or password' })

  const token = makeToken(username)
  const { passwordHash: _, ...user } = stored
  res.json({ token, user })
})

export default router
