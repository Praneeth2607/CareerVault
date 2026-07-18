import { query } from '../db/index.js';

export const createUser = async ({ username, email, passwordHash, authProvider, googleId = null, githubId = null }) => {
  const sql = `
    INSERT INTO users (username, email, password_hash, auth_provider, google_id, github_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, username, email, auth_provider, created_at;
  `;
  const result = await query(sql, [username, email, passwordHash, authProvider, googleId, githubId]);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = $1`;
  const result = await query(sql, [email]);
  return result.rows[0];
};

export const getUserByUsername = async (username) => {
  const sql = `SELECT * FROM users WHERE username = $1`;
  const result = await query(sql, [username]);
  return result.rows[0];
};

export const getUserById = async (id) => {
  const sql = `SELECT id, username, email, auth_provider, created_at FROM users WHERE id = $1`;
  const result = await query(sql, [id]);
  return result.rows[0];
};
