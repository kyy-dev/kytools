"use client";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Gavel, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      id: "01",
      title: "Penggunaan Layanan",
      content: "KyTools disediakan untuk penggunaan personal dan non-komersial. Anda setuju untuk tidak menyalahgunakan API kami untuk aktivitas ilegal, spamming, atau peretasan massal."
    },
    {
      id: "02",
      title: "Hak Kekayaan Intelektual",
      content: "Semua media yang diunduh melalui downloader kami tetap menjadi hak milik pembuat konten asli. KyTools hanya berfungsi sebagai alat bantu teknis (technical bridge)."
    },
    {
      id: "03",
      title: "Batasan Tanggung Jawab",
      content: "Kami tidak bertanggung jawab atas konten yang diunduh pengguna. Pengguna memegang tanggung jawab penuh atas kepatuhan hak cipta dari media yang mereka proses."
    },
    {
      id: "04",
      title: "Perubahan Layanan",
      content: "KyTools (Fadhillah Dzaki) berhak mengubah, menghentikan, atau memperbarui fitur kapan saja tanpa pemberitahuan sebelumnya demi stabilitas sistem."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FBFBFE] selection:bg-red-100 selection:text-red-600 p-6 md:p-24 relative overflow-hidden">
      {/* Aksesori Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-red-600 font-black text-[10px] tracking-widest transition-all mb-12 uppercase">
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        {/* Header Section */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-2 border-red-100 shadow-sm">
            <Gavel size={14} /> Legal Agreement
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase italic">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <p className="mt-8 text-slate-400 font-bold uppercase text-xs tracking-widest flex items-center gap-3">
             <CheckCircle2 size={16} className="text-emerald-500" /> Last Updated: March 26, 2026
          </p>
        </header>

        {/* Content Section */}
        <div className="bg-white border-2 border-gray-100 rounded-[50px] p-8 md:p-16 shadow-2xl shadow-gray-200/40">
          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.id} className="group relative">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="text-5xl font-black text-slate-100 group-hover:text-red-100 transition-colors duration-500 italic">
                    {section.id}
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 group-hover:text-red-600 transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-slate-500 font-bold leading-relaxed text-sm uppercase tracking-tight opacity-80">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Warning Box */}
          <div className="mt-20 p-8 bg-red-50 border-2 border-red-100 rounded-[30px] flex items-start gap-6">
             <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg shadow-red-200">
                <ShieldAlert size={24} />
             </div>
             <div>
                <h4 className="font-black text-red-600 uppercase text-xs tracking-widest mb-2">Peringatan Penting</h4>
                <p className="text-[11px] font-bold text-red-800 leading-relaxed uppercase tracking-tight">
                   Pelanggaran terhadap syarat dan ketentuan ini dapat mengakibatkan pemblokiran alamat IP Anda dari seluruh ekosistem KyTools secara permanen.
                </p>
             </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-4">Architect: Fadhillah Dzaki Nasrullah</p>
           <div className="flex justify-center gap-4">
              <Link href="/privacy" className="text-[9px] font-black text-slate-400 hover:text-slate-900 uppercase underline decoration-2 underline-offset-4 transition-all">Privacy Policy</Link>
              <Link href="https://wa.me/6287791889957" className="text-[9px] font-black text-slate-400 hover:text-slate-900 uppercase underline decoration-2 underline-offset-4 transition-all">Support Center</Link>
           </div>
        </div>
      </div>
    </main>
  );
}
