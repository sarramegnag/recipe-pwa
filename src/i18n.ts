const translations = {
  recipes: 'Recettes',
  searchPlaceholder: 'Rechercher...',
  loading: 'Chargement...',
  back: '← Retour',
  min: 'min',
  portions: 'portions',
  ingredients: 'Ingrédients',
  steps: 'Étapes',
  noImage: 'Pas de photo',
  noResults: 'Aucune recette trouvée',
  sortTitle: 'Titre',
  sortTotalTime: 'Temps total',
  sortCreatedAt: 'Date d\'ajout',
  settings: 'Paramètres',
  appearance: 'Apparence',
  themeSystem: 'Système',
  themeLight: 'Clair',
  themeDark: 'Sombre',
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey): string {
  return translations[key]
}
