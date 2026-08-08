import { useRef, useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSite } from '../context/SiteContext';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

function extractVideoId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

interface ScrollState {
  canLeft: boolean;
  canRight: boolean;
}

function useScrollButtons(ref: React.RefObject<HTMLDivElement | null>): ScrollState {
  const [state, setState] = useState<ScrollState>({ canLeft: false, canRight: true });
  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      setState({
        canLeft: el.scrollLeft > 5,
        canRight: el.scrollLeft < el.scrollWidth - el.clientWidth - 5
      });
    };
    const el = ref.current;
    if (el) {
      el.addEventListener('scroll', check);
      check();
    }
    return () => el?.removeEventListener('scroll', check);
  }, [ref]);
  return state;
}

function ScrollButton({
  direction,
  canScroll,
  onClick
}: {
  direction: 'left' | 'right';
  canScroll: boolean;
  onClick: () => void;
}) {
  if (!canScroll) return null;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200"
    >
      {direction === 'left' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
  );
}

function SectionHeader({
  refProp,
  revealed,
  icon: Icon,
  badge,
  title,
  subtitle
}: {
  refProp: React.Ref<HTMLDivElement>;
  revealed: boolean;
  icon: React.ElementType;
  badge: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      ref={refProp}
      className={`text-center max-w-2xl mx-auto mb-8 transition-all duration-800 ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-3">
        <Icon className="w-3.5 h-3.5 text-accent-600" />
        <span className="text-[10px] font-semibold text-accent-700 tracking-widest uppercase">
          {badge}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-slate-500 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

function VideoSlider() {
  const { videoLinks } = useSite();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { canLeft, canRight } = useScrollButtons(scrollRef);
  const { ref, isRevealed } = useScrollReveal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <SectionHeader
        refProp={ref}
        revealed={isRevealed}
        icon={Play}
        badge="Video Kegiatan"
        title="Tonton Kegiatan Kami"
        subtitle="Video dokumentasi kegiatan DPC PKB Manokwari di YouTube."
      />

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-1 pb-4 snap-x snap-mandatory"
        >
          {videoLinks.map((link) => {
            const videoId = extractVideoId(link.url);
            return (
               <div
                 key={link.id}
                 className={`relative flex-shrink-0 w-[260px] sm:w-[350px] rounded-2xl overflow-hidden border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 snap-start ${
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                 }`}
               >
                <div className="relative pb-[56.25%] h-0">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={link.title}
                      className="absolute inset-0 w-full h-full rounded-2xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                      URL Video Tidak Valid
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-semibold">YouTube</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-slate-800 line-clamp-2">{link.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        <ScrollButton direction="left" canScroll={canLeft} onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' }); }} />
        <ScrollButton direction="right" canScroll={canRight} onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' }); }} />
      </div>
    </div>
  );
}

export default function GallerySlider() {
  return (
    <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VideoSlider />
      </div>
    </section>
  );
}
