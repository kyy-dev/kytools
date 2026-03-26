"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Music, 
  Video, Loader2, Globe, 
  Instagram, Facebook, Youtube, Music2, Share2, 
  Github
} from "lucide-react";


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
    <main className="min-h-screen bg-[#FBFBFE] selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic group cursor-pointer text-slate-900">
          <div className="bg-blue-600 p-1.5 rounded-xl text-white not-italic group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-100">
            <Zap size={20} fill="currentColor"/>
          </div>
          <span className="group-hover:text-blue-600 transition-colors">Ky</span><span className="opacity-90">TOOLS</span>
        </div>
        <Link href="/pricing" className="bg-slate-900 text-white text-[10px] font-black px-7 py-3 rounded-full hover:bg-blue-600 active:scale-95 transition-all shadow-xl shadow-gray-200 uppercase tracking-[0.2em]">
          UPGRADE PRO
        </Link>
      </nav>

      {/* Hero Section - Optimized Text */}
      <section className="pt-28 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-gray-100 shadow-sm">
          <Layers size={14} className="text-blue-600" />
          The Ultimate Utility Hub
        </div>
        
        <h1 className="text-[54px] md:text-[110px] font-black text-slate-900 leading-[0.85] mb-10 tracking-[-0.05em]">
          DIGITAL<br/>
          <span className="text-blue-600 inline-flex items-center">
            POWERHOUSE<span className="text-slate-200 ml-2 hidden md:block">.</span>
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-600 text-base md:text-xl font-bold leading-relaxed tracking-tight">
          Satu ekosistem alat digital esensial. Dirancang untuk kecepatan, dibangun dengan AI, dan siap mempermudah alur kerja Anda setiap hari.
        </p>
      </section>

      {/* Tools Grid - Premium Feel */}
      <section className="max-w-7xl mx-auto px-6 pb-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link 
            key={tool.title} 
            href={tool.href} 
            className={`group relative bg-white p-10 rounded-[48px] border border-gray-100/80 hover:border-blue-200 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden ${tool.isSoon ? 'cursor-not-allowed grayscale' : ''}`}
          >
             {/* Gradient Glow Effect */}
             <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-[60px] transition-all duration-700`} />
             
             {/* Icon Container */}
             <div className={`w-16 h-16 rounded-[24px] bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-10 shadow-2xl shadow-current/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {tool.icon}
             </div>

             <div className="flex items-center gap-3 mb-4 text-slate-900">
               <h3 className="text-2xl font-black tracking-tighter leading-none">{tool.title}</h3>
               {tool.isSoon && (
                 <span className="text-[9px] bg-slate-900 text-white px-3 py-1 rounded-full font-black uppercase tracking-widest">Soon</span>
               )}
             </div>

             <p className="text-slate-800 text-[15px] leading-relaxed mb-12 font-bold opacity-70 group-hover:opacity-100 transition-all duration-500">
               {tool.desc}
             </p>
             
             <div className="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 group-hover:text-slate-900 transition-colors">
               OPEN TOOL <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>
        ))}
      </section>

      {/* Minimalist Footer */}
      <footer className="py-20 text-center border-t border-gray-50 bg-white">
        <div className="flex justify-center gap-6 mb-8 text-slate-300">
          <div className="w-2 h-2 rounded-full bg-current" />
          <div className="w-2 h-2 rounded-full bg-current" />
          <div className="w-2 h-2 rounded-full bg-current" />
        </div>
        <p className="text-slate-900 text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
          Built by Nasrullah • © 2026 KyTools
        </p>
      </footer>
    </main>
  );
}
