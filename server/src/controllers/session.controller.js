import * as sessionService from '../services/session.service.js';

export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getActiveSessions(req.user.userId);
    // Mark which one is current
    const mapped = sessions.map(s => ({
      ...s,
      isCurrent: s.id === req.user.sessionId
    }));
    res.json({ success: true, data: mapped });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const revokeSession = async (req, res) => {
  try {
    await sessionService.revokeSession(req.params.id, req.user.userId);
    res.json({ success: true, message: 'Session revoked' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const revokeAllSessions = async (req, res) => {
  try {
    await sessionService.revokeAllSessions(req.user.userId, req.user.sessionId);
    res.json({ success: true, message: 'All sessions revoked' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
