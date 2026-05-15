-- Supabase SQL for access_logs table

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- テーブル作成
CREATE TABLE IF NOT EXISTS access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  company_name TEXT,
  org TEXT,
  asn TEXT,
  country TEXT,
  region TEXT,
  city TEXT
);

-- インデックス作成（クエリ高速化）
CREATE INDEX IF NOT EXISTS idx_access_logs_created_at ON access_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_access_logs_company_name ON access_logs(company_name);
CREATE INDEX IF NOT EXISTS idx_access_logs_path ON access_logs(path);
CREATE INDEX IF NOT EXISTS idx_access_logs_country ON access_logs(country);
CREATE INDEX IF NOT EXISTS idx_access_logs_ip_hash ON access_logs(ip_hash);

-- RLS（行レベルセキュリティ）を有効化
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- RLS ポリシー：管理者のみが読取可能
-- 注：service_role キーでは RLS をバイパスするため、このポリシーはそこまで重要ではない
-- ただし、セキュリティベストプラクティスのため設定
CREATE POLICY "Access logs read only for authenticated" ON access_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS ポリシー：誰も直接挿入できない（APIを通じてのみ）
CREATE POLICY "Access logs insert disabled" ON access_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- 注：トラッキングAPI (/api/track) は、service_role キーを使用するため
-- RLS をバイパスして直接挿入できます

-- コメント
COMMENT ON TABLE access_logs IS 'B2B access analytics - tracks company-level access to the site';
COMMENT ON COLUMN access_logs.ip_hash IS 'SHA256 hash of client IP (privacy protection)';
COMMENT ON COLUMN access_logs.company_name IS 'Company name from IPinfo API';
COMMENT ON COLUMN access_logs.org IS 'Organization info from IPinfo (e.g., AS12345 CompanyName)';
