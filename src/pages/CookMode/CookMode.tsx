import { useState } from 'react'
import CookPrepPage from './CookPrepPage'
import CookStepPage from './CookStepPage'
import { t } from '../../i18n'
import type { RecipeDetail } from '../../types'
import useWakeLock from '../../useWakeLock'

interface CookModeProps {
  recipe: RecipeDetail
  onClose: () => void
  onDone: () => void
}

export default function CookMode({ recipe, onClose, onDone }: CookModeProps) {
  const steps = recipe.recipeSteps
    .slice()
    .sort((a, b) => a.position - b.position)
  const [current, setCurrent] = useState(-1)
  useWakeLock()

  const isIngredientsPage = current === -1
  const isLastStep = current >= steps.length - 1
  const totalPages = steps.length + 1

  return (
    <div className="cook-mode">
      <header className="cook-header">
        <button className="cook-close" onClick={onClose}>
          ✕
        </button>
        <span className="cook-title">{recipe.title}</span>
        {!isIngredientsPage && (
          <span className="cook-counter">
            {current + 1} / {steps.length}
          </span>
        )}
      </header>

      {isIngredientsPage ? (
        <CookPrepPage recipe={recipe} steps={steps} />
      ) : (
        <CookStepPage step={steps[current]} stepNumber={current + 1} />
      )}

      <footer className="cook-footer">
        {isIngredientsPage ? (
          <button
            className="cook-nav primary"
            style={{ width: '100%' }}
            onClick={() => setCurrent(0)}
          >
            {t('cookStart')}
          </button>
        ) : (
          <>
            <button
              className="cook-nav"
              onClick={() => setCurrent((c) => c - 1)}
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
          </>
        )}
      </footer>
    </div>
  )
}