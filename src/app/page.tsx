"use client";
import Link from "next/link";
import { 
  Download, Instagram, Github, Scissors, Zap, 
  Type, FileJson, FileImage, ShieldCheck, Sparkles, Star, 
  Image as ImageIcon, Layers, ArrowRight, Code2, ExternalLink
} from "lucide-react";

const tools = [
  {
    title: "Remove Background",
    desc: "Hapus latar belakang foto otomatis dengan AI presisi tinggi via Remove.bg.",
    icon: <Scissors className="w-6 h-6" />,
    href: "https://www.remove.bg/",
    isExternal: true,
    color: "from-blue-600 to-cyan-400",
  },
  {
    title: "Brat Generator",
    desc: "Buat teks minimalis estetik gaya Brat yang lagi viral.",
    icon: <Type className="w-6 h-6" />,
    href: "/brat",
    color: "from-slate-800 to-black",
  },
  {
    title: "TikWM Downloader",
    desc: "Download video TikTok tanpa watermark dengan cepat.",
    icon: <Download className="w-6 h-6" />,
    href: "https://www.tikwm.com/",
    isExternal: true,
    color: "from-pink-500 to-rose-400",
  },
  {
    title: "Social Downloader",
    desc: "Unduh media dari Instagram, FB, dan Spotify secara instan.",
    icon: <Sparkles className="w-6 h-6" />,
    href: "/downloader",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "JSON Formatter",
    desc: "Rapikan kode JSON yang berantakan atau cek error format.",
    icon: <FileJson className="w-6 h-6" />,
    href: "/tools/json-formatter",
    color: "from-amber-500 to-yellow-400",
  },
  {
    title: "Image Converter",
    desc: "Ubah format JPG, PNG, WEBP secara instan di browser.",
    icon: <FileImage className="w-6 h-6" />,
    href: "/tools/image-converter",
    color: "from-teal-600 to-green-400",
  },
  {
    title: "Base64 Tool",
    desc: "Enkripsi teks ke Base64 atau dekripsi balik dengan aman.",
    icon: <ShieldCheck className="w-6 h-6" />,
    href: "/tools/base64",
    color: "from-indigo-600 to-purple-500",
  },
  {
    title: "User Feedback",
    desc: "Lihat ulasan pengguna & berikan ulasan untuk layanan kami.",
    icon: <Star className="w-6 h-6" />,
    href: "/reviews",
    color: "from-yellow-500 to-orange-400",
  },
  {
    title: "AI Photo Editor",
    desc: "Tingkatkan kualitas dan filter foto otomatis (Coming Soon).",
    icon: <ImageIcon className="w-6 h-6" />,
    href: "#",
    color: "from-purple-500 to-pink-400",
    isSoon: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBFBFE] selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden relative">
      
      {/* --- AESTHETIC GRADIENT GRID BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFE] via-transparent to-transparent" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-100/30 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic group cursor-pointer">
          <div className="bg-blue-600 p-1.5 rounded-xl text-white not-italic group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-200">
            <Zap size={20} fill="currentColor"/>
          </div>
          <span className="text-slate-900 uppercase">Ky</span><span className="text-blue-600 uppercase">Tools</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
           <Link href="https://api.danzy.web.id/docs" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
              <Code2 size={14} /> API DOCS
           </Link>
           <Link href="https://app.siputzx.my.id/" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
              <ExternalLink size={14} /> SIPUTZX APP
           </Link>
           <Link href="/pricing" className="bg-slate-900 text-white text-[10px] font-black px-7 py-3 rounded-full hover:bg-blue-600 active:scale-95 transition-all shadow-xl shadow-gray-200 uppercase tracking-[0.2em]">
             UPGRADE PRO
           </Link>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 pb-20 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-gray-100 shadow-sm transition-transform hover:scale-105">
            <Layers size={14} className="text-blue-600" />
            Ultimate Digital Ecosystem
          </div>
          
          <h1 className="text-[54px] md:text-[110px] font-black text-slate-900 leading-[0.85] mb-10 tracking-[-0.05em]">
            FUTURE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">UTILITIES</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-500 text-base md:text-xl font-bold leading-relaxed tracking-tight">
             Kumpulan alat digital pilihan untuk efisiensi kerja. Dirancang dengan presisi oleh <span className="text-slate-900 underline decoration-blue-500 decoration-4">Fadhillah Dzaki Nasrullah</span>.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            const Container = tool.isExternal ? 'a' : Link;
            return (
              <Container 
                key={tool.title} 
                href={tool.href}
                {...(tool.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group relative bg-white/60 backdrop-blur-md p-10 rounded-[50px] border border-white hover:border-blue-200 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden ${tool.isSoon ? 'cursor-not-allowed opacity-60 grayscale' : ''}`}
              >
                 {/* Decorative Glow */}
                 <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-[0.03] blur-[80px] transition-all duration-1000`} />
                 
                 <div className={`w-16 h-16 rounded-[22px] bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-8 shadow-2xl shadow-current/20 group-hover:rotate-12 transition-all duration-500`}>
                    {tool.icon}
                 </div>

                 <div className="flex items-center gap-3 mb-4">
                   <h3 className="text-2xl font-black tracking-tighter uppercase text-slate-900">{tool.title}</h3>
                   {tool.isSoon && <span className="text-[9px] bg-slate-900 text-white px-2.5 py-1 rounded-full font-black uppercase tracking-widest">Soon</span>}
                   {tool.isExternal && <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />}
                 </div>

                 <p className="text-slate-500 text-[14px] leading-relaxed mb-10 font-medium opacity-80 group-hover:opacity-100 transition-all duration-500">
                   {tool.desc}
                 </p>
                 
                 <div className="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 transition-all group-hover:gap-3">
                   <span>{tool.isExternal ? 'OPEN WEBSITE' : 'LAUNCH TOOL'}</span> 
                   <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                 </div>
              </Container>
            );
          })}
        </section>
      </div>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-gray-100 bg-white/50 backdrop-blur-md relative z-10">
        <p className="text-slate-900 text-[10px] font-black tracking-[0.5em] uppercase opacity-30 mb-2">
          Handcrafted by Fadhillah Dzaki Nasrullah
        </p>
        <p className="text-slate-900 text-[9px] font-black tracking-[0.2em] uppercase opacity-20">
          © 2026 KyTools • All Rights Reserved
        </p>
      </footer>
    </main>
  );
}
