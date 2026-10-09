import { FridgeIngredient, IngredientCategory } from '../types/recipe';

export const CATEGORY_LABELS: Record<IngredientCategory, { label: string; icon: string }> = {
  zelenina_ovoce: { label: 'Zelenina & Ovoce', icon: '🥕' },
  mlecne_vejce: { label: 'Mléčné výrobky & Vejce', icon: '🧀' },
  maso_ryby: { label: 'Maso & Ryby', icon: '🥩' },
  prilohy_obiloviny: { label: 'Těstoviny, Rýže & Mouka', icon: '🌾' },
  spiz_koreni: { label: 'Spíž, Oleje & Koření', icon: '🧂' },
  ostatni: { label: 'Ostatní suroviny', icon: '🥫' },
};

export const INITIAL_FRIDGE: FridgeIngredient[] = [
  { id: 'f-1', name: 'Vejce', category: 'mlecne_vejce', amount: '6 ks', expiresSoon: true },
  { id: 'f-2', name: 'Máslo', category: 'mlecne_vejce', amount: '120 g', expiresSoon: false },
  { id: 'f-3', name: 'Špagety', category: 'prilohy_obiloviny', amount: '500 g', expiresSoon: false },
  { id: 'f-4', name: 'Parmazán', category: 'mlecne_vejce', amount: '80 g', expiresSoon: false },
  { id: 'f-5', name: 'Cibule', category: 'zelenina_ovoce', amount: '3 ks', expiresSoon: false },
  { id: 'f-6', name: 'Česnek', category: 'zelenina_ovoce', amount: '4 stroužky', expiresSoon: false },
  { id: 'f-7', name: 'Olivový olej', category: 'spiz_koreni', amount: '500 ml', expiresSoon: false },
  { id: 'f-8', name: 'Zralá rajčata', category: 'zelenina_ovoce', amount: '4 ks', expiresSoon: true },
  { id: 'f-9', name: 'Kuřecí prsa', category: 'maso_ryby', amount: '500 g', expiresSoon: false },
  { id: 'f-10', name: 'Brambory', category: 'zelenina_ovoce', amount: '1 kg', expiresSoon: false },
  { id: 'f-11', name: 'Smetana ke šlehání', category: 'mlecne_vejce', amount: '200 ml', expiresSoon: true },
  { id: 'f-12', name: 'Čerstvý baby špenát', category: 'zelenina_ovoce', amount: '125 g', expiresSoon: true },
];

export const POPULAR_INGREDIENTS: { name: string; category: IngredientCategory }[] = [
  // Zelenina & ovoce
  { name: 'Cibule', category: 'zelenina_ovoce' },
  { name: 'Česnek', category: 'zelenina_ovoce' },
  { name: 'Rajčata', category: 'zelenina_ovoce' },
  { name: 'Brambory', category: 'zelenina_ovoce' },
  { name: 'Mrkev', category: 'zelenina_ovoce' },
  { name: 'Paprika', category: 'zelenina_ovoce' },
  { name: 'Baby špenát', category: 'zelenina_ovoce' },
  { name: 'Žampiony', category: 'zelenina_ovoce' },
  { name: 'Brokolice', category: 'zelenina_ovoce' },
  { name: 'Citron', category: 'zelenina_ovoce' },
  { name: 'Jablka', category: 'zelenina_ovoce' },
  
  // Mléčné & vejce
  { name: 'Vejce', category: 'mlecne_vejce' },
  { name: 'Máslo', category: 'mlecne_vejce' },
  { name: 'Mléko', category: 'mlecne_vejce' },
  { name: 'Parmazán', category: 'mlecne_vejce' },
  { name: 'Mozzarella', category: 'mlecne_vejce' },
  { name: 'Čedar', category: 'mlecne_vejce' },
  { name: 'Smetana', category: 'mlecne_vejce' },
  { name: 'Bílý jogurt', category: 'mlecne_vejce' },
  { name: 'Tvaroh', category: 'mlecne_vejce' },

  // Maso & ryby
  { name: 'Kuřecí prsa', category: 'maso_ryby' },
  { name: 'Mleté hovězí maso', category: 'maso_ryby' },
  { name: 'Kvalitní slanina', category: 'maso_ryby' },
  { name: 'Dušená šunka', category: 'maso_ryby' },
  { name: 'Filet z lososa', category: 'maso_ryby' },
  { name: 'Tuňák v konzervě', category: 'maso_ryby' },

  // Přílohy & obiloviny
  { name: 'Špagety', category: 'prilohy_obiloviny' },
  { name: 'Těstoviny penne', category: 'prilohy_obiloviny' },
  { name: 'Rýže basmati', category: 'prilohy_obiloviny' },
  { name: 'Hladká mouka', category: 'prilohy_obiloviny' },
  { name: 'Ovesné vločky', category: 'prilohy_obiloviny' },
  { name: 'Červená čočka', category: 'prilohy_obiloviny' },
  { name: 'Tortilly', category: 'prilohy_obiloviny' },

  // Spíž & koření
  { name: 'Olivový olej', category: 'spiz_koreni' },
  { name: 'Sójová omáčka', category: 'spiz_koreni' },
  { name: 'Rajčatový protlak', category: 'spiz_koreni' },
  { name: 'Kvalitní med', category: 'spiz_koreni' },
  { name: 'Plnotučná hořčice', category: 'spiz_koreni' },
  { name: 'Sušená majoránka', category: 'spiz_koreni' },
  { name: 'Sušené oregano', category: 'spiz_koreni' },
  { name: 'Chilli vločky', category: 'spiz_koreni' },
];
