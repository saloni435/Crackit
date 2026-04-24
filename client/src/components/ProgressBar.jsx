export default function ProgressBar({ percent }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-1.5">
      <div
        className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
