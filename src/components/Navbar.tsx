import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkItem {
  label: string;
  href: string;
  exact?: boolean;
}

interface NavDropdownItem {
  label: string;
  subLinks: { label: string; href: string }[];
}

type NavItem = NavLinkItem | NavDropdownItem;

const isDropdown = (item: NavItem): item is NavDropdownItem =>
  'subLinks' in item;

const navLinks: NavItem[] = [
  { label: 'Beranda', href: '/', exact: true },
  {
    label: 'Profil',
    subLinks: [
      { label: 'Tentang Kami', href: '/profil' },
      { label: 'Visi & Misi', href: '/profil#visi-misi' },
      { label: 'Sambutan Ketua', href: '/profil' },
      { label: 'Pengurus', href: '/profil#pengurus' },
    ],
  },
  { label: 'Berita', href: '/berita' },
  {
    label: 'Galeri',
    subLinks: [
      { label: 'Foto', href: '/galeri' },
      { label: 'Video', href: '/galeri' },
    ],
  },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const { settings } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) => {
    const cleanHref = href.split('#')[0];
    return location.pathname === cleanHref;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
            : 'bg-white/90 backdrop-blur-sm shadow-sm py-3'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" className="w-10 h-10 rounded-xl object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">PKB</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-base">
                DPC PKB Manokwari
              </span>
              <span className="text-[10px] font-medium text-primary-600 tracking-wider uppercase">
                Partai Kebangkitan Bangsa
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              isDropdown(link) ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeDropdown === link.label
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-slate-700 hover:text-primary-700 hover:bg-primary-50'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200" />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg shadow-slate-900/10 border border-slate-200 py-2 opacity-100 visible translate-y-0 transition-all duration-200">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-700 hover:text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/kontak"
              className="group relative px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:bg-primary-700 transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Gabung Sekarang
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl lg:hidden transition-transform duration-500 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <span className="font-bold text-slate-900">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-1 overflow-y-auto h-[calc(100vh-73px)]">
          {navLinks.map((link, i) => (
            <div key={link.label}>
              {isDropdown(link) ? (
                <div className="mb-3">
                  <details className="group">
                    <summary className="flex items-center justify-between px-4 py-3 text-slate-700 font-medium rounded-xl hover:bg-slate-50 cursor-pointer">
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="ml-4 mt-1 space-y-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                </div>
              ) : (
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-slate-700 font-medium rounded-xl transition-all duration-200 ${
                    isActive(link.href) ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
            <Link
              to="/kontak"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 transition-all"
            >
              Gabung Sekarang
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
