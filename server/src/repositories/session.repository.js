import { query } from '../db/index.js';

export const createSession = async ({ userId, refreshTokenHash, deviceName, ipAddress, userAgent, expiresAt }) => {
  const sql = `
    INSERT INTO sessions (user_id, refresh_token_hash, device_name, ip_address, user_agent, expires_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const result = await query(sql, [userId, refreshTokenHash, deviceName, ipAddress, userAgent, expiresAt]);
  return result.rows[0];
};

export const getSessionById = async (id) => {
  const sql = `SELECT * FROM sessions WHERE id = $1`;
  const result = await query(sql, [id]);
  return result.rows[0];
};

export const deleteSession = async (id) => {
  const sql = `DELETE FROM sessions WHERE id = $1 RETURNING id`;
  const result = await query(sql, [id]);
  return result.rows[0];
};

export const deleteAllSessionsForUser = async (userId) => {
  const sql = `DELETE FROM sessions WHERE user_id = $1`;
  await query(sql, [userId]);
};

export const getActiveSessionsForUser = async (userId) => {
  const sql = `SELECT id, device_name, ip_address, user_agent, created_at, last_used_at, expires_at FROM sessions WHERE user_id = $1 AND expires_at > NOW()`;
  const result = await query(sql, [userId]);
  return result.rows;
};
