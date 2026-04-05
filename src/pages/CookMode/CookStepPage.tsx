import { t } from '../../i18n'
import type { RecipeDetail } from '../../types'

interface CookStepPageProps {
  step: RecipeDetail['recipeSteps'][number]
  stepNumber: number
}

export default function CookStepPage({ step, stepNumber }: CookStepPageProps) {
  return (
    <>
      {step.recipeStepIngredients.length > 0 && (
        <div className="cook-ingredients-panel">
          <div className="cook-ingredients-label">{t('ingredients')}</div>
          <ul className="cook-ingredients">
            {step.recipeStepIngredients.map((ing) => (
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
          {t('cookStep')} {stepNumber}
        </span>
        <p className="cook-step">{step.description}</p>
      </div>
    </>
  )
}