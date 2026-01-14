-- Create user_experience_profiles table
CREATE TABLE IF NOT EXISTS user_experience_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  headline TEXT,
  summary TEXT,
  location TEXT,
  years_of_experience NUMERIC,
  skills TEXT[],
  custom_fields JSONB,
  ingestion_metadata JSONB,
  raw_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user_experience_roles table
CREATE TABLE IF NOT EXISTS user_experience_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES user_experience_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  employment_type TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  period_label TEXT,
  duration_label TEXT,
  status TEXT CHECK (status IN ('complete', 'incomplete')) DEFAULT 'incomplete',
  summary TEXT,
  tech_stack TEXT[],
  methodologies TEXT[],
  team_structure TEXT,
  key_achievements TEXT[],
  missing_details TEXT,
  custom_fields JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_experience_role_projects table
CREATE TABLE IF NOT EXISTS user_experience_role_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES user_experience_roles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  period TEXT,
  description TEXT,
  achievements TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_experience_learning table (education + certifications)
CREATE TABLE IF NOT EXISTS user_experience_learning (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES user_experience_profiles(id) ON DELETE CASCADE,
  entry_type TEXT CHECK (entry_type IN ('education', 'certification')) NOT NULL,
  institution TEXT NOT NULL,
  program TEXT,
  field_of_study TEXT,
  credential_url TEXT,
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS user_experience_profiles_user_id_idx ON user_experience_profiles(user_id);
CREATE INDEX IF NOT EXISTS user_experience_roles_profile_id_start_date_idx ON user_experience_roles(profile_id, start_date DESC);
CREATE INDEX IF NOT EXISTS user_experience_role_projects_role_id_idx ON user_experience_role_projects(role_id);
CREATE INDEX IF NOT EXISTS user_experience_learning_profile_id_idx ON user_experience_learning(profile_id);

-- Enable RLS
ALTER TABLE user_experience_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_experience_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_experience_role_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_experience_learning ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Note: Since we're using NextAuth and not Supabase Auth, RLS policies will need to be handled
-- at the application layer. These policies are defense-in-depth but may not work without Supabase Auth.
-- For now, we'll create policies that deny all for anon users.
-- Application code should use service role key and enforce user_id checks.

CREATE POLICY "Deny all for anon on profiles" ON user_experience_profiles
  FOR ALL USING (false);

CREATE POLICY "Deny all for anon on roles" ON user_experience_roles
  FOR ALL USING (false);

CREATE POLICY "Deny all for anon on projects" ON user_experience_role_projects
  FOR ALL USING (false);

CREATE POLICY "Deny all for anon on learning" ON user_experience_learning
  FOR ALL USING (false);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_user_experience_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_experience_profiles_updated_at
  BEFORE UPDATE ON user_experience_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_experience_profiles_updated_at();

CREATE OR REPLACE FUNCTION update_user_experience_roles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_experience_roles_updated_at
  BEFORE UPDATE ON user_experience_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_experience_roles_updated_at();

CREATE OR REPLACE FUNCTION update_user_experience_role_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_experience_role_projects_updated_at
  BEFORE UPDATE ON user_experience_role_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_user_experience_role_projects_updated_at();

CREATE OR REPLACE FUNCTION update_user_experience_learning_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_experience_learning_updated_at
  BEFORE UPDATE ON user_experience_learning
  FOR EACH ROW
  EXECUTE FUNCTION update_user_experience_learning_updated_at();

-- Add comments
COMMENT ON TABLE user_experience_profiles IS 'Normalized user experience profiles - source agnostic';
COMMENT ON TABLE user_experience_roles IS 'Work experience roles/positions';
COMMENT ON TABLE user_experience_role_projects IS 'Projects within a role';
COMMENT ON TABLE user_experience_learning IS 'Education and certifications';

