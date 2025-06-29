import User from '../models/userModel.js';
import path from 'path';

export const getUserProfile = async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required' });
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      profession: user.profession,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      pfp: user.pfp || ''
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) return res.status(400).json({ message: 'User email is required' });
    const updates = (({ name, email, dob, profession }) => ({ name, email, dob, profession }))(req.body);
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: updates },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      profession: user.profession,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      pfp: user.pfp || ''
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    console.log('UPLOAD DEBUG req.user:', req.user);
    console.log('UPLOAD DEBUG req.file:', req.file);
    const userEmail = req.user?.email;
    if (!userEmail) {
      console.log('UPLOAD ERROR: No user email');
      return res.status(400).json({ message: 'User email is required' });
    }
    if (!req.file) {
      console.log('UPLOAD ERROR: No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: { pfp: imagePath } },
      { new: true }
    );
    if (!user) {
      console.log('UPLOAD ERROR: User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile image updated', pfp: imagePath });
  } catch (error) {
    console.error('UPLOAD ERROR:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};
