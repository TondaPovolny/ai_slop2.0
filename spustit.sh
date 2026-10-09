#!/bin/bash
echo "========================================================"
echo "  Recepty z Lednice - Spouštění aplikace"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[CHYBA] Node.js není nainstalován!"
    echo "Stáhněte a nainstalujte si Node.js zdarma z https://nodejs.org"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[1/2] První spuštění: Instaluji potřebné knihovny (npm install)..."
    npm install
fi

echo ""
echo "[2/2] Spouštím aplikaci na http://localhost:3000 ..."
echo ""

if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000 &
elif command -v open > /dev/null; then
    open http://localhost:3000 &
fi

npm run dev
