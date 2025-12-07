import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'

export const db = drizzle(env.solid_tanstack_db)