const database = require('../config/database');

/**
 * Comprueba si ya existe un tipo de producto en la base de datos por su nombre.
 *
 * @param {string} name - Nombre de tipo de producto a comprobar.
 */
const checkDuplicateProductType = async (name) => {
	const [existingProductType] = await database.query(
		`SELECT id 
		FROM product_types 
		WHERE name = ?;`,
		[name]
	);

	return existingProductType;
};

/**
 * Obtiene todos los tipos de producto de la base de datos.
 */
const findAllProductTypes = async () => {
	const [productTypes] = await database.query(
		`
		SELECT * 
		FROM product_types;`
	);

	return productTypes;
};

/**
 * Obtiene un tipo de producto de la base de datos por su ID.
 *
 * @param {number} productTypeId - ID del tipo de producto a buscar.
 */
const findProductTypeById = async (productTypeId) => {
	const [productType] = await database.query(
		`
		SELECT * 
		FROM product_types
		WHERE id = ?;`,
		[productTypeId]
	);

	return productType;
};

/**
 * Inserta un tipo de producto en la base de datos.
 *
 * @param {string} type - Nombre del tipo de producto a insertar.
 */
const insertProductType = async (type) => {
	const [result] = await database.query(
		`INSERT INTO product_types (name) 
		VALUES (?);`,
		[type]
	);

	return result;
};

/**
 * Actualiza un tipo de producto en la base de datos.
 *
 * @param {Number} productTypeId - ID del tipo de producto a actualizar.
 * @param {string} updateFields - Campos a actualizar.
 */
const updateProductTypeById = async (productTypeId, updateFields) => {
	const setClause = Object.keys(updateFields)
		.map((key) => `${key} = ?`)
		.join(', ');

	const values = [...Object.values(updateFields), productTypeId];

	const [result] = await database.query(
		`
		UPDATE product_types 
		SET ${setClause} 
		WHERE id = ?;`,
		values
	);

	return result;
};

/**
 * Elimina un tipo de producto en la base de datos.
 *
 * @param {Number} productTypeId - ID del tipo de producto a eliminar.
 */
const deleteProductTypeById = async (productTypeId) => {
	const [result] = await database.query(
		`DELETE 
		FROM product_types 
		WHERE id = ?;`,
		[productTypeId]
	);

	return result;
};

module.exports = {
	checkDuplicateProductType,
	insertProductType,
	findAllProductTypes,
	findProductTypeById,
	updateProductTypeById,
	deleteProductTypeById,
};
