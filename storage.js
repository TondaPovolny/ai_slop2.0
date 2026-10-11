/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Správa lokálního úložiště pro lednici, nákupní seznam a oblíbené recepty

const STORAGE_KEYS = {
  FRIDGE: 'codumdal_fridge_items_v2',
  SHOPPING: 'codumdal_shopping_items_v2',
  FAVORITES: 'codumdal_favorite_recipes_v2',
  CUSTOM_RECIPES: 'codumdal_custom_recipes_v2'
};

// Počáteční stav lednice pro nový start (aby aplikace nebyla prázdná)
const INITIAL_FRIDGE = [
  { id: 'brambory', name: 'Brambory', category: 'zelenina', qty: 1, unit: 'kg', urgent: false },
  { id: 'cibule', name: 'Cibule', category: 'zelenina', qty: 2, unit: 'ks', urgent: false },
  { id: 'cesnek', name: 'Česnek', category: 'zelenina', qty: 4, unit: 'stroužků', urgent: false },
  { id: 'vejce', name: 'Vejce', category: 'mlecne', qty: 6, unit: 'ks', urgent: true }, // urgent pro demonstraci spotřeby
  { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', category: 'mlecne', qty: 200, unit: 'g', urgent: false },
  { id: 'maslo', name: 'Máslo', category: 'mlecne', qty: 150, unit: 'g', urgent: false },
  { id: 'mleko', name: 'Mléko', category: 'mlecne', qty: 500, unit: 'ml', urgent: false },
  { id: 'testoviny', name: 'Těstoviny (špagety, penne)', category: 'spiz', qty: 400, unit: 'g', urgent: false },
  { id: 'mouka_hladka', name: 'Hladká mouka', category: 'spiz', qty: 300, unit: 'g', urgent: false },
  { id: 'sul', name: 'Sůl & Pepř', category: 'dochucovadla', qty: 1, unit: 'špetka', urgent: false },
  { id: 'olej_rostlinny', name: 'Rostlinný olej', category: 'dochucovadla', qty: 200, unit: 'ml', urgent: false },
  { id: 'majoranka', name: 'Majoránka', category: 'dochucovadla', qty: 1, unit: 'lžička', urgent: false },
  { id: 'kmin', name: 'Kmín (drcený/celý)', category: 'dochucovadla', qty: 1, unit: 'lžička', urgent: false }
];

export const Storage = {
  getFridgeItems() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FRIDGE);
      if (!data) {
        this.saveFridgeItems(INITIAL_FRIDGE);
        return INITIAL_FRIDGE;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_FRIDGE;
    }
  },

  saveFridgeItems(items) {
    try {
      localStorage.setItem(STORAGE_KEYS.FRIDGE, JSON.stringify(items));
    } catch (e) {
      console.error('Chyba při ukládání lednice:', e);
    }
  },

  getShoppingItems() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHOPPING);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveShoppingItems(items) {
    try {
      localStorage.setItem(STORAGE_KEYS.SHOPPING, JSON.stringify(items));
    } catch (e) {
      console.error('Chyba při ukládání nákupního seznamu:', e);
    }
  },

  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveFavorites(favorites) {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error('Chyba při ukládání oblíbených:', e);
    }
  },

  getCustomRecipes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_RECIPES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCustomRecipes(recipes) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(recipes));
    } catch (e) {
      console.error('Chyba při ukládání vlastních receptů:', e);
    }
  },

  resetFridgeToPreset(ingredientList) {
    this.saveFridgeItems(ingredientList);
    return ingredientList;
  },

  clearFridge() {
    this.saveFridgeItems([]);
    return [];
  }
};
