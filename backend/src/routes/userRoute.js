const express = require('express');
const router = express.Router();
const {
	authenticateToken,
	authorizeUserByRole,
	authorizeUserByRoleOrSelf,
} = require('../middlewares/auth');
const {
	createUser,
	updateUser,
	deleteUser,
	getAllUsers,
	getUserById,
	login,
} = require('../controllers/userController');

router.post('/register', createUser);
router.post('/login', login);
router.get('/users', authenticateToken, authorizeUserByRole, getAllUsers);
router.get('/users/:userId', authenticateToken, authorizeUserByRole, getUserById);
router.put('/users/:userId', authenticateToken, authorizeUserByRoleOrSelf, updateUser);
router.delete('/users/:userId', authenticateToken, authorizeUserByRoleOrSelf, deleteUser);

module.exports = router;
