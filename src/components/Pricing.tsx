import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Layanan Dasar',
    description: 'Layanan KB dasar untuk semua masyarakat Manokwari',
    price: 'GRATIS',
    sub: 'Untuk seluruh masyarakat',
    features: [
      'Konsultasi KB dasar',
      'Alat kontrasepsi standar',
      'Pemeriksaan kesehatan rutin',
      'Penyuluhan kesehatan',
      'Kartu peserta KB',
    ],
    highlight: false,
    cta: 'Daftar Sekarang',
    gradient: 'from-slate-600 to-slate-700',
  },
  {
    name: 'Program Kampung KB',
    description: 'Program komprehensif untuk pembangunan desa',
    price: 'GRATIS',
    sub: 'Program prioritas nasional',
    features: [
      'Semua layanan dasar',
      'Pelatihan keterampilan',
      'Pemberdayaan ekonomi',
      'Pendampingan intensif',
      'Bantuan alat & sarana',
      'Akses program nasional',
      'Monitoring berkala',
    ],
    highlight: true,
    cta: 'Gabung Program',
    gradient: 'from-primary-600 to-primary-700',
  },
  {
    name: 'Layanan Khusus',
    description: 'Layanan spesialis untuk kebutuhan tertentu',
    price: 'GRATIS',
    sub: 'Dengan rujukan dokter',
    features: [
      'Semua layanan dasar',
      'Konsultasi spesialis',
      'KB metode jangka panjang',
      'Pemeriksaan laboratorium',
      'Penanganan efek samping',
      'Follow-up rutin',
    ],
    highlight: false,
    cta: 'Konsultasi Dulu',
    gradient: 'from-accent-600 to-accent-700',
  },
];

export default function Pricing() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(plans.length, 0.1);

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-100 mb-6">
            <Sparkles className="w-4 h-4 text-accent-600" />
            <span className="text-xs font-semibold text-accent-700 tracking-wide uppercase">Layanan & Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Semua Layanan{' '}
            <span className="gradient-text">100% Gratis</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Seluruh layanan DPCPKB Manokwari tersedia gratis untuk masyarakat. Kami berkomitmen bahwa tidak ada biaya yang dibebankan kepada peserta program.
          </p>
        </div>

        {/* Plans */}
        <div ref={containerRef} className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl transition-all duration-700 ${
                revealedItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                plan.highlight
                  ? 'bg-gradient-to-b from-primary-600 to-primary-800 text-white shadow-2xl shadow-primary-500/30 scale-[1.02] lg:scale-105 z-10'
                  : 'bg-white border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-warm-400 text-slate-900 text-xs font-bold rounded-full shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Paling Populer
                  </div>
                </div>
              )}

              <div className="p-7 sm:p-8">
                <h3 className={`text-lg font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-primary-200' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  <p className={`text-xs mt-1 ${plan.highlight ? 'text-primary-200' : 'text-slate-400'}`}>
                    {plan.sub}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Check className={`w-4.5 h-4.5 flex-shrink-0 ${plan.highlight ? 'text-accent-300' : 'text-accent-500'}`} />
                      <span className={`text-sm ${plan.highlight ? 'text-primary-100' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#kontak"
                  className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-white text-primary-700 hover:bg-primary-50 shadow-lg'
                      : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg`
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
