#!/bin/bash

clear

echo "╔═══════════════════════════════════════════════════════╗"
echo "║            COLE BROWSER - TIKTOK SETUP                ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the right directory
if [ ! -f "tiktok.html" ]; then
    echo "❌ Error: tiktok.html not found"
    echo "   Please run this script from the /root/3 directory"
    exit 1
fi

# Check if Ultraviolet is built
if [ ! -f "uv/uv.bundle.js" ]; then
    echo "❌ Error: Ultraviolet not built"
    echo "   Run: cd Ultraviolet-main && npm install && npm run build"
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found"
    exit 1
fi

echo "✅ Ultraviolet proxy ready"
echo "✅ Gothic theme with background.avif"
echo "✅ Python server ready"
echo ""
echo "🚀 Starting Cole Browser Server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the server
python3 server.py
