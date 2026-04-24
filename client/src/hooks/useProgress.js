import { useApp } from '../context/AppContext'

export function useProgress(courseId) {
  const { progress, markComplete, markIncomplete } = useApp()

  function isComplete(episodeId) {
    return !!progress[episodeId]
  }

  function toggle(episodeId) {
    if (isComplete(episodeId)) markIncomplete(episodeId)
    else markComplete(episodeId)
  }

  function getCourseProgress(episodes) {
    if (!episodes?.length) return 0
    const done = episodes.filter(ep => progress[ep.id]).length
    return Math.round((done / episodes.length) * 100)
  }

  return { isComplete, toggle, getCourseProgress }
}
