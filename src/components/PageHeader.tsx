import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  bgImage?: string;
  bgGradient?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  bgImage,
  bgGradient = true
}: PageHeaderProps) {
  const bgStyle = bgImage
    ? { backgroundImage: `url('${bgImage}')` }
    : { backgroundColor: 'var(--tw-primary, #008c44)' };

  return (
    <section
      className={`relative pt-16 sm:pt-20 pb-20 bg-cover bg-center transition-all duration-700`}
      style={{ ...bgStyle, minHeight: '260px' }}
    >
      {bgGradient && <div className="absolute inset-0 bg-primary-900/50" />}
      {!bgGradient && bgImage && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center" style={{ minHeight: '260px' }}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-sm text-white/80 mb-2">
            {breadcrumbs.map((crumb, i) => (
              <>
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </>
            ))}
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/85 mt-2 max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
