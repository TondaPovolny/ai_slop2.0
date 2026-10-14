/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ChefHat,
  Users,
  ShoppingCart,
  Check,
  CheckCheck,
  Copy,
  Share2,
  Plus,
  Minus,
  RotateCcw,
  Trash2,
  Sparkles,
  ArrowDown,
  Info,
  PackageCheck,
  ShoppingBag,
  Clock,
  Flame,
  Search,
  ListPlus,
  Filter,
  CheckCircle2
} from 'lucide-react';

// Types
export interface Ingredient {
  id: string;
  name: string;
  baseAmount: number | null; // null if "dle chuti" / pinch
  unit: string;
  category: 'maso' | 'zelenina' | 'testoviny' | 'mlecne' | 'spiz' | 'bylinky' | 'napoje' | 'jine';
  haveAtHome: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  categoryTag: 'ceska' | 'svetova' | 'polevky' | 'sladke' | 'rychle';
  categoryLabel: string;
  emoji: string;
  description: string;
  time: string;
  difficulty: string;
  basePortions: number;
  ingredients: Ingredient[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  amountText: string;
  category: string;
  bought: boolean;
  isCustom?: boolean;
}

// 10 Kompletních ověřených receptů
const PRESET_RECIPES: Recipe[] = [
  {
    id: 'bolognese',
    title: 'Špagety Bolognese',
    categoryTag: 'svetova',
    categoryLabel: 'Světová kuchyně',
    emoji: '🍝',
    description: 'Tradiční italská masová omáčka pomalu tažená s kořenovou zeleninou a vínem.',
    time: '45 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'b1', name: 'Mleté hovězí maso', baseAmount: 500, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'b2', name: 'Špagety semolinové', baseAmount: 400, unit: 'g', category: 'testoviny', haveAtHome: false },
      { id: 'b3', name: 'Krájená loupaná rajčata v konzervě', baseAmount: 800, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'b4', name: 'Rajčatový protlak', baseAmount: 70, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'b5', name: 'Žlutá cibule', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'b6', name: 'Mrkev', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'b7', name: 'Řapíkatý celer', baseAmount: 2, unit: 'stonky', category: 'zelenina', haveAtHome: false },
      { id: 'b8', name: 'Česnek', baseAmount: 3, unit: 'stroužky', category: 'zelenina', haveAtHome: true },
      { id: 'b9', name: 'Kvalitní olivový olej', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'b10', name: 'Suché červené víno', baseAmount: 150, unit: 'ml', category: 'napoje', haveAtHome: false },
      { id: 'b11', name: 'Parmezán (Grana Padano)', baseAmount: 60, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'b12', name: 'Čerstvá bazalka nebo oregano', baseAmount: 1, unit: 'hrst', category: 'bylinky', haveAtHome: false },
      { id: 'b13', name: 'Hovězí vývar na podlití', baseAmount: 200, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'b14', name: 'Sůl a čerstvě mletý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'svickova',
    title: 'Svíčková na smetaně s knedlíkem',
    categoryTag: 'ceska',
    categoryLabel: 'Česká klasika',
    emoji: '🥩',
    description: 'Poctivá rodinná smetanová omáčka z pečené kořenové zeleniny s brusinkami a knedlíkem.',
    time: '90 min',
    difficulty: 'Střední',
    basePortions: 4,
    ingredients: [
      { id: 's1', name: 'Hovězí zadní (loupaná plec)', baseAmount: 750, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 's2', name: 'Mrkev', baseAmount: 300, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 's3', name: 'Celer kořenový', baseAmount: 200, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 's4', name: 'Petržel kořenová', baseAmount: 150, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 's5', name: 'Žlutá cibule', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 's6', name: 'Uzený špek / slanina na prošpikován', baseAmount: 80, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 's7', name: 'Smetana ke šlehání (33 %)', baseAmount: 250, unit: 'ml', category: 'mlecne', haveAtHome: false },
      { id: 's8', name: 'Hovězí vývar', baseAmount: 500, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 's9', name: 'Máslo', baseAmount: 50, unit: 'g', category: 'mlecne', haveAtHome: true },
      { id: 's10', name: 'Plnotučná hořčice', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 's11', name: 'Krupicový cukr', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 's12', name: 'Citronová šťáva', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 's13', name: 'Bobkový list a nové koření', baseAmount: 4, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 's14', name: 'Houskový knedlík (šiška)', baseAmount: 1, unit: 'ks', category: 'spiz', haveAtHome: false },
      { id: 's15', name: 'Brusinkový kompot', baseAmount: 120, unit: 'g', category: 'spiz', haveAtHome: false },
    ],
  },
  {
    id: 'gulas',
    title: 'Hospodský hovězí guláš s cibulí',
    categoryTag: 'ceska',
    categoryLabel: 'Česká klasika',
    emoji: '🥘',
    description: 'Hustý guláš z hovězí kližky s bohatou cibulovou chutí, majoránkou a česnekem.',
    time: '80 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'g1', name: 'Hovězí kližka', baseAmount: 800, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'g2', name: 'Žlutá cibule', baseAmount: 700, unit: 'g', category: 'zelenina', haveAtHome: true },
      { id: 'g3', name: 'Vepřové sádlo', baseAmount: 3, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'g4', name: 'Mletá sladká paprika', baseAmount: 3, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'g5', name: 'Mletá pálivá paprika', baseAmount: 0.5, unit: 'lžičky', category: 'spiz', haveAtHome: true },
      { id: 'g6', name: 'Rajčatový protlak', baseAmount: 60, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'g7', name: 'Česnek', baseAmount: 5, unit: 'stroužky', category: 'zelenina', haveAtHome: true },
      { id: 'g8', name: 'Sušená majoránka', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'g9', name: 'Mletý kmín', baseAmount: 1, unit: 'lžička', category: 'spiz', haveAtHome: true },
      { id: 'g10', name: 'Hovězí vývar', baseAmount: 750, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'g11', name: 'Starší chléb na zahuštění', baseAmount: 100, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'g12', name: 'Čerstvá cibule na ozdobu', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
    ],
  },
  {
    id: 'rizek',
    title: 'Vepřový řízek s bramborovým salátem',
    categoryTag: 'ceska',
    categoryLabel: 'Česká klasika',
    emoji: '🥩',
    description: 'Zlatavý smažený řízek v trojobalu s tradičním bramborovým salátem s majonézou.',
    time: '60 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'r1', name: 'Vepřová pečeně / krkovice', baseAmount: 600, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'r2', name: 'Hladká mouka', baseAmount: 80, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'r3', name: 'Čerstvá vejce', baseAmount: 2, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'r4', name: 'Strouhanka', baseAmount: 160, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'r5', name: 'Brambory varný typ A/B', baseAmount: 800, unit: 'g', category: 'zelenina', haveAtHome: true },
      { id: 'r6', name: 'Sterilovaný hrášek s mrkví', baseAmount: 1, unit: 'sklenice', category: 'spiz', haveAtHome: false },
      { id: 'r7', name: 'Kyselé sterilované okurky', baseAmount: 4, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'r8', name: 'Majonéza', baseAmount: 180, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'r9', name: 'Plnotučná hořčice', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'r10', name: 'Sádlo nebo řepkový olej na smažení', baseAmount: 250, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'r11', name: 'Citron k podávání', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'r12', name: 'Sůl a pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'curry',
    title: 'Krémové kuřecí kari s rýží',
    categoryTag: 'svetova',
    categoryLabel: 'Světová kuchyně',
    emoji: '🍛',
    description: 'Voňavé asijské kari s kokosovým mlékem, jemným kuřecím masem a jasmínovou rýží.',
    time: '35 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'c1', name: 'Kuřecí prsní řízky', baseAmount: 600, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'c2', name: 'Kokosové mléko (plechovka)', baseAmount: 400, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'c3', name: 'Jasmínová rýže', baseAmount: 320, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'c4', name: 'Žlutá kari pasta nebo koření', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'c5', name: 'Žlutá cibule', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'c6', name: 'Česnek', baseAmount: 3, unit: 'stroužky', category: 'zelenina', haveAtHome: true },
      { id: 'c7', name: 'Čerstvý zázvor', baseAmount: 20, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'c8', name: 'Červená paprika', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'c9', name: 'Limetka', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'c10', name: 'Čerstvý koriandr', baseAmount: 1, unit: 'hrst', category: 'bylinky', haveAtHome: false },
      { id: 'c11', name: 'Rostlinný olej', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'c12', name: 'Sůl', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'cockova-polevka',
    title: 'Poctivá čočková polévka s uzeninou',
    categoryTag: 'polevky',
    categoryLabel: 'Polévky & Saláty',
    emoji: '🥣',
    description: 'Hustá zahřívací luštěninová polévka s kořenovou zeleninou, česnekem a voňavou uzeninou.',
    time: '40 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'cp1', name: 'Hnědá čočka', baseAmount: 250, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'cp2', name: 'Kvalitní uzený párek nebo klobása', baseAmount: 2, unit: 'ks', category: 'maso', haveAtHome: false },
      { id: 'cp3', name: 'Brambory', baseAmount: 2, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'cp4', name: 'Mrkev', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'cp5', name: 'Kořenová petržel', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'cp6', name: 'Cibule', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'cp7', name: 'Česnek', baseAmount: 4, unit: 'stroužky', category: 'zelenina', haveAtHome: true },
      { id: 'cp8', name: 'Vepřové sádlo nebo olej', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'cp9', name: 'Hladká mouka na jíšku', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'cp10', name: 'Sušená majoránka', baseAmount: 1.5, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'cp11', name: 'Bobkový list', baseAmount: 2, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'cp12', name: 'Zeleninový vývar nebo voda', baseAmount: 1200, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'cp13', name: 'Ocet na dochucení', baseAmount: 1, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'cp14', name: 'Sůl a černý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'risotto',
    title: 'Krémové houbové rizoto (Risotto ai Funghi)',
    categoryTag: 'svetova',
    categoryLabel: 'Světová kuchyně',
    emoji: '🍄',
    description: 'Pravé italské krémové rizoto z rýže Arborio s restovanými houbami, vínem a parmezánem.',
    time: '30 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'ri1', name: 'Rýže na rizoto (Arborio/Carnaroli)', baseAmount: 320, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'ri2', name: 'Čerstvé žampiony nebo lesní houby', baseAmount: 350, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'ri3', name: 'Šalotka nebo bílá cibule', baseAmount: 2, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'ri4', name: 'Suché bílé víno', baseAmount: 120, unit: 'ml', category: 'napoje', haveAtHome: false },
      { id: 'ri5', name: 'Zeleninový horký vývar', baseAmount: 900, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'ri6', name: 'Parmezán jemně strouhaný', baseAmount: 70, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'ri7', name: 'Máslo (studené kostky)', baseAmount: 60, unit: 'g', category: 'mlecne', haveAtHome: true },
      { id: 'ri8', name: 'Extra panenský olivový olej', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'ri9', name: 'Česnek', baseAmount: 2, unit: 'stroužky', category: 'zelenina', haveAtHome: true },
      { id: 'ri10', name: 'Čerstvá petrželka', baseAmount: 1, unit: 'hrst', category: 'bylinky', haveAtHome: false },
      { id: 'ri11', name: 'Sůl a čerstvě mletý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'greek-salad',
    title: 'Svěží řecký salát s fetou a olivami',
    categoryTag: 'polevky',
    categoryLabel: 'Polévky & Saláty',
    emoji: '🥗',
    description: 'Křupavá šťavnatá zelenina s pravým sýrem feta, olivami kalamata a oregany.',
    time: '15 min',
    difficulty: 'Velmi snadné',
    basePortions: 4,
    ingredients: [
      { id: 'gs1', name: 'Zralá keříková rajčata', baseAmount: 500, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'gs2', name: 'Salátová hadovka okurka', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'gs3', name: 'Červená paprika', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'gs4', name: 'Červená cibule', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'gs5', name: 'Pravý sýr Feta (ovčí/kozí)', baseAmount: 200, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'gs6', name: 'Černé olivy Kalamata', baseAmount: 120, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'gs7', name: 'Extra panenský olivový olej', baseAmount: 4, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'gs8', name: 'Červený vinný ocet', baseAmount: 1.5, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'gs9', name: 'Sušené divoké oregano', baseAmount: 1, unit: 'lžička', category: 'bylinky', haveAtHome: true },
      { id: 'gs10', name: 'Mořská sůl a černý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'pancakes',
    title: 'Domácí nadýchané palačinky s tvarohem',
    categoryTag: 'sladke',
    categoryLabel: 'Sladká jídla',
    emoji: '🥞',
    description: 'Oblíbené jemné palačinky plněné vanilkovým tvarohem a posypané čerstvým ovocem.',
    time: '25 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'p1', name: 'Polotučná hladká mouka', baseAmount: 250, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'p2', name: 'Plnotučné mléko', baseAmount: 500, unit: 'ml', category: 'mlecne', haveAtHome: false },
      { id: 'p3', name: 'Čerstvá vejce', baseAmount: 2, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'p4', name: 'Jemný tvaroh ve vaničce', baseAmount: 250, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'p5', name: 'Vanilkový cukr', baseAmount: 2, unit: 'sáčky', category: 'spiz', haveAtHome: true },
      { id: 'p6', name: 'Moučkový cukr', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'p7', name: 'Lesní ovoce nebo jahody', baseAmount: 250, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'p8', name: 'Máslo na smažení', baseAmount: 30, unit: 'g', category: 'mlecne', haveAtHome: true },
      { id: 'p9', name: 'Špetka soli', baseAmount: null, unit: 'špetka', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'avocado-toast',
    title: 'Avokádový toast se sázeným vejcem',
    categoryTag: 'rychle',
    categoryLabel: 'Rychlovky & Brunch',
    emoji: '🥑',
    description: 'Křupavý kváskový chléb s krémovým avokádem, vajíčkem, chilli vločkami a semínky.',
    time: '15 min',
    difficulty: 'Velmi snadné',
    basePortions: 4,
    ingredients: [
      { id: 'at1', name: 'Kváskový chléb (silnější plátky)', baseAmount: 4, unit: 'plátky', category: 'spiz', haveAtHome: false },
      { id: 'at2', name: 'Zralé avokádo Hass', baseAmount: 2, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'at3', name: 'Čerstvá vejce', baseAmount: 4, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'at4', name: 'Cherry rajčátka', baseAmount: 150, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'at5', name: 'Máslo nebo olivový olej na vejce', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'at6', name: 'Citronová šťáva', baseAmount: 1, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'at7', name: 'Chilli vločky', baseAmount: 0.5, unit: 'lžičky', category: 'spiz', haveAtHome: true },
      { id: 'at8', name: 'Dýňová nebo sezamová semínka', baseAmount: 1, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'at9', name: 'Polníček nebo baby špenát', baseAmount: 50, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'at10', name: 'Hrubozrnná sůl a pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'spanelsky-ptacek',
    title: 'Španělský ptáček s dušenou rýží',
    categoryTag: 'ceska',
    categoryLabel: 'Česká klasika',
    emoji: '🥩',
    description: 'Plátky hovězího masa plněné špekem, párkem, vejcem a kyselou okurkou v bohaté cibulové omáčce.',
    time: '80 min',
    difficulty: 'Střední',
    basePortions: 4,
    ingredients: [
      { id: 'spt1', name: 'Hovězí zadní plátky', baseAmount: 600, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'spt2', name: 'Plnotučná hořčice', baseAmount: 3, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'spt3', name: 'Uzený špek / slanina', baseAmount: 60, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'spt4', name: 'Kvalitní párky nebo špekáček', baseAmount: 2, unit: 'ks', category: 'maso', haveAtHome: false },
      { id: 'spt5', name: 'Vařená vejce natvrdo', baseAmount: 2, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'spt6', name: 'Sterilované okurky', baseAmount: 2, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'spt7', name: 'Žlutá cibule', baseAmount: 2, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'spt8', name: 'Hovězí vývar na podlití', baseAmount: 600, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'spt9', name: 'Hladká mouka', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'spt10', name: 'Dlouhozrnná rýže', baseAmount: 350, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'spt11', name: 'Sádlo nebo olej', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'spt12', name: 'Sůl a černý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'bramboraky',
    title: 'Křupavé bramboráky se zelím a uzeným',
    categoryTag: 'ceska',
    categoryLabel: 'Česká klasika',
    emoji: '🥔',
    description: 'Poctivé české křupavé bramboráky provoněné česnekem a majoránkou s kysaným zelím.',
    time: '40 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'br1', name: 'Brambory', baseAmount: 1000, unit: 'g', category: 'zelenina', haveAtHome: true },
      { id: 'br2', name: 'Česnek', baseAmount: 6, unit: 'stroužků', category: 'zelenina', haveAtHome: true },
      { id: 'br3', name: 'Sušená majoránka', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'br4', name: 'Čerstvá vejce', baseAmount: 2, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'br5', name: 'Hladká mouka', baseAmount: 100, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'br6', name: 'Mléko', baseAmount: 80, unit: 'ml', category: 'mlecne', haveAtHome: false },
      { id: 'br7', name: 'Vepřové sádlo na smažení', baseAmount: 150, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'br8', name: 'Kysané zelí k podávání', baseAmount: 400, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'br9', name: 'Uzené maso na kostičky', baseAmount: 150, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'br10', name: 'Mletý kmín, sůl a pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'kure-na-paprice',
    title: 'Kuře na paprice s těstovinami',
    categoryTag: 'ceska',
    categoryLabel: 'Česká klasika',
    emoji: '🍗',
    description: 'Křehké dušené kuřecí maso v jemné krémové omáčce ze sladké papriky a smetany.',
    time: '50 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'kp1', name: 'Kuřecí stehna nebo prsa', baseAmount: 700, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'kp2', name: 'Žlutá cibule', baseAmount: 2, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'kp3', name: 'Mletá sladká paprika', baseAmount: 2.5, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'kp4', name: 'Smetana ke šlehání 33 %', baseAmount: 250, unit: 'ml', category: 'mlecne', haveAtHome: false },
      { id: 'kp5', name: 'Kuřecí vývar na podlití', baseAmount: 600, unit: 'ml', category: 'spiz', haveAtHome: false },
      { id: 'kp6', name: 'Hladká mouka', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'kp7', name: 'Máslo', baseAmount: 30, unit: 'g', category: 'mlecne', haveAtHome: true },
      { id: 'kp8', name: 'Těstoviny (kolínka či vřetena)', baseAmount: 400, unit: 'g', category: 'testoviny', haveAtHome: false },
      { id: 'kp9', name: 'Sůl a černý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'carbonara',
    title: 'Tradiční italská Carbonara bez smetany',
    categoryTag: 'svetova',
    categoryLabel: 'Světová kuchyně',
    emoji: '🍝',
    description: 'Pravý římský recept se špagetami, křupavým guanciale, čerstvými žloutky a sýrem Pecorino.',
    time: '20 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'cb1', name: 'Špagety semolinové', baseAmount: 400, unit: 'g', category: 'testoviny', haveAtHome: false },
      { id: 'cb2', name: 'Guanciale nebo pancetta', baseAmount: 200, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'cb3', name: 'Čerstvé vaječné žloutky', baseAmount: 4, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'cb4', name: 'Celé vejce', baseAmount: 1, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'cb5', name: 'Sýr Pecorino Romano nebo Parmezán', baseAmount: 80, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'cb6', name: 'Čerstvě mletý černý pepř', baseAmount: 1, unit: 'lžička', category: 'spiz', haveAtHome: true },
      { id: 'cb7', name: 'Mořská sůl do vody', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'burger',
    title: 'Hovězí burger s čedarem a slaninou',
    categoryTag: 'rychle',
    categoryLabel: 'Rychlovky & Burgery',
    emoji: '🍔',
    description: 'Šťavnatý burger z vyzrálého hovězího masa v máslové briošce s roztaveným čedarem a slaninou.',
    time: '25 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'bg1', name: 'Mleté hovězí maso (krk / plec)', baseAmount: 700, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'bg2', name: 'Máslové burger briošky', baseAmount: 4, unit: 'ks', category: 'spiz', haveAtHome: false },
      { id: 'bg3', name: 'Plátkový sýr Cheddar', baseAmount: 8, unit: 'plátků', category: 'mlecne', haveAtHome: false },
      { id: 'bg4', name: 'Anglická slanina', baseAmount: 8, unit: 'plátků', category: 'maso', haveAtHome: false },
      { id: 'bg5', name: 'Červená cibule', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'bg6', name: 'Křupavý ledový salát', baseAmount: 4, unit: 'listy', category: 'zelenina', haveAtHome: false },
      { id: 'bg7', name: 'Zralé rajče', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'bg8', name: 'Kyselé okurky', baseAmount: 2, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'bg9', name: 'Burger dresink nebo majonéza', baseAmount: 4, unit: 'lžíce', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'chilli-con-carne',
    title: 'Mexické Chilli con Carne s fazolemi',
    categoryTag: 'svetova',
    categoryLabel: 'Světová kuchyně',
    emoji: '🌶️',
    description: 'Pikantní hovězí směs s červenými fazolemi, rajčaty, kukuřicí a nádechem hořké čokolády.',
    time: '50 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'ccc1', name: 'Mleté hovězí maso', baseAmount: 600, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'ccc2', name: 'Červené fazole v konzervě', baseAmount: 400, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'ccc3', name: 'Kukuřice v nálevu', baseAmount: 150, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'ccc4', name: 'Krájená rajčata v konzervě', baseAmount: 800, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'ccc5', name: 'Cibule a česnek', baseAmount: 2, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'ccc6', name: 'Mletý římský kmín', baseAmount: 1.5, unit: 'lžičky', category: 'spiz', haveAtHome: true },
      { id: 'ccc7', name: 'Chilli vločky nebo paprička', baseAmount: 1, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'ccc8', name: 'Kvalitní hořká čokoláda 70 %', baseAmount: 20, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'ccc9', name: 'Koriandr a zakysaná smetana', baseAmount: 1, unit: 'balení', category: 'mlecne', haveAtHome: false },
      { id: 'ccc10', name: 'Jasmínová rýže nebo tortilly', baseAmount: 320, unit: 'g', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'hovezi-vyvar',
    title: 'Hovězí vývar s játrovými knedlíčky',
    categoryTag: 'polevky',
    categoryLabel: 'Polévky & Saláty',
    emoji: '🍲',
    description: 'Zlatavý poctivý nedělní hovězí vývar s domácími játrovými knedlíčky a polévkovými nudlemi.',
    time: '120 min',
    difficulty: 'Střední',
    basePortions: 4,
    ingredients: [
      { id: 'hv1', name: 'Hovězí kosti a přední maso', baseAmount: 800, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'hv2', name: 'Kořenová zelenina (mrkev, celer, petržel)', baseAmount: 400, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'hv3', name: 'Cibule se slupkou pro barvu', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: true },
      { id: 'hv4', name: 'Hovězí nebo vepřová játra', baseAmount: 200, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'hv5', name: 'Česnek do knedlíčků', baseAmount: 3, unit: 'stroužky', category: 'zelenina', haveAtHome: true },
      { id: 'hv6', name: 'Strouhanka', baseAmount: 60, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'hv7', name: 'Čerstvé vejce', baseAmount: 1, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'hv8', name: 'Sušená majoránka', baseAmount: 1, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'hv9', name: 'Vaječné polévkové nudle', baseAmount: 150, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'hv10', name: 'Čerstvá petrželka', baseAmount: 1, unit: 'hrst', category: 'bylinky', haveAtHome: false },
      { id: 'hv11', name: 'Bobkový list, nové koření a celý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'losos',
    title: 'Pečený losos na másle s batátovým pyré',
    categoryTag: 'rychle',
    categoryLabel: 'Rychlovky & Ryby',
    emoji: '🐟',
    description: 'Šťavnatý filet z lososa opečený na másle s jemným krémovým pyré ze sladkých batátů.',
    time: '25 min',
    difficulty: 'Snadné',
    basePortions: 4,
    ingredients: [
      { id: 'ls1', name: 'Čerstvý filet z lososa', baseAmount: 600, unit: 'g', category: 'maso', haveAtHome: false },
      { id: 'ls2', name: 'Batáty (sladké brambory)', baseAmount: 700, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'ls3', name: 'Máslo', baseAmount: 60, unit: 'g', category: 'mlecne', haveAtHome: true },
      { id: 'ls4', name: 'Smetana na zjemnění pyré', baseAmount: 100, unit: 'ml', category: 'mlecne', haveAtHome: false },
      { id: 'ls5', name: 'Citron', baseAmount: 1, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'ls6', name: 'Čerstvý kopr nebo tymián', baseAmount: 1, unit: 'hrst', category: 'bylinky', haveAtHome: false },
      { id: 'ls7', name: 'Olivový olej', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'ls8', name: 'Mořská sůl a bílý pepř', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'boruvkove-knedliky',
    title: 'Kynuté borůvkové knedlíky s tvarohem',
    categoryTag: 'sladke',
    categoryLabel: 'Sladká jídla',
    emoji: '🫐',
    description: 'Nadýchané kynuté knedlíky plněné borůvkami, posypané strouhaným tvrdým tvarohem a polité máslem.',
    time: '60 min',
    difficulty: 'Střední',
    basePortions: 4,
    ingredients: [
      { id: 'bk1', name: 'Hrubá nebo polohrubá mouka', baseAmount: 400, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'bk2', name: 'Čerstvé droždí', baseAmount: 25, unit: 'g', category: 'spiz', haveAtHome: false },
      { id: 'bk3', name: 'Vlahé plnotučné mléko', baseAmount: 220, unit: 'ml', category: 'mlecne', haveAtHome: false },
      { id: 'bk4', name: 'Vaječný žloutek', baseAmount: 1, unit: 'ks', category: 'spiz', haveAtHome: true },
      { id: 'bk5', name: 'Cukr krupice do těsta', baseAmount: 2, unit: 'lžíce', category: 'spiz', haveAtHome: true },
      { id: 'bk6', name: 'Borůvky (čerstvé či mražené)', baseAmount: 300, unit: 'g', category: 'zelenina', haveAtHome: false },
      { id: 'bk7', name: 'Tvrdý tvaroh na strouhání', baseAmount: 180, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'bk8', name: 'Moučkový cukr na posyp', baseAmount: 80, unit: 'g', category: 'spiz', haveAtHome: true },
      { id: 'bk9', name: 'Máslo na přelití', baseAmount: 80, unit: 'g', category: 'mlecne', haveAtHome: true },
      { id: 'bk10', name: 'Špetka soli', baseAmount: null, unit: 'špetka', category: 'spiz', haveAtHome: true },
    ],
  },
  {
    id: 'aglio-olio',
    title: 'Špagety Aglio Olio e Peperoncino',
    categoryTag: 'rychle',
    categoryLabel: 'Rychlovky & Těstoviny',
    emoji: '🧄',
    description: 'Blesková italská klasika s plátky česneku, olivovým olejem, feferonkou a čerstvou petrželkou.',
    time: '15 min',
    difficulty: 'Velmi snadné',
    basePortions: 4,
    ingredients: [
      { id: 'ao1', name: 'Semolinové špagety', baseAmount: 400, unit: 'g', category: 'testoviny', haveAtHome: false },
      { id: 'ao2', name: 'Extra panenský olivový olej', baseAmount: 80, unit: 'ml', category: 'spiz', haveAtHome: true },
      { id: 'ao3', name: 'Čerstvý česnek', baseAmount: 6, unit: 'stroužků', category: 'zelenina', haveAtHome: true },
      { id: 'ao4', name: 'Čerstvá chilli paprička', baseAmount: 2, unit: 'ks', category: 'zelenina', haveAtHome: false },
      { id: 'ao5', name: 'Hladkolistá petrželka', baseAmount: 1, unit: 'svazek', category: 'bylinky', haveAtHome: false },
      { id: 'ao6', name: 'Parmezán na posypání', baseAmount: 40, unit: 'g', category: 'mlecne', haveAtHome: false },
      { id: 'ao7', name: 'Hrubá sůl do vody na těstoviny', baseAmount: null, unit: 'dle chuti', category: 'spiz', haveAtHome: true },
    ],
  },
];

// Helper to format scaled quantities cleanly in Czech
function formatQuantity(baseAmount: number | null, portions: number, basePortions: number): string {
  if (baseAmount === null) return '';
  const ratio = portions / basePortions;
  const scaled = baseAmount * ratio;

  // If number is integer
  if (Math.abs(scaled - Math.round(scaled)) < 0.01) {
    return Math.round(scaled).toLocaleString('cs-CZ');
  }

  // Handle common fractional halves and quarters
  const roundedOneDec = Math.round(scaled * 10) / 10;
  if (Math.abs(scaled - roundedOneDec) < 0.05) {
    return roundedOneDec.toLocaleString('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  }

  // Otherwise 2 decimal places max
  return (Math.round(scaled * 100) / 100).toLocaleString('cs-CZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export default function App() {
  // Selected recipe & category filter state
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('bolognese');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<string>('all');
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');

  const activeRecipe = useMemo(() => {
    return PRESET_RECIPES.find((r) => r.id === selectedRecipeId) || PRESET_RECIPES[0];
  }, [selectedRecipeId]);

  // Portions state (defaults to basePortions of recipe)
  const [portions, setPortions] = useState<number>(activeRecipe.basePortions);

  // Ingredients state (tracks "haveAtHome" per recipe)
  const [ingredients, setIngredients] = useState<Ingredient[]>(activeRecipe.ingredients);

  // Shopping list state
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [shoppingFilter, setShoppingFilter] = useState<'all' | 'pending' | 'bought'>('all');
  const [newCustomItemName, setNewCustomItemName] = useState<string>('');
  const [newCustomItemAmount, setNewCustomItemAmount] = useState<string>('');

  // UI state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddIngredientModal, setShowAddIngredientModal] = useState<boolean>(false);
  const [newIngName, setNewIngName] = useState('');
  const [newIngAmount, setNewIngAmount] = useState('');
  const [newIngUnit, setNewIngUnit] = useState('g');
  const [newIngHave, setNewIngHave] = useState(false);

  const shoppingListRef = useRef<HTMLDivElement>(null);

  // Ensure dark mode is always permanently applied
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
  }, []);

  // When active recipe changes, reset portions and load its ingredients
  const handleSelectRecipe = (id: string) => {
    const r = PRESET_RECIPES.find((rec) => rec.id === id);
    if (r) {
      setSelectedRecipeId(id);
      setPortions(r.basePortions);
      setIngredients(r.ingredients);
      showToast(`Načten recept: ${r.title}`);
    }
  };

  // Toast notifier
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  };

  // Toggle "Mám doma" for an ingredient
  const toggleHaveAtHome = (id: string) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, haveAtHome: !item.haveAtHome } : item))
    );
  };

  // Bulk actions for pantry
  const markAllHaveAtHome = (have: boolean) => {
    setIngredients((prev) => prev.map((item) => ({ ...item, haveAtHome: have })));
    showToast(have ? 'Všechny suroviny označeny jako "mám doma"' : 'Všechny suroviny označeny k nákupu');
  };

  const markPantryStaples = () => {
    setIngredients((prev) =>
      prev.map((item) => {
        const nameLower = item.name.toLowerCase();
        const isStaple =
          item.category === 'spiz' ||
          item.unit === 'dle chuti' ||
          item.unit === 'špetka' ||
          nameLower.includes('olej') ||
          nameLower.includes('sůl') ||
          nameLower.includes('pepř') ||
          nameLower.includes('cukr') ||
          nameLower.includes('mouka') ||
          nameLower.includes('česnek') ||
          nameLower.includes('cibule');
        return isStaple ? { ...item, haveAtHome: true } : item;
      })
    );
    showToast('Základní spížové suroviny (koření, olej, sůl, cibule) označeny jako dostupné.');
  };

  // Generate Shopping List
  const handleGenerateShoppingList = () => {
    const needed = ingredients.filter((ing) => !ing.haveAtHome);

    const generatedItems: ShoppingItem[] = needed.map((ing) => {
      const formattedQty = formatQuantity(ing.baseAmount, portions, activeRecipe.basePortions);
      const amountText = ing.baseAmount !== null ? `${formattedQty} ${ing.unit}`.trim() : ing.unit;
      return {
        id: `shop-${ing.id}-${Date.now()}`,
        name: ing.name,
        amountText,
        category: ing.category,
        bought: false,
      };
    });

    setShoppingList(generatedItems);

    // Scroll smoothly to shopping list
    setTimeout(() => {
      shoppingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    if (generatedItems.length === 0) {
      showToast('Skvělé! Všechny suroviny máte doma, nákupní seznam je prázdný.');
    } else {
      showToast(`Vygenerován nákupní seznam s ${generatedItems.length} položkami.`);
    }
  };

  // Toggle item bought in shopping list
  const toggleItemBought = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item))
    );
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // ignore
      }
    }
  };

  // Delete item from shopping list
  const deleteShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  // Add custom item directly to shopping list
  const handleAddCustomShoppingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: `custom-${Date.now()}`,
      name: newCustomItemName.trim(),
      amountText: newCustomItemAmount.trim(),
      category: 'jine',
      bought: false,
      isCustom: true,
    };

    setShoppingList((prev) => [...prev, newItem]);
    setNewCustomItemName('');
    setNewCustomItemAmount('');
    showToast(`Položka "${newItem.name}" přidána do nákupního seznamu.`);
  };

  // Copy shopping list to clipboard
  const handleCopyShoppingList = async () => {
    if (shoppingList.length === 0) {
      showToast('Nákupní seznam je prázdný, není co kopírovat.');
      return;
    }

    const unbought = shoppingList.filter((item) => !item.bought);
    const bought = shoppingList.filter((item) => item.bought);

    let text = `🛒 Nákupní seznam: ${activeRecipe.title} (${portions} ${
      portions === 1 ? 'porce' : portions >= 2 && portions <= 4 ? 'porce' : 'porcí'
    })\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

    if (unbought.length > 0) {
      text += `K NÁKUPU:\n`;
      unbought.forEach((item) => {
        text += `◻ ${item.amountText ? item.amountText + ' ' : ''}${item.name}\n`;
      });
    }

    if (bought.length > 0) {
      text += `\nJIŽ V KOŠÍKU:\n`;
      bought.forEach((item) => {
        text += `☑ ${item.amountText ? item.amountText + ' ' : ''}${item.name}\n`;
      });
    }

    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Vytvořeno v aplikaci Chytrá kalkulačka receptů`;

    try {
      await navigator.clipboard.writeText(text);
      showToast('✅ Nákupní seznam byl zkopírován do schránky! Můžete jej vložit do zprávy.');
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('✅ Seznam byl zkopírován do schránky!');
    }
  };

  // Share shopping list via Web Share API
  const handleShareList = async () => {
    if (shoppingList.length === 0) {
      showToast('Nákupní seznam je prázdný.');
      return;
    }

    let text = `🛒 Nákupní seznam: ${activeRecipe.title} (${portions} porcí)\n`;
    shoppingList.forEach((item) => {
      text += `${item.bought ? '☑' : '◻'} ${item.amountText ? item.amountText + ' ' : ''}${item.name}\n`;
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Nákupní seznam: ${activeRecipe.title}`,
          text: text,
        });
      } catch {
        handleCopyShoppingList();
      }
    } else {
      handleCopyShoppingList();
    }
  };

  // Add custom ingredient to recipe
  const handleAddIngredientToRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngName.trim()) return;

    const amountNum = newIngAmount ? parseFloat(newIngAmount) : null;
    const newIngredient: Ingredient = {
      id: `ing-${Date.now()}`,
      name: newIngName.trim(),
      baseAmount: amountNum,
      unit: newIngUnit.trim() || 'ks',
      category: 'jine',
      haveAtHome: newIngHave,
    };

    setIngredients((prev) => [...prev, newIngredient]);
    setNewIngName('');
    setNewIngAmount('');
    setNewIngUnit('g');
    setNewIngHave(false);
    setShowAddIngredientModal(false);
    showToast(`Surovina "${newIngredient.name}" přidána do receptu.`);
  };

  // Filtered recipe catalogue list
  const filteredRecipes = useMemo(() => {
    return PRESET_RECIPES.filter((r) => {
      const matchesCategory =
        recipeCategoryFilter === 'all' || r.categoryTag === recipeCategoryFilter;
      const matchesSearch =
        recipeSearchQuery.trim() === '' ||
        r.title.toLowerCase().includes(recipeSearchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(recipeSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [recipeCategoryFilter, recipeSearchQuery]);

  // Computed stats
  const homeCount = ingredients.filter((i) => i.haveAtHome).length;
  const missingCount = ingredients.length - homeCount;

  const totalShopItems = shoppingList.length;
  const boughtShopItems = shoppingList.filter((i) => i.bought).length;
  const pendingShopItems = totalShopItems - boughtShopItems;
  const progressPercent = totalShopItems > 0 ? Math.round((boughtShopItems / totalShopItems) * 100) : 0;

  const filteredShoppingList = useMemo(() => {
    if (shoppingFilter === 'pending') return shoppingList.filter((i) => !i.bought);
    if (shoppingFilter === 'bought') return shoppingList.filter((i) => i.bought);
    return shoppingList;
  }, [shoppingList, shoppingFilter]);

  const portionScaleFactor = (portions / activeRecipe.basePortions).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 text-sm font-medium border border-emerald-500/30">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-200" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-100 hover:text-white text-xs px-2 py-1 rounded bg-emerald-700/50"
            >
              Zavřít
            </button>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 theme-surface backdrop-blur-md bg-opacity-90 border-b theme-border px-4 py-3 shadow-xs">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 text-lg">
              🍳
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight leading-tight theme-text-main flex items-center gap-1.5">
                Chytrá kalkulačka receptů
              </h1>
              <p className="text-xs theme-text-muted">Přepočet porcí & nákupní seznam do kapsy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-3.5 py-4 sm:px-4 sm:py-6 space-y-5 pb-24">
        {/* RECIPE CATALOGUE & SELECTOR */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider theme-text-muted flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Katalog receptů ({PRESET_RECIPES.length} receptů):
            </span>
            <span className="text-xs theme-text-muted">
              Vybráno: <strong className="theme-text-main">{activeRecipe.title}</strong>
            </span>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: `Všechny (${PRESET_RECIPES.length})` },
              { id: 'ceska', label: '🇨🇿 Česká klasika' },
              { id: 'svetova', label: '🌍 Světová' },
              { id: 'polevky', label: '🥣 Polévky & Saláty' },
              { id: 'sladke', label: '🥞 Sladká' },
              { id: 'rychle', label: '⚡ Rychlovky' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setRecipeCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  recipeCategoryFilter === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'theme-surface border theme-border theme-text-muted hover:theme-text-main'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 theme-text-muted" />
            <input
              type="text"
              placeholder="Vyhledat v receptech (např. svíčková, kuře, salát, polévka...)"
              value={recipeSearchQuery}
              onChange={(e) => setRecipeSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl theme-input border theme-border shadow-inner focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            {recipeSearchQuery && (
              <button
                onClick={() => setRecipeSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs theme-text-muted hover:theme-text-main"
              >
                ✕
              </button>
            )}
          </div>

          {/* Scrollable / Gridded Recipe Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredRecipes.map((recipe) => {
              const isSelected = recipe.id === selectedRecipeId;
              return (
                <button
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe.id)}
                  className={`p-2.5 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between gap-1.5 cursor-pointer active:scale-98 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                      : 'theme-surface border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl">{recipe.emoji}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-emerald-700/60 text-emerald-100'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {recipe.time}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isSelected ? 'text-white' : 'theme-text-main'
                      }`}
                    >
                      {recipe.title}
                    </h3>
                    <p
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? 'text-emerald-100' : 'theme-text-muted'
                      }`}
                    >
                      {recipe.categoryLabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ACTIVE RECIPE CARD & PORTIONS SCALER */}
        <section className="theme-surface rounded-3xl p-4 sm:p-6 border theme-border shadow-sm space-y-5">
          {/* Recipe Title & Metadata */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-2">
                  <span>{activeRecipe.emoji}</span>
                  <span>Základní recept: {activeRecipe.basePortions} porce</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold theme-text-main tracking-tight leading-tight">
                  {activeRecipe.title}
                </h2>
                <p className="text-xs sm:text-sm theme-text-muted mt-1 leading-relaxed">
                  {activeRecipe.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 text-xs theme-text-muted pt-2 border-t theme-border flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                Doba přípravy: <strong>{activeRecipe.time}</strong>
              </span>
              <span className="flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5 text-amber-500" />
                Náročnost: <strong>{activeRecipe.difficulty}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                Přepočítáno na: <strong className="theme-text-main">{portions} porcí</strong>
              </span>
            </div>
          </div>

          {/* 1. PORTIONS CALCULATOR WIDGET */}
          <div className="p-4 rounded-2xl theme-surface-subtle border theme-border space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="portions-input"
                className="text-xs sm:text-sm font-bold theme-text-main flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Počet porcí k uvaření:
              </label>

              {portions !== activeRecipe.basePortions && (
                <button
                  onClick={() => setPortions(activeRecipe.basePortions)}
                  className="text-[11px] theme-text-muted hover:text-emerald-600 flex items-center gap-1 underline underline-offset-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Zpět na základ ({activeRecipe.basePortions})
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Decrement Button */}
              <button
                onClick={() => setPortions((prev) => Math.max(1, prev - 1))}
                disabled={portions <= 1}
                aria-label="Snížit počet porcí"
                className="w-12 h-12 rounded-2xl theme-surface border theme-border flex items-center justify-center font-bold text-xl theme-text-main shadow-xs active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <Minus className="w-5 h-5" />
              </button>

              {/* Number Input Field */}
              <div className="flex-1 relative">
                <input
                  id="portions-input"
                  type="number"
                  min="1"
                  max="99"
                  value={portions}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1) setPortions(val);
                    else if (e.target.value === '') setPortions(1);
                  }}
                  className="w-full h-12 text-center text-xl sm:text-2xl font-black rounded-2xl theme-input border theme-border shadow-inner focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold theme-text-muted pointer-events-none">
                  {portions === 1 ? 'porce' : portions >= 2 && portions <= 4 ? 'porce' : 'porcí'}
                </span>
              </div>

              {/* Increment Button */}
              <button
                onClick={() => setPortions((prev) => Math.min(99, prev + 1))}
                aria-label="Zvýšit počet porcí"
                className="w-12 h-12 rounded-2xl theme-surface border theme-border flex items-center justify-center font-bold text-xl theme-text-main shadow-xs active:scale-95 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Portions Preset Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] theme-text-muted mr-1 font-medium">Rychlá volba:</span>
              {[1, 2, 4, 6, 8, 12].map((num) => (
                <button
                  key={num}
                  onClick={() => setPortions(num)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    portions === num
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'theme-surface border theme-border theme-text-muted hover:theme-text-main'
                  }`}
                >
                  {num} {num === 1 ? 'porce' : 'p.'}
                </button>
              ))}
              <span className="text-[11px] ml-auto font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {portionScaleFactor}× dávka
              </span>
            </div>
          </div>

          {/* 2. INGREDIENTS TABLE & PANTRY MANAGEMENT ("Mám doma") */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold theme-text-main flex items-center gap-2">
                  <span>Suroviny receptu</span>
                  <span className="text-xs font-normal theme-text-muted">
                    ({ingredients.length} položek)
                  </span>
                </h3>
                <p className="text-xs theme-text-muted">
                  Zaškrtněte suroviny, které již máte doma ve spíži nebo lednici.
                </p>
              </div>

              {/* Bulk actions */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => markAllHaveAtHome(true)}
                  className="text-[11px] px-2 py-1 rounded-md theme-surface border theme-border theme-text-muted hover:text-emerald-600 font-medium cursor-pointer"
                  title="Označit všechny suroviny jako doma"
                >
                  Mám vše doma
                </button>
                <button
                  onClick={() => markAllHaveAtHome(false)}
                  className="text-[11px] px-2 py-1 rounded-md theme-surface border theme-border theme-text-muted hover:text-emerald-600 font-medium cursor-pointer"
                  title="Odznačit vše – chci nakoupit všechno"
                >
                  Vše nakoupit
                </button>
                <button
                  onClick={markPantryStaples}
                  className="text-[11px] px-2 py-1 rounded-md theme-surface border theme-border theme-text-muted hover:text-amber-600 font-medium cursor-pointer"
                  title="Označit základní trvanlivé koření, mouku, sůl a olej"
                >
                  Spížové zásoby
                </button>
              </div>
            </div>

            {/* Pantry Summary Banner */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border theme-border text-xs">
              <div className="flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="theme-text-main font-medium">
                  Stav zásob: <strong>{homeCount}</strong> doma •{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-bold">
                    {missingCount} k nákupu
                  </span>
                </span>
              </div>
              <button
                onClick={() => setShowAddIngredientModal(true)}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Přidat surovinu
              </button>
            </div>

            {/* Ingredients List / Table */}
            <div className="rounded-2xl border theme-border overflow-hidden divide-y theme-border">
              {/* Header */}
              <div className="grid grid-cols-12 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider theme-text-muted">
                <div className="col-span-6 sm:col-span-7">Surovina</div>
                <div className="col-span-3 sm:col-span-3 text-right">Množství</div>
                <div className="col-span-3 sm:col-span-2 text-right sm:text-center">Mám doma</div>
              </div>

              {/* Rows */}
              {ingredients.map((ing) => {
                const scaledQty = formatQuantity(ing.baseAmount, portions, activeRecipe.basePortions);

                return (
                  <div
                    key={ing.id}
                    onClick={() => toggleHaveAtHome(ing.id)}
                    className={`grid grid-cols-12 items-center px-3.5 py-3 cursor-pointer select-none transition-colors duration-150 ${
                      ing.haveAtHome
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Name */}
                    <div className="col-span-6 sm:col-span-7 flex items-center gap-2 pr-2">
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          ing.haveAtHome ? 'bg-emerald-500' : 'bg-amber-400'
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm font-medium leading-tight ${
                          ing.haveAtHome
                            ? 'theme-text-muted line-through decoration-emerald-500/50'
                            : 'theme-text-main font-semibold'
                        }`}
                      >
                        {ing.name}
                      </span>
                    </div>

                    {/* Recalculated Dynamic Amount */}
                    <div className="col-span-3 sm:col-span-3 text-right font-mono text-xs sm:text-sm">
                      {ing.baseAmount !== null ? (
                        <span className="font-bold theme-text-main">
                          {scaledQty}{' '}
                          <span className="text-[11px] font-sans font-normal theme-text-muted">
                            {ing.unit}
                          </span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-sans italic theme-text-muted">
                          {ing.unit}
                        </span>
                      )}
                    </div>

                    {/* "Mám doma" Checkbox Toggle */}
                    <div
                      className="col-span-3 sm:col-span-2 flex items-center justify-end sm:justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs group">
                        <input
                          type="checkbox"
                          checked={ing.haveAtHome}
                          onChange={() => toggleHaveAtHome(ing.id)}
                          className="touch-checkbox"
                          aria-label={`Mám doma ${ing.name}`}
                        />
                        <span
                          className={`text-[11px] font-medium hidden sm:inline ${
                            ing.haveAtHome ? 'text-emerald-600 dark:text-emerald-400' : 'theme-text-muted'
                          }`}
                        >
                          {ing.haveAtHome ? 'Mám' : 'Koupit'}
                        </span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. GENERATE SHOPPING LIST ACTION BUTTON */}
          <div className="pt-2">
            <button
              onClick={handleGenerateShoppingList}
              className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Vygenerovat nákupní seznam ({missingCount} položek)</span>
              <ArrowDown className="w-4 h-4 opacity-80 animate-bounce" />
            </button>
            <p className="text-center text-[11px] theme-text-muted mt-2">
              Do nákupního seznamu se přenesou pouze nezaškrtnuté suroviny s přepočteným množstvím.
            </p>
          </div>
        </section>

        {/* 4. CHYTRÝ NÁKUPNÍ SEZNAM PRO SUPERMARKET */}
        <section
          ref={shoppingListRef}
          id="shopping-list"
          className="theme-surface rounded-3xl p-4 sm:p-6 border theme-border shadow-sm space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b theme-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold theme-text-main tracking-tight">
                  Nákupní seznam do obchodu
                </h3>
              </div>
              <p className="text-xs theme-text-muted mt-0.5">
                V supermarketu položky odškrtávejte kliknutím – vizuálně se přeškrtnou.
              </p>
            </div>

            {/* Actions: Copy & Share */}
            {shoppingList.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyShoppingList}
                  className="px-3 py-2 rounded-xl theme-surface border theme-border text-xs font-bold theme-text-main hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="Zkopírovat seznam jako text do schránky"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Zkopírovat seznam</span>
                </button>

                <button
                  onClick={handleShareList}
                  className="p-2 rounded-xl theme-surface border theme-border text-xs font-bold theme-text-muted hover:text-emerald-600 shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="Sdílet přes zprávy nebo WhatsApp"
                  aria-label="Sdílet seznam"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Empty State */}
          {shoppingList.length === 0 ? (
            <div className="text-center py-8 px-4 border-2 border-dashed theme-border rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold theme-text-main">
                Nákupní seznam zatím není vygenerován
              </h4>
              <p className="text-xs theme-text-muted max-w-sm mx-auto">
                Vyberte si recept výše, upravte počet porcí a klikněte na{' '}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  „Vygenerovat nákupní seznam“
                </strong>
                .
              </p>
              <button
                onClick={handleGenerateShoppingList}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-sm cursor-pointer"
              >
                Vygenerovat nyní
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Shopping Progress Bar */}
              <div className="p-3.5 rounded-2xl theme-surface-subtle border theme-border space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="theme-text-main flex items-center gap-1.5">
                    <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Nakoupeno: {boughtShopItems} z {totalShopItems} položek
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    {progressPercent} %
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {boughtShopItems === totalShopItems && totalShopItems > 0 && (
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 text-center animate-pulse pt-1">
                    🎉 Vše máte v košíku! Můžete zamířit k pokladně.
                  </p>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1 p-1 rounded-xl theme-surface-subtle border theme-border text-xs">
                  <button
                    onClick={() => setShoppingFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      shoppingFilter === 'all'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'theme-text-muted hover:theme-text-main'
                    }`}
                  >
                    Vše ({totalShopItems})
                  </button>
                  <button
                    onClick={() => setShoppingFilter('pending')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      shoppingFilter === 'pending'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'theme-text-muted hover:theme-text-main'
                    }`}
                  >
                    Zbývá koupit ({pendingShopItems})
                  </button>
                  <button
                    onClick={() => setShoppingFilter('bought')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      shoppingFilter === 'bought'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'theme-text-muted hover:theme-text-main'
                    }`}
                  >
                    V košíku ({boughtShopItems})
                  </button>
                </div>

                {/* Quick actions for shopping list */}
                <div className="flex items-center gap-1 text-[11px]">
                  {boughtShopItems > 0 && (
                    <button
                      onClick={() =>
                        setShoppingList((prev) => prev.map((item) => ({ ...item, bought: false })))
                      }
                      className="px-2 py-1 rounded-md theme-surface border theme-border theme-text-muted hover:text-emerald-600 cursor-pointer"
                    >
                      Odznačit vše
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm('Opravdu chcete vyčistit celý nákupní seznam?')) {
                        setShoppingList([]);
                      }
                    }}
                    className="px-2 py-1 rounded-md theme-surface border theme-border text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    Vymazat
                  </button>
                </div>
              </div>

              {/* Shopping List Items */}
              <div className="space-y-2">
                {filteredShoppingList.length === 0 ? (
                  <p className="text-center py-6 text-xs theme-text-muted">
                    {shoppingFilter === 'pending'
                      ? 'Žádné zbývající položky k nákupu! Vše je v košíku.'
                      : shoppingFilter === 'bought'
                      ? 'Zatím jste nic nevložili do košíku.'
                      : 'Žádné položky k zobrazení.'}
                  </p>
                ) : (
                  filteredShoppingList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItemBought(item.id)}
                      className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer select-none active:scale-[0.99] ${
                        item.bought
                          ? 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                          : 'theme-surface border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Interactive Supermarket Checkbox */}
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                            item.bought
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-400 dark:border-slate-600 group-hover:border-emerald-500 bg-white dark:bg-slate-800'
                          }`}
                        >
                          {item.bought && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>

                        {/* Item Name & Details */}
                        <div className="min-w-0">
                          <p
                            className={`text-sm sm:text-base font-semibold leading-tight truncate ${
                              item.bought
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'theme-text-main'
                            }`}
                          >
                            {item.name}
                          </p>
                          {item.isCustom && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                              Vlastní doplňková položka
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Amount & Delete */}
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        {item.amountText && (
                          <span
                            className={`text-xs sm:text-sm font-mono font-bold px-2 py-1 rounded-lg ${
                              item.bought
                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 line-through'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            }`}
                          >
                            {item.amountText}
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteShoppingItem(item.id);
                          }}
                          className="opacity-40 group-hover:opacity-100 hover:text-red-500 p-1.5 rounded-lg transition-opacity cursor-pointer"
                          title="Odstranit položku"
                          aria-label={`Odstranit ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Extra Custom Item Form (Supermarket quick add) */}
              <form
                onSubmit={handleAddCustomShoppingItem}
                className="pt-2 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Přidat další položku (např. pečivo, máslo...)"
                  value={newCustomItemName}
                  onChange={(e) => setNewCustomItemName(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-xl text-xs sm:text-sm theme-input border theme-border shadow-inner focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Množství"
                  value={newCustomItemAmount}
                  onChange={(e) => setNewCustomItemAmount(e.target.value)}
                  className="w-24 h-10 px-2 text-center rounded-xl text-xs sm:text-sm theme-input border theme-border shadow-inner focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!newCustomItemName.trim()}
                  className="h-10 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Přidat</span>
                </button>
              </form>
            </div>
          )}
        </section>

        {/* Informative Tips Section */}
        <section className="p-4 rounded-2xl theme-surface border theme-border text-xs theme-text-muted space-y-2">
          <div className="flex items-center gap-1.5 font-bold theme-text-main">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Tipy pro chytré nakupování</span>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 leading-relaxed">
            <li>
              Vybírejte z <strong>{PRESET_RECIPES.length} předpřipravených receptů</strong> v katalogu nahoře včetně české i světové kuchyně.
            </li>
            <li>
              Při změně počtu porcí nahoře se množství surovin okamžitě v reálném čase přepočítá.
            </li>
            <li>
              Tlačítko <strong>„Zkopírovat seznam“</strong> zkopíruje čistý text s checkboxy připravený pro odeslání partnerovi přes SMS, WhatsApp či Messenger.
            </li>
          </ul>
        </section>
      </main>

      {/* Sticky Mobile Floating Footer */}
      {shoppingList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-3 theme-surface/95 backdrop-blur-md border-t theme-border z-40 sm:hidden">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="theme-text-muted">Košík: </span>
              <strong className="theme-text-main">
                {boughtShopItems}/{totalShopItems} ({progressPercent} %)
              </strong>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShoppingList}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold theme-text-main flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Kopírovat
              </button>
              <button
                onClick={() =>
                  shoppingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Seznam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add custom ingredient to recipe */}
      {showAddIngredientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="theme-surface w-full max-w-sm rounded-3xl p-5 border theme-border shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold theme-text-main flex items-center gap-2">
                <ListPlus className="w-4 h-4 text-emerald-600" />
                Přidat surovinu do receptu
              </h4>
              <button
                onClick={() => setShowAddIngredientModal(false)}
                className="text-xs theme-text-muted hover:theme-text-main cursor-pointer"
              >
                Zavřít
              </button>
            </div>

            <form onSubmit={handleAddIngredientToRecipe} className="space-y-3">
              <div>
                <label className="text-xs font-semibold theme-text-muted">Název suroviny</label>
                <input
                  type="text"
                  required
                  placeholder="např. Máslo, Smetana..."
                  value={newIngName}
                  onChange={(e) => setNewIngName(e.target.value)}
                  className="w-full mt-1 h-10 px-3 rounded-xl text-sm theme-input border theme-border focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold theme-text-muted">
                    Množství (pro {activeRecipe.basePortions} porce)
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="např. 250"
                    value={newIngAmount}
                    onChange={(e) => setNewIngAmount(e.target.value)}
                    className="w-full mt-1 h-10 px-3 rounded-xl text-sm theme-input border theme-border focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold theme-text-muted">Jednotka</label>
                  <input
                    type="text"
                    placeholder="g, ml, ks, lžíce..."
                    value={newIngUnit}
                    onChange={(e) => setNewIngUnit(e.target.value)}
                    className="w-full mt-1 h-10 px-3 rounded-xl text-sm theme-input border theme-border focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newIngHave}
                  onChange={(e) => setNewIngHave(e.target.checked)}
                  className="touch-checkbox"
                />
                <span className="text-xs theme-text-main font-medium">Již mám tuto surovinu doma</span>
              </label>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddIngredientModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold theme-text-muted hover:theme-text-main cursor-pointer"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Uložit surovinu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
