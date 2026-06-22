import { Heart, Sparkles } from "lucide-react"

export function Footer() {
  return (
    // Background bem escuro (cor do fundo da cortina) com uma borda roxa sutil
    <footer className="py-12 px-4 bg-[#0a0514] border-t border-purple-900/50">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Elemento Decorativo: Sparkles em Prata/Lilás claro (como as estrelas da foto) */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          <div className="font-serif text-3xl tracking-widest text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            Nina XV
          </div>
          <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
        </div>

        {/* Mensagem: Texto em lavanda claro para legibilidade sobre o fundo escuro */}
        <p className="font-sans text-purple-100/80 mb-6 italic">
          Sua presença é o melhor presente que podemos receber
        </p>

        {/* Ícone de Coração: Roxo vibrante (como os balões) */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50" />
          <Heart className="w-5 h-5 text-purple-500 fill-purple-500/20" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        {/* Copyright */}
        <p className="font-sans text-xs text-purple-300/40 mt-8 uppercase tracking-widest">
          2026
        </p>
      </div>
    </footer>
  )
}