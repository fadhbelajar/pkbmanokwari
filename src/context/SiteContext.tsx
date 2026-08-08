import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { autoShareNews, generateNewsUrl, SocialPlatform, socialPlatforms } from '../utils/SocialShareService';

export interface Leader {
  id: string;
  name: string;
  position: string;
  photo: string;
  bio: string;
  order: number;
  partyNumber?: string;
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  autoSharePlatforms?: string[];
  sharedTo?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  date: string;
}

export interface VideoLink {
  id: string;
  url: string;
  title: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: string;
  primaryColor: string;
  phone: string;
   email: string;
  address: string;
  whatsappNumber: string;
  vision: string;
  mission: string[];
  aboutText: string;
  chairmanName: string;
  chairmanPosition: string;
  chairmanPhoto: string;
  chairmanMessage: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    twitter: string;
  };
}

interface SiteContextType {
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  leaders: Leader[];
  addLeader: (leader: Leader) => void;
  updateLeader: (id: string, leader: Partial<Leader>) => void;
  deleteLeader: (id: string) => void;
  news: News[];
  addNews: (news: News) => void;
  updateNews: (id: string, news: Partial<News>) => void;
  deleteNews: (id: string) => void;
  shareNews: (id: string, platforms: string[]) => Promise<string[]>;
  gallery: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  videoLinks: VideoLink[];
  addVideoLink: (link: VideoLink) => void;
  updateVideoLink: (id: string, updates: Partial<VideoLink>) => void;
  deleteVideoLink: (id: string) => void;
  accounts: Account[];
  addAccount: (acc: Account) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  resetPassword: (id: string, newPassword: string) => void;
  backupData: () => string;
  restoreData: (data: string) => boolean;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'DPC PKB Manokwari',
  tagline: 'Bersama Membangun Manokwari Sejahtera',
  logo: '/images/Logo_PKB_2024.png',
  primaryColor: '#22c55e',
  phone: '(0986) 212-XXX',
  email: 'dpc.pkb.manokwari@gmail.com',
  address: 'Jl. Brawijaya No. 10, Manokwari, Papua Barat 98312',
  whatsappNumber: '6281234567890',
  vision: 'Mewujudkan masyarakat Kabupaten Manokwari yang adil, makmur, sejahtera, dan bermartabat berdasarkan nilai-nilai Pancasila dan ajaran Islam Ahlussunnah Wal Jamaah.',
  mission: [
    'Memperkuat struktur dan konsolidasi organisasi partai di seluruh wilayah Kabupaten Manokwari',
    'Meningkatkan kualitas kader partai yang berintegritas, kompeten, dan berdedikasi tinggi',
    'Memperjuangkan aspirasi rakyat Manokwari melalui jalur politik yang demokratis dan konstitusional',
    'Mendorong pembangunan ekonomi kerakyatan yang berkeadilan dan berkelanjutan',
    'Menjaga persatuan dan kerukunan antar umat beragama serta melestarikan nilai-nilai kearifan lokal'
  ],
  aboutText: 'DPC PKB Manokwari adalah Dewan Pimpinan Cabang Partai Kebangkitan Bangsa di Kabupaten Manokwari, Papua Barat. Kami berkomitmen untuk memperjuangkan kepentingan rakyat dan membangun Manokwari yang lebih baik melalui politik yang bersih, jujur, dan berintegritas.',
  chairmanName: 'H. Abdul Rahman, S.H., M.H.',
  chairmanPosition: 'Ketua DPC PKB Manokwari',
  chairmanPhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  chairmanMessage: 'Selamat datang di website resmi DPC PKB Manokwari. Sebagai sebuah partai yang berpihat pada Pancasila dan berkomitmen untuk rakyat Manokwari, kami terus bergerak memperjuangkan kepentingan seluruh warga. Melalui website ini, kami ingin menghadirkan transparansi dan keterbukaan dalam setiap langkah yang kami ambil demi Manokwari yang lebih adil, makmur, dan sejahtera.',
  socialMedia: {
    facebook: 'https://facebook.com/dpcpkbmanokwari',
    instagram: 'https://instagram.com/dpcpkbmanokwari',
    youtube: 'https://youtube.com/@dpcpkbmanokwari',
    tiktok: 'https://tiktok.com/@dpcpkbmanokwari',
    twitter: 'https://twitter.com/dpcpkbmanokwari'
  }
};

