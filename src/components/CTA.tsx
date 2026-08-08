import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Phone, MapPin, Mail } from 'lucide-react';

export default function CTA() {
  const { ref, isRevealed } = useScrollReveal(0.1);

  return (
    <section id="kontak" className="relative py-20 sm:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - CTA Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">
                Siap Melayani Anda
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Mari Wujudkan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
                Keluarga Sejahtera
              </span>{' '}
              Bersama
            </h2>

            <p className="text-lg text-primary-100 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Kunjungi kantor kami atau hubungi melalui telepon dan email. Tim kami siap membantu Anda mendapatkan layanan terbaik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="tel:+620986212000"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-700 font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-primary-50 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Telepon Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="mailto:dpcpkb@manokwarikab.go.id"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Kirim Email
              </a>
            </div>
          </div>

          {/* Right - Contact info cards */}
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: 'Alamat Kantor',
                lines: ['Jl. Pendidikan No. 1', 'Kabupaten Manokwari', 'Papua Barat 98312'],
                gradient: 'from-accent-400 to-emerald-500',
              },
              {
                icon: Phone,
                title: 'Telepon & Fax',
                lines: ['(0986) 212-xxx (Telepon)', '(0986) 212-xxx (Fax)', 'Senin - Jumat, 08.00 - 16.00 WIT'],
                gradient: 'from-primary-400 to-blue-500',
              },
              {
                icon: Mail,
                title: 'Email & Media Sosial',
                lines: ['dpcpkb@manokwarikab.go.id', '@dpcpkb_manokwari (Instagram)', 'DPCPKB Manokwari (Facebook)'],
                gradient: 'from-violet-400 to-purple-500',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-sm text-primary-200">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
