-- Initial Schema for Zakat Onboard

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE post_status AS ENUM ('pending', 'funded', 'completed', 'rejected');
CREATE TYPE report_reason AS ENUM ('fraud', 'misleading', 'spam', 'other');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'rejected');

-- Users Profile Table (extends auth.users)
CREATE TABLE users_profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user' NOT NULL,
  is_blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Charity Posts Table
CREATE TABLE charity_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
  person_name TEXT NOT NULL,
  reason TEXT NOT NULL,
  required_amount DECIMAL(10, 2) NOT NULL CHECK (required_amount > 0),
  current_amount DECIMAL(10, 2) DEFAULT 0 CHECK (current_amount >= 0),
  phone TEXT,
  email TEXT,
  upi_id TEXT,
  bank_details TEXT,
  location TEXT,
  status post_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations Table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES charity_posts(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  transaction_id TEXT,
  payment_proof_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donation Proofs Table (receiver's proof of help)
CREATE TABLE donation_proofs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES charity_posts(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
  proof_images TEXT[] DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports Table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES charity_posts(id) ON DELETE CASCADE,
  reported_by UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
  reason report_reason NOT NULL,
  description TEXT,
  status report_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Prevent duplicate reports
  UNIQUE(post_id, reported_by)
);

-- Create indexes for better query performance
CREATE INDEX idx_charity_posts_created_by ON charity_posts(created_by);
CREATE INDEX idx_charity_posts_status ON charity_posts(status);
CREATE INDEX idx_charity_posts_location ON charity_posts(location);
CREATE INDEX idx_donations_post_id ON donations(post_id);
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_reports_post_id ON reports(post_id);
CREATE INDEX idx_reports_status ON reports(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_profile_updated_at BEFORE UPDATE ON users_profile
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_charity_posts_updated_at BEFORE UPDATE ON charity_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update current_amount when donation is verified
CREATE OR REPLACE FUNCTION update_post_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_verified = TRUE AND (OLD.is_verified IS NULL OR OLD.is_verified = FALSE) THEN
    UPDATE charity_posts
    SET current_amount = current_amount + NEW.amount
    WHERE id = NEW.post_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_donation_amount AFTER UPDATE ON donations
FOR EACH ROW EXECUTE FUNCTION update_post_amount();