const defaultLeaders: Leader[] = [
  {
    id: '1',
    name: 'Prof. Dr. H. Ahmad Said, M.A.',
    position: 'Ketua Dewan Syuro',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Tokoh senior yang mengawasi arah kebijakan dan pengawasan internal partai di tingkat cabang.',
    order: 1,
    partyNumber: '1'
  },
  {
    id: '2',
    name: 'Drs. Agus Salim, M.Si.',
    position: 'Sekretaris Dewan Syuro',
    photo: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Ahli hukum dan tata kelola yang bertanggung jawab atas seluruh dokumen resmi dewan syuro.',
    order: 2
  },
  {
    id: '3',
    name: 'H. Abdul Rahman, S.H., M.H.',
    position: 'Ketua DPC PKB Manokwari',
    photo: '/images/Bang_Udin_PKB.jpeg',
    bio: 'Pengacara senior dan aktivis politik yang telah mengabdi untuk masyarakat Manokwari selama lebih dari 20 tahun.',
    order: 1,
    partyNumber: '1'
  },
  {
    id: '4',
    name: 'Ahmad Fauzi, S.E.',
    position: 'Sekretaris DPC',
    photo: '/images/Aman_PKB.jpeg',
    bio: 'Profesional muda yang ahli dalam manajemen organisasi dan strategi politik.',
    order: 2
  },
  {
    id: '5',
    name: 'Hj. Fatimah, S.Ag.',
    position: 'Bendahara DPC',
    photo: '/images/Puput_PKB.jpeg',
    bio: 'Tokoh perempuan yang aktif dalam kegiatan sosial keagamaan dan pemberdayaan ekonomi umat.',
    order: 3
  },
  {
    id: '6',
    name: 'Hj. Siti Aminah, M.Pd.',
    position: 'Wakil Ketua I',
    photo: 'https://images.pexels.com/photos/1681001/pexels-photo-1681001.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Pendidik berpengalaman yang fokus pada pengembangan sumber daya manusia dan pemberdayaan perempuan.',
    order: 4
  },
  {
    id: '7',
    name: 'Drs. Muhammad Yusuf',
    position: 'Wakil Ketua II',
    photo: 'https://images.pexels.com/photos/8815889/pexels-photo-8815889.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Mantan birokrat dengan pengalaman luas dalam pemerintahan daerah dan pembangunan masyarakat.',
    order: 5
  },
  {
    id: '8',
    name: 'Ir. Bambang Sutrisno',
    position: 'Ketua Bidang Organisasi',
    photo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Insinyur dan aktivis yang berdedikasi dalam pembangunan infrastruktur dan organisasi partai.',
    order: 6
  }
];

const defaultNews: News[] = [
  {
    id: '1',
    title: 'DPC PKB Manokwari Gelar Musyawarah Cabang 2024',
    excerpt: 'Musyawarah Cabang DPC PKB Manokwari berlangsung sukses dengan dihadiri ratusan kader dari seluruh distrik.',
    content: 'Musyawarah Cabang (Muscab) DPC PKB Manokwari tahun 2024 berlangsung dengan sukses di Aula Pendopo Kabupaten Manokwari. Acara ini dihadiri oleh ratusan kader dari seluruh distrik di Kabupaten Manokwari serta perwakilan dari DPW PKB Papua Barat.',
    image: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-15',
    category: 'Organisasi'
  },
  {
    id: '2',
    title: 'PKB Manokwari Salurkan Bantuan untuk Korban Bencana',
    excerpt: 'Partai Kebangkitan Bangsa Manokwari menyalurkan bantuan kemanusiaan kepada korban bencana alam.',
    content: 'Dalam rangka meringankan beban masyarakat terdampak bencana, DPC PKB Manokwari menyalurkan bantuan berupa sembako, pakaian, dan obat-obatan kepada korban bencana alam di beberapa distrik.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-10',
    category: 'Sosial'
  },
  {
    id: '3',
    title: 'Pelatihan Kader Muda PKB se-Manokwari',
    excerpt: 'DPC PKB menggelar pelatihan kepemimpinan untuk kader muda dari seluruh wilayah Manokwari.',
    content: 'Dalam upaya regenerasi dan penguatan kader, DPC PKB Manokwari menggelar pelatihan kepemimpinan politik untuk kader muda. Pelatihan ini diikuti oleh lebih dari 100 peserta dari berbagai distrik.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-05',
    category: 'Kaderisasi'
  }
];

