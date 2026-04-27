import js from './namaste-javascript'
import react from './namaste-react'
import node from './namaste-nodejs'
import ai from './ai-engineer'
import sd from './system-design'
import pd from './project-design'
import devops from './devops'

export const allCourses = { js, react, node, ai, sd, pd, devops }

export function getCoursesByRole(role) {
  if (role === 'frontend') return [js, react]
  if (role === 'fullstack') return [js, react, node, sd, pd, devops]
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
