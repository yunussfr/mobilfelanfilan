import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Clock as ClockIcon,
  Users,
  Star,
  Check,
  MessageSquare,
  Send,
  Calendar,
  CheckCircle2,
  Utensils,
  ChefHat,
  Trash2,
  Bookmark,
  BookmarkCheck,
  Play
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

// YouTube Video ID çıkarma fonksiyonu
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  return null;
}

function MetaPill({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#1A1A2E] bg-white whitespace-nowrap">
      <span style={{ color }}>{icon}</span>
      <span className="font-['Nunito'] font-black text-[10px] text-[#1A1A2E] uppercase tracking-wider">{text}</span>
    </div>
  );
}

export function RecipeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { 
    recipes, 
    addComment, 
    deleteComment, 
    updateWeeklyPlan, 
    weeklyPlan, 
    getMadeItCount, 
    hasMadeIt, 
    toggleMadeIt, 
    comments, 
    notebookEntries, 
    addToNotebook, 
    removeFromNotebook,
    categories 
  } = useData();
  const { user } = useAuth();
  
  const recipe = recipes.find(r => r.id === id) || recipes[0];
  const recipeId = recipe.id;
  
  const notebookEntry = notebookEntries.find(e => e.recipeId === recipeId);
  const isInNotebook = !!notebookEntry;

  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const madeCount = getMadeItCount(recipeId);
  const userMadeIt = hasMadeIt(recipeId);
  const recipeComments = comments.filter(c => c.recipeId === recipeId);

  const handleMadeIt = () => {
    toggleMadeIt(recipeId);
    if (!userMadeIt) {
      toast.success('Harika! Ellerine sağlık 👨‍🍳');
    } else {
      toast('Geri alındı', { description: '"Ben de yaptım" kaldırıldı.' });
    }
  };

  const handleAddToNotebook = (category: string) => {
    addToNotebook(recipeId, category);
    setShowCategoryModal(false);
    toast.success(`"${category}" kategorisine eklendi! 📚`);
  };

  const handleRemoveFromNotebook = () => {
    removeFromNotebook(recipeId);
    toast('Defterimden kaldırıldı.');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment({
      recipeId,
      recipeTitle: recipe.title,
      text: commentText,
      rating,
      author: user?.name || 'Anonim',
    });
    setCommentText('');
    toast.success('Yorumun eklendi! 🎉');
  };

  const handlePlan = (day: string) => {
    updateWeeklyPlan(day, { recipeId, recipeTitle: recipe.title });
    setShowPlanModal(false);
    toast.success(`${day} gününe planlandı! 📅`);
    setTimeout(() => navigate('/notebook'), 800);
  };

  const videoId = recipe.youtubeUrl ? getYouTubeVideoId(recipe.youtubeUrl) : null;
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : recipe.image;

  return (
    <div className="pb-32 bg-[#FFF8F0]">
      {/* Hero */}
      <div
        className="relative h-[220px] w-full border-b-[4px] border-[#1A1A2E] cursor-pointer group"
        onClick={() => {
          if (recipe.youtubeUrl) {
            window.open(recipe.youtubeUrl, '_blank');
          }
        }}
      >
        <ImageWithFallback
          src={thumbnailUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent" />

        {/* YouTube Play Button Overlay */}
        {recipe.youtubeUrl && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-20 h-20 bg-[#FF0000] rounded-full border-[4px] border-white shadow-[0_0_30px_rgba(255,0,0,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform group-active:scale-100">
              <Play size={32} className="text-white fill-white ml-1" />
            </div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(-1);
          }}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full border-[3px] border-[#1A1A2E] shadow-[3px_3px_0_#1A1A2E] flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#1A1A2E] z-20"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isInNotebook) {
              handleRemoveFromNotebook();
            } else {
              setShowCategoryModal(true);
            }
          }}
          className={`absolute top-4 right-4 w-12 h-12 rounded-full border-[3px] border-[#1A1A2E] shadow-[4px_4px_0_#1A1A2E] flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_#1A1A2E] z-20 transition-all ${isInNotebook ? 'bg-[#FFD600] text-[#1A1A2E]' : 'bg-white text-[#FF6B00]'}`}
        >
          {isInNotebook ? <BookmarkCheck size={24} strokeWidth={3} /> : <Bookmark size={24} strokeWidth={3} />}
        </button>

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h1 className="font-['Righteous'] text-2xl text-white drop-shadow-[2px_2px_0_#1A1A2E]">
            {recipe.title}
          </h1>
        </div>
      </div>

      <div className="p-5">
        {/* Actions Bar */}
        <div className="flex gap-3 mb-8 items-stretch">
          <button
            onClick={handleMadeIt}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl border-[3px] border-[#1A1A2E] font-black uppercase tracking-wider transition-all shadow-[4px_4px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] ${
              userMadeIt ? 'bg-[#00C853] text-white' : 'bg-[#FFD600] text-[#1A1A2E]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {userMadeIt ? <CheckCircle2 size={16} /> : <span className="text-base leading-none">👩‍🍳</span>}
              <span className="text-xs">{userMadeIt ? 'YAPILDI ✓' : 'BEN DE YAPTIM'}</span>
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${userMadeIt ? 'bg-white/20' : 'bg-[#1A1A2E]/10'}`}>
              <ChefHat size={10} className={userMadeIt ? 'text-white' : 'text-[#1A1A2E]'} />
              <span className={`text-[11px] font-black ${userMadeIt ? 'text-white' : 'text-[#1A1A2E]'}`}>
                {madeCount} kişi yaptı
              </span>
            </div>
          </button>

          <button
            onClick={() => setShowPlanModal(true)}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-[3px] border-[#1A1A2E] bg-white text-[#1A1A2E] font-black uppercase text-xs tracking-wider shadow-[4px_4px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] transition-all"
          >
            <Calendar size={18} className="text-[#FF6B00]" />
            PLANLA
          </button>
        </div>

        {/* Meta Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <MetaPill icon={<ClockIcon size={14} />} text={recipe.time} color="#FF1744" />
          <MetaPill icon={<Users size={14} />} text={recipe.servings} color="#FF6B00" />
          <MetaPill icon={<Star size={14} />} text={recipe.difficulty} color="#00C853" />
        </div>

        {/* Ingredients */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#E0FFF0] border-2 border-[#1A1A2E] rounded-lg rotate-3 flex items-center justify-center text-[#00C853] shadow-[2px_2px_0_#1A1A2E]">
              <Utensils size={16} />
            </div>
            <h2 className="font-['Righteous'] text-lg text-[#1A1A2E]">Malzemeler</h2>
          </div>
          <div className="flex flex-col gap-2">
            {recipe.ingredients.map((ing, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#1A1A2E] rounded-xl p-3 flex justify-between items-center shadow-[3px_3px_0_#1A1A2E]/10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#00C853] rounded-md flex items-center justify-center text-white border border-[#1A1A2E]">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="font-['Nunito'] font-black text-[#1A1A2E] text-sm">{ing.name}</span>
                </div>
                <span className="font-['Nunito'] font-bold text-[#1A1A2E]/40 text-xs uppercase">{ing.amount}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#FFF0F5] border-2 border-[#1A1A2E] rounded-lg -rotate-3 flex items-center justify-center text-[#E83F6F] shadow-[2px_2px_0_#1A1A2E]">
              <CheckCircle2 size={16} />
            </div>
            <h2 className="font-['Righteous'] text-lg text-[#1A1A2E]">Hazırlanışı</h2>
          </div>
          <div className="flex flex-col gap-4">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="min-w-[28px] h-[28px] rounded-lg bg-[#FF6B00] border-2 border-[#1A1A2E] shadow-[2px_2px_0_#1A1A2E] flex items-center justify-center font-['Righteous'] text-white text-sm">
                  {idx + 1}
                </div>
                <p className="font-['Nunito'] font-bold text-[#1A1A2E] pt-1 text-sm leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Comments Section */}
        <section className="mt-12 pt-8 border-t-4 border-[#1A1A2E]/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E0F2FF] border-2 border-[#1A1A2E] rounded-lg rotate-6 flex items-center justify-center text-[#0091FF] shadow-[2px_2px_0_#1A1A2E]">
                <MessageSquare size={16} />
              </div>
              <h2 className="font-['Righteous'] text-lg text-[#1A1A2E]">Yorumlar</h2>
            </div>
            <span className="font-['Nunito'] font-black text-xs text-[#1A1A2E]/40 uppercase tracking-wider bg-white border-2 border-[#1A1A2E]/10 rounded-full px-3 py-1">
              {recipeComments.length} yorum
            </span>
          </div>

          {recipeComments.length > 0 && (
            <div className="flex flex-col gap-4 mb-8">
              {recipeComments.map((c) => (
                <div key={c.id} className="bg-white border-[3px] border-[#1A1A2E] rounded-2xl p-4 shadow-[4px_4px_0_#1A1A2E]/8">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FFD600] border-2 border-[#1A1A2E] flex items-center justify-center font-['Righteous'] text-[#1A1A2E] text-sm">
                        {(c.author || 'A').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-['Nunito'] font-black text-sm text-[#1A1A2E] leading-none">@{c.author || 'anonim'}</p>
                        <p className="font-['Nunito'] text-[10px] text-[#1A1A2E]/40 mt-0.5">{c.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-xs ${s <= c.rating ? '' : 'grayscale opacity-30'}`}>⭐</span>
                        ))}
                      </div>
                      {(c.author === user?.name || c.author === 'Anonim') && (
                        <button
                          onClick={() => {
                            deleteComment(c.id);
                            toast('Yorum silindi.');
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#FF1744]/10 text-[#FF1744] border border-[#FF1744]/20 active:scale-95 transition-transform"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="font-['Nunito'] font-bold text-sm text-[#1A1A2E]/80 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-[#F5F0FF] border-[3px] border-[#1A1A2E] rounded-2xl p-4 shadow-[4px_4px_0_#1A1A2E]/8">
            <p className="font-['Righteous'] text-sm text-[#1A1A2E] mb-3">Senin düşüncen?</p>
            <form onSubmit={handleAddComment} className="space-y-3">
              <div className="flex gap-1.5 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-xl transition-transform active:scale-90 ${rating >= star ? 'grayscale-0' : 'grayscale opacity-40'}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <div className="relative">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Bu tarif hakkındaki düşüncelerin..."
                  className="w-full bg-white border-[3px] border-[#1A1A2E] rounded-2xl p-4 pr-14 font-['Nunito'] font-bold text-[#1A1A2E] placeholder:text-[#1A1A2E]/20 focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/20 min-h-[90px] shadow-[4px_4px_0_#1A1A2E]/5"
                />
                <button
                  type="submit"
                  className="absolute bottom-3 right-3 w-10 h-10 bg-[#FF6B00] text-white border-2 border-[#1A1A2E] rounded-xl flex items-center justify-center shadow-[2px_2px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1A2E]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[375px] bg-white border-[4px] border-[#1A1A2E] rounded-[32px] p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-['Righteous'] text-xl text-[#1A1A2E]">Hangi Gün Pişirilsin?</h3>
              <button
                onClick={() => setShowPlanModal(false)}
                className="w-8 h-8 rounded-full bg-[#FFF8F0] border-2 border-[#1A1A2E] flex items-center justify-center font-bold"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => handlePlan(day)}
                  className={`w-full p-4 rounded-xl border-[3px] border-[#1A1A2E] font-black uppercase text-sm flex justify-between items-center transition-all ${
                    weeklyPlan[day]?.recipeId === recipeId
                      ? 'bg-[#FFD600] text-[#1A1A2E] shadow-none translate-x-1 translate-y-1'
                      : 'bg-[#FFF8F0] text-[#1A1A2E] shadow-[4px_4px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E]'
                  }`}
                >
                  {day}
                  {weeklyPlan[day]?.recipeId === recipeId && <Check size={18} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/80 backdrop-blur-sm p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] bg-[#FFD600] border-[4px] border-[#1A1A2E] rounded-[32px] p-8 shadow-[8px_8px_0_#1A1A2E] animate-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="inline-flex w-16 h-16 bg-white border-[3px] border-[#1A1A2E] rounded-2xl rotate-3 items-center justify-center mb-4 shadow-[4px_4px_0_#1A1A2E]">
                <Bookmark size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="font-['Righteous'] text-2xl text-[#1A1A2E] uppercase">Kategori Seç</h3>
              <p className="font-['Nunito'] font-bold text-[#1A1A2E]/60 text-sm mt-1">Defterinde nereye kaydedelim?</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleAddToNotebook(cat)}
                  className="w-full py-3 bg-white border-[3px] border-[#1A1A2E] rounded-xl font-['Righteous'] text-[#1A1A2E] uppercase text-sm shadow-[4px_4px_0_#1A1A2E] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setShowCategoryModal(false)}
                className="mt-2 font-['Nunito'] font-black text-[#1A1A2E] uppercase text-xs underline decoration-2 underline-offset-4"
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
