
import { CifraForm } from "../components/CifraForm";

export default function CifraNova() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-blue-100 py-10 px-2 flex items-center justify-center">
      <div className="max-w-lg w-full rounded-xl bg-white/90 shadow-xl p-10 border border-green-200">
        <h1 className="text-2xl font-bold mb-6 text-primary">Adicionar Nova Cifra</h1>
        <CifraForm />
      </div>
    </div>
  );
}
