import React, { createContext, useContext, useState, useEffect } from 'react';

import { Recipe, Comment, WeeklyPlan, NotebookEntry, Notification } from '../lib/types';
import { SEED_RECIPES, SEED_COMMENTS_INITIAL } from '../lib/seed-data';

export type { Recipe, Comment, WeeklyPlan, NotebookEntry, Notification };

interface MadeItState {
  counts: { [recipeId: string]: number };
  byUser: { [recipeId: string]: boolean };
}

interface DataContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
  deleteComment: (id: string) => void;
  weeklyPlan: WeeklyPlan;
  updateWeeklyPlan: (day: string, recipe: { recipeId: string; recipeTitle: string } | null) => void;
  getMadeItCount: (recipeId: string) => number;
  hasMadeIt: (recipeId: string) => boolean;
  toggleMadeIt: (recipeId: string) => void;
  notebookEntries: NotebookEntry[];
  addToNotebook: (recipeId: string, category: string) => void;
  removeFromNotebook: (recipeId: string) => void;
  categories: string[];
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const INITIAL_PLAN: WeeklyPlan = DAYS.reduce((acc, day) => ({ ...acc, [day]: null }), {});

const DEFAULT_CATEGORIES = ['Kahvaltı', 'Ana Yemek', 'Tatlılar', 'Atıştırmalıklar', 'İçecekler', 'Genel', 'Atıştırmalık', 'Deniz Ürünleri', 'Hamur İşleri', 'Öğle Yemeği'];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'comment',
    title: 'Yeni Yorum',
    message: '@gurme_selin tarifine yorum yaptı: "Harika bir tarif! 👨‍🍳"',
    date: '2 saat önce',
    read: false,
    icon: '💬'
  },
  {
    id: 'n2',
    type: 'like',
    title: 'Ben de Yaptım',
    message: '12 kişi Baharatlı Tavuk Kanat tarifini yaptı!',
    date: '5 saat önce',
    read: false,
    icon: '👨‍🍳'
  },
  {
    id: 'n3',
    type: 'follow',
    title: 'Yeni Takipçi',
    message: '@chef_ali seni takip etmeye başladı!',
    date: 'Dün',
    read: true,
    icon: '👤'
  },
  {
    id: 'n4',
    type: 'plan',
    title: 'Haftalık Plan Hatırlatma',
    message: 'Yarın için "Mantar Soslu Fettuccine" planladın!',
    date: '2 gün önce',
    read: true,
    icon: '📅'
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(SEED_RECIPES);
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS_INITIAL);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(INITIAL_PLAN);
  const [madeIt, setMadeIt] = useState<MadeItState>({ counts: { '1': 47 }, byUser: {} });
  const [notebookEntries, setNotebookEntries] = useState<NotebookEntry[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    const savedRecipes = localStorage.getItem('lezzettat_recipes');
    const savedComments = localStorage.getItem('lezzettat_comments');
    const savedPlan = localStorage.getItem('lezzettat_weekly_plan');
    const savedMadeIt = localStorage.getItem('lezzettat_made_it');
    const savedNotebook = localStorage.getItem('lezzettat_notebook');

    if (savedRecipes) {
      const parsed: Recipe[] = JSON.parse(savedRecipes);
      // Only keep user created recipes from localStorage, SEED ones are in memory
      setRecipes([...SEED_RECIPES, ...parsed.filter(r => !SEED_RECIPES.find(s => s.id === r.id))]);
    }
    if (savedComments) {
      const parsed: Comment[] = JSON.parse(savedComments);
      setComments([...SEED_COMMENTS_INITIAL, ...parsed.filter(c => !SEED_COMMENTS_INITIAL.find(s => s.id === c.id))]);
    }
    if (savedPlan) setWeeklyPlan(JSON.parse(savedPlan));
    if (savedMadeIt) setMadeIt(JSON.parse(savedMadeIt));
    if (savedNotebook) setNotebookEntries(JSON.parse(savedNotebook));
  }, []);

  useEffect(() => {
    const userRecipes = recipes.filter(r => !SEED_RECIPES.find(s => s.id === r.id));
    localStorage.setItem('lezzettat_recipes', JSON.stringify(userRecipes));
  }, [recipes]);

  useEffect(() => {
    const userComments = comments.filter(c => !SEED_COMMENTS_INITIAL.find(s => s.id === c.id));
    localStorage.setItem('lezzettat_comments', JSON.stringify(userComments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('lezzettat_weekly_plan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem('lezzettat_made_it', JSON.stringify(madeIt));
  }, [madeIt]);

  useEffect(() => {
    localStorage.setItem('lezzettat_notebook', JSON.stringify(notebookEntries));
  }, [notebookEntries]);

  const addRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: Math.random().toString(36).substr(2, 9),
    };
    setRecipes(prev => [recipe, ...prev]);
  };

  const addComment = (newComment: Omit<Comment, 'id' | 'date'>) => {
    const comment: Comment = {
      ...newComment,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('tr-TR'),
    };
    setComments(prev => [comment, ...prev]);
  };

  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const updateWeeklyPlan = (day: string, recipe: { recipeId: string; recipeTitle: string } | null) => {
    setWeeklyPlan(prev => ({ ...prev, [day]: recipe }));
  };

  const getMadeItCount = (recipeId: string) => madeIt.counts[recipeId] ?? 0;

  const hasMadeIt = (recipeId: string) => madeIt.byUser[recipeId] ?? false;

  const toggleMadeIt = (recipeId: string) => {
    setMadeIt(prev => {
      const already = prev.byUser[recipeId] ?? false;
      const currentCount = prev.counts[recipeId] ?? 0;
      return {
        counts: { ...prev.counts, [recipeId]: already ? Math.max(0, currentCount - 1) : currentCount + 1 },
        byUser: { ...prev.byUser, [recipeId]: !already },
      };
    });
  };

  const addToNotebook = (recipeId: string, category: string) => {
    setNotebookEntries(prev => {
      const exists = prev.find(e => e.recipeId === recipeId);
      if (exists) {
        return prev.map(e => e.recipeId === recipeId ? { ...e, category } : e);
      }
      return [...prev, { recipeId, category }];
    });
  };

  const removeFromNotebook = (recipeId: string) => {
    setNotebookEntries(prev => prev.filter(e => e.recipeId !== recipeId));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DataContext.Provider value={{
      recipes,
      addRecipe,
      comments,
      addComment,
      deleteComment,
      weeklyPlan,
      updateWeeklyPlan,
      getMadeItCount,
      hasMadeIt,
      toggleMadeIt,
      notebookEntries,
      addToNotebook,
      removeFromNotebook,
      categories: DEFAULT_CATEGORIES,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
