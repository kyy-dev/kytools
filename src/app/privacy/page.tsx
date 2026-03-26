export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFE] p-8 md:p-24">
      <article className="max-w-4xl mx-auto bg-white border-2 border-gray-100 rounded-[50px] p-12 md:p-20 shadow-sm">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-6">Security & Privacy</p>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter mb-12 border-b-4 border-gray-50 pb-8">
          Privacy <span className="text-blue-600">Policy</span>
        </h1>
        
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 italic">01. Data Collection</h2>
            <p className="text-slate-500 font-bold leading-relaxed text-sm uppercase tracking-tight opacity-80">
              KyTools tidak menyimpan media yang Anda unduh. Semua pemrosesan data dilakukan secara real-time melalui API terenkripsi. Kami hanya menyimpan log teknis untuk stabilitas server.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 italic">02. Cookie Usage</h2>
            <p className="text-slate-500 font-bold leading-relaxed text-sm uppercase tracking-tight opacity-80">
              Kami menggunakan local storage untuk menyimpan preferensi tema dan riwayat terakhir Anda secara lokal di browser Anda sendiri.
            </p>
          </section>

          {/* Bagian yang tadi error sudah diperbaiki di bawah ini */}
          <section className="space-y-4 pt-10 border-t-2 border-gray-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">
              Last Updated: March 2026
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
