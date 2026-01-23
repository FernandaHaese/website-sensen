/**
 * @fileoverview Ponto de entrada da aplicação React.
 * 
 * Monta o componente App no elemento root do DOM.
 * O Strict Mode foi removido intencionalmente para evitar double-renders
 * em desenvolvimento que causavam problemas com animações.
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
