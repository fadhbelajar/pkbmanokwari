import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Camera, Play, Calendar, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export default function GaleriPage() {
  const { gallery, videoLinks } = useSite();
  const [activeTab, setActiveTab] = useState<'foto' | 'video'>('foto');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState('');

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const openLightbox = (src: string, title: string) => {
    setLightboxSrc(src);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    setLightboxTitle('');
    setLightboxOpen(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <PageHeader
        title="Galeri Kegiatan"
        subtitle="Dokumentasi momen-momen penting DPC PKB Manokwari dalam foto dan video"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Galeri' }
        ]}
        bgImage="/images/Cover_PKB_Manokwari.png"
      />

      <section className="pb-12 sm:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('foto')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'foto'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-primary-700'
                }`}
              >
                <Camera className="w-4 h-4" />
                Foto ({gallery.length})
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'video'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-primary-700'
                }`}
              >
                <Play className="w-4 h-4" />
                Video ({videoLinks.length})
              </button>
            </div>
          </div>

          {activeTab === 'foto' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(item.image, item.title)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={item.date}>{formatDate(item.date)}</time>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {gallery.length === 0 && (
                <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl">
                  <Camera className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Belum ada foto galeri tersedia</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoLinks.map((item) => {
                const youtubeId = getYouTubeId(item.url);
                const thumbnail = youtubeId
                  ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  : null;

                return (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden" onClick={() => openLightbox(`https://www.youtube.com/embed/${youtubeId}`, item.title)}>
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <Play className="w-8 h-8 text-slate-400" />
                        </div>
                      )}
                      {youtubeId && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-red-600" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}

              {videoLinks.length === 0 && (
                <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl">
                  <Play className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Belum ada video tersedia</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && lightboxSrc && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            {lightboxSrc.includes('youtube.com/embed') ? (
              <iframe
                src={lightboxSrc}
                title={lightboxTitle}
                className="w-full h-[500px] rounded-xl"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <img
                src={lightboxSrc}
                alt={lightboxTitle}
                className="w-full h-full object-contain rounded-xl"
              />
            )}
            <p className="text-center text-white mt-3 text-sm">{lightboxTitle}</p>
          </div>
        </div>
      )}
    </>
  );
}
