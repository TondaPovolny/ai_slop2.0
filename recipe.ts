export type IngredientCategory =
  | 'zelenina_ovoce'
  | 'mlecne_vejce'
  | 'maso_ryby'
  | 'prilohy_obiloviny'
  | 'spiz_koreni'
  | 'ostatni';

export interface FridgeIngredient {
  id: string;
  name: string;
  category: IngredientCategory;
  amount?: string;
  expiresSoon?: boolean; // Urgency marker "Spotřebovat brzy"
  addedAt?: number;
}

export interface RecipeIngredient {
  name: string;
  amount: string; // Base amount for default portions (e.g. "400 g", "3 ks", "2 lžíce")
  numericValue?: number; // Base numerical value for portion scaling
  unit?: string; // Unit string for portion scaling
  optional?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: 'snidane' | 'obed_vece' | 'svacina' | 'dezert';
  prepTime: number; // in minutes
  difficulty: 'Snadné' | 'Střední' | 'Pokročilé';
  portions: number; // base portions
  calories: number; // kcal per portion
  macros: {
    protein: number; // g
    carbs: number; // g
    fat: number; // g
  };
  tags: string[]; // e.g. 'Vegetariánské', 'Rychlovka', 'Vysoký protein', 'Česká klasika'
  ingredients: RecipeIngredient[];
  instructions: string[];
  chefTip?: string;
  imageUrl: string;
  isCustom?: boolean;
  rating?: number;
  userNotes?: string;
}

export interface RecipeMatchResult {
  recipe: Recipe;
  matchScore: number; // 0 to 100%
  availableIngredients: string[];
  missingIngredients: RecipeIngredient[];
  usesExpiringCount: number; // How many "expiresSoon" items it utilizes
}

export type DayOfWeek = 'Po' | 'Út' | 'St' | 'Čt' | 'Pá' | 'So' | 'Ne';
export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface PlannedMeal {
  id: string;
  day: DayOfWeek;
  mealType: MealType;
  recipeId: string;
  recipeTitle: string;
  servings: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount?: string;
  checked: boolean;
  category?: IngredientCategory;
  recipeSource?: string;
}
