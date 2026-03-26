"use client";
import React, { useState, useRef } from 'react';
import { ImageIcon, Download, FileImage, AlertTriangle, Loader2 } from 'lucide-react';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('image/jpeg');
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) return;

    if (!SUPPORTED_FORMATS.includes(selectedFile.type)) {
      setError('Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.');
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setConvertedUrl(null); // Reset hasil sebelumnya
  };

  const convertImage = () => {
    if (!file || !previewUrl) return;
    setLoading(true);
    setError('');

    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setError('Gagal inisialisasi Canvas API.');
        setLoading(false);
        return;
      }

      // Set dimensi canvas sesuai gambar asli
      canvas.width = img.width;
      canvas.height = img.height;

      // Gambar ulang ke canvas
      ctx.drawImage(img, 0, 0);

      // Konversi ke format target
      try {
        const dataUrl = canvas.toDataURL(targetFormat, 0.9); // Quality 0.9 buat JPG/WEBP
        setConvertedUrl(dataUrl);
      } catch (err) {
        setError('Gagal mengonversi gambar.');
      } finally {
        setLoading(false);
      }
    };

    img.onerror = () => {
      setError('Gagal memuat gambar untuk konversi.');
      setLoading(false);
    };
  };

  const downloadImage = () => {
    if (!convertedUrl) return;
    const extension = targetFormat.split('/')[1];
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = `kytools-converted-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 transition-all">
        
        {/* Header */}
        <div className="flex items-center gap-5 mb-10 pb-6 border-b border-gray-100">
          <div className="p-4 bg-teal-50 rounded-2xl text-teal-600 shadow-inner">
            <FileImage size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">Image Format Converter</h1>
            <p className="text-slate-400 text-sm">Ubah format JPG, PNG, WEBP secara instan di browser.</p>
          </div>
        </div>

        {/* Upload Area */}
        {!previewUrl && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-4 border-dashed border-gray-100 rounded-3xl p-12 text-center cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all group mb-8"
          >
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-6 group-hover:text-blue-400 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">Pilih atau Seret Gambar</h3>
            <p className="text-slate-400 text-sm mb-6">Mendukung format PNG, JPG, atau WEBP.</p>
            <button className="bg-slate-900 text-white text-xs font-black px-6 py-3 rounded-full hover:bg-blue-600 transition-colors uppercase tracking-widest shadow-lg shadow-gray-200">
              Pilih File
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm mb-8 font-medium">
            <AlertTriangle size={18} />
            {error}
          </div>
        )}

        {/* Preview & Controls */}
        {previewUrl && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input Preview */}
            <div className="p-4 bg-gray-50/50 rounded-3xl border border-gray-100">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Sumber:</label>
              <img src={previewUrl} alt="Original" className="w-full h-auto max-h-60 object-contain rounded-2xl mb-4 shadow-inner bg-white p-2" />
              <div className="text-xs text-slate-500 font-medium">
                Nama: <span className="text-slate-700">{file?.name}</span> <br/>
                Tipe: <span className="text-slate-700 uppercase">{file?.type.split('/')[1]}</span>
              </div>
            </div>

            {/* Controls & Output */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Ubah Ke Format:</label>
                <div className="grid grid-cols-3 gap-3">
                  {['image/jpeg', 'image/png', 'image/webp'].map(format => (
                    <button 
                      key={format}
                      onClick={() => setTargetFormat(format)}
                      className={`py-3 rounded-xl text-sm font-bold border transition-all uppercase tracking-wider ${targetFormat === format ? 'bg-teal-600 text-white border-teal-700 shadow-lg shadow-teal-100' : 'bg-white text-slate-600 hover:bg-gray-50 border-gray-100'}`}
                    >
                      {format.split('/')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {!convertedUrl ? (
                <button 
                  onClick={convertImage} 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-60 active:scale-95 shadow-xl shadow-gray-200"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <FileImage size={20} />
                  )}
                  {loading ? 'Mengonversi...' : 'Mulai Konversi'}
                </button>
              ) : (
                <div className="p-4 bg-gray-50/50 rounded-3xl border border-gray-100 animate-fadeIn">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Hasil:</label>
                    <img src={convertedUrl} alt="Converted" className="w-full h-auto max-h-60 object-contain rounded-2xl mb-4 shadow-inner bg-white p-2" />
                    <button 
                        onClick={downloadImage}
                        className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-teal-100"
                    >
                        <Download size={20} />
                        Unduh Gambar ({targetFormat.split('/')[1].toUpperCase()})
                    </button>
                </div>
              )}
               <button onClick={() => { setFile(null); setPreviewUrl(null); setConvertedUrl(null); }} className="w-full text-xs font-bold text-slate-400 hover:text-red-500 transition-colors pt-2">
                    Reset & Pilih Gambar Lain
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
