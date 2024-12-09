const CartModel = require('../models/cartModel');

/**
 * Obtiene el carrito de un usuario.
 *
 * @param {Request} req - Petición.
 * @param {Response} res - Respuesta.
 */
const getCart = async (req, res) => {
	try {
		let { userId } = req.params;
		userId = parseInt(userId, 10);

		const cart = await CartModel.getUserCart(userId);

		if (cart.length === 0) {
			return res.status(404).json({
				message: 'Carrito no encontrado',
			});
		}

		console.log(cart);

		const cartItems = await CartModel.getCartItems(cart[0].id);

		res.json({
			status: 'success',
			cart,
			products: cartItems,
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al obtener carrito',
			error: error.message,
		});
	}
};
