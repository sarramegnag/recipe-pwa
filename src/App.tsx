import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { fetchRecipes, fetchRecipe } from './api'
import { t } from './i18n'
import type { Recipe, RecipeDetail } from './types'
import RecipeList from './RecipeList'
import RecipeDetailView from './RecipeDetailView'

declare const __COMMIT_HASH__: string

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    fetchRecipes()
      .then((data) => setRecipes(data))
      .finally(() => setLoading(false))
  }, [])

  const openRecipe = useCallback((id: number) => {
    setDetailLoading(true)
    history.pushState({ recipeId: id }, '')
    fetchRecipe(id)
      .then((data) => setSelectedRecipe(data))
      .finally(() => setDetailLoading(false))
  }, [])

  const closeRecipe = useCallback(() => {
    history.back()
    setSelectedRecipe(null)
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setSelectedRecipe(null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return recipes
    return recipes.filter((r) => r.title.toLowerCase().includes(q))
  }, [query, recipes])

  let content
  if (detailLoading) {
    content = <div className="recipe-loading">{t('loading')}</div>
  } else if (selectedRecipe) {
    content = <RecipeDetailView recipe={selectedRecipe} onBack={closeRecipe} />
  } else {
    content = (
      <RecipeList
        recipes={filtered}
        loading={loading}
        query={query}
        onQueryChange={setQuery}
        onSelect={openRecipe}
      />
    )
  }

  return (
    <div className="app">
      {content}
      <footer className="app-footer">v. {__COMMIT_HASH__.slice(0, 7)}</footer>
    </div>
  )
}

export default App