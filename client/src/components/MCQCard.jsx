import { useState } from 'react'

export default function MCQCard({ mcq, index }) {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <p className="text-white text-sm font-medium mb-3">
        <span className="text-orange-500 mr-2">Q{index + 1}.</span>{mcq.question}
      </p>
      <div className="space-y-2">
        {mcq.options.map((opt, i) => {
          let cls = 'w-full text-left px-3 py-2 rounded-lg text-sm border transition-all '
          if (!answered) cls += 'border-gray-700 text-gray-300 hover:border-orange-500 hover:text-white'
          else if (i === mcq.answer) cls += 'border-green-500 bg-green-500/10 text-green-400'
          else if (i === selected) cls += 'border-red-500 bg-red-500/10 text-red-400'
          else cls += 'border-gray-800 text-gray-600'
          return (
            <button key={i} className={cls} onClick={() => !answered && setSelected(i)}>
              <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-3 p-3 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400"><span className="text-orange-400 font-semibold">Explanation:</span> {mcq.explanation}</p>
        </div>
      )}
      {answered && (
        <button onClick={() => setSelected(null)} className="mt-2 text-xs text-gray-500 hover:text-white">
          Reset
        </button>
      )}
    </div>
  )
}
