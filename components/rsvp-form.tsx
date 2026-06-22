"use client"

import { useState } from "react"
import { Heart, Send, CheckCircle, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RsvpForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Estado para o carregamento
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attendance: "yes",
    message: ""
  })

  // Lógica para enviar para a BD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert("Erro ao enviar confirmação. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
      alert("Erro de conexão com o servidor.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-[#0a0514]">
        <div className="max-w-lg mx-auto text-center">
          <Card className="border-purple-500/30 bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <CardContent className="pt-12 pb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/20 mb-6 border border-purple-500/30">
                <CheckCircle className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="font-serif text-3xl text-white mb-4">
                Presença Confirmada!
              </h3>
              <p className="font-sans text-purple-100/70 text-lg">
                Obrigada por confirmar, {formData.name}!
              </p>
              <p className="font-sans text-purple-200/50 mt-2">
                Mal podemos esperar para celebrar com você.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <Heart className="w-5 h-5 text-purple-500 fill-purple-500" />
                <Sparkles className="w-4 h-4 text-zinc-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-[#0a0514]">
      <div className="max-w-lg mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-purple-400 mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            Confirme sua Presença
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <Heart className="w-5 h-5 text-purple-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          <p className="font-sans text-zinc-400 uppercase tracking-widest text-sm">
            Por favor, responda até 01 de Março de 2026
          </p>
        </div>

        {/* Formulário */}
        <Card className="border-purple-500/20 bg-zinc-900/40 backdrop-blur-md shadow-2xl shadow-purple-900/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-center">
              <Star className="w-5 h-5 text-zinc-400 fill-zinc-400/20" />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-sans text-xs uppercase tracking-[0.2em] text-purple-300/70">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/40 border-purple-900/50 focus:border-purple-400 text-white placeholder:text-zinc-600"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-sans text-xs uppercase tracking-[0.2em] text-purple-300/70">
                  WhatsApp
                </Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-black/40 border-purple-900/50 focus:border-purple-400 text-white placeholder:text-zinc-600"
                />
              </div>

              {/* Attendance */}
              <div className="space-y-4 py-2">
                <Label className="font-sans text-xs uppercase tracking-[0.2em] text-purple-300/70">
                  Você poderá comparecer?
                </Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-3 bg-black/20 p-3 rounded-lg border border-purple-900/30">
                    <RadioGroupItem value="yes" id="yes" className="border-purple-400 text-purple-400" />
                    <Label htmlFor="yes" className="font-sans text-zinc-200 cursor-pointer">Sim, estarei presente</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-black/20 p-3 rounded-lg border border-purple-900/30">
                    <RadioGroupItem value="no" id="no" className="border-purple-400 text-purple-400" />
                    <Label htmlFor="no" className="font-sans text-zinc-400 cursor-pointer">Infelizmente não poderei</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Number of guests */}
              {formData.attendance === "yes" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="guests" className="font-sans text-xs uppercase tracking-[0.2em] text-purple-300/70">
                    Número de Convidados
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="bg-black/40 border-purple-900/50 focus:border-purple-400 text-white w-24"
                  />
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-sans text-xs uppercase tracking-[0.2em] text-purple-300/70">
                  Mensagem para a Nina
                </Label>
                <span className="text-[10px] text-zinc-500 ml-1">(OPCIONAL)</span>
                <Textarea
                  id="message"
                  placeholder="Deixe uma mensagem especial..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/40 border-purple-900/50 focus:border-purple-400 text-white placeholder:text-zinc-600 resize-none"
                />
              </div>

              {/* Submit Button: Roxo Neon */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-sans uppercase tracking-[0.2em] py-7 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50"
              >
                {isLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Confirmar Presença
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}