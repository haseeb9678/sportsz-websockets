import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import pg from "pg"

const client = new pg.Pool(process.env.DATABASE_URL);

export const db = drizzle(client);