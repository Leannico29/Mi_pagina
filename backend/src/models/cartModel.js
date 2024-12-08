const database = require('../config/database');

/**
 * Comprueba si ya existe un carrito en la base de datos por su ID de usuario.
 *
 * @param {number} userId - ID del usuario.
 */
const getUserCart = async (userId) => {
	const [cart] = await database.query(
		`
        SELECT * 
        FROM carts c
        WHERE c.user_id = ?;`,
		[userId]
	);

	return cart;
};

/**
 * Obtiene los productos de un carrito.
 *
 * @param {number} cartId - ID del carrito.
 */
const getCartItems = async (cartId) => {
	const [cartItems] = await database.query(
		`
		SELECT * 
		FROM carts_details
		WHERE cart_id = ?;`,
		[cartId]
	);

	return cartItems;
};

/**
 * Inserta un carrito en la base de datos.
 *
 * @param {number} userId - ID del usuario al que se le asignará el carrito.
 */
const insertCart = async (userId) => {
	const [cart] = await database.query(
		`
        INSERT INTO carts (user_id)
        VALUES (?);`,
		[userId]
	);

	return cart;
};

/**
 * Inserta un producto en el carrito.
 *
 * @param {number} cartId - ID del carrito.
 * @param {number} productId - ID del producto.
 * @param {number} quantity - Cantidad del producto.
 */
const insertProductToCart = async (cartId, productId, quantity) => {
	const [cartDetail] = await database.query(
		`
        INSERT INTO carts_details (cart_id, product_id, product_quantity)
        VALUES (?, ?, ?);`,
		[cartId, productId, quantity]
	);

	return cartDetail;
};

/**
 * Elimina un producto del carrito.
 *
 * @param {number} cartId - ID del carrito.
 * @param {number} productId - ID del producto.
 * @param {number} quantity - Cantidad del producto.
 */
const deleteProductFromCart = async (cartId, productId, quantity) => {
	const [cartDetail] = await database.query(
		`
        DELETE 
        FROM carts_details
        WHERE cart_id = ? 
            AND product_id = ? 
            AND product_quantity = ?;`,
		[cartId, productId, quantity]
	);

	return cartDetail;
};

module.exports = {
	getUserCart,
	insertCart,
	insertProductToCart,
	deleteProductFromCart,
};
