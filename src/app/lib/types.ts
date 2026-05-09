export interface Recipe {
  id: string;
  title: string;
  image: string;
  youtubeUrl?: string; // YouTube video linki
  time: string;
  servings: string;
  difficulty: string;
  calories: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  isPublic: boolean;
  author: string;
}

export interface Comment {
  id: string;
  recipeId: string;
  recipeTitle: string;
  text: string;
  date: string;
  rating: number;
  author: string;
}

export interface WeeklyPlan {
  [key: string]: {
    recipeId: string;
    recipeTitle: string;
  } | null;
}

export interface NotebookEntry {
  recipeId: string;
  category: string;
}

export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'follow' | 'plan' | 'recipe';
  title: string;
  message: string;
  date: string;
  read: boolean;
  icon?: string;
}
