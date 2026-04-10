import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { fetchRecipes, fetchRecipe } from './api'
import type { SortOption } from './api'
import { t } from './i18n'
import type { Recipe, RecipeDetail } from './types'
import { RecipeList, RecipeDetailView, SettingsPanel } from './pages'
import type { Theme } from './pages/SettingsPanel'

declare const __COMMIT_HASH__: string

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null)
  const [selectedPreview, setSelectedPreview] = useState<Recipe | null>(null)
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

  const loadRecipes = useCallback(() => {
    setLoading(true)
    setPage(1)
    setHasMore(true)
    return fetchRecipes(query || undefined, sort, 1)
      .then((data) => {
        setRecipes(data)
        if (data.length === 0) setHasMore(false)
      })
      .finally(() => setLoading(false))
  }, [query, sort])

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    const nextPage = page + 1
    setLoadingMore(true)
    fetchRecipes(query || undefined, sort, nextPage)
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false)
        } else {
          setRecipes((prev) => [...prev, ...data])
          setPage(nextPage)
        }
      })
      .finally(() => setLoadingMore(false))
  }, [loadingMore, hasMore, page, query, sort])

  useEffect(() => {
    const timeout = setTimeout(() => loadRecipes(), query ? 300 : 0)
    return () => clearTimeout(timeout)
  }, [loadRecipes])

  const openRecipe = useCallback((id: number) => {
    const preview = recipes.find((r) => r.id === id)
    if (preview) setSelectedPreview(preview)
    setSelectedRecipe(null)
    history.pushState({ recipeId: id }, '')
    fetchRecipe(id)
      .then((data) => setSelectedRecipe(data))
  }, [recipes])

  const refreshRecipe = useCallback(() => {
    const id = selectedRecipe?.id ?? selectedPreview?.id
    if (!id) return
    setSelectedRecipe(null)
    fetchRecipe(id)
      .then((data) => setSelectedRecipe(data))
  }, [selectedRecipe, selectedPreview])

  const closeRecipe = useCallback(() => {
    history.back()
    setSelectedRecipe(null)
    setSelectedPreview(null)
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setSelectedRecipe(null)
      setSelectedPreview(null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const displayRecipe = selectedRecipe ?? (selectedPreview ? { ...selectedPreview, recipeIngredients: [], recipeSteps: [] } as RecipeDetail : null)

  let content
  if (displayRecipe) {
    content = <RecipeDetailView recipe={displayRecipe} loading={!selectedRecipe} onBack={closeRecipe} onRefresh={refreshRecipe} />
  } else {
    content = (
      <RecipeList
        recipes={recipes}
        loading={loading}
        loadingMore={loadingMore}
        hasMore={hasMore}
        query={query}
        sort={sort}
        onQueryChange={setQuery}
        onSortChange={setSort}
        onSelect={openRecipe}
        onRefresh={loadRecipes}
        onLoadMore={loadMore}
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
