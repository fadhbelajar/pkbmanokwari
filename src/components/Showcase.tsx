import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const programs = [
  {
    title: 'Program Kampung KB',
    description: 'Program unggulan nasional yang mengintegrasikan layanan KB dengan pembangunan desa untuk meningkatkan kesejahteraan masyarakat Manokwari.',
    image: 'https://images.pexels.com/photos/36266214/pexels-photo-36266214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    features: [
      'Pemberdayaan masyarakat desa',
      'Integrasi layanan kesehatan',
      'Pendampingan keluarga',
      'Pelatihan keterampilan',
    ],
    stats: { value: '29', label: 'Distrik Aktif' },
    reversed: false,
  },
  {
    title: 'Posyandu & Layanan Kesehatan',
    description: 'Jaringan Posyandu yang tersebar di seluruh Kabupaten Manokwari untuk memastikan setiap keluarga mendapat akses kesehatan berkualitas.',
    image: 'https://images.pexels.com/photos/36633133/pexels-photo-36633133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    features: [
      'Pemeriksaan kesehatan rutin',
      'Imunisasi lengkap',
      'Konsultasi gizi anak',
      'Pelayanan KB gratis',
    ],
    stats: { value: '150+', label: 'Pos Layanan' },
    reversed: true,
  },
  {
    title: 'Edukasi & Pembinaan Remaja',
    description: 'Program edukasi komprehensif untuk remaja Manokwari tentang kesehatan reproduksi, perencanaan masa depan, dan pembentukan karakter.',
    image: 'https://images.pexels.com/photos/34082714/pexels-photo-34082714.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    features: [
      'PIK Remaja (Pusat Informasi & Konseling)',
      'Pelatihan kepemimpinan',
      'Program Genre (Generasi Berencana)',
      'Workshop keterampilan hidup',
    ],
    stats: { value: '5000+', label: 'Remaja Terjangkau' },
    reversed: false,
  },
];

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const { ref, isRevealed } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } transition-all duration-1000`}
    >
      {/* Image */}
      <div className={`relative ${program.reversed ? 'lg:order-2' : ''}`}>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10 group">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-[300px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

          {/* Stats overlay */}
          <div className="absolute bottom-4 right-4">
            <div className="glass rounded-xl px-5 py-3">
              <div className="text-2xl font-extrabold text-slate-900">{program.stats.value}</div>
              <div className="text-xs text-slate-600 font-medium">{program.stats.label}</div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className={`absolute -z-10 ${program.reversed ? '-left-4' : '-right-4'} -bottom-4 w-full h-full rounded-3xl bg-gradient-to-br from-primary-100/60 to-accent-100/60`} />
      </div>

      {/* Content */}
      <div className={`space-y-6 ${program.reversed ? 'lg:order-1' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100">
          <Sparkles className="w-3.5 h-3.5 text-primary-600" />
          <span className="text-xs font-semibold text-primary-700">Program #{index + 1}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {program.title}
        </h3>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {program.description}
        </p>

        <div className="space-y-3">
          {program.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 group/item">
              <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
              <span className="text-sm sm:text-base text-slate-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <a
          href="#kontak"
          className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200 group/link"
        >
          Pelajari selengkapnya
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}

export default function Showcase() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();

  return (
    <section id="program" className="relative py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-24 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-100 mb-6">
            <Sparkles className="w-4 h-4 text-accent-600" />
            <span className="text-xs font-semibold text-accent-700 tracking-wide uppercase">Program Unggulan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Program yang{' '}
            <span className="gradient-text">Mengubah Kehidupan</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Setiap program dirancang untuk memberikan dampak nyata bagi masyarakat Kabupaten Manokwari dalam mewujudkan keluarga sejahtera.
          </p>
        </div>

        {/* Programs */}
        <div className="space-y-20 sm:space-y-28">
          {programs.map((program, i) => (
            <ProgramCard key={i} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
