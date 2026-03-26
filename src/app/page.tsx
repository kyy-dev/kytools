"use client";
import Link from 'next/link';
// Import FileJson ditambahkan di sini
import { Image, Scissors, CreditCard, Sparkles, ArrowRight, Zap, Type, Download, Star, FileJson } from 'lucide-react';

const tools = [
  {
    title: "Remove Background",
    desc: "Hapus latar belakang foto otomatis dengan AI presisi tinggi.",
    icon: <Scissors className="w-5 h-5" />,
    href: "/remove-bg",
    color: "from-blue-600 to-cyan-400",
    shadow: "shadow-blue-200",
  },
  {
    title: "Brat Generator",
    desc: "Buat teks minimalis estetik gaya Brat yang lagi viral.",
    icon: <Type className="w-5 h-5" />,
    href: "/brat",
    color: "from-gray-800 to-black",
    shadow: "shadow-gray-300",
  },
  {
    title: "Social Downloader",
    desc: "Download video/musik dari TikTok, IG, FB, dan Spotify.",
    icon: <Download className="w-5 h-5" />,
    href: "/downloader",
    color: "from-green-500 to-emerald-400",
    shadow: "shadow-emerald-100",
  },
  {
    title: "JSON Formatter",
    desc: "Rapikan kode JSON yang berantakan atau cek error format.",
    icon: <FileJson className="w-5 h-5" />,
    href: "/tools/json-formatter",
    color: "from-amber-500 to-yellow-400",
    shadow: "shadow-amber-100",
  },
  {
    title: "Canvas Magic",
    desc: "Beri efek unik 'Affect' atau 'Invert' pada fotomu.",
    icon: <Sparkles className="w-5 h-5" />,
    href: "/canvas",
    color: "from-orange-500 to-red-400",
    shadow: "shadow-orange-100",
  },
  {
    title: "User Feedback",
    desc: "Lihat ulasan pengguna & berikan rating log untuk KyTools.",
    icon: <Star className="w-5 h-5" />,
    href: "/reviews",
    color: "from-yellow-500 to-orange-400",
    shadow: "shadow-yellow-100",
  },
  {
    title: "AI Photo Editor",
    desc: "Tingkatkan kualitas dan filter foto (Coming Soon).",
    icon: <Image className="w-5 h-5" />,
    href: "#",
    color: "from-purple-500 to-pink-400",
    shadow: "shadow-purple-100",
    isSoon: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBFBFE]">
      {/* Simple Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter italic">
          <div className="bg-blue-600 p-1 rounded-lg text-white not-italic"><Zap size={18} fill="currentColor"/></div>
          Ky<span className="text-blue-600">TOOLS</span>
        </div>
        <Link href="/pricing" className="bg-gray-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-xl shadow-gray-200">
          UPGRADE PRO
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-12 px-6 text-center">
        <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          ✨ Next-Gen AI Toolkit
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1] mb-6">
          Edit Cepat. <br/><span className="text-blue-600">Hasil Hebat.</span>
        </h1>
        <p className="max-w-md mx-auto text-slate-500 text-sm md:text-base leading-relaxed">
          Kumpulan alat bantu digital berbasis AI untuk mempermudah workflow kreatifmu setiap hari.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href} className="group relative bg-white p-8 rounded-[32px] border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-100 overflow-hidden">
             <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${tool.color} opacity-5 blur-2xl group-hover:scale-150 transition-transform`} />
             
             <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20`}>
                {tool.icon}
             </div>

             <div className="flex items-center gap-2 mb-2">
               <h3 className="text-xl font-bold text-slate-800">{tool.title}</h3>
               {tool.isSoon && <span className="text-[9px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full font-bold uppercase">Soon</span>}
             </div>
             <p className="text-slate-500 text-sm leading-relaxed mb-8">{tool.desc}</p>
             
             <div className="flex items-center text-xs font-black uppercase tracking-widest text-blue-600 group-hover:gap-2 transition-all">
               Mulai <ArrowRight size={14} />
             </div>
          </Link>
        ))}
      </section>

      {/* Simple Footer */}
      <footer className="py-10 text-center text-gray-400 text-[10px] font-bold tracking-widest uppercase border-t border-gray-50 bg-white">
        © 2026 Fadhillah Dzaki Nasrullah
      </footer>
    </main>
  );
}
