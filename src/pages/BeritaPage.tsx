import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Calendar, ArrowRight, Share2 } from 'lucide-react';

export default function BeritaPage() {
  const { news } = useSite();

  return (
    <section className="pt-16 sm:pt-20 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Berita &amp; Kegiatan
          </h1>
          <p className="text-base text-slate-500 max-w-3xl mx-auto">
            Informasi terbaru dan perkembangan terkini DPC PKB Manokwari
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link key={item.id} to={`/berita/${item.id}`} className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 overflow-hidden">
              <article className="h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                   <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                       {item.category}
                     </span>
                   </div>
                   <div className="absolute top-4 right-4">
                     <button
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         const link = `https://wa.me/?text=${encodeURIComponent(item.title + ' ' + window.location.origin + `/berita/${item.id}`)}`;
                         window.open(link, '_blank', 'noopener,noreferrer');
                       }}
                       className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                       aria-label="Share"
                     >
                       <Share2 className="w-3.5 h-3.5" />
                     </button>
                   </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm text-primary-600 font-medium">
                    <span>Baca selengkapnya</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
