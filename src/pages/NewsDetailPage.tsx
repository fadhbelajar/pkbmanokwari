import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import NewsShare from '../components/NewsShare';
import PageHeader from '../components/PageHeader';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { news } = useSite();
  const navigate = useNavigate();

  const article = news.find((item) => item.id === id);

  if (!article) {
    navigate('/berita', { replace: true });
    return null;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const estimateReadingTime = (html: string): number => {
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').filter(w => w.length > 0).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const readingTime = estimateReadingTime(article.content);

  return (
    <>
      <PageHeader
        title={article.title}
        subtitle={article.excerpt}
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita', href: '/berita' },
          { label: article.title }
        ]}
        bgImage={article.image}
        bgGradient={false}
      />

      <article className="pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full mb-3 inline-block">
                  {article.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>DPC PKB Manokwari</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min baca</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="mb-8">
            <NewsShare
              title={article.title}
              url={window.location.href}
              excerpt={article.excerpt}
            />
          </div>

          <div
            className="prose prose-slate prose-lg max-w-none leading-relaxed text-slate-600 mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="flex items-center justify-between pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Share2 className="w-4 h-4" />
              <span>Bagikan artikel ini</span>
            </div>
            <NewsShare
              title={article.title}
              url={window.location.href}
              excerpt={article.excerpt}
            />
          </div>
        </div>
      </article>
    </>
  );
}
