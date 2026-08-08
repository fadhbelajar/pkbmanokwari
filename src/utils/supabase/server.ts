import { createServerClient as createServerClientBase } from '@supabase/ssr';

export type CookieStore = {
  getAll: () => { name: string; value: string }[];
  setAll: (cookies: { name: string; value: string; options?: Record<string, unknown> }[]) => void;
};

export interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const createClient = (cookieStore?: CookieStore) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase belum dikonfigurasi');
    return null;
  }

  if (!cookieStore) {
    return createServerClientBase(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op when no cookie store provided (e.g., in non-server context)
        },
      },
    });
  }

  return createServerClientBase(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookieStore.setAll(
            cookiesToSet.map(({ name, value, options }) => ({
              name,
              value,
              options: options ?? {},
            }))
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
};

export type ServerClient = ReturnType<typeof createClient>;
