#!/bin/bash

echo "╔═══════════════════════════════════════╗"
echo "║       COLE BROWSER SETUP              ║"
echo "╚═══════════════════════════════════════╝"
echo ""

# Check for Node.js
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3."
    exit 1
fi

echo "📦 Installing Ultraviolet and dependencies..."
npm install

echo ""
echo "📁 Setting up Ultraviolet files..."
mkdir -p uv

# Copy Ultraviolet files if they exist
if [ -d "node_modules/@titaniumnetwork-dev/ultraviolet/dist" ]; then
    cp -r node_modules/@titaniumnetwork-dev/ultraviolet/dist/* uv/
    echo "✅ Ultraviolet files copied successfully"
else
    echo "⚠️  Ultraviolet dist not found. You may need to build it manually."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the browser, run:"
echo "   python3 server.py"
echo ""
echo "   or"
echo ""
echo "   npm start"
echo ""
echo "📖 Then open http://localhost:8080 in your browser"
echo ""
