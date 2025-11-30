import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // TODO: Simpan data ke database atau proses sesuai kebutuhan
  // Contoh log data
  console.log("Data pendaftaran diterima:", data);

  // Contoh respons sukses
  return NextResponse.json({ success: true, message: "Pendaftaran berhasil!" });
}
