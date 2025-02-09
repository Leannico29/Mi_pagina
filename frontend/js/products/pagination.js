import { delay } from '../helpers/delay.js';

/**
 * Get a list of products based on the given range.
 *
 * @param {Array<{id, name, description, brand, price, img_url, product_type, stock}>} products - The list of products to paginate.
 * @param {number} from - The first product to get.
 * @param {number} to - The last product to get.
 * @returns {Promise<Array<{id, name, description, brand, price, img_url, product_type, stock}>>} - An array of products.
 */
export const paginateProducts = async (products, from = 1, to = 20) => {
	if (!isValidRange(products, from, to)) throw new Error('Rango inválido en paginateProducts.');

	const paginatedProducts = products.slice(from - 1, to);

	await delay();

	return new Promise((resolve) => resolve(paginatedProducts));
};

/**
 * Validates the range of products.
 *
 * @param {Array<{id, name, description, brand, price, img_url, product_type, stock}>} products - The list of products to validate.
 * @param {number} from - The first product to get.
 * @param {number} to - The last product to get.
 * @returns {boolean} - True if the range is valid, false otherwise.
 */
const isValidRange = (products, from, to) => {
	if (from < 1 || to < 1) return false;
	if (from > to) return false;
	if (from > products.length) return false;
	if (to > products.length) return false;
	if (products.length === 0) return false;

	return true;
};
