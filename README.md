# Recepty z Lednice 🍳

Chytrý kulinářský rádce, který automaticky navrhuje recepty podle surovin ve vaší lednici, s podporou tmavého režimu, osobních oblíbených receptů a týdenního plánovače jídel.

---

## 🚀 Jak aplikaci spustit na počítači

Tato aplikace je vytvořená v moderním **Reactu a TypeScriptu** s nástrojem **Vite**. Z bezpečnostních důvodů internetové prohlížeče nepovolují spuštění moderních TypeScript modulů pouhým dvojklikem na `index.html` (protokol `file://`).

Aplikaci spustíte velmi snadno jedním ze dvou způsobů:

### Varianta A: Nejjednodušší (1 kliknutí)
1. Ujistěte se, že máte nainstalovaný bezplatný [Node.js](https://nodejs.org/) (doporučena verze LTS).
2. Na **Windows**: Dvakrát klikněte na soubor **`spustit.bat`**.
3. Na **Mac / Linux**: Spusťte v terminálu `./spustit.sh`.
4. Skript automaticky nainstaluje potřebné knihovny, spustí server a otevře aplikaci v prohlížeči.

---

### Varianta B: Přes příkazový řádek (Terminál / CMD)
1. Otevřete příkazový řádek (CMD, PowerShell nebo Terminál) ve složce projektu.
2. Nainstalujte knihovny:
   ```bash
   npm install
   ```
3. Spusťte vývojový server:
   ```bash
   npm run dev
   ```
4. Otevřete v prohlížeči adresu:
   ```
   http://localhost:3000
   ```

---

## 📦 Vytvoření samostatného balíčku (Produkční build)
Chcete-li aplikaci zkompilovat do čistého HTML/JS/CSS balíčku do složky `dist/`:
```bash
npm run build
```
Zkompilovanou složku můžete otestovat příkazem:
```bash
npm run preview
```
