import { createClient } from "@supabase/supabase-js";

// La anon key de Supabase está pensada para ir en el cliente: el acceso real
// lo controla la política RLS de la tabla `posts` (ver migración en Supabase).
const SUPABASE_URL = "https://wxpquqvcgbwszzbpxori.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cHF1cXZjZ2J3c3p6YnB4b3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMjEwMzgsImV4cCI6MjEwMTc5NzAzOH0.37ag-NdfLfNcL6NyctP3Ve-YDr7miTiiJdTOnx2bip0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
