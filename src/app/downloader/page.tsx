"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Music, 
  Video, Loader2, Globe, 
  Instagram, Facebook, Music2, Share2, 
  Github, HardDrive, FileText, Smartphone, Search,
  PlayCircle, Layers, ArrowRight, Zap
} from "lucide-react";

const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: <Music2 size={18} />, color: 'bg-black' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={18} />, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
  { id: 'youtube', name: 'YouTube', icon: <PlayCircle size={18} />, color: 'bg-red-600' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={18} />, color: 'bg-blue-600' },
  { id: 'spotify', name: 'Spotify', icon: <Music size={18} />, color: 'bg-green-600' },
  { id: 'pinterest', name: 'Pinterest', icon: <Share2 size={18} />, color: 'bg-red-500' },
  { id: 'github', name: 'GitHub', icon: <Github size={18} />, color: 'bg-slate-800' },
  { id: 'mediafire', name: 'Mediafire', icon: <HardDrive size={18} />, color: 'bg-blue-500' },
  { id: 'sfile', name: 'Sfile', icon: <FileText size={18} />, color: 'bg-orange-600' },
];

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);

    const danzyBase = "https://api.danzy.web.id/api/download";
    let apiUrl = "";

    try {
      if (selectedPlatform === 'tiktok') {
        apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'instagram') {
        apiUrl = `${danzyBase}/instagram?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'facebook') {
        apiUrl = `${danzyBase}/facebook?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'youtube') {
        apiUrl = `${danzyBase}/ytmp4?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'spotify') {
        apiUrl = `${danzyBase}/spotify?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'pinterest') {
        apiUrl = `${danzyBase}/pinterest?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'github') {
        apiUrl = `${danzyBase}/github?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'mediafire') {
        apiUrl = `${danzyBase}/mediafire?url=${encodeURIComponent(url)}`;
      } else if (selectedPlatform === 'sfile') {
        apiUrl = `${danzyBase}/sfile?url=${encodeURIComponent(url)}`;
      }

      const res = await fetch(apiUrl);
      const data = await res.json();
      
      let mappedData: any = null;

      if (selectedPlatform === 'tiktok') {
        const raw = data.data;
        mappedData = {
          title: raw.title || "TikTok Content",
          play: raw.play,
          music: raw.music,
        };
      } else {
        const raw = data.result || data.data || data;
        mappedData = {
          title: raw.title || raw.caption || raw.filename || "Downloaded Media",
          play: raw.url || raw.video || raw.download || (raw.links && raw.links[0]?.url) || raw.url_download,
          music: raw.music || raw.audio || raw.url_audio,
        };
      }

      if (!mappedData.play && !mappedData.music) throw new Error("Data Error");
      setResult(mappedData);
    } catch (err) {
      alert("Gagal mengambil data. Pastikan link benar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-slate-900 selection:bg-blue-100 selection:text-blue-600 relative overflow-hidden">
      
      {/* --- AESTHETIC GRID BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] tracking-widest transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO HUB
          </Link>
          <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">System Online</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Zap size={14} fill="currentColor" /> Multi-Platform Downloader
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-4">
            KY<span className="text-blue-600">DL</span>
          </h1>
          <p className="text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
            Amankan media dari platform favoritmu dalam hitungan detik. Tanpa iklan, tanpa ribet.
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[50px] border border-white p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.03)]">
          
          {/* Platform Grid */}
          <div className="mb-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 ml-2">Pilih Sumber Media:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPlatform(p.id); setResult(null); }}
                  className={`flex items-center gap-3 px-5 py-4 rounded-[22px] font-black text-[11px] transition-all active:scale-95 ${
                    selectedPlatform === p.id 
                    ? `${p.color} text-white shadow-xl shadow-current/20 translate-y-[-2px]` 
                    : 'bg-white text-slate-400 border border-gray-100 hover:border-blue-200'
                  }`}
                >
                  <span className={selectedPlatform === p.id ? 'animate-bounce' : ''}>{p.icon}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="relative group mb-4">
            <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder={`Masukkan link ${selectedPlatform} di sini...`}
              className="w-full pl-20 pr-10 py-9 bg-slate-50/50 border-2 border-slate-100 rounded-[35px] outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800 placeholder:text-slate-300 text-lg shadow-inner"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button 
            onClick={handleDownload}
            disabled={loading || !url}
            className="w-full bg-slate-900 text-white py-8 rounded-[35px] font-black flex items-center justify-center gap-4 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-2xl shadow-gray-200 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Download size={22} />}
            <span className="tracking-widest uppercase">{loading ? "SEDANG MEMPROSES..." : `UNDUH DARI ${selectedPlatform}`}</span>
          </button>

          {/* Result Area */}
          {result && (
            <div className="mt-12 pt-12 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-700">
               <div className="p-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[45px] text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                    <Zap size={120} fill="currentColor" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-12">
                       <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                          <Play size={28} fill="currentColor" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h3 className="font-black text-2xl italic tracking-tighter truncate uppercase">{result.title}</h3>
                          <p className="text-[10px] font-bold text-blue-400 tracking-[0.3em] mt-1">STATUS: READY TO DEPLOY</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.play && (
                        <button 
                          onClick={() => window.open(result.play, '_blank')}
                          className="group/btn bg-white text-slate-900 py-6 rounded-3xl font-black text-xs hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl"
                        >
                          <Video size={18} /> Simpan Video
                        </button>
                      )}
                      {result.music && (
                        <button 
                          onClick={() => window.open(result.music, '_blank')}
                          className="bg-slate-700/50 backdrop-blur-md text-white py-6 rounded-3xl font-black text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest border border-slate-600"
                        >
                          <Music size={18} /> Simpan Audio (MP3)
                        </button>
                      )}
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-20 text-center">
           <p className="text-slate-300 text-[10px] font-black tracking-[0.6em] uppercase mb-4">Developed by Nasrullah</p>
           <div className="flex justify-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
           </div>
        </div>
      </div>
    </div>
  );
}
