/**
 * Get a list of all products.
 *
 * @returns {Promise<Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>>} - An array of products
 */
export const getAllProducts = async () => {
	const response = await fetch('../data/mock_data.json');
	const products = await response.json();

	await delay();

	return products;
};

/**
 * Get a list of products based on the given range.
 *
 * @param {Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>} products - The list of products to paginate.
 * @param {number} from - The first product to get.
 * @param {number} to - The last product to get.
 * @returns {Promise<Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>>} - An array of products.
 */
export const paginateProducts = async (products, from = 1, to = 20) => {
	if (!isValidRange(from, to, products)) return [];

	const paginatedProducts = products.slice(from - 1, to);

	await delay();

	return new Promise((resolve) => resolve(paginatedProducts));
};

const isValidRange = (from, to, products) => {
	if (from < 1 || to < 1) return false;
	if (from > to) return false;
	if (from > products.length) return false;
	if (to > products.length) return false;
	if (products.length === 0) return false;

	return true;
};

const delay = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
