import { FridgeIngredient, Recipe, RecipeIngredient, RecipeMatchResult } from '../types/recipe';

// Normalize string: strip diacritics, lowercase, remove punctuation
export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Synonym groupings for smart culinary matching in Czech
const SYNONYM_GROUPS: string[][] = [
  ['vejce', 'vajicko', 'vajicka', 'vajec', 'zloutek', 'zloutky', 'bilek', 'bilky'],
  ['rajce', 'rajcata', 'rajcat', 'drcena rajcata', 'rajcatovy protlak', 'cherry rajcata'],
  ['brambor', 'brambory', 'bramborami', 'bramburky'],
  ['maslo', 'maslem'],
  ['smetana', 'smetanu', 'smetany', 'slehacka', 'slehacku'],
  ['cesnek', 'cesneku', 'cesnekem'],
  ['cibule', 'cibuli', 'salotka', 'cibulka'],
  ['spagety', 'testoviny', 'penne', 'nudle', 'fusilli'],
  ['kureci prsa', 'kureci', 'kure', 'kurete', 'kurecich'],
  ['slanina', 'slaninu', 'pancetta', 'spek'],
  ['parmazan', 'grana padano', 'parmigiano', 'pecorino'],
  ['mozzarella', 'mozzarellu'],
  ['cedar', 'syr', 'eidam', 'gouda'],
  ['ryze', 'ryze basmati', 'ryzi', 'jasmínová rýže'],
  ['ovesne vlocky', 'vlocky', 'ovesnych vlocek'],
  ['mouka', 'hladka mouka', 'mouku'],
  ['olej', 'olivovy olej', 'rostlinny olej'],
  ['houby', 'zampiony', 'hribky', 'zampion'],
  ['spenat', 'baby spenat', 'listovy spenat'],
  ['paprika', 'papriku', 'kapie'],
  ['mrkev', 'mrkve', 'karotka'],
  ['citron', 'citronu', 'citronova stava'],
  ['med', 'medu'],
  ['chilli', 'chilli vlocky', 'feferonka', 'paliva paprika'],
  ['brokolice', 'brokolici'],
  ['tunak', 'tunak v konzerve', 'konzerva tunaka'],
  ['losos', 'filet z lososa', 'lososa'],
  ['cervena cocka', 'cocka', 'cocku'],
  ['tortilla', 'tortilly', 'placky', 'wrap'],
  ['sunka', 'dusena sunka', 'sunku'],
  ['mlete hovezi maso', 'mlete maso', 'hovezi maso', 'hovezi', 'mlety'],
  ['mleko', 'mleka', 'mlekem'],
  ['jogurt', 'bily jogurt', 'jogurtem', 'recky jogurt'],
  ['jablko', 'jablka', 'jablek', 'jablkem'],
  ['sojova omacka', 'sojovka'],
  ['gnocchi', 'noky', 'bramborove noky', 'testoviny'],
  ['majoranka', 'susena majoranka'],
  ['oregano', 'susene oregano', 'bazalka'],
  ['pepr', 'cerny pepr', 'mlety pepr'],
];

// Check if two ingredient names match
export function isIngredientMatch(fridgeName: string, recipeName: string): boolean {
  const normFridge = normalizeText(fridgeName);
  const normRecipe = normalizeText(recipeName);

  if (normFridge === normRecipe) return true;
  if (normRecipe.includes(normFridge) || normFridge.includes(normRecipe)) return true;

  // Check synonym groups
  for (const group of SYNONYM_GROUPS) {
    const fridgeInGroup = group.some((term) => normFridge.includes(term) || term.includes(normFridge));
    const recipeInGroup = group.some((term) => normRecipe.includes(term) || term.includes(normRecipe));
    if (fridgeInGroup && recipeInGroup) {
      return true;
    }
  }

  return false;
}

// Calculate match results for all recipes given current fridge contents
export function matchRecipesWithFridge(
  recipes: Recipe[],
  fridge: FridgeIngredient[]
): RecipeMatchResult[] {
  return recipes.map((recipe) => {
    const availableIngredients: string[] = [];
    const missingIngredients: RecipeIngredient[] = [];
    let usesExpiringCount = 0;

    const expiringFridgeItems = fridge.filter((f) => f.expiresSoon);

    recipe.ingredients.forEach((recIng) => {
      const matchedFridgeItem = fridge.find((f) => isIngredientMatch(f.name, recIng.name));

      if (matchedFridgeItem) {
        availableIngredients.push(recIng.name);
      } else if (!recIng.optional) {
        missingIngredients.push(recIng);
      }
    });

    // Count how many expiring items from fridge this recipe can consume
    expiringFridgeItems.forEach((expItem) => {
      const matches = recipe.ingredients.some((recIng) => isIngredientMatch(expItem.name, recIng.name));
      if (matches) {
        usesExpiringCount += 1;
      }
    });

    const totalRequired = recipe.ingredients.filter((i) => !i.optional).length;
    const matchScore = totalRequired > 0 
      ? Math.round((availableIngredients.length / totalRequired) * 100) 
      : 100;

    return {
      recipe,
      matchScore: Math.min(100, Math.max(0, matchScore)),
      availableIngredients,
      missingIngredients,
      usesExpiringCount,
    };
  });
}
