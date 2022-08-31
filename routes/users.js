const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const { getUserProfile,
        deleteUserProfile,
        changeUserProfilePassword} = require("../controllers/usersController");

router.get('/',authMiddleware, getUserProfile)
router.delete('/', authMiddleware, deleteUserProfile)
router.patch('/password', authMiddleware, changeUserProfilePassword)

module.exports = router;
