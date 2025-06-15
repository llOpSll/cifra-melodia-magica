
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import { loadFileBasedCifras, loadFileBasedRepertorios } from "./utils/storage";

const queryClient = new QueryClient();

// Detectar iPad 2 de forma mais simples e robusta
function isLegacyDevice() {
  try {
    // Verificações básicas de compatibilidade
    var userAgent = navigator.userAgent || '';
    
    // Detectar iPad explicitamente
    var isIPad = userAgent.indexOf('iPad') > -1;
    
    // Detectar iOS antigo (iPad 2 suporta até iOS 9)
    var isOldIOS = userAgent.indexOf('OS 9_') > -1 || 
                   userAgent.indexOf('OS 8_') > -1 || 
                   userAgent.indexOf('OS 7_') > -1 ||
                   userAgent.indexOf('OS 6_') > -1 ||
                   userAgent.indexOf('OS 5_') > -1;
    
    // Verificar se recursos modernos estão disponíveis
    var hasModernFeatures = typeof Promise !== 'undefined' && 
                           typeof Object.assign !== 'undefined' &&
                           typeof Array.prototype.find !== 'undefined';
    
    // Se for iPad com iOS antigo OU não tiver recursos modernos, usar legacy
    return (isIPad && isOldIOS) || !hasModernFeatures;
  } catch (error) {
    // Se houver erro na detecção, usar versão legacy por segurança
    console.log('Erro na detecção, usando versão legacy');
    return true;
  }
}

const App = () => {
  // Carregar dados dos arquivos na inicialização
  useEffect(() => {
    async function carregarDados() {
      try {
        await Promise.all([
          loadFileBasedCifras(),
          loadFileBasedRepertorios()
        ]);
        console.log('Dados dos arquivos carregados com sucesso');
      } catch (error) {
        console.log('Erro ao carregar dados dos arquivos:', error);
      }
    }
    carregarDados();
  }, []);

  // Usar versão legacy para dispositivos antigos
  if (isLegacyDevice()) {
    console.log('Dispositivo legacy detectado, carregando versão compatível');
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
