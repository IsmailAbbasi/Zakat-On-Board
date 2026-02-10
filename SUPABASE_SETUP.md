# Supabase Setup Guide for Zakat Onboard

This guide will walk you through setting up Supabase for the Zakat Onboard charity platform.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or sign in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: Zakat Onboard (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Free tier is sufficient to start
5. Click "Create new project" and wait for it to initialize (2-3 minutes)

## Step 2: Get Your Project Credentials

1. Once your project is ready, go to **Settings** (gear icon) → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`
3. Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

## Step 3: Run Database Migrations

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click "+ New query"
3. Copy and paste the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" or press `Ctrl/Cmd + Enter`
5. You should see "Success. No rows returned"

6. Create another new query
7. Copy and paste the entire contents of `supabase/migrations/002_rls_policies.sql`
8. Click "Run"
9. You should see success messages

## Step 4: Verify Tables

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - `users_profile`
   - `charity_posts`
   - `donations`
   - `donation_proofs`
   - `reports`

## Step 5: Configure Google OAuth

### Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if you haven't already
6. For Application type, choose **Web application**
7. Add these Authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for local development)
8. Click **Create**
9. Copy your **Client ID** and **Client Secret**

### Enable Google Provider in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Toggle **Enable Sign in with Google**
4. Paste your **Client ID** and **Client Secret**
5. Add these authorized redirect URLs:
   - `http://localhost:3000/auth/callback`
   - Add your production URL when you deploy
6. Click **Save**

## Step 6: Configure Storage

1. Go to **Storage** in the left sidebar
2. The `charity-images` bucket should be automatically created by the RLS policies
3. If not, click **New bucket**:
   - **Name**: `charity-images`
   - **Public bucket**: Yes (checked)
   - Click **Create bucket**

## Step 7: Set Up Your First Admin User

1. Start your Next.js app (`npm run dev`)
2. Go to `http://localhost:3000`
3. Click "Sign In with Google" and complete the OAuth flow
4. After signing in, go back to your Supabase dashboard
5. Go to **Table Editor** → `users_profile`
6. Find your user record (look for your email)
7. Click on the `role` cell and change it from `user` to `admin`
8. Click the checkmark to save
9. Sign out and sign back in to your app

You now have admin access!

## Step 8: Test Everything

1. Create a test charity post
2. Try donating to it
3. Upload an image (it should be compressed)
4. Access the admin panel at `/admin`
5. Verify you can see all posts, donations, and reports

## Troubleshooting

### Can't sign in with Google?
- Check that redirect URLs match exactly in both Google Console and Supabase
- Verify Google OAuth is enabled in Supabase Authentication → Providers
- Check browser console for errors

### Tables not created?
- Re-run the migration scripts
- Check for error messages in the SQL Editor
- Verify you have permission to create tables

### Images not uploading?
- Check that the `charity-images` bucket exists
- Verify it's set to public
- Check browser console for CORS errors

### Not seeing admin panel?
- Confirm your role is set to `admin` in the database
- Sign out and sign back in after changing role
- Check browser console for errors

## Security Best Practices

1. Never commit your `.env.local` file
2. Use strong database passwords
3. Regularly review RLS policies
4. Monitor Supabase logs for suspicious activity
5. Set up email notifications for authentication events

## Next Steps

- Deploy your application to Vercel or your preferred hosting
- Update production URLs in Google OAuth and Supabase
- Set up monitoring and analytics
- Configure email templates in Supabase (optional)

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Next.js Documentation](https://nextjs.org/docs)
