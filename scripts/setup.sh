#!/bin/bash
set -e

echo "Setting up Honeycomb Academy Visual Asset Creator..."

echo ""
echo "Installing root dependencies (puppeteer)..."
npm install

echo ""
echo "Installing Remotion dependencies..."
cd remotion && npm install && cd ..

echo ""
echo "Done. Next steps:"
echo "  • Run 'claude' from the repo root to start generating assets"
echo "  • Open http://localhost:3001 after running 'npm start' inside remotion/"
