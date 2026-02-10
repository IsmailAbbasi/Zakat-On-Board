-- Fix: Manually create user profiles for existing users who signed in before trigger was added
-- This will create profiles for all users in auth.users who don't have a profile yet

INSERT INTO public.users_profile (id, email, full_name, avatar_url, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.raw_user_meta_data->>'name', au.email) as full_name,
  au.raw_user_meta_data->>'avatar_url' as avatar_url,
  'user' as role
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users_profile up WHERE up.id = au.id
);

-- Verify the trigger exists and recreate if needed
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users_profile (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
