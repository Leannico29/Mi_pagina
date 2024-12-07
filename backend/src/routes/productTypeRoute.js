const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeUserByRole } = require('../middlewares/auth');
const {
	createProductType,
	updateProductType,
	getProductTypeById,
	getAllProductTypes,
	deleteProductType,
} = require('../controllers/productTypeController');

router.get('/', getAllProductTypes);
router.get('/:productTypeId', getProductTypeById);
router.post('/', authenticateToken, authorizeUserByRole, createProductType);
router.put('/:productTypeId', authenticateToken, authorizeUserByRole, updateProductType);
router.delete('/:productTypeId', authenticateToken, authorizeUserByRole, deleteProductType);

module.exports = router;
