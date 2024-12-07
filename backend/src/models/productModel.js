const database = require('../config/database');

/**
 * Comprueba si ya existe un producto en la base de datos por su nombre.
 *
 * @param {string | null | undefined} name - Nombre de producto a comprobar.
 * @param {string | null | undefined} email - Email a comprobar.
 */
const checkDuplicateProduct = async (name) => {
	const [existingProduct] = await database.query(
		`SELECT id 
		FROM products 
		WHERE name = ?;`,
		[name]
	);

	return existingProduct;
};

const findProductById = async (productId) => {
	const [products] = await database.query(
		`
		SELECT * 
		FROM products 
		WHERE id = ?;`,
		[productId]
	);

	return products;
};

const findProductsWithPagination = async (limit, offset) => {
	const [products] = await database.query(
		`
		SELECT * 
		FROM products 
		LIMIT ? OFFSET ?;`,
		[limit, offset]
	);

	return products;
};

/**
 * Inserta un producto en la base de datos.
 *
 * @param {{name: string, price: number, description: string, product_type_id: number, product_brand_id: number, stock?: number}} product - Producto a insertar.
 */
const insertProduct = async (product) => {
	const productValues = [];

	const insertValues = Object.values(product)
		.map((value) => {
			productValues.push(value);
			return '?';
		})
		.join(', ');

	const insertKeys = Object.keys(product).join(', ');

	const [result] = await database.query(
		`INSERT INTO products (${insertKeys}) 
		VALUES (${insertValues});`,
		[...productValues]
	);

	return result;
};

/**
 * Actualiza un producto por ID.
 *
 * @param {number} productId - ID del producto a actualizar.
 * @param {{name?: string, price?: number, description?: string, productTypeId?: number, productBrandId?: number, stock?: number}} updateFields - Campos a actualizar.
 */
const updateProductById = async (productId, updateFields) => {
	const setClause = Object.keys(updateFields)
		.map((key) => `${key} = ?`)
		.join(', ');

	const values = [...Object.values(updateFields), productId];

	const [result] = await database.query(
		`
		UPDATE products 
		SET ${setClause} 
		WHERE id = ?;`,
		values
	);

	return result;
};

/**
 * Elimina un producto por ID.
 *
 * @param {number} productId - ID del producto a eliminar.
 */
const deleteProductById = async (productId) => {
	const [result] = await database.query(
		`
		DELETE 
		FROM products 
		WHERE id = ?;`,
		[productId]
	);

	return result;
};

module.exports = {
	checkDuplicateProduct,
	insertProduct,
	updateProductById,
	findProductById,
	findProductsWithPagination,
	deleteProductById,
};
