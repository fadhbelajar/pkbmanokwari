import Contact from '../components/Contact';
import SocialMediaIcons from '../components/SocialMediaIcons';
import { useSite } from '../context/SiteContext';

export default function KontakPage() {
  const { settings } = useSite();

  return (
    <>
      <section className="pt-16 sm:pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Hubungi Kami
            </h1>
            <p className="text-base text-slate-500 max-w-3xl mx-auto">
              Silakan menghubungi kami untuk pertanyaan, usulan, atau kolaborasi
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Ikuti Kami di Media Sosial</h2>
            <p className="text-xs text-slate-500">
              Ikuti akun resmi kami untuk update kegiatan terbaru
            </p>
          </div>
          <div className="flex justify-center">
            <SocialMediaIcons layout="row" showLabels />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Online 24/7</span>
              </div>
              <span className="text-slate-300">|</span>
              <span>WA: {settings.whatsappNumber}</span>
              <span className="text-slate-300">|</span>
              <span>Email: {settings.email}</span>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
