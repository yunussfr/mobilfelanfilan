import React, { useState } from 'react';
import { Lock, LogOut, ChevronRight, Globe, Palette, Sun } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSettings } from '../contexts/SettingsContext';

const LANGUAGES = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const COLORS = [
  { nameKey: 'color.orange', value: '#FF6B00' },
  { nameKey: 'color.green', value: '#00C853' },
  { nameKey: 'color.red', value: '#FF1744' },
  { nameKey: 'color.purple', value: '#9C27B0' },
  { nameKey: 'color.blue', value: '#2196F3' },
  { nameKey: 'color.yellow', value: '#FFC107' },
];

const THEMES = [
  { nameKey: 'theme.light', value: 'light' as const },
  { nameKey: 'theme.dark', value: 'dark' as const },
  { nameKey: 'theme.auto', value: 'auto' as const },
];

export function SettingsPage() {
  const navigate = useNavigate();
  const { settings, updateLanguage, updateTheme, updatePrimaryColor, t } = useSettings();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert(settings.language === 'tr' ? 'Lütfen tüm alanları doldurun' : 'Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert(settings.language === 'tr' ? 'Yeni şifreler eşleşmiyor' : 'Passwords do not match');
      return;
    }
    alert(settings.language === 'tr' ? 'Şifre başarıyla değiştirildi' : 'Password changed successfully');
    setShowPasswordChange(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] flex items-center justify-center bg-white shadow-[3px_3px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_#1A1A2E] transition-all"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E]">{t('settings.title')}</h1>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Language Setting */}
        <div className="bg-white rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] bg-[#2196F3] flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <span className="font-['Nunito'] font-black text-[#1A1A2E]">{t('settings.language')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => updateLanguage(lang.code)}
                className={`p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold transition-all ${
                  settings.language === lang.code
                    ? 'bg-[#2196F3] text-white shadow-[3px_3px_0_#1A1A2E]'
                    : 'bg-white text-[#1A1A2E] shadow-[2px_2px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px]'
                }`}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Setting */}
        <div className="bg-white rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] bg-[#FFC107] flex items-center justify-center">
              <Sun size={20} className="text-white" />
            </div>
            <span className="font-['Nunito'] font-black text-[#1A1A2E]">{t('settings.theme')}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.value}
                onClick={() => updateTheme(theme.value)}
                className={`p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold transition-all ${
                  settings.theme === theme.value
                    ? 'bg-[#FFC107] text-white shadow-[3px_3px_0_#1A1A2E]'
                    : 'bg-white text-[#1A1A2E] shadow-[2px_2px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px]'
                }`}
              >
                {t(theme.nameKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Color Setting */}
        <div className="bg-white rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] bg-[#9C27B0] flex items-center justify-center">
              <Palette size={20} className="text-white" />
            </div>
            <span className="font-['Nunito'] font-black text-[#1A1A2E]">{t('settings.color')}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => updatePrimaryColor(color.value)}
                className={`p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold transition-all ${
                  settings.primaryColor === color.value
                    ? 'text-white shadow-[3px_3px_0_#1A1A2E]'
                    : 'bg-white text-[#1A1A2E] shadow-[2px_2px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px]'
                }`}
                style={{
                  backgroundColor: settings.primaryColor === color.value ? color.value : undefined,
                }}
              >
                {t(color.nameKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-white rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] p-4">
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] bg-[#FF1744] flex items-center justify-center">
                <Lock size={20} className="text-white" />
              </div>
              <span className="font-['Nunito'] font-black text-[#1A1A2E]">Şifre Değiştir</span>
            </div>
            <ChevronRight
              size={20}
              className={`text-[#1A1A2E] transition-transform ${showPasswordChange ? 'rotate-90' : ''}`}
            />
          </button>

          {showPasswordChange && (
            <div className="mt-4 space-y-3 pt-4 border-t-[3px] border-[#1A1A2E]/10">
              <input
                type="password"
                placeholder={t('password.current')}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold focus:outline-none focus:shadow-[3px_3px_0_#FF1744]"
              />
              <input
                type="password"
                placeholder={t('password.new')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold focus:outline-none focus:shadow-[3px_3px_0_#FF1744]"
              />
              <input
                type="password"
                placeholder={t('password.confirm')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold focus:outline-none focus:shadow-[3px_3px_0_#FF1744]"
              />
              <button
                onClick={handlePasswordChange}
                className="w-full bg-[#FF1744] text-white p-3 rounded-xl border-[3px] border-[#1A1A2E] shadow-[3px_3px_0_#1A1A2E] font-['Nunito'] font-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_#1A1A2E] transition-all"
              >
                {t('password.update')}
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            if (confirm(t('logout.confirm'))) {
              alert(t('logout.success'));
            }
          }}
          className="w-full bg-white rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] p-4 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[3px_3px_0_#1A1A2E] transition-all flex items-center justify-between mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] bg-[#1A1A2E] flex items-center justify-center">
              <LogOut size={20} className="text-white" />
            </div>
            <span className="font-['Nunito'] font-black text-[#1A1A2E]">{t('settings.logout')}</span>
          </div>
        </button>
      </div>

      {/* App Info */}
      <div className="mt-8 text-center px-5">
        <p className="font-['Nunito'] text-xs text-[#1A1A2E]/40">LEZZETTAT v1.0.0</p>
      </div>
    </div>
  );
}
