
import { useNavigate } from "react-router-dom";
import { RepertorioForm } from "../components/RepertorioForm";
import { ArrowLeft } from "lucide-react";

export default function RepertorioNovo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-green-100 py-10 px-2 flex items-center justify-center">
      <div className="max-w-2xl w-full rounded-xl bg-white/90 shadow-xl p-10 border border-blue-200">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold mb-6 text-primary">Novo Repertório</h1>
        <RepertorioForm />
      </div>
    </div>
  );
}
