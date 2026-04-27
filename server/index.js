import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'

const app = express()

if (!process.env.JWT_SECRET) {
  console.error('CRITICAL ERROR: JWT_SECRET environment variable is not set!')
}

app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/chat', chatRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
