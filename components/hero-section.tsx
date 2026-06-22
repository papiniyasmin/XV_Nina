"use client"

import { Sparkles, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05020a]">
      
      {/* Luzes de fundo (Glow Neon) - Simula a iluminação da festa */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Estrelas Prateadas Animadas (como as da cortina) */}
      <div className="absolute top-[20%] left-[15%] text-zinc-400/40 animate-pulse">
        <Star className="w-6 h-6 fill-current" />
      </div>
      <div className="absolute top-[15%] right-[20%] text-zinc-300/60 animate-bounce transition-all duration-1000">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-[25%] left-[25%] text-zinc-500/30">
        <Star className="w-4 h-4 fill-current" />
      </div>

      <div className="relative z-10 text-center px-4 py-20">
        
        {/* Linha Decorativa Superior Prata */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
          <Sparkles className="w-5 h-5 text-purple-400" />
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
        </div>

        {/* Nome: Nina (Branco/Prata com brilho) */}
        <h1 className="font-serif text-8xl md:text-[10rem] font-light tracking-tighter text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Nina
        </h1>
        
        {/* XV: Roxo Vibrante */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-600" />
          <span className="font-serif text-6xl md:text-8xl font-light text-purple-500 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
            XV
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-600" />
        </div>

        {/* Subtítulo */}
        <p className="font-sans text-sm md:text-base text-zinc-400 tracking-[0.5em] uppercase mb-12">
          Uma noite inesquecível
        </p>

        {/* Botão/Destaque Centralizado */}
        <div className="inline-block px-10 py-5 border border-purple-500/30 rounded-full bg-purple-950/20 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)]">
          <p className="font-serif text-2xl md:text-3xl text-zinc-100">
            Aguardamos Você
          </p>
        </div>

        {/* Linha Decorativa Inferior */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-900/50 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 border border-purple-400 bg-purple-400/20" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-900/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}