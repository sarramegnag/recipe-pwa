import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { fetchRecipes, fetchRecipe } from './api'
import type { SortOption } from './api'
import { t } from './i18n'
import type { Recipe, RecipeDetail } from './types'
import RecipeList from './RecipeList'
import RecipeDetailView from './RecipeDetailView'
import SettingsPanel from './SettingsPanel'
import type { Theme } from './SettingsPanel'

declare const __COMMIT_HASH__: string

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sort, setSort] = useState<SortOption>(null)
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system'
  })

  useEffect(() => {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      fetchRecipes(query || undefined, sort)
        .then((data) => setRecipes(data))
        .finally(() => setLoading(false))
    }, query ? 300 : 0)
    return () => clearTimeout(timeout)
  }, [query, sort])

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

  let content
  if (detailLoading) {
    content = <div className="recipe-loading">{t('loading')}</div>
  } else if (selectedRecipe) {
    content = <RecipeDetailView recipe={selectedRecipe} onBack={closeRecipe} />
  } else {
    content = (
      <RecipeList
        recipes={recipes}
        loading={loading}
        query={query}
        sort={sort}
        onQueryChange={setQuery}
        onSortChange={setSort}
        onSelect={openRecipe}
      />
    )
  }

  return (
    <div className="app">
      {content}
      <button className="settings-fab" onClick={() => setSettingsOpen(true)} aria-label={t('settings')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
      <SettingsPanel
        open={settingsOpen}
        theme={theme}
        version={__COMMIT_HASH__.slice(0, 7)}
        onThemeChange={setTheme}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  )
}

export default App
