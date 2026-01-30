# Email Signature Manager

Centralized email signature management for teams. Deploy consistent, branded signatures to Google Workspace and Microsoft 365.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase Postgres + Drizzle ORM
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe
- **Hosting**: Netlify

## Project Structure

```
/
├── apps/
│   └── web/          # Next.js application (dashboard + API)
├── packages/
│   └── shared/       # Shared types, schemas, constants
├── package.json      # Root package.json (workspaces)
└── turbo.json        # Turborepo config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+
- Supabase account
- Stripe account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kcooper81/email-signature-manager.git
   cd email-signature-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
   
   Fill in your Supabase and Stripe credentials.

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Key Features

- **Visual Signature Editor**: Drag-and-drop blocks with live preview
- **Template Variables**: Auto-populate user data (name, title, phone, etc.)
- **Team Management**: Assign signatures by user or department
- **Provider Integration**: Deploy to Google Workspace & Microsoft 365
- **Scheduled Banners**: Time-limited promotional banners
- **Audit Logging**: Track all signature changes and deployments
- **Rate Limiting**: Built-in API rate limiting for provider APIs

## Architecture Decisions

### JSON Block Storage
Signatures are stored as structured JSON blocks, not raw HTML. This enables:
- Safe editing without HTML corruption
- Reliable previews
- Easy rule-based modifications
- Email-safe HTML rendering via MJML

### Single Vendor (Supabase)
Auth, database, and storage all use Supabase to minimize vendor sprawl and simplify operations.

### No Microservices
Everything runs in Next.js API routes. Split later if needed—don't start there.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |

## Environment Variables

See `apps/web/.env.example` for required variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `DATABASE_URL` - Postgres connection string
- `STRIPE_SECRET_KEY` - Stripe secret key
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
- `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` - Microsoft OAuth

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `apps/web/.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

## License

MIT
