/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Rozsáhlá databáze receptů s přesným párováním surovin a výhradně celými čísly
export const RECIPES_DATA = [
  {
    id: 'bramboraky',
    title: 'Křupavé české bramboráky',
    description: 'Tradiční voňavé placky s česnekem a majoránkou. Zlatavé zvenku, vláčné uvnitř.',
    category: 'ceska',
    tags: ['Česká klasika', 'Levné jídlo', 'Rychlovka do 30 min', 'Vegetariánské'],
    prepTime: 15,
    cookTime: 15,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 12,
    calories: 340,
    ingredients: [
      { id: 'brambory', name: 'Brambory', amount: 800, unit: 'g', note: 'oloupané a jemně nastrouhané' },
      { id: 'cesnek', name: 'Česnek', amount: 4, unit: 'stroužků', note: 'prolisovaný' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks', note: 'najemno nakrájená' },
      { id: 'vejce', name: 'Vejce', amount: 2, unit: 'ks' },
      { id: 'mouka_hladka', name: 'Hladká mouka', amount: 4, unit: 'lžíce' },
      { id: 'mleko', name: 'Mléko', amount: 50, unit: 'ml', note: 'zabrání ztmavnutí brambor' },
      { id: 'majoranka', name: 'Majoránka', amount: 2, unit: 'lžíce', staple: true },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 100, unit: 'ml', staple: true, note: 'na smažení' }
    ],
    instructions: [
      'Brambory oloupejte a nastrouhejte najemno (nebo půlku nahrubo pro křupavost). Vymačkejte přebytečnou vodu.',
      'K bramborám přilijte horké mléko, aby nezhnědly.',
      'Přidejte vejce, prolisovaný česnek, najemno pokrájenou cibulku, sůl, pepř a pořádnou dávku v dlaních promnuté majoránky.',
      'Zahustěte hladkou moukou a promíchejte v těsto střední hustoty.',
      'Na pánvi rozpalte dostatek oleje nebo sádla a smažte tenké placky z obou stran dozlatova (cca 3 minuty z každé strany).',
      'Nechte okapat na papírovém ubrousku a podávejte ještě horké.'
    ],
    tips: 'Pokud máte v lednici zbytek uzeného masa nebo slaniny, nakrájejte je na kostičky a přihoďte do těsta!'
  },

  {
    id: 'smazeny_syr',
    title: 'Poctivý smažený sýr s vařenými brambory',
    description: 'Česká hospodská stálice. Rozteklý sýr v křupavém trojobalu s vařenými brambory.',
    category: 'ceska',
    tags: ['Česká klasika', 'Rychlovka do 30 min', 'Oblíbené'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 8,
    calories: 680,
    ingredients: [
      { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', amount: 250, unit: 'g', note: 'silnější plátky' },
      { id: 'brambory', name: 'Brambory', amount: 500, unit: 'g', note: 'příloha' },
      { id: 'vejce', name: 'Vejce', amount: 2, unit: 'ks' },
      { id: 'mouka_hladka', name: 'Hladká mouka', amount: 4, unit: 'lžíce' },
      { id: 'strouhanka', name: 'Strouhanka', amount: 80, unit: 'g' },
      { id: 'tatarka_majoneza', name: 'Tatarská omáčka / Majonéza', amount: 4, unit: 'lžíce' },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 120, unit: 'ml', staple: true },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Brambory oškrábejte, nakrájejte na kousky a dejte vařit do osolené vody s kmínem na 15–20 minut.',
      'Sýr nakrájejte na cca 1,5 cm silné plátky.',
      'Připravte si trojobal: hladká mouka, rozšlehaná osolená vejce s trochou mléka a strouhanka.',
      'KLÍČOVÝ TRIK: Obalte sýr v mouce, vejci, strouhance, a pak JEŠTĚ JEDNOU ve vejci a strouhance (dvojitý obal zabrání vytečení).',
      'Na pánvi rozpalte vyšší vrstvu oleje a smažte zprudka 2–3 minuty z každé strany dozlatova.',
      'Podávejte ihned s horkými maštěnými brambory a tatarskou omáčkou.'
    ],
    tips: 'Dvojitý obal je záruka, že sýr nevyteče do oleje. Obalený sýr můžete před smažením dát na 10 minut do mrazáku.'
  },

  {
    id: 'spagety_carbonara',
    title: 'Špagety Carbonara (rychlá verze)',
    description: 'Skvělé krémové těstoviny ze surovin, které máte běžně doma – vajíčka, sýr a slanina.',
    category: 'zahranicni',
    tags: ['Rychlovka do 20 min', 'Těstoviny', 'Levné jídlo'],
    prepTime: 5,
    cookTime: 12,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 10,
    calories: 520,
    ingredients: [
      { id: 'testoviny', name: 'Těstoviny (špagety, penne)', amount: 250, unit: 'g' },
      { id: 'slanina', name: 'Slanina / Anglická slanina / Špek', amount: 120, unit: 'g', note: 'nakrájená na nudličky' },
      { id: 'vejce', name: 'Vejce', amount: 3, unit: 'ks', note: '2 celá vejce + 1 žloutek' },
      { id: 'parmazan', name: 'Parmazán / Grana Padano', amount: 50, unit: 'g', note: 'lze nahradit eidamem' },
      { id: 'cesnek', name: 'Česnek', amount: 1, unit: 'stroužků', note: 'pro vůni' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Špagety dejte vařit do vroucí osolené vody podle návodu (cca 9 minut al dente).',
      'Na pánvi na mírném ohni vyškvařte slaninu dokřupava společně s jedním rozmáčknutým stroužkem česneku.',
      'V misce prošlehejte vejce s nastrouhaným sýrem a čerstvě mletým černým pepřem.',
      'Uvařené těstoviny přendejte kleštěmi přímo do pánve se slaninou. Pánev STÁHNĚTE Z OHNĚ (důležité!).',
      'Přilijte vaječnou směs s trochou horké vody z těstovin a rychle míchejte – vznikne hedvábná krémová omáčka.',
      'Ihned servírujte s čerstvým pepřem a posypané sýrem.'
    ],
    tips: 'Nikdy nepřidávejte vejce na vroucí pánev, jinak budete mít míchaná vajíčka s těstovinami. Teplo horkých těstovin mimo plamen stačí.'
  },

  {
    id: 'zapecene_testoviny',
    title: 'Zapečené těstoviny s uzeným masem a vejcem',
    description: 'Klasika babiččiny kuchyně. Zapečená kolínka s uzeným masem nebo šunkou, zalitá vajíčky a smetanou.',
    category: 'ceska',
    tags: ['Česká klasika', 'Zbytky z lednice', 'Zapečené'],
    prepTime: 10,
    cookTime: 30,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 28,
    calories: 490,
    ingredients: [
      { id: 'testoviny', name: 'Těstoviny (špagety, penne, kolínka)', amount: 350, unit: 'g' },
      { id: 'uzene_maso', name: 'Uzené maso (vařené / pečené)', amount: 250, unit: 'g', note: 'nebo šunka či klobása' },
      { id: 'vejce', name: 'Vejce', amount: 4, unit: 'ks' },
      { id: 'mleko', name: 'Mléko', amount: 150, unit: 'ml', note: 'nebo smetana' },
      { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', amount: 120, unit: 'g' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'maslo', name: 'Máslo', amount: 30, unit: 'g' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Těstoviny uvařte v osolené vodě doměkka a sceďte.',
      'Cibuli nakrájejte najemno a orestujte na másle dorůžova. Přidejte na kostičky nakrájené uzené maso.',
      'V zapékací míse promíchejte těstoviny s orestovaným masem a cibulkou.',
      'V misce rozšlehejte vejce s mlékem, solí a pepřem a rovnoměrně přelijte těstoviny.',
      'Navrch nasypte nastrouhaný sýr a pečte v troubě vyhřáté na 190 °C cca 25–30 minut dozlatova.',
      'Podávejte s kyselou sterilovanou okurkou.'
    ],
    tips: 'Skvělý recept na zpracování zbytků těstovin i pečeného masa z víkendu.'
  },

  {
    id: 'kure_na_paprice',
    title: 'Krémové kuře na paprice s těstovinami',
    description: 'Oblíbená jemná smetanová omáčka s voňavou paprikou a měkkým kuřecím masem.',
    category: 'ceska',
    tags: ['Česká klasika', 'Drůbež', 'Omáčka'],
    prepTime: 15,
    cookTime: 25,
    difficulty: 'Střední',
    defaultServings: 4,
    timerMinutes: 20,
    calories: 510,
    ingredients: [
      { id: 'kureci_prsa', name: 'Kuřecí prsa / řízky', amount: 500, unit: 'g', note: 'nakrájené na kostky' },
      { id: 'cibule', name: 'Cibule', amount: 2, unit: 'ks' },
      { id: 'paprika_mleta', name: 'Mletá paprika sladká', amount: 2, unit: 'lžička' },
      { id: 'smetana', name: 'Smetana na vaření (12%)', amount: 200, unit: 'ml' },
      { id: 'maslo', name: 'Máslo', amount: 40, unit: 'g' },
      { id: 'mouka_hladka', name: 'Hladká mouka', amount: 2, unit: 'lžíce' },
      { id: 'testoviny', name: 'Těstoviny (špagety, penne, kolínka)', amount: 400, unit: 'g', note: 'příloha' },
      { id: 'bujon', name: 'Vývar / Bujón / Masox', amount: 1, unit: 'kostka' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Na másle s kapkou oleje orestujte najemno nakrájenou cibuli dosklovata.',
      'Přidejte osolené kuřecí maso a opečte ze všech stran.',
      'Stáhněte plamen, zasypte sladkou paprikou, krátce (15 sekund) promíchejte a ihned zalijte 400 ml horkého vývaru.',
      'Duste pod pokličkou 15 minut, dokud není maso dokonale měkké.',
      'Ve smetaně rozmíchejte hladkou mouku, vlijte do omáčky a za stálého míchání povařte 5 minut do zhoustnutí.',
      'Uvařte těstoviny a podávejte s voňavou omáčkou.'
    ],
    tips: 'Papriku nikdy nesmažte zprudka, zhořkla by. Jakmile ji vsypete, hned zalijte tekutinou.'
  },

  {
    id: 'cesnecka',
    title: 'Vyprošťovací česnečka s krutony a sýrem',
    description: 'Horká, poctivě česneková polévka se sýrem a křupavými krutony z oschlého chleba.',
    category: 'ceska',
    tags: ['Polévka', 'Levné jídlo', 'Rychlovka do 30 min', 'Česká klasika'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 15,
    calories: 260,
    ingredients: [
      { id: 'cesnek', name: 'Česnek', amount: 8, unit: 'stroužků', note: 'část vařená, část čerstvá na konec' },
      { id: 'brambory', name: 'Brambory', amount: 350, unit: 'g', note: 'na malé kostičky' },
      { id: 'chleb', name: 'Chléb / Pečivo (i starší)', amount: 3, unit: 'krajíců', note: 'na krutony' },
      { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', amount: 100, unit: 'g', note: 'nastrouhaný do talíře' },
      { id: 'slanina', name: 'Slanina / Anglická slanina / Špek', amount: 70, unit: 'g', note: 'nebo lžíce sádla' },
      { id: 'majoranka', name: 'Majoránka', amount: 2, unit: 'lžička', staple: true },
      { id: 'kmin', name: 'Kmín (drcený / celý)', amount: 1, unit: 'lžička', staple: true },
      { id: 'bujon', name: 'Vývar / Bujón / Masox', amount: 1, unit: 'kostka' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Brambory nakrájejte na malé kostičky a dejte vařit do 1 litru vody s kmínem, solí, bujónem a 3 prolisovanými stroužky česneku.',
      'Vařte cca 12 minut doměkka.',
      'Mezitím nakrájejte starší chléb na kostičky a na pánvi se slaninou opečte dokřupava.',
      'Když jsou brambory měkké, polévku vypněte. Přidejte zbylý čerstvý prolisovaný česnek (pro sílu) a rozemnutou majoránku.',
      'Do hlubokých talířů nasypte strouhaný sýr, přelijte horkou česnečkou a zasypte křupavými krutony.'
    ],
    tips: 'Záchrana pro starý suchý chleba. Čerstvý česnek přidaný až po dovaření dodá polévce ten pravý říz.'
  },

  {
    id: 'krupicova_kase',
    title: 'Krupicová kaše s máslem a kakaem',
    description: 'Nostalgická sladká večeře z dětství, hotová za 10 minut z mléka a dětské krupičky.',
    category: 'ceska',
    tags: ['Sladké jídlo', 'Rychlovka do 15 min', 'Levné jídlo', 'Vegetariánské'],
    prepTime: 2,
    cookTime: 8,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 6,
    calories: 410,
    ingredients: [
      { id: 'mleko', name: 'Mléko', amount: 500, unit: 'ml' },
      { id: 'krupice', name: 'Dětská krupice / Krupička', amount: 60, unit: 'g', note: 'cca 5 lžic' },
      { id: 'cukr', name: 'Cukr', amount: 2, unit: 'lžíce' },
      { id: 'maslo', name: 'Máslo', amount: 40, unit: 'g', note: 'rozpuštěné navrch' },
      { id: 'kakao', name: 'Kakao holandské', amount: 2, unit: 'lžíce' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Do kastrůlku nalijte mléko, přidejte špetku soli a vsypte krupici.',
      'Za stálého míchání metličkou přiveďte k varu – krupice začne rychle houstnout.',
      'Na mírném plameni míchejte cca 3 minuty, dokud kaše nezíská hedvábnou hustotu.',
      'Vlijte do talířů, posypte cukrem a kakaem (nebo skořicí).',
      'Přelijte bohatě rozpuštěným voňavým máslem a podávejte.'
    ],
    tips: 'Pokud máte jablka nebo banán, nakrájejte je navrch pro skvělou ovocnou verzi!'
  },

  {
    id: 'bramboracka',
    title: 'Poctivá bramboračka s houbami a zeleninou',
    description: 'Hustá česká polévka s kořenovou zeleninou, bramborami, houbami a česnekem.',
    category: 'ceska',
    tags: ['Polévka', 'Česká klasika', 'Vegetariánské'],
    prepTime: 15,
    cookTime: 25,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 20,
    calories: 220,
    ingredients: [
      { id: 'brambory', name: 'Brambory', amount: 400, unit: 'g' },
      { id: 'mrkev', name: 'Mrkev', amount: 2, unit: 'ks' },
      { id: 'celer', name: 'Celer (kořenový / řapíkatý)', amount: 100, unit: 'g' },
      { id: 'petrzel', name: 'Petržel kořenová', amount: 1, unit: 'ks' },
      { id: 'zampiony', name: 'Žampiony / Lesní houby', amount: 150, unit: 'g', note: 'čerstvé nebo sušené' },
      { id: 'cesnek', name: 'Česnek', amount: 4, unit: 'stroužků' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'maslo', name: 'Máslo', amount: 30, unit: 'g' },
      { id: 'mouka_hladka', name: 'Hladká mouka', amount: 2, unit: 'lžíce' },
      { id: 'majoranka', name: 'Majoránka', amount: 2, unit: 'lžička', staple: true },
      { id: 'kmin', name: 'Kmín (drcený / celý)', amount: 1, unit: 'lžička', staple: true },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Na másle orestujte nakrájenou cibuli a očištěnou zeleninu (mrkev, celer, petržel) nakrájenou na kostičky.',
      'Zasypte moukou a umíchejte světlou jíšku.',
      'Za stálého míchání zalijte 1,2 litrem vody nebo vývaru, přidejte kmín, sůl a přiveďte k varu.',
      'Přidejte na kostičky nakrájené brambory a houby. Vařte 15–20 minut doměkka.',
      'Před koncem přidejte prolisovaný česnek a v dlaních rozemnutou majoránku. Krátce provařte a podávejte s chlebem.'
    ],
    tips: 'Druhý den je bramboračka ještě lepší, když se všechny chutě rozleží.'
  },

  {
    id: 'vajickova_pomazanka',
    title: 'Tradiční vajíčková pomazánka na chléb',
    description: 'Rychlá a lahodná pomazánka z vařených vajec, másla, hořčice a cibulky.',
    category: 'ceska',
    tags: ['Snídaně & Svačina', 'Rychlovka do 15 min', 'Vegetariánské'],
    prepTime: 10,
    cookTime: 10,
    difficulty: 'Snadné',
    defaultServings: 3,
    timerMinutes: 9,
    calories: 280,
    ingredients: [
      { id: 'vejce', name: 'Vejce', amount: 5, unit: 'ks', note: 'uvařená natvrdo' },
      { id: 'maslo', name: 'Máslo', amount: 70, unit: 'g', note: 'změklé' },
      { id: 'horcice', name: 'Hořčice (plnotučná / kremžská)', amount: 2, unit: 'lžička' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks', note: 'nebo jarní cibulka' },
      { id: 'lucina', name: 'Lučina / Pomazánkové máslo / Žervé', amount: 80, unit: 'g', note: 'nebo lžíce tatarky' },
      { id: 'chleb', name: 'Chléb / Pečivo (i starší)', amount: 4, unit: 'krajíců' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Vejce uvařte natvrdo (9 minut), zchlaďte ve studené vodě a oloupejte.',
      'Žloutky v misce rozmačkejte vidličkou se změklým máslem, lučinou (nebo tvarohem) a hořčicí dohladka.',
      'Bílky a cibulku nakrájejte najemno a vmíchejte do pomazánky.',
      'Osolte, opepřete a důkladně promíchejte.',
      'Namažte na čerstvý nebo opečený chléb a posypte jarní cibulkou nebo petrželkou.'
    ],
    tips: 'Pokud máte v lednici zbytek taveného sýra nebo kyselou okurku, nakrájejte je dovnitř – dodá to skvělý šmrnc!'
  },

  {
    id: 'segedin',
    title: 'Rychlý segedínský guláš se smetanou',
    description: 'Šťavnaté maso s kysaným zelím, zjemněné smetanou. Skvělé s houskovým knedlíkem nebo chlebem.',
    category: 'ceska',
    tags: ['Česká klasika', 'Kysané zelí', 'Syté jídlo'],
    prepTime: 15,
    cookTime: 35,
    difficulty: 'Střední',
    defaultServings: 4,
    timerMinutes: 30,
    calories: 560,
    ingredients: [
      { id: 'veprove_maso', name: 'Vepřové maso (plec / krkovice)', amount: 500, unit: 'g', note: 'na kostky' },
      { id: 'zeli_kysane', name: 'Kysané zelí', amount: 400, unit: 'g', note: 'překrájené' },
      { id: 'cibule', name: 'Cibule', amount: 2, unit: 'ks' },
      { id: 'smetana', name: 'Smetana na vaření (12%)', amount: 150, unit: 'ml' },
      { id: 'paprika_mleta', name: 'Mletá paprika sladká', amount: 2, unit: 'lžíce' },
      { id: 'kmin', name: 'Kmín (drcený / celý)', amount: 1, unit: 'lžička' },
      { id: 'mouka_hladka', name: 'Hladká mouka', amount: 2, unit: 'lžíce' },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 30, unit: 'ml', staple: true },
      { id: 'knedlik', name: 'Houskový / kynutý knedlík', amount: 4, unit: 'plátků', note: 'nebo chléb' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Na sádle nebo oleji orestujte cibuli dozlatova.',
      'Přidejte osolené vepřové maso a zprudka opečte, aby se zatáhlo.',
      'Přisypte papriku a kmín, krátce promíchejte a zalijte 400 ml vody.',
      'Duste pod pokličkou 20 minut, poté přidejte překrájené kysané zelí a vařte dalších 15 minut do změknutí.',
      'Ve smetaně rozmíchejte mouku, vlijte do guláše a povařte 5 minut do krémového zhoustnutí.',
      'Podávejte s houskovým knedlíkem nebo čerstvým chlebem.'
    ],
    tips: 'Pokud máte rádi pikantnější chuť, přidejte půl lžičky pálivé papriky nebo feferonku.'
  },

  {
    id: 'knedliky_s_vejcem',
    title: 'Knedlíky s vajíčkem a kyselou okurkou',
    description: 'Nejlepší záchrana zbylého houskového knedlíku. Opečené dozlatova s vajíčky a cibulkou.',
    category: 'ceska',
    tags: ['Zbytky z lednice', 'Rychlovka do 15 min', 'Levné jídlo'],
    prepTime: 5,
    cookTime: 10,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 8,
    calories: 420,
    ingredients: [
      { id: 'knedlik', name: 'Houskový / kynutý knedlík', amount: 6, unit: 'plátků', note: 'nakrájený na kostičky' },
      { id: 'vejce', name: 'Vejce', amount: 4, unit: 'ks' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'maslo', name: 'Máslo', amount: 30, unit: 'g', note: 'nebo sádlo' },
      { id: 'okurky_sterilovane', name: 'Kyselé sterilované okurky', amount: 3, unit: 'ks', note: 'k podávání' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Zbylé knedlíky nakrájejte na centimetrové kostičky.',
      'Na pánvi rozpusťte máslo a orestujte najemno nakrájenou cibulku dorůžova.',
      'Přisypte kostičky knedlíků a opékejte za občasného promíchání, dokud nebudou mít křupavou kůrčičku.',
      'V misce vidličkou rozkvedlejte vejce se solí a pepřem a nalijte na knedlíky.',
      'Míchejte jen krátce, aby vajíčka zůstala vláčná a nevysušila se.',
      'Servírujte ihned s kyselou okurkou.'
    ],
    tips: 'Máte v lednici kousek slaniny nebo šunky? Opečte ji na pánvi ještě před knedlíky!'
  },

  {
    id: 'francouzske_brambory',
    title: 'Poctivé francouzské brambory se slaninou',
    description: 'Vrstvy vařených brambor, uzeniny a cibule, zapečené pod vaječnou smetanou a sýrem.',
    category: 'ceska',
    tags: ['Zapečené', 'Česká klasika', 'Syté jídlo'],
    prepTime: 15,
    cookTime: 35,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 30,
    calories: 540,
    ingredients: [
      { id: 'brambory', name: 'Brambory', amount: 800, unit: 'g', note: 'předvařené ve slupce' },
      { id: 'parky', name: 'Párky / Špekáčky / Uzenina', amount: 3, unit: 'ks', note: 'nebo uzené maso' },
      { id: 'slanina', name: 'Slanina / Anglická slanina / Špek', amount: 100, unit: 'g' },
      { id: 'cibule', name: 'Cibule', amount: 2, unit: 'ks' },
      { id: 'vejce', name: 'Vejce', amount: 4, unit: 'ks' },
      { id: 'smetana', name: 'Smetana na vaření (12%)', amount: 150, unit: 'ml' },
      { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', amount: 100, unit: 'g' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Brambory uvařte ve slupce doměkka (cca 20 minut), nechte vychladnout, oloupejte a nakrájejte na plátky.',
      'Cibuli a slaninu orestujte na pánvi. Uzeninu nakrájejte na kolečka.',
      'Do vymazaného pekáče střídavě vrstvěte plátky brambor, cibuli, slaninu a uzeninu. Každou vrstvu brambor osolte a opepřete.',
      'V misce rozšlehejte vejce se smetanou a trochou soli a rovnoměrně zalijte celý pekáč.',
      'Posypte strouhaným sýrem a pečte při 190 °C cca 30–35 minut dozlatova.',
      'Podávejte s kyselou okurkou nebo zelným salátem.'
    ],
    tips: 'Skvělý způsob jak využít zbylé vařené brambory z předešlého dne.'
  },

  {
    id: 'kvetakovy_mozecek',
    title: 'Květákový mozeček s vařeným bramborem',
    description: 'Tradiční lehká česká večeře z květáku, cibulky a vajec s vařeným novým bramborem.',
    category: 'ceska',
    tags: ['Bezmasé', 'Rychlovka do 25 min', 'Česká klasika'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 12,
    calories: 310,
    ingredients: [
      { id: 'kvetak', name: 'Květák', amount: 1, unit: 'ks', note: 'rozebraný na růžičky' },
      { id: 'brambory', name: 'Brambory', amount: 500, unit: 'g', note: 'příloha' },
      { id: 'vejce', name: 'Vejce', amount: 4, unit: 'ks' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'maslo', name: 'Máslo', amount: 40, unit: 'g' },
      { id: 'kmin', name: 'Kmín (drcený / celý)', amount: 1, unit: 'lžička' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Brambory oškrábejte a dejte vařit do osolené vody s kmínem.',
      'Květák rozeberte na malé růžičky a povařte v osolené vodě 5–7 minut dopolovařitelná, poté sceďte.',
      'Na pánvi rozehřejte máslo a osmažte najemno nakrájenou cibulku dorůžova.',
      'Přidejte předvařený květák a vidličkou nebo vařečkou ho rozmačkejte na menší kousky.',
      'Vlijte rozšlehaná osolená vejce a míchejte do krémového ztuhnutí.',
      'Podávejte s horkými vařenými brambory sypanými petrželkou.'
    ],
    tips: 'Květák nerozvařte v prvním kroku na kaši, měl by si zachovat lehkou strukturu.'
  },

  {
    id: 'hrachova_kase',
    title: 'Hrachová kaše s cibulkou a opečeným párkem',
    description: 'Hustá sytá kaše ze žlutého hrachu s voňavou smaženou cibulkou a opečeným párkem.',
    category: 'ceska',
    tags: ['Luštěniny', 'Levné jídlo', 'Česká klasika'],
    prepTime: 10,
    cookTime: 40,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 35,
    calories: 460,
    ingredients: [
      { id: 'hrach', name: 'Hrach žlutý / zelený', amount: 400, unit: 'g' },
      { id: 'parky', name: 'Párky / Špekáčky / Uzenina', amount: 4, unit: 'ks', note: 'nebo plátek uzeného' },
      { id: 'cibule', name: 'Cibule', amount: 2, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 3, unit: 'stroužků' },
      { id: 'maslo', name: 'Máslo', amount: 40, unit: 'g', note: 'nebo sádlo' },
      { id: 'majoranka', name: 'Majoránka', amount: 2, unit: 'lžička', staple: true },
      { id: 'okurky_sterilovane', name: 'Kyselé sterilované okurky', amount: 4, unit: 'ks' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Hrách propláchněte a uvařte ve vodě doměkka (cca 35–45 minut).',
      'Uvařený hrách rozmixujte ponorným mixérem na hladkou krémovou kaši (podle potřeby přilijte trochu vody nebo mléka).',
      'Dochuťte solí, pepřem, prolisovaným česnekem a rozemnutou majoránkou.',
      'Na pánvi na másle nebo sádle osmažte nakrájenou cibuli dokřupava a dozlatova.',
      'Párky podélně nařízněte a opečte na pánvi.',
      'Kaši nandejte na talíř, bohatě zasypte křupavou cibulkou a podávejte s párkem a kyselou okurkou.'
    ],
    tips: 'Pokud použijete loupaný půlený hrách, nemusíte ho předem namáčet a uvaří se rychleji.'
  },

  {
    id: 'zapeceny_hermelin',
    title: 'Zapečený hermelín s česnekem a křupavým chlebem',
    description: 'Rychlá a dekadentní večeře. Horký tekoucí sýr s bylinkami a opečenými toasty.',
    category: 'ceska',
    tags: ['Rychlovka do 20 min', 'Sýry', 'Vegetariánské'],
    prepTime: 5,
    cookTime: 12,
    difficulty: 'Snadné',
    defaultServings: 1,
    timerMinutes: 10,
    calories: 430,
    ingredients: [
      { id: 'hermelin', name: 'Hermelín / Camembert', amount: 1, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 1, unit: 'stroužků' },
      { id: 'olej_olivovy', name: 'Olivový olej', amount: 1, unit: 'lžíce' },
      { id: 'oregano_bazalka', name: 'Bazalka / Oregano', amount: 1, unit: 'lžička' },
      { id: 'chleb', name: 'Chléb / Pečivo (i starší)', amount: 2, unit: 'krajíců' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Hermelín položte na kousek alobalu nebo do malé zapékací misky.',
      'Na horní straně sýr mřížkovitě nařízněte do hloubky cca 3 mm.',
      'Do zářezů vložte tenké plátky česneku, posypte bylinkami, kapkou pepře a zakápněte olivovým olejem.',
      'Pečte v troubě vyhřáté na 200 °C po dobu 10–12 minut, dokud se sýr uvnitř nerozpustí a nenafoukne.',
      'Mezitím opečte krajíce chleba v topinkovači nebo na suché pánvi.',
      'Podávejte ihned, kdy se horký sýr nabírá křupavým chlebem.'
    ],
    tips: 'Skvěle se k tomu hodí brusinky, med nebo zbytek vlašských ořechů.'
  },

  {
    id: 'sopsky_salat',
    title: 'Tradiční šopský salát s balkánským sýrem',
    description: 'Svěží letní salát ze šťavnaté zeleniny, bohatě zasypaný slaným balkánským sýrem.',
    category: 'zahranicni',
    tags: ['Salát', 'Rychlovka do 15 min', 'Vegetariánské', 'Zdravé'],
    prepTime: 10,
    cookTime: 0,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 0,
    calories: 210,
    ingredients: [
      { id: 'rajcata', name: 'Rajčata', amount: 3, unit: 'ks' },
      { id: 'okurka', name: 'Salátová okurka', amount: 1, unit: 'ks' },
      { id: 'paprika', name: 'Paprika', amount: 2, unit: 'ks' },
      { id: 'cervena_cibule', name: 'Červená cibule', amount: 1, unit: 'ks', note: 'nebo jarní cibulka' },
      { id: 'balkansky_syr', name: 'Balkánský sýr / Feta', amount: 150, unit: 'g', note: 'nastrouhaný nahrubo' },
      { id: 'olej_olivovy', name: 'Olivový olej', amount: 2, unit: 'lžíce' },
      { id: 'ocet', name: 'Ocet (kvasný / jablečný)', amount: 1, unit: 'lžíce' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Okurku, rajčata i papriky omyjte a nakrájejte na stejnoměrné kostičky.',
      'Cibuli nakrájejte najemno.',
      'V míse zeleninu lehce promíchejte s olivovým olejem, kapkou octa a pepřem (se solí opatrně, balkánský sýr je slaný dost).',
      'Rozdělte do misek a navrch nahrubo nastrouhejte štědrou vrstvu balkánského sýra.',
      'Podávejte samostatně nebo s pečivem.'
    ],
    tips: 'Zeleninu nechte 5 minut odležet při pokojové teplotě, aby pustila lahodnou šťávu.'
  },

  {
    id: 'karbanatky',
    title: 'Domácí šťavnaté karbanátky s bramborovou kaší',
    description: 'Poctivé karbanátky z mletého masa s česnekem a majoránkou, podávané s jemnou bramborovou kaší.',
    category: 'ceska',
    tags: ['Česká klasika', 'Mleté maso', 'Oblíbené'],
    prepTime: 15,
    cookTime: 20,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 16,
    calories: 590,
    ingredients: [
      { id: 'mlete_maso', name: 'Mleté maso (mix / hovězí)', amount: 500, unit: 'g' },
      { id: 'brambory', name: 'Brambory', amount: 800, unit: 'g', note: 'na kaši' },
      { id: 'mleko', name: 'Mléko', amount: 150, unit: 'ml' },
      { id: 'maslo', name: 'Máslo', amount: 50, unit: 'g' },
      { id: 'vejce', name: 'Vejce', amount: 1, unit: 'ks' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 3, unit: 'stroužků' },
      { id: 'strouhanka', name: 'Strouhanka', amount: 60, unit: 'g' },
      { id: 'majoranka', name: 'Majoránka', amount: 2, unit: 'lžička', staple: true },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 60, unit: 'ml', staple: true },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Brambory oškrábejte a dejte vařit do osolené vody doměkka.',
      'V míse smíchejte mleté maso, vejce, najemno pokrájenou cibuli, prolisovaný česnek, majoránku, sůl a pepř.',
      'Zahustěte strouhankou a vypracujte kompaktní směs. Vytvarujte plošší karbanátky a lehce je obalte ve strouhance.',
      'Na pánvi rozehřejte olej a smažte karbanátky z obou stran dozlatova (cca 6–8 minut z každé strany).',
      'Uvařené brambory sceďte, přidejte máslo a horké mléko a vyšlehejte do sametové kaše.',
      'Podávejte s kyselou okurkou.'
    ],
    tips: 'Mleté maso můžete zvláčnit tím, že do něj přidáte rohlík namočený v mléce.'
  },

  {
    id: 'testoviny_s_nivou',
    title: 'Krémové těstoviny se sýrem Niva a smetanou',
    description: 'Výrazná, rychlá a lahodná omáčka hotová za 12 minut, která potěší každého milovníka sýrů.',
    category: 'zahranicni',
    tags: ['Těstoviny', 'Rychlovka do 15 min', 'Sýry'],
    prepTime: 5,
    cookTime: 10,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 9,
    calories: 510,
    ingredients: [
      { id: 'testoviny', name: 'Těstoviny (špagety, penne, kolínka)', amount: 250, unit: 'g' },
      { id: 'niva', name: 'Niva / Sýr s modrou plísní', amount: 120, unit: 'g', note: 'rozdrobená' },
      { id: 'smetana', name: 'Smetana na vaření (12%)', amount: 200, unit: 'ml' },
      { id: 'cesnek', name: 'Česnek', amount: 1, unit: 'stroužků' },
      { id: 'maslo', name: 'Máslo', amount: 20, unit: 'g' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Těstoviny uvařte ve vroucí osolené vodě al dente.',
      'V kastrůlku rozpusťte máslo, přidejte prolisovaný česnek a nechte rozvonět (stačí 20 sekund).',
      'Vlijte smetanu a přiveďte k mírnému varu.',
      'Do horké smetany vsypte rozdrobenou Nivu a na mírném ohni míchejte, dokud se sýr úplně nerozpustí.',
      'Opepřete (solit není třeba, Niva je velmi slaná).',
      'Scezené těstoviny promíchejte s horkou omáčkou a ihned podávejte.'
    ],
    tips: 'Máte vlašské ořechy? Nasekejte pár jader navrch, kombinace Nivy a ořechů je fantastická!'
  },

  {
    id: 'chleb_ve_vajicku',
    title: 'Zlatavý chléb ve vajíčku s hořčicí a cibulkou',
    description: 'Dokonalá rychlá večeře ze staršího chleba obaleného ve vajíčku a osmaženého dozlatova.',
    category: 'ceska',
    tags: ['Zbytky z lednice', 'Rychlovka do 10 min', 'Levné jídlo'],
    prepTime: 3,
    cookTime: 6,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 5,
    calories: 320,
    ingredients: [
      { id: 'chleb', name: 'Chléb / Pečivo (i starší)', amount: 4, unit: 'krajíců' },
      { id: 'vejce', name: 'Vejce', amount: 3, unit: 'ks' },
      { id: 'mleko', name: 'Mléko', amount: 30, unit: 'ml', note: 'pro zvláčnění' },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 40, unit: 'ml', staple: true },
      { id: 'horcice', name: 'Hořčice (plnotučná / kremžská)', amount: 2, unit: 'lžíce' },
      { id: 'jarni_cibulka', name: 'Jarní cibulka', amount: 1, unit: 'svazek', note: 'nebo cibule' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'V hlubokém talíři vidličkou rozšlehejte vejce se lžící mléka, špetkou soli a pepře.',
      'Krajíce staršího chleba z obou stran důkladně obalte a nechte vejce mírně nasáknout.',
      'Na pánvi rozpalte olej nebo sádlo a smažte chleby z obou stran dozlatova (cca 2 minuty na stranu).',
      'Nechte okapat na ubrousku.',
      'Ještě horké potřete plnotučnou hořčicí a posypte nasekanou cibulkou.'
    ],
    tips: 'Pro sytější verzi můžete na horký chléb položit plátek sýra, který se teplem krásně rozteče.'
  },

  {
    id: 'topinky_s_cesnekem',
    title: 'Křupavé topinky s česnekem a sýrem',
    description: 'Poctivě dokřupava opečený chléb, potřený stroužkem česneku se solí a posypaný sýrem.',
    category: 'ceska',
    tags: ['Rychlovka do 10 min', 'Levné jídlo', 'Zbytky z lednice'],
    prepTime: 2,
    cookTime: 6,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 5,
    calories: 270,
    ingredients: [
      { id: 'chleb', name: 'Chléb / Pečivo (i starší)', amount: 4, unit: 'krajíců' },
      { id: 'cesnek', name: 'Česnek', amount: 3, unit: 'stroužků', note: 'na potření' },
      { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', amount: 80, unit: 'g', note: 'nastrouhaný navrch' },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 40, unit: 'ml', staple: true },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Na pánvi rozpalte tenkou vrstvu sádla nebo oleje.',
      'Krajíce chleba opečte z obou stran do hnědé a křupavé kůrky.',
      'Okapané horké topinky osolte a poctivě potřete rozkrojeným stroužkem česneku.',
      'Ihned posypte nastrouhaným sýrem, který se na horkém chlebu rozteče.'
    ],
    tips: 'Pokud máte v lednici zbytek masové směsi, vajíčko nebo tatarku, vytvořte si hospodskou topinku deluxe!'
  },

  {
    id: 'smazena_ryze',
    title: 'Asijská smažená rýže s vejcem a zeleninou',
    description: 'Nejlepší využití zbylé uvařené rýže z lednice se sójovou omáčkou, vejcem a zeleninou.',
    category: 'zahranicni',
    tags: ['Zbytky z lednice', 'Rychlovka do 15 min', 'Asijská kuchyně'],
    prepTime: 5,
    cookTime: 10,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 8,
    calories: 390,
    ingredients: [
      { id: 'ryze', name: 'Rýže (dlouhozrnná, jasmínová)', amount: 350, unit: 'g', note: 'studená uvařená rýže' },
      { id: 'vejce', name: 'Vejce', amount: 2, unit: 'ks' },
      { id: 'mrkev', name: 'Mrkev', amount: 1, unit: 'ks', note: 'na malé kostičky' },
      { id: 'hrasek', name: 'Hrášek (mražený / čerstvý)', amount: 80, unit: 'g' },
      { id: 'jarni_cibulka', name: 'Jarní cibulka', amount: 1, unit: 'svazek' },
      { id: 'cesnek', name: 'Česnek', amount: 2, unit: 'stroužků' },
      { id: 'sojova_omacka', name: 'Sójová omáčka', amount: 2, unit: 'lžíce' },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 30, unit: 'ml', staple: true }
    ],
    instructions: [
      'Na rozpálené pánvi nebo woku orestujte na oleji mrkev, hrášek, nasekaný česnek a bílou část jarní cibulky (cca 3 minuty).',
      'Zeleninu posuňte na stranu pánve, na prázdné místo vlijte rozšlehaná vejce a umíchejte rychlá míchaná vajíčka.',
      'Přisypte studenou rýži z lednice a za stálého míchání na vysokém plameni opékejte 3–4 minuty.',
      'Zakápněte sójovou omáčkou a důkladně promíchejte, aby se rýže rovnoměrně obalila.',
      'Posypte zelenou natí jarní cibulky a ihned podávejte.'
    ],
    tips: 'Zásadní pravidlo smažené rýže: čerstvě uvařená teplá rýže se lepí, jednodenní studená rýže z lednice je dokonalá!'
  },

  {
    id: 'cockova_polevka',
    title: 'Poctivá čočková polévka s párkem a majoránkou',
    description: 'Hustá hřejivá luštěninová polévka se zeleninou, nakrájeným párkem a voňavou majoránkou.',
    category: 'ceska',
    tags: ['Polévka', 'Luštěniny', 'Česká klasika'],
    prepTime: 10,
    cookTime: 30,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 25,
    calories: 340,
    ingredients: [
      { id: 'cocka', name: 'Čočka hnědá / zelená', amount: 250, unit: 'g' },
      { id: 'parky', name: 'Párky / Špekáčky / Uzenina', amount: 2, unit: 'ks', note: 'na kolečka' },
      { id: 'brambory', name: 'Brambory', amount: 2, unit: 'ks' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 3, unit: 'stroužků' },
      { id: 'mouka_hladka', name: 'Hladká mouka', amount: 2, unit: 'lžíce' },
      { id: 'maslo', name: 'Máslo', amount: 30, unit: 'g' },
      { id: 'majoranka', name: 'Majoránka', amount: 2, unit: 'lžička', staple: true },
      { id: 'bujon', name: 'Vývar / Bujón / Masox', amount: 1, unit: 'kostka' },
      { id: 'ocet', name: 'Ocet (kvasný / jablečný)', amount: 1, unit: 'lžíce', note: 'na dochucení' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Čočku propláchněte a dejte vařit do 1 litru vody s bujónem.',
      'Po 15 minutách přidejte brambory nakrájené na kostičky a vařte doměkka.',
      'Na másle orestujte cibulku a kolečka párku, zasypte moukou a vytvořte jíšku.',
      'Jíšku vmíchejte do polévky a nechte 8 minut provařit.',
      'Odstavte, přidejte prolisovaný česnek, lžíci octa na příjemnou kyselost a rozemnutou majoránku.'
    ],
    tips: 'Čočku solte až po uvaření, v osolené vodě by se vařila déle.'
  },

  {
    id: 'kureci_kari',
    title: 'Rychlé kuřecí kari s kokosovým mlékem a rýží',
    description: 'Voňavé krémové kari s kousky kuřecího masa a jemným kokosovým mlékem za 20 minut.',
    category: 'zahranicni',
    tags: ['Rychlovka do 25 min', 'Drůbež', 'Asijská kuchyně'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Snadné',
    defaultServings: 3,
    timerMinutes: 14,
    calories: 520,
    ingredients: [
      { id: 'kureci_prsa', name: 'Kuřecí prsa / řízky', amount: 400, unit: 'g', note: 'na nudličky' },
      { id: 'kokosove_mleko', name: 'Kokosové mléko', amount: 200, unit: 'ml' },
      { id: 'ryze', name: 'Rýže (dlouhozrnná, jasmínová)', amount: 300, unit: 'g', note: 'příloha' },
      { id: 'kari', name: 'Kari koření (Curry)', amount: 2, unit: 'lžička' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 2, unit: 'stroužků' },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 20, unit: 'ml', staple: true },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Rýži dejte vařit do osolené vody podle návodu.',
      'Na pánvi orestujte na oleji cibuli a česnek.',
      'Přidejte osolené kousky kuřecího masa a opékejte 5 minut dozlatova.',
      'Přisypte kari koření, promíchejte a ihned zalijte kokosovým mlékem.',
      'Vařte na mírném ohni 8 minut do zhoustnutí omáčky.',
      'Podávejte s horkou rýží.'
    ],
    tips: 'Máte v lednici papriku nebo cuketu? Přidejte je k masu pro barevnější a zeleninovější verzi.'
  },

  {
    id: 'tunakova_pomazanka',
    title: 'Rychlá tuňáková pomazánka s tvarohem',
    description: 'Svěží proteinová pomazánka z tuňáka v konzervě, tvarohu a cibulky, hotová za 5 minut.',
    category: 'zahranicni',
    tags: ['Rychlovka do 10 min', 'Snídaně & Svačina', 'Zdravé', 'Ryby'],
    prepTime: 5,
    cookTime: 0,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 0,
    calories: 220,
    ingredients: [
      { id: 'tunak', name: 'Tuňák v konzervě', amount: 1, unit: 'konzerva', note: 'okapaný' },
      { id: 'tvaroh', name: 'Tvaroh (měkký / na strouhání)', amount: 200, unit: 'g', note: 'nebo lučina' },
      { id: 'cervena_cibule', name: 'Červená cibule', amount: 1, unit: 'ks', note: 'nebo jarní cibulka' },
      { id: 'horcice', name: 'Hořčice (plnotučná / kremžská)', amount: 1, unit: 'lžička' },
      { id: 'citron', name: 'Citron', amount: 1, unit: 'ks', note: 'lžička šťávy' },
      { id: 'chleb', name: 'Chléb / Pečivo (i starší)', amount: 4, unit: 'krajíců' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Tuňáka slijte a v misce rozmačkejte vidličkou.',
      'Přidejte tvaroh (nebo lučinu), lžičku hořčice a lžičku citronové šťávy.',
      'Cibulku nakrájejte najemno a vmíchejte do pomazánky.',
      'Dochuťte solí a čerstvě mletým pepřem.',
      'Namažte na čerstvý chléb nebo topinky.'
    ],
    tips: 'Přidáním vařeného vejce získáte ještě bohatší luxusní rybí pomazánku.'
  },

  {
    id: 'shakshuka',
    title: 'Shakshuka (Vejce v rajčatové omáčce s paprikou)',
    description: 'Tradiční pánvičková dobrota z voňavých rajčat, paprik a vajíček s tekutým žloutkem.',
    category: 'zahranicni',
    tags: ['Pánvička', 'Bezmasé', 'Rychlovka do 20 min'],
    prepTime: 5,
    cookTime: 15,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 12,
    calories: 330,
    ingredients: [
      { id: 'vejce', name: 'Vejce', amount: 4, unit: 'ks' },
      { id: 'rajcata_konzerva', name: 'Krájená rajčata v plechovce', amount: 1, unit: 'konzerva' },
      { id: 'paprika', name: 'Paprika', amount: 2, unit: 'ks' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 2, unit: 'stroužků' },
      { id: 'olej_olivovy', name: 'Olivový olej', amount: 20, unit: 'ml' },
      { id: 'kmin', name: 'Kmín (drcený / celý)', amount: 1, unit: 'lžička' },
      { id: 'chleb', name: 'Chléb / Pečivo (i starší)', amount: 4, unit: 'krajíců', note: 'k namáčení' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Na olivovém oleji orestujte nakrájenou cibuli a papriku nakrájenou na proužky cca 5 minut.',
      'Přidejte nasekaný česnek a drcený kmín a nechte rozvonět.',
      'Vlijte krájená rajčata, osolte, opepřete a povařte 5 minut do zhoustnutí.',
      'V omáčce vytvořte lžící 4 důlky a do každého vyklepněte jedno vejce.',
      'Přiklopte pokličkou a nechte na mírném ohni 5 minut, dokud bílek neztuhne a žloutek nezůstane tekutý.',
      'Podávejte přímo v pánvi s křupavým chlebem na namáčení.'
    ],
    tips: 'Navrch můžete před podáváním rozdrobit zbytek balkánského sýra nebo fety!'
  },

  {
    id: 'zapecena_brokolice',
    title: 'Zapečená brokolice se sýrem a smetanou',
    description: 'Jednoduché a zdravé zapečené jídlo z brokolice a vajec pod křupavou sýrovou peřinkou.',
    category: 'ceska',
    tags: ['Zapečené', 'Zelenina', 'Vegetariánské'],
    prepTime: 10,
    cookTime: 20,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 18,
    calories: 380,
    ingredients: [
      { id: 'brokolice', name: 'Brokolice', amount: 1, unit: 'ks', note: 'rozebraná na růžičky' },
      { id: 'vejce', name: 'Vejce', amount: 3, unit: 'ks' },
      { id: 'smetana', name: 'Smetana na vaření (12%)', amount: 150, unit: 'ml' },
      { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', amount: 150, unit: 'g' },
      { id: 'cesnek', name: 'Česnek', amount: 2, unit: 'stroužků' },
      { id: 'maslo', name: 'Máslo', amount: 20, unit: 'g' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Brokolici rozeberte na růžičky a povařte 4 minuty v osolené vodě, poté sceďte a zchlaďte.',
      'Zapékací misku vymažte máslem a naskládejte do ní brokolici.',
      'V misce rozšlehejte vejce se smetanou, prolisovaným česnekem, solí a pepřem.',
      'Přelijte brokolici a navrch bohatě zasypte strouhaným sýrem.',
      'Pečte v troubě na 190 °C cca 20 minut dozlatova.'
    ],
    tips: 'Skvěle chutná i s vařenými bramborami přidanými přímo do pekáčku.'
  },

  {
    id: 'dynova_polevka',
    title: 'Hřejivá dýňová polévka Hokkaidó',
    description: 'Sametový podzimní krém z pečené dýně s česnekem a zjemněný smetanou.',
    category: 'ceska',
    tags: ['Polévka', 'Dýně', 'Vegetariánské'],
    prepTime: 10,
    cookTime: 20,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 18,
    calories: 210,
    ingredients: [
      { id: 'dyne', name: 'Dýně (Hokkaidó / máslová)', amount: 600, unit: 'g', note: 'nakrájená na kostky (nemusí se loupat)' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 2, unit: 'stroužků' },
      { id: 'maslo', name: 'Máslo', amount: 30, unit: 'g' },
      { id: 'smetana', name: 'Smetana na vaření (12%)', amount: 100, unit: 'ml' },
      { id: 'bujon', name: 'Vývar / Bujón / Masox', amount: 1, unit: 'kostka' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Na másle orestujte nakrájenou cibuli a česnek.',
      'Přidejte omytou a nakrájenou dýni Hokkaidó (slupku nechte, vařením změkne).',
      'Zalijte 700 ml vody s bujónem a vařte 15–20 minut doměkka.',
      'Rozmixujte ponorným mixérem na hladký krém.',
      'Zjemněte smetanou, osolte a opepřete.',
      'Podávejte s krutony z chleba nebo dýňovými semínky.'
    ],
    tips: 'Dýně Hokkaidó se nemusí loupat, což ušetří spoustu práce i vitamínů.'
  },

  {
    id: 'gnocchi_spenat',
    title: 'Bramborové gnocchi se špenátem a smetanou',
    description: 'Rychlé noky v krémové česnekovo-špenátové omáčce s rozpuštěným sýrem.',
    category: 'zahranicni',
    tags: ['Těstoviny', 'Rychlovka do 15 min', 'Vegetariánské'],
    prepTime: 3,
    cookTime: 10,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 8,
    calories: 460,
    ingredients: [
      { id: 'gnocchi', name: 'Bramborové noky (Gnocchi)', amount: 500, unit: 'g' },
      { id: 'spenat', name: 'Špenát (čerstvý / mražený)', amount: 250, unit: 'g' },
      { id: 'smetana', name: 'Smetana na vaření (12%)', amount: 150, unit: 'ml' },
      { id: 'cesnek', name: 'Česnek', amount: 3, unit: 'stroužků' },
      { id: 'maslo', name: 'Máslo', amount: 30, unit: 'g' },
      { id: 'parmazan', name: 'Parmazán / Grana Padano', amount: 40, unit: 'g' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Gnocchi uvařte ve vroucí osolené vodě (jakmile vyplavou na hladinu, cca 2 minuty, jsou hotové).',
      'Na pánvi rozpusťte máslo a nechte rozvonět prolisovaný česnek.',
      'Přidejte špenát a nechte zavadnout (nebo prohřát mražený).',
      'Přilijte smetanu, osolte, opepřete a nechte 2 minuty zredukovat.',
      'Do omáčky vsypte uvařené gnocchi, promíchejte se sýrem a podávejte.'
    ],
    tips: 'Můžete přidat na kostičky orestované kuřecí maso pro masožravce.'
  },

  {
    id: 'aglio_olio',
    title: 'Špagety Aglio Olio e Peperoncino',
    description: 'Italská klasika za 10 minut: olivový olej, plátky česneku, chilli a petrželka.',
    category: 'zahranicni',
    tags: ['Těstoviny', 'Rychlovka do 15 min', 'Levné jídlo', 'Italská kuchyně'],
    prepTime: 2,
    cookTime: 10,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 9,
    calories: 410,
    ingredients: [
      { id: 'testoviny', name: 'Těstoviny (špagety, penne, kolínka)', amount: 250, unit: 'g' },
      { id: 'cesnek', name: 'Česnek', amount: 5, unit: 'stroužků', note: 'na tenké plátky' },
      { id: 'olej_olivovy', name: 'Olivový olej', amount: 50, unit: 'ml' },
      { id: 'chilli', name: 'Chilli papričky', amount: 1, unit: 'ks', note: 'nebo drcené chilli' },
      { id: 'parmazan', name: 'Parmazán / Grana Padano', amount: 30, unit: 'g' },
      { id: 'petrzelka', name: 'Naťová petrželka', amount: 1, unit: 'svazek' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Špagety dejte vařit do vroucí osolené vody.',
      'Na pánvi na mírném ohni zahřejte olivový olej.',
      'Přidejte plátky česneku a nasekané chilli. Pomalu opékejte, dokud česnek nezezlátne (nesmí zhnědnout, zhořkl by).',
      'K česneku přidejte 3 lžíce vody z vařících se těstovin, aby se vytvořila emulze.',
      'Scezené špagety vhoďte do pánve, přidejte nasekanou petrželku a promíchejte.',
      'Ihned servírujte posypané parmazánem.'
    ],
    tips: 'Klíčem je pomalé opékání česneku na mírném ohni – olej do sebe natáhne veškeré aroma.'
  },

  {
    id: 'tvarohove_livance',
    title: 'Vláčné tvarohové lívance s jablky a skořicí',
    description: 'Nadýchané lívance z měkkého tvarohu a vajec s orestovanými skořicovými jablky.',
    category: 'ceska',
    tags: ['Sladké jídlo', 'Snídaně & Svačina', 'Tvaroh'],
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 8,
    calories: 380,
    ingredients: [
      { id: 'tvaroh', name: 'Tvaroh (měkký / na strouhání)', amount: 250, unit: 'g' },
      { id: 'vejce', name: 'Vejce', amount: 2, unit: 'ks' },
      { id: 'mouka_hladka', name: 'Hladká mouka', amount: 4, unit: 'lžíce' },
      { id: 'cukr', name: 'Cukr', amount: 2, unit: 'lžíce' },
      { id: 'jablka', name: 'Jablka', amount: 2, unit: 'ks', note: 'na plátky' },
      { id: 'maslo', name: 'Máslo', amount: 30, unit: 'g' },
      { id: 'vanilkovy_cukr', name: 'Vanilkový cukr / skořice', amount: 1, unit: 'sáček' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'V míse vidličkou prošlehejte tvaroh s vejci, cukrem a špetkou soli.',
      'Přisypte mouku a vymíchejte hustší těsto.',
      'Na pánvi na kapce másla smažte malé lívanečky z obou stran dozlatova (cca 2–3 minuty na stranu).',
      'Na vedlejší pánvi na másle poduste nakrájená jablka se skořicí a lžičkou cukru do změknutí.',
      'Lívance servírujte přelité teplými jablky.'
    ],
    tips: 'Těsto je díky tvarohu neuvěřitelně vláčné a neoschne ani po vychladnutí.'
  },

  {
    id: 'cervena_cocka_dhal',
    title: 'Červená čočka na indický způsob (Dhal)',
    description: 'Blesková sytá luštěninová pánev z červené čočky, která se nemusí namáčet a je hotová za 15 minut.',
    category: 'zahranicni',
    tags: ['Luštěniny', 'Rychlovka do 20 min', 'Vegetariánské', 'Zdravé'],
    prepTime: 5,
    cookTime: 15,
    difficulty: 'Snadné',
    defaultServings: 3,
    timerMinutes: 14,
    calories: 310,
    ingredients: [
      { id: 'cervena_cocka', name: 'Červená čočka', amount: 200, unit: 'g' },
      { id: 'rajcata_konzerva', name: 'Krájená rajčata v plechovce', amount: 1, unit: 'konzerva' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks' },
      { id: 'cesnek', name: 'Česnek', amount: 3, unit: 'stroužků' },
      { id: 'zazvor', name: 'Čerstvý zázvor', amount: 1, unit: 'kousek' },
      { id: 'kari', name: 'Kari koření (Curry)', amount: 2, unit: 'lžička' },
      { id: 'olej_rostlinny', name: 'Rostlinný olej / sádlo', amount: 20, unit: 'ml', staple: true },
      { id: 'ryze', name: 'Rýže (dlouhozrnná, jasmínová)', amount: 250, unit: 'g', note: 'příloha' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Na oleji orestujte nakrájenou cibuli, nasekaný česnek a nastrouhaný zázvor.',
      'Přisypte kari koření a nechte 30 sekund rozvonět.',
      'Přidejte propláchnutou červenou čočku, krájená rajčata a 350 ml vody.',
      'Vařte na mírném ohni 12–15 minut, dokud čočka nezměkne a nerozvaří se v krémovou kaši.',
      'Osolte, opepřete a podávejte s vařenou rýží nebo chlebem.'
    ],
    tips: 'Červená čočka se vaří bez namáčení a nenadýmá jako klasické luštěniny.'
  },

  {
    id: 'kureci_vyvar',
    title: 'Poctivý kuřecí vývar se zeleninou a nudlemi',
    description: 'Zlatavá léčivá polévka z kuřecího masa, kořenové zeleniny a bylinek.',
    category: 'ceska',
    tags: ['Polévka', 'Česká klasika', 'Drůbež'],
    prepTime: 10,
    cookTime: 45,
    difficulty: 'Snadné',
    defaultServings: 4,
    timerMinutes: 40,
    calories: 190,
    ingredients: [
      { id: 'kureci_stehna', name: 'Kuřecí stehna / paličky', amount: 2, unit: 'ks', note: 'nebo skelet' },
      { id: 'mrkev', name: 'Mrkev', amount: 2, unit: 'ks' },
      { id: 'celer', name: 'Celer (kořenový / řapíkatý)', amount: 100, unit: 'g' },
      { id: 'petrzel', name: 'Petržel kořenová', amount: 1, unit: 'ks' },
      { id: 'cibule', name: 'Cibule', amount: 1, unit: 'ks', note: 'i se slupkou pro zlatou barvu' },
      { id: 'bobkovy_list', name: 'Bobkový list & Nové koření', amount: 2, unit: 'ks' },
      { id: 'testoviny', name: 'Těstoviny (špagety, penne, kolínka)', amount: 100, unit: 'g', note: 'polévkové nudle' },
      { id: 'petrzelka', name: 'Naťová petrželka', amount: 1, unit: 'svazek' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Maso vložte do hrnce se studenou vodou (1,5 l), přidejte očištěnou zeleninu, koření a lžičku soli.',
      'Přiveďte k mírnému varu a na nejnižším plameni táhněte (nevařte klokotem) 40–50 minut.',
      'Maso vyndejte, oberte na kousky a zeleninu nakrájejte na kolečka.',
      'Vývar sceďte a dochuťte solí.',
      'Uvařte nudle a podávejte horké s masem, zeleninou a čerstvou petrželkou.'
    ],
    tips: 'Neoloupaná cibulová slupka dodá vývaru krásnou jantarově zlatavou barvu.'
  },

  {
    id: 'tortilla_kure',
    title: 'Tortilla plněná kuřecím masem, sýrem a zeleninou',
    description: 'Křupavý zapečený wrap s kousky kuřecího masa, čerstvou zeleninou a rozpuštěným sýrem.',
    category: 'zahranicni',
    tags: ['Rychlovka do 20 min', 'Streetfood', 'Drůbež'],
    prepTime: 10,
    cookTime: 8,
    difficulty: 'Snadné',
    defaultServings: 2,
    timerMinutes: 6,
    calories: 480,
    ingredients: [
      { id: 'tortilly', name: 'Tortilly', amount: 2, unit: 'ks' },
      { id: 'kureci_prsa', name: 'Kuřecí prsa / řízky', amount: 250, unit: 'g', note: 'na nudličky' },
      { id: 'syr', name: 'Tvrdý sýr (Eidam / Gouda)', amount: 100, unit: 'g', note: 'nastrouhaný' },
      { id: 'rajcata', name: 'Rajčata', amount: 1, unit: 'ks' },
      { id: 'salat', name: 'Hlávkový / Ledový salát / Rukola', amount: 1, unit: 'balení' },
      { id: 'tatarka_majoneza', name: 'Tatarská omáčka / Majonéza', amount: 2, unit: 'lžíce' },
      { id: 'paprika_mleta', name: 'Mletá paprika sladká', amount: 1, unit: 'lžička' },
      { id: 'sul', name: 'Sůl & Pepř', amount: 1, unit: 'špetka', staple: true }
    ],
    instructions: [
      'Kuřecí maso osolte, posypte paprikou a orestujte na pánvi dokřupava (cca 5 minut).',
      'Tortillu potřete tatarkou nebo dresinkem.',
      'Doprostřed naskládejte salát, nakrájená rajčata, teplé kuřecí maso a zasypte sýrem.',
      'Pevně zabalte v kapsu a z obou stran nasucho opečte na pánvi 2 minuty, dokud se sýr nerozpustí.',
      'Překrojte napůl a podávejte.'
    ],
    tips: 'Skvělý způsob jak zužitkovat zbylé pečené kuře ze včerejška.'
  }
];
