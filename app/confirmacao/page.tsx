import { db } from "@/lib/db";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, Calendar } from "lucide-react";

// Força o Next.js a não fazer cache, para a lista atualizar sempre
export const revalidate = 0;

export default async function ListaNinaPage() {
  // Busca os dados do Aiven
  const [rows]: any = await db.query(
    "SELECT * FROM presencas ORDER BY data_registro DESC"
  );

  const totalConvidados = rows.reduce((acc: number, curr: any) => {
    return curr.confirmado === 'sim' ? acc + curr.quantidade_convidados : acc;
  }, 0);

  const totalConfirmados = rows.filter((r: any) => r.confirmado === 'sim').length;

  return (
    <main className="min-h-screen bg-[#0a0514] p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabeçalho da Lista */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-purple-500/30 pb-8">
          <div>
            <h1 className="font-serif text-4xl text-purple-400">Lista de Convidados</h1>
            <p className="text-zinc-400">Acompanhamento em tempo real - Nina XV</p>
          </div>
          
          <div className="flex gap-4">
            <Card className="bg-purple-900/20 border-purple-500/30 text-white min-w-[150px]">
              <CardContent className="pt-4 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <p className="text-xs uppercase text-zinc-400">Total Pessoas</p>
                <p className="text-2xl font-bold">{totalConvidados}</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/20 border-purple-500/30 text-white min-w-[150px]">
              <CardContent className="pt-4 text-center">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <p className="text-xs uppercase text-zinc-400">Famílias/Confirmados</p>
                <p className="text-2xl font-bold">{totalConfirmados}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabela de Dados */}
        <Card className="bg-zinc-900/40 border-purple-500/20 backdrop-blur-md overflow-hidden">
          <Table>
            <TableHeader className="bg-purple-900/40">
              <TableRow className="border-purple-500/20 hover:bg-transparent">
                <TableHead className="text-purple-200">Nome</TableHead>
                <TableHead className="text-purple-200">WhatsApp</TableHead>
                <TableHead className="text-purple-200">Presença</TableHead>
                <TableHead className="text-purple-200 text-center">Convidados</TableHead>
                <TableHead className="text-purple-200">Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((convidado: any) => (
                <TableRow key={convidado.id} className="border-purple-500/10 hover:bg-purple-500/5 text-zinc-300">
                  <TableCell className="font-medium text-white">{convidado.nome}</TableCell>
                  <TableCell>{convidado.whatsapp}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      convidado.confirmado === 'sim' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {convidado.confirmado.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{convidado.quantidade_convidados}</TableCell>
                  <TableCell className="max-w-xs">
                    {convidado.mensagem ? (
                      <div className="flex items-start gap-2 italic text-sm text-zinc-400">
                        <MessageCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        "{convidado.mensagem}"
                      </div>
                    ) : "-"}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-zinc-500 italic">
                    Nenhuma confirmação recebida ainda...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  );
}