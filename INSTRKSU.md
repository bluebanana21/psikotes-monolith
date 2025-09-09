Setup Commands:
bash# From project root directory
npm run install:all  # Install dependencies for root, backend, and frontend

# Or install manually:
npm install           # Install root dependencies
cd backend && npm install
cd ../frontend && npm install

Development Commands:
bash# From project root - runs both frontend and backend simultaneously
npm run dev

# Or run individually:
npm run dev:backend   # Runs backend on port 3000
npm run dev:frontend  # Runs frontend on port 5173

# Run only backend
cd backend && npm run dev

# Run only frontend  
cd frontend && npm run dev
Production Commands:
bash# Build both projects
npm run build

# Start production server (backend only)
npm start

# Or build individually:
npm run build:backend
npm run build:frontend
Additional Commands:
bash# Testing
npm run test          # Test both projects
npm run test:backend  # Test backend only
npm run test:frontend # Test frontend only

# Linting
cd backend && npm run lint
cd frontend && npm run lint

# Clean build directories
npm run clean
Key Features:

Concurrent Development - Both frontend and backend run simultaneously
Proxy Configuration - Frontend proxies API calls to backend
TypeScript Support - Both projects configured for TypeScript
Hot Reload - Changes automatically reload during development
Production Ready - Build scripts for deployment
Testing Setup - Jest for backend, Vitest for frontend
Linting - ESLint configured for both projects

The frontend will run on http://localhost:5173 and automatically proxy API requests to the backend running on http://localhost:3000.