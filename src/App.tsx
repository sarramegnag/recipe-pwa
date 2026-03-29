import { useEffect, useMemo, useState } from 'react'
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

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/recipes`, {
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return recipes
    return recipes.filter((r) => r.title.toLowerCase().includes(q))
  }, [query, recipes])

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
          <li key={recipe.id} className="recipe-card">
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