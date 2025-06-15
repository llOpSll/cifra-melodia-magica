
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
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Cifra não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-blue-100 py-10 px-2 flex items-center justify-center">
      <div className="max-w-lg w-full rounded-xl bg-white/90 shadow-xl p-10 border border-green-200">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-green-600 hover:text-green-800 font-semibold text-sm"
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold mb-6 text-primary">Editar Cifra</h1>
        <CifraForm cifraId={id} />
      </div>
    </div>
  );
}
