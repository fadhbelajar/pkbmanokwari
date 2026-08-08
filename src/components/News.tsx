import { Link } from 'react-router-dom';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { useSite } from '../context/SiteContext';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

export default function News() {
  const { news } = useSite();
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(Math.min(news.length, 3));

  const displayNews = news.slice(0, 3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="berita" className="relative py-12 sm:py-16 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-3">
            <Newspaper className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-[10px] font-semibold text-primary-700 tracking-widest uppercase">Berita &amp; Kegiatan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Berita{' '}
            <span className="gradient-text">Terkini</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Ikuti perkembangan terbaru kegiatan dan program DPC PKB Manokwari.
          </p>
        </div>

        {/* News grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayNews.map((item, i) => (
            <article
              key={item.id}
              className={`group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-200 transition-all duration-500 ${
                revealedItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <Link
                  to={`/berita/${item.id}`}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group/btn"
                >
                  Baca selengkapnya
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {news.length > 3 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-all duration-300">
              Lihat Semua Berita
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
