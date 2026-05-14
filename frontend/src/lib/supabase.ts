import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let browserClient: ReturnType<typeof createClient> | null = null;

/**
 * クライアント側用 Supabase クライアント（匿名キー）
 */
export const getSupabaseBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return browserClient;
};

/**
 * サーバー側用 Supabase クライアント（service role キー）
 * サーバーコンポーネント / APIルート でのみ使用
 */
export const getSupabaseAdminClient = () => {
  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export type Database = {
  public: {
    Tables: {
      access_logs: {
        Row: {
          id: string;
          created_at: string;
          path: string;
          referrer: string | null;
          user_agent: string;
          ip_hash: string;
          company_name: string | null;
          org: string | null;
          asn: string | null;
          country: string | null;
          region: string | null;
          city: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["access_logs"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["access_logs"]["Insert"]>;
      };
    };
  };
};
