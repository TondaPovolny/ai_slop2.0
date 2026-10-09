/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  FridgeIngredient, 
  Recipe, 
  RecipeMatchResult, 
  ShoppingItem, 
  PlannedMeal, 
  DayOfWeek, 
  MealType, 
  RecipeIngredient 
} from './types/recipe';
import { INITIAL_FRIDGE } from './data/defaultIngredients';
import { RECIPES_DATABASE } from './data/recipesDatabase';
import { matchRecipesWithFridge } from './utils/recipeMatcher';
import { useDarkMode } from './hooks/useDarkMode';

import { Header, ActiveTab } from './components/Header';
import { FridgeManager } from './components/FridgeManager';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { FavoritesView } from './components/FavoritesView';
import { MealPlanner } from './components/MealPlanner';
import { ShoppingList } from './components/ShoppingList';
import { AiChefModal } from './components/AiChefModal';

import { 
  Sparkles, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Refrigerator,
  Utensils,
  Plus
} from 'lucide-react';

export default function App() {
  const { isDark, toggleDarkMode } = useDarkMode();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<ActiveTab>('recipes');

  // Fridge state persisted in localStorage
  const [fridge, setFridge] = useState<FridgeIngredient[]>(() => {
    const saved = localStorage.getItem('recepty-fridge');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_FRIDGE;
      }
    }
    return INITIAL_FRIDGE;
  });

  useEffect(() => {
    localStorage.setItem('recepty-fridge', JSON.stringify(fridge));
  }, [fridge]);

  // Recipes state (base DB + any custom AI recipes)
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const custom = localStorage.getItem('recepty-custom-recipes');
    if (custom) {
      try {
        const parsed = JSON.parse(custom);
        return [...parsed, ...RECIPES_DATABASE];
      } catch (e) {
        return RECIPES_DATABASE;
      }
    }
    return RECIPES_DATABASE;
  });

  // Favorite recipe IDs persisted
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('recepty-favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['r-carbonara', 'r-shakshuka'];
      }
    }
    return ['r-carbonara', 'r-shakshuka']; // sensible initial favorites
  });

  useEffect(() => {
    localStorage.setItem('recepty-favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Planned meals state persisted
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>(() => {
    const saved = localStorage.getItem('recepty-planner');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: 'p-1', day: 'Po', mealType: 'lunch', recipeId: 'r-carbonara', recipeTitle: 'Pravé krémové špagety Carbonara', servings: 2 },
      { id: 'p-2', day: 'Út', mealType: 'dinner', recipeId: 'r-shakshuka', recipeTitle: 'Orientální Shakshuka s vejci a rajčaty', servings: 2 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('recepty-planner', JSON.stringify(plannedMeals));
  }, [plannedMeals]);

  // Shopping list items persisted
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('recepty-shopping');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('recepty-shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Modals state
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAiChefOpen, setIsAiChefOpen] = useState(false);

  // Recipe Catalog Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'snidane' | 'obed_vece' | 'svacina'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'time' | 'calories'>('match');
  const [onlyFullMatch, setOnlyFullMatch] = useState(false);

  // Calculate dynamic match results for all recipes based on current fridge!
  const matchResults: RecipeMatchResult[] = useMemo(() => {
    return matchRecipesWithFridge(recipes, fridge);
  }, [recipes, fridge]);

  // Filtered & sorted recipe results
  const filteredRecipes = useMemo(() => {
    let result = [...matchResults];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.recipe.title.toLowerCase().includes(q) ||
          m.recipe.description.toLowerCase().includes(q) ||
          m.recipe.ingredients.some((i) => i.name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((m) => m.recipe.category === categoryFilter);
    }

    // Tag filter
    if (tagFilter !== 'all') {
      result = result.filter((m) => m.recipe.tags.includes(tagFilter));
    }

    // 100% match only toggle
    if (onlyFullMatch) {
      result = result.filter((m) => m.matchScore === 100);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'match') {
        // Priority to expiring ingredients, then score
        if (b.usesExpiringCount !== a.usesExpiringCount) {
          return b.usesExpiringCount - a.usesExpiringCount;
        }
        return b.matchScore - a.matchScore;
      }
      if (sortBy === 'time') {
        return a.recipe.prepTime - b.recipe.prepTime;
      }
      if (sortBy === 'calories') {
        return a.recipe.calories - b.recipe.calories;
      }
      return 0;
    });

    return result;
  }, [matchResults, searchQuery, categoryFilter, tagFilter, onlyFullMatch, sortBy]);

  // Statistics
  const fullMatchCount = useMemo(() => {
    return matchResults.filter((m) => m.matchScore === 100).length;
  }, [matchResults]);

  const almostMatchCount = useMemo(() => {
    return matchResults.filter((m) => m.matchScore >= 70 && m.matchScore < 100).length;
  }, [matchResults]);

  const expiringFridgeCount = useMemo(() => {
    return fridge.filter((i) => i.expiresSoon).length;
  }, [fridge]);

  // Favorite toggle handler
  const handleToggleFavorite = (recipeId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  // Add ingredient to fridge
  const handleAddFridgeItem = (item: Omit<FridgeIngredient, 'id'>) => {
    const newItem: FridgeIngredient = {
      ...item,
      id: `fridge-${Date.now()}`,
      addedAt: Date.now(),
    };
    setFridge((prev) => [newItem, ...prev]);
  };

  const handleRemoveFridgeItem = (id: string) => {
    setFridge((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleExpiresSoon = (id: string) => {
    setFridge((prev) =>
      prev.map((i) => (i.id === id ? { ...i, expiresSoon: !i.expiresSoon } : i))
    );
  };

  const handleResetFridgeToDefault = () => {
    setFridge(INITIAL_FRIDGE);
  };

  const handleClearFridge = () => {
    setFridge([]);
  };

  // Add missing ingredients to shopping list
  const handleAddMissingToShoppingList = (missing: RecipeIngredient[]) => {
    const newItems: ShoppingItem[] = missing.map((m) => ({
      id: `shop-${Date.now()}-${Math.random()}`,
      name: m.name,
      amount: m.amount,
      checked: false,
    }));

    setShoppingList((prev) => [...prev, ...newItems]);
  };

  // Move checked shopping items to fridge
  const handleMoveCompletedToFridge = (completed: ShoppingItem[]) => {
    const newFridgeItems: FridgeIngredient[] = completed.map((item) => ({
      id: `fridge-transfer-${Date.now()}-${Math.random()}`,
      name: item.name,
      amount: item.amount,
      category: 'ostatni',
      expiresSoon: false,
    }));

    setFridge((prev) => [...newFridgeItems, ...prev]);
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  };

  // Planner actions
  const handleAddPlannedMeal = (day: DayOfWeek, mealType: MealType, recipe: Recipe) => {
    const newMeal: PlannedMeal = {
      id: `plan-${Date.now()}`,
      day,
      mealType,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      servings: recipe.portions || 2,
    };
    setPlannedMeals((prev) => [...prev, newMeal]);
  };

  const handleRemovePlannedMeal = (mealId: string) => {
    setPlannedMeals((prev) => prev.filter((m) => m.id !== mealId));
  };

  // Update recipe personal notes & rating
  const handleUpdateNotesAndRating = (recipeId: string, notes: string, rating: number) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, userNotes: notes, rating } : r))
    );
  };

  // Custom AI recipe created
  const handleRecipeGenerated = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
    // Save custom recipes
    const customList = JSON.parse(localStorage.getItem('recepty-custom-recipes') || '[]');
    localStorage.setItem('recepty-custom-recipes', JSON.stringify([newRecipe, ...customList]));
    // Open the new recipe modal immediately
    setSelectedRecipe(newRecipe);
  };

  // Favorites list objects
  const favoriteRecipes = useMemo(() => {
    return recipes.filter((r) => favoriteIds.includes(r.id));
  }, [recipes, favoriteIds]);

  // Selected recipe match detail
  const currentSelectedMatch = useMemo(() => {
    if (!selectedRecipe) return null;
    return matchResults.find((m) => m.recipe.id === selectedRecipe.id) || null;
  }, [selectedRecipe, matchResults]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors selection:bg-emerald-500/20">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        fridgeCount={fridge.length}
        expiringCount={expiringFridgeCount}
        favoritesCount={favoriteIds.length}
        shoppingCount={shoppingList.filter((i) => !i.checked).length}
        onOpenAiChef={() => setIsAiChefOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: RECIPES OFFER (MAIN AUTOMATIC GENERATOR) */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            {/* Quick Hero Banner / Fridge Status Summary */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Chytré doporučení na základě {fridge.length} surovin v lednici
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl font-bold mt-1 tracking-tight text-white">
                  Co si dnes uvaříte?
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Podle surovin ve vaší lednici můžete ihned uvařit{' '}
                  <strong className="text-emerald-400 font-semibold">{fullMatchCount} jídel bez nutnosti nákupu</strong>
                  {almostMatchCount > 0 ? `, a k dalším ${almostMatchCount} pokrmům vám chybí jen 1 až 2 položky.` : '.'}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setOnlyFullMatch(!onlyFullMatch)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      onlyFullMatch
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-stone-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pouze 100% v lednici ({fullMatchCount})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('fridge')}
                    className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
                  >
                    <Refrigerator className="w-3.5 h-3.5" />
                    <span>Upravit obsah lednice</span>
                  </button>

                  <button
                    onClick={() => setIsAiChefOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Vymyslet recept na míru</span>
                  </button>
                </div>
              </div>

              {/* Decorative culinary background shape */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:flex items-center justify-center">
                <Utensils className="w-64 h-64 text-white" />
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white dark:bg-stone-850 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Hledat podle názvu jídla nebo ingredience (např. vejce, rýže, losos)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <SlidersHorizontal className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-700 dark:text-stone-300 hidden sm:inline">Řadit:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="match">Nejvyšší shoda surovin</option>
                    <option value="time">Nejrychlejší příprava</option>
                    <option value="calories">Nejméně kalorií</option>
                  </select>
                </div>
              </div>

              {/* Meal Category & Tags segmented controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                {/* Meal category buttons */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      categoryFilter === 'all'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    Všechna jídla
                  </button>
                  <button
                    onClick={() => setCategoryFilter('snidane')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      categoryFilter === 'snidane'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    Snídaně
                  </button>
                  <button
                    onClick={() => setCategoryFilter('obed_vece')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      categoryFilter === 'obed_vece'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    Obědy & Večeře
                  </button>
                  <button
                    onClick={() => setCategoryFilter('svacina')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      categoryFilter === 'svacina'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    Svačiny
                  </button>
                </div>

                {/* Dietary Tags */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
                  {['all', 'Vegetariánské', 'Rychlovka', 'Vysoký protein', 'Česká klasika'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setTagFilter(tag)}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        tagFilter === tag
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-semibold'
                          : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                      }`}
                    >
                      {tag === 'all' ? 'Všechny štítky' : tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="bg-white dark:bg-stone-850 rounded-2xl p-12 border border-stone-200 dark:border-stone-800 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Žádný recept neodpovídá zvoleným filtrům
                </h3>
                <p className="text-sm text-stone-700 dark:text-stone-300 max-w-sm mx-auto">
                  Zkuste zrušit filtr „Pouze 100% v lednici“ nebo upravte hledaný výraz.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setTagFilter('all');
                    setOnlyFullMatch(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 cursor-pointer"
                >
                  Resetovat filtry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((matchItem) => (
                  <RecipeCard
                    key={matchItem.recipe.id}
                    matchResult={matchItem}
                    isFavorite={favoriteIds.includes(matchItem.recipe.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDetails={(rec) => setSelectedRecipe(rec)}
                    onAddToPlanner={(rec) => {
                      handleAddPlannedMeal('Po', 'lunch', rec);
                      setActiveTab('planner');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: FRIDGE & PANTRY INVENTORY */}
        {activeTab === 'fridge' && (
          <FridgeManager
            ingredients={fridge}
            onAddIngredient={handleAddFridgeItem}
            onRemoveIngredient={handleRemoveFridgeItem}
            onToggleExpiresSoon={handleToggleExpiresSoon}
            onResetToDefault={handleResetFridgeToDefault}
            onClearFridge={handleClearFridge}
            onFindRecipes={() => setActiveTab('recipes')}
          />
        )}

        {/* VIEW 3: PERSONAL FAVORITES LIST */}
        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favoriteRecipes}
            matchResults={matchResults}
            onRemoveFavorite={handleToggleFavorite}
            onOpenDetails={(rec) => setSelectedRecipe(rec)}
            onAddToPlanner={(rec) => {
              handleAddPlannedMeal('Po', 'lunch', rec);
              setActiveTab('planner');
            }}
            onBrowseRecipes={() => setActiveTab('recipes')}
          />
        )}

        {/* VIEW 4: MEAL PLANNER */}
        {activeTab === 'planner' && (
          <MealPlanner
            plannedMeals={plannedMeals}
            recipes={recipes}
            fridge={fridge}
            onAddMeal={handleAddPlannedMeal}
            onRemoveMeal={handleRemovePlannedMeal}
            onGenerateShoppingList={(items) => {
              const newShoppingItems: ShoppingItem[] = items.map((it) => ({
                id: `shop-gen-${Date.now()}-${Math.random()}`,
                name: it.name,
                amount: it.amount,
                checked: false,
              }));
              setShoppingList((prev) => [...prev, ...newShoppingItems]);
            }}
            onOpenRecipe={(recipeId) => {
              const rec = recipes.find((r) => r.id === recipeId);
              if (rec) setSelectedRecipe(rec);
            }}
          />
        )}

        {/* VIEW 5: SHOPPING LIST */}
        {activeTab === 'shopping' && (
          <ShoppingList
            items={shoppingList}
            onToggleItem={(id) => {
              setShoppingList((prev) =>
                prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
              );
            }}
            onAddItem={(name, amount) => {
              setShoppingList((prev) => [
                ...prev,
                { id: `shop-man-${Date.now()}`, name, amount, checked: false },
              ]);
            }}
            onRemoveItem={(id) => {
              setShoppingList((prev) => prev.filter((it) => it.id !== id));
            }}
            onClearCompleted={() => {
              setShoppingList((prev) => prev.filter((it) => !it.checked));
            }}
            onClearAll={() => {
              setShoppingList([]);
            }}
            onMoveCompletedToFridge={handleMoveCompletedToFridge}
          />
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isFavorite={favoriteIds.includes(selectedRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
          availableIngredients={currentSelectedMatch ? currentSelectedMatch.availableIngredients : []}
          missingIngredients={currentSelectedMatch ? currentSelectedMatch.missingIngredients : []}
          onAddMissingToShoppingList={handleAddMissingToShoppingList}
          onAddToPlanner={(rec) => {
            handleAddPlannedMeal('Po', 'lunch', rec);
            setActiveTab('planner');
          }}
          onUpdateNotesAndRating={handleUpdateNotesAndRating}
        />
      )}

      {/* AI Chef Generator Modal */}
      <AiChefModal
        isOpen={isAiChefOpen}
        onClose={() => setIsAiChefOpen(false)}
        fridge={fridge}
        onRecipeGenerated={handleRecipeGenerated}
      />
    </div>
  );
}
