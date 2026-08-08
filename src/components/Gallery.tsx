import { useState } from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { useSite } from '../context/SiteContext';
import { Image, X, Calendar } from 'lucide-react';

export default function Gallery() {
  const { gallery } = useSite();
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(Math.min(gallery.length, 6));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayGallery = gallery.slice(0, 6);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <section id="galeri" className="relative py-12 sm:py-16 bg-slate-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-800 ${
              headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-3">
            <Image className="w-3.5 h-3.5 text-accent-600" />
            <span className="text-[10px] font-semibold text-accent-700 tracking-widest uppercase">Galeri Kegiatan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Dokumentasi{' '}
            <span className="gradient-text">Kegiatan Kami</span>
          </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Momen-momen penting dari berbagai kegiatan DPC PKB Manokwari.
            </p>
          </div>

          {/* Gallery grid */}
          <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {displayGallery.map((item, i) => (
              <div
                key={item.id}
                className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  revealedItems[i] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">{item.title}</h4>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
