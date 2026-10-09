import React, { useState, useEffect } from 'react';
import { Recipe, RecipeIngredient, ShoppingItem } from '../types/recipe';
import { 
  X, 
  Heart, 
  Clock, 
  Flame, 
  Check, 
  Plus, 
  ShoppingCart, 
  CalendarDays, 
  Play, 
  Pause, 
  RotateCcw, 
  Star, 
  Lightbulb, 
  Users 
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  availableIngredients: string[];
  missingIngredients: RecipeIngredient[];
  onAddMissingToShoppingList: (items: RecipeIngredient[]) => void;
  onAddToPlanner: (recipe: Recipe) => void;
  onUpdateNotesAndRating?: (recipeId: string, notes: string, rating: number) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  availableIngredients,
  missingIngredients,
  onAddMissingToShoppingList,
  onAddToPlanner,
  onUpdateNotesAndRating,
}) => {
  if (!recipe) return null;

  const [portions, setPortions] = useState(recipe.portions || 2);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  // Cooking timer state
  const [timerSeconds, setTimerSeconds] = useState(recipe.prepTime * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Rating & notes
  const [rating, setRating] = useState<number>(recipe.rating || 0);
  const [notes, setNotes] = useState<string>(recipe.userNotes || '');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play a short pleasant alert beep using Web Audio API
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 659.25; // E5 note
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (e) {
        // audio context suppressed if not user initiated
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Portion multiplier
  const portionRatio = portions / (recipe.portions || 2);

  const formatScaledAmount = (ing: RecipeIngredient): string => {
    if (ing.numericValue && ing.unit) {
      const scaledVal = Math.round(ing.numericValue * portionRatio * 10) / 10;
      return `${scaledVal} ${ing.unit}`;
    }
    return ing.amount;
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleAddMissing = () => {
    onAddMissingToShoppingList(missingIngredients);
    setAddedToCartSuccess(true);
    setTimeout(() => setAddedToCartSuccess(false), 2500);
  };

  const handleSaveNotes = () => {
    if (onUpdateNotesAndRating) {
      onUpdateNotesAndRating(recipe.id, notes, rating);
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Hero Image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0 bg-stone-100 dark:bg-stone-800">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-black/30" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:text-rose-500'
              }`}
              title={isFavorite ? 'Odebrat z oblíbených' : 'Uložit do oblíbených'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Zavřít detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title on Hero */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 text-xs text-stone-300 mb-1">
              <span>{recipe.prepTime} min</span>
              <span aria-hidden="true">·</span>
              <span>{Math.round(recipe.calories * portionRatio)} kcal celkem</span>
              <span aria-hidden="true">·</span>
              <span>{recipe.difficulty}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-white drop-shadow-sm">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-7">
          {/* Description & Tags */}
          <div>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {recipe.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Portions & Nutrition row */}
          <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Portions scaler */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Porce:
              </span>
              <div className="flex items-center gap-1 bg-white dark:bg-stone-900 rounded-lg p-1 border border-stone-200 dark:border-stone-700">
                {[1, 2, 4, 6].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPortions(p)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      portions === p
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Nutriční hodnoty na 1 porci */}
            <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
              <div className="text-center">
                <span className="block font-bold text-stone-900 dark:text-stone-100">
                  {recipe.calories}
                </span>
                <span className="text-[11px] text-stone-500">kcal/porce</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <div className="text-center">
                <span className="block font-bold text-stone-900 dark:text-stone-100">
                  {recipe.macros.protein} g
                </span>
                <span className="text-[11px] text-stone-500">Bílkoviny</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <div className="text-center">
                <span className="block font-bold text-stone-900 dark:text-stone-100">
                  {recipe.macros.carbs} g
                </span>
                <span className="text-[11px] text-stone-500">Sacharidy</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <div className="text-center">
                <span className="block font-bold text-stone-900 dark:text-stone-100">
                  {recipe.macros.fat} g
                </span>
                <span className="text-[11px] text-stone-500">Tuky</span>
              </div>
            </div>
          </div>

          {/* Suroviny s porovnáním s lednicí */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Potřebné suroviny ({portions} {portions === 1 ? 'porce' : portions < 5 ? 'porce' : 'porcí'})
              </h3>
              {missingIngredients.length > 0 && (
                <button
                  onClick={handleAddMissing}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    addedToCartSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900'
                  }`}
                >
                  {addedToCartSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Přidáno do nákupního seznamu!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Koupit chybějící ({missingIngredients.length})</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recipe.ingredients.map((ing, i) => {
                const isHave = availableIngredients.some((avail) => 
                  avail.toLowerCase() === ing.name.toLowerCase() || 
                  ing.name.toLowerCase().includes(avail.toLowerCase())
                );

                return (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-sm ${
                      isHave
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-stone-900 dark:text-stone-100'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850/60 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isHave ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0" title="Chybí v lednici">
                          <Plus className="w-3 h-3" />
                        </div>
                      )}
                      <span className="font-medium truncate">{ing.name}</span>
                    </div>
                    <span className="text-xs text-stone-500 dark:text-stone-400 shrink-0 font-semibold">
                      {formatScaledAmount(ing)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kroky přípravy (Instructions) + Cooking Timer */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Postup přípravy krok za krokem
              </h3>

              {/* Cooking Timer Tool */}
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-xl px-3 py-1.5 border border-stone-200 dark:border-stone-700">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
                  {formatTimer(timerSeconds)}
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 rounded-md text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
                  title={isTimerRunning ? 'Pozastavit minutku' : 'Spustit minutku'}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(recipe.prepTime * 60);
                  }}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
                  title="Resetovat minutku"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <ol className="space-y-3">
              {recipe.instructions.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isDone
                        ? 'bg-stone-100/60 dark:bg-stone-850 border-stone-200 dark:border-stone-800 opacity-60 line-through text-stone-500 dark:text-stone-400'
                        : 'bg-white dark:bg-stone-850 border-stone-200 dark:border-stone-800 hover:border-emerald-400 dark:hover:border-emerald-600 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </span>
                    <span className="text-sm leading-relaxed">{step}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Chef Tip */}
          {recipe.chefTip && (
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Tip šéfkuchaře
                </h4>
                <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 mt-0.5 leading-relaxed">
                  {recipe.chefTip}
                </p>
              </div>
            </div>
          )}

          {/* Osobní hodnocení a poznámky (Personal Notes & Rating) */}
          <div className="bg-stone-50 dark:bg-stone-850 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Vaše hodnocení a poznámky
              </h4>
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      if (onUpdateNotesAndRating) onUpdateNotesAndRating(recipe.id, notes, star);
                    }}
                    className="p-1 cursor-pointer text-stone-300 hover:text-amber-400"
                    title={`${star} hvězdiček`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        rating >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-stone-300 dark:text-stone-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Napište si vlastní poznámku (např. 'Příště zkusit s čerstvým rozmarýnem', 'Dětem moc chutnalo')..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
              rows={2}
              className="w-full text-xs sm:text-sm p-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onAddToPlanner(recipe);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-200/50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Přidat do jídelníčku</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 transition-colors cursor-pointer"
          >
            Zavřít recept
          </button>
        </div>
      </div>
    </div>
  );
};
