const ProductModel = require('../models/productModel');
const { validateSchema, createProductSchema, updateProductSchema } = require('../utils/validators');

const PAGINATION_NUMBER = 20;

/**
 * Obtención de todos los productos con paginación.
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const getAllProducts = async (req, res) => {
	try {
		let { limit, page } = req.query;
		limit = parseInt(limit, 10) || PAGINATION_NUMBER;
		page = parseInt(page, 10) || 1;
		const offset = (page - 1) * limit;

		const products = await ProductModel.findProductsWithPagination(limit, offset);

		console.log(products);

		res.json({
			status: 'success',
			data: products,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			status: 'error',
			message: 'Error al obtener productos',
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
const getProductById = async (req, res) => {
	try {
		let { productId } = req.params;
		productId = parseInt(productId, 10);

		const products = await ProductModel.findProductById(productId);

		if (products.length === 0) {
			return res.status(404).json({
				message: 'Producto no encontrado',
			});
		}

		res.json(products[0]);
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al obtener producto',
			error: error.message,
		});
	}
};

/**
 * Creación de producto
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const createProduct = async (req, res) => {
	try {
		const productData = { ...createProductSchema.parse(req.body) };
		const existingProduct = await ProductModel.checkDuplicateProduct(productData.name);

		if (existingProduct.length > 0) {
			return res.status(400).json({
				status: 'error',
				message: 'El producto ya está registrado',
			});
		}

		const result = await ProductModel.insertProduct({ ...productData });

		res.status(201).json({
			status: 'success',
			message: 'El producto se registró con éxito',
			productId: result.insertId,
		});
	} catch (error) {
		console.error(error);

		res.status(400).json({
			status: 'error',
			message: 'Error al registrar producto',
			error: error.message,
		});
	}
};

/**
 * Actualización de producto
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const updateProduct = async (req, res) => {
	try {
		const { productId } = req.params;
		const updateFields = updateProductSchema.parse(req.body);

		const result = await ProductModel.updateProductById(productId, updateFields);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				status: 'error',
				message: 'Producto no encontrado',
			});
		}

		res.json({
			status: 'success',
			message: 'El producto se ha actualizado con éxito',
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al actualizar el producto',
			error: error.message,
		});
	}
};

/**
 * Eliminación de producto
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const deleteProduct = async (req, res) => {
	try {
		const { productId } = req.params;

		const result = await ProductModel.deleteProductById(productId);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'Producto no encontrado',
			});
		}

		res.json({
			message: 'Producto eliminado con éxito',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al eliminar un producto',
			error: error.message,
		});
	}
};

module.exports = {
	createProduct: [validateSchema(createProductSchema), createProduct],
	updateProduct: [validateSchema(updateProductSchema), updateProduct],
	getAllProducts,
	getProductById,
	deleteProduct,
};
