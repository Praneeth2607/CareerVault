import * as sessionRepo from '../repositories/session.repository.js';

export const getActiveSessions = async (userId) => {
  return sessionRepo.getActiveSessionsForUser(userId);
};

export const revokeSession = async (sessionId, userId) => {
  const session = await sessionRepo.getSessionById(sessionId);
  if (!session) throw new Error('Session not found');
  if (session.user_id !== userId) throw new Error('Unauthorized');
  
  await sessionRepo.deleteSession(sessionId);
};

export const revokeAllSessions = async (userId, currentSessionId) => {
  // Wait, if they revoke all, we might want to keep the current one active, but PRD says "Logout all sessions".
  // If they want to logout from *all* devices, it logs them out too.
  await sessionRepo.deleteAllSessionsForUser(userId);
};
