import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
  const header = req.headers['authorization']
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' })
  }
  const token = header.slice(7)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { username: payload.username }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
