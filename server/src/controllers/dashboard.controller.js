import * as dashboardRepo from '../repositories/dashboard.repository.js';

export const getStats = async (req, res) => {
  try {
    const stats = await dashboardRepo.getStats(req.user.userId);
    res.json({ success: true, data: stats });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
};
