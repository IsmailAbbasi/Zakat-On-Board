-- Add status column to donations table
ALTER TABLE donations 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected'));

-- Update existing records based on is_verified
UPDATE donations 
SET status = CASE 
  WHEN is_verified = true THEN 'verified'
  ELSE 'pending'
END
WHERE status IS NULL OR status = 'pending';
