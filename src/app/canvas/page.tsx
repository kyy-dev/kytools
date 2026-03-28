"use client";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ImageIcon, Loader2, Download, Upload, 
  Link as LinkIcon, Sparkles, Layers, Zap, 
  RefreshCw, AlertCircle, CheckCircle2, Eye,
  Wand2, Palette, Contrast, Invert, FileImage
} from "lucide-react";

export default function CanvasPage() {
  const [inputMode, setInputMode] = useState<'url' | 'upload'>('url');
  const [imgUrl, setImgUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<'affect' | 'invert' | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;
    return urlPattern.test(url);
  };

  const applyEffect = useCallback(async (type: 'affect' | 'invert') => {
    if (!imgUrl) {
      setError("Please enter an image URL or upload an image first");
      return;
    }

    if (!validateUrl(imgUrl)) {
      setError("Invalid image URL. Please enter a valid URL ending with .jpg, .png, .webp, etc.");
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedEffect(type);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const apiUrl = `https://api.siputzx.my.id/api/canvas/${type}?url=${encodeURIComponent(imgUrl)}`;
      setResult(apiUrl);
      setLoading(false);
    }, 800);
  }, [imgUrl]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(e.target.value);
    setResult(null);
    setError(null);
    setSelectedEffect(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please upload a valid image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size too large. Maximum 10MB");
        return;
      }
      
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      setImgUrl(localUrl);
      setResult(null);
      setError(null);
    }
  };

  const clearAll = () => {
    setImgUrl("");
    setResult(null);
    setError(null);
    setSelectedEffect(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const effects = [
    {
      id: 'affect' as const,
      name: 'Affect Effect',
      description: 'Dramatic color transformation',
      icon: <Palette size={20} />,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'invert' as const,
      name: 'Invert Effect',
      description: 'Negative color inversion',
      icon: <Contrast size={20} />,
      color: 'slate',
      gradient: 'from-slate-700 to-zinc-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        
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
                  Image Effects Studio
                </div>
                <h1 className="text-3xl font-bold text-white">Canvas Magic</h1>
                <p className="text-indigo-100 text-sm mt-1">Apply dramatic effects to your photos instantly</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Wand2 size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            
            {/* Input Mode Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
              <button 
                onClick={() => setInputMode('url')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all ${
                  inputMode === 'url' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LinkIcon size={16} />
                Image URL
              </button>
              <button 
                onClick={() => setInputMode('upload')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all ${
                  inputMode === 'upload' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Upload size={16} />
                Upload File
              </button>
            </div>

            {/* Input Area */}
            <div className="space-y-6 mb-8">
              {inputMode === 'url' ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Image URL
                  </label>
                  <div className="relative">
                    <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all text-slate-900 placeholder:text-slate-400"
                      value={imgUrl}
                      onChange={handleUrlChange}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Supported formats: JPG, PNG, WEBP, GIF
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Upload Image
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                    />
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-all">
                        <FileImage size={28} className="text-slate-400 group-hover:text-indigo-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                  {previewUrl && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg flex items-center gap-3">
                      <img src={previewUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-700">Image ready</p>
                        <p className="text-[10px] text-slate-400">Click effects to transform</p>
                      </div>
                      <button
                        onClick={clearAll}
                        className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <RefreshCw size={14} className="text-slate-400" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 flex-1">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Effects Buttons */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Choose Effect</p>
                <div className="grid grid-cols-2 gap-4">
                  {effects.map((effect) => (
                    <button
                      key={effect.id}
                      onClick={() => applyEffect(effect.id)}
                      disabled={loading || !imgUrl}
                      className={`group relative overflow-hidden rounded-xl transition-all ${
                        selectedEffect === effect.id && result
                          ? 'ring-2 ring-offset-2 ring-indigo-500'
                          : ''
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${effect.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <div className={`relative p-4 border rounded-xl transition-all ${
                        !imgUrl 
                          ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-50'
                          : 'bg-white border-slate-200 hover:border-transparent'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            effect.id === 'affect' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {effect.icon}
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-slate-900 text-sm">{effect.name}</p>
                            <p className="text-xs text-slate-400">{effect.description}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-xl">
                <Loader2 size={40} className="animate-spin text-indigo-600 mb-3" />
                <p className="text-sm font-medium text-slate-600">Processing image...</p>
                <p className="text-xs text-slate-400 mt-1">Applying {selectedEffect === 'affect' ? 'Affect' : 'Invert'} effect</p>
              </div>
            )}

            {/* Result Section */}
            {result && !loading && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye size={16} className="text-indigo-500" />
                    <h3 className="text-sm font-semibold text-slate-900">Result Preview</h3>
                    {selectedEffect && (
                      <span className="text-xs text-slate-400 ml-2">
                        Effect: {selectedEffect === 'affect' ? 'Affect' : 'Invert'}
                      </span>
                    )}
                  </div>
                  
                  {/* Image Result */}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-4 flex justify-center">
                    <img 
                      src={result} 
                      alt="Effect Result" 
                      className="rounded-lg shadow-lg max-w-full max-h-96 object-contain"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={result}
                      download="canvas-effect.png"
                      className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                    >
                      <Download size={18} />
                      Download Image
                    </a>
                    <button
                      onClick={clearAll}
                      className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                    >
                      <RefreshCw size={18} />
                      New Image
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!imgUrl && !result && !loading && (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
                <Layers size={48} className="mx-auto text-slate-300 mb-3" />
                <p className="text-sm text-slate-400">Enter an image URL or upload an image</p>
                <p className="text-xs text-slate-300 mt-1">Choose an effect to transform your image</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Instant Effects</p>
              <p className="text-[10px] text-slate-400">Apply in seconds</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Palette size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Multiple Effects</p>
              <p className="text-[10px] text-slate-400">Affect & Invert</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Download size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Free Download</p>
              <p className="text-[10px] text-slate-400">Save your creations</p>
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