import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Award, Gavel, Users, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function ProfilPage() {
  const { settings, leaders } = useSite();
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'pengurus' | 'sambutan'>('visi-misi');

  const ketua = leaders.find(l => l.position.toLowerCase().includes('ketua dpc'));
  const dewanSyuro = leaders.filter(l => l.position.toLowerCase().includes('dewan syuro'));
  const struktur = leaders.filter(l => !l.position.toLowerCase().includes('dewan syuro'));

  return (
    <>
      <PageHeader
        title="Profil DPC PKB Manokwari"
        subtitle="Mengenal lebih dekat dengan Partai Kebangkitan Bangsa Kabupaten Manokwari"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil' }
        ]}
        bgImage="/images/Cover_PKB_Manokwari.png"
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <nav className="flex lg:flex-col bg-slate-50 rounded-xl p-2 shadow-sm overflow-x-auto lg:overflow-visible">
              <button
                onClick={() => setActiveTab('visi-misi')}
                className={`flex items-center justify-center lg:justify-start gap-3 px-5 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === 'visi-misi'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <FileText className="w-4 h-4" />
                Visi & Misi
              </button>
              <button
                onClick={() => setActiveTab('pengurus')}
                className={`flex items-center justify-center lg:justify-start gap-3 px-5 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === 'pengurus'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Users className="w-4 h-4" />
                Pengurus
              </button>
              <button
                onClick={() => setActiveTab('sambutan')}
                className={`flex items-center justify-center lg:justify-start gap-3 px-5 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === 'sambutan'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Award className="w-4 h-4" />
                Sambutan Ketua
              </button>
            </nav>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {activeTab === 'visi-misi' && (
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <Gavel className="w-6 h-6 text-primary-600" />
                    Visi & Misi DPC PKB Manokwari
                  </h2>
                  <p className="text-slate-500 mb-8">Arah dan tujuan perjuangan kami demi Manokwari</p>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Gavel className="w-4 h-4 text-primary-600" />
                      </div>
                      Visi
                    </h3>
                    <p className="text-slate-700 leading-relaxed ml-10">
                      {settings.vision}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-accent-600" />
                      </div>
                      Misi
                    </h3>
                    <ul className="space-y-3 ml-10">
                      {settings.mission.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                            {i + 1}
                          </span>
                          <p className="text-slate-700 leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pengurus' && (
              <div className="p-6 sm:p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary-600" />
                  Struktur Pengurus DPC PKB Manokwari
                </h2>

                {dewanSyuro.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                      Dewan Syuro
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dewanSyuro.sort((a, b) => (a.order || 0) - (b.order || 0)).map((leader) => (
                        <div key={leader.id} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                          <div className="relative w-24 h-24 mx-auto mb-3 rounded-xl overflow-hidden border-4 border-white shadow-md">
                            {leader.photo ? (
                              <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                  {leader.name.split(' ')[0]?.[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-900 mb-1 text-sm">{leader.name}</h4>
                          <p className="text-xs text-primary-600 mb-1">{leader.position}</p>
                          <p className="text-xs text-slate-500 line-clamp-2">{leader.bio}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                    Struktur DPC
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {struktur.sort((a, b) => (a.order || 0) - (b.order || 0)).map((leader) => (
                      <div key={leader.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
                        <div className="relative w-24 h-24 mx-auto mb-3 rounded-xl overflow-hidden border-4 border-white shadow-md">
                          {leader.photo ? (
                            <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                              <span className="text-white font-bold text-xl">
                                {leader.name.split(' ')[0]?.[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1 text-sm">{leader.name}</h4>
                        <p className="text-xs text-primary-600 mb-1">{leader.position}</p>
                        {leader.bio && (
                          <p className="text-xs text-slate-500 line-clamp-2">{leader.bio}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sambutan' && (
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-4 mb-6">
                    <Award className="w-8 h-8 text-primary-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Sambutan Ketua DPC PKB Manokwari</h2>
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                    {ketua?.photo ? (
                      <img src={ketua.photo} alt={ketua.name} className="w-32 h-32 rounded-2xl object-cover object-top border-4 border-white shadow-lg" />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-white font-bold text-3xl">
                          {ketua?.name?.split(' ')[0]?.[0] || 'PKB'}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{ketua?.name || settings.chairmanName}</h3>
                      <p className="text-primary-600 text-sm">{ketua?.position || settings.chairmanPosition}</p>
                    </div>
                  </div>

                  <div className="prose prose-slate prose-lg max-w-none leading-relaxed text-slate-600">
                    <div dangerouslySetInnerHTML={{
                      __html: (ketua?.bio || settings.chairmanMessage)
                        .split('\n')
                        .filter((p) => p.trim())
                        .map((para) => `<p class="mb-4">${para.trim()}</p>`)
                        .join('')
                    }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
