import { useState } from 'react';
import { useSite, Account } from '../../context/SiteContext';
import { Plus, Edit2, Trash2, X, Save, Key } from 'lucide-react';

export default function AdminAccounts() {
  const { accounts, addAccount, updateAccount, deleteAccount, resetPassword } = useSite();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetAccountId, setResetAccountId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Account, 'id'>>({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [newPassword, setNewPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const roleLabels: Record<Account['role'], string> = {
    admin: 'Administrator',
    editor: 'Editor',
    viewer: 'Viewer'
  };

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', role: 'admin' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAccount(editingId, form);
    } else {
      addAccount({ ...form, id: Date.now().toString() });
    }
    resetForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleEdit = (acc: Account) => {
    setForm({ name: acc.name, email: acc.email, password: acc.password, role: acc.role });
    setEditingId(acc.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (accounts.length <= 1) {
      alert('Tidak dapat menghapus akun terakhir. Setidaknya harus ada satu akun.');
      return;
    }
    if (confirm('Yakin ingin menghapus akun ini?')) {
      deleteAccount(id);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetAccountId && newPassword.trim()) {
      resetPassword(resetAccountId, newPassword);
      setShowResetModal(false);
      setResetAccountId(null);
      setNewPassword('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const roleColor: Record<Account['role'], string> = {
    admin: 'bg-red-100 text-red-700',
    editor: 'bg-blue-100 text-blue-700',
    viewer: 'bg-slate-100 text-slate-700'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Akun Pengguna</h2>
          <p className="text-slate-500 text-sm mt-0.5">Tambah, edit, hapus, dan reset password akun</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setShowForm(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Akun
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? 'Edit Akun' : 'Tambah Akun'}
              </h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
                  placeholder="nama@domain.com"
                />
              </div>
              {!editingId && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
                    placeholder="Masukkan password"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Peran</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Account['role'] })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
                >
                  <option value="admin">Administrator</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
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
                  {editingId ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-slate-900">Reset Password</h3>
              <button onClick={() => { setShowResetModal(false); setResetAccountId(null); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleResetPassword} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 outline-none transition-all"
                  placeholder="Masukkan password baru"
                />
              </div>
              <p className="text-xs text-slate-500">
                Password akan direset langsung. Link reset password via email dapat dikirimkan ke pengguna secara terpisah.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowResetModal(false); setResetAccountId(null); }}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
                >
                  <Key className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accounts list */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {acc.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 truncate">{acc.name}</h4>
                <p className="text-sm text-slate-500 truncate">{acc.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColor[acc.role]}`}>
                    {roleLabels[acc.role]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleEdit(acc)}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => { setResetAccountId(acc.id); setShowResetModal(true); }}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Key className="w-4 h-4" />
                Reset PW
              </button>
              <button
                onClick={() => handleDelete(acc.id)}
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
