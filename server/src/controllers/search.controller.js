import * as searchRepo from '../repositories/search.repository.js';

export const searchAssets = async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) {
      return res.json({ success: true, data: [] });
    }
    const results = await searchRepo.globalSearch(req.user.userId, q, type);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
