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
		SELECT 	p.id AS id, 
				p.name AS name, 
				p.price AS price, 
				p.description AS description, 
				p.stock AS stock, 
				pt.name AS product_type, 
				b.name AS brand
		FROM 	products p, product_types pt, brands b
		WHERE 	p.product_type_id = pt.id
			AND p.brand_id = b.id
		LIMIT ? 
		OFFSET ?;`,
		[limit, offset]
	);

	return products;
};

const findProductsWithFilters = async (limit, offset, term, types, brands) => {
	let baseQuery = `
		SELECT 	p.id AS id, 
				p.name AS name, 
				p.price AS price, 
				p.description AS description, 
				p.stock AS stock, 
				pt.name AS product_type, 
				b.name AS brand
		FROM 	products p 
		JOIN 	product_types pt ON p.product_type_id = pt.id
		JOIN 	brands b ON p.brand_id = b.id
	`;

	const filters = [];
	const values = [limit, offset];

	if (term) {
		filters.push(`p.name LIKE '%${term}%'`);
	}

	if (types) {
		filters.push(`pt.id IN (${types})`);
	}

	if (brands) {
		filters.push(`b.id IN (${brands})`);
	}

	const whereClause =
		filters.length > 0
			? `WHERE	1 = 1 
				AND ${filters.join(' AND ')}`
			: '';

	if (whereClause.length > 0) {
		baseQuery += whereClause;
	}

	const [products] = await database.query(`${baseQuery} LIMIT ? OFFSET ?;`, [limit, offset]);

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
	findProductsWithFilters,
	deleteProductById,
};
