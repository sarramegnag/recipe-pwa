import type { Recipe, RecipeDetail } from './types'

const BASE = import.meta.env.BASE_URL

export function fetchRecipes(): Promise<Recipe[]> {
  return fetch(`${BASE}mock/recipes.json`).then((res) => res.json())
}

export function fetchRecipe(id: number): Promise<RecipeDetail> {
  return fetch(`${BASE}mock/recipe-${id}.json`).then((res) => res.json())
}