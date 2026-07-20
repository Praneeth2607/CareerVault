import * as userService from '../services/user.service.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await userService.getProfile(req.user.userId);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Old and new passwords are required' });
    }
    await userService.changePassword(req.user.userId, oldPassword, newPassword);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
