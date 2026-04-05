export interface Recipe {
  id: number
  title: string
  preparationTime: number
  cookingTime: number
  servings: number
  image: { path: string } | null
  category: { id: number; name: string }
  enabled: boolean
}

interface Ingredient {
  id: number
  name: string
  category?: {
    id: number
    name: string
  }
}

export interface RecipeDetail extends Recipe {
  recipeIngredients: {
    id: number
    position: number
    quantity: string
    unit?: { label: string }
    ingredient: Ingredient
  }[]
  recipeSteps: {
    id: number
    position: number
    description: string
    recipeStepIngredients: {
      id: number
      position: number
      quantity: string
      unit?: { label: string }
      ingredient: Ingredient
    }[]
  }[]
}