import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase belum dikonfigurasi');
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        if (typeof document === 'undefined') return [];
        return document.cookie
          .split('; ')
          .map((c) => {
            const [name, ...v] = c.split('=');
            return { name, value: v.join('=') };
          })
          .filter((c) => c.name && c.value);
      },
      setAll(cookies) {
        if (typeof document === 'undefined') return;
        cookies.forEach(({ name, value, options }) => {
          let cookieStr = `${name}=${value}`;
          if (options?.maxAge !== undefined) cookieStr += `; Max-Age=${options.maxAge}`;
          if (options?.path) cookieStr += `; Path=${options.path}`;
          if (options?.domain) cookieStr += `; Domain=${options.domain}`;
          if (options?.secure) cookieStr += `; Secure`;
          if (options?.httpOnly === false) cookieStr += `; SameSite=Lax`;
          document.cookie = cookieStr;
        });
      },
    },
  });
};
