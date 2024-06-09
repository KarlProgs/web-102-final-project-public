import { createClient } from "@supabase/supabase-js";

const URL = "SUPABASE_URL";
const API_KEY = "API_KEY";

export const supabase = createClient(URL, API_KEY);
