
import React, { useState, useEffect } from 'react';
import { AppScreen, Meal, UserProfile, Language } from './types';
import { translations } from './i18n';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import CameraScreen from './screens/CameraScreen';
import ResultScreen from './screens/ResultScreen';
import ProfileScreen from './screens/ProfileScreen';
import ExploreScreen from './screens/ExploreScreen';
import StatsScreen from './screens/StatsScreen';

const INITIAL_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Avocado & Egg Toast',
    time: '8:30 AM',
    type: 'Breakfast',
    calories: 350,
    macros: { protein: 12, carbs: 28, fat: 22 },
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=200&auto=format&fit=crop'
  }
];

const INITIAL_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  dailyGoal: 2100,
  consumed: 350,
  waterIntake: 1250,
  waterGoal: 2500,
  macros: { protein: 12, carbs: 28, fat: 22 },
  macroGoals: { protein: 150, carbs: 200, fat: 70 }
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [language, setLanguage] = useState<Language>('en');
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [pendingMeal, setPendingMeal] = useState<Partial<Meal> | null>(null);

  useEffect(() => {
    if (currentScreen === AppScreen.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentScreen(AppScreen.DASHBOARD);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  const handleAddMeal = (meal: Meal) => {
    setMeals(prev => [meal, ...prev]);
    setProfile(prev => ({
      ...prev,
      consumed: prev.consumed + meal.calories,
      macros: {
        protein: prev.macros.protein + meal.macros.protein,
        carbs: prev.macros.carbs + meal.macros.carbs,
        fat: prev.macros.fat + meal.macros.fat,
      }
    }));
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  const addWater = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      waterIntake: Math.min(prev.waterGoal, prev.waterIntake + amount)
    }));
  };

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-2xl overflow-hidden flex flex-col">
      {currentScreen === AppScreen.SPLASH && <SplashScreen />}
      
      {currentScreen === AppScreen.DASHBOARD && (
        <Dashboard 
          profile={profile} 
          meals={meals} 
          onNavigate={navigateTo}
          onAddWater={addWater}
          t={t}
          language={language}
        />
      )}
      
      {currentScreen === AppScreen.CAMERA && (
        <CameraScreen 
          onNavigate={navigateTo} 
          onResult={(result) => {
            setPendingMeal(result);
            setCurrentScreen(AppScreen.RESULT);
          }} 
          t={t}
        />
      )}
      
      {currentScreen === AppScreen.RESULT && pendingMeal && (
        <ResultScreen 
          meal={pendingMeal} 
          onAdd={handleAddMeal}
          onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} 
          t={t}
        />
      )}
      
      {currentScreen === AppScreen.PROFILE && (
        <ProfileScreen 
          profile={profile} 
          onNavigate={navigateTo} 
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {currentScreen === AppScreen.EXPLORE && (
        <ExploreScreen 
          onNavigate={navigateTo} 
          t={t}
        />
      )}

      {currentScreen === AppScreen.STATS && (
        <StatsScreen 
          profile={profile}
          onNavigate={navigateTo} 
          t={t}
        />
      )}
    </div>
  );
};

export default App;
