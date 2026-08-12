import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { News } from '../context/SiteContext';

interface NewsCardProps {
  item: News;
  featured?: boolean;
}

export default function NewsCard({ item, featured = false }: NewsCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <article className={`group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 ${featured ? 'md:flex' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'md:w-2/5 h-48 md:h-auto' : 'h-40'}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      <div className={`p-5 ${featured ? 'md:w-3/5' : ''}`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>
        <h3 className={`font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
          {item.title}
        </h3>
        <p className={`text-slate-500 leading-relaxed mb-3 line-clamp-2 text-sm ${featured ? 'line-clamp-3' : ''}`}>
          {item.excerpt}
        </p>
        <Link
          to={`/berita/${item.id}`}
          className="inline-flex items-center gap-1.5 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors group/link"
        >
          Baca selengkapnya
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
