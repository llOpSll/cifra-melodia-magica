
// Mock dos endpoints da API para demonstração
// Em produção, estes endpoints seriam implementados no servidor

export function setupMockApiEndpoints() {
  // Interceptar fetch calls para os endpoints da API
  const originalFetch = window.fetch;
  
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();
    
    if (url.includes('/api/upload-cifra') && init?.method === 'POST') {
      // Simular upload - em produção salvaria no servidor
      console.log('📤 Simulando upload de cifra para o servidor...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.includes('/api/refresh-cifras-list') && init?.method === 'POST') {
      // Simular atualização da lista - em produção atualizaria lista.json
      console.log('🔄 Simulando atualização da lista de cifras...');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Para outras requisições, usar fetch original
    return originalFetch(input, init);
  };
}