const defaultGallery: GalleryItem[] = [
  { id: '1', title: 'Musyawarah Cabang 2024', image: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=600', date: '2024-03-15' },
  { id: '2', title: 'Bakti Sosial', image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600', date: '2024-03-10' },
  { id: '3', title: 'Pelatihan Kader', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600', date: '2024-03-05' },
  { id: '4', title: 'Silaturahmi Ulama', image: 'https://images.pexels.com/photos/8815889/pexels-photo-8815889.jpeg?auto=compress&cs=tinysrgb&w=600', date: '2024-02-28' },
  { id: '5', title: 'Rapat Koordinasi', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600', date: '2024-02-20' },
  { id: '6', title: 'Deklarasi Dukungan', image: 'https://images.pexels.com/photos/8846637/pexels-photo-8846637.jpeg?auto=compress&cs=tinysrgb&w=600', date: '2024-02-15' }
];

const defaultVideoLinks: VideoLink[] = [
  { id: '1', title: 'Sambutan Ketua DPC PKB Manokwari', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: '2', title: 'Musyawarah Cabang 2024', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
];

const defaultAccounts: Account[] = [
  { id: '1', name: 'Administrator', email: 'admin@pkbmanokwari.id', password: 'admin123', role: 'admin' }
];

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('pkb_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [leaders, setLeaders] = useState<Leader[]>(() => {
    const saved = localStorage.getItem('pkb_leaders');
    return saved ? JSON.parse(saved) : defaultLeaders;
  });

  const [news, setNews] = useState<News[]>(() => {
    const saved = localStorage.getItem('pkb_news');
    return saved ? JSON.parse(saved) : defaultNews;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('pkb_gallery');
    return saved ? JSON.parse(saved) : defaultGallery;
  });

  const [videoLinks, setVideoLinks] = useState<VideoLink[]>(() => {
    const saved = localStorage.getItem('pkb_videos');
    return saved ? JSON.parse(saved) : defaultVideoLinks;
  });

  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('pkb_accounts');
    return saved ? JSON.parse(saved) : defaultAccounts;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('pkb_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('pkb_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pkb_leaders', JSON.stringify(leaders));
  }, [leaders]);

  useEffect(() => {
    localStorage.setItem('pkb_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('pkb_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('pkb_videos', JSON.stringify(videoLinks));
  }, [videoLinks]);

  useEffect(() => {
    localStorage.setItem('pkb_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const loadFromSupabase = async () => {
      const supabase = getSupabase()!;
      try {
        const res = await Promise.all([
          (supabase as any).from('site_settings').select('data').eq('id', 'main').maybeSingle(),
          (supabase as any).from('leaders').select('*'),
          (supabase as any).from('news').select('*'),
          (supabase as any).from('gallery_items').select('*'),
          (supabase as any).from('video_links').select('*')
        ]);

        if (res[0].error || res[1].error || res[2].error || res[3].error || res[4].error) return;

        if (res[0].data?.data) setSettings(res[0].data.data);
        if (res[1].data && res[1].data.length > 0) setLeaders(res[1].data as Leader[]);
        if (res[2].data && res[2].data.length > 0) setNews(res[2].data as News[]);
        if (res[3].data && res[3].data.length > 0) setGallery(res[3].data as GalleryItem[]);
        if (res[4].data && res[4].data.length > 0) setVideoLinks(res[4].data as VideoLink[]);
      } catch {
        // silent fail, fallback to localStorage
      }
    };

    loadFromSupabase();
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addLeader = (leader: Leader) => {
    setLeaders(prev => [...prev, leader]);
  };

  const updateLeader = (id: string, updates: Partial<Leader>) => {
    setLeaders(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLeader = (id: string) => {
    setLeaders(prev => prev.filter(l => l.id !== id));
  };

  const addNews = (item: News) => {
    setNews(prev => [item, ...prev]);
  };

  const updateNews = (id: string, updates: Partial<News>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const shareNews = async (id: string, platforms: string[]): Promise<string[]> => {
    const item = news.find(n => n.id === id);
    if (!item) return [];

    const url = generateNewsUrl(id);
    const sharePlatforms = platforms.filter(p => socialPlatforms.includes(p as SocialPlatform)) as SocialPlatform[];
    if (sharePlatforms.length === 0) return [];

    const results = autoShareNews(url, item.title, sharePlatforms);
    const successful = results.filter(r => r.success).map(r => r.platform);

    if (successful.length > 0) {
      updateNews(id, { sharedTo: successful });
    }

    return successful;
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery(prev => [item, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const addVideoLink = (link: VideoLink) => {
    setVideoLinks(prev => [link, ...prev]);
  };

  const updateVideoLink = (id: string, updates: Partial<VideoLink>) => {
    setVideoLinks(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const deleteVideoLink = (id: string) => {
    setVideoLinks(prev => prev.filter(v => v.id !== id));
  };

  const addAccount = (acc: Account) => {
    setAccounts(prev => [...prev, acc]);
  };

  const updateAccount = (id: string, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  const resetPassword = (id: string, newPassword: string) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, password: newPassword } : a));
  };

  const backupData = () => {
    const data = {
      settings,
      leaders,
      news,
      gallery,
      videoLinks,
      accounts,
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const restoreData = (dataStr: string): boolean => {
    try {
      const data = JSON.parse(dataStr);
      if (data.settings) setSettings(data.settings);
      if (data.leaders) setLeaders(data.leaders);
      if (data.news) setNews(data.news);
      if (data.gallery) setGallery(data.gallery);
      if (data.videoLinks) setVideoLinks(data.videoLinks);
      if (data.accounts) setAccounts(data.accounts);
      return true;
    } catch {
      return false;
    }
  };

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem('pkb_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('pkb_admin');
  };

  return (
    <SiteContext.Provider value={{
      settings,
      updateSettings,
      leaders,
      addLeader,
      updateLeader,
      deleteLeader,
      news,
      addNews,
      updateNews,
      deleteNews,
      shareNews,
      gallery,
      addGalleryItem,
      deleteGalleryItem,
      videoLinks,
      addVideoLink,
      updateVideoLink,
      deleteVideoLink,
      accounts,
      addAccount,
      updateAccount,
      deleteAccount,
      resetPassword,
      backupData,
      restoreData,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProvider');
  return context;
}
