
export type Language = 'en' | 'zh';

export interface Meal {
  id: string;
  name: string;
  time: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  nutrients?: {
    fiber: string;
    sugar: string;
    sodium: string;
  };
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  dailyGoal: number;
  consumed: number;
  waterIntake: number; // in ml
  waterGoal: number; // in ml
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  macroGoals: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export enum AppScreen {
  SPLASH = 'SPLASH',
  DASHBOARD = 'DASHBOARD',
  CAMERA = 'CAMERA',
  RESULT = 'RESULT',
  PROFILE = 'PROFILE',
  EXPLORE = 'EXPLORE',
  STATS = 'STATS'
}
