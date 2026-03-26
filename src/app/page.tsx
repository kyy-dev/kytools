"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Scissors, Zap, Type, FileJson, FileImage, 
  ShieldCheck, Star, Image as ImageIcon, Layers, 
  ArrowRight, Code2, ExternalLink, Menu, X, ChevronRight, 
  AlertCircle, Share2, Info
} from "lucide-react";

const tools = [
  {
    title: "Remove Background",
    desc: "Hapus latar belakang foto otomatis dengan AI presisi tinggi.",
    icon: <Scissors className="w-6 h-6" />,
    href: "/remove-bg",
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
    title: "Social Downloader",
    desc: "Unduh media dari Instagram, FB, dan Spotify secara instan.",
    icon: <Share2 className="w-6 h-6" />,
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBFBFE] selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden relative">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-gray-100 px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic group cursor-pointer">
          <div className="bg-blue-600 p-1.5 rounded-xl text-white not-italic group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-200">
            <Zap size={20} fill="currentColor"/>
          </div>
          <span className="text-slate-900 uppercase">Ky</span><span className="text-blue-600 uppercase">Tools</span>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="p-3 bg-white border-2 border-gray-100 rounded-2xl text-slate-900 hover:text-blue-600 transition-all shadow-sm active:scale-90"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* SIDEBAR DRAWER */}
      <div className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      
      <div className={`fixed top-0 right-0 z-[70] h-full w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out border-l-2 border-gray-100 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b-2 border-gray-50 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Control Center</span>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* Main Resources */}
          <div className="space-y-4">
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Main Resources</p>
            
            <Link href="https://api.danzy.web.id/docs" target="_blank" className="group flex items-center justify-between p-4 bg-slate-50 border-2 border-transparent hover:border-blue-100 hover:bg-blue-50 rounded-2xl transition-all">
              <div className="flex items-center gap-3 text-slate-900">
                <Code2 size={18} className="text-blue-600" />
                <span className="font-black uppercase text-[10px]">API Docs</span>
              </div>
              <ChevronRight size={14} className="text-slate-300" />
            </Link>

            <Link href="https://app.siputzx.my.id/" target="_blank" className="group flex items-center justify-between p-4 bg-slate-50 border-2 border-transparent hover:border-purple-100 hover:bg-purple-50 rounded-2xl transition-all">
              <div className="flex items-center gap-3 text-slate-900">
                <ExternalLink size={18} className="text-purple-600" />
                <span className="font-black uppercase text-[10px]">Siputzx App</span>
              </div>
              <ChevronRight size={14} className="text-slate-300" />
            </Link>
          </div>

          {/* EMERGENCY BACKUP SECTION */}
          <div className="space-y-4 pt-4 border-t-2 border-gray-50">
            <p className="text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={12} /> Backup Links (If Error)
            </p>
            
            <Link href="https://www.remove.bg/" target="_blank" className="group block p-5 bg-slate-50 border-2 border-slate-100 rounded-[25px] hover:bg-blue-600 transition-all hover:border-blue-500">
               <p className="text-[10px] font-black text-slate-400 group-hover:text-blue-200 uppercase mb-1">RemoveBG Original</p>
               <p className="text-sm font-black text-slate-900 group-hover:text-white uppercase italic tracking-tighter">Mirror #1</p>
            </Link>

            <Link href="https://snapinst.app/" target="_blank" className="group block p-5 bg-slate-50 border-2 border-slate-100 rounded-[25px] hover:bg-emerald-600 transition-all hover:border-emerald-500">
               <p className="text-[10px] font-black text-slate-400 group-hover:text-emerald-200 uppercase mb-1">Social Saver</p>
               <p className="text-sm font-black text-slate-900 group-hover:text-white uppercase italic tracking-tighter">Mirror #2</p>
            </Link>
          </div>
        </div>

        <div className="p-8 bg-gray-50/50 border-t-2 border-gray-100">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Architect</p>
          <p className="text-xs font-bold text-slate-900 uppercase italic">Fadhillah Dzaki Nasrullah</p>
        </div>
      </div>

      {/* EMERGENCY MAINTENANCE BANNER */}
      <section className="max-w-7xl mx-auto px-6 mt-8 relative z-20">
        <div className="relative overflow-hidden bg-amber-50 border-2 border-amber-200 rounded-[32px] p-6 md:p-8 shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,#000_10px,#000_20px)] opacity-20" />
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="bg-amber-500 text-white p-4 rounded-2xl shadow-lg shadow-amber-200 animate-pulse">
              <AlertCircle size={28} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-1">Service Interruption</h4>
              <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter mb-2">
                Downloader Engine <span className="text-amber-600">Maintenance</span>
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight">
                YT, IG, PIN, X, FB, SPOTIFY, GH, SFILE sedang gangguan teknis.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {['YT', 'IG', 'PIN', 'X', 'FB', 'GH'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white border-2 border-amber-100 rounded-lg text-[9px] font-black text-amber-600 shadow-sm transition-transform hover:scale-110">
                  {tag} <span className="animate-pulse">!</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main UI Grid */}
      <div className="relative z-10 pt-16 pb-40 px-6">
        <section className="text-center max-w-5xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border-2 border-gray-100 shadow-sm transition-transform hover:scale-105 cursor-default">
            <Layers size={14} className="text-blue-600" />
            Designed by Fadhillah Dzaki
          </div>
          <h1 className="text-[54px] md:text-[110px] font-black text-slate-900 leading-[0.85] mb-10 tracking-[-0.05em]">
            KY<span className="text-blue-600">TOOLS</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-base md:text-xl font-bold tracking-tight uppercase italic opacity-70">
             Satu ekosistem untuk semua kebutuhan digitalmu.
          </p>
        </section>

        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link key={tool.title} href={tool.href} className={`group relative bg-white/60 backdrop-blur-md p-10 rounded-[50px] border-2 border-white/80 hover:border-blue-500/30 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden ${tool.isSoon ? 'cursor-not-allowed opacity-60 grayscale' : ''}`}>
               <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-[0.05] blur-[80px] transition-all duration-1000`} />
               <div className={`w-16 h-16 rounded-[22px] bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-8 shadow-2xl shadow-current/30 group-hover:rotate-12 transition-all duration-500`}>
                  {tool.icon}
               </div>
               <h3 className="text-2xl font-black tracking-tighter uppercase text-slate-900 mb-4">{tool.title}</h3>
               <p className="text-slate-500 text-[11px] leading-relaxed mb-10 font-bold opacity-80 group-hover:opacity-100 transition-all duration-500 uppercase tracking-tight">{tool.desc}</p>
               <div className="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 transition-all group-hover:gap-3">
                 <span>{tool.isSoon ? 'COMING SOON' : 'LAUNCH TOOL'}</span> 
                 <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
               </div>
            </Link>
          ))}
        </section>
      </div>

      {/* DIRECTORY / SITEMAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t-2 border-gray-100 bg-white/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 border-b-2 border-blue-50 pb-2 w-fit">Video Services</h4>
            <ul className="space-y-4">
              {['TikTok Downloader', 'YouTube Saver', 'YouTube to MP3', 'Video Story Saver', 'Reels Downloader'].map((item) => (
                <li key={item}>
                  <Link href="/downloader" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-all uppercase tracking-tight flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 group-hover:bg-blue-600 rounded-full transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 border-b-2 border-emerald-50 pb-2 w-fit">Dev Resources</h4>
            <ul className="space-y-4">
              {[
                { name: 'JSON Formatter', slug: '/tools/json-formatter' },
                { name: 'Base64 Encoder', slug: '/tools/base64' },
                { name: 'Image Converter', slug: '/tools/image-converter' },
                { name: 'API Documentation', slug: 'https://api.danzy.web.id/docs' },
                { name: 'System Status', slug: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.slug} target={item.slug.startsWith('http') ? '_blank' : '_self'} className="text-[11px] font-black text-slate-500 hover:text-emerald-600 transition-all uppercase tracking-tight flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 group-hover:bg-emerald-600 rounded-full transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 border-b-2 border-purple-50 pb-2 w-fit">Creative Lab</h4>
            <ul className="space-y-4">
              {[
                { name: 'Remove Background', slug: '/remove-bg' },
                { name: 'Brat Generator', slug: '/brat' },
                { name: 'Canvas Editor', slug: '/canvas' },
                { name: 'AI Photo Editor', slug: '#' },
                { name: 'SVG Optimizer', slug: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.slug} className="text-[11px] font-black text-slate-500 hover:text-purple-600 transition-all uppercase tracking-tight flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 group-hover:bg-purple-600 rounded-full transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 border-b-2 border-slate-100 pb-2 w-fit">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'User Reviews', slug: '/reviews' },
                { name: 'Terms of Service', slug: '/terms' },
                { name: 'Privacy Policy', slug: '/privacy' },
                { name: 'Contact Architect', slug: 'https://wa.me/6287791889957' },
                { name: 'Siputzx App', slug: 'https://app.siputzx.my.id/' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.slug} target={item.slug.startsWith('http') ? '_blank' : '_self'} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-all uppercase tracking-tight flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 group-hover:bg-slate-900 rounded-full transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t-2 border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-black text-2xl tracking-tighter italic flex items-center gap-2">
               <Zap size={18} className="text-blue-600 fill-blue-600" />
               <span className="text-slate-900 uppercase">Ky</span><span className="text-blue-600 uppercase">Tools</span>
            </div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mt-1">Empowering Digital Workflow</p>
          </div>
          
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-default">v2.0.4 Stable</div>
             <div className="px-4 py-2 bg-blue-50 rounded-lg text-[10px] font-black text-blue-600 uppercase tracking-widest cursor-default">Built with Next.js 15</div>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center bg-white/50 backdrop-blur-md relative z-10 border-t-2 border-gray-50">
        <p className="text-slate-900 text-[10px] font-black tracking-[0.5em] uppercase opacity-30 mb-2">Handcrafted by Fadhillah Dzaki Nasrullah</p>
        <p className="text-slate-900 text-[9px] font-black tracking-[0.2em] uppercase opacity-20">© 2026 KyTools • All Rights Reserved</p>
      </footer>
    </main>
  );
}
