import { useSite } from '../context/SiteContext';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SocialMediaIcons from '../components/SocialMediaIcons';

export default function KontakPage() {
  const { settings } = useSite();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telepon',
      lines: [settings.phone],
      href: `tel:${settings.phone}`,
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: Mail,
      title: 'Email',
      lines: [settings.email],
      href: `mailto:${settings.email}`,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: MapPin,
      title: 'Alamat Kantor',
      lines: settings.address.split(',').map(l => l.trim()).filter(Boolean),
      href: 'https://maps.google.com/maps?q=' + encodeURIComponent(settings.address),
      gradient: 'from-accent-500 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      lines: ['Senin - Jumat: 08.00 - 17.00', 'Sabtu: 08.00 - 13.00'],
      href: null,
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <>
      <PageHeader
        title="Hubungi Kami"
        subtitle="Kami siap mendengar aspirasi dan menjawab pertanyaan Anda"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Hubungi Kami' }
        ]}
        bgImage="/images/Cover_PKB_Manokwari.png"
      />

      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Ikuti Kami di Media Sosial</h2>
            <p className="text-xs text-slate-500">
              Ikuti akun resmi kami untuk update kegiatan terbaru
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <SocialMediaIcons layout="row" showLabels />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-primary-700 transition-colors">{info.title}</h3>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-sm text-slate-600 mb-0.5">{line}</p>
                        ))}
                        {info.href && (
                          <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-700 transition-colors mt-1 inline-block"
                          >
                            Buka di peta
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary-600" />
                  WhatsApp Resmi
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Hubungi kami langsung melalui WhatsApp untuk pertanyaan cepat
                </p>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat via WhatsApp
                </a>
              </div>

              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="font-bold text-xl mb-2">Siap Membantu Anda!</h3>
                <p className="text-sm text-white/80 mb-4">
                  Tim kami siap menjawab pertanyaan, menerima aspirasi, dan memberikan informasi lebih lanjut tentang DPC PKB Manokwari.
                </p>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Online 24/7 melalui WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Send className="w-4 h-4 text-primary-600" />
                  Kirim Pesan
                </h3>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="email@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">No. Telepon</label>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="08xx-xxxx-xxxx"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subjek</label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Subjek pesan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
                    <textarea
                      autoComplete="off"
                      rows={5}
                      placeholder="Tulis pesan atau aspirasi Anda..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
