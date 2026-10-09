import React, { useState } from 'react';
import { 
  DayOfWeek, 
  MealType, 
  PlannedMeal, 
  Recipe, 
  FridgeIngredient 
} from '../types/recipe';
import { 
  CalendarDays, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  UtensilsCrossed, 
  Check, 
  X,
  Coffee,
  SunMedium,
  Moon
} from 'lucide-react';

interface MealPlannerProps {
  plannedMeals: PlannedMeal[];
  recipes: Recipe[];
  fridge: FridgeIngredient[];
  onAddMeal: (day: DayOfWeek, mealType: MealType, recipe: Recipe) => void;
  onRemoveMeal: (mealId: string) => void;
  onGenerateShoppingList: (neededIngredients: { name: string; amount?: string }[]) => void;
  onOpenRecipe: (recipeId: string) => void;
}

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: 'Po', label: 'Pondělí' },
  { key: 'Út', label: 'Úterý' },
  { key: 'St', label: 'Středa' },
  { key: 'Čt', label: 'Čtvrtek' },
  { key: 'Pá', label: 'Pátek' },
  { key: 'So', label: 'Sobota' },
  { key: 'Ne', label: 'Neděle' },
];

const MEAL_TYPES: { key: MealType; label: string; icon: React.ReactNode }[] = [
  { key: 'breakfast', label: 'Snídaně', icon: <Coffee className="w-4 h-4 text-amber-500" /> },
  { key: 'lunch', label: 'Oběd', icon: <SunMedium className="w-4 h-4 text-emerald-500" /> },
  { key: 'dinner', label: 'Večeře', icon: <Moon className="w-4 h-4 text-indigo-500" /> },
];

export const MealPlanner: React.FC<MealPlannerProps> = ({
  plannedMeals,
  recipes,
  fridge,
  onAddMeal,
  onRemoveMeal,
  onGenerateShoppingList,
  onOpenRecipe,
}) => {
  const [activeSlot, setActiveSlot] = useState<{ day: DayOfWeek; mealType: MealType } | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  const handleSelectRecipe = (recipe: Recipe) => {
    if (activeSlot) {
      onAddMeal(activeSlot.day, activeSlot.mealType, recipe);
      setActiveSlot(null);
      setFilterQuery('');
    }
  };

  const handleGenerateFullShoppingList = () => {
    // Gather all ingredients from planned meals
    const neededItems: { name: string; amount?: string }[] = [];

    plannedMeals.forEach((meal) => {
      const rec = recipes.find((r) => r.id === meal.recipeId);
      if (rec) {
        rec.ingredients.forEach((ing) => {
          // Check if already in fridge
          const inFridge = fridge.some((f) => 
            f.name.toLowerCase().includes(ing.name.toLowerCase()) ||
            ing.name.toLowerCase().includes(f.name.toLowerCase())
          );
          if (!inFridge) {
            neededItems.push({ name: ing.name, amount: ing.amount });
          }
        });
      }
    });

    onGenerateShoppingList(neededItems);
    setGeneratedSuccess(true);
    setTimeout(() => setGeneratedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-stone-100 dark:bg-stone-800/80 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Týdenní plánovač receptů
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            Naplánujte si vaření na celý týden a nechte aplikaci spočítat nákupní seznam
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleGenerateFullShoppingList}
            disabled={plannedMeals.length === 0}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              plannedMeals.length === 0
                ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
                : generatedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-95'
            }`}
          >
            {generatedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Nákupní seznam vytvořen!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Doplnit chybějící do nákupu ({plannedMeals.length} jídel)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {DAYS.map(({ key, label }) => {
          const dayMeals = plannedMeals.filter((m) => m.day === key);

          return (
            <div
              key={key}
              className="bg-white dark:bg-stone-850 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <div className="pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                    {label}
                  </h3>
                  <span className="text-xs text-stone-700 dark:text-stone-300 font-bold">
                    {dayMeals.length}
                  </span>
                </div>

                <div className="space-y-3 mt-3">
                  {MEAL_TYPES.map(({ key: mType, label: mLabel, icon: mIcon }) => {
                    const meal = dayMeals.find((m) => m.mealType === mType);

                    return (
                      <div
                        key={mType}
                        className="rounded-xl p-2.5 border border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50"
                      >
                        <div className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300 mb-1.5">
                          <span className="flex items-center gap-1 font-medium">
                            {mIcon}
                            {mLabel}
                          </span>
                        </div>

                        {meal ? (
                          <div className="group flex items-center justify-between gap-1.5 bg-white dark:bg-stone-800 p-2 rounded-lg border border-stone-200/80 dark:border-stone-700/80">
                            <span
                              onClick={() => onOpenRecipe(meal.recipeId)}
                              className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer truncate"
                            >
                              {meal.recipeTitle}
                            </span>
                            <button
                              onClick={() => onRemoveMeal(meal.id)}
                              className="text-stone-400 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer shrink-0"
                              title="Odebrat z plánu"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setActiveSlot({ day: key, mealType: mType })}
                            className="w-full py-1.5 px-2 rounded-lg border border-dashed border-stone-200 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Přidat</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for selecting recipe to assign to slot */}
      {activeSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-stone-850 rounded-2xl p-6 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Vyberte recept na {DAYS.find((d) => d.key === activeSlot.day)?.label} –{' '}
                  {MEAL_TYPES.find((m) => m.key === activeSlot.mealType)?.label}
                </h3>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  Vyberte z nabídky jídel k přiřazení
                </p>
              </div>
              <button
                onClick={() => setActiveSlot(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3">
              <input
                type="text"
                placeholder="Hledat recept..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {recipes
                .filter((r) => r.title.toLowerCase().includes(filterQuery.toLowerCase()))
                .map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleSelectRecipe(r)}
                    className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={r.imageUrl}
                        alt={r.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {r.title}
                        </h4>
                        <div className="text-xs text-stone-700 dark:text-stone-300">
                          {r.prepTime} min · {r.calories} kcal
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 shrink-0">
                      Zvolit
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
