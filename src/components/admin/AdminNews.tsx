import { useState } from 'react';
import { useSite, News } from '../../context/SiteContext';
import { Plus, Edit2, Trash2, X, Save, Upload, Eye, Code } from 'lucide-react';

export default function AdminNews() {
  const { news, addNews, updateNews, deleteNews } = useSite();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<News, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Organisasi'
  });

  const categories = ['Organisasi', 'Sosial', 'Politik', 'Kaderisasi', 'Kegiatan'];
  const [showPreview, setShowPreview] = useState(false);

  const resetForm = () => {
    setForm({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Organisasi'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateNews(editingId, form);
    } else {
      addNews({ ...form, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleEdit = (item: News) => {
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      date: item.date,
      category: item.category
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      deleteNews(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Kelola Berita</h2>
          <p className="text-slate-500">Tambah, edit, atau hapus berita</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Berita
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? 'Edit Berita' : 'Tambah Berita'}
              </h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gambar</label>
                <div className="flex items-start gap-4">
                  {form.image ? (
                    <img src={form.image} alt="" className="w-32 h-20 rounded-xl object-cover" />
                  ) : (
                    <div className="w-32 h-20 rounded-xl bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">No image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 w-fit">
                      <Upload className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Upload</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    <input
                      type="url"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      placeholder="Atau masukkan URL gambar"
                      className="w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ringkasan</label>
                <textarea
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Konten Lengkap</label>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">Gunakan Enter untuk paragraf baru</span>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all ${
                      showPreview
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {showPreview ? <Code className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {showPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>
                {showPreview ? (
                  <div className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 min-h-[120px]">
                    {form.content ? (
                      <div
                        className="prose prose-sm max-w-none text-slate-700"
                        dangerouslySetInnerHTML={{
                          __html: form.content
                            .split('\n')
                            .filter((p) => p.trim())
                            .map((para) => `<p class="mb-2">${para.trim()}</p>`)
                            .join('')
                        }}
                      />
                    ) : (
                      <span className="text-slate-400">Pratinjau konten akan muncul di sini...</span>
                    )}
                  </div>
                ) : (
                  <textarea
                    required
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
                  />
                )}
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
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News list */}
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 sm:w-32 sm:h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2 hidden sm:block">{item.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
