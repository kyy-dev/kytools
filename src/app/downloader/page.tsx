"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Video, Music, 
  Camera, Loader2, Globe, Heart, Eye, MessageCircle, User, Hash
} from "lucide-react";

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      // Menggunakan API TikWM yang super stabil untuk TikTok
      const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const responseData = await res.json();
      
      if (responseData.data) {
        setResult(responseData.data);
      } else {
        alert("Link tidak valid atau video tidak ditemukan!");
      }
    } catch (err) {
      alert("Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const bUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = bUrl;
      a.download = `${fileName}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(bUrl);
    } catch (error) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 text-slate-900">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-xs tracking-widest transition-colors">
          <ArrowLeft size={18} /> KEMBALI
        </Link>

        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-black mb-8 text-center italic tracking-tighter">
            KY<span className="text-blue-600">DOWNLOADER</span>
          </h1>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Tempel link TikTok di sini..."
              className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button 
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 disabled:bg-slate-200 transition-all shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
              {loading ? "PROSES DATA..." : "GET VIDEO DATA"}
            </button>
          </div>

          {result && (
            <div className="mt-10 animate-in slide-in-from-bottom-5 duration-500 space-y-6">
              {/* Preview Video Section */}
              <div className="bg-slate-900 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
                <video src={result.play} controls className="w-full aspect-video" />
              </div>

              {/* Info & Caption Section */}
              <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                    <img src={result.author.avatar} alt="avatar" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">@{result.author.unique_id}</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{result.author.nickname}</p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-sm font-bold leading-relaxed text-slate-800">
                    {result.title || "No Caption"}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                    <Heart size={16} className="mx-auto mb-1 text-red-500" fill="currentColor" />
                    <span className="text-xs font-black">{result.digg_count}</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                    <Eye size={16} className="mx-auto mb-1 text-blue-500" fill="currentColor" />
                    <span className="text-xs font-black">{result.play_count}</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                    <MessageCircle size={16} className="mx-auto mb-1 text-green-500" fill="currentColor" />
                    <span className="text-xs font-black">{result.comment_count}</span>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button 
                    onClick={() => saveFile(result.play, "ky-tiktok-no-wm")}
                    className="bg-blue-600 text-white py-4 rounded-2xl font-black text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-100"
                  >
                    <Download size={16} /> VIDEO (NO WM)
                  </button>
                  <button 
                    onClick={() => saveFile(result.music, "ky-tiktok-audio")}
                    className="bg-slate-900 text-white py-4 rounded-2xl font-black text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Music size={16} /> DOWNLOAD MP3
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
