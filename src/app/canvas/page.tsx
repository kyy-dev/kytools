"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImageIcon, Loader2, Download, Upload, Link as LinkIcon, Sparkles } from "lucide-react";

export default function CanvasPage() {
  const [inputMode, setInputMode] = useState<'url' | 'upload'>('url');
  const [imgUrl, setImgUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const applyEffect = (type: 'affect' | 'invert') => {
    if (!imgUrl) return alert("Masukkan URL atau Upload gambar dulu!");
    setLoading(true);
    const apiUrl = `https://api.siputzx.my.id/api/canvas/${type}?url=${encodeURIComponent(imgUrl)}`;
    setResult(apiUrl);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-bold text-sm transition-colors">
          <ArrowLeft size={18} /> KEMBALI
        </Link>

        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Canvas Magic</h1>
            <p className="text-slate-400 text-sm font-medium">Beri efek dramatis pada fotomu secara instan.</p>
          </div>

          {/* Toggle Mode */}
          <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setInputMode('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${inputMode === 'url' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              <LinkIcon size={16} /> URL Gambar
            </button>
            <button 
              onClick={() => setInputMode('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${inputMode === 'upload' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              <Upload size={16} /> Upload File
            </button>
          </div>

          <div className="space-y-6 mb-10">
            {inputMode === 'url' ? (
              <input 
                type="text" 
                placeholder="Paste URL gambar (.jpg / .png)..."
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <ImageIcon size={40} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400 text-sm font-medium">Coming Soon: Upload ke Cloudinary</p>
                <p className="text-[10px] text-slate-300">Gunakan mode URL untuk saat ini</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => applyEffect('affect')}
                className="bg-orange-500 text-white py-4 rounded-3xl font-black shadow-xl shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all"
              >
                EFEK AFFECT
              </button>
              <button 
                onClick={() => applyEffect('invert')}
                className="bg-slate-900 text-white py-4 rounded-3xl font-black shadow-xl shadow-slate-200 hover:bg-black active:scale-95 transition-all"
              >
                EFEK INVERT
              </button>
            </div>
          </div>

          {result && (
            <div className="flex flex-col items-center animate-in zoom-in duration-500 bg-slate-50 p-6 rounded-[32px] border border-slate-200">
              <img src={result} alt="Result" className="rounded-2xl shadow-2xl mb-6 max-h-[350px] border-4 border-white" />
              <a href={result} target="_blank" className="bg-blue-600 text-white px-10 py-4 rounded-full font-black shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                <Download size={20} /> SIMPAN GAMBAR
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
