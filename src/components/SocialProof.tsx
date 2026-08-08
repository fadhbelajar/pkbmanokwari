import { useCountUp } from '../hooks/useScrollReveal';
import { Users, Building2, MapPin, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: 200000, suffix: '+', label: 'Masyarakat Terlayani', color: 'from-primary-500 to-primary-600' },
  { icon: Building2, value: 29, suffix: '', label: 'Distrik Terjangkau', color: 'from-accent-500 to-accent-600' },
  { icon: MapPin, value: 150, suffix: '+', label: 'Pos Pelayanan KB', color: 'from-warm-500 to-orange-500' },
  { icon: Award, value: 12, suffix: '', label: 'Penghargaan Nasional', color: 'from-purple-500 to-violet-600' },
];

function StatCard({ icon: Icon, value, suffix, label, color }: typeof stats[0]) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="group relative text-center p-6 sm:p-8">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
        {count.toLocaleString('id-ID')}{suffix}
      </div>
      <div className="text-sm text-slate-500 font-medium">{label}</div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners ribbon */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-6">
            Dipercaya oleh Instansi & Mitra
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50">
            {['Kemenkes RI', 'BKKBN', 'Pemda Manokwari', 'WHO', 'UNICEF'].map((partner) => (
              <div
                key={partner}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold">{partner.split(' ')[0][0]}</span>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-400"
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
