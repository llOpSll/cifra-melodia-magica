
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CifraNova from "./pages/CifraNova";
import CifraVisualizar from "./pages/CifraVisualizar";
import CifraEditar from "./pages/CifraEditar";
import Repertorios from "./pages/Repertorios";
import RepertorioNovo from "./pages/RepertorioNovo";
import RepertorioEditar from "./pages/RepertorioEditar";
import RepertorioTocar from "./pages/RepertorioTocar";
import LegacyApp from "./legacy/LegacyApp";

const queryClient = new QueryClient();

// Detectar iPad 2 pelo User Agent
function isIPad2() {
  var userAgent = navigator.userAgent;
  // iPad 2 roda iOS 9 e tem características específicas
  return userAgent.indexOf('iPad') !== -1 && 
         (userAgent.indexOf('OS 9_') !== -1 || userAgent.indexOf('OS 8_') !== -1 || userAgent.indexOf('OS 7_') !== -1);
}

const App = () => {
  // Se for iPad 2, usar versão legacy
  if (isIPad2()) {
    return <LegacyApp />;
  }

  // Versão moderna para dispositivos compatíveis
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL || "/cifras-app/"}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/nova" element={<CifraNova />} />
            <Route path="/editar/:id" element={<CifraEditar />} />
            <Route path="/cifras/:slug" element={<CifraVisualizar />} />
            <Route path="/repertorios" element={<Repertorios />} />
            <Route path="/repertorios/novo" element={<RepertorioNovo />} />
            <Route path="/repertorios/:id/editar" element={<RepertorioEditar />} />
            <Route path="/repertorios/:id/tocar" element={<RepertorioTocar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
