import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Database, Monitor, Calculator } from "lucide-react";

const programs = [
  {
    name: "S1 Teknik Informatika",
    icon: Cpu,
    degree: "Sarjana Komputer (S.Kom)",
    skills: [
      "Pengembangan Perangkat Lunak",
      "Database Administrator",
      "Software Developer",
      "Database Engineer",
      "Cyber Security"
    ]
  },
  {
    name: "S1 Sistem Informasi",
    icon: Database,
    degree: "Sarjana Komputer (S.Kom)",
    skills: ["Sistem Analyst", "Data Analyst", "Data Science"]
  },
  {
    name: "D3 Teknik Informatika",
    icon: Monitor,
    degree: "Ahli Madya Komputer (A.Md.Kom)",
    skills: ["Software Developer", "Database Administrator"]
  },
  {
    name: "D3 Komputerisasi Akuntansi",
    icon: Calculator,
    degree: "Ahli Madya Komputer (A.Md.Kom)",
    skills: [
      "Perhotelan",
      "Akuntansi Perpajakan",
      "Sistem Informasi Akuntansi",
      "Audit Keuangan (Komputerisasi)"
    ]
  }
];

export function ProgramsSection() {
  return (
    <section id="program" className="py-24 bg-primary">
      <div className="container mx-auto px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-2">
            Program Studi Ilmu Komputer
          </h2>
          <p className="text-primary-foreground/80">
            Pilih program studi sesuai minat dan bakatmu
          </p>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 mb-4 px-6">
          <div className="font-bold text-primary-foreground text-lg">
            Program Studi
          </div>
          <div className="font-bold text-primary-foreground text-lg">
            Kemampuan yang Dipelajari
          </div>
        </div>

        {/* Program Cards */}
        <div className="space-y-4">
          {programs.map((program) => (
            <Card
              key={program.name}
              className="bg-background/95 backdrop-blur border-0"
            >
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Program Info */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <program.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {program.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {program.degree}
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <ul className="space-y-1">
                      {program.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {skill}
                        </li>
                      ))}
                    </ul>
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
