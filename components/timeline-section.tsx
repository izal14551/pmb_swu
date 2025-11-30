import { Card, CardContent } from "@/components/ui/card";

const timelineItems = [
  {
    phase: "1",
    title: "Pendaftaran Online/Offline"
  },
  {
    phase: "2",
    title: "Verifikasi Dokumen Pada Sistem Pendaftaran"
  },
  {
    phase: "3",
    title: "Pengumuman Lolos Seleksi Administrasi"
  },
  {
    phase: "4",
    title: "Seleksi Tes Potensi Akademik"
  },
  {
    phase: "5",
    title:
      "Wawancara Calon Mahasiswa dan Orang Tua / Wali Mengumpulkan Hardcopy Pendaftaran"
  },
  {
    phase: "6",
    title:
      "Pengumuman Calon Mahasiswa Reguler dan Mahasiswa Penerima KIP Kuliah"
  }
];

export function TimelineSection() {
  return (
    <section id="alur" className="py-24 bg-muted">
      <div className="container mx-auto px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
            Alur Pendaftaran
          </h2>
          <p className="text-muted-foreground">
            Mahasiswa Reguler dan KIP Kuliah
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {timelineItems.map((item) => (
            <Card
              key={item.phase}
              className="bg-background border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    {item.phase}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
