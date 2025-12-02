"use client";

import { useEffect, useState } from "react";

interface Document {
  id: number;
  name: string;
  filePath: string;
}

interface Mahasiswa {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  documents?: Document[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<Mahasiswa | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const u: Mahasiswa = JSON.parse(saved);
      fetch(`/api/profile?id=${u.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setUser(data.user);
        });
    }
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", String(user.id));
    const res = await fetch("/api/profile", { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) {
      setMessage("Upload berhasil");
      setUser({
        ...user,
        documents: [...(user.documents || []), data.document]
      });
    } else {
      setMessage(data.message);
    }
  };

  return (
    <main className="container mx-auto max-w-2xl py-20">
      <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>
      {user ? (
        <>
          <p>
            Nama: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>Telepon: {user.phone}</p>
          <p>Program: {user.program}</p>

          <h2 className="mt-6 text-xl font-semibold">Dokumen</h2>
          <ul className="list-disc pl-5">
            {user.documents?.map((doc) => (
              <li key={doc.id}>
                <a
                  href={doc.filePath}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>

          <form onSubmit={handleUpload} className="mt-4 space-y-2">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Upload Dokumen
            </button>
          </form>
          {message && <p className="mt-2">{message}</p>}
        </>
      ) : (
        <p>Memuat profil…</p>
      )}
    </main>
  );
}
