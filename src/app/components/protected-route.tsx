import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-bounce">
          <div className="w-16 h-16 bg-[#FF6B00] border-[4px] border-[#1A1A2E] flex items-center justify-center rotate-12 shadow-[4px_4px_0px_0px_#1A1A2E]">
            <span className="text-2xl font-black">L</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
