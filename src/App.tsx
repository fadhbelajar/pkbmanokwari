import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppChatWidget from './components/WhatsAppChatWidget';
import AdminPanel from './components/admin/AdminPanel';
import HomePage from './pages/HomePage';
import ProfilPage from './pages/ProfilPage';
import BeritaPage from './pages/BeritaPage';
import NewsDetailPage from './pages/NewsDetailPage';
import GaleriPage from './pages/GaleriPage';
import KontakPage from './pages/KontakPage';

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          return true;
        }
      }
      return false;
    };

    if (!handleHashScroll()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return null;
}

function AppContent() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return (
      <AdminPanel onClose={() => setShowAdmin(false)} />
    );
  }

  return (
    <>
      <Navbar />
      <ScrollHandler />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/berita/:id" element={<NewsDetailPage />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/kontak" element={<KontakPage />} />
        </Routes>
      </main>
      <Footer onAdminClick={() => setShowAdmin(true)} />
      <WhatsAppChatWidget />
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white text-slate-900 antialiased">
          <AppContent />
        </div>
      </BrowserRouter>
    </SiteProvider>
  );
}
