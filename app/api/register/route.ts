import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;

// Setup connection pool dan adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validasi sederhana (opsional, sebaiknya gunakan Zod)
    if (!data.email || !data.username || !data.password) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Cek apakah email/username sudah ada
    const existingUser = await prisma.mahasiswa.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email atau Username sudah terdaftar" },
        { status: 409 }
      );
    }

    // Simpan ke Database
    const newMahasiswa = await prisma.mahasiswa.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        school: data.school,
        program: data.program,
        username: data.username,
        password: data.password // Catatan: Sebaiknya di-hash menggunakan bcrypt/argon2
      }
    });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil!",
      data: newMahasiswa
    });
  } catch (error) {
    console.error("Error registration:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
