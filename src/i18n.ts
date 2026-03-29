const translations = {
  recipes: 'Recettes',
  searchPlaceholder: 'Rechercher...',
  loading: 'Chargement...',
  back: '← Retour',
  min: 'min',
  portions: 'portions',
  ingredients: 'Ingrédients',
  steps: 'Étapes',
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey): string {
  return translations[key]
}