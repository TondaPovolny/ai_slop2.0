import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API endpoint for AI recipe generation
  app.post('/api/generate-recipe', async (req, res) => {
    try {
      const { ingredients, dietaryPreferences, mealType, maxTime } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback intelligent synthesizer response if no key configured
        return res.json({
          fallback: true,
          message: 'Používám vestavěný kulinářský generátor (GEMINI_API_KEY není nastavena v prostředí).',
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
Jsi špičkový šéfkuchař. Uživatel má v lednici následující dostupné suroviny: ${ingredients.join(', ')}.
${dietaryPreferences ? `Preference: ${dietaryPreferences}.` : ''}
${mealType ? `Typ jídla: ${mealType}.` : ''}
${maxTime ? `Maximální čas: ${maxTime} minut.` : ''}

Vytvoř JEDEN lákavý, realistický a chutný recept v češtině, který maximálně využívá zadané suroviny. 
Odpověz POUZE ve formátu JSON s touto strukturou:
{
  "title": "Název jídla",
  "description": "Lákavý stručný popis (1-2 věty)",
  "category": "snidane" | "obed_vece" | "svacina" | "dezert",
  "prepTime": číslo v minutách (např. 25),
  "difficulty": "Snadné" | "Střední" | "Pokročilé",
  "portions": 2,
  "calories": číslo kcal na porci (např. 420),
  "macros": { "protein": 22, "carbs": 38, "fat": 14 },
  "tags": ["Rychlovka", "AI Šéfkuchař", ...],
  "ingredients": [
    { "name": "název suroviny", "amount": "množství a jednotka", "optional": false }
  ],
  "instructions": [
    "Krok 1...",
    "Krok 2...",
    "Krok 3..."
  ],
  "chefTip": "Praktický kuchařský tip k tomuto jídlu"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json({ success: true, recipe: parsed });
      } catch (parseErr) {
        console.error('Failed to parse Gemini output:', text);
        return res.status(500).json({ error: 'Chyba při zpracování receptu od AI' });
      }
    } catch (err: any) {
      console.error('Gemini recipe generation error:', err);
      return res.status(500).json({ error: err.message || 'Chyba serveru při generování' });
    }
  });

  if (!isProd) {
    // Mount Vite middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Chyba při startu serveru:', err);
  process.exit(1);
});
