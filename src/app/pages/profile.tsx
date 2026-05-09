import React, { useState } from 'react';
import { Settings, Book, Utensils, LogOut, MessageSquare, Plus, Users, UserPlus, Camera, Edit3, Mail, User, X, Bell, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { recipes, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const [editMode, setEditMode] = useState<'name' | 'email' | 'avatar' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [highlightedCollections, setHighlightedCollections] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = (field: 'name' | 'email' | 'avatar') => {
    setEditMode(field);
    if (field === 'name') setEditValue(user?.name || '');
    else if (field === 'email') setEditValue(user?.email || '');
    else if (field === 'avatar') setEditValue(user?.avatar || '');
  };

  const handleSaveEdit = () => {
    if (!editValue.trim()) {
      toast.error('Lütfen geçerli bir değer girin');
      return;
    }

    if (editMode === 'name') updateProfile({ name: editValue });
    else if (editMode === 'email') updateProfile({ email: editValue });
    else if (editMode === 'avatar') updateProfile({ avatar: editValue });

    toast.success('Profil güncellendi!');
    setEditMode(null);
    setEditValue('');
  };

  // Load highlighted collections from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('lezzettat_highlighted_collections');
    if (saved) setHighlightedCollections(JSON.parse(saved));
  }, []);

  const myRecipes = recipes.filter(r => r.author === 'Ben');

  return (
    <div className="min-h-full pb-24 bg-[#FFF8F0]">
      {/* Header */}
      <div className="p-5 flex justify-between items-center bg-white border-b-4 border-[#1A1A2E]">
        <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E]">Hesabım</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] flex items-center justify-center bg-white shadow-[3px_3px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#1A1A2E] transition-all"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] flex items-center justify-center bg-[#E83F6F] text-white shadow-[3px_3px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#1A1A2E] transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Avatar & Profile Info Section */}
      <div className="flex flex-col items-center mt-6 px-5">
        {/* Avatar */}
        <div className="relative w-32 h-32 rounded-full border-[6px] border-brand shadow-xl mb-6 overflow-hidden">
          <ImageWithFallback
            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Lezzet'}`}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info Cards */}
        <div className="w-full space-y-3 mb-6">
          {/* Name Card */}
          <div
            onClick={() => handleEdit('name')}
            className="bg-white border-[3px] border-[#1A1A2E] rounded-xl p-3 shadow-[3px_3px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD600] border-2 border-[#1A1A2E] flex items-center justify-center">
                <User size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-[#1A1A2E]/40 tracking-wider">İsim</p>
                <p className="font-['Righteous'] text-[#1A1A2E]">{user?.name || 'Lezzet Sever'}</p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase text-brand">Değiştir →</span>
          </div>

          {/* Email Card */}
          <div
            onClick={() => handleEdit('email')}
            className="bg-white border-[3px] border-[#1A1A2E] rounded-xl p-3 shadow-[3px_3px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00C853] border-2 border-[#1A1A2E] flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-[#1A1A2E]/40 tracking-wider">E-posta</p>
                <p className="font-['Nunito'] font-bold text-sm text-[#1A1A2E]">{user?.email || 'lezzet@tat.com'}</p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase text-brand">Değiştir →</span>
          </div>

          {/* Avatar Photo Card */}
          <div
            onClick={() => handleEdit('avatar')}
            className="bg-white border-[3px] border-[#1A1A2E] rounded-xl p-3 shadow-[3px_3px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E83F6F] border-2 border-[#1A1A2E] flex items-center justify-center">
                <Camera size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-[#1A1A2E]/40 tracking-wider">Profil Fotoğrafı</p>
                <p className="font-['Nunito'] font-bold text-xs text-[#1A1A2E]">Fotoğrafı güncelle</p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase text-brand">Değiştir →</span>
          </div>
        </div>

        {/* Followers/Following */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border-[3px] border-[#1A1A2E] rounded-2xl p-4 shadow-[4px_4px_0_#1A1A2E] flex flex-col items-center">
            <Users size={20} className="text-brand mb-2" />
            <span className="font-['Righteous'] text-2xl text-[#1A1A2E]">{user?.followers || 0}</span>
            <span className="font-['Nunito'] font-black text-[9px] text-[#1A1A2E]/50 uppercase tracking-wider">Takipçi</span>
          </div>
          <div className="bg-white border-[3px] border-[#1A1A2E] rounded-2xl p-4 shadow-[4px_4px_0_#1A1A2E] flex flex-col items-center">
            <UserPlus size={20} className="text-[#00C853] mb-2" />
            <span className="font-['Righteous'] text-2xl text-[#1A1A2E]">{user?.following || 0}</span>
            <span className="font-['Nunito'] font-black text-[9px] text-[#1A1A2E]/50 uppercase tracking-wider">Takip</span>
          </div>
        </div>

        {/* Highlighted Collections (Instagram Highlights style) */}
        <div className="w-full mb-6">
          <h3 className="font-['Righteous'] text-sm text-[#1A1A2E] mb-3 px-1">Öne Çıkan Ajantalar</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {/* Add new highlight */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 rounded-full border-[3px] border-dashed border-[#1A1A2E] flex items-center justify-center bg-[#FFF8F0] shadow-[3px_3px_0_#1A1A2E] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                <Plus size={24} className="text-[#1A1A2E]/30" />
              </div>
              <span className="text-[9px] font-black uppercase text-[#1A1A2E]/40">Ekle</span>
            </div>

            {/* Sample highlights */}
            {myRecipes.slice(0, 5).map((recipe, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-16 h-16 rounded-full border-[3px] border-brand shadow-[3px_3px_0_#1A1A2E] overflow-hidden active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                  <ImageWithFallback src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] font-black uppercase text-[#1A1A2E] text-center max-w-[70px] truncate">{recipe.title.slice(0, 10)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid - 3 items in a row */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          <button onClick={() => setShowNotifications(true)} className="w-full">
            <StatCard label="Bildirimler" value={notifications.length.toString()} icon={<MessageSquare size={18} />} color="var(--brand-primary)" />
          </button>
          <button onClick={() => navigate('/notebook')} className="w-full">
            <StatCard label="Defterim" value="12" icon={<Book size={18} />} color="#00C853" />
          </button>
          <button onClick={() => navigate('/my-recipes')} className="w-full">
            <StatCard label="Tarifler" value={myRecipes.length.toString()} icon={<Utensils size={18} />} color="#FF1744" />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-[350px] bg-white border-[4px] border-[#1A1A2E] rounded-[24px] overflow-hidden shadow-[10px_10px_0_#1A1A2E]">
            <div className="bg-brand p-5 border-b-[4px] border-[#1A1A2E] flex justify-between items-center text-white">
              <h2 className="font-['Righteous'] text-lg">
                {editMode === 'name' ? 'İsmi Düzenle' : editMode === 'email' ? 'E-posta Düzenle' : 'Profil Fotoğrafı Düzenle'}
              </h2>
              <button onClick={() => { setEditMode(null); setEditValue(''); }} className="bg-white/20 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                placeholder={editMode === 'name' ? 'İsim' : editMode === 'email' ? 'E-posta' : 'Resim URL\'si'}
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                className="w-full p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-black focus:outline-none focus:shadow-[4px_4px_0_#1A1A2E]/10"
                autoFocus
              />

              <button
                onClick={handleSaveEdit}
                className="w-full bg-brand text-white py-3 rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] font-['Righteous'] text-base active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                KAYDET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Popup */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-[400px] bg-white border-[4px] border-[#1A1A2E] rounded-[24px] overflow-hidden shadow-[10px_10px_0_#1A1A2E] max-h-[80vh] flex flex-col">
            <div className="bg-brand p-5 border-b-[4px] border-[#1A1A2E] flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bell size={20} />
                <h2 className="font-['Righteous'] text-lg">Bildirimler</h2>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="bg-[#E83F6F] text-white text-xs font-black px-2 py-0.5 rounded-full border-2 border-white">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              <button onClick={() => setShowNotifications(false)} className="bg-white/20 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell size={48} className="text-[#1A1A2E]/20 mb-3" />
                  <p className="font-['Righteous'] text-[#1A1A2E]">Henüz bildirim yok</p>
                  <p className="font-['Nunito'] text-sm text-[#1A1A2E]/60">Bildirimler burada görünecek</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationAsRead(notif.id)}
                    className={`p-3 rounded-xl border-[3px] border-[#1A1A2E] cursor-pointer transition-all shadow-[3px_3px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] ${
                      notif.read ? 'bg-[#FFF8F0]' : 'bg-[#FFD600]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl shrink-0">{notif.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Righteous'] text-sm text-[#1A1A2E] mb-1">{notif.title}</p>
                        <p className="font-['Nunito'] font-bold text-xs text-[#1A1A2E]/70 line-clamp-2">{notif.message}</p>
                        <p className="font-['Nunito'] text-[9px] font-black uppercase text-[#1A1A2E]/40 mt-1">{notif.date}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-[#E83F6F] rounded-full border border-[#1A1A2E] shrink-0" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t-4 border-[#1A1A2E] flex gap-3">
              <button
                onClick={() => {
                  markAllNotificationsAsRead();
                  navigate('/my-comments');
                  setShowNotifications(false);
                }}
                className="flex-1 bg-white border-[3px] border-[#1A1A2E] text-[#1A1A2E] py-3 px-4 rounded-xl font-['Righteous'] text-sm shadow-[4px_4px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                Tümünü Gör
              </button>
              <button
                onClick={() => setShowNotifications(false)}
                className="flex-1 bg-[#E83F6F] border-[3px] border-[#1A1A2E] text-white py-3 px-4 rounded-xl font-['Righteous'] text-sm shadow-[4px_4px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] transition-all flex items-center justify-center gap-2"
              >
                <X size={16} />
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white border-[3px] border-[#1A1A2E] rounded-2xl p-3 shadow-[5px_5px_0_#1A1A2E] flex flex-col items-center gap-1 w-full hover:-translate-y-1 transition-transform">
      <div style={{ color }} className="mb-1">{icon}</div>
      <span className="font-['Righteous'] text-xl text-[#1A1A2E]">{value}</span>
      <span className="font-['Nunito'] font-black text-[9px] text-[#1A1A2E]/50 uppercase tracking-wider text-center leading-tight">{label}</span>
    </div>
  );
}
