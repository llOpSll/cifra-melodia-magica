
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CifraTransposer } from "../components/CifraTransposer";
import { ArrowLeft, Printer, Edit, Trash2, Download, EyeOff, Play } from "lucide-react";
import { getCifraBySlug, deletarCifra, criarVersaoEditavel, ocultarCifra } from "../utils/storage";
import { exportarCifra } from "../utils/fileOperations";
import { toast } from "@/hooks/use-toast";

export default function CifraVisualizar() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cifra, setCifra] = useState(getCifraBySlug(slug || ""));
  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    const cifraPorSlug = getCifraBySlug(slug || "");
    setCifra(cifraPorSlug);
  }, [slug]);

  function handleDelete() {
    if (!cifra) return;
    
    // Verificar se é uma cifra de arquivo
    if (cifra.id.startsWith('file-')) {
      // iPad 2 não suporta excluir arquivos do diretório CIFRAS/
      toast({
        title: "Função não disponível no iPad 2",
        description: "A exclusão de arquivos do diretório CIFRAS/ não é suportada neste dispositivo.",
      });
      return;
    } else {
      // Cifra do localStorage
      if (confirm(`Tem certeza que deseja excluir a cifra "${cifra.titulo}"?`)) {
        const sucesso = deletarCifra(cifra.id);
        if (sucesso) {
          toast({
            title: "Cifra excluída com sucesso!",
          });
          navigate("/");
        } else {
          toast({
            title: "Erro ao excluir a cifra.",
          });
        }
      }
    }
  }

  function handleOcultarArquivo() {
    if (!cifra || !cifra.id.startsWith('file-')) return;
    
    if (confirm(`Tem certeza que deseja ocultar a cifra "${cifra.titulo}"? Ela não aparecerá mais na listagem.`)) {
      const sucesso = ocultarCifra(cifra.id);
      if (sucesso) {
        toast({
          title: "Cifra ocultada com sucesso!",
          description: "A cifra não aparecerá mais na listagem.",
        });
        navigate("/");
      } else {
        toast({
          title: "Erro ao ocultar a cifra.",
        });
      }
    }
  }

  function handleEditarArquivo() {
    if (!cifra || !cifra.id.startsWith('file-')) return;
    
    const novoId = criarVersaoEditavel(cifra);
    toast({
      title: "Versão editável criada!",
      description: "Você pode agora editar esta cifra. A versão original foi ocultada.",
    });
    navigate(`/editar/${novoId}`);
  }

  function handleExportar() {
    if (!cifra) return;
    
    exportarCifra(cifra);
    toast({
      title: "Cifra exportada!",
      description: `${cifra.titulo} - ${cifra.artista}`,
    });
  }

  if (!cifra) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Cifra não encontrada.
      </div>
    );
  }

  // Limpar o tom removendo qualquer "0" no final - função mais robusta
  const tomLimpo = cifra.tom.replace(/0+$/, '');
  const isFromFile = cifra.id.startsWith('file-');

  return (
    <div className="min-h-screen py-8 px-2 font-sans" 
         style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      <div className="mx-auto max-w-4xl rounded-2xl p-8 shadow-lg border"
           style={{ backgroundColor: 'rgba(234, 239, 239, 0.9)', borderColor: '#B8CFCE' }}>
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center font-semibold text-sm hover:opacity-80"
          style={{ color: '#333447' }}
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="uppercase tracking-wide text-xs font-semibold mb-2" style={{ color: '#7F8CAA' }}>
              {cifra.instrumento} • Tom <span className="font-bold" style={{ color: '#333447' }}>{tomLimpo}</span>
              {cifra.capotraste && cifra.capotraste > 0 && (
                <> • Capotraste <span className="font-bold" style={{ color: '#7F8CAA' }}>{cifra.capotraste}ª casa</span></>
              )}
              {cifra.bpm && cifra.bpm > 0 && (
                <> • BPM <span className="font-bold" style={{ color: '#7F8CAA' }}>{cifra.bpm}</span></>
              )}
              {isFromFile && (
                <> • <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full ml-2">Arquivo CIFRAS/</span></>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#333447' }}>{cifra.titulo}</h1>
            <div className="text-xl font-semibold" style={{ color: '#333447' }}>{cifra.artista}</div>
            {cifra.videoYoutube && (
              <div className="mt-3">
                <a 
                  href={cifra.videoYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border hover:opacity-80 transition-all"
                  style={{ backgroundColor: '#B8CFCE', color: '#333447', borderColor: '#7F8CAA' }}
                >
                  <Play size={14} />
                  Ver no YouTube
                </a>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 flex-wrap">
              <button
                className="text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:opacity-80 transition-all border shadow"
                style={{ backgroundColor: '#7F8CAA' }}
                onClick={() => window.print()}
              >
                <Printer size={17} />
                Imprimir
              </button>
              
              <button
                className="text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:opacity-80 transition-all border shadow"
                style={{ backgroundColor: '#B8CFCE', color: '#333447' }}
                onClick={handleExportar}
              >
                <Download size={17} />
                Exportar
              </button>
              
              {isFromFile ? (
                <>
                  <button
                    className="text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:opacity-80 transition-all border shadow"
                    style={{ backgroundColor: '#B8CFCE', color: '#333447' }}
                    onClick={handleEditarArquivo}
                  >
                    <Edit size={17} />
                    Criar Versão Editável
                  </button>
                  <button
                    className="text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:opacity-80 transition-all border shadow"
                    style={{ backgroundColor: '#7F8CAA' }}
                    onClick={handleOcultarArquivo}
                  >
                    <EyeOff size={17} />
                    Ocultar
                  </button>
                  <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    ⚠️ Exclusão de arquivos não disponível no iPad 2
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:opacity-80 transition-all border shadow"
                    style={{ backgroundColor: '#B8CFCE', color: '#333447' }}
                    onClick={() => navigate(`/editar/${cifra.id}`)}
                  >
                    <Edit size={17} />
                    Editar
                  </button>
                  <button
                    className="text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:opacity-80 transition-all border shadow"
                    style={{ backgroundColor: '#333447' }}
                    onClick={handleDelete}
                  >
                    <Trash2 size={17} />
                    Excluir
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setFontSize(fs => Math.min(fs + 2, 40))}
                className="rounded-full w-8 h-8 flex items-center justify-center hover:opacity-80 font-bold text-lg border"
                style={{ backgroundColor: '#B8CFCE', color: '#333447' }}
                aria-label="Aumentar fonte"
              >A+</button>
              <button
                onClick={() => setFontSize(fs => Math.max(fs - 2, 10))}
                className="rounded-full w-8 h-8 flex items-center justify-center hover:opacity-80 font-bold text-lg border"
                style={{ backgroundColor: '#EAEFEF', color: '#333447' }}
                aria-label="Diminuir fonte"
              >A-</button>
            </div>
          </div>
        </div>
        <hr className="my-4" style={{ borderColor: '#B8CFCE' }} />

        <CifraTransposer
          cifra={cifra.cifra}
          tomOriginal={tomLimpo}
          fontSize={fontSize}
          capotrasteInicial={cifra.capotraste || 0}
        />

      </div>
    </div>
  );
}
