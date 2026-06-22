import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, attendance, guests, message } = body;

    const query = `
      INSERT INTO presencas (nome, whatsapp, confirmado, quantidade_convidados, mensagem)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [
      name, 
      phone, 
      attendance === "yes" ? 'sim' : 'nao', 
      Number(guests), // Conversão forçada para número
      message || ""
    ];

    await db.execute(query, values);

    return NextResponse.json({ message: "Sucesso" }, { status: 200 });
  } catch (error: any) {
    console.error("Erro na BD:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}