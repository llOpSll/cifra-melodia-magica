
// Serviço para fazer upload de cifras para o servidor
export async function uploadCifraToServer(cifraContent: string, filename: string): Promise<boolean> {
  try {
    const response = await fetch('/api/upload-cifra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        content: cifraContent
      })
    });

    if (!response.ok) {
      throw new Error(`Erro no upload: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Erro ao fazer upload da cifra:', error);
    return false;
  }
}

export async function refreshCifrasList(): Promise<boolean> {
  try {
    const response = await fetch('/api/refresh-cifras-list', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar lista: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar lista de cifras:', error);
    return false;
  }
}
