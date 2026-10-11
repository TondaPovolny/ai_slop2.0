/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Rozsáhlá databáze standardních surovin pro rychlý výběr v lednici a spíži (vše celá čísla)
export const INGREDIENT_CATEGORIES = [
  { id: 'zelenina', name: 'Zelenina & Ovoce', icon: '🥦' },
  { id: 'mlecne', name: 'Mléčné výrobky & Vejce', icon: '🧀' },
  { id: 'maso', name: 'Maso, Ryby & Uzeniny', icon: '🥩' },
  { id: 'spiz', name: 'Těstoviny, Rýže, Mouky & Spíž', icon: '🍝' },
  { id: 'konzervy', name: 'Konzervy & Luštěniny', icon: '🥫' },
  { id: 'dochucovadla', name: 'Oleje, Koření & Dochucovadla', icon: '🌿' }
];

export const COMMON_INGREDIENTS = [
  // --- 1. Zelenina & Ovoce ---
  { id: 'brambory', name: 'Brambory', category: 'zelenina', icon: '🥔', defaultUnit: 'kg', commonQty: 1 },
  { id: 'cibule', name: 'Cibule', category: 'zelenina', icon: '🧅', defaultUnit: 'ks', commonQty: 2 },
  { id: 'cervena_cibule', name: 'Červená cibule', category: 'zelenina', icon: '🧅', defaultUnit: 'ks', commonQty: 1 },
  { id: 'jarni_cibulka', name: 'Jarní cibulka', category: 'zelenina', icon: '🧅', defaultUnit: 'svazek', commonQty: 1 },
  { id: 'cesnek', name: 'Česnek', category: 'zelenina', icon: '🧄', defaultUnit: 'stroužků', commonQty: 4 },
  { id: 'rajcata', name: 'Rajčata', category: 'zelenina', icon: '🍅', defaultUnit: 'ks', commonQty: 3 },
  { id: 'cherry_rajcata', name: 'Cherry rajčátka', category: 'zelenina', icon: '🍅', defaultUnit: 'balení', commonQty: 1 },
  { id: 'paprika', name: 'Paprika', category: 'zelenina', icon: '🫑', defaultUnit: 'ks', commonQty: 2 },
  { id: 'mrkev', name: 'Mrkev', category: 'zelenina', icon: '🥕', defaultUnit: 'ks', commonQty: 2 },
  { id: 'petrzel', name: 'Petržel kořenová', category: 'zelenina', icon: '🥕', defaultUnit: 'ks', commonQty: 1 },
  { id: 'petrzelka', name: 'Naťová petrželka', category: 'zelenina', icon: '🌿', defaultUnit: 'svazek', commonQty: 1 },
  { id: 'cuketa', name: 'Cuketa', category: 'zelenina', icon: '🥒', defaultUnit: 'ks', commonQty: 1 },
  { id: 'lilek', name: 'Lilek', category: 'zelenina', icon: '🍆', defaultUnit: 'ks', commonQty: 1 },
  { id: 'spenat', name: 'Špenát (čerstvý / mražený)', category: 'zelenina', icon: '🥬', defaultUnit: 'g', commonQty: 200 },
  { id: 'zampiony', name: 'Žampiony / Lesní houby', category: 'zelenina', icon: '🍄', defaultUnit: 'g', commonQty: 250 },
  { id: 'susene_houby', name: 'Sušené houby', category: 'zelenina', icon: '🍄', defaultUnit: 'g', commonQty: 50 },
  { id: 'brokolice', name: 'Brokolice', category: 'zelenina', icon: '🥦', defaultUnit: 'ks', commonQty: 1 },
  { id: 'kvetak', name: 'Květák', category: 'zelenina', icon: '🥦', defaultUnit: 'ks', commonQty: 1 },
  { id: 'porek', name: 'Pórek', category: 'zelenina', icon: '🧅', defaultUnit: 'ks', commonQty: 1 },
  { id: 'celer', name: 'Celer (kořenový / řapíkatý)', category: 'zelenina', icon: '🥬', defaultUnit: 'g', commonQty: 200 },
  { id: 'zeli_kysane', name: 'Kysané zelí', category: 'zelenina', icon: '🥬', defaultUnit: 'g', commonQty: 400 },
  { id: 'zeli_hlavkove', name: 'Hlávkové zelí (bílé / červené)', category: 'zelenina', icon: '🥬', defaultUnit: 'g', commonQty: 500 },
  { id: 'cervena_repa', name: 'Červená řepa', category: 'zelenina', icon: '🍠', defaultUnit: 'ks', commonQty: 2 },
  { id: 'hrasek', name: 'Hrášek (mražený / čerstvý)', category: 'zelenina', icon: '🟢', defaultUnit: 'g', commonQty: 150 },
  { id: 'zelene_fazolky', name: 'Zelené fazolky', category: 'zelenina', icon: '🫛', defaultUnit: 'g', commonQty: 200 },
  { id: 'okurka', name: 'Salátová okurka', category: 'zelenina', icon: '🥒', defaultUnit: 'ks', commonQty: 1 },
  { id: 'salat', name: 'Hlávkový / Ledový salát / Rukola', category: 'zelenina', icon: '🥗', defaultUnit: 'balení', commonQty: 1 },
  { id: 'citron', name: 'Citron', category: 'zelenina', icon: '🍋', defaultUnit: 'ks', commonQty: 1 },
  { id: 'jablka', name: 'Jablka', category: 'zelenina', icon: '🍎', defaultUnit: 'ks', commonQty: 3 },
  { id: 'hrusky', name: 'Hrušky', category: 'zelenina', icon: '🍐', defaultUnit: 'ks', commonQty: 2 },
  { id: 'banany', name: 'Banány', category: 'zelenina', icon: '🍌', defaultUnit: 'ks', commonQty: 2 },
  { id: 'zazvor', name: 'Čerstvý zázvor', category: 'zelenina', icon: '🫚', defaultUnit: 'kousek', commonQty: 1 },
  { id: 'dyne', name: 'Dýně (Hokkaidó / máslová)', category: 'zelenina', icon: '🎃', defaultUnit: 'g', commonQty: 400 },
  { id: 'avokado', name: 'Avokádo', category: 'zelenina', icon: '🥑', defaultUnit: 'ks', commonQty: 1 },
  { id: 'kren', name: 'Křen čerstvý', category: 'zelenina', icon: '🥢', defaultUnit: 'kousek', commonQty: 1 },
  { id: 'chilli', name: 'Chilli papričky', category: 'zelenina', icon: '🌶️', defaultUnit: 'ks', commonQty: 1 },

  // --- 2. Mléčné výrobky & Vejce ---
  { id: 'vejce', name: 'Vejce', category: 'mlecne', icon: '🥚', defaultUnit: 'ks', commonQty: 6 },
  { id: 'maslo', name: 'Máslo', category: 'mlecne', icon: '🧈', defaultUnit: 'g', commonQty: 150 },
  { id: 'mleko', name: 'Mléko', category: 'mlecne', icon: '🥛', defaultUnit: 'ml', commonQty: 500 },
  { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', category: 'mlecne', icon: '🧀', defaultUnit: 'g', commonQty: 200 },
  { id: 'parmazan', name: 'Parmazán / Grana Padano', category: 'mlecne', icon: '🧀', defaultUnit: 'g', commonQty: 60 },
  { id: 'hermelin', name: 'Hermelín / Camembert', category: 'mlecne', icon: '🧀', defaultUnit: 'ks', commonQty: 1 },
  { id: 'balkansky_syr', name: 'Balkánský sýr / Feta', category: 'mlecne', icon: '🧀', defaultUnit: 'g', commonQty: 150 },
  { id: 'niva', name: 'Niva / Sýr s modrou plísní', category: 'mlecne', icon: '🧀', defaultUnit: 'g', commonQty: 100 },
  { id: 'taveny_syr', name: 'Tavený sýr', category: 'mlecne', icon: '🧀', defaultUnit: 'trojúhelníčky', commonQty: 2 },
  { id: 'lucina', name: 'Lučina / Pomazánkové máslo / Žervé', category: 'mlecne', icon: '🥣', defaultUnit: 'balení', commonQty: 1 },
  { id: 'smetana', name: 'Smetana na vaření (12%)', category: 'mlecne', icon: '🥛', defaultUnit: 'ml', commonQty: 200 },
  { id: 'smetana_ke_slehani', name: 'Smetana ke šlehání (33%)', category: 'mlecne', icon: '🥛', defaultUnit: 'ml', commonQty: 200 },
  { id: 'zakysana_smetana', name: 'Zakysaná smetana', category: 'mlecne', icon: '🥣', defaultUnit: 'kelímek', commonQty: 1 },
  { id: 'tvaroh', name: 'Tvaroh (měkký / na strouhání)', category: 'mlecne', icon: '🥣', defaultUnit: 'g', commonQty: 250 },
  { id: 'mozzarella', name: 'Mozzarella', category: 'mlecne', icon: '🧀', defaultUnit: 'balení', commonQty: 1 },
  { id: 'jogurt', name: 'Bílý jogurt', category: 'mlecne', icon: '🥛', defaultUnit: 'kelímek', commonQty: 1 },
  { id: 'kefir', name: 'Kefír / Podmáslí', category: 'mlecne', icon: '🥛', defaultUnit: 'ml', commonQty: 250 },

  // --- 3. Maso, Ryby & Uzeniny ---
  { id: 'kureci_prsa', name: 'Kuřecí prsa / řízky', category: 'maso', icon: '🍗', defaultUnit: 'g', commonQty: 400 },
  { id: 'kureci_stehna', name: 'Kuřecí stehna / paličky', category: 'maso', icon: '🍗', defaultUnit: 'ks', commonQty: 2 },
  { id: 'veprove_maso', name: 'Vepřové maso (plec / krkovice)', category: 'maso', icon: '🥩', defaultUnit: 'g', commonQty: 500 },
  { id: 'hovezi_maso', name: 'Hovězí maso (gulášové / zadní)', category: 'maso', icon: '🥩', defaultUnit: 'g', commonQty: 500 },
  { id: 'mlete_maso', name: 'Mleté maso (mix / hovězí)', category: 'maso', icon: '🥩', defaultUnit: 'g', commonQty: 500 },
  { id: 'uzene_maso', name: 'Uzené maso (vařené / pečené)', category: 'maso', icon: '🥩', defaultUnit: 'g', commonQty: 300 },
  { id: 'sunka', name: 'Šunka (kvalitní dušená)', category: 'maso', icon: '🥓', defaultUnit: 'g', commonQty: 150 },
  { id: 'slanina', name: 'Slanina / Anglická slanina / Špek', category: 'maso', icon: '🥓', defaultUnit: 'g', commonQty: 100 },
  { id: 'parky', name: 'Párky / Špekáčky / Uzenina', category: 'maso', icon: '🌭', defaultUnit: 'ks', commonQty: 3 },
  { id: 'klobasa', name: 'Klobása', category: 'maso', icon: '🌭', defaultUnit: 'ks', commonQty: 1 },
  { id: 'skvarky', name: 'Škvarky', category: 'maso', icon: '🥓', defaultUnit: 'g', commonQty: 100 },
  { id: 'tunak', name: 'Tuňák v konzervě', category: 'maso', icon: '🐟', defaultUnit: 'konzerva', commonQty: 1 },
  { id: 'sardinky', name: 'Sardinky v oleji / tomatě', category: 'maso', icon: '🐟', defaultUnit: 'konzerva', commonQty: 1 },
  { id: 'losos', name: 'Losos / Rybí filé', category: 'maso', icon: '🍣', defaultUnit: 'g', commonQty: 300 },
  { id: 'pastika', name: 'Paštika', category: 'maso', icon: '🥣', defaultUnit: 'ks', commonQty: 1 },

  // --- 4. Spíž, Těstoviny, Mouky & Přílohy ---
  { id: 'testoviny', name: 'Těstoviny (špagety, penne, kolínka)', category: 'spiz', icon: '🍝', defaultUnit: 'g', commonQty: 400 },
  { id: 'ryze', name: 'Rýže (dlouhozrnná, jasmínová)', category: 'spiz', icon: '🍚', defaultUnit: 'g', commonQty: 400 },
  { id: 'gnocchi', name: 'Bramborové noky (Gnocchi)', category: 'spiz', icon: '🥟', defaultUnit: 'g', commonQty: 500 },
  { id: 'knedlik', name: 'Houskový / kynutý knedlík', category: 'spiz', icon: '🥟', defaultUnit: 'plátků', commonQty: 4 },
  { id: 'kuskus', name: 'Kuskus / Bulgur', category: 'spiz', icon: '🌾', defaultUnit: 'g', commonQty: 250 },
  { id: 'mouka_hladka', name: 'Hladká mouka', category: 'spiz', icon: '🌾', defaultUnit: 'g', commonQty: 300 },
  { id: 'mouka_polohruba', name: 'Polohrubá mouka', category: 'spiz', icon: '🌾', defaultUnit: 'g', commonQty: 300 },
  { id: 'mouka_hruba', name: 'Hrubá mouka', category: 'spiz', icon: '🌾', defaultUnit: 'g', commonQty: 200 },
  { id: 'krupice', name: 'Dětská krupice / Krupička', category: 'spiz', icon: '🌾', defaultUnit: 'g', commonQty: 150 },
  { id: 'strouhanka', name: 'Strouhanka', category: 'spiz', icon: '🥖', defaultUnit: 'g', commonQty: 150 },
  { id: 'vlocky', name: 'Ovesné vločky', category: 'spiz', icon: '🥣', defaultUnit: 'g', commonQty: 200 },
  { id: 'chleb', name: 'Chléb / Pečivo (i starší)', category: 'spiz', icon: '🍞', defaultUnit: 'krajíců', commonQty: 4 },
  { id: 'rohliky', name: 'Rohlíky / Housky', category: 'spiz', icon: '🥖', defaultUnit: 'ks', commonQty: 2 },
  { id: 'tortilly', name: 'Tortilly', category: 'spiz', icon: '🫓', defaultUnit: 'ks', commonQty: 4 },
  { id: 'kroupy', name: 'Ječné kroupy', category: 'spiz', icon: '🌾', defaultUnit: 'g', commonQty: 200 },
  { id: 'pohanka', name: 'Pohanka', category: 'spiz', icon: '🌾', defaultUnit: 'g', commonQty: 200 },
  { id: 'drozdi', name: 'Droždí (čerstvé / sušené)', category: 'spiz', icon: '🍞', defaultUnit: 'balení', commonQty: 1 },
  { id: 'orechy', name: 'Vlašské ořechy / Mák', category: 'spiz', icon: '🌰', defaultUnit: 'g', commonQty: 100 },

  // --- 5. Konzervy & Luštěniny ---
  { id: 'cocka', name: 'Čočka hnědá / zelená', category: 'konzervy', icon: '🍲', defaultUnit: 'g', commonQty: 300 },
  { id: 'cervena_cocka', name: 'Červená čočka', category: 'konzervy', icon: '🍲', defaultUnit: 'g', commonQty: 250 },
  { id: 'hrach', name: 'Hrach žlutý / zelený', category: 'konzervy', icon: '🫛', defaultUnit: 'g', commonQty: 300 },
  { id: 'cizrna', name: 'Cizrna v plechovce', category: 'konzervy', icon: '🥫', defaultUnit: 'konzerva', commonQty: 1 },
  { id: 'fazole', name: 'Fazole v plechovce', category: 'konzervy', icon: '🥫', defaultUnit: 'konzerva', commonQty: 1 },
  { id: 'rajcata_konzerva', name: 'Krájená rajčata v plechovce', category: 'konzervy', icon: '🥫', defaultUnit: 'konzerva', commonQty: 1 },
  { id: 'protlak', name: 'Rajský protlak', category: 'konzervy', icon: '🥫', defaultUnit: 'lžíce', commonQty: 2 },
  { id: 'kukurice', name: 'Kukuřice v plechovce', category: 'konzervy', icon: '🌽', defaultUnit: 'konzerva', commonQty: 1 },
  { id: 'kokosove_mleko', name: 'Kokosové mléko', category: 'konzervy', icon: '🥥', defaultUnit: 'ml', commonQty: 200 },
  { id: 'okurky_sterilovane', name: 'Kyselé sterilované okurky', category: 'konzervy', icon: '🥒', defaultUnit: 'ks', commonQty: 3 },
  { id: 'olivy', name: 'Olivy (černé / zelené)', category: 'konzervy', icon: '🫒', defaultUnit: 'g', commonQty: 100 },
  { id: 'ananas', name: 'Ananas v plechovce', category: 'konzervy', icon: '🍍', defaultUnit: 'konzerva', commonQty: 1 },

  // --- 6. Oleje, Koření & Dochucovadla ---
  { id: 'olej_olivovy', name: 'Olivový olej', category: 'dochucovadla', icon: '🫒', defaultUnit: 'ml', commonQty: 100 },
  { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', category: 'dochucovadla', icon: '🌻', defaultUnit: 'ml', commonQty: 200 },
  { id: 'sul', name: 'Sůl & Pepř', category: 'dochucovadla', icon: '🧂', defaultUnit: 'špetka', commonQty: 1 },
  { id: 'cukr', name: 'Cukr', category: 'dochucovadla', icon: '🍬', defaultUnit: 'g', commonQty: 100 },
  { id: 'vanilkovy_cukr', name: 'Vanilkový cukr / skořice', category: 'dochucovadla', icon: '🧁', defaultUnit: 'sáček', commonQty: 1 },
  { id: 'med', name: 'Med', category: 'dochucovadla', icon: '🍯', defaultUnit: 'lžíce', commonQty: 2 },
  { id: 'sojova_omacka', name: 'Sójová omáčka', category: 'dochucovadla', icon: '🥢', defaultUnit: 'lžíce', commonQty: 2 },
  { id: 'horcice', name: 'Hořčice (plnotučná / kremžská)', category: 'dochucovadla', icon: '🌭', defaultUnit: 'lžíce', commonQty: 2 },
  { id: 'kecup', name: 'Kečup', category: 'dochucovadla', icon: '🍅', defaultUnit: 'lžíce', commonQty: 3 },
  { id: 'tatarka_majoneza', name: 'Tatarská omáčka / Majonéza', category: 'dochucovadla', icon: '🥣', defaultUnit: 'lžíce', commonQty: 3 },
  { id: 'ocet', name: 'Ocet (kvasný / jablečný)', category: 'dochucovadla', icon: '🍾', defaultUnit: 'lžíce', commonQty: 2 },
  { id: 'majoranka', name: 'Majoránka', category: 'dochucovadla', icon: '🌿', defaultUnit: 'lžička', commonQty: 1 },
  { id: 'oregano_bazalka', name: 'Bazalka / Oregano', category: 'dochucovadla', icon: '🌿', defaultUnit: 'lžička', commonQty: 1 },
  { id: 'kmin', name: 'Kmín (drcený / celý)', category: 'dochucovadla', icon: '🌾', defaultUnit: 'lžička', commonQty: 1 },
  { id: 'paprika_mleta', name: 'Mletá paprika sladká', category: 'dochucovadla', icon: '🌶️', defaultUnit: 'lžička', commonQty: 2 },
  { id: 'kari', name: 'Kari koření (Curry)', category: 'dochucovadla', icon: '🍛', defaultUnit: 'lžička', commonQty: 1 },
  { id: 'bobkovy_list', name: 'Bobkový list & Nové koření', category: 'dochucovadla', icon: '🌿', defaultUnit: 'ks', commonQty: 2 },
  { id: 'bujon', name: 'Vývar / Bujón / Masox', category: 'dochucovadla', icon: '🥣', defaultUnit: 'kostka', commonQty: 1 },
  { id: 'kakao', name: 'Kakao holandské', category: 'dochucovadla', icon: '🍫', defaultUnit: 'lžíce', commonQty: 2 }
];

// Předpřipravené balíčky lednice pro okamžitý start
export const FRIDGE_PRESETS = [
  {
    id: 'student',
    title: '🎒 Studentská lednice',
    description: 'Rychlá a levná klasika: těstoviny, vejce, sýr, cibule, kečup a máslo',
    ingredientIds: ['testoviny', 'vejce', 'syr', 'cibule', 'kecup', 'maslo', 'sul', 'olej_rostlinny']
  },
  {
    id: 'ceska_klasika',
    title: '🍳 Česká domácnost',
    description: 'Brambory, cibule, česnek, vejce, mouka, slanina, mléko, kmín a majoránka',
    ingredientIds: ['brambory', 'cibule', 'cesnek', 'vejce', 'mouka_hladka', 'mleko', 'slanina', 'maslo', 'majoranka', 'kmin', 'sul']
  },
  {
    id: 'fitness',
    title: '🥗 Fitness & Zdravý talíř',
    description: 'Kuřecí prsa, vejce, rýže, brokolice, rajčata, tvaroh, ovesné vločky',
    ingredientIds: ['kureci_prsa', 'vejce', 'ryze', 'brokolice', 'rajcata', 'tvaroh', 'vlocky', 'olej_olivovy', 'sul']
  },
  {
    id: 'italsky_vecer',
    title: '🍝 Italská spíž',
    description: 'Těstoviny, krájená rajčata, česnek, olivový olej, parmazán, cibule a bazalka',
    ingredientIds: ['testoviny', 'rajcata_konzerva', 'cesnek', 'olej_olivovy', 'parmazan', 'cibule', 'oregano_bazalka', 'sul']
  }
];
