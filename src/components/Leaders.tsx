import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { useSite, Leader } from '../context/SiteContext';
import { Users, Crown, Award } from 'lucide-react';
import { useMemo } from 'react';

export default function Leaders() {
  const { leaders } = useSite();
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const syuroStagger = useStaggerReveal(3);
  const dpcStagger = useStaggerReveal(leaders.length);

  const syuroLeaders = useMemo(
    () => leaders
      .filter((l) => l.position.includes('Dewan Syuro'))
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [leaders]
  );
  const dpcLeaders = useMemo(
    () => leaders
      .filter((l) => !l.position.includes('Dewan Syuro'))
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [leaders]
  );

  return (
    <section id="pengurus" className="relative py-12 sm:py-16 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-3">
            <Users className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-[10px] font-semibold text-primary-700 tracking-widest uppercase">
              Struktur Pengurus
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Pengurus{' '}
            <span className="gradient-text">DPC PKB Manokwari</span>
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Jajaran pengurus yang berdedikasi untuk memimpin dan mengembangkan partai demi kepentingan rakyat Manokwari.
          </p>
        </div>

        <LeaderSection
          title="Dewan Syuro"
          icon={Crown}
          leaders={syuroLeaders}
          containerRef={syuroStagger.containerRef}
          revealedItems={syuroStagger.revealedItems}
          layout="compact"
        />

        <LeaderSection
          title="Struktur DPC"
          icon={Users}
          leaders={dpcLeaders}
          containerRef={dpcStagger.containerRef}
          revealedItems={dpcStagger.revealedItems}
          layout="standard"
        />
      </div>
    </section>
  );
}

function LeaderSection({
  title,
  icon: Icon,
  leaders,
  containerRef,
  revealedItems,
  layout
}: {
  title: string;
  icon: React.ElementType;
  leaders: Leader[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  revealedItems: boolean[];
  layout: 'compact' | 'standard';
}) {
  if (leaders.length === 0) return null;

  const getPositionTier = (position: string): 'ketua' | 'wakil' | 'bidang' | 'other' => {
    const pos = position.toLowerCase();
    if (pos.includes('ketua')) return 'ketua';
    if (pos.includes('wakil')) return 'wakil';
    if (pos.includes('bidang') || pos.includes('koordinator') || pos.includes('sekretaris') || pos.includes('bendahara')) return 'bidang';
    return 'other';
  };

  return (
    <div className="mb-10 last:mb-0" ref={containerRef}>
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
        <Icon className="w-4 h-4 text-primary-600" />
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>

      <div
        className={`grid gap-4 sm:gap-6 ${
          layout === 'compact'
            ? 'sm:grid-cols-2 lg:grid-cols-2'
            : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {leaders.map((leader, i) => {
          const idx = revealedItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
          const isKetua = leader.position.toLowerCase().includes('ketua');
          const isAdmin = leader.position.toLowerCase().includes('ketua') && layout === 'standard';
          const tier = getPositionTier(leader.position);
          const badgeColor = isKetua
            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
            : tier === 'wakil'
            ? 'bg-gradient-to-r from-accent-500 to-amber-500 text-white'
            : tier === 'bidang'
            ? 'bg-primary-500 text-white'
            : 'bg-slate-200 text-slate-700';

          return (
            <div
              key={leader.id}
              className={`group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-200 transition-all duration-500 ${idx}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2">
                    {leader.partyNumber && tier === 'ketua' && (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-white">
                        <Award className="w-3 h-3" />
                        <span className="text-[8px] font-bold">{leader.partyNumber}</span>
                      </div>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${badgeColor}`}
                    >
                      {isKetua && <Crown className="w-2.5 h-2.5" />}
                      {leader.position}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className={`font-bold mb-1 group-hover:text-primary-700 transition-colors duration-300 line-clamp-1 ${
                  isAdmin ? 'text-primary-700 text-sm' : 'text-slate-900 text-sm'
                }`}>
                  {leader.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {leader.bio}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
