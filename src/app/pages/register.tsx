import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, ArrowLeft, Heart } from 'lucide-react';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E83F6F] p-6 flex flex-col justify-center items-center font-['Nunito'] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 text-[#FFD600] opacity-20 -rotate-12">
        <Heart size={120} fill="currentColor" />
      </div>

      <div className="w-full max-w-[320px] bg-white border-[4px] border-[#1A1A2E] shadow-[8px_8px_0px_0px_#1A1A2E] p-8 relative z-10">
        <Link 
          to="/login" 
          className="absolute -top-4 -left-4 w-10 h-10 bg-[#FFD600] border-[3px] border-[#1A1A2E] flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A2E] hover:-translate-y-1 transition-transform"
        >
          <ArrowLeft size={20} className="text-[#1A1A2E]" />
        </Link>

        <div className="mb-6">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tighter leading-none">
            YENİ BİR<br />
            <span className="text-brand">HESAP</span> AÇ
          </h2>
          <p className="text-sm font-bold text-[#1A1A2E]/60 mt-2 uppercase tracking-tight">Lezzet dünyasına ilk adımı at!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[#1A1A2E]">Adın Soyadın</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A2E]" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FFF8F0] border-[3px] border-[#1A1A2E] focus:outline-none focus:ring-4 focus:ring-[#FFD600]/30 transition-all font-bold text-[#1A1A2E] text-sm"
                placeholder="Örn: Lezzet Sever"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[#1A1A2E]">E-posta Adresin</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A2E]" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FFF8F0] border-[3px] border-[#1A1A2E] focus:outline-none focus:ring-4 focus:ring-[#FFD600]/30 transition-all font-bold text-[#1A1A2E] text-sm"
                placeholder="lezzet@tat.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[#1A1A2E]">Şifre Belirle</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A2E]" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FFF8F0] border-[3px] border-[#1A1A2E] focus:outline-none focus:ring-4 focus:ring-[#FFD600]/30 transition-all font-bold text-[#1A1A2E] text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A1A2E] text-white py-4 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#E83F6F] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? 'Hesabın Hazırlanıyor...' : (
              <>
                <UserPlus size={18} />
                ÜYE OL VE BAŞLA
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-[10px] font-bold text-center text-[#1A1A2E]/60 leading-tight">
          Kayıt olarak <span className="underline">Kullanım Koşulları</span> ve <span className="underline">Gizlilik Politikasını</span> kabul etmiş sayılırsın.
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <div className="w-8 h-1 bg-[#1A1A2E]" />
        <p className="text-xs font-black uppercase text-white tracking-widest">LEZZETTAT</p>
        <div className="w-8 h-1 bg-[#1A1A2E]" />
      </div>
    </div>
  );
}
