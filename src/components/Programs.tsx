import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { 
  Landmark, Users, BookOpen, Heart, Shield, Leaf, Building2, HandHeart 
} from 'lucide-react';

const programs = [
  {
    icon: Landmark,
    title: 'Politik Bersih',
    description: 'Mewujudkan politik yang bersih, jujur, dan bebas dari praktik korupsi untuk membangun kepercayaan rakyat.',
    color: 'from-primary-500 to-primary-600',
    bgLight: 'bg-primary-50',
  },
  {
    icon: Users,
    title: 'Pemberdayaan Masyarakat',
    description: 'Program pemberdayaan ekonomi dan sosial untuk meningkatkan kesejahteraan masyarakat Manokwari.',
    color: 'from-accent-500 to-amber-600',
    bgLight: 'bg-accent-50',
  },
  {
    icon: BookOpen,
    title: 'Pendidikan Berkualitas',
    description: 'Mendorong akses pendidikan yang merata dan berkualitas bagi seluruh anak-anak Manokwari.',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
  },
  {
    icon: Heart,
    title: 'Kesehatan Rakyat',
    description: 'Memperjuangkan layanan kesehatan yang terjangkau dan berkualitas untuk semua lapisan masyarakat.',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
  },
  {
    icon: Shield,
    title: 'Perlindungan HAM',
    description: 'Menegakkan hak asasi manusia dan melindungi hak-hak masyarakat adat Papua.',
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
  },
  {
    icon: Leaf,
    title: 'Lingkungan Lestari',
    description: 'Menjaga kelestarian alam Papua dan mendorong pembangunan yang berkelanjutan.',
    color: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50',
  },
  {
    icon: Building2,
    title: 'Infrastruktur Merata',
    description: 'Mendorong pembangunan infrastruktur yang merata hingga ke pelosok Manokwari.',
    color: 'from-cyan-500 to-teal-600',
    bgLight: 'bg-cyan-50',
  },
  {
    icon: HandHeart,
    title: 'Kerukunan Umat',
    description: 'Menjaga kerukunan antar umat beragama dan melestarikan nilai-nilai kearifan lokal.',
    color: 'from-orange-500 to-red-600',
    bgLight: 'bg-orange-50',
  },
];

export default function Programs() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(programs.length);

  return (
    <section id="program" className="relative py-12 sm:py-16 bg-slate-50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-3">
            <Landmark className="w-3.5 h-3.5 text-accent-600" />
            <span className="text-[10px] font-semibold text-accent-700 tracking-widest uppercase">Program Unggulan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Program{' '}
            <span className="gradient-text">Perjuangan Kami</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Berbagai program nyata yang kami perjuangkan untuk kesejahteraan dan kemajuan masyarakat Kabupaten Manokwari.
          </p>
        </div>

        {/* Programs grid */}
        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {programs.map((program, i) => (
            <div
              key={i}
              className={`group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 cursor-default ${
                revealedItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-xl ${program.bgLight} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <program.icon className={`w-6 h-6 text-primary-600`} />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                {program.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {program.description}
              </p>

              {/* Bottom line accent */}
              <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
