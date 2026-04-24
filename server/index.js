import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/chat', chatRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(3001, () => console.log('Server running on port 3001'))
