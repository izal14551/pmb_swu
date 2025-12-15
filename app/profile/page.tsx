"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  RectangleStackIcon,
  BuildingOffice2Icon,
  TrophyIcon,
  LanguageIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  FolderIcon
} from "@heroicons/react/24/outline";

// Tipe Mahasiswa sesuai schema
interface Mahasiswa {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  fullAddress?: string | null;
  placeOfBirth?: string | null;
  dateOfBirth?: string | null;
  rt?: string | null;
  rw?: string | null;
  village?: string | null;
  subDistrict?: string | null;
  district?: string | null;
  province?: string | null;
  gender?: string | null;
  maritalStatus?: string | null;
  religion?: string | null;
  parentName?: string | null;
  parentAddress?: string | null;
  classType?: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<Mahasiswa | null>(null);
  const [activeTab, setActiveTab] = useState<"biodata" | "dokumen">("biodata");
  const [docs, setDocs] = useState({
    kk: null as File | null,
    ktp: null as File | null,
    nisn: null as File | null,
    skl: null as File | null,
    rapor: null as File | null,
    penghasilan: null as File | null,
    sktm: null as File | null,
    kip: null as File | null,
    kks_pkh: null as File | null,
    foto_rumah: null as File | null,
    surat_pernyataan: null as File | null
  });

  const documentTypes: { key: keyof typeof docs; label: string }[] = [
    { key: "kk", label: "Kartu Keluarga (KK)" },
    { key: "ktp", label: "Kartu Tanda Penduduk (KTP)" },
    { key: "nisn", label: "Nomor Induk Siswa Nasional (NISN)" },
    { key: "skl", label: "Surat Keterangan Lulus (SKL)" },
    { key: "rapor", label: "Rapor Semester 1-5" },
    { key: "penghasilan", label: "Surat Keterangan Penghasilan Orang Tua" },
    { key: "sktm", label: "Surat Keterangan Tidak Mampu" },
    { key: "kip", label: "Kartu Indonesia Pintar" },
    { key: "kks_pkh", label: "Kartu Keluarga Sejahtera (KKS)/PKH" },
    { key: "foto_rumah", label: "Foto Rumah" },
    { key: "surat_pernyataan", label: "Surat pernyataan" }
  ];

  // fungsi menghapus dokumen
  const handleDeleteDoc = async (docId: number) => {
    if (!user) return;
    const res = await fetch(`/api/documents/${docId}`, { method: "DELETE" });
    if (res.ok) {
      // perbarui state user dengan menghapus dokumen tersebut
      setUser({
        ...user,
        documents: user.documents.filter((d) => d.id !== docId)
      });
    } else {
      alert("Gagal menghapus dokumen");
    }
  };

