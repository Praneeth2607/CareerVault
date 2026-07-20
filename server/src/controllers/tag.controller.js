import * as tagRepo from '../repositories/tag.repository.js';

export const getTags = async (req, res) => {
  try {
    const tags = await tagRepo.getTagsForUser(req.user.userId);
    res.json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
