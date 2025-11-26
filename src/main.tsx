import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './App.js'
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
