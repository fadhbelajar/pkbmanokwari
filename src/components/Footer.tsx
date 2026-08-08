import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import SocialMediaIcons from './SocialMediaIcons';

const footerLinks = [
  {
    title: 'Profil',
    links: [
      { label: 'Tentang Kami', href: '/profil' },
      { label: 'Visi & Misi', href: '/profil#visi-misi' },
      { label: 'Struktur Organisasi', href: '/profil#pengurus' },
      { label: 'Profil Pengurus', href: '/profil#pengurus' },
    ],
  },
  {
    title: 'Berita',
    links: [
      { label: 'Berita Terbaru', href: '/berita' },
      { label: 'Kegiatan', href: '/berita' },
      { label: 'Pengumuman', href: '/berita' },
    ],
  },
  {
    title: 'Galeri',
    links: [
      { label: 'Foto Kegiatan', href: '/galeri' },
      { label: 'Video', href: '/galeri' },
    ],
  },
  {
    title: 'Halaman',
    links: [
      { label: 'Beranda', href: '/' },
      { label: 'Kontak', href: '/kontak' },
    ],
  },
];

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const { settings } = useSite();

  const contactItems = [
    { icon: Phone, label: settings.phone, href: `tel:${settings.phone}` },
    { icon: Mail, label: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: settings.address, href: 'https://maps.google.com' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-3 group">
              {settings.logo ? (
                <img src={settings.logo} alt="Logo" className="w-10 h-10 rounded-xl object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PKB</span>
                </div>
              )}
              <div>
                <div className="font-bold text-white text-base group-hover:text-primary-300 transition-colors">
                  {settings.siteName}
                </div>
                <div className="text-xs text-slate-400">Partai Kebangkitan Bangsa</div>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-md">
              {settings.tagline}. Bersama rakyat, membangun Manokwari yang adil, makmur, dan sejahtera.
            </p>

            <div className="mb-2">
              <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-2">
                Ikuti Kami
              </p>
              <SocialMediaIcons layout="row" />
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold text-white text-xs mb-2.5 tracking-widest uppercase">
                {group.title}
              </h4>
              <ul className="space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <item.icon className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </a>
            ))}
          </div>

          <p
            className="text-[10px] text-slate-500 cursor-default select-none transition-colors duration-200 hover:text-slate-400"
            onDoubleClick={onAdminClick}
            onClick={(e) => {
              if (e.shiftKey) onAdminClick?.();
            }}
            title="© 2026"
          >
            © {new Date().getFullYear()} {settings.siteName}. Hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:scale-110 transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
