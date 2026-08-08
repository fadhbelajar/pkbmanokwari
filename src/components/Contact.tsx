import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSite } from '../context/SiteContext';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { settings } = useSite();
  const { ref, isRevealed } = useScrollReveal(0.1);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="kontak" className="relative py-12 sm:py-16 bg-gradient-to-br from-primary-700 to-primary-800 overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-white/80 tracking-widest uppercase">
                Hubungi Kami
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight leading-tight">
              Mari{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
                Bergabung
              </span>{' '}
              Bersama Kami
            </h2>

            <p className="text-base text-primary-100 leading-relaxed mb-6">
              Kami selalu terbuka untuk menerima aspirasi, masukan, dan siap menyambut Anda bergabung menjadi bagian dari keluarga besar PKB Manokwari.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: 'Alamat Kantor',
                  lines: settings.address.split(','),
                  gradient: 'from-accent-400 to-yellow-500',
                },
                {
                  icon: Phone,
                  title: 'Telepon',
                  lines: [settings.phone],
                  gradient: 'from-primary-400 to-green-500',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: [settings.email],
                  gradient: 'from-blue-400 to-indigo-500',
                },
              ].map((item, i) => (
                <div
                  key={i}
                className="group flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-0.5">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-xs text-primary-200">{line.trim()}</p>
                  ))}
                </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Kirim Pesan</h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Pesan Terkirim!</h4>
                <p className="text-slate-500">Terima kasih, kami akan segera menghubungi Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="email@domain.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    placeholder="Tulis pesan atau aspirasi Anda..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300"
                >
                  Kirim Pesan
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
