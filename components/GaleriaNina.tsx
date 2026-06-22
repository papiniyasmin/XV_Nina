"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles, Loader2, Image as ImageIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Foto {
  id: number;
  url_foto: string;
}

// Interface para o navegador lembrar o que a pessoa enviou
interface MinhaFoto {
  url: string;
  time: number;
}

export function GaleriaNina() {
  const [fotos, setFotos] = useState<Foto[]>([])
  const [minhasFotos, setMinhasFotos] = useState<MinhaFoto[]>([])
  const [uploading, setUploading] = useState(false)
  const [agora, setAgora] = useState(Date.now()) // Relógio interno para os 5 minutos
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Carrega as fotos que o usuário enviou do "localStorage" do navegador
  useEffect(() => {
    const salvas = localStorage.getItem('nina_minhas_fotos')
    if (salvas) {
      setMinhasFotos(JSON.parse(salvas))
    }
    
    // Atualiza o relógio a cada 10 segundos para o botão sumir sozinho após 5 min
    const intervalTempo = setInterval(() => setAgora(Date.now()), 10000)
    return () => clearInterval(intervalTempo)
  }, [])

  const fetchFotos = async () => {
    try {
      const res = await fetch('/api/fotos')
      const data = await res.json()
      setFotos(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";

    if (!CLOUD_NAME) {
      console.error("Cloud name não encontrado.");
      setUploading(false);
      return;
    }

    try {
      const novasFotosLocais: MinhaFoto[] = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append("file", files[i])
        formData.append("upload_preset", UPLOAD_PRESET)

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        )
        const data = await res.json()

        if (data.secure_url) {
          await fetch('/api/fotos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: data.secure_url })
          })
          
          // Guarda a URL e a hora exata que foi enviada
          novasFotosLocais.push({ url: data.secure_url, time: Date.now() });
        }
      }

      // Salva na memória do celular do convidado
      if (novasFotosLocais.length > 0) {
        setMinhasFotos(prev => {
          const novoEstado = [...prev, ...novasFotosLocais];
          localStorage.setItem('nina_minhas_fotos', JSON.stringify(novoEstado));
          return novoEstado;
        });
      }

      fetchFotos()
    } catch (error) {
      console.error("Erro no upload:", error)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = "" 
    }
  }

  // Função para apagar a foto
  const deletarFoto = async (id: number, url: string) => {
    if (!confirm("Tem certeza que deseja apagar esta foto?")) return;
    
    try {
      await fetch(`/api/fotos?id=${id}`, { method: 'DELETE' });
      
      // Remove da memória do celular
      setMinhasFotos(prev => {
        const filtrado = prev.filter(f => f.url !== url);
        localStorage.setItem('nina_minhas_fotos', JSON.stringify(filtrado));
        return filtrado;
      });
      
      fetchFotos(); // Atualiza o mural
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  useEffect(() => {
    fetchFotos()
    const interval = setInterval(fetchFotos, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 px-4 bg-[#0a0514] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center mb-12">
          <Sparkles className="w-6 h-6 text-purple-400 mb-4 animate-pulse" />
          <h2 className="font-serif text-5xl text-purple-400 mb-3 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] text-center">
            Mural de Memórias
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4" />
          <p className="text-zinc-400 font-sans uppercase tracking-[0.3em] text-[11px] text-center max-w-md leading-relaxed">
            Eternize este momento com a Nina enviando suas fotos favoritas
          </p>
        </div>

        <input 
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Button 
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex mx-auto mb-20 overflow-hidden bg-gradient-to-b from-[#f8f9fa] via-[#d1d5db] to-[#9ca3af] hover:from-[#ffffff] hover:to-[#d1d5db] text-[#0f172a] font-bold px-12 py-8 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.2)] border-none outline-none ring-0 focus:ring-0 active:scale-95 transition-all"
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          ) : (
            <>
              <ImageIcon className="w-5 h-5 mr-3 text-[#0f172a]" />
              <span className="tracking-[0.2em] uppercase text-xs font-black">Adicionar Fotos</span>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[220px]">
          {fotos.map((foto, index) => {
            const isLarge = index % 7 === 0;
            const isWide = index % 10 === 0;

            // Lógica dos 5 minutos (5 * 60 * 1000 milissegundos)
            const minhaFotoSalva = minhasFotos.find(m => m.url === foto.url_foto);
            const isRecente = minhaFotoSalva && (agora - minhaFotoSalva.time < 5 * 60 * 1000);

            return (
              <div 
                key={foto.id} 
                className={`group relative overflow-hidden bg-zinc-900 rounded-xl shadow-2xl transition-all duration-700
                  ${isLarge ? "md:col-span-2 md:row-span-2" : ""} 
                  ${isWide && !isLarge ? "md:row-span-2" : ""}
                `}
              >
                <img 
                  src={foto.url_foto} 
                  alt="Momento Nina" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Botão de lixeira só aparece se a foto for da pessoa e tiver menos de 5 min */}
                {isRecente && (
                  <button
                    onClick={() => deletarFoto(foto.id, foto.url_foto)}
                    className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    title="Apagar foto (Você tem 5 minutos)"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {fotos.length === 0 && !uploading && (
          <div className="mt-10 py-20 border-2 border-dashed border-purple-500/10 rounded-3xl text-center">
            <p className="text-zinc-600 font-serif italic text-lg">O mural está pronto para as primeiras memórias...</p>
          </div>
        )}
      </div>
    </section>
  )
}