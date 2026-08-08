import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, FileText, Info, Globe, Mail } from 'lucide-react';

const initialForm = {
  siteName: '',
  tagline: '',
  aboutText: '',
  vision: '',
  mission: '',
  aboutBullet1: '',
  aboutBullet2: '',
  aboutBullet3: '',
  aboutBullet4: '',
  chairmanMessage: '',
  phone: '',
  email: '',
  address: '',
  whatsappNumber: '',
  facebook: '',
  instagram: '',
  youtube: '',
  tiktok: '',
  twitter: ''
};

export default function AdminContent() {
  const { settings, updateSettings } = useSite();
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'umum' | 'profil' | 'kontak' | 'sosial'>('umum');

  const loadFromSettings = () => {
    setForm({
      siteName: settings.siteName,
      tagline: settings.tagline,
      aboutText: settings.aboutText,
      vision: settings.vision,
      mission: settings.mission.join('\n'),
      aboutBullet1: 'Organisasi politik berbasis nilai-nilai keislaman dan kebangsaan',
      aboutBullet2: 'Berkomitmen untuk memperjuangkan kepentingan rakyat Manokwari',
      aboutBullet3: 'Menjunjung tinggi demokrasi, keadilan, dan persatuan bangsa',
      aboutBullet4: 'Aktif dalam pembangunan masyarakat yang adil dan sejahtera',
      chairmanMessage: settings.chairmanMessage,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      whatsappNumber: settings.whatsappNumber,
      facebook: settings.socialMedia.facebook,
      instagram: settings.socialMedia.instagram,
      youtube: settings.socialMedia.youtube,
      tiktok: settings.socialMedia.tiktok,
      twitter: settings.socialMedia.twitter
    });
  };

  const handleSave = () => {
    updateSettings({
      siteName: form.siteName,
      tagline: form.tagline,
      aboutText: form.aboutText,
      vision: form.vision,
      mission: form.mission.split('\n').filter(m => m.trim()),
      phone: form.phone,
      email: form.email,
      address: form.address,
      whatsappNumber: form.whatsappNumber,
      socialMedia: {
        facebook: form.facebook,
        instagram: form.instagram,
        youtube: form.youtube,
        tiktok: form.tiktok,
        twitter: form.twitter
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'umum', label: 'Umum', icon: Info },
    { id: 'profil', label: 'Profil', icon: FileText },
    { id: 'kontak', label: 'Kontak', icon: Mail },
    { id: 'sosial', label: 'Media Sosial', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">CMS - Kelola Konten Website</h2>
          <p className="text-slate-500">Kelola seluruh konten website DPC PKB Manokwari</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadFromSettings}
            className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            Muat dari Pengaturan
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Tersimpan!' : 'Simpan'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 border border-green-200">
          <Save className="w-4 h-4" />
          <span className="font-medium text-sm">Semua konten telah tersimpan!</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        {activeTab === 'umum' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary-600" />
              Pengaturan Umum
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Website</label>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                placeholder="DPC PKB Manokwari"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
              />
            </div>
          </div>
        )}

        {activeTab === 'profil' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              Konten Profil
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tentang Kami</label>
              <textarea
                value={form.aboutText}
                onChange={(e) => handleInputChange('aboutText', e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
                placeholder="Deskripsi singkat tentang DPC PKB Manokwari..."
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bullet 1</label>
                <input
                  type="text"
                  value={form.aboutBullet1}
                  onChange={(e) => handleInputChange('aboutBullet1', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bullet 2</label>
                <input
                  type="text"
                  value={form.aboutBullet2}
                  onChange={(e) => handleInputChange('aboutBullet2', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bullet 3</label>
                <input
                  type="text"
                  value={form.aboutBullet3}
                  onChange={(e) => handleInputChange('aboutBullet3', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bullet 4</label>
                <input
                  type="text"
                  value={form.aboutBullet4}
                  onChange={(e) => handleInputChange('aboutBullet4', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-500 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Visi</label>
              <textarea
                value={form.vision}
                onChange={(e) => handleInputChange('vision', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
                placeholder="Visi organisasi..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Misi (pisahkan dengan Enter)</label>
              <textarea
                value={form.mission}
                onChange={(e) => handleInputChange('mission', e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
                placeholder="Misi 1&#10;Misi 2&#10;Misi 3..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sambutan Ketua</label>
              <textarea
                value={form.chairmanMessage}
                onChange={(e) => handleInputChange('chairmanMessage', e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'kontak' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary-600" />
              Informasi Kontak
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">+62</span>
                <input
                  type="tel"
                  value={form.whatsappNumber?.replace(/^62/, '') || ''}
                  onChange={(e) => {
                    const num = e.target.value.replace(/\D/g, '');
                    handleInputChange('whatsappNumber', num ? `62${num}` : '');
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                  placeholder="8xx-xxxx-xxxx"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
              <textarea
                value={form.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'sosial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-600" />
              Media Sosial
            </h3>
            {[
              { label: 'Facebook', field: 'facebook' },
              { label: 'Instagram', field: 'instagram' },
              { label: 'YouTube', field: 'youtube' },
              { label: 'TikTok', field: 'tiktok' },
              { label: 'Twitter', field: 'twitter' },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input
                  type="url"
                  value={form[field as keyof typeof form] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
