import { createClient as createSupabaseClient } from '@supabase/supabase-js';

declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

let supabase: ReturnType<typeof createSupabaseClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      persistSession: typeof window !== 'undefined',
      detectSessionInUrl: typeof window !== 'undefined',
    },
  });
}

export const getSupabase = () => supabase;
export const isSupabaseConfigured = (): boolean => {
  return !!supabaseUrl && !!supabaseKey && !!supabase;
};
