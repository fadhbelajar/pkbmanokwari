import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSite } from '../context/SiteContext';

export default function ChairmanGreeting() {
  const { settings } = useSite();
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: messageRef, isRevealed: messageRevealed } = useScrollReveal();

  return (
    <section id="sambutan-ketua" className="relative py-12 sm:py-16 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-primary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Message */}
          <div
            ref={messageRef}
            className={`transition-all duration-800 ${
              messageRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
              <span className="text-[10px] font-semibold text-primary-700 tracking-widest uppercase">
                Sambutan Ketua
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
              Sambutan{' '}
              <span className="gradient-text">Ketua DPC PKB Manokwari</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-4 max-w-xl">
              {settings.chairmanMessage}
            </p>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-3 border-white shadow-md">
                {settings.chairmanPhoto ? (
                  <img
                    src={settings.chairmanPhoto}
                    alt={settings.chairmanName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {settings.chairmanName?.split(' ')[0]?.[0]}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{settings.chairmanName}</p>
                <p className="text-xs text-primary-600">{settings.chairmanPosition}</p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div
            ref={headerRef}
            className={`relative transition-all duration-800 delay-300 ${
              headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10">
              {settings.chairmanPhoto ? (
                <img
                  src={settings.chairmanPhoto}
                  alt={settings.chairmanName}
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-[300px] sm:h-[400px] bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">
                    {settings.chairmanName?.split(' ')[0]?.[0]}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="glass rounded-xl p-3 max-w-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{settings.chairmanName}</p>
                      <p className="text-[10px] text-slate-200">{settings.chairmanPosition}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-20 animate-float">
              <div className="glass rounded-xl p-3 shadow-md">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 4 9.27l4.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">Pembangunan</p>
                    <p className="text-[8px] text-slate-500">Berkelanjutan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
