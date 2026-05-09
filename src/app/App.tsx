import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Toaster } from 'sonner';
import '../styles/fonts.css';
import '../styles/theme.css';

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <DataProvider>
          <Toaster position="top-center" richColors />
          <RouterProvider router={router} />
        </DataProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
