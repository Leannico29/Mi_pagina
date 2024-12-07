const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeUserByRole } = require('../middlewares/auth');
const {
	createProduct,
	updateProduct,
	getAllProducts,
	getProductById,
	deleteProduct,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.post('/', authenticateToken, authorizeUserByRole, createProduct);
router.put('/:productId', authenticateToken, authorizeUserByRole, updateProduct);
router.delete('/:productId', authenticateToken, authorizeUserByRole, deleteProduct);

module.exports = router;
