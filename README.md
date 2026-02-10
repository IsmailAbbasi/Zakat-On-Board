# Zakat Onboard - Charity Platform

A Next.js and Supabase powered charity platform connecting donors with people in need.

## Features

- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **Role-Based Access Control** - User and Admin roles with different permissions
- **Charity Post Management** - Create, view, edit, and delete charity requests
- **Direct Donations** - Donors send money directly to beneficiaries' UPI/bank accounts
- **Donation Tracking** - Upload payment proofs and track progress
- **Image Compression** - Automatic image compression to 1-2 MB
- **Location-Based Search** - Find charity requests in your area
- **WhatsApp Integration** - Contact post creators directly via WhatsApp
- **Report System** - Flag suspicious or fraudulent posts
- **Admin Panel** - Comprehensive admin dashboard for moderation

## Tech Stack

- **Frontend**: Next.js 16+ (App Router), React, JavaScript (JSX)
- **Backend**: Supabase (Authentication, Database, Storage)
- **Styling**: Tailwind CSS
- **Image Processing**: browser-image-compression
- **Icons**: Lucide React

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Google OAuth credentials

### 2. Supabase Setup

#### Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your project URL and anon key

#### Run Database Migrations

1. Go to SQL Editor in your Supabase dashboard
2. Run the SQL scripts in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`

#### Configure Google OAuth

1. In Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add authorized redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

#### Create Storage Bucket

The RLS policies automatically attempt to create the `charity-images` bucket. If it doesn't exist:
1. Go to Storage in Supabase Dashboard
2. Create a new bucket named `charity-images`
3. Make it public

### 3. Local Development Setup

```bash
# Clone or navigate to the project
cd Zakat-onboard

# Install dependencies
npm install

# Copy environment template and add your credentials
cp .env.example .env.local
# Then edit .env.local with your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

### 4. Set Up Admin User

After signing in with Google for the first time:

1. Go to Supabase Dashboard → Table Editor → `users_profile`
2. Find your user record
3. Change the `role` column from `user` to `admin`
4. Save the changes
5. Sign out and sign back in

You now have admin access!

## Project Structure

```
/app
  /admin          - Admin panel pages
  /api            - API routes
  /auth/callback  - OAuth callback handler
  /create         - Create charity post
  /my-posts       - User's posts
  /posts          - Post pages
/components
  /layout         - Navbar, Footer
  /ui             - Reusable UI components
/lib
  /hooks          - Custom React hooks
  /supabase       - Supabase client/server setup
  /utils          - Utility functions
/supabase
  /migrations     - Database migration scripts
```

## Important Notes

### Disclaimers

This platform facilitates direct peer-to-peer donations. The platform:
- Does NOT process any payments
- Does NOT verify all charity requests
- Is NOT liable for fraudulent activities
- Users donate at their own risk

Make sure users understand these disclaimers prominently displayed throughout the site.

### Admin Responsibilities

As an admin, you should:
- Regularly review reported posts
- Verify donation proofs when possible
- Delete clearly fraudulent requests
- Monitor for spam and abuse

### Security

- Admin roles are managed via database, not hardcoded
- All routes are protected with middleware
- RLS policies ensure data security
- File uploads are validated and compressed

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Update OAuth Redirect URLs

After deployment, add your production URL to:
1. Supabase → Authentication → URL Configuration
2. Google Cloud Console → OAuth 2.0 Client IDs

## License

This project is provided as-is for charitable purposes.
