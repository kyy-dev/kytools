"use client";
import Link from 'next/link';
import { 
  Image, Scissors, Sparkles, ArrowRight, Zap, 
  Type, Download, Star, FileJson, ShieldCheck, FileImage 
} from 'lucide-react';

const tools = [
  {
    title: "Remove Background",
    desc: "Hapus latar belakang foto otomatis dengan AI presisi tinggi.",
    icon: <Scissors className="w-5 h-5" />,
    href: "/remove-bg",
    color: "from-blue-600 to-cyan-400",
  },
  {
    title: "Brat Generator",
    desc: "Buat teks minimalis estetik gaya Brat yang lagi viral.",
    icon: <Type className="w-5 h-5" />,
    href: "/brat",
    color: "from-gray-800 to-black",
  },
  {
    title: "Social Downloader",
    desc: "Download video/musik dari TikTok, IG, FB, dan Spotify.",
    icon: <Download className="w-5 h-5" />,
    href: "/downloader",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "JSON Formatter",
    desc: "Rapikan kode JSON yang berantakan atau cek error format.",
    icon: <FileJson className="w-5 h-5" />,
    href: "/tools/json-formatter",
    color: "from-amber-500 to-yellow-400",
  },
  {
    title: "Image Converter",
    desc: "Ubah format JPG, PNG, WEBP secara instan di browser.",
    icon: <FileImage className="w-5 h-5" />,
    href: "/tools/image-converter",
    color: "from-teal-600 to-green-400",
  },
  {
    title: "Base64 Tool",
    desc: "Enkripsi teks ke Base64 atau dekripsi balik dengan aman.",
    icon: <ShieldCheck className="w-5 h-5" />,
    href: "/tools/base64",
    color: "from-indigo-600 to-purple-500",
  },
  {
    title: "Canvas Magic",
    desc: "Beri efek unik 'Affect' atau 'Invert' pada fotomu.",
    icon: <Sparkles className="w-5 h-5" />,
    href: "/canvas",
    color: "from-orange-500 to-red-400",
  },
  {
    title: "User Feedback",
    desc: "Lihat ulasan pengguna & berikan ulasan untuk KyTools.",
    icon: <Star className="w-5 h-5" />,
    href: "/reviews",
    color: "from-yellow-500 to-orange-400",
  },
  {
    title: "AI Photo Editor",
    desc: "Tingkatkan kualitas dan filter foto (Coming Soon).",
    icon: <Image className="w-5 h-5" />,
    href: "#",
    color: "from-purple-500 to-pink-400",
    isSoon: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBFBFE] selection:bg-blue-100 selection:text-blue-600">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter italic group cursor-pointer text-slate-900">
          <div className="bg-blue-600 p-1 rounded-lg text-white not-italic group-hover:rotate-12 transition-transform duration-300">
            <Zap size={18} fill="currentColor"/>
          </div>
          <span className="group-hover:text-blue-600 transition-colors">Ky</span>TOOLS
        </div>
        <Link href="/pricing" className="bg-slate-900 text-white text-[11px] font-black px-6 py-2.5 rounded-full hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-gray-200 uppercase tracking-widest">
          UPGRADE PRO
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50/50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-blue-100/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next-Gen AI Toolkit
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tighter">
          Edit Cepat. <br/><span className="text-blue-600">Hasil Hebat.</span>
        </h1>
        <p className="max-w-xl mx-auto text-slate-800 text-sm md:text-lg font-bold leading-relaxed opacity-90">
          Satu tempat untuk semua kebutuhan digitalmu. Ringan, cepat, dan bertenaga AI untuk produktivitas harian.
        </p>
      </section>

      {/* Grid Section */}
      <section className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link 
            key={tool.title} 
            href={tool.href} 
            className={`group relative bg-white p-8 rounded-[40px] border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden ${tool.isSoon ? 'cursor-not-allowed opacity-80' : ''}`}
          >
             <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
             
             <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-8 shadow-xl shadow-current/10 group-hover:rotate-6 transition-transform duration-500`}>
                {tool.icon}
             </div>

             <div className="flex items-center gap-2 mb-3 text-slate-900">
               <h3 className="text-2xl font-black tracking-tight">{tool.title}</h3>
               {tool.isSoon && (
                 <span className="text-[8px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-black uppercase">Soon</span>
               )}
             </div>
             {/* Deskripsi kartu menggunakan warna hitam/slate-800 agar kontras */}
             <p className="text-slate-800 text-[14px] leading-relaxed mb-10 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
               {tool.desc}
             </p>
             
             <div className="flex items-center text-[11px] font-black uppercase tracking-[0.15em] text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
               Mulai Eksplorasi <ArrowRight size={16} className="ml-2" />
             </div>
          </Link>
        ))}
      </section>

      {/* Minimalist Footer */}
      <footer className="py-12 text-center border-t border-gray-100 bg-white">
        <p className="text-slate-900 text-[10px] font-black tracking-[0.3em] uppercase">
          © 2026 Fadhillah Dzaki Nasrullah
        </p>
      </footer>
    </main>
  );
}
