import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import {
  HeartPulse,
  Baby,
  BookOpen,
  Users,
  Shield,
  BarChart3,
  Stethoscope,
  HandHeart,
} from 'lucide-react';

const features = [
  {
    icon: HeartPulse,
    title: 'Kesehatan Reproduksi',
    description: 'Layanan konsultasi dan edukasi kesehatan reproduksi untuk masyarakat Manokwari.',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
  },
  {
    icon: Baby,
    title: 'Keluarga Berencana',
    description: 'Program KB berkualitas dengan berbagai metode kontrasepsi yang aman dan terjangkau.',
    color: 'from-primary-500 to-primary-600',
    bgLight: 'bg-primary-50',
  },
  {
    icon: BookOpen,
    title: 'Edukasi Masyarakat',
    description: 'Penyuluhan dan pelatihan untuk meningkatkan kesadaran masyarakat tentang keluarga sejahtera.',
    color: 'from-accent-500 to-emerald-600',
    bgLight: 'bg-accent-50',
  },
  {
    icon: Users,
    title: 'Pembinaan Keluarga',
    description: 'Pendampingan keluarga dalam membangun rumah tangga yang harmonis dan berkualitas.',
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
  },
  {
    icon: Shield,
    title: 'Perlindungan Anak',
    description: 'Program perlindungan dan pemberdayaan anak untuk generasi masa depan yang lebih baik.',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
  },
  {
    icon: BarChart3,
    title: 'Data Kependudukan',
    description: 'Pengelolaan data kependudukan yang akurat untuk perencanaan pembangunan daerah.',
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50',
  },
  {
    icon: Stethoscope,
    title: 'Konsultasi Kesehatan',
    description: 'Layanan konsultasi gratis dengan tenaga kesehatan profesional untuk masyarakat.',
    color: 'from-teal-500 to-green-600',
    bgLight: 'bg-teal-50',
  },
  {
    icon: HandHeart,
    title: 'Bantuan Sosial',
    description: 'Program bantuan sosial untuk keluarga prasejahtera di Kabupaten Manokwari.',
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50',
  },
];

export default function Features() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(features.length);

  return (
    <section id="layanan" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
            <HeartPulse className="w-4 h-4 text-primary-600" />
            <span className="text-xs font-semibold text-primary-700 tracking-wide uppercase">Layanan Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Layanan Terbaik untuk{' '}
            <span className="gradient-text">Masyarakat Manokwari</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Kami berkomitmen memberikan layanan berkualitas tinggi dalam pengendalian penduduk dan keluarga berencana untuk kesejahteraan masyarakat.
          </p>
        </div>

        {/* Features grid */}
        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group relative p-6 sm:p-7 rounded-2xl bg-white border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 cursor-default ${
                revealedItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-xl ${feature.bgLight} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: 'inherit' }} />
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom line accent */}
              <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
