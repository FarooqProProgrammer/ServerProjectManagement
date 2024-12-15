import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // Replace with your Supabase URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY// Replace with your Supabase anon key
);

export default supabase;
