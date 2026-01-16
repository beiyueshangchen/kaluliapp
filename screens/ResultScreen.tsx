
import React, { useState } from 'react';
import { Meal, AppScreen } from '../types';

interface ResultScreenProps {
  meal: Partial<Meal>;
  onAdd: (meal: Meal) => void;
  onBack: () => void;
  // Fix: Added missing 't' prop for localization
  t: (key: any) => string;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ meal, onAdd, onBack, t }) => {
  const [multiplier, setMultiplier] = useState(1);
  
  const baseCalories = meal.calories || 0;
  const baseProtein = meal.macros?.protein || 0;
  const baseCarbs = meal.macros?.carbs || 0;
  const baseFat = meal.macros?.fat || 0;

  const calories = Math.round(baseCalories * multiplier);
  const protein = Math.round(baseProtein * multiplier);
  const carbs = Math.round(baseCarbs * multiplier);
  const fat = Math.round(baseFat * multiplier);

  const totalMacros = protein + carbs + fat || 1;
  const proteinPct = (protein / totalMacros) * 100;
  const carbsPct = (carbs / totalMacros) * 100;
  const fatPct = (fat / totalMacros) * 100;

  const handleSave = () => {
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name: meal.name || 'Unknown Meal',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'Snack',
      calories: calories,
      macros: { protein, carbs, fat },
      imageUrl: meal.imageUrl,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light overflow-y-auto hide-scrollbar pb-32">
      <nav className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full bg-gray-100">
          <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
        </button>
        {/* Use localized string for title */}
        <h2 className="text-base font-bold tracking-tight">{t('recognitionResult')}</h2>
        <div className="size-10"></div>
      </nav>

      <main className="flex-1 px-6">
        <div className="mt-4 relative">
          <div className="w-full aspect-square rounded-xl overflow-hidden shadow-sm bg-gray-100">
            {meal.imageUrl ? (
              <img src={meal.imageUrl} className="w-full h-full object-cover" alt="Captured food" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="material-symbols-outlined text-4xl text-gray-400">restaurant</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
            <span className="text-xs font-bold uppercase tracking-wider">{meal.name || 'Scanning...'}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest text-[10px]">Adjusted Energy</p>
            <div className="flex items-baseline gap-1">
              <h1 className="text-5xl font-extrabold text-primary transition-all">{calories}</h1>
              <span className="text-xl font-bold text-primary/80">kcal</span>
            </div>
          </div>
          
          <div className="relative size-32 flex items-center justify-center">
            <svg className="size-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f1f1f1" strokeWidth="3.5"></circle>
              <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#b2d7b2" strokeWidth="4.5" strokeDasharray={`${carbsPct} ${100-carbsPct}`} strokeDashoffset="25" transform="rotate(-90 18 18)"></circle>
              <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f2e29d" strokeWidth="4.5" strokeDasharray={`${proteinPct} ${100-proteinPct}`} strokeDashoffset={25 - carbsPct} transform="rotate(-90 18 18)"></circle>
              <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#e8d5c3" strokeWidth="4.5" strokeDasharray={`${fatPct} ${100-fatPct}`} strokeDashoffset={25 - carbsPct - proteinPct} transform="rotate(-90 18 18)"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Macros</span>
            </div>
          </div>
        </div>

        {/* Portion Selector */}
        <div className="mt-8 bg-accent-cream p-5 rounded-2xl border border-primary/10">
          <div className="flex items-center justify-between mb-4">
            {/* Use localized string for serving size */}
            <p className="text-xs font-bold text-[#648264] uppercase tracking-wider">{t('portionSize')}</p>
            <span className="text-primary font-extrabold text-lg">{multiplier}x</span>
          </div>
          <div className="flex gap-2">
            {[0.5, 1, 1.5, 2].map(val => (
              <button 
                key={val}
                onClick={() => setMultiplier(val)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${multiplier === val ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-[#648264] border-transparent hover:border-primary/20'}`}
              >
                {val}x
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 flex flex-col items-center">
            <span className="text-primary font-bold text-lg leading-tight">{carbs}g</span>
            {/* Use localized string for carbs */}
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">{t('carbs')}</span>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex flex-col items-center">
            <span className="text-yellow-600 font-bold text-lg leading-tight">{protein}g</span>
            {/* Use localized string for protein */}
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">{t('protein')}</span>
          </div>
          <div className="bg-[#f5ece2]/40 p-4 rounded-xl border border-[#f5ece2] flex flex-col items-center">
            <span className="text-amber-800 font-bold text-lg leading-tight">{fat}g</span>
            {/* Use localized string for fat */}
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">{t('fat')}</span>
          </div>
        </div>

        <button className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-lg">edit_note</span>
          <span>Not quite right? Adjust details</span>
        </button>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent max-w-md mx-auto z-20">
        <button 
          onClick={handleSave}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add_circle</span>
          {/* Use localized string for button */}
          <span>{t('logMeal')}</span>
        </button>
      </footer>
    </div>
  );
};

export default ResultScreen;
