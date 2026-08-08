import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { TrendingUp, Heart, Shield, Lightbulb, Globe2, Handshake } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Peningkatan Kualitas Hidup',
    description: 'Program kami terbukti meningkatkan kualitas hidup keluarga di Manokwari melalui pendekatan holistik.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Heart,
    title: 'Keluarga Sehat & Bahagia',
    description: 'Akses mudah ke layanan kesehatan reproduksi dan konsultasi keluarga untuk kehidupan yang lebih harmonis.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Shield,
    title: 'Perlindungan Menyeluruh',
    description: 'Jaminan perlindungan bagi ibu, anak, dan keluarga melalui program-program yang terstruktur.',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: Lightbulb,
    title: 'Edukasi Berkelanjutan',
    description: 'Program edukasi berkelanjutan yang memberdayakan masyarakat dengan pengetahuan kesehatan.',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    icon: Globe2,
    title: 'Akses Digital',
    description: 'Layanan digital yang memudahkan masyarakat mengakses informasi dan layanan kapan saja.',
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    icon: Handshake,
    title: 'Kolaborasi Komunitas',
    description: 'Kerja sama erat dengan komunitas lokal untuk program yang sesuai kebutuhan masyarakat.',
    gradient: 'from-purple-500 to-violet-600',
  },
];

export default function Benefits() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(benefits.length);

  return (
    <section id="tentang" className="relative py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
            <Heart className="w-4 h-4 text-accent-400" />
            <span className="text-xs font-semibold text-accent-300 tracking-wide uppercase">Mengapa DPCPKB?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Manfaat Nyata untuk{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
              Keluarga Anda
            </span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Bergabung dengan program DPCPKB Manokwari berarti investasi untuk masa depan keluarga yang lebih cerah.
          </p>
        </div>

        {/* Benefits grid */}
        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`group relative p-7 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-default ${
                revealedItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                {benefit.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
