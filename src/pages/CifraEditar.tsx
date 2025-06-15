
import { useParams, useNavigate } from "react-router-dom";
import { CifraForm } from "../components/CifraForm";
import { getCifraById } from "../utils/storage";
import { ArrowLeft } from "lucide-react";

export default function CifraEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cifra = getCifraById(id || "");

  if (!cifra) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg"
           style={{ color: '#7F8CAA' }}>
        Cifra não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-2 flex items-center justify-center"
         style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      <div className="max-w-lg w-full rounded-xl shadow-xl p-10 border"
           style={{ backgroundColor: 'rgba(234, 239, 239, 0.9)', borderColor: '#B8CFCE' }}>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center font-semibold text-sm hover:opacity-80"
          style={{ color: '#333447' }}
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#333447' }}>Editar Cifra</h1>
        <CifraForm cifraId={id} />
      </div>
    </div>
  );
}
