-- Add image_url column to charity_posts table
ALTER TABLE charity_posts 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create storage buckets for images
-- Note: Run these in Supabase Dashboard > Storage or via SQL

-- Storage bucket for donation request images
INSERT INTO storage.buckets (id, name, public)
VALUES ('donation-requests', 'donation-requests', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket for payment proof images
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for donation-requests bucket
CREATE POLICY "Anyone can view donation request images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'donation-requests');

CREATE POLICY "Authenticated users can upload donation request images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'donation-requests');

CREATE POLICY "Users can update own donation request images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'donation-requests' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own donation request images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'donation-requests' AND auth.uid()::text = (storage.foldername(name))[1]);

-- RLS policies for payment-proofs bucket
CREATE POLICY "Admins can view payment proofs"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'payment-proofs'
    AND EXISTS (
      SELECT 1 FROM users_profile 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can upload payment proofs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Users can view own payment proofs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);
