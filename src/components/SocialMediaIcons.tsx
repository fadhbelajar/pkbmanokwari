import { useSite } from '../context/SiteContext';
import { Mail } from 'lucide-react';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.494v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.92.001c-1.505 0-1.796.715-1.796 1.764v2.31h3.587l-.467 3.692h-3.12V24H22.675c.727 0 1.326-.6 1.326-1.326V1.326C24 .6 23.4 0 22.675 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 2.16c3.204 0 3.584.016 4.85.07 1.17.05 1.805.25 2.227.42a4.42 4.42 0 0 1 1.585 1.02 4.42 4.42 0 0 1 1.02 1.586c.165.422.368 1.057.423 2.227.054 1.266.07 1.646.07 4.85s-.016 3.584-.07 4.85c-.055 1.17-.257 1.805-.423 2.227a4.42 4.42 0 0 1-1.02 1.585 4.42 4.42 0 0 1-1.586 1.02c-.42.165-1.055.368-2.226.423-1.267.054-1.646.07-4.851.07-3.204 0-3.584-.016-4.851-.07-1.171-.055-1.806-.258-2.227-.423a4.42 4.42 0 0 1-1.585-1.02 4.42 4.42 0 0 1-1.02-1.585c-.165-.42-.368-1.055-.423-2.226-.054-1.267-.07-1.647-.07-4.851 0-3.204.016-3.584.07-4.851.055-1.17.258-1.805.423-2.227a4.42 4.42 0 0 1 1.02-1.585 4.42 4.42 0 0 1 1.585-1.02c.42-.165 1.055-.368 2.226-.423 1.267-.054 1.646-.071 4.851-.071M12 0C8.74 0 8.333.015 11.42 3.163c0 .001 0 .002 0 .004 0 0 0 .001.003.004A12.07 12.07 0 0 1 12 3.201c1.245-.02 2.468-.02 3.667 0 1.197-.034 2.36.132 3.276.63.908.492 1.63.33 2.33-.042 1.71-.79 2.75-1.83 3.54-2.62.79-.79 1.35-1.68 1.63-2.7.36-.92.49-1.9.49-2.86v-1.21C32 2.46 21.54 0 12 0zm0 5.838c-3.405 0-6.163 2.762-6.163 6.163 0 3.405 2.762 6.163 6.163 6.163 3.405 0 6.163-2.762 6.163-6.163 0-3.405-2.762-6.163-6.163-6.163zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" fill="currentColor" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M19.64 3.14C18.5 2.5 16.2 2.17 12 2.17c-4.19 0-6.5.33-7.64.99A4.82 4.82 0 0 0 2 5.5V6.5c0 2.22 1.78 4 4 4h2c2.22 0 4-1.78 4-4V6.5c0-.42-.06-.84-.16-1.23A4.82 4.82 0 0 0 9.84 5.17a78.3 78.3 0 0 1 14.32 0c.1.39.16.81.16 1.23v.5c0 2.22-1.78 4-4 4h-2c-2.22 0-4 1.78-4 4v.5c0 1.39.87 2.56 2.1 2.97 .27.09.55.19.83.27a78.3 78.3 0 0 0 14.32 0c.08-.08.15-.17.21-.26A4.82 4.82 0 0 0 22 15.5v-.5c0-2.22-1.78-4-4-4h-2c-2.22 0-4 1.78-4 4v.5c0 1.39.87 2.56 2.1 2.97.27.09.55.19.83.27a78.3 78.3 0 0 0 14.32 0c.08-.08.15-.17.21-.26a4.82 4.82 0 0 0-.02-6.13v-.5c0-2.22-1.78-4-4-4h-2c-2.22 0-4-1.78-4-4V5.5c0-1.39-.87-2.56-2.1-2.97a78.3 78.3 0 0 0-14.32 0c-.1.39-.16.81-.16 1.23v.5c0 2.22 1.78 4 4 4h2c2.22 0 4-1.78 4-4v-.5c0-2.22-1.78-4-4-4H8c-2.22 0-4 1.78-4 4v.5c0 2.22 1.78 4 4 4h2c2.22 0 4 1.78 4 4v.5c0 1.39.87 2.56 2.1 2.97.27.09.55.19.83.27a78.3 78.3 0 0 0 14.32 0c.08-.08.15-.17.21-.26a4.82 4.82 0 0 0-.02-6.13z" fill="currentColor" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M16 3a4 4 0 0 1 0 8v-2a2 2 0 0 0 0-4h-2V7a4 4 0 0 1 2 0V3zm-4 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.5-2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm3.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm6 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm3 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.601 1.794-1.545 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 1.386.485 2.592 1.27 3.421-.484-.015-.935-.143-1.343-.379v-.04c0 3.097 2.112 5.684 4.935 6.298-.13.354-.26.713-.26 1.093 0 1.055.14 2.087.39 3.11H4.228c-2.516 0-4.675-2.162-4.675-4.83 0-.284.002-.562.007-.839.967.718 2.104 1.144 3.344 1.144 1.22 0 2.303-.234 3.224-.721.018 2.545 1.76 4.693 4.215 5.188-.18.357-.37.67-.58 1.01-5.33-.98-9.63-3.15-12.63-6.5-1.54 1.73-2.43 3.82-2.43 6.08 0 4.133 3.34 7.5 7.83 7.5 4.075 0 7.445-1.317 9.788-3.56.001-.03.002-.061.002-.092 0 3.99-.21 7.84-1.255 11.552 5.21-.84 9.76-3.23 12.51-6.61 2.61-3.24 4.05-7.26 4.05-11.57 0-1.27-.013-2.51-.038-3.69.84.654 1.6 1.485 2.22 2.45z" />
  </svg>
);

interface SocialMediaIconsProps {
  layout?: 'row' | 'col';
  showLabels?: boolean;
  className?: string;
  settings?: { socialMedia: { facebook: string; instagram: string; youtube: string; tiktok: string; twitter: string }; email: string };
}

export default function SocialMediaIcons({
  layout = 'row',
  showLabels = false,
  className = '',
  settings: customSettings
}: SocialMediaIconsProps) {
  const { settings: ctxSettings } = useSite();
  const s = customSettings || ctxSettings;

  const socialLinks = [
    { label: 'Facebook', href: s.socialMedia.facebook, Icon: FacebookIcon, brandColor: '#1877F2' },
    { label: 'Instagram', href: s.socialMedia.instagram, Icon: InstagramIcon, brandColor: '#E4405F' },
    { label: 'YouTube', href: s.socialMedia.youtube, Icon: YouTubeIcon, brandColor: '#FF0000' },
    { label: 'TikTok', href: s.socialMedia.tiktok, Icon: TikTokIcon, brandColor: '#FE2C55' },
    { label: 'Email', href: `mailto:${s.email}`, Icon: Mail, brandColor: '#3B82F6' },
  ];

  const allLinks = [
    ...socialLinks,
    ...(s.socialMedia.twitter
      ? [{ label: 'Twitter', href: s.socialMedia.twitter, Icon: TwitterIcon, brandColor: '#1DA1F2' }]
      : []),
  ];

  return (
    <div
      className={`flex ${layout === 'row' ? 'flex-row items-center flex-wrap gap-2' : 'flex-col gap-2'} ${className}`}
    >
      {allLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href?.startsWith('http') ? '_blank' : undefined}
          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={item.label}
          className="group relative flex items-center justify-center w-10 h-10 rounded-xl text-white transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: item.brandColor }}
        >
          <item.Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          {showLabels && <span className="ml-2 text-xs">{item.label}</span>}
        </a>
      ))}
    </div>
  );
}
