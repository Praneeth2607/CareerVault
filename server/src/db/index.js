import pg from 'pg';
const { Pool } = pg;

const dbUrl = process.env.DATABASE_URL;
const isLocal = !dbUrl || dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

export const query = (text, params) => pool.query(text, params);

