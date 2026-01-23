/**
 * @fileoverview Componente raiz da aplicação.
 * 
 * Configura os providers globais (React Query, Helmet, Tooltip) e define
 * o roteamento principal da aplicação.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import GamesPage from "./pages/Games";
import NotFound from "./pages/NotFound";
import '@/lib/i18n';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        {/* Sistema de notificações toast (shadcn/ui) */}
        <Toaster />
        {/* Sistema de notificações toast alternativo (sonner) */}
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<GamesPage />} />
            {/* Rotas customizadas devem ser adicionadas ACIMA da rota catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
