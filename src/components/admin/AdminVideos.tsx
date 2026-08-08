import { useState } from 'react';
import { useSite, VideoLink } from '../../context/SiteContext';
import { Plus, Edit2, Trash2, X, Save, Play, Link2 } from 'lucide-react';

function extractVideoId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function AdminVideos() {
  const { videoLinks, addVideoLink, updateVideoLink, deleteVideoLink } = useSite();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Pick<VideoLink, 'url' | 'title'>>({ url: '', title: '' });
  const [saved, setSaved] = useState(false);

  const resetForm = () => {
    setForm({ url: '', title: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateVideoLink(editingId, { url: form.url, title: form.title });
    } else {
      addVideoLink({ ...form, id: Date.now().toString() });
    }
    resetForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleEdit = (link: VideoLink) => {
    setForm({ url: link.url, title: link.title });
    setEditingId(link.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus link video ini?')) {
      deleteVideoLink(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Video YouTube</h2>
          <p className="text-slate-500 text-sm mt-0.5">Tambah, edit, atau hapus link video YouTube untuk slider</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setShowForm(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Video
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 border border-green-200">
          <Save className="w-4 h-4" />
          <span className="font-medium text-sm">Perubahan tersimpan!</span>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? 'Edit Video' : 'Tambah Video'}
              </h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Video</label>
                <input
                  type="text"
                  autoComplete="headline"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
                  placeholder="Masukkan judul video"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL YouTube</label>
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      autoComplete="url"
                      required
                      value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                {form.url && extractVideoId(form.url) ? (
                  <p className="text-xs text-green-600 mt-1">URL valid</p>
                ) : form.url ? (
                  <p className="text-xs text-red-500 mt-1">URL YouTube tidak valid</p>
                ) : null}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={form.url && !extractVideoId(form.url) ? true : undefined}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video list */}
      <div className="space-y-3">
        {videoLinks.length === 0 ? (
          <p className="text-slate-400 text-sm py-8 text-center">Belum ada video. Tambahkan video pertama Anda.</p>
        ) : (
          videoLinks.map((link) => {
            const videoId = extractVideoId(link.url);
            return (
              <div key={link.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex-shrink-0 w-32 h-18 rounded-lg overflow-hidden relative">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={link.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <Play className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{link.title}</p>
                  <p className="text-xs text-slate-500 truncate">{link.url}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(link)}
                    className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
