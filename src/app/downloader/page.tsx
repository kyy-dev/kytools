"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Video, Music, 
  Camera, Loader2, Globe, Heart, Eye, MessageCircle, User 
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

    if (lowerUrl.includes("spotify")) apiUrl = `https://api.siputzx.my.id/api/d/spotifyv2?url=${url}`;
    else if (lowerUrl.includes("facebook")) apiUrl = `https://api.siputzx.my.id/api/d/facebook?url=${url}`;
    else if (lowerUrl.includes("instagram")) apiUrl = `https://api.siputzx.my.id/api/d/igram?url=${url}`;
    else if (lowerUrl.includes("tiktok")) apiUrl = `https://api.siputzx.my.id/api/d/tiktok?url=${url}`;
    else if (lowerUrl.includes("youtube") || lowerUrl.includes("youtu.be")) apiUrl = `https://api.siputzx.my.id/api/d/youtube?url=${url}`;
    else apiUrl = `https://api.siputzx.my.id/api/d/allinone?url=${url}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const finalData = data.data || data.result || data;
      setResult(finalData);
    } catch (err) {
      alert("Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi sakti biar file beneran ke-download ke galeri/folder
  const saveFile = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || "kytools-download";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(fileUrl, '_blank'); // Fallback kalau fetch di-block CORS
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 text-slate-900 selection:bg-blue-100 selection:text-blue-600">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-xs tracking-widest transition-colors">
          <ArrowLeft size={18} /> KEMBALI
        </Link>

        <div className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100">
          <h1 className="text-3xl font-black mb-8 text-center italic tracking-tighter text-slate-900">
            KY<span className="text-blue-600">DOWNLOADER</span>
          </h1>

          {/* Menu Tab */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder={`Tempel link ${selectedTab === 'all' ? 'media sosial' : selectedTab} di sini...`}
              className="w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 placeholder:text-slate-300"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button 
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95 shadow-xl shadow-gray-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
              {loading ? "MEMPROSES DATA..." : "DOWNLOAD SEKARANG"}
            </button>
          </div>

          {result && (
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="bg-slate-50 rounded-[35px] p-2 border border-slate-100">
                <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm">
                   
                   {/* Meta Info (Thumbnail & Title) */}
                   <div className="flex flex-col md:flex-row gap-6 mb-6">
                      {(result.thumbnail || result.cover) && (
                        <img 
                          src={result.thumbnail || result.cover} 
                          className="w-full md:w-32 h-32 object-cover rounded-2xl shadow-md" 
                          alt="preview"
                        />
                      )}
                      <div className="flex-1 overflow-hidden">
                        <h3 className="font-black text-slate-900 text-lg leading-tight mb-2 line-clamp-2">
                          {result.title || result.caption || result.description || "Konten Ditemukan"}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-tight">
                          <User size={14} /> {result.author?.nickname || result.author?.name || "Kreator"}
                        </div>
                      </div>
                   </div>

                   {/* Stats Section */}
                   <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="bg-slate-50 p-3 rounded-xl text-center">
                        <Heart size={14} className="mx-auto mb-1 text-red-500" />
                        <p className="text-[10px] font-black text-slate-800">{result.statistics?.likeCount || result.likes || 0}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl text-center">
                        <Eye size={14} className="mx-auto mb-1 text-blue-500" />
                        <p className="text-[10px] font-black text-slate-800">{result.statistics?.viewCount || result.views || 0}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl text-center">
                        <MessageCircle size={14} className="mx-auto mb-1 text-green-500" />
                        <p className="text-[10px] font-black text-slate-800">{result.statistics?.commentCount || 0}</p>
                      </div>
                   </div>

                   {/* Action Button */}
                   <button 
                    onClick={() => saveFile(result.url || result.download || result.video || result.link, "kytools-file")}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                   >
                     <Download size={18} /> SIMPAN KE PERANGKAT
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
