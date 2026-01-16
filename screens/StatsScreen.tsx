
import React from 'react';
import { AppScreen, UserProfile } from '../types';

interface StatsScreenProps {
  profile: UserProfile;
  onNavigate: (screen: AppScreen) => void;
  t: (key: any) => string;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ profile, onNavigate, t }) => {
  const weeklyData = [
    { day: 'Mon', kcal: 1850 },
    { day: 'Tue', kcal: 2100 },
    { day: 'Wed', kcal: 1950 },
    { day: 'Thu', kcal: 2300 },
    { day: 'Fri', kcal: 1750 },
    { day: 'Sat', kcal: 2050 },
    { day: 'Sun', kcal: 1800 },
  ];

  const maxKcal = Math.max(...weeklyData.map(d => d.kcal));

  return (
    <div className="flex-1 flex flex-col bg-background-light overflow-y-auto hide-scrollbar pb-32">
      <div className="flex items-center p-6 pb-2 justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
        <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="flex size-10 items-center justify-center rounded-full bg-soft-gray">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-[#121712] text-lg font-bold">{t('stats')}</h2>
        <div className="size-10"></div>
      </div>

      <div className="px-6 py-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-soft-gray">
          <h3 className="text-sm font-bold text-[#121712] mb-6 uppercase tracking-wider">Weekly Calorie Intake</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t-lg bg-primary/20 relative group transition-all hover:bg-primary"
                  style={{ height: `${(data.kcal / maxKcal) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#121712] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.kcal}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#648264]">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-accent-cream p-5 rounded-2xl border border-primary/10">
            <span className="material-symbols-outlined text-primary mb-2">trending_up</span>
            <p className="text-2xl font-bold">1,980</p>
            <p className="text-[10px] font-bold text-[#648264] uppercase">Average Kcal</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-soft-gray shadow-sm">
            <span className="material-symbols-outlined text-primary mb-2">check_circle</span>
            <p className="text-2xl font-bold">85%</p>
            <p className="text-[10px] font-bold text-[#648264] uppercase">Goal Completion</p>
          </div>
        </div>

        <div className="bg-[#121712] p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest">Nutrition Insights</h3>
            <span className="text-[10px] font-bold text-primary">Last 7 Days</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Your protein intake is 15% higher than last week. Great job! Consider increasing fiber for better digestion.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-primary/10 px-6 py-4 flex items-center justify-between z-50">
        <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">{t('home')}</span>
        </button>
        <button onClick={() => onNavigate(AppScreen.EXPLORE)} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold">{t('explore')}</span>
        </button>
        <div className="relative -top-8">
          <button onClick={() => onNavigate(AppScreen.CAMERA)} className="bg-primary text-white size-16 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[32px]">photo_camera</span>
          </button>
        </div>
        <button onClick={() => onNavigate(AppScreen.STATS)} className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
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

export default StatsScreen;
