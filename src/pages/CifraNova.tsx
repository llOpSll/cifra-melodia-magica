
import { CifraForm } from "../components/CifraForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CifraNova() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-10 px-2 flex items-center justify-center"
         style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      <div className="max-w-2xl w-full rounded-xl shadow-xl p-10 border"
           style={{ backgroundColor: 'rgba(234, 239, 239, 0.9)', borderColor: '#B8CFCE' }}>
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: '#333447' }}
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#333447' }}>Adicionar Nova Cifra</h1>
        <CifraForm />
      </div>
    </div>
  );
}
