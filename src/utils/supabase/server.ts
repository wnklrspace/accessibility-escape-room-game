import { createClient } from '@supabase/supabase-js'

export const supabaseServer = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // falls back to anon if no service key
    { auth: { persistSession: false } }
  )
