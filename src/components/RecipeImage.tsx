interface RecipeImageProps {
  src: string | null
  alt: string
  className: string
}

export default function RecipeImage({ src, alt, className }: RecipeImageProps) {
  if (src) {
    return <img className={className} src={src} alt={alt} />
  }
  return (
    <div className="recipe-img-placeholder">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    </div>
  )
}