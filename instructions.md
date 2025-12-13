# Setup Instructions

Follow these steps to set up the project on your local machine.

## 1. Clone the Repository

Clone this project or click **Use this template** on GitHub, then pull the repository to your machine.

## 2. Install Dependencies

Once inside the cloned repository, install the required node packages:

```bash
bun install
# or
bun i
```

## 3. Configure Wrangler

Copy the example configuration file and update it with your actual values:

1. Rename `wrangler-example.jsonc` to `wrangler.jsonc`
2. Replace the placeholder values with your actual data
3. You'll find commented out examples for KV and D1 configurations

## 4. Configure Environment Variables

1. Rename `.env.example` to `.env`
2. Replace the placeholder values with your actual environment variables

## 5. Create KV Namespace

Create a KV namespace for authentication:

```bash
bunx wrangler kv namespace create <namespace-name>
```

**Example:**
```bash
bunx wrangler kv namespace create solid-tanstack-kv
```

**Tip:** You can allow Wrangler to automatically add the KV binding to your `wrangler.jsonc` file.
**Note:** Whatever binding name you use, make sure to update those binding names in `server.ts` and `auth.ts`

## 6. Create D1 Database

Create a D1 database:

```bash
bunx wrangler d1 create <database-name>
```

**Example:**
```bash
bunx wrangler d1 create solid-tanstack-db
```

**Tip:** You can allow Wrangler to automatically add the D1 binding to your `wrangler.jsonc` file.
**Note:** Whatever binding name you use, make sure to update those binding names in `server.ts` and `auth.ts`

## 7. Generate Cloudflare Types

Generate TypeScript types for Cloudflare Workers:

```bash
bun run cf-typegen
```

## 8. Apply Database Migrations

First you need to go to `package.json` and update the script `d1:mig` to match the databse name you give your database:

```
"d1:mig": "wrangler d1 migrations apply <database-name>"
```

Apply the database migration to your D1 database:

```bash
# For local database
bun run d1:mig

# For remote database
bun run d1:mig --remote
```

## Done!

Your application is now ready to use.
