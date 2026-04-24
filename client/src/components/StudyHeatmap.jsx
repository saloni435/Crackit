const DAYS = 365
const COLS = 53

function getColor(count) {
  if (!count || count === 0) return 'bg-gray-800'
  if (count <= 2) return 'bg-orange-900'
  if (count <= 5) return 'bg-orange-600'
  return 'bg-orange-400'
}

function totalForDay(entry) {
  if (!entry) return 0
  return (entry.episodes || 0) + (entry.dsa || 0) + (entry.mcqs || 0) + (entry.interviews || 0)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function StudyHeatmap({ activityLog = {} }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Build array of last DAYS days, oldest first
  const days = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (DAYS - 1 - i))
    return d.toISOString().slice(0, 10)
  })

  const totalContributions = days.reduce((sum, d) => sum + totalForDay(activityLog[d]), 0)

  // Day-of-week labels (Mon offset)
  const DOW = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  // Month labels: find where month changes across the columns
  const monthLabels = []
  let lastMonth = -1
  days.forEach((d, i) => {
    const col = Math.floor(i / 7)
    const month = new Date(d).getMonth()
    if (month !== lastMonth) {
      monthLabels.push({ col, label: new Date(d).toLocaleDateString('en-US', { month: 'short' }) })
      lastMonth = month
    }
  })

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-sm">Study Activity</h3>
        <span className="text-gray-500 text-xs">{totalContributions} activities in the last year</span>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: `${COLS * 14}px` }}>
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: '24px' }}>
            {Array.from({ length: COLS }, (_, col) => {
              const label = monthLabels.find(m => m.col === col)
              return (
                <div key={col} style={{ width: '12px', marginRight: '2px', flexShrink: 0 }}>
                  {label && <span className="text-gray-600 text-xs">{label.label}</span>}
                </div>
              )
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-0">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-0.5 mr-1.5">
              {DOW.map((label, i) => (
                <div key={i} style={{ height: '12px', lineHeight: '12px' }} className="text-gray-600 text-xs w-4 flex items-center">
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {Array.from({ length: COLS }, (_, col) => (
              <div key={col} className="flex flex-col gap-0.5 mr-0.5">
                {Array.from({ length: 7 }, (_, dow) => {
                  const idx = col * 7 + dow
                  if (idx >= DAYS) return <div key={dow} style={{ width: '12px', height: '12px' }} />
                  const dateStr = days[idx]
                  const entry = activityLog[dateStr]
                  const count = totalForDay(entry)
                  const tip = count > 0
                    ? `${formatDate(dateStr)}: ${entry?.episodes || 0} episodes, ${entry?.dsa || 0} DSA, ${entry?.mcqs || 0} MCQs, ${entry?.interviews || 0} interviews`
                    : formatDate(dateStr)
                  return (
                    <div
                      key={dow}
                      title={tip}
                      style={{ width: '12px', height: '12px' }}
                      className={`rounded-sm ${getColor(count)} transition-colors cursor-default`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
        <span>Less</span>
        {['bg-gray-800', 'bg-orange-900', 'bg-orange-600', 'bg-orange-400'].map(c => (
          <div key={c} style={{ width: '12px', height: '12px' }} className={`rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
