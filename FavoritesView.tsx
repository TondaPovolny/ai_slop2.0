import React, { useState } from 'react';
import { Recipe, RecipeMatchResult } from '../types/recipe';
import { Heart, Search, Star, Utensils, CalendarDays, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  favorites: Recipe[];
  matchResults: RecipeMatchResult[];
  onRemoveFavorite: (id: string) => void;
  onOpenDetails: (recipe: Recipe) => void;
  onAddToPlanner: (recipe: Recipe) => void;
  onBrowseRecipes: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  matchResults,
  onRemoveFavorite,
  onOpenDetails,
  onAddToPlanner,
  onBrowseRecipes,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = favorites.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (recipe.userNotes && recipe.userNotes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-100 dark:bg-stone-800/80 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Osobní seznam oblíbených
            </h2>
            <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center">
              {favorites.length}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            Vaše osvědčená jídla včetně osobních poznámek a hodnocení
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Hledat v oblíbených..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-stone-850 rounded-2xl p-12 border border-stone-200 dark:border-stone-800 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              Zatím žádné oblíbené recepty
            </h3>
            <p className="text-sm text-stone-700 dark:text-stone-300 max-w-md mx-auto">
              Při prohlížení receptů klikněte na ikonku srdíčka u pokrmů, které vám zachutnaly, a uložte si je do svého osobního kulinářského deníku.
            </p>
          </div>
          <button
            onClick={onBrowseRecipes}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Prohlížet nabídku jídel</span>
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-stone-850 rounded-2xl p-8 border border-stone-200 dark:border-stone-800 text-center">
          <p className="text-sm text-stone-700 dark:text-stone-300">
            Žádný oblíbený recept neodpovídá hledanému výrazu „{searchQuery}“.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((recipe) => {
            const matchInfo = matchResults.find((m) => m.recipe.id === recipe.id);
            const score = matchInfo ? matchInfo.matchScore : 0;

            return (
              <div
                key={recipe.id}
                className="bg-white dark:bg-stone-850 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-stone-100 dark:bg-stone-800">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                    {/* Unheart button */}
                    <button
                      onClick={() => onRemoveFavorite(recipe.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 transition-colors cursor-pointer"
                      title="Odebrat z oblíbených"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Fridge match indicator badge */}
                    <div className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                      {score === 100 ? (
                        <span className="text-emerald-300">🟢 100% surovin v lednici</span>
                      ) : (
                        <span className="text-stone-200">🟡 {score}% surovin k dispozici</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
                      <span>{recipe.prepTime} min · {recipe.calories} kcal</span>
                      {recipe.rating ? (
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold">{recipe.rating}/5</span>
                        </div>
                      ) : null}
                    </div>

                    <h3
                      onClick={() => onOpenDetails(recipe)}
                      className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {recipe.title}
                    </h3>

                    {/* Personal notes display if any */}
                    {recipe.userNotes && (
                      <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 italic line-clamp-2">
                        „{recipe.userNotes}“
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 mt-2">
                  <button
                    onClick={() => onAddToPlanner(recipe)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <CalendarDays className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Naplánovat</span>
                  </button>

                  <button
                    onClick={() => onOpenDetails(recipe)}
                    className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 transition-colors cursor-pointer"
                  >
                    <span>Vařit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
