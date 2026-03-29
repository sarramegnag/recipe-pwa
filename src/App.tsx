import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

declare const __COMMIT_HASH__: string

const API_URL = import.meta.env.VITE_API_URL || 'https://admin.sarramegna.fr'

interface Recipe {
  id: number
  title: string
  preparationTime: number
  cookingTime: number
  servings: number
  image: { path: string } | null
  enabled: boolean
}

interface RecipeDetail extends Recipe {
  recipeIngredients: {
    id: number
    quantity: string
    unit?: { label: string }
    ingredient: { name: string }
  }[]
  recipeSteps: {
    id: number
    position: number
    description: string
  }[]
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/recipes`, {
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .finally(() => setLoading(false))
  }, [])

  const openRecipe = useCallback((id: number) => {
    setDetailLoading(true)
    history.pushState({ recipeId: id }, '')
    fetch(`${API_URL}/api/recipes/${id}`, {
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setSelectedRecipe(data))
      .finally(() => setDetailLoading(false))
  }, [])

  const closeRecipe = useCallback(() => {
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

  if (detailLoading) {
    return (
      <div className="app">
        <div className="recipe-loading">Loading...</div>
      </div>
    )
  }

  if (selectedRecipe) {
    return (
      <div className="app">
        <header className="detail-header">
          <button className="back-button" onClick={() => { history.back(); closeRecipe() }}>
            ← Back
          </button>
        </header>
        {selectedRecipe.image ? (
          <img
            className="detail-img"
            src={`${API_URL}/${selectedRecipe.image.path}`}
            alt={selectedRecipe.title}
          />
        ) : (
          <div className="detail-emoji">🍽️</div>
        )}
        <div className="detail-content">
          <h1 className="detail-title">{selectedRecipe.title}</h1>
          <div className="detail-meta">
            {selectedRecipe.preparationTime > 0 && (
              <span>🔪 {selectedRecipe.preparationTime} min</span>
            )}
            {selectedRecipe.cookingTime > 0 && (
              <span>🔥 {selectedRecipe.cookingTime} min</span>
            )}
            <span>🍽️ {selectedRecipe.servings} portions</span>
          </div>

          {selectedRecipe.recipeIngredients.length > 0 && (
            <section className="detail-section">
              <h2>Ingrédients</h2>
              <ul className="ingredient-list">
                {selectedRecipe.recipeIngredients.map((ing) => (
                  <li key={ing.id}>
                    {parseFloat(ing.quantity)} {ing.unit?.label ?? ''} {ing.ingredient.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {selectedRecipe.recipeSteps.length > 0 && (
            <section className="detail-section">
              <h2>Étapes</h2>
              <ol className="step-list">
                {selectedRecipe.recipeSteps
                  .sort((a, b) => a.position - b.position)
                  .map((step) => (
                    <li key={step.id}>{step.description}</li>
                  ))}
              </ol>
            </section>
          )}
        </div>
        <footer className="app-footer">v. {__COMMIT_HASH__.slice(0, 7)}</footer>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipes</h1>
        <input
          className="search-input"
          type="search"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      <ul className="recipe-list">
        {loading && <li className="recipe-loading">Loading...</li>}
        {filtered.map((recipe) => (
          <li key={recipe.id} className="recipe-card" onClick={() => openRecipe(recipe.id)}>
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
              <p>{recipe.preparationTime + recipe.cookingTime} min · {recipe.servings} portions</p>
            </div>
          </li>
        ))}
      </ul>
      <footer className="app-footer">v. {__COMMIT_HASH__.slice(0, 7)}</footer>
    </div>
  )
}

export default App