"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDownload, faArrowLeft, faCircleNotch,
  faExclamationTriangle, faSkullCrossbones, faUserCircle, 
  faHashtag, faVideo, faMusic, faCheckCircle,
  faClock, faSpinner, faLink, faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { 
  faTiktok, faInstagram, faYoutube, faFacebook, 
  faSpotify, faPinterest, faGithub 
} from "@fortawesome/free-brands-svg-icons";

interface Platform {
  id: string;
  name: string;
  icon: any;
  color: string;
  isError: boolean;
  description?: string;
}

interface DownloadResult {
  title: string;
  play: string;
  music: string;
  author: string;
  uniqueId: string;
  cover: string;
  duration?: number;
  likes?: number;
  comments?: number;
  shares?: number;
}

const platforms: Platform[] = [
  { id: 'tiktok', name: 'TikTok', icon: faTiktok, color: 'from-black to-gray-800', isError: false, description: 'Video & Audio' },
  { id: 'mediafire', name: 'MediaFire', icon: faDownload, color: 'from-blue-500 to-blue-600', isError: true, description: 'Coming Soon' },
  { id: 'instagram', name: 'Instagram', icon: faInstagram, color: 'from-purple-500 via-pink-500 to-yellow-500', isError: true, description: 'Maintenance' },
  { id: 'youtube', name: 'YouTube', icon: faYoutube, color: 'from-red-500 to-red-600', isError: true, description: 'Maintenance' },
  { id: 'facebook', name: 'Facebook', icon: faFacebook, color: 'from-blue-600 to-blue-700', isError: true, description: 'Maintenance' },
  { id: 'spotify', name: 'Spotify', icon: faSpotify, color: 'from-green-500 to-green-600', isError: true, description: 'Coming Soon' },
  { id: 'pinterest', name: 'Pinterest', icon: faPinterest, color: 'from-red-500 to-red-600', isError: true, description: 'Coming Soon' },
  { id: 'github', name: 'GitHub', icon: faGithub, color: 'from-slate-700 to-slate-800', isError: true, description: 'Coming Soon' },
];

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
  const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video');
  const [error, setError] = useState<string | null>(null);

  const downloadLangsung = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.body.appendChild(document.createElement("a"));
      link.href = blobUrl;
      link.download = fileName;
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(fileUrl, "_blank");
    }
  };

  const handleDownload = useCallback(async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (data.data) {
        const raw = data.data;
        const mappedData: DownloadResult = { 
          title: raw.title || "No Description", 
          play: raw.play, 
          music: raw.music,
          author: raw.author?.nickname || "Unknown",
          uniqueId: raw.author?.unique_id || "user",
          cover: raw.cover,
          duration: raw.duration,
          likes: raw.digg_count,
          comments: raw.comment_count,
          shares: raw.share_count
        };
        setResult(mappedData);
        
        // Auto download berdasarkan pilihan
        if (downloadType === 'video') {
          downloadLangsung(mappedData.play, `KyDL_${mappedData.uniqueId}.mp4`);
        } else {
          downloadLangsung(mappedData.music, `KyDL_${mappedData.uniqueId}.mp3`);
        }
      } else {
        setError("Failed to fetch data. Please check the URL and try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [url, downloadType]);

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8 relative z-10">
        
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm mb-8"
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{width: '14px'}} />
          Back to Dashboard
        </Link>

        {/* Maintenance Banner */}
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-amber-600" style={{width: '18px'}} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-amber-800 mb-1">Service Notice</h4>
            <p className="text-xs text-amber-700">
              Multiple platforms are currently under maintenance. TikTok downloader is fully operational.
              We're working to restore all services as quickly as possible.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-semibold mb-4">
            <FontAwesomeIcon icon={faDownload} style={{width: '12px'}} />
            Media Downloader
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-4">
            Ky<span className="text-indigo-600">DL</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Download videos and audio from your favorite platforms instantly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8">
            
            {/* Platform Grid */}
            <div className="mb-8">
              <label className="block text-xs font-semibold text-slate-700 mb-3">Select Platform</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedPlatform(p.id); setResult(null); setError(null); }}
                    className={`relative group p-4 rounded-xl border transition-all ${
                      selectedPlatform === p.id 
                        ? `bg-gradient-to-r ${p.color} border-transparent shadow-lg scale-[1.02]` 
                        : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${
                      selectedPlatform === p.id ? 'text-white' : 'text-slate-600'
                    }`}>
                      <FontAwesomeIcon icon={p.icon} style={{width: '20px'}} />
                      <span className="font-semibold text-sm">{p.name}</span>
                    </div>
                    <p className={`text-[10px] mt-1 ${
                      selectedPlatform === p.id ? 'text-white/80' : 'text-slate-400'
                    }`}>
                      {p.description}
                    </p>
                    {p.isError && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                        OFF
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* URL Input */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                {selectedPlatform === 'tiktok' ? 'TikTok Video URL' : 'Media URL'}
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faLink} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" 
                  style={{width: '16px'}}
                />
                <input 
                  type="text" 
                  placeholder={`https://www.${selectedPlatform}.com/...`}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all font-medium"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
                />
              </div>
              {selectedPlatform !== 'tiktok' && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <FontAwesomeIcon icon={faInfoCircle} style={{width: '10px'}} />
                  Currently only TikTok is fully operational
                </p>
              )}
            </div>

            {/* Download Type Toggle (for TikTok) */}
            {selectedPlatform === 'tiktok' && (
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Download Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDownloadType('video')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      downloadType === 'video'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faVideo} style={{width: '14px'}} />
                    Video (No Watermark)
                  </button>
                  <button
                    onClick={() => setDownloadType('audio')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      downloadType === 'audio'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faMusic} style={{width: '14px'}} />
                    Audio Only
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mt-0.5" style={{width: '16px'}} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            )}

            {/* Download Button */}
            <button 
              onClick={handleDownload}
              disabled={loading || !url || (selectedPlatform !== 'tiktok')}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all ${
                loading || !url || (selectedPlatform !== 'tiktok')
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-lg shadow-indigo-200'
              }`}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin style={{width: '18px'}} />
                  Processing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} style={{width: '18px'}} />
                  {selectedPlatform === 'tiktok' ? 'Download Content' : 'Coming Soon'}
                </>
              )}
            </button>

            {/* Result Section */}
            {result && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Download Ready</h3>
                  
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="flex gap-5">
                      <img 
                        src={result.cover} 
                        className="w-24 h-24 rounded-xl object-cover shadow-md flex-shrink-0" 
                        alt="Thumbnail"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <FontAwesomeIcon icon={faUserCircle} className="text-indigo-500" style={{width: '14px'}} />
                          <span className="text-xs font-medium text-slate-600">
                            {result.author} (@{result.uniqueId})
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 line-clamp-2 mb-3">
                          {result.title}
                        </p>
                        <div className="flex gap-4 text-xs text-slate-400">
                          {result.likes !== undefined && (
                            <span>❤️ {formatNumber(result.likes)}</span>
                          )}
                          {result.comments !== undefined && (
                            <span>💬 {formatNumber(result.comments)}</span>
                          )}
                          {result.shares !== undefined && (
                            <span>🔄 {formatNumber(result.shares)}</span>
                          )}
                          {result.duration !== undefined && (
                            <span>⏱️ {Math.floor(result.duration / 60)}:{(result.duration % 60).toString().padStart(2, '0')}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <button 
                        onClick={() => downloadLangsung(result.play, `KyDL_${result.uniqueId}.mp4`)} 
                        className="bg-indigo-600 text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                      >
                        <FontAwesomeIcon icon={faVideo} style={{width: '14px'}} />
                        Download Video
                      </button>
                      <button 
                        onClick={() => downloadLangsung(result.music, `KyDL_${result.uniqueId}.mp3`)} 
                        className="bg-slate-200 text-slate-700 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-300 transition-all"
                      >
                        <FontAwesomeIcon icon={faMusic} style={{width: '14px'}} />
                        Download Audio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faVideo} className="text-indigo-600" style={{width: '16px'}} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">No Watermark</p>
              <p className="text-[10px] text-slate-400">Clean video downloads</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faMusic} className="text-indigo-600" style={{width: '16px'}} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Audio Extraction</p>
              <p className="text-[10px] text-slate-400">MP3 format available</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600" style={{width: '16px'}} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Fast & Free</p>
              <p className="text-[10px] text-slate-400">No registration required</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-[10px] text-slate-400">
            © {new Date().getFullYear()} KyTools. All rights reserved. | Built by Fadhillah Dzaki Nasrullah
          </p>
        </footer>
      </div>
    </div>
  );
}