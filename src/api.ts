import type { Recipe, RecipeDetail } from './types'

export const API_URL = import.meta.env.VITE_API_URL || 'https://admin.sarramegna.fr'

export function fetchRecipes(): Promise<Recipe[]> {
  return fetch(`${API_URL}/api/recipes`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json())
}

export function fetchRecipe(id: number): Promise<RecipeDetail> {
  return fetch(`${API_URL}/api/recipes/${id}`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json())
}
