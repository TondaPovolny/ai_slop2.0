import React from 'react';
import { 
  Refrigerator, 
  UtensilsCrossed, 
  Heart, 
  CalendarDays, 
  ShoppingCart, 
  Sun, 
  Moon, 
  Sparkles 
} from 'lucide-react';

export type ActiveTab = 'recipes' | 'fridge' | 'favorites' | 'planner' | 'shopping';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  fridgeCount: number;
  expiringCount: number;
  favoritesCount: number;
  shoppingCount: number;
  onOpenAiChef: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleDarkMode,
  fridgeCount,
  expiringCount,
  favoritesCount,
  shoppingCount,
  onOpenAiChef,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-sm">
              <Refrigerator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 tracking-tight">
                  Recepty z Lednice
                </span>
                <span className="hidden md:inline-block text-xs uppercase font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Chytrá kuchyně
                </span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 hidden sm:block">
                Vařte skvěle ze surovin, které máte zrovna doma
              </p>
            </div>
          </div>

          {/* Right Action buttons: AI Generator & Dark Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenAiChef}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 cursor-pointer"
              title="Vytvořit originální recept na míru"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">AI Šéfkuchař</span>
              <span className="sm:hidden">Generovat</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-500 cursor-pointer"
              aria-label={isDark ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
              title={isDark ? 'Světlý režim' : 'Tmavý režim'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'recipes'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Nabídka receptů</span>
          </button>

          <button
            onClick={() => setActiveTab('fridge')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'fridge'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Refrigerator className="w-4 h-4" />
            <span>Moje lednice</span>
            <span className={`text-xs px-1.5 py-0.2 rounded-full font-semibold ${
              activeTab === 'fridge' 
                ? 'bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-800' 
                : 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
            }`}>
              {fridgeCount}
            </span>
            {expiringCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title={`${expiringCount} surovin brzy expiruje`} />
            )}
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Oblíbené recepty</span>
            {favoritesCount > 0 && (
              <span className={`text-xs px-1.5 py-0.2 rounded-full font-semibold ${
                activeTab === 'favorites'
                  ? 'bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-800'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Plánovač jídel</span>
          </button>

          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'shopping'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Nákupní seznam</span>
            {shoppingCount > 0 && (
              <span className={`text-xs px-1.5 py-0.2 rounded-full font-semibold ${
                activeTab === 'shopping'
                  ? 'bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-800'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}>
                {shoppingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
