import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  X, Settings, Users, Newspaper, Image, LogOut,
  LayoutDashboard, Lock, Eye, EyeOff, Play, Key, FileText, Database
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminSettings from './AdminSettings';
import AdminContent from './AdminContent';
import AdminLeaders from './AdminLeaders';
import AdminNews from './AdminNews';
import AdminGallery from './AdminGallery';
import AdminAccounts from './AdminAccounts';
import AdminVideos from './AdminVideos';
import AdminBackup from './AdminBackup';

interface AdminPanelProps {
  onClose: () => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'content', label: 'CMS', icon: FileText },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
  { id: 'leaders', label: 'Pengurus', icon: Users },
  { id: 'news', label: 'Berita', icon: Newspaper },
  { id: 'gallery', label: 'Galeri', icon: Image },
  { id: 'videos', label: 'Video', icon: Play },
  { id: 'accounts', label: 'Akun', icon: Key },
  { id: 'backup', label: 'Backup', icon: Database },
];

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { isAdmin, login, logout, settings } = useSite();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setPassword('');
      setError('');
    } else {
      setError('Password salah. Gunakan: admin123');
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
            <p className="text-slate-500 text-sm mt-1">{settings.siteName}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all"
            >
              Masuk
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Demo password: <code className="bg-slate-100 px-2 py-0.5 rounded">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PKB</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900">Panel Admin</h1>
              <p className="text-xs text-slate-500">{settings.siteName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Website</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-16 sm:w-64 bg-white border-r border-slate-200 flex-shrink-0">
          <nav className="p-2 sm:p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'content' && <AdminContent />}
            {activeTab === 'settings' && <AdminSettings />}
            {activeTab === 'leaders' && <AdminLeaders />}
            {activeTab === 'news' && <AdminNews />}
            {activeTab === 'gallery' && <AdminGallery />}
            {activeTab === 'videos' && <AdminVideos />}
            {activeTab === 'accounts' && <AdminAccounts />}
            {activeTab === 'backup' && <AdminBackup />}
          </div>
        </main>
      </div>
    </div>
  );
}
