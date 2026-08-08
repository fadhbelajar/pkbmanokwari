import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSite } from '../context/SiteContext';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export default function About() {
  const { settings } = useSite();
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();

  return (
    <section id="tentang" className="relative py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Rapat pengurus PKB Manokwari"
                className="w-full h-[260px] sm:h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-[10px] font-semibold text-primary-700 tracking-widest uppercase">
                Tentang Kami
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Mengenal{' '}
              <span className="gradient-text">{settings.siteName}</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {settings.aboutText}
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                'Organisasi politik berbasis nilai-nilai keislaman dan kebangsaan',
                'Berkomitmen untuk memperjuangkan kepentingan rakyat Manokwari',
                'Menjunjung tinggi demokrasi, keadilan, dan persatuan bangsa',
                'Aktif dalam pembangunan masyarakat yang adil dan sejahtera'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
