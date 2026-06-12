import { createClient } from '@supabase/supabase-js';

// Hardcoding public keys because GitHub Actions cannot access local .env
// Note: NEXT_PUBLIC_SUPABASE_URL and ANON_KEY are safe to be exposed in the client.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://drozvcwzicwdferlftsb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_GBUhqvQaPErAIPDxW_HuTw_JmbM1PxK';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
