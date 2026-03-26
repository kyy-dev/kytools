"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Video, Music, 
  Camera, Loader2, Globe, Heart, Eye, MessageCircle, User, Hash, Info
} from "lucide-react";

export default function DownloaderPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

    // Penentuan API berdasarkan URL
    if (lowerUrl.includes("spotify")) apiUrl = `https://api.siputzx.my.id/api/d/spotifyv2?url=${url}`;
    else if (lowerUrl.includes("facebook")) apiUrl = `https://api.siputzx.my.id/api/d/facebook?url=${url}`;
    else if (lowerUrl.includes("instagram")) apiUrl = `https://api.siputzx.my.id/api/d/igram?url=${url}`;
    else if (lowerUrl.includes("tiktok")) apiUrl = `https://api.siputzx.my.id/api/d/tiktok?url=${url}`;
    else if (lowerUrl.includes("youtube") || lowerUrl.includes("youtu.be")) apiUrl = `https://api.siputzx.my.id/api/d/youtube?url=${url}`;
    else apiUrl = `https://api.siputzx.my.id/api/d/allinone?url=${url}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      // Mengambil data utama dari berbagai struktur API
      const finalData = data.data || data.result || data;
      setResult(finalData);
    } catch (err) {
      alert("Gagal mengambil data. Pastikan link benar atau coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const forceDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${fileName}-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      // Fallback kalau kena CORS policy
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 text-slate-900 selection:bg-blue-100 selection:text-blue-600">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-black text-[11px] tracking-[0.2em] transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> KEMBALI KE BERANDA
        </Link>

        <div className="bg-white rounded-[45px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-gray-50">
          <h1 className="text-4xl font-black mb-10 text-center italic tracking-tighter text-slate-900">
            KY<span className="text-blue-600">DOWNLOADER</span>
          </h1>

          {/* Menu Tab Minimalis */}
          <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar mb-8 border-b border-gray-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-[20px] font-black text-[10px] uppercase tracking-widest transition-all ${selectedTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Input & Button */}
          <div className="space-y-4">
            <div className="relative group">
               <input 
                type="text" 
                placeholder={`Tempel link ${selectedTab === 'all' ? 'konten' : selectedTab} di sini...`}
                className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[30px] outline-none focus:ring-4 focus:ring-blue-50/50 transition-all font-bold text-slate-800 placeholder:text-slate-300"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-sm opacity-0 group-focus-within:opacity-100 transition-opacity">
                <Info size={14} className="text-blue-400" />
              </div>
            </div>

            <button 
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full bg-slate-900 text-white py-6 rounded-[30px] font-black flex items-center justify-center gap-4 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95 shadow-2xl shadow-gray-200"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={22} />}
              {loading ? "MENCARI FILE..." : "DOWNLOAD SEKARANG"}
            </button>
          </div>

          {/* Result Card */}
          {result && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-slate-50/50 rounded-[40px] p-3 border border-slate-100">
                <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm space-y-8">
                   
                   {/* Header Result (Thumbnail & Stats) */}
                   <div className="flex flex-col md:flex-row gap-8">
                      <div className="relative shrink-0">
                        <img 
                          src={result.thumbnail || result.cover || result.image || '/api/placeholder/150/150'} 
                          className="w-full md:w-44 h-44 object-cover rounded-[25px] shadow-lg border-4 border-white" 
                          alt="preview"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-xl">
                          <Play size={14} fill="white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                             <User size={14} /> {result.author?.nickname || result.author?.name || result.author || "Anonim Creator"}
                           </div>
                           <h3 className="font-black text-slate-900 text-xl leading-[1.3] line-clamp-3">
                              {result.title || result.caption || result.description || "Video Tanpa Judul"}
                           </h3>
                        </div>

                        {/* Statistik Grid */}
                        <div className="grid grid-cols-3 gap-3">
                           <div className="bg-slate-50 py-3 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                              <Heart size={14} className="text-red-500 mb-1" fill="#ef4444" />
                              <span className="text-[11px] font-black text-slate-800">{result.statistics?.likeCount || result.likes || '0'}</span>
                           </div>
                           <div className="bg-slate-50 py-3 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                              <Eye size={14} className="text-blue-500 mb-1" fill="#3b82f6" />
                              <span className="text-[11px] font-black text-slate-800">{result.statistics?.viewCount || result.views || '0'}</span>
                           </div>
                           <div className="bg-slate-50 py-3 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                              <MessageCircle size={14} className="text-teal-500 mb-1" fill="#14b8a6" />
                              <span className="text-[11px] font-black text-slate-800">{result.statistics?.commentCount || '0'}</span>
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Deskripsi & Hashtag Section */}
                   {(result.title || result.description) && (
                     <div className="p-6 bg-slate-50 rounded-[25px] border border-slate-100 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                          <Hash size={12} /> Keterangan Lengkap:
                        </div>
                        <p className="text-slate-800 text-sm font-bold leading-relaxed whitespace-pre-line">
                           {result.title || result.description}
                        </p>
                     </div>
                   )}

                   {/* Final Action Button */}
                   <button 
                    onClick={() => forceDownload(result.url || result.download || result.video || result.link || result.url_download, "kytools-video")}
                    className="group w-full bg-blue-600 text-white py-6 rounded-[25px] font-black text-sm hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-[0.98]"
                   >
                     <Download size={20} className="group-hover:bounce" /> SIMPAN VIDEO KE GALERI
                   </button>
                   
                   <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      File di-enkripsi & diproses otomatis oleh KyTools AI
                   </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
