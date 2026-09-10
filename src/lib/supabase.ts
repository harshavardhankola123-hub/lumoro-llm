import { createClient } from '@supabase/supabase-js';

// Setup Supabase client
// For the prototype, these might be empty if the user hasn't provided env vars.
// We will use a mock auth state if this is not configured.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
