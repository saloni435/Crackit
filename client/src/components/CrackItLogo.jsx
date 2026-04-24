export default function CrackItLogo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left bracket */}
      <path
        d="M8 6 L4 10 L4 22 L8 26"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right bracket */}
      <path
        d="M24 6 L28 10 L28 22 L24 26"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lightning bolt */}
      <path
        d="M18 5 L12 17 H16.5 L14 27 L22 14 H17 L18 5Z"
        fill="#f97316"
        stroke="#fb923c"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
