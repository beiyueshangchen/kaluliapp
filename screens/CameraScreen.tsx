
import React, { useRef, useState, useEffect } from 'react';
import { AppScreen, Meal } from '../types';
import { analyzeFoodImage } from '../services/gemini';

interface CameraScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onResult: (result: Partial<Meal>) => void;
  t: (key: any) => string;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onNavigate, onResult, t }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access camera. Please check permissions.");
      }
    }
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

    setIsAnalyzing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      
      try {
        const result = await analyzeFoodImage(base64);
        onResult({ ...result, imageUrl: canvas.toDataURL('image/jpeg') });
      } catch (err) {
        console.error("Analysis failed:", err);
        setError("Could not analyze image. Please try again.");
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden select-none">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      
      <canvas ref={canvasRef} className="hidden" />

      {/* Top UI */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-14 pb-4">
        <button 
          onClick={() => onNavigate(AppScreen.DASHBOARD)}
          className="flex size-12 items-center justify-center rounded-full glass-ui text-white"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="px-5 py-2 rounded-full glass-ui border border-white/20">
          <span className="text-white text-sm font-bold tracking-wide uppercase">AI SCANNING</span>
        </div>
        <button className="flex size-12 items-center justify-center rounded-full glass-ui text-white">
          <span className="material-symbols-outlined text-[24px]">photo_library</span>
        </button>
      </div>

      {/* Hint */}
      <div className="relative z-20 flex justify-center mt-4">
        <div className="bg-white/90 px-4 py-2 rounded-xl shadow-lg border border-primary/20">
          <h4 className="text-[#648264] text-sm font-bold text-center">
            {t('pointAtMeal')}
          </h4>
        </div>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 flex items-center justify-center relative pointer-events-none">
        <div className="size-64 border-2 border-white/80 rounded-xl relative shadow-[0_0_20px_rgba(178,215,178,0.3)]">
          <div className="absolute -top-1 -left-1 size-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
          <div className="absolute -top-1 -right-1 size-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
          <div className="absolute -bottom-1 -left-1 size-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
          <div className="absolute -bottom-1 -right-1 size-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
          
          {isAnalyzing && (
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-accent-cream/95 px-4 py-1.5 rounded-full shadow-sm border border-primary/30 flex items-center gap-2 whitespace-nowrap">
              <span className="size-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[#121712] text-xs font-bold uppercase tracking-wider">{t('analyzing')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Shutter */}
      <div className="relative z-20 pb-12 flex flex-col items-center gap-8">
        {error && <p className="text-red-400 text-sm font-bold px-4 text-center">{error}</p>}
        <div className="flex items-center justify-center gap-10">
          <button className="flex size-12 items-center justify-center rounded-full glass-ui text-white">
            <span className="material-symbols-outlined text-[24px]">filter_center_focus</span>
          </button>
          <div className="border-4 border-white/30 rounded-full p-1.5">
            <button 
              onClick={captureAndAnalyze}
              disabled={isAnalyzing}
              className={`flex size-20 items-center justify-center rounded-full transition-transform active:scale-95 ${isAnalyzing ? 'bg-gray-400' : 'bg-primary'} text-background-dark shadow-xl`}
            >
              <span className="material-symbols-outlined text-[40px] font-bold">camera_alt</span>
            </button>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full glass-ui text-white">
            <div className="size-8 rounded-lg overflow-hidden border border-white/40">
              <img src="https://picsum.photos/100/100?random=10" className="h-full w-full object-cover" alt="History" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Nav Spacer */}
      <nav className="relative z-30 pb-6 pt-3 px-8 glass-ui border-t border-white/10 flex items-center justify-between">
        <span className="material-symbols-outlined text-[28px] text-white/60">home</span>
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-[32px] fill-1">photo_camera</span>
          <div className="size-1 bg-primary rounded-full"></div>
        </div>
        <span className="material-symbols-outlined text-[28px] text-white/60">bar_chart</span>
        <span className="material-symbols-outlined text-[28px] text-white/60">person</span>
      </nav>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
    </div>
  );
};

export default CameraScreen;
