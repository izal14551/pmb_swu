import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen } from "lucide-react";

const syaratPendaftaran = [
  "Kartu Tanda Penduduk (KTP)",
  "Kartu Keluarga (KK)",
  "Ijazah / Surat Keterangan Lulus",
  "Pas Foto 4x6 (2 Lembar)",
  "FC Raport Smt 1-6",
  "KIP / PKH / KKS *"
];

const biayaPendidikan = [
  {
    nama: "S1 Teknik Informatika",
    singkat: "S1 TI",
    uspi: "Beasiswa",
    spp: "Beasiswa",
    ukt: "Rp. 485.000/bulan"
  },
  {
    nama: "S1 Sistem Informasi",
    singkat: "S1 SI",
    uspi: "Beasiswa",
    spp: "Beasiswa",
    ukt: "Rp. 485.000/bulan"
  },
  {
    nama: "D3 Komputerisasi Akuntansi",
    singkat: "D3 KA",
    uspi: "Beasiswa",
    spp: "Beasiswa",
    ukt: "Rp. 150.000/bulan"
  },
  {
    nama: "D3 Teknik Informatika",
    singkat: "D3 TI",
    uspi: "Beasiswa",
    spp: "Beasiswa",
    ukt: "Rp. 150.000/bulan"
  }
];

const biayaNonPendidikan = [
  { item: "Seragam & KTM", biaya: "Rp. 250.000" },
  { item: "Pelatihan Dasar Kepemimpinan", biaya: "Rp. 700.000" },
  { item: "SKPI", biaya: "Rp. 1.000.000" },
  { item: "Penguatan Bahasa Asing", biaya: "Rp. 1.000.000" }
];

export function RequirementsSection() {
  const totalBiayaNonPendidikan = "Rp. 2.950.000";

  return (
    <section id="biaya" className="py-24 bg-primary">
      <div className="container mx-auto px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-2">
            Rincian Biaya Masuk
          </h2>
          <p className="text-primary-foreground/80">
            Biaya Formulir: Rp. 200.000,00
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Biaya Pendidikan Per Program
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {biayaPendidikan.map((program) => (
              <Card
                key={program.singkat}
                className="bg-background hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {program.singkat}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {program.nama}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">USPI</p>
                    <p className="font-semibold text-sm text-primary">
                      {program.uspi}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      SPP/Semester
                    </p>
                    <p className="font-semibold text-sm text-primary">
                      {program.spp}
                    </p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground">UKT</p>
                    <p className="font-bold text-sm text-primary">
                      {program.ukt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Biaya Non Pendidikan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px]">
                  <tbody>
                    {biayaNonPendidikan.map((item, index) => (
                      <tr
                        key={item.item}
                        className={`${
                          index % 2 === 0 ? "bg-muted/50" : "bg-background"
                        }`}
                      >
                        <td className="py-3 px-4 text-sm text-foreground">
                          {item.item}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-primary text-right whitespace-nowrap">
                          {item.biaya}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-primary/10 font-bold">
                      <td className="py-3 px-4 text-sm text-foreground">
                        Total
                      </td>
                      <td className="py-3 px-4 text-sm text-primary text-right">
                        {totalBiayaNonPendidikan}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Syarat Pendaftaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {syaratPendaftaran.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * Bagi calon mahasiswa yang memiliki
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