  useEffect(() => {
    // ambil data user dari localStorage lalu fetch ke API
    const saved = localStorage.getItem("user");
    if (saved) {
      const u = JSON.parse(saved);
      fetch(`/api/profile?id=${u.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
          }
        });
    }
  }, []);

  // Format tanggal lahir
  const formatDate = (iso?: string | null) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  // handle perubahan file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocs((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const removeFile = (key: keyof typeof docs) => {
    setDocs((prev) => ({ ...prev, [key]: null }));
  };

  // kirim semua dokumen sekaligus
  const handleUploadDocs = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", String(user?.id));
    Object.entries(docs).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });
    const res = await fetch("/api/documents", {
      method: "POST",
      body: formData
    });
    const result = await res.json();
    if (result.success) {
      alert("Dokumen berhasil diupload!");
    } else {
      alert("Gagal mengupload dokumen");
    }
  };
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Memuat profil…</p>
      </main>
    );
  }

  function DocumentInput({
    label,
    name
  }: {
    label: string;
    name: keyof typeof docs;
  }) {
    const file = docs[name];

    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">{label}</label>
        {/* Kontainer file input dengan nama file + tombol pilih */}
        <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
          {/* Teks nama file atau placeholder */}
          <span className="flex-1 text-gray-700 truncate">
            {file ? file.name : "Belum ada file dipilih"}
          </span>
          {/* Tombol pilih file di sisi kanan */}
          <label className="ml-4 bg-primary text-white px-3 py-1 rounded-md cursor-pointer">
            Pilih File
            <input
              type="file"
              name={name}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {/* Opsi lihat dan hapus */}
        {file && (
          <div className="mt-1 flex items-center gap-2 text-sm">
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Lihat
            </a>
            <button
              type="button"
              onClick={() => removeFile(name)}
              className="text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-10">
      {/* Hero section dengan tinggi tetap */}
      <div className="relative w-full h-56 bg-blue-500">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/SWU.png')" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-14 relative z-10">
        {/* Kartu profil */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Info user */}
          <div className="flex items-center space-x-4">
            {/* Foto profil: ganti src dengan foto user jika tersedia */}

            <div>
              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <div className="text-sm text-gray-600 flex flex-wrap gap-4 mt-1">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" /> {user.fullAddress ?? "-"}
                </span>
                <span className="flex items-center gap-1">
                  <PhoneIcon className="w-4 h-4" /> {user.phone ?? "-"}
                </span>
                <span className="flex items-center gap-1">
                  <EnvelopeIcon className="w-4 h-4" /> {user.email}
                </span>
              </div>
            </div>
          </div>
          {/* Tombol aksi */}
          <div className="flex mt-4 md:mt-0 space-x-3">
            <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Sinkron Data
            </button>
            <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
              <PencilSquareIcon className="w-4 h-4 mr-2" />
              Edit Data
            </button>
          </div>
        </div>

        {/* Layout konten */}
        <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col md:flex-row gap-4">
          {/* Sidebar menu */}
          <aside className="md:w-64 bg-white rounded-xl shadow-md">
            <nav>
              <div
                onClick={() => setActiveTab("biodata")}
                className={`flex items-center px-4 py-3 cursor-pointer gap-3 ${
                  activeTab === "biodata"
                    ? "text-blue-600 border-r-4 border-blue-600 font-semibold bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
              >
                <UserIcon className="w-5 h-5" />
                <span>Biodata</span>
              </div>
              <div
                onClick={() => setActiveTab("dokumen")}
                className={`flex items-center px-4 py-3 cursor-pointer gap-3 ${
                  activeTab === "dokumen"
                    ? "text-blue-600 border-r-4 border-blue-600 font-semibold bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
              >
                <FolderIcon className="w-5 h-5" />
                <span>Dokumen</span>
              </div>
            </nav>
          </aside>

          {/* Konten utama */}
          <section className="flex-1 bg-white rounded-xl shadow-md p-6">
            {/* Biodata */}
            {activeTab === "biodata" && (
              <div className="space-y-4">
                <ProfileRow
                  icon={<UserIcon className="w-6 h-6 text-green-500" />}
                  label="Nama Lengkap"
                  value={`${user.firstName} ${user.lastName}`}
                />
                <ProfileRow
                  icon={<UserIcon className="w-6 h-6 text-green-500" />}
                  label="Jenis Kelamin"
                  value={user.gender ?? "-"}
                />
                <ProfileRow
                  icon={<EnvelopeIcon className="w-6 h-6 text-green-500" />}
                  label="Email"
                  value={user.email}
                />
                <ProfileRow
                  icon={<PhoneIcon className="w-6 h-6 text-green-500" />}
                  label="Telepon"
                  value={user.phone ?? "-"}
                />
                <ProfileRow
                  icon={<MapPinIcon className="w-6 h-6 text-green-500" />}
                  label="Alamat Lengkap"
                  value={user.fullAddress ?? "-"}
                />
                <ProfileRow
                  icon={<MapPinIcon className="w-6 h-6 text-green-500" />}
                  label="RT/RW"
                  value={`${user.rt ?? "-"}/${user.rw ?? "-"}`}
                />
                <ProfileRow
                  icon={<MapPinIcon className="w-6 h-6 text-green-500" />}
                  label="Desa"
                  value={user.village ?? "-"}
                />
                <ProfileRow
                  icon={<MapPinIcon className="w-6 h-6 text-green-500" />}
                  label="Kecamatan"
                  value={user.subDistrict ?? "-"}
                />
                <ProfileRow
                  icon={<MapPinIcon className="w-6 h-6 text-green-500" />}
                  label="Kabupaten"
                  value={user.district ?? "-"}
                />
                <ProfileRow
                  icon={<MapPinIcon className="w-6 h-6 text-green-500" />}
                  label="Provinsi"
                  value={user.province ?? "-"}
                />
                <ProfileRow
                  icon={<UserIcon className="w-6 h-6 text-green-500" />}
                  label="Status Pernikahan"
                  value={user.maritalStatus ?? "-"}
                />
                <ProfileRow
                  icon={<UserIcon className="w-6 h-6 text-green-500" />}
                  label="Agama"
                  value={user.religion ?? "-"}
                />
                <ProfileRow
                  icon={<UserIcon className="w-6 h-6 text-green-500" />}
                  label="Nama Orang Tua/Wali"
                  value={user.parentName ?? "-"}
                />
                <ProfileRow
                  icon={<UserIcon className="w-6 h-6 text-green-500" />}
                  label="Alamat Orang Tua/Wali"
                  value={user.parentAddress ?? "-"}
                />
                <ProfileRow
                  icon={<AcademicCapIcon className="w-6 h-6 text-green-500" />}
                  label="Kelas Pilihan"
                  value={user.classType ?? "-"}
                />
              </div>
            )}
            {activeTab === "dokumen" && (
              <form onSubmit={handleUploadDocs} className="space-y-4">
                <DocumentInput label="Kartu Keluarga (KK)" name="kk" />
                <DocumentInput label="Kartu Tanda Penduduk (KTP)" name="ktp" />
                <DocumentInput
                  label="Nomor Induk Siswa Nasional (NISN)"
                  name="nisn"
                />
                <DocumentInput label="Ijazah / SKL" name="skl" />
                <DocumentInput label="Rapor (sem. 1–5)" name="rapor" />
                <DocumentInput
                  label="Surat Keterangan Penghasilan Orang Tua"
                  name="penghasilan"
                />
                <DocumentInput
                  label="Surat Keterangan Tidak Mampu (SKTM)"
                  name="sktm"
                />
                <DocumentInput
                  label="Kartu Indonesia Pintar (KIP)"
                  name="kip"
                />
                <DocumentInput
                  label="Kartu Keluarga Sejahtera (KKS) / PKH"
                  name="kks_pkh"
                />
                <DocumentInput
                  label="Foto Rumah (depan & dalam)"
                  name="foto_rumah"
                />
                <DocumentInput
                  label="Surat Pernyataan"
                  name="surat_pernyataan"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Upload Semua Dokumen
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

// Komponen sidebar item dengan parameter aktif
function SidebarItem({
  icon,
  label,
  active
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center px-4 py-3 cursor-pointer gap-3 ${
        active
          ? "text-blue-600 border-r-4 border-blue-600 font-semibold bg-blue-50"
          : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

// Komponen baris profil
function ProfileRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 border rounded-md p-4">
      <div>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
