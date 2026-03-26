"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Play, Music, 
  Video, Loader2, Globe, 
  Instagram, Facebook, Youtube, Music2, Share2, 
  Github, HardDrive, FileText, Smartphone
} from "lucide-react";

const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: <Music2 size={18} />, color: 'bg-black' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={18} />, color: 'bg-pink-600' },
  { id: 'youtube', name: 'YouTube', icon: <Youtube size={18} />, color: 'bg-red-600' },
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
      // FIX ROUTING: Sesuai endpoint yang kamu kasih
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
          title: raw.title || "TikTok Video",
          play: raw.play,
          music: raw.music,
        };
      } else {
        // Mapping hasil Danzy API
        const raw = data.result || data.data || data;
        mappedData = {
          title: raw.title || raw.caption || raw.filename || raw.name || "Media Content",
          play: raw.url || raw.video || raw.download || (raw.links && raw.links[0]?.url) || raw.url_download,
          music: raw.music || raw.audio || raw.url_audio,
        };
      }

      if (!mappedData.play && !mappedData.music) throw new Error("Data Kosong");
      setResult(mappedData);

    } catch (err) {
      alert(`Waduh Jak, link atau platform ${selectedPlatform} bermasalah!`);
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

        <div className="bg-white rounded-[50px] p-8 md:p-14 shadow-sm border border-gray-100">
          <div className="mb-12">
            <h1 className="text-5xl font-black italic tracking-tighter">KY<span className="text-blue-600">DL</span></h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Universal Downloader</p>
          </div>

          {/* MENU SELECTION */}
          <div className="flex flex-wrap gap-3 mb-10">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedPlatform(p.id); setResult(null); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[11px] transition-all ${
                  selectedPlatform === p.id 
                  ? `${p.color} text-white shadow-lg` 
                  : 'bg-slate-50 text-slate-400'
                }`}
              >
                {p.icon} {p.name}
              </button>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder={`Paste link ${selectedPlatform} di sini...`}
              className="w-full px-8 py-7 bg-slate-50 border-2 border-slate-100 rounded-[35px] outline-none focus:border-blue-500 font-bold"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full bg-slate-900 text-white py-7 rounded-[35px] font-black flex items-center justify-center gap-4 hover:bg-blue-600 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={24} />}
              {loading ? "PROCESSING..." : `GET FILE`}
            </button>
          </div>

          {/* RESULT */}
          {result && (
            <div className="mt-12 p-8 bg-slate-50 rounded-[40px] border border-slate-100 animate-in slide-in-from-bottom-5">
              <h3 className="font-black text-slate-900 text-lg italic mb-8">"{result.title}"</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.play && (
                  <button onClick={() => window.open(result.play, '_blank')} className="bg-slate-900 text-white py-5 rounded-3xl font-black text-xs flex items-center justify-center gap-2">
                    <Video size={18} /> DOWNLOAD VIDEO / FILE
                  </button>
                )}
                {result.music && (
                  <button onClick={() => window.open(result.music, '_blank')} className="bg-white text-slate-900 border-2 border-slate-900 py-5 rounded-3xl font-black text-xs flex items-center justify-center gap-2">
                    <Music size={18} /> DOWNLOAD AUDIO
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
