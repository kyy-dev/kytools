"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Music, 
  Video, Loader2, Server, Globe, 
  Instagram, Facebook, Youtube, Music2, Share2, 
  Github
} from "lucide-react";

const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: <Music2 size={18} />, color: 'bg-black' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={18} />, color: 'bg-pink-600' },
  { id: 'youtube', name: 'YouTube', icon: <Youtube size={18} />, color: 'bg-red-600' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={18} />, color: 'bg-blue-600' },
  { id: 'spotify', name: 'Spotify', icon: <Music size={18} />, color: 'bg-green-600' },
  { id: 'pinterest', name: 'Pinterest', icon: <Share2 size={18} />, color: 'bg-red-500' },
  { id: 'github', name: 'GitHub', icon: <Github size={18} />, color: 'bg-slate-800' },
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
      }

      const res = await fetch(apiUrl);
      const data = await res.json();
      
      let mappedData: any = null;

      if (selectedPlatform === 'tiktok') {
        const raw = data.data;
        mappedData = {
          title: raw.title || "TikTok Video",
          play: raw.play,
          music: raw.music,
        };
      } else {
        const raw = data.result || data.data || data;
        mappedData = {
          title: raw.title || raw.caption || raw.filename || "Media Content",
          play: raw.url || raw.video || raw.download || (raw.links && raw.links[0]?.url),
          music: raw.music || raw.audio,
        };
      }

      if (!mappedData.play && !mappedData.music) throw new Error("File not found");
      setResult(mappedData);

    } catch (err) {
      alert(`Gagal download, Jak! Pastikan link benar.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-4 md:p-8 text-slate-900">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest transition-all">
          <ArrowLeft size={16} /> BACK
        </Link>

        <div className="bg-white rounded-[50px] p-8 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 text-center md:text-left">
            <div>
              <h1 className="text-5xl font-black italic tracking-tighter text-slate-900">KY<span className="text-blue-600">DL</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Multi-Platform Tool</p>
            </div>
          </div>

          {/* PLATFORM SELECTOR */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPlatform(p.id); setResult(null); }}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-[11px] transition-all active:scale-95 ${
                    selectedPlatform === p.id 
                    ? `${p.color} text-white shadow-xl shadow-current/20 scale-105` 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {p.icon} {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT AREA */}
          <div className="space-y-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder={`Paste ${selectedPlatform} link here...`}
                className="w-full px-8 py-7 bg-slate-50 border-2 border-slate-100 rounded-[35px] outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800 shadow-inner"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-200">
                <Globe size={24} />
              </div>
            </div>

            <button 
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full bg-slate-900 text-white py-7 rounded-[35px] font-black flex items-center justify-center gap-4 hover:bg-blue-600 disabled:bg-slate-50 transition-all shadow-2xl shadow-gray-200"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={24} />}
              {loading ? "PROCESSING..." : `DOWNLOAD NOW`}
            </button>
          </div>

          {/* RESULT BOX */}
          {result && (
            <div className="mt-14 animate-in slide-in-from-bottom-10 duration-700">
               <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Play size={20} fill="currentColor" />
                     </div>
                     <h3 className="flex-1 font-black text-slate-900 truncate text-lg italic tracking-tight">{result.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.play && (
                      <button 
                        onClick={() => window.open(result.play, '_blank')}
                        className="bg-slate-900 text-white py-5 rounded-3xl font-black text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                      >
                        <Video size={18} /> DOWNLOAD VIDEO
                      </button>
                    )}
                    {result.music && (
                      <button 
                        onClick={() => window.open(result.music, '_blank')}
                        className="bg-white text-slate-900 border-2 border-slate-900 py-5 rounded-3xl font-black text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                      >
                        <Music size={18} /> DOWNLOAD AUDIO
                      </button>
                    )}
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
