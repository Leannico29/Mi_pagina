const ProductBrandModel = require('../models/productBrandModel');
const {
	validateSchema,
	createProductBrandSchema,
	updateProductBrandSchema,
} = require('../utils/validators');

/**
 * Obtención de todas las marcas de productos.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const getAllBrands = async (req, res) => {
	try {
		const brands = await ProductBrandModel.findAllBrands();

		res.json({
			status: 'success',
			data: brands,
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al obtener tipos de productos',
			error: error.message,
		});
	}
};

/**
 * Obtención de una marca de producto por ID.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const getBrandById = async (req, res) => {
	try {
		let { productBrandId } = req.params;
		productBrandId = parseInt(productBrandId, 10);

		const brands = await ProductBrandModel.findBrandById(productBrandId);

		if (brands.length === 0) {
			return res.status(404).json({
				message: 'Tipo de producto no encontrado',
			});
		}

		res.json(brands[0]);
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al obtener tipo de producto',
			error: error.message,
		});
	}
};

/**
 * Creación de una marca de producto.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const createProductBrand = async (req, res) => {
	try {
		const { name } = { ...createProductBrandSchema.parse(req.body) };
		const existingProductBrand = await ProductBrandModel.checkDuplicateProductBrand(name);

		if (existingProductBrand.length > 0) {
			return res.status(400).json({
				status: 'error',
				message: 'La marca de producto ya está registrado',
			});
		}

		const result = await ProductBrandModel.insertProductBrand(name);

		res.status(201).json({
			status: 'success',
			message: 'La marca se registró con éxito',
			brandId: result.insertId,
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'Error al registrar marca de producto',
			error: error.message,
		});
	}
};

/**
 * Actualización de una marca de producto.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const updateBrand = async (req, res) => {
	try {
		let { productBrandId } = req.params;
		productBrandId = parseInt(productBrandId, 10);

		const updateFields = updateProductBrandSchema.parse(req.body);

		const result = await ProductBrandModel.updateBrandById(productBrandId, updateFields);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				status: 'error',
				message: 'Marca no encontrada',
			});
		}

		res.json({
			status: 'success',
			message: 'La marca se ha actualizado con éxito',
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al actualizar marca',
			error: error.message,
		});
	}
};

/**
 * Eliminación de una marca de producto.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const deleteBrand = async (req, res) => {
	try {
		let { productBrandId } = req.params;
		productBrandId = parseInt(productBrandId, 10);

		const result = await ProductBrandModel.deleteBrandById(productBrandId);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'marca no encontrada',
			});
		}

		res.json({
			message: 'marca eliminada con éxito',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al eliminar marca',
			error: error.message,
		});
	}
};

module.exports = {
	createProductBrand: [validateSchema(createProductBrandSchema), createProductBrand],
	updateBrand: [validateSchema(updateProductBrandSchema), updateBrand],
	getAllBrands,
	getBrandById,
	deleteBrand,
};
