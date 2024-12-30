import React from "react";

const ProgramPreview = () => {
  const programs = [
    {
      title: "PAUD & TK",
      desc: "Program pembelajaran Calistung (Baca, Tulis, Hitung) untuk mempersiapkan anak memasuki jenjang SD",
      subjects: ["Calistung (Baca, Tulis, Hitung)"]
    },
    {
      title: "Sekolah Dasar (SD)",
      desc: "Pembelajaran komprehensif mencakup semua mata pelajaran sekolah dasar",
      subjects: ["Matematika", "IPA", "Bahasa Indonesia", "Bahasa Inggris", "IPS"]
    },
    {
      title: "SMP & SMA",
      desc: "Fokus pada penguasaan Matematika dan Sains untuk persiapan ujian dan olimpiade",
      subjects: ["Matematika", "Fisika", "Kimia", "Biologi"]
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Program Belajar Kami
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {programs.map((program, i) => (
            <div
              key={i}
              className="flex flex-col p-6 border rounded-lg hover:shadow-lg transition-all duration-300 bg-white"
            >
              <h3 className="text-xl font-bold mb-3">{program.title}</h3>
              <p className="text-gray-600 mb-4">{program.desc}</p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-700 mb-2">Mata Pelajaran:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {program.subjects.map((subject, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramPreview;
