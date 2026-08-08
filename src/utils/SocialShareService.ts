export type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'whatsapp';

export interface ShareResult {
  platform: string;
  success: boolean;
  url: string;
}

const platformLabels: Record<SocialPlatform, { label: string; color: string }> = {
  facebook: { label: 'Facebook', color: 'bg-blue-600' },
  twitter: { label: 'X / Twitter', color: 'bg-sky-500' },
  linkedin: { label: 'LinkedIn', color: 'bg-blue-700' },
  whatsapp: { label: 'WhatsApp', color: 'bg-green-500' },
};

export const socialPlatforms: SocialPlatform[] = ['facebook', 'twitter', 'linkedin', 'whatsapp'];

export function getPlatformLabel(platform: SocialPlatform): { label: string; color: string } {
  return platformLabels[platform];
}

function buildShareUrl(platform: SocialPlatform, url: string, title: string): string {
  const safeUrl = encodeURIComponent(url);
  const safeTitle = encodeURIComponent(title);

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${safeUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${safeTitle}&url=${safeUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${safeUrl}`;
    case 'whatsapp':
      return `https://wa.me/?text=${safeTitle}%20${safeUrl}`;
    default:
      return '';
  }
}

export function shareToPlatform(platform: SocialPlatform, url: string, title: string): ShareResult {
  const shareUrl = buildShareUrl(platform, url, title);
  if (!shareUrl) {
    return { platform, success: false, url: '' };
  }
  window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  return { platform, success: true, url: shareUrl };
}

export function autoShareNews(
  url: string,
  title: string,
  platforms: SocialPlatform[]
): ShareResult[] {
  return platforms.map((platform) => shareToPlatform(platform, url, title));
}

export function generateNewsUrl(newsId: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/berita/${newsId}`;
}
