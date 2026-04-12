# Z4PHIM

A movie discovery and streaming web app built with Next.js App Router, focused on fast browsing, smart search, personalized watch activity, and account-based saved lists.

## Why This Project Stands Out

- Product-oriented thinking: this is a complete user flow, not just a movie list UI (register, login, save movies, watch history, account page).
- Practical architecture: clear separation between UI, API routes, service layer, and data layer.
- Performance-aware fetching: SSR and cache revalidation, plus multi-source fallback on movie detail pages.
- Better search quality: ranking, fallback queries, token scan, deduplication, and scoring.

## Core Features

- Dynamic homepage sections: trending, featured picks, genres, countries, and release years.
- Movie detail experience with player, source switch, server switch, and episode selection.
- Realtime search suggestions (debounced) and dedicated search results page.
- Email/password authentication with NextAuth Credentials.
- Personalization:
	- Save movies for later.
	- Track recent watch history.
	- Account page with user-specific saved and history data.
- Internal REST-style APIs implemented with App Router route handlers.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, App Router.
- Authentication: NextAuth (Credentials Provider).
- Database: PostgreSQL with Prisma ORM.
- Security: bcryptjs for password hashing.
- Styling: global CSS and component-level styling.

## System Design (High Level)

1. The UI layer calls service functions in the lib folder.
2. The service layer fetches external movie APIs and normalizes payloads.
3. App Router API routes handle user flows (register, saved list, watch history).
4. Prisma persists account and watch behavior data to PostgreSQL.

## Project Structure

```text
src/
	app/
		api/
			auth/[...nextauth]/route.ts
			register/route.ts
			saved/route.ts
			history/route.ts
		account/
		phim/[slug]/
		search/
	components/
	lib/
		api.ts
		phimapi.ts
		prisma.ts
	auth.ts
prisma/
	schema.prisma
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a .env file with the following values:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
# Optional: use DIRECT_URL if you keep a separate direct connection string
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"

# Useful for local development with self-signed certificates
PGSSL_ALLOW_SELF_SIGNED="false"

NEXTAUTH_SECRET="your-super-secret"
NEXTAUTH_URL="http://localhost:3000"

# External movie APIs
NEXT_PUBLIC_API_URL="https://your-primary-movie-api"
NEXT_PUBLIC_PHIMAPI_URL="https://your-secondary-movie-api"
NEXT_PUBLIC_PHIMAPI_IMAGE_PROXY=""
```

### 3) Prepare the database

```bash
npx prisma generate
npx prisma db push
```

### 4) Run the development server

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

- npm run dev: start local development.
- npm run build: create production build.
- npm run start: run the production build.
- npm run lint: run lint checks.

## Internal API Surface

- POST /api/register: create a new account.
- GET/POST/DELETE /api/saved: read, add, and remove saved movies.
- GET/POST /api/history: read and update watch history.
- GET/POST /api/auth/[...nextauth]: NextAuth handler.

## Data Source Note

This project uses publicly accessible third-party movie APIs for learning, technical experimentation, and portfolio purposes.

- The app does not host or store media content on its own server.
- The architecture is provider-agnostic, so official licensed providers can be swapped in for production use.

## Engineering Focus

- Build with maintainability and scalability in mind.
- Balance developer experience and user experience.
- Keep extension paths open for recommendations, analytics, admin tools, and richer personalization.

## Roadmap

- Improve SEO coverage for dynamic routes.
- Add test coverage for API routes and service logic.
- Add observability (structured logs and metrics) for production readiness.
- Add CI pipeline and automated deployment.

## License

MIT (or update to your preferred license).
