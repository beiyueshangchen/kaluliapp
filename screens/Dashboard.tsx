
import React from 'react';
import { Meal, UserProfile, AppScreen, Language } from '../types';

interface DashboardProps {
  profile: UserProfile;
  meals: Meal[];
  onNavigate: (screen: AppScreen) => void;
  onAddWater: (amount: number) => void;
  t: (key: any) => string;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, meals, onNavigate, onAddWater, t, language }) => {
  const remaining = profile.dailyGoal - profile.consumed;
  const consumedPercent = (profile.consumed / profile.dailyGoal) * 100;
  const waterPercent = (profile.waterIntake / profile.waterGoal) * 100;

  const dateLocale = language === 'zh' ? 'zh-CN' : 'en-US';
  const displayDate = new Date().toLocaleDateString(dateLocale, { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex-1 flex flex-col bg-background-light overflow-y-auto hide-scrollbar pb-32">
      <div className="flex items-center p-6 pb-2 justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
        <div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary/20">
          <img src="https://picsum.photos/100/100?random=1" className="size-full object-cover" alt="User" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-[#121712] text-lg font-bold leading-tight tracking-tight">{t('greeting')}, Alex</h2>
          <p className="text-[#648264] text-xs font-medium">{displayDate}</p>
        </div>
        <button className="flex items-center justify-center rounded-full size-10 bg-soft-gray relative">
          <span className="material-symbols-outlined text-[#121712]" style={{ fontSize: '20px' }}>notifications</span>
        </button>
      </div>

      <div className="p-6 flex flex-col items-center justify-center relative">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div 
            className="absolute inset-0 calorie-ring opacity-90 transition-all duration-1000" 
            style={{ '--consumed-percent': `${consumedPercent}%` } as React.CSSProperties}
          ></div>
          <div className="absolute inset-4 bg-background-light rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-[#648264] text-sm font-medium uppercase tracking-widest text-[10px]">{t('remaining')}</span>
            <h1 className="text-[#121712] text-4xl font-extrabold tracking-tight">{remaining > 0 ? remaining.toLocaleString() : 0}</h1>
            <span className="text-[#121712] text-base font-semibold">kcal</span>
          </div>
        </div>

        <div className="mt-8 flex gap-8">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-primary"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#648264] font-bold">{t('consumed')}</span>
              <span className="text-sm font-bold">{profile.consumed} kcal</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-accent-cream border border-primary/20"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#648264] font-bold">{t('goal')}</span>
              <span className="text-sm font-bold">{profile.dailyGoal} kcal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative size-12 flex items-center justify-center">
              <svg className="size-full absolute inset-0" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#eef2ff" strokeWidth="4"></circle>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray={`${waterPercent} 100`} transform="rotate(-90 18 18)"></circle>
              </svg>
              <span className="material-symbols-outlined text-blue-500" style={{ fontSize: '20px' }}>water_drop</span>
            </div>
            <div>
              <h3 className="text-[#121712] text-sm font-bold">{t('hydration')}</h3>
              <p className="text-[#648264] text-xs font-medium">{profile.waterIntake} / {profile.waterGoal} ml</p>
            </div>
          </div>
          <button onClick={() => onAddWater(250)} className="bg-white size-10 rounded-xl flex items-center justify-center shadow-sm border border-blue-100 text-blue-600 active:scale-95">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6 py-4">
        {[
          { label: t('protein'), icon: 'egg_alt', current: profile.macros.protein, target: profile.macroGoals.protein },
          { label: t('carbs'), icon: 'bakery_dining', current: profile.macros.carbs, target: profile.macroGoals.carbs },
          { label: t('fat'), icon: 'opacity', current: profile.macros.fat, target: profile.macroGoals.fat },
        ].map((macro) => (
          <div key={macro.label} className="flex flex-col gap-2 rounded-xl bg-accent-cream p-4 border border-primary/10">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>{macro.icon}</span>
            <div className="flex flex-col">
              <h3 className="text-[#121712] text-xs font-bold">{macro.label}</h3>
              <p className="text-[#648264] text-[10px] font-medium">{macro.current}g/{macro.target}g</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-6 pt-4">
        <h2 className="text-[#121712] text-xl font-bold">{t('todaysMeals')}</h2>
        <button className="text-primary text-sm font-bold">{t('seeAll')}</button>
      </div>

      <div className="p-4 space-y-4">
        {meals.map((meal) => (
          <div key={meal.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-soft-gray">
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <p className="text-[#121712] text-base font-bold leading-tight">{meal.name}</p>
                <p className="text-[#648264] text-xs font-medium">{meal.time}</p>
              </div>
              <div className="inline-flex items-center justify-center rounded-lg h-7 px-3 bg-primary/20 text-[#121712] text-xs font-bold w-fit">
                {meal.calories} kcal
              </div>
            </div>
            <div 
              className="size-20 bg-center bg-no-repeat bg-cover rounded-xl shrink-0" 
              style={{ backgroundImage: `url(${meal.imageUrl || 'https://picsum.photos/200/200?random=' + meal.id})` }}
            ></div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-primary/10 px-6 py-4 flex items-center justify-between z-50">
        <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
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

export default Dashboard;
