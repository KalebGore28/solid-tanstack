# My TanStack Start App

A full-stack Solid application built with TanStack Start and deployed on Cloudflare.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack Solid framework with SSR
- **UI Library**: Solid JS 1.9.10
- **Routing**: TanStack Router with server-side rendering support
- **Data Fetching**: TanStack Solid Query with broadcast client and DB collection
- **Database**: Cloudflare D1 with Drizzle ORM
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS v4 with ShadCN-Solid/Radix UI components
- **Build Tool**: Vite
- **Testing**: Vitest with Testing Library
- **Deployment**: Cloudflare Workers (via Wrangler)
- **Language**: TypeScript

## Available Scripts

### Development

- `bun run dev` - Start the development server on port 3000
- `bun run build` - Build the application for production
- `bun run serve` or `bun run preview` - Preview the production build locally on port 3000

### Testing & Code Quality

- `bun test` - Run tests with Vitest
- `bun run lint` - Run ESLint
- `bun run format` - Run Prettier
- `bun run check` - Format code and fix linting issues

### Deployment

- `bun run deploy` - Build and deploy to Cloudflare Workers
- `bun run cf-typegen` - Generate TypeScript types for Cloudflare bindings

### Database (Drizzle + D1)

- `bun run d1:gen` - Generate database migrations
- `bun run d1:mig` - Apply migrations to the Cloudflare D1 database
- `bun run d1:studio` - Open Drizzle Studio to manage your database

## Getting Started

1. Install dependencies:

    ```bash
    bun install
    ```

2. Start the development server:

    ```bash
    bun run dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser
