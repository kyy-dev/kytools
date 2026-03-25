"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Scissors, Download, Loader2, ImageIcon, Sparkles, X } from "lucide-react";

export default function RemoveBgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const clear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const processImage = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/remove-bg", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Gagal");
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) {
      alert("Terjadi kesalahan API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-bold text-sm transition-colors">
          <ArrowLeft size={18} /> BERANDA
        </Link>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10 text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={12} /> AI Powered Magic
            </div>
            <h1 className="text-4xl font-black tracking-tighter italic">BG<span className="text-blue-600">ERASER</span></h1>
            <p className="text-slate-400 text-sm mt-2 font-medium">Hapus latar belakang foto otomatis dalam hitungan detik.</p>
          </div>

          {!preview ? (
            <label className="group relative flex flex-col items-center justify-center w-full h-80 border-4 border-dashed border-slate-100 rounded-[40px] cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
              <div className="flex flex-col items-center justify-center p-10">
                <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-blue-500 group-hover:bg-white transition-all shadow-sm mb-6">
                  <Upload size={32} />
                </div>
                <p className="text-lg font-black text-slate-800">Pilih atau Seret Foto</p>
                <p className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-widest">PNG, JPG up to 10MB</p>
              </div>
              <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
            </label>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
              {/* Preview Original */}
              <div className="relative group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Original Foto</p>
                <div className="rounded-[32px] overflow-hidden border-4 border-white shadow-xl aspect-square bg-slate-100">
                  <img src={preview} alt="Original" className="w-full h-full object-cover" />
                </div>
                {!result && !loading && (
                   <button onClick={clear} className="absolute top-10 right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                      <X size={16} />
                   </button>
                )}
              </div>

              {/* Result Area */}
              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3">Hasil AI</p>
                <div className="rounded-[32px] overflow-hidden border-4 border-white shadow-2xl aspect-square bg-slate-50 flex items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')]">
                  {loading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={40} className="animate-spin text-blue-600" />
                      <p className="text-xs font-black text-slate-400 tracking-tighter uppercase">Menghapus Background...</p>
                    </div>
                  ) : result ? (
                    <img src={result} alt="Result" className="w-full h-full object-contain p-4" />
                  ) : (
                    <div className="text-center p-8">
                       <Scissors size={32} className="mx-auto text-slate-200 mb-4" />
                       <p className="text-xs font-bold text-slate-300">Siap diproses</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {preview && (
            <div className="mt-10 flex gap-4">
              {!result ? (
                <button 
                  onClick={processImage} 
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-200"
                >
                  <Sparkles size={20} /> MULAI PROSES
                </button>
              ) : (
                <>
                  <button onClick={clear} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-[24px] font-black text-lg hover:bg-slate-200 transition-all">ULANGI</button>
                  <a href={result} download="kytools-bg-removed.png" className="flex-1 bg-gray-900 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95">
                    <Download size={20} /> DOWNLOAD
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
        © 2026 Fadhillah Dzaki Nasrullah
      </footer>
    </div>
  );
}
