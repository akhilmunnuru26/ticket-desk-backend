import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'
import * as dotenv from 'dotenv';

dotenv.config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // This is needed for Render's managed Postgres. Remove if using local Postgres without SSL.
});

// Pass the pool to Drizzle
export const db = drizzle(pool, { schema });