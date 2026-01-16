
import React, { useState, useEffect } from 'react';
import { AppScreen } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ExploreScreenProps {
  onNavigate: (screen: AppScreen) => void;
  t: (key: any) => string;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigate, t }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [responseText, setResponseText] = useState("");
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setErrorMsg(null);
      },
      (err) => {
        console.debug("Location access denied or unavailable", err);
        setErrorMsg("Location access denied. You can still search by typing.");
      }
    );
  }, []);

  const searchPlaces = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setResponseText("");
    setResults([]);
    setErrorMsg(null);
    try {
      // Create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      // Use gemini-2.5-flash as it is mandatory for Google Maps grounding
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: query,
        config: {
          tools: [{ googleMaps: {} }, { googleSearch: {} }],
          toolConfig: {
            retrievalConfig: location ? {
              latLng: {
                latitude: location.lat,
                longitude: location.lng
              }
            } : undefined
          }
        },
      });

      // Extract generated text directly from property
      const text = response.text || "";
      setResponseText(text);

      // Extract URLs from groundingChunks for both Google Search and Google Maps
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedResults = chunks
        .map((c: any) => {
          if (c.maps) return { ...c.maps, type: 'maps' };
          if (c.web) return { ...c.web, type: 'web' };
          return null;
        })
        .filter(Boolean);
      
      setResults(extractedResults);
      if (extractedResults.length === 0 && !text) {
        setResponseText("No relevant places or search results found.");
      }
    } catch (err) {
      console.error("Explore search failed:", err);
      setErrorMsg("Failed to search. Please check your connection or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light overflow-y-auto hide-scrollbar pb-32">
      <div className="flex items-center p-6 pb-2 justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
        <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="flex size-10 items-center justify-center rounded-full bg-soft-gray">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-[#121712] text-lg font-bold">{t('healthyPlaces')}</h2>
        <div className="size-10"></div>
      </div>

      <div className="px-6 py-4 space-y-4">
        <div className="relative group">
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')} 
            className="w-full h-14 bg-accent-cream border-none rounded-2xl px-12 text-sm font-medium focus:ring-2 focus:ring-primary/20"
            onKeyDown={(e) => e.key === 'Enter' && searchPlaces((e.target as HTMLInputElement).value)}
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#648264]">search</span>
        </div>

        {errorMsg && (
          <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 text-[18px]">info</span>
            <p className="text-[11px] font-bold text-amber-800">{errorMsg}</p>
          </div>
        )}

        {loading && (
          <div className="py-20 flex flex-col items-center gap-4">
            <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Searching...</p>
          </div>
        )}

        {responseText && (
          <div className="bg-white rounded-2xl p-5 border border-soft-gray shadow-sm">
            <p className="text-sm leading-relaxed text-[#121712] whitespace-pre-wrap">{responseText}</p>
          </div>
        )}

        <div className="grid gap-4">
          {results.map((item, idx) => (
            <a key={idx} href={item.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-soft-gray shadow-sm hover:border-primary/30 transition-all">
              <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">
                  {item.type === 'maps' ? 'location_on' : 'language'}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold truncate max-w-[200px]">{item.title || (item.type === 'maps' ? "Health Spot" : "Web Resource")}</h4>
                <p className="text-[10px] text-[#648264] uppercase font-bold mt-0.5">
                  {item.type === 'maps' ? 'View on Maps' : 'Visit Website'}
                </p>
              </div>
              <span className="material-symbols-outlined text-gray-300">open_in_new</span>
            </a>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-primary/10 px-6 py-4 flex items-center justify-between z-50">
        <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">{t('home')}</span>
        </button>
        <button onClick={() => onNavigate(AppScreen.EXPLORE)} className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="text-[10px] font-bold">{t('explore')}</span>
        </button>
        <div className="relative -top-8">
          <button onClick={() => onNavigate(AppScreen.CAMERA)} className="bg-primary text-white size-16 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[32px]">photo_camera</span>
          </button>
        </div>
        <button onClick={() => onNavigate(AppScreen.STATS)} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-[10px] font-bold">{t('stats')}</span>
        </button>
        <button onClick={() => onNavigate(AppScreen.PROFILE)} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">{t('profile')}</span>
        </button>
      </div>
    </div>
  );
};

export default ExploreScreen;
