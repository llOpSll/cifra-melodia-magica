
import { CifraForm } from "../components/CifraForm";

export default function CifraNova() {
  return (
    <div className="min-h-screen py-10 px-2 flex items-center justify-center"
         style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      <div className="max-w-lg w-full rounded-xl shadow-xl p-10 border"
           style={{ backgroundColor: 'rgba(234, 239, 239, 0.9)', borderColor: '#B8CFCE' }}>
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#333447' }}>Adicionar Nova Cifra</h1>
        <CifraForm />
      </div>
    </div>
  );
}
