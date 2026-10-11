/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { INGREDIENT_CATEGORIES, COMMON_INGREDIENTS, FRIDGE_PRESETS } from './data/ingredients.js';
import { RECIPES_DATA } from './data/recipes.js';
import { Storage } from './storage.js';

// --- STAV APLIKACE ---
const state = {
  activeTab: 'fridge', // 'fridge' | 'recipes' | 'shopping' | 'zerowaste'
  fridgeItems: Storage.getFridgeItems(),
  shoppingItems: Storage.getShoppingItems(),
  favorites: Storage.getFavorites(),
  customRecipes: Storage.getCustomRecipes(),
  
  // Filtry receptů
  recipeFilter: 'all', // 'all' | 'ready' | 'almost' | 'favorites' | tag
  recipeSort: 'match', // 'match' | 'time' | 'missing' | 'name'
  recipeSearch: '',
  selectedRecipe: null,
  recipeServings: 4,
  
  // Lednice filtry a vyhledávání
  fridgeCategory: 'all',
  fridgeSearch: '',
  
  // Časovač
  timerSeconds: 0,
  timerInterval: null,
  timerRunning: false,
  timerOriginalSeconds: 0
};

// --- POMOCNÉ FUNKCE (NORMALIZACE & TEXT) ---
function removeDiacritics(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function matchIngredientName(recipeIngName, recipeIngId, fridgeItems) {
  const normRecipeName = removeDiacritics(recipeIngName);
  const normRecipeId = removeDiacritics(recipeIngId || '');

  return fridgeItems.find(item => {
    if (recipeIngId && item.id === recipeIngId) return true;
    const normItemName = removeDiacritics(item.name);
    const normItemId = removeDiacritics(item.id || '');

    if (normItemId && normRecipeId && normItemId === normRecipeId) return true;
    if (normItemName === normRecipeName) return true;
    if (normItemName.includes(normRecipeName) || normRecipeName.includes(normItemName)) return true;
    return false;
  });
}

// Výpočet shody receptu se surovinami v lednici
function calculateRecipeMatch(recipe, fridgeItems) {
  const ingredients = recipe.ingredients || [];
  let matchedCount = 0;
  let totalKeyIngredients = 0;
  const missing = [];
  const available = [];
  let usesUrgentItem = false;

  ingredients.forEach(ing => {
    // Sůl, pepř a základní koření se mohou brát jako běžná spíž, ale započítávají se korektně
    const isStaple = ing.staple === true;
    if (!isStaple) {
      totalKeyIngredients++;
    } else {
      // i dochucovadla započteme do celku, ale s menší penalizací pokud chybí
      totalKeyIngredients += 0.3;
    }

    const matchedFridgeItem = matchIngredientName(ing.name, ing.id, fridgeItems);

    if (matchedFridgeItem) {
      matchedCount += isStaple ? 0.3 : 1;
      available.push({ ...ing, fridgeItem: matchedFridgeItem });
      if (matchedFridgeItem.urgent) {
        usesUrgentItem = true;
      }
    } else {
      missing.push(ing);
    }
  });

  const total = Math.max(1, totalKeyIngredients);
  const percentage = Math.min(100, Math.round((matchedCount / total) * 100));

  // Klasifikace stavu
  let status = 'missing_more';
  const missingNonStaples = missing.filter(m => !m.staple);

  if (missingNonStaples.length === 0) {
    status = 'ready'; // 100% doma!
  } else if (missingNonStaples.length <= 2) {
    status = 'almost'; // Chybí jen 1-2 suroviny
  }

  return {
    percentage,
    status,
    missing,
    available,
    missingCount: missingNonStaples.length,
    usesUrgentItem
  };
}

// Audio upozornění minutky přes Web Audio API
function playTimerAlertSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const playTone = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    // Příjemný trojtón
    playTone(587.33, 0.0, 0.2); // D5
    playTone(739.99, 0.25, 0.2); // F#5
    playTone(880.00, 0.5, 0.4); // A5
  } catch (e) {
    console.log('Audio nepodporováno nebo zablokováno:', e);
  }
}

