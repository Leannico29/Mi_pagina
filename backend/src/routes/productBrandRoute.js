const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeUserByRole } = require('../middlewares/auth');
const {
	createProductBrand,
	updateBrand,
	getAllBrands,
	getBrandById,
	deleteBrand,
} = require('../controllers/productBrandController');

router.get('/', getAllBrands);
router.get('/:productBrandId', getBrandById);
router.post('/', authenticateToken, authorizeUserByRole, createProductBrand);
router.put('/:productBrandId', authenticateToken, authorizeUserByRole, updateBrand);
router.delete('/:productBrandId', authenticateToken, authorizeUserByRole, deleteBrand);

module.exports = router;
