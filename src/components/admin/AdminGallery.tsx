import { useState } from 'react';
import { useSite, GalleryItem } from '../../context/SiteContext';
import { Plus, Trash2, X, Save, Upload } from 'lucide-react';

export default function AdminGallery() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useSite();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  const resetForm = () => {
    setForm({
      title: '',
      image: '',
      date: new Date().toISOString().split('T')[0]
    });
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
    addGalleryItem({ ...form, id: Date.now().toString() });
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      deleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Kelola Galeri</h2>
          <p className="text-slate-500">Tambah atau hapus foto galeri</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Foto
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-slate-900">Tambah Foto Galeri</h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto</label>
                <div className="space-y-3">
                  {form.image ? (
                    <img src={form.image} alt="" className="w-full h-48 rounded-xl object-cover" />
                  ) : (
                    <div className="w-full h-48 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200">
                      <span className="text-slate-400">Belum ada foto</span>
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 w-full">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Upload Foto</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  <input
                    type="url"
                    autoComplete="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="Atau masukkan URL gambar"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul/Keterangan</label>
                <input
                  type="text"
                  autoComplete="off"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                  placeholder="Contoh: Musyawarah Cabang 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                <input
                  type="date"
                  autoComplete="off"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                />
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
                  disabled={!form.image}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                <p className="text-white/70 text-xs">
                  {new Date(item.date).toLocaleDateString('id-ID')}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500">Belum ada foto di galeri</p>
        </div>
      )}
    </div>
  );
}
