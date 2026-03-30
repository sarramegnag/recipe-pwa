import { API_URL } from './api'
import { t } from './i18n'
import type { RecipeDetail } from './types'

interface RecipeDetailViewProps {
  recipe: RecipeDetail
  onBack: () => void
}

export default function RecipeDetailView({ recipe, onBack }: RecipeDetailViewProps) {
  return (
    <>
      <header className="detail-header">
        <button className="back-button" onClick={onBack}>
          {t('back')}
        </button>
      </header>
      {recipe.image ? (
        <img
          className="detail-img"
          src={`${API_URL}/${recipe.image.path}`}
          alt={recipe.title}
        />
      ) : (
        <div className="detail-emoji">🍽️</div>
      )}
      <div className="detail-content">
        <h1 className="detail-title">{recipe.title}</h1>
        <div className="detail-meta">
          {recipe.preparationTime > 0 && (
            <span>🔪 {recipe.preparationTime} {t('min')}</span>
          )}
          {recipe.cookingTime > 0 && (
            <span>🔥 {recipe.cookingTime} {t('min')}</span>
          )}
          <span>🍽️ {recipe.servings} {t('portions')}</span>
        </div>

        {recipe.recipeIngredients.length > 0 && (
          <section className="detail-section">
            <h2>{t('ingredients')}</h2>
            <ul className="ingredient-list">
              {recipe.recipeIngredients.map((ing) => (
                <li key={ing.id}>
                  {parseFloat(ing.quantity)} {ing.unit?.label ?? ''} {ing.ingredient.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {recipe.recipeSteps.length > 0 && (
          <section className="detail-section">
            <h2>{t('steps')}</h2>
            <ol className="step-list">
              {recipe.recipeSteps
                .sort((a, b) => a.position - b.position)
                .map((step) => (
                  <li key={step.id}>{step.description}</li>
                ))}
            </ol>
          </section>
        )}
      </div>
    </>
  )
}
