const database = require('../config/database');

/**
 * Comprueba si ya existe una marca de producto en la base de datos por su nombre.
 *
 * @param {string | null | undefined} name - Nombre de la marca a comprobar.
 */
const checkDuplicateProductBrand = async (name) => {
	const [existingProductBrand] = await database.query(
		`SELECT id 
		FROM brands 
		WHERE name = ?;`,
		[name]
	);

	return existingProductBrand;
};

/**
 * Obtiene todas las marcas de producto de la base de datos.
 */
const findAllBrands = async () => {
	const [productTypes] = await database.query(
		`
		SELECT * 
		FROM brands;`
	);

	return productTypes;
};

/**
 * Obtiene una marca de producto de la base de datos por su ID.
 *
 * @param {number} productBrandId - ID del tipo de producto a buscar.
 */
const findBrandById = async (productBrandId) => {
	const [productType] = await database.query(
		`
		SELECT * 
		FROM brands
		WHERE id = ?;`,
		[productBrandId]
	);

	return productType;
};

/**
 * Inserta una marca de producto en la base de datos.
 *
 * @param {string} brand - Nombre de la marca de producto a insertar.
 */
const insertProductBrand = async (brand) => {
	const [result] = await database.query(
		`INSERT INTO brands (name) 
		VALUES (?);`,
		[brand]
	);

	return result;
};

/**
 * Actualiza una marca de producto en la base de datos.
 *
 * @param {number} productBrandId - ID de la marca de producto a actualizar.
 * @param {string} updateFields - Campos a actualizar.
 */
const updateBrandById = async (productBrandId, updateFields) => {
	const setClause = Object.keys(updateFields)
		.map((key) => `${key} = ?`)
		.join(', ');

	const values = [...Object.values(updateFields), productBrandId];

	const [result] = await database.query(
		`
		UPDATE brands 
		SET ${setClause} 
		WHERE id = ?;`,
		values
	);

	return result;
};

/**
 * Elimina una marca de producto en la base de datos.
 *
 * @param {Number} productBrandId - ID de la marca de producto a eliminar.
 */
const deleteBrandById = async (productBrandId) => {
	const [result] = await database.query(
		`DELETE 
		FROM brands 
		WHERE id = ?;`,
		[productBrandId]
	);

	return result;
};

module.exports = {
	checkDuplicateProductBrand,
	insertProductBrand,
	findAllBrands,
	findBrandById,
	updateBrandById,
	deleteBrandById,
};
