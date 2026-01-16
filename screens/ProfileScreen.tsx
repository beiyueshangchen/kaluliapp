
import React from 'react';
import { UserProfile, AppScreen, Language } from '../types';

interface ProfileScreenProps {
  profile: UserProfile;
  onNavigate: (screen: AppScreen) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: any) => string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, onNavigate, language, setLanguage, t }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-light overflow-y-auto hide-scrollbar pb-24">
      <div className="flex items-center p-6 pb-2 justify-between sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>
        <h2 className="text-[#121712] text-lg font-bold">{t('personalCenter')}</h2>
        <div className="size-10"></div>
      </div>

      <div className="flex p-6 flex-col items-center gap-4">
        <div className="relative">
          <div className="rounded-full h-28 w-28 border-4 border-primary/20 p-1">
            <img src="https://picsum.photos/200/200?random=1" className="size-full rounded-full object-cover" alt="Profile" />
          </div>
          <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-4 border-white">
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#121712] text-2xl font-bold">{profile.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="material-symbols-outlined text-[16px] text-primary">eco</span>
            <p className="text-[#648264] text-sm font-medium">Healthy Eating Enthusiast</p>
          </div>
        </div>
      </div>

      {/* Language Settings Section */}
      <div className="px-6 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-primary/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">translate</span>
              <span className="text-sm font-bold text-[#121712]">{t('language')}</span>
            </div>
          </div>
          <div className="flex bg-soft-gray p-1 rounded-xl">
            <button 
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${language === 'en' ? 'bg-primary text-white shadow-md' : 'text-[#648264]'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('zh')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${language === 'zh' ? 'bg-primary text-white shadow-md' : 'text-[#648264]'}`}
            >
              简体中文
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <h3 className="text-[#121712] text-lg font-bold mb-4">{t('goalTracker')}</h3>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/10">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['S','M','T','W','T','F','S'].map(d => (
              <p key={d} className="text-[#648264] text-[11px] font-bold text-center">{d}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className={`text-sm font-medium h-8 w-8 flex items-center justify-center rounded-full ${day === 5 ? 'bg-primary/20 text-primary font-bold' : ''}`}>
                  {day}
                </span>
                <div className={`size-1.5 rounded-full ${day <= 5 ? 'bg-primary' : 'bg-accent-cream'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        {[
          { icon: 'local_fire_department', val: '1,850', label: t('avgCalories') },
          { icon: 'bolt', val: '12', label: t('streak') },
          { icon: 'photo_camera', val: '342', label: t('totalScans') },
          { icon: 'nutrition', val: '82%', label: t('healthScore') },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-1">
            <span className="material-symbols-outlined text-primary mb-1">{stat.icon}</span>
            <p className="text-2xl font-bold">{stat.val}</p>
            <p className="text-xs font-medium text-[#648264] uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-primary/10 px-6 py-4 flex items-center justify-between z-50">
        <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-bold">{t('home')}</span>
        </button>
        <button onClick={() => onNavigate(AppScreen.EXPLORE)} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold">{t('explore')}</span>
        </button>
        <div className="relative -top-8">
          <button onClick={() => onNavigate(AppScreen.CAMERA)} className="bg-primary text-white size-16 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">photo_camera</span>
          </button>
        </div>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">bar_chart</span>
          <span className="text-[10px] font-bold">{t('stats')}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">{t('profile')}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
