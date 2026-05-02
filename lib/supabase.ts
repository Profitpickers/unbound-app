/* Client Supabase — istanza singleton per tutta l'applicazione UNBOUND.
   Usa le variabili d'ambiente pubbliche configurate in .env.local e su Vercel.
   Importare `supabase` da "@/lib/supabase" in ogni file che necessita di DB. */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
