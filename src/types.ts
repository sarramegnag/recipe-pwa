export interface Recipe {
  id: number
  title: string
  preparationTime: number
  cookingTime: number
  servings: number
  image: { path: string } | null
  enabled: boolean
}

export interface RecipeDetail extends Recipe {
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