import { Calendar, Clock, MapPin, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function EventDetails() {
  return (
    // Fundo ultra-dark para as cores saltarem aos olhos
    <section className="py-20 px-4 bg-[#0a0514]">
      <div className="max-w-4xl mx-auto">
        
        {/* Título da Seção: Roxo Neon com Sombra */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-purple-400 mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            Detalhes do Evento
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <Star className="w-4 h-4 text-zinc-300 fill-zinc-300" /> {/* Estrela Prata */}
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
        </div>

        {/* Cards de Informação */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card Date */}
          <Card className="group bg-zinc-900/40 backdrop-blur-md border-purple-500/30 hover:border-purple-400 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6 group-hover:bg-purple-500/30 transition-all border border-purple-500/20">
                <Calendar className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
                Data
              </h3>
              <p className="font-serif text-2xl text-white">
                27 de Julho
              </p>
              <p className="font-sans text-lg text-purple-300/60 mt-1">
                2026
              </p>
            </CardContent>
          </Card>

          {/* Card Time */}
          <Card className="group bg-zinc-900/40 backdrop-blur-md border-purple-500/30 hover:border-purple-400 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6 group-hover:bg-purple-500/30 transition-all border border-purple-500/20">
                <Clock className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
                Horário
              </h3>
              <p className="font-serif text-2xl text-white">
                17:00
              </p>
              <p className="font-sans text-lg text-purple-300/60 mt-1">
                Recepção
              </p>
            </CardContent>
          </Card>

          {/* Card Location */}
          <Card className="group bg-zinc-900/40 backdrop-blur-md border-purple-500/30 hover:border-purple-400 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6 group-hover:bg-purple-500/30 transition-all border border-purple-500/20">
                <MapPin className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
                Local
              </h3>
              <p className="font-serif text-2xl text-white">
                Salão de Festas
              </p>
              <p className="font-sans text-lg text-purple-300/60 mt-1">
                Grupo Desportivo Do Rio Seco - Castro Marim
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}