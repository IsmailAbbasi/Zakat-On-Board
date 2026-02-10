-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE charity_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users Profile Policies
-- Users can read all profiles
CREATE POLICY "Users can view all profiles"
  ON users_profile FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users_profile FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Charity Posts Policies
-- Anyone can view non-blocked, non-rejected posts
CREATE POLICY "Anyone can view active posts"
  ON charity_posts FOR SELECT
  TO authenticated
  USING (
    status != 'rejected'
    AND created_by IN (
      SELECT id FROM users_profile WHERE is_blocked = FALSE
    )
  );

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON charity_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by
    AND auth.uid() IN (SELECT id FROM users_profile WHERE is_blocked = FALSE)
  );

-- Users can update their own posts, admins can update any post
CREATE POLICY "Users can update own posts, admins can update any"
  ON charity_posts FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by
    OR auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin')
  );

-- Users can delete their own posts, admins can delete any post
CREATE POLICY "Users can delete own posts, admins can delete any"
  ON charity_posts FOR DELETE
  TO authenticated
  USING (
    auth.uid() = created_by
    OR auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin')
  );

-- Donations Policies
-- Users can view donations for posts they created or donated to, admins can view all
CREATE POLICY "Users can view relevant donations, admins view all"
  ON donations FOR SELECT
  TO authenticated
  USING (
    donor_id = auth.uid()
    OR post_id IN (SELECT id FROM charity_posts WHERE created_by = auth.uid())
    OR auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin')
  );

-- Authenticated users can create donations
CREATE POLICY "Authenticated users can create donations"
  ON donations FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = donor_id
    AND auth.uid() IN (SELECT id FROM users_profile WHERE is_blocked = FALSE)
  );

-- Only admins can update donations (for verification)
CREATE POLICY "Only admins can update donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

-- Donation Proofs Policies
-- Anyone can view donation proofs
CREATE POLICY "Anyone can view donation proofs"
  ON donation_proofs FOR SELECT
  TO authenticated
  USING (true);

-- Post creators can upload proofs for their posts
CREATE POLICY "Post creators can upload proofs"
  ON donation_proofs FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = uploaded_by
    AND post_id IN (SELECT id FROM charity_posts WHERE created_by = auth.uid())
  );

-- Reports Policies
-- Only admins can view reports
CREATE POLICY "Only admins can view reports"
  ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

-- Authenticated users can create reports
CREATE POLICY "Authenticated users can create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = reported_by
    AND auth.uid() IN (SELECT id FROM users_profile WHERE is_blocked = FALSE)
  );

-- Only admins can update reports
CREATE POLICY "Only admins can update reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

-- Storage policies for image uploads
-- Create storage bucket for charity images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('charity-images', 'charity-images', true)
ON CONFLICT DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'charity-images'
  AND auth.uid() IN (SELECT id FROM users_profile WHERE is_blocked = FALSE)
);

-- Allow public access to read images
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'charity-images');

-- Allow users to delete their own uploads, admins can delete any
CREATE POLICY "Users can delete own uploads, admins can delete any"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'charity-images'
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin')
  )
);
