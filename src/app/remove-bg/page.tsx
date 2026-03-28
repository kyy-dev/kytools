"use client";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Upload, Scissors, Download, Loader2, 
  ImageIcon, Sparkles, X, CheckCircle2, AlertCircle,
  Zap, Camera, RefreshCw, Eye, Layers, Lock
} from "lucide-react";

export default function RemoveBgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
      return;
    }
    
    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Ukuran file terlalu besar. Maksimal 10MB.");
      return;
    }
    
    setError(null);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const clear = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result);
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processImage = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/remove-bg", { method: "POST", body: formData });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal memproses gambar");
      }
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan pada server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold mb-3">
                  <Sparkles size={12} />
                  AI Powered
                </div>
                <h1 className="text-3xl font-bold text-white">Remove Background</h1>
                <p className="text-indigo-100 text-sm mt-1">AI-powered background removal in seconds</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Scissors size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            
            {/* Upload Area */}
            {!preview ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center w-full h-96 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                  dragActive 
                    ? "border-indigo-500 bg-indigo-50/50" 
                    : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={onFileChange}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                />
                
                <div className="text-center p-8">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all ${
                    dragActive ? "bg-indigo-100 text-indigo-600 scale-110" : "bg-slate-100 text-slate-400"
                  }`}>
                    {dragActive ? <Upload size={32} /> : <Camera size={32} />}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {dragActive ? "Drop your image here" : "Upload an image"}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Drag and drop or click to browse
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-400">
                    <span className="px-2 py-1 bg-slate-100 rounded-md">JPG</span>
                    <span className="px-2 py-1 bg-slate-100 rounded-md">PNG</span>
                    <span className="px-2 py-1 bg-slate-100 rounded-md">WEBP</span>
                    <span className="px-2 py-1 bg-slate-100 rounded-md">Max 10MB</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Image Preview Section */}
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Original Image */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-slate-400" />
                        <h3 className="text-sm font-semibold text-slate-900">Original Image</h3>
                      </div>
                      <button
                        onClick={clear}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square">
                      <img
                        src={preview}
                        alt="Original"
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <p className="text-xs text-slate-400 text-center">
                      {(file!.size / 1024 / 1024).toFixed(2)} MB • {file!.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>

                  {/* Result Image */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers size={16} className="text-indigo-500" />
                        <h3 className="text-sm font-semibold text-slate-900">Result</h3>
                      </div>
                      {result && (
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Ready
                        </span>
                      )}
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square">
                      {loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                          <Loader2 size={40} className="animate-spin text-indigo-600 mb-3" />
                          <p className="text-xs font-medium text-slate-500">Processing image...</p>
                          <p className="text-[10px] text-slate-400 mt-1">This may take a few seconds</p>
                        </div>
                      ) : result ? (
                        <img
                          src={result}
                          alt="Result"
                          className="w-full h-full object-contain p-4"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Scissors size={32} className="text-slate-300 mb-3" />
                          <p className="text-sm text-slate-400">Click process to remove background</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Error</p>
                      <p className="text-xs text-red-600 mt-0.5">{error}</p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="ml-auto text-red-400 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  {!result ? (
                    <button
                      onClick={processImage}
                      disabled={loading}
                      className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap size={18} />
                          Remove Background
                        </>
                      )}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={clear}
                        className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={18} />
                        New Image
                      </button>
                      <a
                        href={result}
                        download="kytools-bg-removed.png"
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={18} />
                        Download Result
                      </a>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Features Section */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap size={14} className="text-indigo-600" />
                  </div>
                  <p className="text-[10px] font-semibold text-slate-600">Fast Processing</p>
                  <p className="text-[9px] text-slate-400">Seconds to finish</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ImageIcon size={14} className="text-indigo-600" />
                  </div>
                  <p className="text-[10px] font-semibold text-slate-600">High Quality</p>
                  <p className="text-[9px] text-slate-400">Preserve details</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Lock size={14} className="text-indigo-600" />
                  </div>
                  <p className="text-[10px] font-semibold text-slate-600">Privacy First</p>
                  <p className="text-[9px] text-slate-400">No storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-[10px] text-slate-400">
            © {new Date().getFullYear()} KyTools. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}