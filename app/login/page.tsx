"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/profile");
    } else {
      setError(data.message);
    }
  };

  const handleBack = () => {
    router.push("/"); // kembali ke beranda
  };

  return (
    <main className="container mx-auto max-w-md py-20">
      <h1 className="text-3xl font-bold mb-6">Login Calon Mahasiswa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email atau Username</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border px-3 py-2 rounded-md bg-white"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-md bg-white"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}

        {/* tombol login */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md w-full border border-primary hover:bg-white hover:text-primary transition"
        >
          Login
        </button>

        {/* tombol kembali sebagai button */}
        <button
          type="button"
          onClick={handleBack}
          className="bg-white text-primary px-4 py-2 rounded-md w-full border border-primary hover:bg-primary hover:text-white transition"
        >
          Kembali
        </button>
      </form>

      {/* pesan daftar */}
      <div className="mt-4 text-sm text-center">
        Belum punya akun?{" "}
        <a href="/#daftar" className="text-primary underline">
          Daftar terlebih dahulu
        </a>
      </div>
    </main>
  );
}
