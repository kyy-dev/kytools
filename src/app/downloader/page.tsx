"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Music, 
  Video, Camera, Loader2, Globe, Heart, 
  Eye, MessageCircle, User, Info, Share2
} from "lucide-react";

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);

    const lowerUrl = url.toLowerCase();
    let apiUrl = "";
    const alyaKey = "G8p6n7"; // API Key AlyaChan

    try {
      // 1. ROUTING ENGINE API
      if (lowerUrl.includes("tiktok")) {
        apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
      } else if (lowerUrl.includes("instagram")) {
        apiUrl = `https://api.alyachan.dev/api/igdl?url=${url}&apikey=${alyaKey}`;
      } else if (lowerUrl.includes("facebook") || lowerUrl.includes("fb.watch")) {
        apiUrl = `https://api.siputzx.my.id/api/d/facebook?url=${url}`;
      } else if (lowerUrl.includes("youtube") || lowerUrl.includes("youtu.be")) {
        apiUrl = `https://api.alyachan.dev/api/ytpv2?url=${url}&apikey=${alyaKey}`;
      } else if (lowerUrl.includes("spotify")) {
        apiUrl = `https://api.siputzx.my.id/api/d/spotifyv2?url=${url}`;
      } else if (lowerUrl.includes("pin.it") || lowerUrl.includes("pinterest")) {
        apiUrl = `https://api.siputzx.my.id/api/d/pinterest?url=${url}`;
      } else {
        apiUrl = `https://api.siputzx.my.id/api/d/allinone?url=${url}`;
      }

      const res = await fetch(apiUrl);
      const data = await res.json();
      const raw = data.data || data.result || data;

      if (!raw) throw new Error("Data not found");

      // 2. NORMALISASI DATA (Agar UI Tetap Konsisten Apapun Sosmednya)
      const mappedData = {
        type: lowerUrl.includes("spotify") ? "audio" : "video",
        title: raw.title || raw.caption || raw.desc || raw.metadata?.title || "Konten Media",
        play: raw.play || raw.url || raw.video || raw.download || raw.link || (raw.links && raw.links[0]?.url),
        music: raw.music || raw.audio || raw.url_audio || raw.download_url,
        thumbnail: raw.thumbnail || raw.cover || raw.metadata?.thumbnail || raw.image || result?.author?.avatar,
        author: {
          name: raw.author?.nickname || raw.author?.name || raw.author || "Social Media User",
          avatar: raw.author?.avatar || null
        },
        stats: {
          likes: raw.digg_count || raw.statistics?.likeCount || raw.likes || "0",
          views: raw.play_count || raw.statistics?.viewCount || raw.views || "0",
          comments: raw.comment_count || "0"
        }
      };

      setResult(mappedData);
    } catch (err) {
      alert("Gagal memproses link. Server mungkin sibuk atau link diproteksi.");
    } finally {
      setLoading(false);
    }
  };

  const forceDownload = async (fileUrl: string, name: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const bUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = bUrl;
      a.download = `${name}-${Date.now()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(bUrl);
    } catch (e) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 text-slate-900 selection:bg-blue-100">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest transition-all">
          <ArrowLeft size={16} /> KEMBALI KE DASHBOARD
        </Link>

        <div className="bg-white rounded-[45px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.02)] border border-gray-50">
          <h1 className="text-4xl font-black mb-10 text-center italic tracking-tighter text-slate-900">
            KY<span className="text-blue-600">DOWNLOADER</span>
          </h1>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tempel link TikTok, IG, FB, YT, Spotify..."
                className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[30px] outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <button 
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full bg-slate-900 text-white py-6 rounded-[30px] font-black flex items-center justify-center gap-4 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95 shadow-xl shadow-gray-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={22} />}
              {loading ? "MENGAMBIL DATA..." : "DOWNLOAD SEKARANG"}
            </button>
          </div>

          {result && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
              <div className="bg-slate-50/50 rounded-[40px] p-3 border border-slate-100">
                <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm space-y-6">
                  
                  {/* Media Preview */}
                  <div className="relative rounded-[25px] overflow-hidden bg-black aspect-video border-4 border-white shadow-lg">
                    {result.type === "audio" ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-6">
                        <Music size={60} className="mb-4 text-blue-500 animate-pulse" />
                        <p className="font-black text-center text-sm uppercase tracking-widest">Spotify Track Loaded</p>
                      </div>
                    ) : (
                      <video src={result.play} controls className="w-full h-full object-contain" />
                    )}
                  </div>

                  {/* Caption & User Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {result.author.avatar && (
                        <img src={result.author.avatar} className="w-10 h-10 rounded-full border-2 border-blue-500" alt="avatar" />
                      )}
                      <div>
                        <p className="font-black text-slate-900 text-sm leading-none">{result.author.name}</p>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Creator Content</p>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-sm font-bold leading-relaxed text-slate-800 italic">
                        "{result.title}"
                      </p>
                    </div>
                  </div>

                  {/* Stats & Action */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 py-3 rounded-2xl flex flex-col items-center border border-slate-100">
                      <Heart size={16} className="text-red-500 mb-1" fill="currentColor" />
                      <span className="text-[11px] font-black">{result.stats.likes}</span>
                    </div>
                    <div className="bg-slate-50 py-3 rounded-2xl flex flex-col items-center border border-slate-100">
                      <Eye size={16} className="text-blue-500 mb-1" fill="currentColor" />
                      <span className="text-[11px] font-black">{result.stats.views}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                    {result.play && (
                      <button 
                        onClick={() => forceDownload(result.play, "kytools-media")}
                        className="bg-blue-600 text-white py-5 rounded-[22px] font-black text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                      >
                        <Video size={18} /> DOWNLOAD MEDIA
                      </button>
                    )}
                    {result.music && (
                      <button 
                        onClick={() => forceDownload(result.music, "kytools-audio")}
                        className="bg-slate-900 text-white py-5 rounded-[22px] font-black text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Music size={18} /> DOWNLOAD MP3
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
