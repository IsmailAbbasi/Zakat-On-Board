# Google OAuth Setup Guide for Zakat Onboard

## Problem You're Facing

When you click "Sign in with Google", you see the Supabase URL and after logging in, users don't appear in the database.

**Root Cause:** Google OAuth is not fully configured in Supabase.

---

## Solution - Follow These Steps EXACTLY

### Step 1: Run Database Migrations in Supabase

**CRITICAL:** You MUST run these SQL files in order:

1. **Go to Supabase Dashboard:** https://supabase.com/dashboard
2. **Select your project:** farwacrbqgnuojieyold
3. **Click SQL Editor** (in the left sidebar)
4. **Create a new query**

#### A. Run First Migration (Database Tables)

Copy the ENTIRE content of `supabase/migrations/001_initial_schema.sql` and paste into SQL Editor, then click **RUN**.

#### B. Run Second Migration (Security Policies)

Copy the ENTIRE content of `supabase/migrations/002_rls_policies.sql` and paste into SQL Editor, then click **RUN**.

#### C. Run Third Migration (Auth Trigger) - MOST IMPORTANT!

Copy the ENTIRE content of `supabase/migrations/003_auth_trigger.sql` and paste into SQL Editor, then click **RUN**.

This creates the trigger that automatically adds users to `users_profile` table when they sign in with Google!

---

### Step 2: Configure Google OAuth Credentials

#### A. Create Google OAuth App

1. **Go to:** https://console.cloud.google.com/
2. **Sign in** with your Google account
3. **Create a new project:**
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Name it: "Zakat Onboard"
   - Click CREATE

4. **Enable OAuth:**
   - In the left sidebar: APIs & Services → OAuth consent screen
   - Choose **External**
   - Fill in:
     - App name: `Zakat Onboard`
     - User support email: Your email
     - Developer contact: Your email
   - Click SAVE AND CONTINUE (skip optional fields)

5. **Create OAuth Credentials:**
   - Go to: APIs & Services → Credentials
   - Click "+ CREATE CREDENTIALS"
   - Select: **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: `Zakat Onboard Web Client`
   
6. **Add Authorized Redirect URI:**
   ```
   https://farwacrbqgnuojieyold.supabase.co/auth/v1/callback
   ```
   ⚠️ **IMPORTANT:** Copy this EXACTLY - no trailing slash!

7. **Click CREATE**
   - You'll see a popup with:
     - **Client ID** (ends with .apps.googleusercontent.com)
     - **Client Secret** (random string)
   - **COPY BOTH** - you'll need them next!

#### B. Add Credentials to Supabase

1. **Back in Supabase Dashboard:**
   - Go to: Authentication → Providers
   - Find **Google** in the list
   - Click to expand

2. **Enable Google:**
   - Toggle the switch to **ON**

3. **Paste your credentials:**
   - **Client ID:** (paste from Google Console)
   - **Client Secret:** (paste from Google Console)

4. **Click SAVE**

---

### Step 3: Test the Login

1. **Restart your dev server:**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Go to:** http://localhost:3000

3. **Click "Sign In with Google"**

4. **Choose your Google account**

5. **After successful login:**
   - You should be redirected back to the homepage
   - Your name/email should appear in the navbar
   - **Check Supabase:**
     - Go to Table Editor → `users_profile`
     - You should see your user there!

---

## Troubleshooting

### Issue: Still seeing Supabase URL when clicking Google login
**This is NORMAL!** Google always shows where you're signing in to. The URL will show your Supabase project domain.

### Issue: Users not appearing in database
**Solution:** Make sure you ran `003_auth_trigger.sql` - this is the trigger that creates user profiles!

### Issue: "Unauthorized" error after login
**Solutions:**
1. Check that Google Client ID and Secret are correct in Supabase
2. Verify the redirect URI in Google Console is EXACTLY:
   ```
   https://farwacrbqgnuojieyold.supabase.co/auth/v1/callback
   ```

### Issue: Can't access admin panel
**Solution:** 
1. First sign in with Google
2. Go to Supabase → Table Editor → `users_profile`
3. Find your user row
4. Change `role` from `user` to `admin`
5. Sign out and sign back in
6. Go to: http://localhost:3000/admin

---

## Summary Checklist

- [ ] Run `001_initial_schema.sql` in Supabase SQL Editor
- [ ] Run `002_rls_policies.sql` in Supabase SQL Editor
- [ ] Run `003_auth_trigger.sql` in Supabase SQL Editor (**CRITICAL!**)
- [ ] Create Google OAuth app in Google Console
- [ ] Add redirect URI: `https://farwacrbqgnuojieyold.supabase.co/auth/v1/callback`
- [ ] Get Client ID and Secret from Google
- [ ] Enable Google provider in Supabase Authentication
- [ ] Add Google Client ID and Secret to Supabase
- [ ] Restart dev server
- [ ] Test login
- [ ] Change your role to admin in `users_profile` table

---

## Your Supabase URLs

**Project URL:** https://farwacrbqgnuojieyold.supabase.co  
**Dashboard:** https://supabase.com/dashboard (select your project)  
**Redirect URI for Google Console:**
```
https://farwacrbqgnuojieyold.supabase.co/auth/v1/callback
```

---

Need help? The issue is most likely:
1. You haven't run the SQL migrations (especially `003_auth_trigger.sql`)
2. Google OAuth credentials not added to Supabase
3. Redirect URI doesn't match exactly
