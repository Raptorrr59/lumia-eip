# Lumia Frontend

Welcome to the **Lumia Frontend**! This is the user-facing web application for the Lumia AI platform. It provides a sleek, modern, and highly interactive interface where developers can manage their AI models, track training progress, and review game performance.

## 🌟 Features & UI Highlights

- **Modern Tech Stack**: Built with **React 18** and bootstrapped via Create React App.
- **Rich Styling & Animations**: 
  - **TailwindCSS** for rapid, utility-first UI styling.
  - **Material UI (@mui/material)** for accessible, pre-built high-quality components.
  - **Framer Motion** for fluid, engaging page transitions and element animations.
- **Real-time Communication**: Utilizes `sockjs-client` and `@stomp/stompjs` for real-time WebSocket communication, allowing users to watch game logs and training statuses update live without refreshing.
- **Interactive Elements**: Features dynamic chat elements (`react-chat-elements`), interactive icons (`lucide-react`), and embedded media (`react-youtube`).
- **Robust Routing**: Client-side routing managed by `react-router-dom` for a seamless Single Page Application (SPA) experience.

## 🚀 Getting Started

If you want to run the frontend independently of the root Docker Compose setup:

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
Navigate to the `lumia` directory and install the dependencies:
```bash
npm install
```

### Configuration
By default, the development server proxies API requests to `http://localhost:8000` (the Spring Boot backend). If your backend is running on a different port, update the `"proxy"` field in `package.json` or use environment variables.

### Running the App
Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### Building for Production
To bundle the app into static files for production:
```bash
npm run build
```
This optimizes the build for the best performance and outputs the files to the `build` folder.

## 🧪 Testing

The project is configured with Jest for unit testing and Cypress for End-to-End (E2E) testing.

- **Run unit tests**:
  ```bash
  npm test
  ```
- **Open Cypress UI**:
  ```bash
  npm run cypress:open
  ```
- **Run E2E tests headless**:
  ```bash
  npm run test:e2e
  ```

## 🏗️ Project Structure

- `src/components`: Reusable UI components (buttons, modals, charts).
- `src/pages`: Top-level page components corresponding to different routes.
- `src/contexts`: React contexts for state management (e.g., Auth context).
- `src/utils`: Helper functions and API wrappers.
- `public`: Static assets, including the downloadable training packages (`tp-connect-four.zip`, etc.).
