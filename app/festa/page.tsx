import { GaleriaNina } from "@/components/GaleriaNina";

// O segredo está nesta linha: "export default function"
export default function FestaPage() {
  return (
    <main className="bg-[#0a0514] min-h-screen">
      {/* Cabeçalho fixo para dar o ar de App de Fotos */}
      <header className="py-10 flex flex-col items-center border-b border-purple-500/10">
        <h1 className="font-serif text-3xl text-purple-400 tracking-[0.2em] drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
          NINA XV
        </h1>
        <p className="text-zinc-500 uppercase tracking-[0.4em] text-[9px] mt-2">
          Mural de Memórias
        </p>
      </header>

      {/* Chamada do componente que você já tem */}
      <GaleriaNina />

      <footer className="py-10 text-center opacity-20">
        <p className="text-zinc-500 text-[9px] uppercase tracking-widest">
          Nina XV &copy; 2026
        </p>
      </footer>
    </main>
  );
}