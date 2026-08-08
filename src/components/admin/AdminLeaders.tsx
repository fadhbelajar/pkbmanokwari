import { useState } from 'react';
import { useSite, Leader } from '../../context/SiteContext';
import { Plus, Edit2, Trash2, X, Save, Upload } from 'lucide-react';

export default function AdminLeaders() {
  const { leaders, addLeader, updateLeader, deleteLeader } = useSite();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Leader, 'id'>>({
    name: '',
    position: '',
    photo: '',
    bio: ''
  });

  const resetForm = () => {
    setForm({ name: '', position: '', photo: '', bio: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateLeader(editingId, form);
    } else {
      addLeader({ ...form, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleEdit = (leader: Leader) => {
    setForm({
      name: leader.name,
      position: leader.position,
      photo: leader.photo,
      bio: leader.bio
    });
    setEditingId(leader.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus pengurus ini?')) {
      deleteLeader(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Kelola Pengurus</h2>
          <p className="text-slate-500">Tambah, edit, atau hapus data pengurus</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Pengurus
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? 'Edit Pengurus' : 'Tambah Pengurus'}
              </h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto</label>
                <div className="flex items-center gap-4">
                  {form.photo ? (
                    <img src={form.photo} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">No photo</span>
                    </div>
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Upload</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                </div>
                <p className="text-xs text-slate-400 mt-1">Atau masukkan URL gambar:</p>
                <input
                  type="url"
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                  placeholder="https://..."
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan</label>
                <input
                  type="text"
                  required
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Biografi</label>
                <textarea
                  required
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
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

      {/* Leaders list */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {leaders.map((leader) => (
          <div key={leader.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex gap-4">
              <img
                src={leader.photo}
                alt={leader.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 truncate">{leader.name}</h4>
                <p className="text-sm text-primary-600">{leader.position}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{leader.bio}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleEdit(leader)}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(leader.id)}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
