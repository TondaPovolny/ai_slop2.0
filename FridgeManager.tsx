import React, { useState } from 'react';
import { 
  FridgeIngredient, 
  IngredientCategory 
} from '../types/recipe';
import { 
  CATEGORY_LABELS, 
  POPULAR_INGREDIENTS, 
  INITIAL_FRIDGE 
} from '../data/defaultIngredients';
import { 
  Plus, 
  Trash2, 
  AlertCircle, 
  RotateCcw, 
  Search, 
  Check, 
  Clock,
  Sparkles
} from 'lucide-react';

interface FridgeManagerProps {
  ingredients: FridgeIngredient[];
  onAddIngredient: (item: Omit<FridgeIngredient, 'id'>) => void;
  onRemoveIngredient: (id: string) => void;
  onToggleExpiresSoon: (id: string) => void;
  onResetToDefault: () => void;
  onClearFridge: () => void;
  onFindRecipes: () => void;
}

export const FridgeManager: React.FC<FridgeManagerProps> = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onToggleExpiresSoon,
  onResetToDefault,
  onClearFridge,
  onFindRecipes,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<IngredientCategory>('zelenina_ovoce');
  const [expiresSoon, setExpiresSoon] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddIngredient({
      name: name.trim(),
      amount: amount.trim() || undefined,
      category,
      expiresSoon,
    });

    setName('');
    setAmount('');
    setExpiresSoon(false);
  };

  const handleQuickAdd = (popularItem: { name: string; category: IngredientCategory }) => {
    // If not already in fridge, add it
    const exists = ingredients.some(
      (item) => item.name.toLowerCase() === popularItem.name.toLowerCase()
    );
    if (!exists) {
      onAddIngredient({
        name: popularItem.name,
        category: popularItem.category,
        expiresSoon: false,
      });
    }
  };

  const filteredItems = ingredients.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const expiringCount = ingredients.filter((i) => i.expiresSoon).length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary */}
      <div className="bg-stone-100 dark:bg-stone-800/80 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Virtuální lednice a spíž
          </h2>
          <div className="mt-1 flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
            <span>Celkem surovin: <strong className="text-stone-900 dark:text-stone-100">{ingredients.length}</strong></span>
            <span aria-hidden="true">·</span>
            <span>
              K rychlé spotřebě:{' '}
              <strong className={expiringCount > 0 ? 'text-amber-700 dark:text-amber-400 font-semibold' : 'text-stone-700 dark:text-stone-300'}>
                {expiringCount}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onFindRecipes}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Zobrazit nabídku jídel</span>
          </button>
          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 transition-colors cursor-pointer"
            title="Naplnit lednici vzorovými surovinami"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Vzorová lednice</span>
          </button>
          {ingredients.length > 0 && (
            <button
              onClick={onClearFridge}
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Smazat všechny položky"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vyprázdnit</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form to Add + Quick Add items */}
        <div className="lg:col-span-1 space-y-6">
          {/* Add custom form */}
          <div className="bg-white dark:bg-stone-850 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <h3 className="font-semibold text-base text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Přidat novou surovinu
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Název suroviny *
                </label>
                <input
                  type="text"
                  required
                  placeholder="např. Šunka, Mozzarella, Rýže..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Množství (volitelné)
                  </label>
                  <input
                    type="text"
                    placeholder="např. 250 g, 3 ks"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Kategorie
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IngredientCategory)}
                    className="w-full px-2.5 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.icon} {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={expiresSoon}
                  onChange={(e) => setExpiresSoon(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-xs text-stone-700 dark:text-stone-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Označit jako „Spotřebovat brzy“ (expiruje)
                </span>
              </label>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
              >
                Vložit do lednice
              </button>
            </form>
          </div>

          {/* Quick-add popular suggestions */}
          <div className="bg-white dark:bg-stone-850 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3">
              Rychlé přidání běžných surovin
            </h3>
            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1">
              {POPULAR_INGREDIENTS.map((item) => {
                const alreadyAdded = ingredients.some(
                  (i) => i.name.toLowerCase() === item.name.toLowerCase()
                );
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    disabled={alreadyAdded}
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      alreadyAdded
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 cursor-not-allowed opacity-60'
                        : 'bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300'
                    }`}
                  >
                    {alreadyAdded ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Plus className="w-3 h-3 text-stone-400" />
                    )}
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Fridge Inventory List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="bg-white dark:bg-stone-850 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Hledat v surovinách..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                Vše ({ingredients.length})
              </button>

              {Object.entries(CATEGORY_LABELS).map(([key, val]) => {
                const count = ingredients.filter((i) => i.category === key).length;
                return (
                  <button
                    key={key}
                    onClick={() => setFilterCategory(key)}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                      filterCategory === key
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    <span>{val.icon}</span>
                    <span>{val.label}</span>
                    <span className="opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Items Grid / List */}
          {filteredItems.length === 0 ? (
            <div className="bg-white dark:bg-stone-850 rounded-2xl p-10 border border-stone-200 dark:border-stone-800 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {ingredients.length === 0 ? 'Vaše lednice je prázdná' : 'Žádná surovina neodpovídá filtru'}
              </h4>
              <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-sm mx-auto">
                {ingredients.length === 0
                  ? 'Přidejte suroviny, které máte doma, nebo klikněte na „Vzorová lednice“ a vyzkoušejte aplikaci ihned.'
                  : 'Zkuste změnit hledaný výraz nebo přepněte filtr kategorií.'}
              </p>
              {ingredients.length === 0 && (
                <button
                  onClick={onResetToDefault}
                  className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                >
                  Načíst vzorové suroviny
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredItems.map((item) => {
                const catInfo = CATEGORY_LABELS[item.category] || CATEGORY_LABELS.ostatni;

                return (
                  <div
                    key={item.id}
                    className={`group bg-white dark:bg-stone-850 rounded-xl p-3.5 border transition-all flex items-center justify-between gap-3 ${
                      item.expiresSoon
                        ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/20 dark:bg-amber-950/10'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="min-w-0 flex items-center gap-3">
                      <span className="text-xl shrink-0" aria-hidden="true">
                        {catInfo.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                          {item.amount && <span>{item.amount}</span>}
                          {item.amount && <span aria-hidden="true">·</span>}
                          <span>{catInfo.label}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onToggleExpiresSoon(item.id)}
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          item.expiresSoon
                            ? 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60'
                            : 'text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title={
                          item.expiresSoon
                            ? 'Označeno k brzké spotřebě (kliknutím zrušíte)'
                            : 'Označit k brzké spotřebě (expiruje)'
                        }
                      >
                        <Clock className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onRemoveIngredient(item.id)}
                        className="p-1.5 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Odebrat z lednice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
