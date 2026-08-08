import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { useSite } from '../context/SiteContext';
import { Eye, Target, CheckCircle2 } from 'lucide-react';

export default function VisionMission() {
  const { settings } = useSite();
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(settings.mission.length);

  return (
    <section id="visi-misi" className="relative py-12 sm:py-16 bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-primary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-3">
            <Eye className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-[10px] font-semibold text-primary-700 tracking-widest uppercase">Visi &amp; Misi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Arah dan Tujuan{' '}
            <span className="text-primary-600">Perjuangan Kami</span>
          </h2>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className={`p-8 rounded-3xl bg-primary-50/30 border border-primary-100 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-800">Visi</h3>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              {settings.vision}
            </p>
          </div>

          {/* Mission Card */}
          <div
            ref={containerRef}
            className={`p-8 rounded-3xl bg-primary-50/30 border border-primary-100 transition-all duration-800 delay-200 ${
              headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-amber-500 flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-800">Misi</h3>
            </div>
            <div className="space-y-4">
              {settings.mission.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    revealedItems[i] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
