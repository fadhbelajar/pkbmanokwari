import { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import { Search, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';

const CATEGORIES = ['Semua', 'Organisasi', 'Sosial', 'Politik', 'Kaderisasi', 'Kegiatan'];
const ITEMS_PER_PAGE = 9;

export default function BeritaPage() {
  const { news } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {
    let result = news;

    if (activeCategory !== 'Semua') {
      result = result.filter(item => item.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term)
      );
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [news, activeCategory, searchTerm]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <>
      <PageHeader
        title="Berita & Kegiatan"
        subtitle="Informasi terbaru dan perkembangan terkini DPC PKB Manokwari"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita & Kegiatan' }
        ]}
        bgImage="/images/Cover_PKB_Manokwari.png"
      />

      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Cari berita..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {searchTerm && (
              <p className="text-sm text-slate-500 mt-3">
                Ditemukan <strong>{filteredNews.length}</strong> berita untuk "{searchTerm}"
              </p>
            )}
          </div>

          {paginatedNews.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedNews.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12 py-6 border-t border-slate-100">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </button>

                  <span className="text-sm text-slate-500">
                    Halaman {currentPage} dari {totalPages}
                  </span>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === totalPages
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Tidak ada berita ditemukan</h3>
              <p className="text-slate-500">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
