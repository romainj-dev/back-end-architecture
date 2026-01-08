-- Create users table for storing canonical user records
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(160) NOT NULL,
  avatar_url TEXT,
  metadata JSONB,
  -- OAuth provider info
  provider VARCHAR(32) NOT NULL,        -- 'google', 'linkedin', 'github'
  provider_account_id VARCHAR(255) NOT NULL,
  -- OAuth tokens (for LinkedIn API) - stored encrypted
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Constraints
  UNIQUE(provider, provider_account_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_provider_idx ON users(provider, provider_account_id);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Deny all for anon key (defense-in-depth)
-- Service role bypasses RLS anyway
CREATE POLICY "Deny all for anon" ON users
  FOR ALL USING (false);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

-- Add comments for documentation
COMMENT ON TABLE users IS 'Canonical user records linked to OAuth providers';
COMMENT ON COLUMN users.provider IS 'OAuth provider name (google, linkedin, github)';
COMMENT ON COLUMN users.provider_account_id IS 'Provider-specific account identifier';
COMMENT ON COLUMN users.access_token IS 'Encrypted OAuth access token';
COMMENT ON COLUMN users.refresh_token IS 'Encrypted OAuth refresh token';

