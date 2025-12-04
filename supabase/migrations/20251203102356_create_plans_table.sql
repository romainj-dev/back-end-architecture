-- Create plans table for subscription pricing
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(64) NOT NULL UNIQUE,
  price INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add check constraint for non-negative prices
ALTER TABLE plans ADD CONSTRAINT plans_price_nonnegative CHECK (price >= 0);

-- Create index on code for faster lookups
CREATE INDEX IF NOT EXISTS plans_code_idx ON plans(code);

-- Enable RLS (Row Level Security)
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read plans (public pricing)
CREATE POLICY "Plans are viewable by everyone"
  ON plans
  FOR SELECT
  USING (true);

-- Only service role can modify plans
CREATE POLICY "Plans are modifiable by service role only"
  ON plans
  FOR ALL
  USING (auth.role() = 'service_role');

-- Insert default plans
INSERT INTO plans (code, price) VALUES
  ('free', 0),
  ('premium', 29)
ON CONFLICT (code) DO NOTHING;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE plans IS 'Subscription plans for ApplyMate pricing';
COMMENT ON COLUMN plans.code IS 'Unique plan identifier (free, premium, etc.)';
COMMENT ON COLUMN plans.price IS 'Monthly price in dollars';
