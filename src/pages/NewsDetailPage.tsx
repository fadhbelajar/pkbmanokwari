import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import NewsShare from '../components/NewsShare';

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

  return (
    <section className="pt-16 sm:pt-20 pb-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Berita
        </Link>

        <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                {article.category}
              </span>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>DPC PKB Manokwari</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <NewsShare
              title={article.title}
              url={window.location.href}
              excerpt={article.excerpt}
            />

            <div
              className="prose prose-slate prose-lg max-w-none leading-relaxed text-slate-600"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split('\n')
                  .map((para) => `<p class="mb-4">${para}</p>`)
                  .join('')
              }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
