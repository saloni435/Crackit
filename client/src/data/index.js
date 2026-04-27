import js from './namaste-javascript'
import react from './namaste-react'
import node from './namaste-nodejs'
import ai from './ai-engineer'
import sd from './system-design'
import pd from './project-design'
import devops from './devops'
import css from './css'
import tailwind from './tailwind'

export const allCourses = { js, react, node, ai, sd, pd, devops, css, tailwind }

export function getCoursesByRole(role) {
  if (role === 'frontend') return [js, react, css, tailwind]
  if (role === 'fullstack') return [js, react, css, tailwind, node, sd, pd, devops]
  if (role === 'ai') return [ai]
  return []
}

export function getCourseById(id) {
  return Object.values(allCourses).find(c => c.id === id) || null
}

export function getEpisodes(course) {
  return course?.episodes || course?.modules || []
}

export function getEpisodeById(course, episodeId) {
  return getEpisodes(course).find(e => e.id === episodeId) || null
}
