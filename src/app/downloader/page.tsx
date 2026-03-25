"use client";
import { useState } from "react";
import Link from "next/link";
// Kita pakai nama icon yang paling umum dan stabil di Lucide
import { 
  ArrowLeft, 
  Download, 
  Play, 
  Video, 
  Music, 
  Camera, 
  Facebook, 
  Loader2, 
  Globe
} from "lucide-react";

export default function DownloaderPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Saya ganti icon Instagram ke Camera dan Youtube ke Video biar gak error undefined lagi
  const tabs = [
    { id: 'all', label: 'Semua', icon: <Globe size={16}/> },
    { id: 'tiktok', label: 'TikTok', icon: <Play size={16}/> },
    { id: 'instagram', label: 'Instagram', icon: <Camera size={16}/> },
    { id: 'youtube', label: 'YouTube', icon: <Video size={16}/> },
    { id: 'spotify', label: 'Spotify', icon: <Music size={16}/> },
  ];

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);

    let apiUrl = "";
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes("spotify")) apiUrl = `https://api.siputzx.my.id/api/d/spotifyv2?url=${url}`;
    else if (lowerUrl.includes("facebook")) apiUrl = `https://api.siputzx.my.id/api/d/facebook?url=${url}`;
    else if (lowerUrl.includes("instagram")) apiUrl = `https://api.siputzx.my.id/api/d/igram?url=${url}`;
    else if (lowerUrl.includes("tiktok")) apiUrl = `https://api.siputzx.my.id/api/d/tiktok?url=${url}`;
    else if (lowerUrl.includes("youtube") || lowerUrl.includes("youtu.be")) {
       apiUrl = `https://api.siputzx.my.id/api/d/youtube?url=${url}`; 
    } else {
       apiUrl = `https://api.siputzx.my.id/api/d/allinone?url=${url}`;
    }

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      // Menyesuaikan berbagai bentuk response API
      const finalData = data.data || data.result || data;
      setResult(finalData);
    } catch (err) {
      alert("Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 text-slate-900">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-bold text-sm transition-colors">
          <ArrowLeft size={18} /> KEMBALI
        </Link>

        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-black mb-8 text-center italic tracking-tighter">KY<span className="text-blue-600">DOWNLOADER</span></h1>

          {/* Menu Pilihan Tab */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all ${selectedTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder={`Tempel link ${selectedTab === 'all' ? 'sosmed' : selectedTab} di sini...`}
              className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button 
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 disabled:bg-slate-200 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
              {loading ? "LAGI PROSES..." : "DOWNLOAD SEKARANG"}
            </button>
          </div>

          {result && (
            <div className="mt-10 animate-in slide-in-from-bottom-5 duration-500">
              <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100">
                <div className="bg-white p-5 rounded-2xl flex items-center justify-between border border-slate-100 shadow-sm">
                   <div className="flex items-center gap-4 truncate">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                        <Play size={20} fill="currentColor"/>
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold truncate">File Berhasil Ditemukan</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ready to save</p>
                      </div>
                   </div>
                   <a 
                    href={typeof result === 'string' ? result : (result.url || result.download || result.link)} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-blue-700 transition-all shadow-md"
                   >
                     SAVE
                   </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
