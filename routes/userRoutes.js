const express = require('express');
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
