import { useSite } from '../../context/SiteContext';
import { Users, Newspaper, Image, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { leaders, news, gallery, settings } = useSite();

  const stats = [
    { label: 'Pengurus', value: leaders.length, icon: Users, color: 'from-blue-500 to-indigo-600' },
    { label: 'Berita', value: news.length, icon: Newspaper, color: 'from-primary-500 to-green-600' },
    { label: 'Galeri', value: gallery.length, icon: Image, color: 'from-accent-500 to-orange-600' },
    { label: 'Pengunjung', value: '1,234', icon: TrendingUp, color: 'from-purple-500 to-violet-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Selamat datang di panel admin {settings.siteName}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
            </div>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Aksi Cepat</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <button className="p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-left">
            <Newspaper className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-slate-900">Tambah Berita</p>
            <p className="text-xs text-slate-500">Posting berita baru</p>
          </button>
          <button className="p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-left">
            <Users className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-slate-900">Kelola Pengurus</p>
            <p className="text-xs text-slate-500">Edit data pengurus</p>
          </button>
          <button className="p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-left">
            <Image className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-slate-900">Upload Galeri</p>
            <p className="text-xs text-slate-500">Tambah foto kegiatan</p>
          </button>
        </div>
      </div>

      {/* Recent news */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Berita Terbaru</h3>
        <div className="space-y-3">
          {news.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <img src={item.image} alt="" className="w-16 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">{item.title}</p>
                <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString('id-ID')}</p>
              </div>
              <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
