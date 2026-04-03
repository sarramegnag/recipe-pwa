import type { Recipe, RecipeDetail } from './types'

export const API_URL = import.meta.env.VITE_API_URL || 'https://admin.sarramegna.fr'

export type SortField = 'title' | 'totalTime' | 'createdAt'
export type SortDirection = 'asc' | 'desc'
export type SortOption = { field: SortField; direction: SortDirection } | null

export function fetchRecipes(title?: string, sort?: SortOption): Promise<Recipe[]> {
  const url = new URL(`${API_URL}/api/recipes`)
  if (title) {
    url.searchParams.set('search', title)
  }
  if (sort) {
    url.searchParams.set(`order[${sort.field}]`, sort.direction)
  }
  return fetch(url.toString(), {
    headers: { Accept: 'application/json' },
  })
    .then((res) => res.json())
    .catch((e) => {
      if (import.meta.env.DEV) return import('./mock-api').then((m) => m.fetchRecipes())
      throw e
    })
}

export function fetchRecipe(id: number): Promise<RecipeDetail> {
  return fetch(`${API_URL}/api/recipes/${id}`, {
    headers: { Accept: 'application/json' },
  })
    .then((res) => res.json())
    .catch((e) => {
      if (import.meta.env.DEV) return import('./mock-api').then((m) => m.fetchRecipe(id))
      throw e
    })
}
