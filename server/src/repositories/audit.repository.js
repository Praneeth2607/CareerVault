import { query } from '../db/index.js';

export const logAction = async (userId, action, entityType, entityId) => {
  try {
    const sql = `
      INSERT INTO audit_logs (user_id, action, entity_type, entity_id)
      VALUES ($1, $2, $3, $4)
    `;
    await query(sql, [userId, action, entityType, entityId]);
  } catch (error) {
    // We log but do not throw, so audit logging doesn't break the main flow
    console.error('Failed to write audit log', error);
  }
};

export const getAuditLogs = async (userId) => {
  const sql = `SELECT * FROM audit_logs WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100`;
  const result = await query(sql, [userId]);
  return result.rows;
};
