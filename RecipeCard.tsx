import React from 'react';
import { RecipeMatchResult } from '../types/recipe';
import { 
  Heart, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle
} from 'lucide-react';

interface RecipeCardProps {
  matchResult: RecipeMatchResult;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onOpenDetails: (recipe: RecipeMatchResult['recipe']) => void;
  onAddToPlanner: (recipe: RecipeMatchResult['recipe']) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  matchResult,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onAddToPlanner,
}) => {
  const { recipe, matchScore, missingIngredients, usesExpiringCount } = matchResult;

  const isFullMatch = matchScore === 100;
  const missingCount = missingIngredients.length;

  return (
    <div className="group bg-white dark:bg-stone-850 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Image header with interactive buttons */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20" />

          {/* Top action buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:text-rose-500'
              }`}
              title={isFavorite ? 'Odebrat z oblíbených' : 'Uložit do oblíbených'}
              aria-label="Oblíbený recept"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Match Status Strip on Image Bottom */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1.5 font-medium drop-shadow-sm">
              {isFullMatch ? (
                <span className="flex items-center gap-1 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  100% surovin v lednici
                </span>
              ) : missingCount === 1 ? (
                <span className="flex items-center gap-1 text-amber-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Chybí jen 1 surovina
                </span>
              ) : (
                <span className="flex items-center gap-1 text-stone-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {matchScore}% shoda (chybí {missingCount})
                </span>
              )}
            </div>

            {usesExpiringCount > 0 && (
              <span className="flex items-center gap-1 text-amber-300 font-medium drop-shadow-sm" title={`Využije ${usesExpiringCount} suroviny s blížící se expirací`}>
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Zachrání {usesExpiringCount}</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Metadata Row (Clean unboxed typographic discipline) */}
          <div className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
            <span>{recipe.prepTime} min</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.calories} kcal</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.portions} porce</span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 
              onClick={() => onOpenDetails(recipe)}
              className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
            >
              {recipe.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          {/* Missing items preview if any */}
          {missingCount > 0 && (
            <div className="pt-1 text-xs text-stone-700 dark:text-stone-300">
              <span className="font-semibold text-stone-900 dark:text-stone-200">Chybí: </span>
              <span className="text-amber-800 dark:text-amber-300">
                {missingIngredients.slice(0, 3).map((m) => m.name).join(', ')}
                {missingCount > 3 ? ` a další ${missingCount - 3}` : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 dark:border-stone-800/60 mt-2 flex items-center justify-between gap-2">
        <button
          onClick={() => onAddToPlanner(recipe)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          title="Naplánovat do týdenního jídelníčku"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Naplánovat</span>
        </button>

        <button
          onClick={() => onOpenDetails(recipe)}
          className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 transition-colors cursor-pointer"
        >
          <span>Recept</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
