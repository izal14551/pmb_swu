import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();

// Di Next.js 15, searchParams itu Promise, jadi harus await
export default async function VerifyPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="p-10 text-center text-red-500">Token tidak valid.</div>
    );
  }

  // Cari user berdasarkan token
  const user = await prisma.mahasiswa.findUnique({
    where: { verificationToken: token }
  });

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500">
        Link verifikasi salah atau kadaluarsa.
      </div>
    );
  }

  // Update user jadi terverifikasi & hapus tokennya
  await prisma.mahasiswa.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null // Hapus token agar tidak bisa dipakai ulang
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Verifikasi Berhasil! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Akun Anda atas nama <strong>{user.firstName}</strong> telah berhasil
          diverifikasi.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
