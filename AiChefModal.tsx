import React, { useState } from 'react';
import { FridgeIngredient, Recipe } from '../types/recipe';
import { synthesizeCreativeRecipe } from '../utils/localSynthesis';
import { 
  Sparkles, 
  X, 
  Clock, 
  ChefHat, 
  Loader2, 
  Check, 
  Flame,
  CheckCircle2
} from 'lucide-react';

interface AiChefModalProps {
  isOpen: boolean;
  onClose: () => void;
  fridge: FridgeIngredient[];
  onRecipeGenerated: (recipe: Recipe) => void;
}

export const AiChefModal: React.FC<AiChefModalProps> = ({
  isOpen,
  onClose,
  fridge,
  onRecipeGenerated,
}) => {
  const [preferences, setPreferences] = useState('');
  const [mealType, setMealType] = useState<'any' | 'snidane' | 'obed_vece' | 'svacina'>('any');
  const [maxTime, setMaxTime] = useState<number>(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (fridge.length === 0) {
      setError('Nejdříve vložte alespoň 2 suroviny do své lednice.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const ingredientNames = fridge.map((f) => f.name);

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: ingredientNames,
          dietaryPreferences: preferences.trim() || undefined,
          mealType: mealType === 'any' ? undefined : mealType,
          maxTime,
        }),
      });

      const data = await response.json();

      if (data && data.success && data.recipe) {
        const genRecipe: Recipe = {
          ...data.recipe,
          id: `ai-${Date.now()}`,
          imageUrl:
            data.recipe.imageUrl ||
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
          isCustom: true,
        };
        onRecipeGenerated(genRecipe);
        onClose();
        return;
      }
      
      // If server returned fallback or couldn't reach Gemini
      const fallbackRecipe = synthesizeCreativeRecipe(fridge, preferences);
      onRecipeGenerated(fallbackRecipe);
      onClose();
    } catch (err) {
      console.warn('Fallback to local synthesis:', err);
      // Fallback seamlessly to local culinary engine
      const localRecipe = synthesizeCreativeRecipe(fridge, preferences);
      onRecipeGenerated(localRecipe);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div 
        className="bg-white dark:bg-stone-850 rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Chytrý AI Šéfkuchař
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                Vymyslí unikátní recept přesně z vašich surovin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fridge items recap */}
        <div className="bg-stone-50 dark:bg-stone-900/60 rounded-xl p-3 border border-stone-200/60 dark:border-stone-800/60">
          <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1.5">
            Suroviny k dispozici ({fridge.length}):
          </span>
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
            {fridge.slice(0, 15).map((item) => (
              <span
                key={item.id}
                className="text-xs px-2 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
              >
                {item.name}
              </span>
            ))}
            {fridge.length > 15 && (
              <span className="text-xs text-stone-400 self-center">
                +{fridge.length - 15} dalších
              </span>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Zvláštní přání či chuťová preference (volitelné)
            </label>
            <input
              type="text"
              placeholder="např. bez mléka, něco lehkého, hodně pikantní, krémové..."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Typ pokrmu
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="any">Cokoliv chutného</option>
                <option value="snidane">Snídaně</option>
                <option value="obed_vece">Oběd / Večeře</option>
                <option value="svacina">Rychlá svačina</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Maximální čas přípravy
              </label>
              <select
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={15}>Do 15 minut (bleskovka)</option>
                <option value={30}>Do 30 minut (standard)</option>
                <option value={45}>Do 45 minut (poctivé)</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs text-rose-500 font-medium">
            {error}
          </p>
        )}

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isLoading || fridge.length === 0}
            className="w-full py-3 px-4 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Šéfkuchař vymýšlí recept na míru...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Vygenerovat originální recept</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
