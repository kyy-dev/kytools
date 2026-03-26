"use client";
import { useState } from "react";
import Link from "next/link";

// IMPORT FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDownload, 
  faSearch, 
  faArrowLeft, 
  faZap, 
  faPlay, 
  faMusic, 
  faFileAlt, 
  faCloudDownloadAlt,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import { 
  faTiktok, 
  faInstagram, 
  faYoutube, 
  faFacebook, 
  faSpotify, 
  faPinterest, 
  faGithub 
} from "@fortawesome/free-brands-svg-icons";

const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: faTiktok, color: 'bg-black' },
  { id: 'instagram', name: 'Instagram', icon: faInstagram, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
  { id: 'youtube', name: 'YouTube', icon: faYoutube, color: 'bg-red-600' },
  { id: 'facebook', name: 'Facebook', icon: faFacebook, color: 'bg-blue-600' },
  { id: 'spotify', name: 'Spotify', icon: faSpotify, color: 'bg-green-600' },
  { id: 'pinterest', name: 'Pinterest', icon: faPinterest, color: 'bg-red-500' },
  { id: 'github', name: 'GitHub', icon: faGithub, color: 'bg-slate-800' },
  { id: 'mediafire', name: 'Mediafire', icon: faCloudDownloadAlt, color: 'bg-blue-500' },
  { id: 'sfile', name: 'Sfile', icon: faFileAlt, color: 'bg-orange-600' },
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
    
    try {
      const danzyBase = "https://api.danzy.web.id/api/download";
      let apiUrl = selectedPlatform === 'tiktok' 
        ? `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`
        : `${danzyBase}/${selectedPlatform}?url=${encodeURIComponent(url)}`;

      const res = await fetch(apiUrl);
      const data = await res.json();
      
      let mappedData: any = null;

      if (selectedPlatform === 'tiktok') {
        const raw = data.data;
        if (!raw) throw new Error();
        mappedData = { title: raw.title || "TikTok Content", play: raw.play, music: raw.music };
      } else {
        const raw = data.result || data.data || data;
        mappedData = {
          title: raw.title || raw.caption || "Media Found",
          play: raw.url || raw.video || raw.download || (raw.links && raw.links[0]?.url) || raw.url_download,
          music: raw.music || raw.audio,
        };
      }

      if (!mappedData.play && !mappedData.music) throw new Error();
      setResult(mappedData);
    } catch (err) {
      alert("Gagal menarik data. Pastikan link benar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-slate-900 relative overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] tracking-widest transition-all mb-12 uppercase">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Back to Hub
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <FontAwesomeIcon icon={faZap} /> Multi-Platform Downloader
          </div>
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none mb-4 uppercase">
            Ky<span className="text-blue-600">DL</span>
          </h1>
          <p className="text-slate-500 font-bold max-w-sm mx-auto">Amankan media tanpa batas dalam hitungan detik.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl rounded-[40px] border border-white p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedPlatform(p.id); setResult(null); }}
                className={`flex items-center gap-3 px-4 py-4 rounded-[20px] font-black text-[10px] uppercase transition-all active:scale-95 ${
                  selectedPlatform === p.id ? `${p.color} text-white shadow-xl` : 'bg-white text-slate-400 border border-gray-100'
                }`}
              >
                <FontAwesomeIcon icon={p.icon} className="text-lg" /> {p.name}
              </button>
            ))}
          </div>

          <div className="relative mb-4 group">
             <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-focus-within:text-blue-600 transition-colors">
                <FontAwesomeIcon icon={faSearch} size="lg" />
             </div>
             <input 
              type="text" 
              placeholder={`Paste link ${selectedPlatform} di sini...`}
              className="w-full pl-16 pr-6 py-8 bg-slate-50 border-2 border-slate-100 rounded-[25px] outline-none focus:border-blue-500 font-bold"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button 
            onClick={handleDownload}
            disabled={loading || !url}
            className="w-full bg-slate-900 text-white py-7 rounded-[25px] font-black flex items-center justify-center gap-4 hover:bg-blue-600 transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : <FontAwesomeIcon icon={faDownload} />}
            <span className="tracking-widest uppercase">{loading ? "Processing..." : "Download Now"}</span>
          </button>

          {result && (
            <div className="mt-10 p-8 bg-slate-900 rounded-[35px] text-white animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/40">
                  <FontAwesomeIcon icon={faPlay} />
                </div>
                <h3 className="font-black text-lg truncate uppercase italic tracking-tight">{result.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.play && (
                  <button onClick={() => window.open(result.play, '_blank')} className="bg-white text-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                    Save Media
                  </button>
                )}
                {result.music && (
                  <button onClick={() => window.open(result.music, '_blank')} className="bg-slate-700 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-600 transition-all border border-slate-600">
                    Save Audio
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <p className="mt-16 text-center text-slate-300 text-[10px] font-black tracking-[0.5em] uppercase">KyTools © 2026 • Fadhillah Dzaki Nasrullah</p>
      </div>
    </div>
  );
}
