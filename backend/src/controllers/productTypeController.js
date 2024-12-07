const ProductTypeModel = require('../models/productTypeModel');
const {
	validateSchema,
	createProductTypeSchema,
	updateProductTypeSchema,
} = require('../utils/validators');

/**
 * Obtención de todos los tipos de productos.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const getAllProductTypes = async (req, res) => {
	try {
		const productTypes = await ProductTypeModel.findAllProductTypes();

		res.json({
			status: 'success',
			data: productTypes,
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
 * Obtención de un producto por ID.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const getProductTypeById = async (req, res) => {
	try {
		let { productTypeId } = req.params;
		productTypeId = parseInt(productTypeId, 10);

		const productTypes = await ProductTypeModel.findProductTypeById(productTypeId);

		if (productTypes.length === 0) {
			return res.status(404).json({
				message: 'Tipo de producto no encontrado',
			});
		}

		res.json(productTypes[0]);
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al obtener tipo de producto',
			error: error.message,
		});
	}
};

/**
 * Creación de tipo de producto
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const createProductType = async (req, res) => {
	try {
		const { name } = { ...createProductTypeSchema.parse(req.body) };
		const existingProductType = await ProductTypeModel.checkDuplicateProductType(name);

		if (existingProductType.length > 0) {
			return res.status(400).json({
				status: 'error',
				message: 'El tipo de producto ya está registrado',
			});
		}

		const result = await ProductTypeModel.insertProductType(name);

		res.status(201).json({
			status: 'success',
			message: 'El tipo de producto se registró con éxito',
			productTypeId: result.insertId,
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'Error al registrar tipo de producto',
			error: error.message,
		});
	}
};

/**
 * Actualización de tipo de producto
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const updateProductType = async (req, res) => {
	try {
		let { productTypeId } = req.params;
		productTypeId = parseInt(productTypeId, 10);

		const updateFields = updateProductTypeSchema.parse(req.body);

		const result = await ProductTypeModel.updateProductTypeById(productTypeId, updateFields);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				status: 'error',
				message: 'Tipo de producto no encontrado',
			});
		}

		res.json({
			status: 'success',
			message: 'El tipo de producto se ha actualizado con éxito',
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al actualizar tipo de producto',
			error: error.message,
		});
	}
};

/**
 * Eliminación de tipo de producto
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const deleteProductType = async (req, res) => {
	try {
		let { productTypeId } = req.params;
		productTypeId = parseInt(productTypeId, 10);

		const result = await ProductTypeModel.deleteProductTypeById(productTypeId);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'Tipo de producto no encontrado',
			});
		}

		res.json({
			message: 'Tipo de producto eliminado con éxito',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al eliminar tipo de producto',
			error: error.message,
		});
	}
};

module.exports = {
	createProductType: [validateSchema(createProductTypeSchema), createProductType],
	updateProductType: [validateSchema(updateProductTypeSchema), updateProductType],
	getAllProductTypes,
	getProductTypeById,
	deleteProductType,
};
