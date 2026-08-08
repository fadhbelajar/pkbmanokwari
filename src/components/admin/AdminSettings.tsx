import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, Upload, X, Plus, Trash2 } from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useSite();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [newMission, setNewMission] = useState('');

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChairmanPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, chairmanPhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addMission = () => {
    if (newMission.trim()) {
      setForm({ ...form, mission: [...form.mission, newMission.trim()] });
      setNewMission('');
    }
  };

  const removeMission = (index: number) => {
    setForm({ ...form, mission: form.mission.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pengaturan Website</h2>
          <p className="text-slate-500">Kelola informasi dan tampilan website</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            saved
              ? 'bg-green-100 text-green-700'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Tersimpan!' : 'Simpan'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Informasi Dasar</h3>
          
          {/* Logo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Logo</label>
            <div className="flex items-center gap-4">
              {form.logo ? (
                <div className="relative">
                  <img src={form.logo} alt="Logo" className="w-16 h-16 rounded-xl object-contain border" />
                  <button
                    onClick={() => setForm({ ...form, logo: '' })}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-400 text-xs">No logo</span>
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                <Upload className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">Upload Logo</span>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Website</label>
                <input
                  type="text"
                  autoComplete="organization"
                  value={form.siteName}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  autoComplete="subtitle"
                  value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tentang</label>
              <textarea
                autoComplete="off"
                value={form.aboutText}
                onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Kontak</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
                <input
                  type="text"
                  autoComplete="tel"
                  value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
              <textarea
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">+62</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={form.whatsappNumber?.replace(/^62/, '') || ''}
                  onChange={(e) => {
                    const num = e.target.value.replace(/\D/g, '');
                    setForm({ ...form, whatsappNumber: num ? `62${num}` : '' });
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  placeholder="8xx-xxxx-xxxx"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Nomor WhatsApp admin untuk chat widget</p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Visi</h3>
          <textarea
            autoComplete="off"
            value={form.vision}
            onChange={(e) => setForm({ ...form, vision: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
          />
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Misi</h3>
          <div className="space-y-2 mb-4">
            {form.mission.map((m, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600 flex-1">{m}</span>
                <button onClick={() => removeMission(i)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
              <input
                type="text"
                autoComplete="off"
                value={newMission}
              onChange={(e) => setNewMission(e.target.value)}
              placeholder="Tambah misi baru..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && addMission()}
            />
            <button
              onClick={addMission}
              className="px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sambutan Ketua */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Sambutan Ketua</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-6">
              <div>
                {form.chairmanPhoto ? (
                  <div className="relative">
                    <img src={form.chairmanPhoto} alt="Foto Ketua" className="w-20 h-20 rounded-2xl object-cover border" />
                    <button
                      onClick={() => setForm({ ...form, chairmanPhoto: '' })}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 text-xs">No photo</span>
                  </div>
                )}
                <label className="flex items-center gap-2 px-3 py-1.5 mt-2 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-600">Upload Foto</span>
                  <input type="file" accept="image/*" onChange={handleChairmanPhotoChange} className="hidden" />
                </label>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Ketua</label>
                   <input
                     type="text"
                     autoComplete="name"
                     value={form.chairmanName}
                    onChange={(e) => setForm({ ...form, chairmanName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan</label>
                   <input
                     type="text"
                     autoComplete="job-title"
                     value={form.chairmanPosition}
                    onChange={(e) => setForm({ ...form, chairmanPosition: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pesan Sambutan</label>
              <textarea
                autoComplete="off"
                value={form.chairmanMessage}
                onChange={(e) => setForm({ ...form, chairmanMessage: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Media Sosial</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Facebook</label>
                <input
                  type="url"
                  autoComplete="url"
                  value={form.socialMedia.facebook}
                onChange={(e) => setForm({ ...form, socialMedia: { ...form.socialMedia, facebook: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Instagram</label>
                <input
                  type="url"
                  autoComplete="url"
                  value={form.socialMedia.instagram}
                onChange={(e) => setForm({ ...form, socialMedia: { ...form.socialMedia, instagram: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">YouTube</label>
                <input
                  type="url"
                  autoComplete="url"
                  value={form.socialMedia.youtube}
                onChange={(e) => setForm({ ...form, socialMedia: { ...form.socialMedia, youtube: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Twitter</label>
               <input
                 type="url"
                 autoComplete="url"
                 value={form.socialMedia.twitter}
                onChange={(e) => setForm({ ...form, socialMedia: { ...form.socialMedia, twitter: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">TikTok</label>
                <input
                  type="url"
                  autoComplete="url"
                  value={form.socialMedia.tiktok || ''}
                onChange={(e) => setForm({ ...form, socialMedia: { ...form.socialMedia, tiktok: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
