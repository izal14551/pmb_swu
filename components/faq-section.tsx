import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Bagaimana cara mendaftar sebagai mahasiswa baru?",
    answer:
      "Anda dapat mendaftar secara online melalui link https://bit.ly/FormulirPPMB2025-2026 atau datang langsung ke kampus STMIK Widya Utama. Setelah mendaftar, lakukan verifikasi dokumen dan ikuti tahapan seleksi yang telah ditentukan."
  },
  {
    question: "Apakah ada program beasiswa yang tersedia?",
    answer:
      "Ya, STMIK Widya Utama menyediakan beasiswa USPI dan SPP Tetap untuk semua program studi. Selain itu, tersedia juga program KIP Kuliah bagi calon mahasiswa yang memiliki KIP/PKH/KKS."
  },
  {
    question: "Apa saja program studi yang tersedia?",
    answer:
      "STMIK Widya Utama memiliki 4 program studi: S1 Teknik Informatika (S.Kom), S1 Sistem Informasi (S.Kom), D3 Teknik Informatika (A.Md.Kom), dan D3 Komputerisasi Akuntansi (A.Md.Kom)."
  },
  {
    question: "Berapa biaya kuliah per bulan?",
    answer:
      "Biaya UKT per bulan untuk program S1 adalah Rp. 485.000,00 dan untuk program D3 adalah Rp. 150.000,00. USPI dan SPP Tetap mendapat beasiswa. Biaya formulir pendaftaran sebesar Rp. 200.000,00."
  },
  {
    question: "Apakah ada program kerja ke luar negeri?",
    answer:
      "Ya, STMIK Widya Utama memiliki program mahasiswa luar negeri bekerja sama dengan institusi terkemuka di Jepang. Program ini memberikan peluang pertukaran mahasiswa, magang, dan pengalaman budaya yang memperkaya perspektif mahasiswa."
  },
  {
    question: "Apa saja dokumen yang diperlukan untuk mendaftar?",
    answer:
      "Dokumen yang diperlukan: KTP, Kartu Keluarga (KK), Ijazah/Surat Keterangan Lulus, Pas Foto 4x6 (2 lembar), FC Raport Semester 1-6, dan KIP/PKH/KKS (bagi yang memiliki)."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-2">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