// Toast notifikace
function showToast(message, icon = '✅') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast animate-slide-up';
  toast.innerHTML = `<span class="text-xl">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// --- RENDEROVACÍ FUNKCE ---

// 1. Zobrazení statistik v horním panelu
function renderTopStats() {
  const readyRecipesCount = RECIPES_DATA.filter(r => {
    const match = calculateRecipeMatch(r, state.fridgeItems);
    return match.status === 'ready';
  }).length;

  const urgentCount = state.fridgeItems.filter(i => i.urgent).length;
  const shoppingCount = state.shoppingItems.filter(i => !i.checked).length;

  const statFridge = document.getElementById('stat-fridge-count');
  const statReady = document.getElementById('stat-ready-count');
  const statShopping = document.getElementById('stat-shopping-count');
  const statUrgentBadge = document.getElementById('urgent-warning-banner');

  if (statFridge) statFridge.textContent = `${state.fridgeItems.length} surovin`;
  if (statReady) statReady.textContent = `${readyRecipesCount} ${readyRecipesCount === 1 ? 'jídlo' : readyRecipesCount >= 2 && readyRecipesCount <= 4 ? 'jídla' : 'jídel'}`;
  if (statShopping) statShopping.textContent = `${shoppingCount} položek`;

  if (statUrgentBadge) {
    if (urgentCount > 0) {
      statUrgentBadge.classList.remove('hidden');
      statUrgentBadge.innerHTML = `
        <div class="flex items-center justify-between gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-900 rounded-xl px-4 py-2.5 text-sm font-medium">
          <div class="flex items-center gap-2">
            <span class="text-lg">⏳</span>
            <span>Máte <strong>${urgentCount} ${urgentCount === 1 ? 'surovinu' : 'suroviny'}</strong> s označením „Spotřebovat brzy“! Doporučené recepty je upřednostňují, aby se nezkazily.</span>
          </div>
          <button id="btn-filter-urgent" class="text-xs bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700 transition cursor-pointer font-bold whitespace-nowrap">
            Ukázat recepty
          </button>
        </div>
      `;
      const btn = document.getElementById('btn-filter-urgent');
      if (btn) {
        btn.onclick = () => {
          switchTab('recipes');
          state.recipeSort = 'match';
          renderRecipes();
        };
      }
    } else {
      statUrgentBadge.classList.add('hidden');
    }
  }
}

// 2. Karta suroviny v lednici
function renderFridge() {
  const container = document.getElementById('fridge-grid');
  const activeChipsContainer = document.getElementById('fridge-active-chips');
  if (!container) return;

  // Filtrování
  let filtered = COMMON_INGREDIENTS;
  if (state.fridgeCategory !== 'all') {
    filtered = filtered.filter(i => i.category === state.fridgeCategory);
  }
  if (state.fridgeSearch) {
    const q = removeDiacritics(state.fridgeSearch);
    filtered = filtered.filter(i => removeDiacritics(i.name).includes(q));
  }

  // Rychlý seznam aktivních surovin nahoře
  if (activeChipsContainer) {
    if (state.fridgeItems.length === 0) {
      activeChipsContainer.innerHTML = `
        <div class="p-4 rounded-xl border border-dashed border-stone-300 text-stone-500 text-sm text-center">
          Vaše lednice je prázdná. Zvolte rychlý balíček níže nebo klikněte na suroviny, které máte doma!
        </div>
      `;
    } else {
      activeChipsContainer.innerHTML = state.fridgeItems.map(item => `
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
          item.urgent 
            ? 'bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-400' 
            : 'bg-emerald-50 text-emerald-950 border-emerald-200'
        }">
          <span>${item.name}</span>
          <span class="text-xs text-stone-500 font-normal">(${Math.round(item.qty || 1)} ${item.unit || 'ks'})</span>
          <button data-action="toggle-urgent" data-id="${item.id}" title="${item.urgent ? 'Odebrat prioritu expirace' : 'Označit ke spotřebování brzy'}" class="text-xs hover:scale-125 transition cursor-pointer">
            ${item.urgent ? '⏳' : '⌛'}
          </button>
          <button data-action="remove-fridge" data-id="${item.id}" title="Odebrat z lednice" class="text-stone-400 hover:text-rose-600 transition cursor-pointer text-xs font-bold ml-1">
            ✕
          </button>
        </div>
      `).join('');
    }
  }

  // Tlačítka katalogu surovin k zakliknutí
  container.innerHTML = filtered.map(ing => {
    const existing = state.fridgeItems.find(f => f.id === ing.id || removeDiacritics(f.name) === removeDiacritics(ing.name));
    const isInFridge = Boolean(existing);
    const isUrgent = existing ? existing.urgent : false;

    return `
      <div class="group relative flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
        isInFridge 
          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-950 shadow-sm' 
          : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
      }" data-id="${ing.id}">
        <div class="flex items-center gap-3 overflow-hidden" data-action="toggle-fridge" data-id="${ing.id}">
          <span class="text-2xl">${ing.icon}</span>
          <div class="truncate">
            <div class="font-semibold text-sm leading-tight truncate">${ing.name}</div>
            <div class="text-xs text-stone-500">${ing.commonQty} ${ing.defaultUnit}</div>
          </div>
        </div>

        <div class="flex items-center gap-1">
          ${isInFridge ? `
            <button data-action="toggle-urgent" data-id="${ing.id}" title="${isUrgent ? 'Zrušit označení Spotřebovat brzy' : 'Označit Spotřebovat brzy'}" class="p-1.5 rounded-lg text-xs hover:bg-emerald-200/50 transition cursor-pointer ${isUrgent ? 'text-amber-600 font-bold' : 'text-stone-400'}">
              ${isUrgent ? '⏳ Brzy' : '⌛'}
            </button>
            <button data-action="toggle-fridge" data-id="${ing.id}" class="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm cursor-pointer shadow-sm hover:bg-emerald-700 transition" title="Odebrat">
              ✓
            </button>
          ` : `
            <button data-action="toggle-fridge" data-id="${ing.id}" class="w-7 h-7 flex items-center justify-center rounded-lg border border-dashed border-stone-300 text-stone-400 group-hover:border-stone-400 group-hover:text-stone-600 text-sm font-semibold cursor-pointer transition" title="Přidat do lednice">
              +
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');

  renderTopStats();
}

// 3. Zobrazení receptů
function renderRecipes() {
  const container = document.getElementById('recipes-grid');
  const emptyState = document.getElementById('recipes-empty-state');
  if (!container) return;

  // Vyhodnocení všech receptů
  let matchedList = RECIPES_DATA.map(recipe => {
    const match = calculateRecipeMatch(recipe, state.fridgeItems);
    const isFav = state.favorites.includes(recipe.id);
    return {
      ...recipe,
      match,
      isFav
    };
  });

  // Filtrování
  if (state.recipeFilter === 'ready') {
    matchedList = matchedList.filter(r => r.match.status === 'ready');
  } else if (state.recipeFilter === 'almost') {
    matchedList = matchedList.filter(r => r.match.status === 'ready' || r.match.status === 'almost');
  } else if (state.recipeFilter === 'favorites') {
    matchedList = matchedList.filter(r => r.isFav);
  } else if (state.recipeFilter !== 'all') {
    // Filtrování podle tagu (např. 'Rychlovka do 20 min', 'Česká klasika', 'Vegetariánské')
    matchedList = matchedList.filter(r => r.tags && r.tags.includes(state.recipeFilter));
  }

  // Textové vyhledávání
  if (state.recipeSearch) {
    const q = removeDiacritics(state.recipeSearch);
    matchedList = matchedList.filter(r => 
      removeDiacritics(r.title).includes(q) || 
      removeDiacritics(r.description).includes(q) ||
      r.ingredients.some(i => removeDiacritics(i.name).includes(q))
    );
  }

  // Řazení
  if (state.recipeSort === 'match') {
    matchedList.sort((a, b) => {
      // Priorita pro recepty spotřebovávající položky před expirací
      if (a.match.usesUrgentItem && !b.match.usesUrgentItem) return -1;
      if (!a.match.usesUrgentItem && b.match.usesUrgentItem) return 1;
      return b.match.percentage - a.match.percentage || a.match.missingCount - b.match.missingCount;
    });
  } else if (state.recipeSort === 'time') {
    matchedList.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
  } else if (state.recipeSort === 'missing') {
    matchedList.sort((a, b) => a.match.missingCount - b.match.missingCount);
  } else if (state.recipeSort === 'name') {
    matchedList.sort((a, b) => a.title.localeCompare(b.title, 'cs'));
  }

  // Aktualizace počítadel na filter tabs
  const countAll = RECIPES_DATA.length;
  const countReady = RECIPES_DATA.filter(r => calculateRecipeMatch(r, state.fridgeItems).status === 'ready').length;
  const countAlmost = RECIPES_DATA.filter(r => ['ready', 'almost'].includes(calculateRecipeMatch(r, state.fridgeItems).status)).length;

  const badgeReady = document.getElementById('badge-filter-ready');
  const badgeAlmost = document.getElementById('badge-filter-almost');
  if (badgeReady) badgeReady.textContent = countReady;
  if (badgeAlmost) badgeAlmost.textContent = countAlmost;

  if (matchedList.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = matchedList.map(recipe => {
    const { match, isFav } = recipe;
    const totalTime = recipe.prepTime + recipe.cookTime;

    // Barevné odznaky shody
    let badgeHtml = '';
    if (match.status === 'ready') {
      badgeHtml = `
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
          <span>✓</span> Uvaříte hned (100 %)
        </span>
      `;
    } else if (match.status === 'almost') {
      badgeHtml = `
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
          <span>⚡</span> Chybí jen ${match.missingCount} ${match.missingCount === 1 ? 'surovina' : 'suroviny'}
        </span>
      `;
    } else {
      badgeHtml = `
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-200 text-stone-700">
          Shoda ${match.percentage} %
        </span>
      `;
    }

    return `
      <div class="card group flex flex-col justify-between bg-white rounded-2xl border border-stone-200 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer" data-recipe-id="${recipe.id}">
        <!-- Horní panel karty -->
        <div class="p-5">
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex flex-wrap gap-1.5 items-center">
              ${badgeHtml}
              ${match.usesUrgentItem ? `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                  ⏳ Zachrání zásoby
                </span>
              ` : ''}
            </div>
            <button data-action="toggle-fav" data-id="${recipe.id}" class="text-xl hover:scale-125 transition p-1 text-stone-300 hover:text-rose-500 ${isFav ? 'text-rose-500' : ''}" title="${isFav ? 'Odebrat z oblíbených' : 'Uložit do oblíbených'}">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>

          <h3 class="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition line-clamp-1 mb-1">
            ${recipe.title}
          </h3>
          <p class="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
            ${recipe.description}
          </p>

          <!-- Informace o čase, porcích a kaloriích -->
          <div class="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-600 mb-4">
            <div class="flex items-center gap-1.5 font-medium">
              <span>⏱️</span> <span>${totalTime} min</span>
            </div>
            <div class="flex items-center gap-1.5 font-medium">
              <span>🍽️</span> <span>${recipe.defaultServings} porce</span>
            </div>
            <div class="flex items-center gap-1.5 font-medium">
              <span>🔥</span> <span>${recipe.calories} kcal</span>
            </div>
          </div>

          <!-- Přehled surovin: co máme vs co chybí -->
          <div class="space-y-1.5 text-xs">
            <div class="flex items-center justify-between text-stone-500">
              <span>Suroviny doma:</span>
              <span class="font-bold text-emerald-700">${match.available.length} z ${recipe.ingredients.length}</span>
            </div>
            <div class="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: ${match.percentage}%"></div>
            </div>

            ${match.missing.length > 0 ? `
              <div class="pt-2 text-stone-600">
                <span class="text-rose-600 font-semibold">Chybí: </span>
                <span class="text-stone-500">${match.missing.slice(0, 3).map(m => m.name).join(', ')}${match.missing.length > 3 ? ` a další (${match.missing.length - 3})` : ''}</span>
              </div>
            ` : `
              <div class="pt-2 text-emerald-700 font-medium flex items-center gap-1">
                <span>✨</span> <span>Všechny suroviny máte v lednici!</span>
              </div>
            `}
          </div>
        </div>

        <!-- Spodní lišta karty -->
        <div class="p-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-2">
          <button data-action="open-recipe" data-id="${recipe.id}" class="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer">
            Zobrazit recept a postup <span>→</span>
          </button>
          ${match.missing.length > 0 ? `
            <button data-action="add-missing-shopping" data-id="${recipe.id}" class="px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer" title="Přidat chybějící do nákupního seznamu">
              <span>🛒</span> <span>+ Seznam (${match.missing.length})</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// 4. Zobrazení detailního modalu receptu
function openRecipeModal(recipeId) {
  const recipe = RECIPES_DATA.find(r => r.id === recipeId);
  if (!recipe) return;

  state.selectedRecipe = recipe;
  state.recipeServings = recipe.defaultServings || 4;

  const modal = document.getElementById('recipe-modal');
  if (!modal) return;

  renderRecipeModalContent();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeRecipeModal() {
  const modal = document.getElementById('recipe-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  state.selectedRecipe = null;
}

function renderRecipeModalContent() {
  const recipe = state.selectedRecipe;
  if (!recipe) return;

  const content = document.getElementById('recipe-modal-content');
  if (!content) return;

  const servingsRatio = state.recipeServings / (recipe.defaultServings || 4);
  const match = calculateRecipeMatch(recipe, state.fridgeItems);

  content.innerHTML = `
    <!-- Hlavička modalu -->
    <div class="flex items-start justify-between gap-4 p-6 border-b border-stone-200 bg-stone-50/50">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${
            match.status === 'ready' 
              ? 'bg-emerald-500 text-white' 
              : match.status === 'almost' 
                ? 'bg-amber-500 text-white' 
                : 'bg-stone-200 text-stone-700'
          }">
            ${match.status === 'ready' ? '✓ 100 % surovin doma' : match.status === 'almost' ? `⚡ Chybí ${match.missingCount} suroviny` : `Shoda ${match.percentage} %`}
          </span>
          <span class="text-xs text-stone-500 font-medium">• ${recipe.difficulty}</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
          ${recipe.title}
        </h2>
        <p class="text-stone-600 text-sm mt-1 max-w-2xl">
          ${recipe.description}
        </p>
      </div>

      <button id="btn-close-modal" class="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition cursor-pointer text-xl font-bold">
        ✕
      </button>
    </div>

    <div class="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
      <!-- Rychlé info a přepočet porcí -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3 bg-stone-100/70 rounded-xl text-center">
          <div class="text-xs text-stone-500">Příprava</div>
          <div class="font-bold text-stone-800 text-sm mt-0.5">⏱️ ${recipe.prepTime} min</div>
        </div>
        <div class="p-3 bg-stone-100/70 rounded-xl text-center">
          <div class="text-xs text-stone-500">Vaření</div>
          <div class="font-bold text-stone-800 text-sm mt-0.5">🍳 ${recipe.cookTime} min</div>
        </div>
        <div class="p-3 bg-stone-100/70 rounded-xl text-center">
          <div class="text-xs text-stone-500">Energie na porci</div>
          <div class="font-bold text-stone-800 text-sm mt-0.5">🔥 ${Math.round(recipe.calories)} kcal</div>
        </div>
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center flex flex-col items-center justify-center">
          <div class="text-xs text-emerald-800 font-medium">Přepočet porcí</div>
          <div class="flex items-center gap-2 mt-1">
            <button id="btn-servings-minus" class="w-6 h-6 rounded-md bg-white border border-emerald-300 text-emerald-900 font-bold hover:bg-emerald-100 transition cursor-pointer leading-none">-</button>
            <span class="font-bold text-emerald-950 text-sm">${state.recipeServings}</span>
            <button id="btn-servings-plus" class="w-6 h-6 rounded-md bg-white border border-emerald-300 text-emerald-900 font-bold hover:bg-emerald-100 transition cursor-pointer leading-none">+</button>
          </div>
        </div>
      </div>

      <!-- Kuchyňská minutka -->
      ${recipe.timerMinutes ? `
        <div class="bg-stone-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">⏳</span>
            <div>
              <div class="font-bold text-sm">Kuchyňská minutka receptu</div>
              <div class="text-xs text-stone-400">Doporučený čas vaření: ${recipe.timerMinutes} minut</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div id="recipe-timer-display" class="font-mono text-xl font-bold bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700 min-w-20 text-center">
              ${formatTime(state.timerRunning ? state.timerSeconds : recipe.timerMinutes * 60)}
            </div>
            <button id="btn-toggle-timer" data-default="${recipe.timerMinutes}" class="px-3 py-1.5 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer">
              ${state.timerRunning ? 'Pozastavit' : 'Spustit minutku'}
            </button>
            <button id="btn-reset-timer" data-default="${recipe.timerMinutes}" class="px-2 py-1.5 rounded-lg text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer">
              ↺
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Seznam ingrediencí -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>🥕 Potřebné suroviny</span>
            <span class="text-xs font-normal text-stone-500">(přepočteno pro ${state.recipeServings} porce)</span>
          </h3>
          ${match.missing.length > 0 ? `
            <button id="btn-modal-add-all-missing" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm">
              <span>🛒</span> <span>Přidat chybějící (${match.missing.length}) do nákupního seznamu</span>
            </button>
          ` : `
            <span class="text-xs text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-full">
              ✓ Všechno máte doma!
            </span>
          `}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${recipe.ingredients.map(ing => {
            const scaledAmount = ing.amount ? Math.max(1, Math.round(ing.amount * servingsRatio)) : '';
            const matchedFridge = matchIngredientName(ing.name, ing.id, state.fridgeItems);
            const hasIt = Boolean(matchedFridge);

            return `
              <div class="flex items-center justify-between p-2.5 rounded-xl border transition ${
                hasIt 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                  : 'bg-stone-50 border-stone-200 text-stone-800'
              }">
                <div class="flex items-center gap-2.5 truncate">
                  <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    hasIt ? 'bg-emerald-500 text-white' : 'bg-rose-100 text-rose-700'
                  }">
                    ${hasIt ? '✓' : '✕'}
                  </span>
                  <div class="truncate">
                    <span class="font-medium text-sm">${ing.name}</span>
                    ${ing.note ? `<span class="text-xs text-stone-500 italic block">(${ing.note})</span>` : ''}
                  </div>
                </div>

                <div class="flex items-center gap-2 text-right shrink-0">
                  <span class="font-semibold text-xs text-stone-700">
                    ${scaledAmount ? `${scaledAmount} ${ing.unit || ''}` : ing.unit || ''}
                  </span>
                  ${!hasIt ? `
                    <button data-action="add-single-shopping" data-name="${ing.name}" data-qty="${scaledAmount}" data-unit="${ing.unit || ''}" data-recipe="${recipe.title}" title="Přidat do nákupního seznamu" class="p-1 rounded bg-stone-200 hover:bg-emerald-600 hover:text-white text-stone-700 text-xs transition cursor-pointer">
                      + 🛒
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Postup přípravy krok za krokem -->
      <div>
        <h3 class="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
          <span>👩‍🍳 Postup přípravy</span>
          <span class="text-xs font-normal text-stone-500">(odškrtávejte hotové kroky během vaření)</span>
        </h3>

        <div class="space-y-3">
          ${recipe.instructions.map((step, idx) => `
            <label class="group flex items-start gap-3 p-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer transition select-none">
              <input type="checkbox" class="step-checkbox mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300 cursor-pointer">
              <div class="text-sm text-stone-800 leading-relaxed group-hover:text-stone-900">
                <span class="font-bold text-emerald-800 mr-1.5">${idx + 1}.</span>
                <span class="step-text">${step}</span>
              </div>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Tipy šéfkuchaře a náhrady -->
      ${recipe.tips ? `
        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
          <div class="font-bold text-sm flex items-center gap-2 mb-1">
            <span>💡</span> <span>Tipy šéfkuchaře na náhrady a zero-waste</span>
          </div>
          <p class="text-xs text-amber-800 leading-relaxed">
            ${recipe.tips}
          </p>
        </div>
      ` : ''}
    </div>

    <!-- Spodní lišta -->
    <div class="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
      <button id="btn-close-modal-bottom" class="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-200 transition cursor-pointer">
        Zavřít
      </button>

      <div class="flex items-center gap-2">
        <button id="btn-modal-fav" class="px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer flex items-center gap-1.5">
          ${state.favorites.includes(recipe.id) ? '❤️ Uloženo v oblíbených' : '🤍 Přidat do oblíbených'}
        </button>
      </div>
    </div>
  `;

  // Navázání event listenerů modalu
  const btnClose = document.getElementById('btn-close-modal');
  const btnCloseBottom = document.getElementById('btn-close-modal-bottom');
  if (btnClose) btnClose.onclick = closeRecipeModal;
  if (btnCloseBottom) btnCloseBottom.onclick = closeRecipeModal;

  const btnPlus = document.getElementById('btn-servings-plus');
  const btnMinus = document.getElementById('btn-servings-minus');
  if (btnPlus) {
    btnPlus.onclick = () => {
      state.recipeServings = Math.min(12, state.recipeServings + 1);
      renderRecipeModalContent();
    };
  }
  if (btnMinus) {
    btnMinus.onclick = () => {
      state.recipeServings = Math.max(1, state.recipeServings - 1);
      renderRecipeModalContent();
    };
  }

  // Tlačítko přidat všechny chybějící
  const btnAddAll = document.getElementById('btn-modal-add-all-missing');
  if (btnAddAll) {
    btnAddAll.onclick = () => {
      addMissingIngredientsToShopping(recipe);
      renderRecipeModalContent();
    };
  }

  // Tlačítko oblíbené
  const btnFav = document.getElementById('btn-modal-fav');
  if (btnFav) {
    btnFav.onclick = () => {
      toggleFavorite(recipe.id);
      renderRecipeModalContent();
      renderRecipes();
    };
  }

  // Přidání jednotlivé suroviny
  content.querySelectorAll('[data-action="add-single-shopping"]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const name = btn.getAttribute('data-name');
      const qty = parseFloat(btn.getAttribute('data-qty')) || 1;
      const unit = btn.getAttribute('data-unit') || '';
      const recipeTitle = btn.getAttribute('data-recipe') || '';
      addShoppingItem({ name, qty, unit, recipeTitle });
      showToast(`„${name}“ přidáno do nákupního seznamu!`, '🛒');
      renderShoppingList();
    };
  });

  // Kuchyňská minutka
  const btnToggleTimer = document.getElementById('btn-toggle-timer');
  const btnResetTimer = document.getElementById('btn-reset-timer');
  if (btnToggleTimer) {
    btnToggleTimer.onclick = () => {
      const defaultMins = parseInt(btnToggleTimer.getAttribute('data-default') || '10', 10);
      toggleCookingTimer(defaultMins);
    };
  }
  if (btnResetTimer) {
    btnResetTimer.onclick = () => {
      const defaultMins = parseInt(btnResetTimer.getAttribute('data-default') || '10', 10);
      resetCookingTimer(defaultMins);
    };
  }

  // Odškrtávání kroků
  content.querySelectorAll('.step-checkbox').forEach(cb => {
    cb.onchange = () => {
      const textSpan = cb.parentElement.querySelector('.step-text');
      if (cb.checked) {
        textSpan.classList.add('line-through', 'text-stone-400');
      } else {
        textSpan.classList.remove('line-through', 'text-stone-400');
      }
    };
  });
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function toggleCookingTimer(defaultMinutes) {
  if (state.timerRunning) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
  } else {
    if (state.timerSeconds <= 0) {
      state.timerSeconds = defaultMinutes * 60;
      state.timerOriginalSeconds = defaultMinutes * 60;
    }
    state.timerRunning = true;
    state.timerInterval = setInterval(() => {
      state.timerSeconds--;
      const display = document.getElementById('recipe-timer-display');
      if (display) display.textContent = formatTime(state.timerSeconds);

      if (state.timerSeconds <= 0) {
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        playTimerAlertSound();
        showToast('Minutka dovařila! Jídlo je hotové.', '🔔');
        const btn = document.getElementById('btn-toggle-timer');
        if (btn) btn.textContent = 'Spustit minutku';
      }
    }, 1000);
  }

  const btn = document.getElementById('btn-toggle-timer');
  if (btn) btn.textContent = state.timerRunning ? 'Pozastavit' : 'Spustit minutku';
}

function resetCookingTimer(defaultMinutes) {
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  state.timerSeconds = defaultMinutes * 60;
  const display = document.getElementById('recipe-timer-display');
  if (display) display.textContent = formatTime(state.timerSeconds);
  const btn = document.getElementById('btn-toggle-timer');
  if (btn) btn.textContent = 'Spustit minutku';
}

// 5. Nákupní seznam
function renderShoppingList() {
  const container = document.getElementById('shopping-items-list');
  const emptyState = document.getElementById('shopping-empty-state');
  const checkedSummary = document.getElementById('shopping-checked-summary');
  if (!container) return;

  const items = state.shoppingItems;

  if (items.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (checkedSummary) checkedSummary.classList.add('hidden');
    renderTopStats();
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const uncheckedItems = items.filter(i => !i.checked);
  const checkedItems = items.filter(i => i.checked);

  if (checkedSummary) {
    if (checkedItems.length > 0) {
      checkedSummary.classList.remove('hidden');
      const countEl = document.getElementById('shopping-checked-count');
      if (countEl) countEl.textContent = `${checkedItems.length} nakoupených`;
    } else {
      checkedSummary.classList.add('hidden');
    }
  }

  container.innerHTML = `
    <!-- K nákupu -->
    <div class="space-y-2">
      <div class="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
        K nákupu (${uncheckedItems.length})
      </div>
      ${uncheckedItems.length === 0 ? `
        <div class="p-4 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-semibold text-center border border-emerald-200">
          🎉 Vše je nakoupeno! Můžete položky přesunout do virtuální lednice.
        </div>
      ` : uncheckedItems.map(item => `
        <div class="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200 hover:border-stone-300 transition group" data-item-id="${item.id}">
          <label class="flex items-center gap-3 cursor-pointer truncate flex-1">
            <input type="checkbox" data-action="toggle-check-shopping" data-id="${item.id}" class="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300 cursor-pointer">
            <div class="truncate">
              <span class="font-semibold text-stone-800 text-sm">${item.name}</span>
              ${item.recipeTitle ? `
                <span class="text-xs text-stone-500 block truncate">Pro: ${item.recipeTitle}</span>
              ` : ''}
            </div>
          </label>

          <div class="flex items-center gap-3">
            <span class="text-xs font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md">
              ${item.qty ? `${Math.round(item.qty)} ${item.unit || ''}` : item.unit || '1 ks'}
            </span>
            <button data-action="delete-shopping-item" data-id="${item.id}" class="text-stone-300 hover:text-rose-600 transition p-1 cursor-pointer" title="Smazat položku">
              ✕
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Již v košíku / nakoupeno -->
    ${checkedItems.length > 0 ? `
      <div class="space-y-2 pt-4 border-t border-stone-200">
        <div class="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
          V košíku (${checkedItems.length})
        </div>
        ${checkedItems.map(item => `
          <div class="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 opacity-70 group" data-item-id="${item.id}">
            <label class="flex items-center gap-3 cursor-pointer truncate flex-1">
              <input type="checkbox" checked data-action="toggle-check-shopping" data-id="${item.id}" class="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300 cursor-pointer">
              <div class="truncate">
                <span class="font-medium text-stone-500 text-sm line-through">${item.name}</span>
              </div>
            </label>

            <div class="flex items-center gap-3">
              <span class="text-xs text-stone-400">
                ${item.qty ? `${Math.round(item.qty)} ${item.unit || ''}` : item.unit || '1 ks'}
              </span>
              <button data-action="delete-shopping-item" data-id="${item.id}" class="text-stone-300 hover:text-rose-600 transition p-1 cursor-pointer">
                ✕
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;

  renderTopStats();
}

// --- AKCE A LOGIKA ---

// Přepínání záložek
function switchTab(tabId) {
  state.activeTab = tabId;

  // Tlačítka záložek v navigaci
  document.querySelectorAll('[data-tab-target]').forEach(btn => {
    const target = btn.getAttribute('data-tab-target');
    if (target === tabId) {
      btn.classList.add('tab-active');
      btn.classList.remove('tab-inactive');
    } else {
      btn.classList.remove('tab-active');
      btn.classList.add('tab-inactive');
    }
  });

  // Panely obsahu
  document.querySelectorAll('[data-tab-content]').forEach(section => {
    const target = section.getAttribute('data-tab-content');
    if (target === tabId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });

  if (tabId === 'fridge') renderFridge();
  if (tabId === 'recipes') renderRecipes();
  if (tabId === 'shopping') renderShoppingList();
}

// Přidání / odebrání suroviny z lednice
function toggleFridgeIngredient(ingId) {
  const index = state.fridgeItems.findIndex(i => i.id === ingId);
  const common = COMMON_INGREDIENTS.find(c => c.id === ingId);

  if (index >= 0) {
    const removed = state.fridgeItems.splice(index, 1)[0];
    showToast(`Odebráno z lednice: ${removed.name}`, '🗑️');
  } else if (common) {
    state.fridgeItems.push({
      id: common.id,
      name: common.name,
      category: common.category,
      qty: common.commonQty,
      unit: common.defaultUnit,
      urgent: false
    });
    showToast(`Přidáno do lednice: ${common.name}`, '🧊');
  }

  Storage.saveFridgeItems(state.fridgeItems);
  renderFridge();
  renderTopStats();
}

// Přepnutí priority "Spotřebovat brzy"
function toggleUrgentExpiry(ingId) {
  const item = state.fridgeItems.find(i => i.id === ingId);
  if (!item) return;

  item.urgent = !item.urgent;
  Storage.saveFridgeItems(state.fridgeItems);
  renderFridge();
  showToast(item.urgent ? `„${item.name}“ označeno: Spotřebovat brzy!` : `Zrušeno označení u „${item.name}“`, '⏳');
}

// Přidání vlastní suroviny
function addCustomFridgeItem(name, category, qty, unit, urgent) {
  if (!name.trim()) return;

  const cleanName = name.trim();
  const id = 'custom_' + Date.now();

  state.fridgeItems.push({
    id,
    name: cleanName,
    category: category || 'spiz',
    qty: Math.max(1, Math.round(parseFloat(qty) || 1)),
    unit: unit || 'ks',
    urgent: Boolean(urgent)
  });

  Storage.saveFridgeItems(state.fridgeItems);
  renderFridge();
  showToast(`Surovina „${cleanName}“ uložena do lednice!`, '✅');
}

// Přidání položky do nákupního seznamu (s inteligentním slučováním)
function addShoppingItem({ name, qty = 1, unit = 'ks', recipeTitle = '' }) {
  const normName = removeDiacritics(name);
  const cleanQty = Math.max(1, Math.round(parseFloat(qty) || 1));
  const existing = state.shoppingItems.find(i => removeDiacritics(i.name) === normName && !i.checked);

  if (existing) {
    existing.qty = Math.max(1, Math.round((existing.qty || 1) + cleanQty));
    if (recipeTitle && !existing.recipeTitle.includes(recipeTitle)) {
      existing.recipeTitle = existing.recipeTitle ? `${existing.recipeTitle}, ${recipeTitle}` : recipeTitle;
    }
  } else {
    state.shoppingItems.push({
      id: 'shop_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      qty: cleanQty,
      unit,
      checked: false,
      recipeTitle
    });
  }

  Storage.saveShoppingItems(state.shoppingItems);
}

// Přidat všechny chybějící suroviny receptu do nákupního seznamu
function addMissingIngredientsToShopping(recipe) {
  const match = calculateRecipeMatch(recipe, state.fridgeItems);
  if (match.missing.length === 0) {
    showToast('Všechny suroviny již máte v lednici!', '✨');
    return;
  }

  let count = 0;
  match.missing.forEach(ing => {
    addShoppingItem({
      name: ing.name,
      qty: Math.max(1, Math.round(ing.amount || 1)),
      unit: ing.unit || 'ks',
      recipeTitle: recipe.title
    });
    count++;
  });

  Storage.saveShoppingItems(state.shoppingItems);
  renderShoppingList();
  showToast(`${count} chybějících surovin pro „${recipe.title}“ přidáno do nákupního seznamu!`, '🛒');
}

// Přepnout zaškrtnutí v nákupním košíku
function toggleShoppingItemCheck(itemId) {
  const item = state.shoppingItems.find(i => i.id === itemId);
  if (!item) return;

  item.checked = !item.checked;
  Storage.saveShoppingItems(state.shoppingItems);
  renderShoppingList();
}

// Smazat položku z nákupního seznamu
function deleteShoppingItem(itemId) {
  state.shoppingItems = state.shoppingItems.filter(i => i.id !== itemId);
  Storage.saveShoppingItems(state.shoppingItems);
  renderShoppingList();
}

// Přesunout nakoupené položky z košíku přímo do lednice
function transferCheckedShoppingToFridge() {
  const checked = state.shoppingItems.filter(i => i.checked);
  if (checked.length === 0) {
    showToast('Nejprve zaškrtněte položky, které jste nakoupili!', '⚠️');
    return;
  }

  checked.forEach(item => {
    const existingFridge = state.fridgeItems.find(f => removeDiacritics(f.name) === removeDiacritics(item.name));
    if (existingFridge) {
      existingFridge.qty = Math.max(1, Math.round((existingFridge.qty || 1) + (item.qty || 1)));
    } else {
      state.fridgeItems.push({
        id: 'from_shop_' + Date.now() + Math.random().toString(36).substring(2, 5),
        name: item.name,
        category: 'spiz',
        qty: Math.max(1, Math.round(item.qty || 1)),
        unit: item.unit || 'ks',
        urgent: false
      });
    }
  });

  // Odstranit nakoupené ze seznamu
  state.shoppingItems = state.shoppingItems.filter(i => !i.checked);

  Storage.saveFridgeItems(state.fridgeItems);
  Storage.saveShoppingItems(state.shoppingItems);

  renderShoppingList();
  renderFridge();
  renderTopStats();
  showToast(`${checked.length} nakoupených položek úspěšně přesunuto do lednice!`, '🥦');
}

// Kopírovat nákupní seznam do schránky (WhatsApp/SMS ready)
function copyShoppingListToClipboard() {
  const items = state.shoppingItems.filter(i => !i.checked);
  if (items.length === 0) {
    showToast('Nákupní seznam je prázdný!', '⚠️');
    return;
  }

  const text = [
    '🛒 NÁKUPNÍ SEZNAM (CoDůmDal):',
    '----------------------------',
    ...items.map(i => `☐ ${i.name} (${Math.max(1, Math.round(i.qty || 1))} ${i.unit || 'ks'})${i.recipeTitle ? ` [pro: ${i.recipeTitle}]` : ''}`),
    '----------------------------',
    'Vygenerováno aplikací CoDůmDal'
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    showToast('Nákupní seznam zkopírován do schránky!', '📋');
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    showToast('Nákupní seznam zkopírován do schránky!', '📋');
  });
}

// Oblíbené
function toggleFavorite(recipeId) {
  const idx = state.favorites.indexOf(recipeId);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
    showToast('Odebráno z oblíbených', '🤍');
  } else {
    state.favorites.push(recipeId);
    showToast('Uloženo do oblíbených!', '❤️');
  }
  Storage.saveFavorites(state.favorites);
}

// --- INICIALIZACE EVENT LISTENERŮ ---
function initEvents() {
  // Navigační taby
  document.querySelectorAll('[data-tab-target]').forEach(btn => {
    btn.onclick = () => {
      const target = btn.getAttribute('data-tab-target');
      switchTab(target);
    };
  });

  // Tlačítko rychlého přechodu z horního hrdiny
  const btnHeroRecipes = document.getElementById('btn-hero-recipes');
  const btnHeroFridge = document.getElementById('btn-hero-fridge');
  if (btnHeroRecipes) btnHeroRecipes.onclick = () => switchTab('recipes');
  if (btnHeroFridge) btnHeroFridge.onclick = () => switchTab('fridge');

  // Filtry kategorií v lednici
  document.querySelectorAll('[data-fridge-cat]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-fridge-cat]').forEach(b => {
        b.classList.remove('bg-emerald-700', 'text-white');
        b.classList.add('bg-stone-100', 'text-stone-700');
      });
      btn.classList.add('bg-emerald-700', 'text-white');
      btn.classList.remove('bg-stone-100', 'text-stone-700');
      state.fridgeCategory = btn.getAttribute('data-fridge-cat');
      renderFridge();
    };
  });

  // Hledání v lednici
  const fridgeSearchInput = document.getElementById('fridge-search-input');
  if (fridgeSearchInput) {
    fridgeSearchInput.oninput = (e) => {
      state.fridgeSearch = e.target.value;
      renderFridge();
    };
  }

  // Delegace kliknutí na suroviny v lednici
  const fridgeGrid = document.getElementById('fridge-grid');
  if (fridgeGrid) {
    fridgeGrid.onclick = (e) => {
      const toggleUrgentBtn = e.target.closest('[data-action="toggle-urgent"]');
      if (toggleUrgentBtn) {
        e.stopPropagation();
        toggleUrgentExpiry(toggleUrgentBtn.getAttribute('data-id'));
        return;
      }

      const card = e.target.closest('[data-id]');
      if (card) {
        toggleFridgeIngredient(card.getAttribute('data-id'));
      }
    };
  }

  // Odstranění z aktivních chips v lednici
  const activeChips = document.getElementById('fridge-active-chips');
  if (activeChips) {
    activeChips.onclick = (e) => {
      const removeBtn = e.target.closest('[data-action="remove-fridge"]');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-id');
        const index = state.fridgeItems.findIndex(i => i.id === id);
        if (index >= 0) {
          state.fridgeItems.splice(index, 1);
          Storage.saveFridgeItems(state.fridgeItems);
          renderFridge();
          renderTopStats();
        }
        return;
      }

      const toggleUrgentBtn = e.target.closest('[data-action="toggle-urgent"]');
      if (toggleUrgentBtn) {
        toggleUrgentExpiry(toggleUrgentBtn.getAttribute('data-id'));
      }
    };
  }

  // Přednastavené balíčky lednice (Presets)
  document.querySelectorAll('[data-preset-id]').forEach(btn => {
    btn.onclick = () => {
      const presetId = btn.getAttribute('data-preset-id');
      const preset = FRIDGE_PRESETS.find(p => p.id === presetId);
      if (!preset) return;

      const newItems = preset.ingredientIds.map(id => {
        const c = COMMON_INGREDIENTS.find(item => item.id === id);
        return c ? {
          id: c.id,
          name: c.name,
          category: c.category,
          qty: c.commonQty,
          unit: c.defaultUnit,
          urgent: false
        } : null;
      }).filter(Boolean);

      state.fridgeItems = Storage.resetFridgeToPreset(newItems);
      renderFridge();
      renderTopStats();
      showToast(`Aktivován balíček: ${preset.title}`, '🎒');
    };
  });

  // Tlačítko vyprázdnit lednici
  const btnClearFridge = document.getElementById('btn-clear-fridge');
  if (btnClearFridge) {
    btnClearFridge.onclick = () => {
      if (confirm('Opravdu chcete vysypat celou virtuální lednici?')) {
        state.fridgeItems = Storage.clearFridge();
        renderFridge();
        renderTopStats();
        showToast('Lednice byla vyprázdněna.', '🧹');
      }
    };
  }

  // Formulář pro přidání vlastní suroviny
  const customIngForm = document.getElementById('form-add-custom-ingredient');
  if (customIngForm) {
    customIngForm.onsubmit = (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('custom-ing-name');
      const catSelect = document.getElementById('custom-ing-cat');
      const qtyInput = document.getElementById('custom-ing-qty');
      const unitInput = document.getElementById('custom-ing-unit');
      const urgentCheckbox = document.getElementById('custom-ing-urgent');

      if (nameInput && nameInput.value.trim()) {
        addCustomFridgeItem(
          nameInput.value,
          catSelect ? catSelect.value : 'spiz',
          qtyInput ? qtyInput.value : 1,
          unitInput ? unitInput.value : 'ks',
          urgentCheckbox ? urgentCheckbox.checked : false
        );
        nameInput.value = '';
        if (qtyInput) qtyInput.value = '1';
        if (urgentCheckbox) urgentCheckbox.checked = false;
      }
    };
  }

  // Filtrování receptů (Tab lišta filtrů)
  document.querySelectorAll('[data-recipe-filter]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-recipe-filter]').forEach(b => {
        b.classList.remove('bg-emerald-700', 'text-white', 'shadow-sm');
        b.classList.add('bg-stone-100', 'text-stone-700');
      });
      btn.classList.add('bg-emerald-700', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-stone-100', 'text-stone-700');
      state.recipeFilter = btn.getAttribute('data-recipe-filter');
      renderRecipes();
    };
  });

  // Řazení receptů
  const sortSelect = document.getElementById('recipe-sort-select');
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      state.recipeSort = e.target.value;
      renderRecipes();
    };
  }

  // Vyhledávání receptů
  const recipeSearchInput = document.getElementById('recipe-search-input');
  if (recipeSearchInput) {
    recipeSearchInput.oninput = (e) => {
      state.recipeSearch = e.target.value;
      renderRecipes();
    };
  }

  // Delegace na mřížku receptů (otevření modalu, rychlé přidání chybějících, oblíbené)
  const recipesGrid = document.getElementById('recipes-grid');
  if (recipesGrid) {
    recipesGrid.onclick = (e) => {
      const favBtn = e.target.closest('[data-action="toggle-fav"]');
      if (favBtn) {
        e.stopPropagation();
        toggleFavorite(favBtn.getAttribute('data-id'));
        renderRecipes();
        return;
      }

      const addMissingBtn = e.target.closest('[data-action="add-missing-shopping"]');
      if (addMissingBtn) {
        e.stopPropagation();
        const rId = addMissingBtn.getAttribute('data-id');
        const recipe = RECIPES_DATA.find(r => r.id === rId);
        if (recipe) addMissingIngredientsToShopping(recipe);
        return;
      }

      const card = e.target.closest('[data-recipe-id]');
      if (card) {
        openRecipeModal(card.getAttribute('data-recipe-id'));
      }
    };
  }

  // Události nákupního seznamu
  const shoppingListContainer = document.getElementById('shopping-items-list');
  if (shoppingListContainer) {
    shoppingListContainer.onclick = (e) => {
      const toggleCheck = e.target.closest('[data-action="toggle-check-shopping"]');
      if (toggleCheck) {
        toggleShoppingItemCheck(toggleCheck.getAttribute('data-id'));
        return;
      }

      const deleteBtn = e.target.closest('[data-action="delete-shopping-item"]');
      if (deleteBtn) {
        deleteShoppingItem(deleteBtn.getAttribute('data-id'));
        return;
      }
    };
  }

  // Formulář pro manuální přidání nákupní položky
  const formAddShopping = document.getElementById('form-add-shopping-item');
  if (formAddShopping) {
    formAddShopping.onsubmit = (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('shopping-custom-name');
      const qtyInput = document.getElementById('shopping-custom-qty');
      const unitInput = document.getElementById('shopping-custom-unit');

      if (nameInput && nameInput.value.trim()) {
        addShoppingItem({
          name: nameInput.value.trim(),
          qty: Math.max(1, Math.round(parseFloat(qtyInput ? qtyInput.value : 1) || 1)),
          unit: unitInput ? unitInput.value.trim() : 'ks'
        });
        nameInput.value = '';
        renderShoppingList();
        showToast('Položka přidána do nákupního seznamu!', '🛒');
      }
    };
  }

  // Tlačítka nákupního seznamu: Přesun do lednice, Kopírovat, Smazat hotové
  const btnTransferChecked = document.getElementById('btn-shopping-transfer-fridge');
  if (btnTransferChecked) {
    btnTransferChecked.onclick = transferCheckedShoppingToFridge;
  }

  const btnCopyShopping = document.getElementById('btn-shopping-copy');
  if (btnCopyShopping) {
    btnCopyShopping.onclick = copyShoppingListToClipboard;
  }

  const btnClearShopping = document.getElementById('btn-shopping-clear-all');
  if (btnClearShopping) {
    btnClearShopping.onclick = () => {
      if (confirm('Opravdu chcete vymazat celý nákupní seznam?')) {
        state.shoppingItems = [];
        Storage.saveShoppingItems([]);
        renderShoppingList();
        showToast('Nákupní seznam byl vymazán.', '🧹');
      }
    };
  }

  // Tlačítko tisk nákupního seznamu
  const btnPrintShopping = document.getElementById('btn-shopping-print');
  if (btnPrintShopping) {
    btnPrintShopping.onclick = () => {
      window.print();
    };
  }

  // Zavření modalu klávesou Escape a kliknutím do pozadí
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.selectedRecipe) {
      closeRecipeModal();
    }
  });

  const modalBg = document.getElementById('recipe-modal');
  if (modalBg) {
    modalBg.onclick = (e) => {
      if (e.target === modalBg) {
        closeRecipeModal();
      }
    };
  }
}

// Spuštění aplikace
function startApp() {
  initEvents();
  renderTopStats();
  renderFridge();
  renderRecipes();
  renderShoppingList();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
