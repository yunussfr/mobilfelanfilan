import React, { useState, useEffect } from 'react';
import { ChefHat, Plus, Clock as ClockIcon, Users, Globe, Lock, Trash2, X, Camera, Utensils, Eye, ArrowLeft, ChevronRight, Edit3, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useData } from '../contexts/DataContext';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface RecipeCollection {
  id: string;
  name: string;
  recipeIds: string[];
}

export function MyRecipes() {
  const navigate = useNavigate();
  const { recipes, addRecipe } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState<RecipeCollection[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState('Kolay');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [steps, setSteps] = useState(['']);
  const [isPublic, setIsPublic] = useState(true);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const myRecipes = recipes.filter(r => r.author === 'Ben' || r.author === 'Chef Ali'); // Using seed recipes too for better view

  // Load collections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lezzettat_recipe_collections');
    if (saved) {
      setCollections(JSON.parse(saved));
    } else {
      // Create a default collection with all user recipes
      const defaultCollection: RecipeCollection = {
        id: 'default',
        name: 'Tüm Tariflerim',
        recipeIds: myRecipes.map(r => r.id)
      };
      setCollections([defaultCollection]);
    }
  }, []);

  // Save collections to localStorage
  useEffect(() => {
    localStorage.setItem('lezzettat_recipe_collections', JSON.stringify(collections));
  }, [collections]);

  const handleAddIngredient = () => setIngredients([...ingredients, { name: '', amount: '' }]);
  const handleRemoveIngredient = (idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const handleAddStep = () => setSteps([...steps, '']);
  const handleRemoveStep = (idx: number) => setSteps(steps.filter((_, i) => i !== idx));

  const addCollection = () => {
    if (!collectionName.trim()) {
      toast.error('Lütfen ajanta ismi girin');
      return;
    }

    if (editingCollectionId) {
      setCollections(prev => prev.map(c => c.id === editingCollectionId ? { ...c, name: collectionName } : c));
      toast.success('Ajanta ismi güncellendi!');
    } else {
      const newCollection: RecipeCollection = {
        id: Math.random().toString(36).substr(2, 9),
        name: collectionName,
        recipeIds: []
      };
      setCollections(prev => [...prev, newCollection]);
      toast.success('Yeni ajanta oluşturuldu!');
    }

    setCollectionName('');
    setShowCollectionModal(false);
    setEditingCollectionId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error('Lütfen tarif adını girin');
      return;
    }

    const newRecipeId = Math.random().toString(36).substr(2, 9);

    addRecipe({
      title,
      time: time || '30 dk',
      servings: servings || '2 kişi',
      difficulty,
      calories: calories || '0 kcal',
      ingredients: ingredients.filter(i => i.name),
      steps: steps.filter(s => s),
      isPublic,
      author: 'Ben',
      image: imageUrl,
      youtubeUrl: youtubeUrl || undefined,
    });

    // Add to default collection
    if (collections.length > 0) {
      setCollections(prev => prev.map((c, idx) =>
        idx === 0 ? { ...c, recipeIds: [...c.recipeIds, newRecipeId] } : c
      ));
    }

    toast.success('Tarif başarıyla eklendi! 👨‍🍳');
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle(''); setTime(''); setServings(''); setDifficulty('Kolay'); setCalories('');
    setIngredients([{ name: '', amount: '' }]); setSteps(['']); setIsPublic(true); setYoutubeUrl('');
  };

  // Collections with recipes
  const collectionsWithRecipes = collections.map(col => {
    const colRecipes = col.recipeIds.map(id => myRecipes.find(r => r.id === id)).filter(Boolean);
    return {
      ...col,
      recipes: colRecipes,
      coverImage: colRecipes.length > 0 ? colRecipes[0]?.image : null
    };
  });

  // If a collection is selected, show its recipes
  if (selectedCollection) {
    const collectionData = collectionsWithRecipes.find(c => c.id === selectedCollection);
    return (
      <div className="min-h-full pb-24 bg-[#FFF8F0]">
        {/* Detail Header */}
        <div className="p-5 flex items-center gap-4 bg-white border-b-4 border-[#1A1A2E]">
          <button
            onClick={() => setSelectedCollection(null)}
            className="w-10 h-10 bg-[#FF1744] rounded-xl border-[3px] border-[#1A1A2E] flex items-center justify-center shadow-[3px_3px_0_#1A1A2E] active:shadow-none active:translate-x-1 active:translate-y-1 text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E] uppercase">{collectionData?.name}</h1>
          <button
            onClick={() => {
              setEditingCollectionId(selectedCollection);
              setCollectionName(collectionData?.name || '');
              setShowCollectionModal(true);
            }}
            className="ml-auto w-10 h-10 bg-white rounded-xl border-[3px] border-[#1A1A2E] flex items-center justify-center shadow-[3px_3px_0_#1A1A2E] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <Edit3 size={16} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 gap-4">
          {collectionData?.recipes.map((recipe) => (
            <div
              key={recipe!.id}
              onClick={() => navigate(`/recipe/${recipe!.id}`)}
              className="bg-white border-[3px] border-[#1A1A2E] rounded-2xl overflow-hidden shadow-[4px_4px_0_#1A1A2E] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
            >
              <div className="h-32 overflow-hidden border-b-[3px] border-[#1A1A2E]">
                <ImageWithFallback src={recipe!.image} alt={recipe!.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-['Righteous'] text-xs text-[#1A1A2E] line-clamp-2 leading-tight h-8 mb-2">
                  {recipe!.title}
                </h3>
                <div className="flex items-center gap-1 text-[10px] font-black text-[#1A1A2E]/50 uppercase">
                  <ClockIcon size={10} /> {recipe!.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-24 bg-[#FFF8F0] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A1A2E 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Header */}
      <div className="p-5 relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#FF1744] border-[3px] border-[#1A1A2E] flex items-center justify-center shadow-[4px_4px_0_#1A1A2E] rotate-3">
              <Utensils size={20} className="text-white" />
            </div>
            <h1 className="font-['Righteous'] text-3xl text-[#1A1A2E] uppercase italic">Tariflerim</h1>
          </div>
          <p className="font-['Nunito'] text-xs font-black text-[#1A1A2E]/60 uppercase tracking-widest ml-14">
            {myRecipes.length} Tarif Oluşturuldu
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCollectionId(null);
            setCollectionName('');
            setShowCollectionModal(true);
          }}
          className="w-12 h-12 rounded-full bg-brand border-[3px] border-[#1A1A2E] flex items-center justify-center shadow-[4px_4px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_#1A1A2E] transition-all"
        >
          <Plus size={24} className="text-white" />
        </button>
      </div>

      {/* Collections Grid (Notebook Covers) */}
      <div className="px-5 grid grid-cols-2 gap-6 mt-8 relative z-10">
        {collectionsWithRecipes.map((col, idx) => (
          <div
            key={col.id}
            className={`relative group cursor-pointer transition-transform hover:-translate-y-1 ${idx % 2 === 0 ? '-rotate-1' : 'rotate-2'}`}
          >
            {/* Notebook Base */}
            <div className="absolute inset-0 bg-[#1A1A2E] rounded-r-2xl translate-x-1 translate-y-1" />

            <div className="relative aspect-[3/4] bg-white border-[3px] border-[#1A1A2E] rounded-r-2xl rounded-l-md overflow-hidden flex flex-col shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
              {/* Spiral Edge */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#E5E5E5] border-r-[3px] border-[#1A1A2E] flex flex-col justify-around py-4">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className="w-4 h-1.5 -ml-1.5 bg-[#1A1A2E] rounded-full border border-white/20" />
                ))}
              </div>

              {/* Cover Image */}
              <div
                onClick={() => setSelectedCollection(col.id)}
                className="ml-3 h-[60%] overflow-hidden border-b-[3px] border-[#1A1A2E] relative"
              >
                {col.coverImage ? (
                  <ImageWithFallback src={col.coverImage} alt={col.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
                    <Bookmark size={32} className="text-[#1A1A2E]/10" />
                  </div>
                )}
                {/* Pop-art badge */}
                <div className="absolute top-2 right-2 bg-[#FF1744] border-2 border-[#1A1A2E] px-2 py-0.5 rounded-lg shadow-[2px_2px_0_#1A1A2E]">
                  <span className="font-['Righteous'] text-[10px] text-white">{col.recipes.length}</span>
                </div>
              </div>

              {/* Collection Name */}
              <div
                onClick={() => setSelectedCollection(col.id)}
                className="ml-3 p-3 flex-1 flex flex-col justify-center bg-[#FF1744]"
              >
                <h3 className="font-['Righteous'] text-sm text-white uppercase leading-tight line-clamp-2">
                  {col.name}
                </h3>
                <div className="mt-2 flex items-center text-[10px] font-black text-white/80 uppercase">
                  <span>İncele</span>
                  <ChevronRight size={12} strokeWidth={4} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Recipe Button */}
        <div
          onClick={() => setShowAddModal(true)}
          className="relative group cursor-pointer transition-transform hover:-translate-y-1 rotate-1"
        >
          <div className="absolute inset-0 bg-[#1A1A2E] rounded-r-2xl translate-x-1 translate-y-1" />

          <div className="relative aspect-[3/4] bg-white border-[3px] border-[#1A1A2E] border-dashed rounded-r-2xl rounded-l-md overflow-hidden flex flex-col items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
            <Plus size={48} className="text-[#1A1A2E]/20 mb-2" />
            <span className="font-['Righteous'] text-xs text-[#1A1A2E]/40 uppercase">Tarif Ekle</span>
          </div>
        </div>
      </div>

      {/* Collection Name Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-[350px] bg-white border-[4px] border-[#1A1A2E] rounded-[24px] overflow-hidden shadow-[10px_10px_0_#1A1A2E]">
            <div className="bg-[#FF1744] p-5 border-b-[4px] border-[#1A1A2E] flex justify-between items-center text-white">
              <h2 className="font-['Righteous'] text-lg">{editingCollectionId ? 'Ajanta İsmini Düzenle' : 'Yeni Ajanta Oluştur'}</h2>
              <button onClick={() => { setShowCollectionModal(false); setEditingCollectionId(null); setCollectionName(''); }} className="bg-white/20 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                placeholder="Ajanta İsmi (örn: Tatlılarım, Kahvaltılarım)"
                value={collectionName}
                onChange={e => setCollectionName(e.target.value)}
                className="w-full p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-black focus:outline-none focus:shadow-[4px_4px_0_#1A1A2E]/10"
                autoFocus
              />

              <button
                onClick={addCollection}
                className="w-full bg-[#FF1744] text-white py-3 rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] font-['Righteous'] text-base active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                {editingCollectionId ? 'GÜNCELLE' : 'OLUŞTUR'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-[400px] bg-white border-[4px] border-[#1A1A2E] rounded-[32px] overflow-hidden shadow-[10px_10px_0_#1A1A2E] my-auto">
            <div className="bg-brand p-5 border-b-[4px] border-[#1A1A2E] flex justify-between items-center text-white">
              <h2 className="font-['Righteous'] text-xl">Yeni Tarif Ekle</h2>
              <button onClick={() => setShowAddModal(false)} className="bg-white/20 p-1 rounded-full"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto scrollbar-hide">
              {/* Image Placeholder */}
              <div className="relative h-40 bg-[#FFF8F0] border-[3px] border-dashed border-[#1A1A2E] rounded-2xl flex flex-col items-center justify-center text-[#1A1A2E]/30 overflow-hidden">
                <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                   <Camera size={32} className="text-white" />
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-3">
                <input
                  placeholder="Tarif Adı"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-black focus:outline-none focus:shadow-[4px_4px_0_#1A1A2E]/10"
                />
                <input
                  placeholder="YouTube Linki (opsiyonel)"
                  value={youtubeUrl}
                  onChange={e => setYoutubeUrl(e.target.value)}
                  className="w-full p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0_#1A1A2E]/10"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Süre (örn: 30 dk)" value={time} onChange={e => setTime(e.target.value)} className="p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold text-sm" />
                  <input placeholder="Kişi Sayısı" value={servings} onChange={e => setServings(e.target.value)} className="p-3 rounded-xl border-[3px] border-[#1A1A2E] font-['Nunito'] font-bold text-sm" />
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <label className="font-['Righteous'] text-sm text-[#1A1A2E]">Malzemeler</label>
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      placeholder="Malzeme"
                      value={ing.name}
                      onChange={e => {
                        const newIngs = [...ingredients];
                        newIngs[idx].name = e.target.value;
                        setIngredients(newIngs);
                      }}
                      className="flex-1 p-2 rounded-lg border-2 border-[#1A1A2E] font-['Nunito'] font-bold text-xs"
                    />
                    <input
                      placeholder="Miktar"
                      value={ing.amount}
                      onChange={e => {
                        const newIngs = [...ingredients];
                        newIngs[idx].amount = e.target.value;
                        setIngredients(newIngs);
                      }}
                      className="w-20 p-2 rounded-lg border-2 border-[#1A1A2E] font-['Nunito'] font-bold text-xs"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="w-8 h-8 bg-[#E83F6F] border-2 border-[#1A1A2E] rounded-lg flex items-center justify-center text-white shadow-[2px_2px_0_#1A1A2E] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleAddIngredient} className="text-brand font-black text-xs flex items-center gap-1 uppercase">+ Malzeme Ekle</button>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <label className="font-['Righteous'] text-sm text-[#1A1A2E]">Hazırlanışı</label>
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <textarea
                      placeholder={`${idx + 1}. Adım`}
                      value={step}
                      onChange={e => {
                        const newSteps = [...steps];
                        newSteps[idx] = e.target.value;
                        setSteps(newSteps);
                      }}
                      className="flex-1 p-2 rounded-lg border-2 border-[#1A1A2E] font-['Nunito'] font-bold text-xs min-h-[60px]"
                    />
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="w-8 h-8 bg-[#E83F6F] border-2 border-[#1A1A2E] rounded-lg flex items-center justify-center text-white shadow-[2px_2px_0_#1A1A2E] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 self-start"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleAddStep} className="text-brand font-black text-xs flex items-center gap-1 uppercase">+ Adım Ekle</button>
              </div>

              {/* Privacy */}
              <div className="flex items-center justify-between bg-[#FFF8F0] p-3 rounded-xl border-2 border-[#1A1A2E]">
                <div className="flex items-center gap-2">
                  {isPublic ? <Globe size={18} className="text-[#00C853]" /> : <Lock size={18} className="text-[#FF1744]" />}
                  <span className="font-['Nunito'] font-black text-xs uppercase">{isPublic ? 'Herkes Görebilir' : 'Sadece Bende Kalsın'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPublic(!isPublic)}
                  className={`w-12 h-6 rounded-full border-2 border-[#1A1A2E] relative transition-colors ${isPublic ? 'bg-[#00C853]' : 'bg-[#FF1744]'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full border border-[#1A1A2E] transition-all ${isPublic ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-brand text-white py-4 rounded-2xl border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] font-['Righteous'] text-lg active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                TARİFİ KAYDET ✨
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
