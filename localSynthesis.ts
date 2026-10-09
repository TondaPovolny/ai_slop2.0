import { FridgeIngredient, Recipe } from '../types/recipe';

// Client-side creative recipe generator that constructs realistic culinary dishes
// from whatever combination of ingredients the user has in their fridge.
export function synthesizeCreativeRecipe(
  fridgeItems: FridgeIngredient[],
  customPreferences?: string
): Recipe {
  const names = fridgeItems.map((i) => i.name.toLowerCase());
  const id = `custom-${Date.now()}`;

  // Smart heuristic based on prominent ingredients
  const hasEggs = names.some((n) => n.includes('vejc') || n.includes('vaj'));
  const hasChicken = names.some((n) => n.includes('kuřecí') || n.includes('kure'));
  const hasPasta = names.some((n) => n.includes('špaget') || n.includes('těstovin') || n.includes('penne'));
  const hasRice = names.some((n) => n.includes('rýž') || n.includes('ryz'));
  const hasPotatoes = names.some((n) => n.includes('brambor'));
  const hasCheese = names.some((n) => n.includes('sýr') || n.includes('parmaz') || n.includes('čedar') || n.includes('mozz'));
  const hasTomatoes = names.some((n) => n.includes('rajč') || n.includes('rajc'));

  let title = 'Kulinářská pánev Šéfkuchaře';
  let description = 'Rychlá a voňavá kompozice připravená na míru z vašich čerstvých ingrediencí.';
  let category: Recipe['category'] = 'obed_vece';
  let prepTime = 20;
  let imageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80';
  let instructions: string[] = [];

  if (hasChicken && hasRice) {
    title = 'Voňavé kuřecí kousky s restovanou rýží a bylinkami';
    description = 'Šťavnaté kuřecí maso orestované dozlatova spojené s jemnou rýží a dostupnou zeleninou.';
    prepTime = 25;
    imageUrl = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80';
    instructions = [
      'Uvařte rýži ve vroucí osolené vodě dle návodu.',
      'Kuřecí maso nakrájejte na sousta, osolte, opepřete a opečte na rozehřátém oleji či másle 5 minut.',
      'Přidejte nakrájenou zeleninu a poduste do křupava.',
      'Smíchejte vše s horkou rýží, dochuťte a podávejte sypané bylinkami.',
    ];
  } else if (hasPasta && (hasTomatoes || hasCheese)) {
    title = 'Středomořské těstoviny z ingrediencí lednice';
    description = 'Horké těstoviny prohřáté s voňavým základem, rajčatovou omáčkou a roztaveným sýrem.';
    prepTime = 18;
    imageUrl = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80';
    instructions = [
      'Těstoviny uvařte v bohatě osolené vodě al dente.',
      'Na pánvi orestujte cibulku, česnek a rajčata na kapce oleje.',
      'Těstoviny sceďte přímo do pánve k rajčatovému základu.',
      'Vmíchejte kousek másla nebo sýr pro krémové propojení omáčky a servírujte.',
    ];
  } else if (hasEggs && hasPotatoes) {
    title = 'Sedlácká bramborová pánev s vejci a bylinkami';
    description = 'Vydatné a křupavé pečené brambory přelité čerstvými vejci a posypané čerstvými přísadami.';
    prepTime = 22;
    imageUrl = 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80';
    instructions = [
      'Brambory nakrájejte na tenké plátky a opečte na pánvi na másle či oleji dozlatova.',
      'Přidejte cibuli nebo další zeleninu z lednice a opékejte další 3 minuty.',
      'Rozklepněte vejce přímo do pánve a nechte zatuhnout bílky.',
      'Osolte, opepřete a ihned podávejte přímo z pánve.',
    ];
  } else if (hasEggs) {
    title = 'Farmářská míchaná vajíčka s ingrediencemi z lednice';
    description = 'Hedvábná krémová vejce obohacená o dostupné suroviny a bylinky pro ideální start dne i večeři.';
    category = 'snidane';
    prepTime = 10;
    imageUrl = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80';
    instructions = [
      'Na mírném plamenu rozpusťte v pánvi kousek másla.',
      'V misce jemně prošlehejte vejce se špetkou soli a pepře.',
      'Vlijte do pánve a pomalu stírejte stěrkou ode dna, dokud nevznikne sametová textura.',
      'Přidejte sýr nebo zeleninu těsně před dokončením a odstavte.',
    ];
  } else {
    title = `Speciální pánev z ${fridgeItems.slice(0, 3).map((f) => f.name).join(' a ')}`;
    description = 'Chutná a rychlá kombinace vytvořená z aktuálních surovin vaší lednice.';
    prepTime = 20;
    instructions = [
      'Všechny dostupné suroviny očistěte a pokrájejte na rovnoměrné kousky.',
      'Na pánvi rozpalte tuk a postupně restujte od tvrdších surovin po měkčí.',
      'Dochuťte solí, pepřem a dostupným kořením ze spíže.',
      'Servírujte horké jako rychlé a vyvážené jídlo bez plýtvání.',
    ];
  }

  const recipeIngredients = fridgeItems.slice(0, 6).map((item) => ({
    name: item.name,
    amount: item.amount || 'dle chuti',
  }));

  return {
    id,
    title: customPreferences ? `${title} (${customPreferences})` : title,
    description,
    category,
    prepTime,
    difficulty: 'Snadné',
    portions: 2,
    calories: 410,
    macros: { protein: 24, carbs: 38, fat: 18 },
    tags: ['Na míru z lednice', 'Zero waste', 'Rychlovka'],
    imageUrl,
    ingredients: recipeIngredients,
    instructions,
    chefTip: 'Využitím všech zbytků z lednice šetříte peníze i životní prostředí a objevujete nové skvělé chutě!',
    isCustom: true,
  };
}
