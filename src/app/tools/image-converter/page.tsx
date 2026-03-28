"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { 
  ImageIcon, Download, FileImage, AlertTriangle, Loader2,
  ArrowLeft, Sparkles, Zap, CheckCircle2, RefreshCw,
  ArrowRight, Layers, Settings, Info, FileCheck
} from 'lucide-react';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

interface FormatOption {
  value: string;
  label: string;
  extension: string;
  description: string;
}

const formats: FormatOption[] = [
  { value: 'image/jpeg', label: 'JPEG', extension: 'jpg', description: 'Best for photos, small file size' },
  { value: 'image/png', label: 'PNG', extension: 'png', description: 'Best for graphics, lossless quality' },
  { value: 'image/webp', label: 'WEBP', extension: 'webp', description: 'Modern format, best compression' }
];

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('image/jpeg');
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quality, setQuality] = useState(0.9);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      setFileSize(file.size);
    }
  }, [file]);

  const handleFileChange = useCallback((selectedFile: File) => {
    setError('');
    setConvertedUrl(null);
    
    if (!SUPPORTED_FORMATS.includes(selectedFile.type)) {
      setError('Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.');
      return;
    }

    setFile(selectedFile);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }, [previewUrl]);

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFileChange(selectedFile);
  };

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
    if (droppedFile) handleFileChange(droppedFile);
  }, [handleFileChange]);

  const convertImage = useCallback(() => {
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

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const dataUrl = canvas.toDataURL(targetFormat, quality);
        setConvertedUrl(dataUrl);
        
        // Calculate converted file size (approximate)
        const base64Length = dataUrl.split(',')[1]?.length || 0;
        const sizeInBytes = Math.ceil(base64Length * 0.75);
        setConvertedSize(sizeInBytes);
      } catch (err) {
        setError('Gagal mengonversi gambar. Format tidak didukung.');
      } finally {
        setLoading(false);
      }
    };

    img.onerror = () => {
      setError('Gagal memuat gambar untuk konversi.');
      setLoading(false);
    };
  }, [file, previewUrl, targetFormat, quality]);

  const downloadImage = useCallback(() => {
    if (!convertedUrl) return;
    const format = formats.find(f => f.value === targetFormat);
    const extension = format?.extension || 'jpg';
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = `kytools-converted-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [convertedUrl, targetFormat]);

  const resetAll = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    setFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setError('');
    setFileSize(null);
    setConvertedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [previewUrl, convertedUrl]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSizeReduction = () => {
    if (fileSize && convertedSize) {
      const reduction = ((fileSize - convertedSize) / fileSize) * 100;
      return reduction.toFixed(1);
    }
    return null;
  };

  const selectedFormat = formats.find(f => f.value === targetFormat);

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
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold mb-3">
                  <Sparkles size={12} />
                  Image Converter
                </div>
                <h1 className="text-3xl font-bold text-white">Format Converter</h1>
                <p className="text-teal-100 text-sm mt-1">Convert images between JPG, PNG, and WEBP formats</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileImage size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            
            {/* Upload Area */}
            {!previewUrl ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center w-full h-96 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                  dragActive 
                    ? "border-teal-500 bg-teal-50/50" 
                    : "border-slate-200 bg-slate-50/50 hover:border-teal-300 hover:bg-teal-50/30"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={onFileSelect}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                />
                
                <div className="text-center p-8">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all ${
                    dragActive ? "bg-teal-100 text-teal-600 scale-110" : "bg-slate-100 text-slate-400"
                  }`}>
                    {dragActive ? <ImageIcon size={32} /> : <FileImage size={32} />}
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
              <div className="space-y-6">
                {/* Preview & Controls */}
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Original Image */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={16} className="text-slate-400" />
                      <h3 className="text-sm font-semibold text-slate-900">Original Image</h3>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-4">
                      <img
                        src={previewUrl}
                        alt="Original"
                        className="w-full h-auto max-h-64 object-contain"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>File: {file?.name}</span>
                      <span>Size: {fileSize ? formatFileSize(fileSize) : 'N/A'}</span>
                      <span>Format: {file?.type.split('/')[1].toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Output Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileCheck size={16} className="text-teal-500" />
                      <h3 className="text-sm font-semibold text-slate-900">Converted Image</h3>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-4 min-h-[200px] flex items-center justify-center">
                      {loading ? (
                        <div className="flex flex-col items-center">
                          <Loader2 size={32} className="animate-spin text-teal-600 mb-2" />
                          <p className="text-xs text-slate-500">Converting...</p>
                        </div>
                      ) : convertedUrl ? (
                        <img
                          src={convertedUrl}
                          alt="Converted"
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <Layers size={32} className="mx-auto text-slate-300 mb-2" />
                          <p className="text-xs text-slate-400">Click convert to see result</p>
                        </div>
                      )}
                    </div>
                    {convertedUrl && convertedSize && (
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Ready to download
                        </span>
                        <span className="text-slate-500">
                          Size: {formatFileSize(convertedSize)}
                          {getSizeReduction() && (
                            <span className="ml-1 text-emerald-600">
                              (-{getSizeReduction()}%)
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">Error</p>
                      <p className="text-xs text-red-600">{error}</p>
                    </div>
                    <button
                      onClick={() => setError('')}
                      className="text-red-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* Format Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-3">
                    Output Format
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {formats.map(format => (
                      <button
                        key={format.value}
                        onClick={() => setTargetFormat(format.value)}
                        className={`group p-4 rounded-xl border transition-all text-left ${
                          targetFormat === format.value
                            ? 'bg-teal-50 border-teal-300 ring-2 ring-teal-200'
                            : 'bg-white border-slate-200 hover:border-teal-200 hover:bg-teal-50/30'
                        }`}
                      >
                        <p className={`font-semibold text-sm ${
                          targetFormat === format.value ? 'text-teal-700' : 'text-slate-700'
                        }`}>
                          {format.label}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {format.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Slider (for JPEG/WEBP) */}
                {(targetFormat === 'image/jpeg' || targetFormat === 'image/webp') && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700">
                        Quality
                      </label>
                      <span className="text-xs text-slate-500">{Math.round(quality * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.01"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Higher quality = larger file size
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!convertedUrl ? (
                    <button
                      onClick={convertImage}
                      disabled={loading}
                      className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <Zap size={18} />
                          Convert Image
                        </>
                      )}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={downloadImage}
                        className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={18} />
                        Download {selectedFormat?.label}
                      </button>
                      <button
                        onClick={resetAll}
                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center gap-2"
                      >
                        <RefreshCw size={18} />
                        New Image
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-teal-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Fast Processing</p>
              <p className="text-[10px] text-slate-400">Client-side conversion</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Settings size={16} className="text-teal-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Adjustable Quality</p>
              <p className="text-[10px] text-slate-400">Control file size vs quality</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Info size={16} className="text-teal-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Privacy First</p>
              <p className="text-[10px] text-slate-400">No upload, all local</p>
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