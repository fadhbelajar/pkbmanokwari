import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="beranda" className="relative w-full bg-white pt-16 sm:pt-20">
      <div className="relative w-full">
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px]">
          <img
            src="/images/Cover_PKB_Manokwari.png"
            alt="Kegiatan partai PKB Manokwari"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center -8%' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>

        <div
          className={`absolute bottom-4 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-white text-xl sm:text-2xl md:text-3xl font-black font-sans tracking-tight">
                  UDIN RUMAKAT
                </p>
                <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-sans italic tracking-wider">
                  Ketua DPC PKB Manokwari
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/profil"
                  className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 sm:py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all duration-200 text-sm"
                >
                  Kenali Kami
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/kontak"
                  className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 sm:py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-700 transition-all duration-200 text-sm"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
