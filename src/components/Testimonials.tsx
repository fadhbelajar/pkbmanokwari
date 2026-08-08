import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Kaize',
    role: 'Ibu Rumah Tangga, Distrik Manokwari Barat',
    content: 'Program KB dari DPCPKB sangat membantu keluarga kami. Petugas sangat ramah dan memberikan konsultasi yang sangat detail tentang pilihan kontrasepsi yang tepat. Sekarang kami bisa merencanakan keluarga dengan lebih baik.',
    rating: 5,
    avatar: 'MK',
    color: 'from-primary-500 to-blue-600',
  },
  {
    name: 'Yohannes Wambrauw',
    role: 'Tokoh Masyarakat, Distrik Prafi',
    content: 'Kampung KB di distrik kami benar-benar mengubah kehidupan masyarakat. Selain layanan KB, ada juga pelatihan keterampilan dan pendidikan kesehatan yang sangat bermanfaat bagi warga.',
    rating: 5,
    avatar: 'YW',
    color: 'from-accent-500 to-emerald-600',
  },
  {
    name: 'Sarah Mandacan',
    role: 'Guru SMA, Distrik Manokwari Timur',
    content: 'Sebagai guru, saya sangat mengapresiasi program PIK Remaja dari DPCPKB. Siswa kami mendapat edukasi yang tepat tentang kesehatan reproduksi dengan cara yang sesuai dan mudah dipahami.',
    rating: 5,
    avatar: 'SM',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Petrus Dowansiba',
    role: 'Kepala Kampung, Distrik Masni',
    content: 'DPCPKB Manokwari selalu responsif terhadap kebutuhan masyarakat kami di pedalaman. Tenaga kesehatan yang datang ke kampung kami sangat profesional dan peduli terhadap warga.',
    rating: 5,
    avatar: 'PD',
    color: 'from-warm-500 to-orange-600',
  },
  {
    name: 'Debora Arfan',
    role: 'Bidan Desa, Distrik Warmare',
    content: 'Kerja sama dengan DPCPKB sangat baik. Mereka menyediakan alat dan bahan yang memadai untuk pelayanan di Posyandu. Pelatihan yang diberikan juga sangat meningkatkan kompetensi kami.',
    rating: 5,
    avatar: 'DA',
    color: 'from-rose-500 to-pink-600',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: cardRef, isRevealed: cardRevealed } = useScrollReveal(0.1);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimoni" className="relative py-20 sm:py-28 bg-gradient-to-b from-white via-primary-50/20 to-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-50 border border-warm-100 mb-6">
            <Star className="w-4 h-4 text-warm-500" />
            <span className="text-xs font-semibold text-warm-700 tracking-wide uppercase">Testimoni</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Kata Mereka tentang{' '}
            <span className="gradient-text">DPCPKB Manokwari</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Dengarkan langsung pengalaman masyarakat yang telah merasakan manfaat program dan layanan kami.
          </p>
        </div>

        {/* Testimonial cards */}
        <div ref={cardRef} className={`transition-all duration-1000 ${cardRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Desktop: show 3 cards */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const idx = (current + offset) % testimonials.length;
              const t = testimonials[idx];
              return (
                <div
                  key={`${idx}-${current}`}
                  className="group relative p-7 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-100 transition-all duration-500"
                >
                  <Quote className="w-8 h-8 text-primary-100 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-warm-400 fill-warm-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                    "{t.content}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">{t.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: single card */}
          <div className="lg:hidden">
            <div className="relative p-7 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-lg max-w-lg mx-auto">
              <Quote className="w-10 h-10 text-primary-100 mb-4" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warm-400 fill-warm-400" />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                "{testimonials[current].content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center`}>
                  <span className="text-sm font-bold text-white">{testimonials[current].avatar}</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{testimonials[current].name}</div>
                  <div className="text-xs text-slate-500">{testimonials[current].role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2.5 bg-primary-600'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-primary-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
