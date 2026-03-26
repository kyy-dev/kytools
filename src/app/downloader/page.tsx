"use client";
import { useState } from "react";
import Link from "next/link";

// FIX: Mencegah icon membesar saat pertama kali render
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDownload, faArrowLeft, faCircleNotch,
  faExclamationTriangle, faSkullCrossbones, faUserCircle, faHashtag, faVideo, faMusic
} from "@fortawesome/free-solid-svg-icons";
import { 
  faTiktok, faInstagram, faYoutube, faFacebook, 
  faSpotify, faPinterest, faGithub 
} from "@fortawesome/free-brands-svg-icons";

const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: faTiktok, color: 'bg-black', isError: false },
  { id: 'mediafire', name: 'Mediafire', icon: faDownload, color: 'bg-blue-500', isError: true },
  { id: 'instagram', name: 'Instagram', icon: faInstagram, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600', isError: true },
  { id: 'youtube', name: 'YouTube', icon: faYoutube, color: 'bg-red-600', isError: true },
  { id: 'facebook', name: 'Facebook', icon: faFacebook, color: 'bg-blue-600', isError: true },
  { id: 'spotify', name: 'Spotify', icon: faSpotify, color: 'bg-green-600', isError: true },
  { id: 'pinterest', name: 'Pinterest', icon: faPinterest, color: 'bg-red-500', isError: true },
  { id: 'github', name: 'GitHub', icon: faGithub, color: 'bg-slate-800', isError: true },
];

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');

  // FUNGSI BLOB: Agar file langsung kesimpan di user (bukan cuma buka tab)
  const downloadLangsung = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.body.appendChild(document.createElement("a"));
      link.href = blobUrl;
      link.download = fileName;
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(fileUrl, "_blank");
    }
  };

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (data.data) {
        const raw = data.data;
        const mappedData = { 
          title: raw.title || "No Description", 
          play: raw.play, 
          music: raw.music,
          author: raw.author?.nickname || "Unknown",
          uniqueId: raw.author?.unique_id || "user",
          cover: raw.cover
        };
        setResult(mappedData);
        // LANGSUNG DOWNLOAD SAAT BERHASIL
        downloadLangsung(mappedData.play, `KyDL_${mappedData.uniqueId}.mp4`);
      }
    } catch (err) {
      alert("Gagal menarik data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-slate-900 relative overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] tracking-widest transition-all mb-12 uppercase">
          <FontAwesomeIcon icon={faArrowLeft} style={{width: '10px'}} /> Back to Hub
        </Link>

        {/* Maintenance Banner */}
        <div className="mb-10 bg-red-50 border-2 border-red-100 rounded-[30px] p-6 flex items-center gap-5">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shrink-0">
            <FontAwesomeIcon icon={faSkullCrossbones} style={{width: '20px'}} />
          </div>
          <p className="text-sm font-bold text-slate-700 uppercase italic">Mediafire & Engine Lain sedang Down. Hanya TikTok yang Stabil.</p>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none mb-4 uppercase">
            Ky<span className="text-blue-600">DL</span>
          </h1>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">Automated Content Saver</p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl rounded-[40px] border border-white p-6 md:p-10 shadow-2xl">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedPlatform(p.id); setResult(null); }}
                className={`relative flex items-center gap-3 px-4 py-4 rounded-[20px] font-black text-[9px] uppercase transition-all ${
                  selectedPlatform === p.id ? `${p.color} text-white shadow-xl scale-105 z-10` : 'bg-white text-slate-400 border border-gray-100'
                }`}
              >
                <FontAwesomeIcon icon={p.icon} style={{width: '18px'}} /> 
                <span className="truncate">{p.name}</span>
                {p.isError && (
                  <div className="absolute -top-2 -right-1 bg-red-600 text-white px-2 py-0.5 rounded-lg text-[7px] border border-white animate-bounce">
                    ERROR
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="relative mb-4">
             <input 
              type="text" 
              placeholder={`Paste link ${selectedPlatform} di sini...`}
              className="w-full pl-8 pr-6 py-8 bg-slate-50 border-2 border-slate-100 rounded-[25px] outline-none focus:border-blue-500 font-bold"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button 
            onClick={handleDownload}
            disabled={loading || !url}
            className="w-full bg-slate-900 text-white py-7 rounded-[25px] font-black flex items-center justify-center gap-4 hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin style={{width: '20px'}} /> : <FontAwesomeIcon icon={faDownload} style={{width: '20px'}} />}
            <span className="tracking-widest uppercase">{loading ? "Fetching..." : "Get Content"}</span>
          </button>

          {/* HASIL OPTIMAL: DESKRIPSI, TAG, & TOMBOL LANGSUNG */}
          {result && (
            <div className="mt-10 p-8 bg-slate-900 rounded-[35px] text-white animate-in fade-in slide-in-from-bottom-4 border-b-8 border-blue-600">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img src={result.cover} className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-800 shadow-2xl" />
                <div className="flex-1 text-center md:text-left overflow-hidden">
                   <div className="flex items-center justify-center md:justify-start gap-2 text-blue-400 mb-2">
                      <FontAwesomeIcon icon={faUserCircle} style={{width: '14px'}} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{result.author} (@{result.uniqueId})</span>
                   </div>
                   <h3 className="font-bold text-sm italic text-slate-300 line-clamp-3">
                     <FontAwesomeIcon icon={faHashtag} className="mr-2 text-blue-500" style={{width: '12px'}} />
                     {result.title}
                   </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <button 
                  onClick={() => downloadLangsung(result.play, `KyDL_${result.uniqueId}.mp4`)} 
                  className="bg-white text-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <FontAwesomeIcon icon={faVideo} style={{width: '14px'}} /> Download MP4 (No WM)
                </button>
                <button 
                  onClick={() => downloadLangsung(result.music, `KyDL_${result.uniqueId}.mp3`)} 
                  className="bg-slate-800 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-700 flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faMusic} style={{width: '14px'}} /> Download MP3
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="mt-16 text-center text-slate-300 text-[10px] font-black tracking-[0.5em] uppercase">Architect: Fadhillah Dzaki Nasrullah</p>
      </div>
    </div>
  );
}
