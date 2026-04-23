# FreelanceHub

FreelanceHub is a full-stack freelancer workspace built to manage clients, projects, payments, and day-to-day operations from one dashboard.

## Live Demo

https://freelance-hub-one-mu.vercel.app/

## Dashboard Preview

<img width="2560" height="1434" alt="image" src="https://github.com/user-attachments/assets/bbdf930b-a3c0-4950-9f21-ce0bbb86bd84" />


## Features

- Secure authentication with Supabase Auth
- Dashboard overview with revenue, project, and deadline insights
- Client management
- Project creation and editing
- Payment logging and tracking
- Profile settings
- Client portal routes for users with configured access
- Responsive landing page

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `shadcn/ui`
- `Supabase`
- `Vercel`

## Main Routes

- `/` - landing page
- `/login` - sign in
- `/signup` - account creation
- `/dashboard` - overview dashboard
- `/dashboard/clients` - client management
- `/dashboard/projects` - project management
- `/dashboard/payments` - payment tracking
- `/dashboard/settings` - profile settings
- `/portal` - client portal

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run the SQL files in `supabase/migrations/` in order:

1. `001_initial_schema.sql`
2. `002_rls_updates.sql`

Start the development server:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run format
```

## Deployment

Set these environment variables in Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://freelance-hub-one-mu.vercel.app/
```

Also make sure your Supabase Auth redirect URLs include your deployed Vercel domain.

## Project Structure

```text
app/                    Next.js App Router pages and server actions
components/             UI, landing page, and dashboard components
lib/                    shared utilities and Supabase helpers
supabase/migrations/    database schema and RLS policies
public/                 static assets
```
