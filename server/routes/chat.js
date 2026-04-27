import Anthropic from '@anthropic-ai/sdk'
import { Router } from 'express'

const router = Router()
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY })

router.post('/', async (req, res) => {
  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: 'You are a study assistant. Answer questions about JavaScript, React, Node.js, Python, Machine Learning, LLMs, and AI Agents clearly and concisely. Keep responses focused and educational.',
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    })
    res.json({ reply: response.content[0].text })
  } catch (err) {
    console.error('Claude API error:', err.message)
    res.status(500).json({ error: 'AI assistant unavailable' })
  }
})

export default router
