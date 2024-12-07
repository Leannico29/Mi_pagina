import { delay } from '../helpers/delay.js';

/**
 * Get a list of all products.
 *
 * @returns {Promise<Array<{id, name, description, brand, price, img_url, product_type, stock}>>} products - An array of products
 */
export const getAllProducts = async () => {
	const response = await fetch('../data/mock_data.json');
	const products = await response.json();

	await delay();

	return products;
};
