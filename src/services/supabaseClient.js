import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.trim().length > 0 &&
    supabaseAnonKey.trim().length > 0 &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('YOUR_SUPABASE_URL')
  );
};

// Fallback dummy credentials to prevent module evaluation crash if env vars are missing
const validUrl = isSupabaseConfigured() ? supabaseUrl.trim() : 'https://placeholder.supabase.co';
const validKey = isSupabaseConfigured() ? supabaseAnonKey.trim() : 'placeholder-anon-key';

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
