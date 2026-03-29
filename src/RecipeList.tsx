import { API_URL } from './api'
import { t } from './i18n'
import type { Recipe } from './types'

interface RecipeListProps {
  recipes: Recipe[]
  loading: boolean
  query: string
  onQueryChange: (query: string) => void
  onSelect: (id: number) => void
}

export default function RecipeList({ recipes, loading, query, onQueryChange, onSelect }: RecipeListProps) {
  return (
    <>
      <header className="app-header">
        <h1>{t('recipes')}</h1>
        <input
          className="search-input"
          type="search"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </header>
      <ul className="recipe-list">
        {loading && <li className="recipe-loading">{t('loading')}</li>}
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-card" onClick={() => onSelect(recipe.id)}>
            {recipe.image ? (
              <img
                className="recipe-img"
                src={`${API_URL}/${recipe.image.path}`}
                alt={recipe.title}
              />
            ) : (
              <span className="recipe-emoji">🍽️</span>
            )}
            <div className="recipe-info">
              <h2>{recipe.title}</h2>
              <p>{recipe.preparationTime + recipe.cookingTime} {t('min')} · {recipe.servings} {t('portions')}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}