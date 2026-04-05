export default function CookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="76 130 360 290" fill="none">
      <rect x="126" y="260" width="260" height="160" rx="32" fill="currentColor"/>
      <rect x="106" y="240" width="300" height="40" rx="12" fill="currentColor"/>
      <rect x="76" y="250" width="40" height="20" rx="10" fill="currentColor"/>
      <rect x="396" y="250" width="40" height="20" rx="10" fill="currentColor"/>
      <path d="M200 210 Q195 180 205 150" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
      <path d="M256 200 Q251 165 261 130" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
      <path d="M312 210 Q307 180 317 150" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
    </svg>
  )
}
