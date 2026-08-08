import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

const socialIcons = [
  {
    name: 'WhatsApp',
    icon: '💬',
    color: 'bg-green-500',
    buildUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  },
  {
    name: 'Facebook',
    icon: '📘',
    color: 'bg-blue-600',
    buildUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'X/Twitter',
    icon: '🐦',
    color: 'bg-sky-500',
    buildUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-700',
    buildUrl: (url: string, title: string) =>
      `https://www.linkedin.com/shareArticle?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
];

export default function NewsShare({
  title = '',
  url = '',
  excerpt = ''
}: {
  title?: string;
  url?: string;
  excerpt?: string;
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareTitle = title || '';

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: excerpt,
          url: shareUrl
        });
      } catch {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (buildUrl: (url: string, title: string) => string) => {
    const link = buildUrl(shareUrl, shareTitle);
    window.open(link, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
        Bagikan:
      </span>

      {hasNativeShare && (
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {socialIcons.map((social) => (
        <button
          key={social.name}
          onClick={() => handleSocialShare(social.buildUrl)}
          className={`flex items-center justify-center w-9 h-9 rounded-xl text-white ${social.color} hover:scale-110 transition-transform duration-200`}
          aria-label={`Share to ${social.name}`}
          title={social.name}
        >
          <span className="text-sm">{social.icon}</span>
        </button>
      ))}

      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 text-xs"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
      </button>
    </div>
  );
}
