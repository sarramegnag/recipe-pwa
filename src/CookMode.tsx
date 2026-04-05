import { useState } from 'react'
import { t } from './i18n'
import type { RecipeDetail } from './types'
import useWakeLock from './useWakeLock'

interface CookModeProps {
  recipe: RecipeDetail
  onClose: () => void
  onDone: () => void
}

export default function CookMode({ recipe, onClose, onDone }: CookModeProps) {
  const steps = recipe.recipeSteps
    .slice()
    .sort((a, b) => a.position - b.position)
  const [current, setCurrent] = useState(0)
  const stepIngredients = steps[current].recipeStepIngredients
  useWakeLock()

  const isLastStep = current >= steps.length - 1

  return (
    <div className="cook-mode">
      <header className="cook-header">
        <button className="cook-close" onClick={onClose}>
          ✕
        </button>
        <span className="cook-title">{recipe.title}</span>
        <span className="cook-counter">
          {current + 1} / {steps.length}
        </span>
      </header>

      {stepIngredients.length > 0 && (
        <div className="cook-ingredients-panel">
          <div className="cook-ingredients-label">{t('ingredients')}</div>
          <ul className="cook-ingredients">
            {stepIngredients.map((ing) => (
              <li key={ing.id}>
                <span className="cook-ing-qty">
                  {parseFloat(ing.quantity)}{ing.unit ? ` ${ing.unit.label}` : ''}
                </span>
                <span className="cook-ing-name">{ing.ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="cook-body">
        <span className="cook-step-label">
          {t('cookStep')} {current + 1}
        </span>
        <p className="cook-step">{steps[current].description}</p>
      </div>

      <footer className="cook-footer">
        <button
          className="cook-nav"
          onClick={() => setCurrent((c) => c - 1)}
          disabled={current === 0}
        >
          {t('cookPrev')}
        </button>
        {isLastStep ? (
          <button className="cook-nav primary" onClick={onDone}>
            {t('cookDone')}
          </button>
        ) : (
          <button
            className="cook-nav primary"
            onClick={() => setCurrent((c) => c + 1)}
          >
            {t('cookNext')}
          </button>
        )}
      </footer>
    </div>
  )
}