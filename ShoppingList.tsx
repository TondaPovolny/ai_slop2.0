import React, { useState } from 'react';
import { ShoppingItem, FridgeIngredient } from '../types/recipe';
import { 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Check, 
  ArrowRight, 
  Refrigerator,
  CheckCircle2
} from 'lucide-react';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (name: string, amount?: string) => void;
  onRemoveItem: (id: string) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
  onMoveCompletedToFridge: (completedItems: ShoppingItem[]) => void;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onClearCompleted,
  onClearAll,
  onMoveCompletedToFridge,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [transferredSuccess, setTransferredSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddItem(name.trim(), amount.trim() || undefined);
    setName('');
    setAmount('');
  };

  const completedItems = items.filter((i) => i.checked);
  const pendingItems = items.filter((i) => !i.checked);

  const handleMoveToFridge = () => {
    if (completedItems.length === 0) return;
    onMoveCompletedToFridge(completedItems);
    setTransferredSuccess(true);
    setTimeout(() => setTransferredSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-stone-100 dark:bg-stone-800/80 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Nákupní seznam
            </h2>
            <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
              {pendingItems.length}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            Suroviny, které chybí k uvaření vybraných receptů a plánu jídel
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {completedItems.length > 0 && (
            <button
              onClick={handleMoveToFridge}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                transferredSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-95'
              }`}
              title="Vložit nakoupené položky rovnou do virtuální lednice"
            >
              {transferredSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Přesunuto do lednice!</span>
                </>
              ) : (
                <>
                  <Refrigerator className="w-4 h-4" />
                  <span>Přesunout nakoupené ({completedItems.length}) do lednice</span>
                </>
              )}
            </button>
          )}

          {completedItems.length > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Smazat hotové
            </button>
          )}

          {items.length > 0 && (
            <button
              onClick={onClearAll}
              className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
              title="Smazat celý seznam"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Add item form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-stone-850 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <h3 className="font-semibold text-base text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Přidat položku na nákup
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Co potřebujete koupit? *
                </label>
                <input
                  type="text"
                  required
                  placeholder="např. Olivový olej, Cibule..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Množství (volitelné)
                </label>
                <input
                  type="text"
                  placeholder="např. 1 ks, 500 g"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
              >
                Přidat na nákup
              </button>
            </form>
          </div>
        </div>

        {/* Right 2 columns: Shopping list items */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <div className="bg-white dark:bg-stone-850 rounded-2xl p-10 border border-stone-200 dark:border-stone-800 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Nákupní seznam je prázdný
              </h4>
              <p className="text-sm text-stone-700 dark:text-stone-300 max-w-sm mx-auto">
                Při prohlížení receptů můžete chybějící suroviny přidat jedním kliknutím, nebo použijte týdenní plánovač pro hromadný nákup.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Items to buy */}
              <div className="bg-white dark:bg-stone-850 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 px-1 mb-2">
                  K nákupu ({pendingItems.length})
                </h4>

                {pendingItems.length === 0 ? (
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 py-2 px-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Všechno máte nakoupeno! Můžete položky přesunout do lednice.
                  </p>
                ) : (
                  pendingItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 flex items-center justify-between gap-3 group transition-colors"
                    >
                      <label className="flex items-center gap-3 min-w-0 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => onToggleItem(item.id)}
                          className="w-4 h-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </span>
                      </label>

                      <div className="flex items-center gap-3 shrink-0">
                        {item.amount && (
                          <span className="text-xs text-stone-700 dark:text-stone-300 font-semibold">
                            {item.amount}
                          </span>
                        )}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 rounded text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Already bought (Checked) */}
              {completedItems.length > 0 && (
                <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-4 border border-stone-200/60 dark:border-stone-800/60 space-y-2 opacity-85">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 px-1 mb-2">
                    Již nakoupeno ({completedItems.length})
                  </h4>

                  {completedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 bg-white/60 dark:bg-stone-850/60 text-stone-500"
                    >
                      <label className="flex items-center gap-3 min-w-0 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => onToggleItem(item.id)}
                          className="w-4 h-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="text-sm line-through truncate text-stone-500 dark:text-stone-400">
                          {item.name}
                        </span>
                      </label>

                      <div className="flex items-center gap-3 shrink-0">
                        {item.amount && <span className="text-xs text-stone-400">{item.amount}</span>}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 rounded text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
