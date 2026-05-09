import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AppSettings {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
}

interface SettingsContextType {
  settings: AppSettings;
  updateLanguage: (language: string) => void;
  updateTheme: (theme: 'light' | 'dark' | 'auto') => void;
  updatePrimaryColor: (color: string) => void;
  t: (key: string) => string;
}

const defaultSettings: AppSettings = {
  language: 'tr',
  theme: 'light',
  primaryColor: '#FF6B00',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  tr: {
    'app.name': 'LEZZETTAT',
    'nav.explore': 'Keşfet',
    'nav.recipes': 'Tariflerim',
    'nav.notebook': 'Defterim',
    'nav.account': 'Hesabım',
    'settings.title': 'Ayarlar',
    'settings.language': 'Dil',
    'settings.theme': 'Renk Tonu',
    'settings.color': 'Ana Renk',
    'settings.password': 'Şifre Değiştir',
    'settings.logout': 'Çıkış Yap',
    'password.current': 'Mevcut Şifre',
    'password.new': 'Yeni Şifre',
    'password.confirm': 'Yeni Şifre (Tekrar)',
    'password.update': 'Şifreyi Güncelle',
    'theme.light': 'Açık',
    'theme.dark': 'Koyu',
    'theme.auto': 'Otomatik',
    'color.orange': 'Turuncu',
    'color.green': 'Yeşil',
    'color.red': 'Kırmızı',
    'color.purple': 'Mor',
    'color.blue': 'Mavi',
    'color.yellow': 'Sarı',
    'logout.confirm': 'Çıkış yapmak istediğinize emin misiniz?',
    'logout.success': 'Çıkış yapıldı',
  },
  en: {
    'app.name': 'LEZZETTAT',
    'nav.explore': 'Explore',
    'nav.recipes': 'My Recipes',
    'nav.notebook': 'Notebook',
    'nav.account': 'Account',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.color': 'Primary Color',
    'settings.password': 'Change Password',
    'settings.logout': 'Log Out',
    'password.current': 'Current Password',
    'password.new': 'New Password',
    'password.confirm': 'Confirm New Password',
    'password.update': 'Update Password',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.auto': 'Auto',
    'color.orange': 'Orange',
    'color.green': 'Green',
    'color.red': 'Red',
    'color.purple': 'Purple',
    'color.blue': 'Blue',
    'color.yellow': 'Yellow',
    'logout.confirm': 'Are you sure you want to log out?',
    'logout.success': 'Logged out successfully',
  },
  de: {
    'app.name': 'LEZZETTAT',
    'nav.explore': 'Entdecken',
    'nav.recipes': 'Meine Rezepte',
    'nav.notebook': 'Notizbuch',
    'nav.account': 'Konto',
    'settings.title': 'Einstellungen',
    'settings.language': 'Sprache',
    'settings.theme': 'Farbton',
    'settings.color': 'Hauptfarbe',
    'settings.password': 'Passwort ändern',
    'settings.logout': 'Abmelden',
    'password.current': 'Aktuelles Passwort',
    'password.new': 'Neues Passwort',
    'password.confirm': 'Neues Passwort bestätigen',
    'password.update': 'Passwort aktualisieren',
    'theme.light': 'Hell',
    'theme.dark': 'Dunkel',
    'theme.auto': 'Auto',
    'color.orange': 'Orange',
    'color.green': 'Grün',
    'color.red': 'Rot',
    'color.purple': 'Lila',
    'color.blue': 'Blau',
    'color.yellow': 'Gelb',
    'logout.confirm': 'Möchten Sie sich wirklich abmelden?',
    'logout.success': 'Erfolgreich abgemeldet',
  },
  fr: {
    'app.name': 'LEZZETTAT',
    'nav.explore': 'Explorer',
    'nav.recipes': 'Mes Recettes',
    'nav.notebook': 'Carnet',
    'nav.account': 'Compte',
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.theme': 'Thème',
    'settings.color': 'Couleur Principale',
    'settings.password': 'Changer le mot de passe',
    'settings.logout': 'Se déconnecter',
    'password.current': 'Mot de passe actuel',
    'password.new': 'Nouveau mot de passe',
    'password.confirm': 'Confirmer le mot de passe',
    'password.update': 'Mettre à jour',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'theme.auto': 'Auto',
    'color.orange': 'Orange',
    'color.green': 'Vert',
    'color.red': 'Rouge',
    'color.purple': 'Violet',
    'color.blue': 'Bleu',
    'color.yellow': 'Jaune',
    'logout.confirm': 'Êtes-vous sûr de vouloir vous déconnecter?',
    'logout.success': 'Déconnexion réussie',
  },
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));

    const applyTheme = () => {
      let theme = settings.theme;
      if (theme === 'auto') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', theme);
      document.body.classList.toggle('dark', theme === 'dark');
    };

    applyTheme();

    if (settings.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }

    document.documentElement.style.setProperty('--brand-primary', settings.primaryColor);
  }, [settings]);

  const updateLanguage = (language: string) => {
    setSettings((prev) => ({ ...prev, language }));
  };

  const updateTheme = (theme: 'light' | 'dark' | 'auto') => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const updatePrimaryColor = (primaryColor: string) => {
    setSettings((prev) => ({ ...prev, primaryColor }));
  };

  const t = (key: string): string => {
    return translations[settings.language]?.[key] || key;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateLanguage,
        updateTheme,
        updatePrimaryColor,
        t,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
