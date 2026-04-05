import { useMemo, useState } from 'react'
import CookIcon from '../../components/CookIcon'
import { t } from '../../i18n'
import type { RecipeDetail } from '../../types'

interface CookPrepPageProps {
  recipe: RecipeDetail
  steps: RecipeDetail['recipeSteps']
}

export default function CookPrepPage({ recipe, steps }: CookPrepPageProps) {
  const [sortMode, setSortMode] = useState<'byUse' | 'byCategory' | null>(null)
  const toggleSort = (mode: 'byUse' | 'byCategory') => setSortMode((prev) => prev === mode ? null : mode)

  const ingredientGroups = useMemo(() => {
    if (sortMode === 'byCategory') {
      const groups = new Map<string, typeof recipe.recipeIngredients>()
      for (const ing of recipe.recipeIngredients) {
        const cat = ing.ingredient.category?.name ?? 'Autre'
        if (!groups.has(cat)) groups.set(cat, [])
        groups.get(cat)!.push(ing)
      }
      return Array.from(groups, ([name, items]) => ({ name, items }))
    }
    if (sortMode === 'byUse') {
      const orderMap = new Map<string, number>()
      let order = 0
      for (const step of steps) {
        for (const si of step.recipeStepIngredients) {
          if (!orderMap.has(si.ingredient.name)) {
            orderMap.set(si.ingredient.name, order)
          }
          order++
        }
      }
      const sorted = recipe.recipeIngredients.slice().sort((a, b) => {
        const posA = orderMap.get(a.ingredient.name) ?? Infinity
        const posB = orderMap.get(b.ingredient.name) ?? Infinity
        return posA - posB
      })
      return [{ name: null, items: sorted }]
    }
    return [{ name: null, items: recipe.recipeIngredients }]
  }, [sortMode, recipe.recipeIngredients, steps])

  return (
    <div className="cook-body cook-prep">
      <div className="cook-prep-header">
        <CookIcon size={64} />
        <h2 className="cook-prep-title">{t('ingredients')}</h2>
        <span className="cook-prep-subtitle">{recipe.recipeIngredients.length} {t('ingredients').toLowerCase()}</span>
      </div>
      <div className="cook-sort-toggle">
        <button className={`cook-sort-btn${sortMode === 'byUse' ? ' active' : ''}`} onClick={() => toggleSort('byUse')}>
          {t('sortByUse')}
        </button>
        <button className={`cook-sort-btn${sortMode === 'byCategory' ? ' active' : ''}`} onClick={() => toggleSort('byCategory')}>
          {t('sortByCategory')}
        </button>
      </div>
      {ingredientGroups.map((group) => (
        <div key={group.name ?? 'default'}>
          {group.name && <div className="cook-ingredients-label">{group.name}</div>}
          <ul className="cook-ingredients cook-ingredients-full">
            {group.items.map((ing) => (
              <li key={ing.id}>
                <span className="cook-ing-qty">
                  {parseFloat(ing.quantity)}{ing.unit ? ` ${ing.unit.label}` : ''}
                </span>
                <span className="cook-ing-name">{ing.ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}