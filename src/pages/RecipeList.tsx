import { useRef, useState, useEffect } from 'react'
import type { SortField, SortOption } from '../api'
import { t } from '../i18n'
import RecipeImage from '../components/RecipeImage'
import type { Recipe } from '../types'

const SORT_OPTIONS: { field: SortField; label: () => string }[] = [
  { field: 'title', label: () => t('sortTitle') },
  { field: 'totalTime', label: () => t('sortTotalTime') },
  { field: 'createdAt', label: () => t('sortCreatedAt') },
]

interface RecipeListProps {
  recipes: Recipe[]
  loading: boolean
  query: string
  sort: SortOption
  onQueryChange: (query: string) => void
  onSortChange: (sort: SortOption) => void
  onSelect: (id: number) => void
}

export default function RecipeList({ recipes, loading, query, sort, onQueryChange, onSortChange, onSelect }: RecipeListProps) {
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sortOpen) return
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [sortOpen])

  const handleSort = (field: SortField) => {
    if (sort?.field === field) {
      if (sort.direction === 'asc') {
        onSortChange({ field, direction: 'desc' })
      } else {
        onSortChange(null)
      }
    } else {
      onSortChange({ field, direction: 'asc' })
    }
    setSortOpen(false)
  }

  return (
    <>
      <div className="sticky-header-wrap">
      <header className="app-header">
        <h1>{t('recipes')}</h1>
        <div className="search-row">
          <input
            className="search-input"
            type="search"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <div className="sort-wrapper" ref={sortRef}>
            <button
              className={`sort-button${sort ? ' active' : ''}`}
              onClick={() => setSortOpen(!sortOpen)}
              aria-label="Sort"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M6 12h12M9 18h6" />
              </svg>
            </button>
            {sortOpen && (
              <div className="sort-dropdown">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.field}
                    className={`sort-option${sort?.field === opt.field ? ' active' : ''}`}
                    onClick={() => handleSort(opt.field)}
                  >
                    <span>{opt.label()}</span>
                    {sort?.field === opt.field && (
                      <span className="sort-arrow">{sort.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      {loading && <div className="loading-bar" />}
      </div>
      {!loading && recipes.length === 0 && (
        <p className="recipe-empty">{t('noResults')}</p>
      )}
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-card" onClick={() => onSelect(recipe.id)}>
            <div className="recipe-img-wrap">
              <RecipeImage src={recipe.image?.path ?? null} alt={recipe.title} className="recipe-img" />
              <span className="recipe-category">{recipe.category.name}</span>
            </div>
            <div className="recipe-info">
              <h2>{recipe.title}</h2>
              <p>🔪 {recipe.preparationTime} {t('min')} · 🔥 {recipe.cookingTime} {t('min')} · 🍽️ {recipe.servings} {t('portions')}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}