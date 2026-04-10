import { useCallback, useState } from 'react'
import Confetti from '../components/Confetti'
import CookIcon from '../components/CookIcon'
import CookMode from './CookMode'
import { t } from '../i18n'
import RecipeImage from '../components/RecipeImage'
import type { RecipeDetail } from '../types'

interface RecipeDetailViewProps {
  recipe: RecipeDetail
  loading?: boolean
  onBack: () => void
}

export default function RecipeDetailView({ recipe, loading, onBack }: RecipeDetailViewProps) {
  const [cooking, setCooking] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleDone = useCallback(() => {
    setCooking(false)
    setShowConfetti(true)
  }, [])

  if (cooking) {
    return <CookMode recipe={recipe} onClose={() => setCooking(false)} onDone={handleDone} />
  }

  return (
    <>
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}
      <div className="sticky-header-wrap">
        <header className="detail-header">
          <button className="back-button" onClick={onBack}>
            {t('back')}
          </button>
          <button className="cook-header-btn" onClick={() => setCooking(true)} disabled={recipe.recipeSteps.length === 0} aria-label={t('cookMode')}>
            <CookIcon size={22} />
          </button>
        </header>
        {loading && <div className="loading-bar" />}
      </div>
      <div className="detail-img-wrap">
        <RecipeImage src={recipe.image?.path ?? null} alt={recipe.title} className="detail-img" />
        <span className="recipe-category">{recipe.category.name}</span>
      </div>
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

        {loading ? null : (
          <>
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

            {recipe.recipeSteps.length > 0 && (
              <button className="cook-mode-btn" onClick={() => setCooking(true)}>
                <CookIcon />
                {t('cookMode')}
              </button>
            )}
          </>
        )}
      </div>
    </>
  )
}
