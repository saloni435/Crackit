import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InterviewQuestion({ question, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-800 transition-colors"
      >
        <span className="text-orange-500 font-bold text-sm w-6 flex-shrink-0">Q{index + 1}</span>
        <span className="text-white text-sm font-medium flex-1">{question.q}</span>
        <span className="text-gray-500 text-sm">{open ? '▲' : '▼'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4 border-t border-gray-800"
          >
            <p className="text-gray-300 text-sm pt-3 leading-relaxed">{question.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
