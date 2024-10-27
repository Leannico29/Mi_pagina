/**
 * Fetches a list of products
 *
 * @param {number} from  - The first product to get
 * @param {number} to  - The last product to get
 * @returns {Promise<Array>} - An array of products
 */
export const getProducts = async (from = 1, to = 20) => {
	const response = await fetch('../data/mock_data.json');
	const products = await response.json();

	await delay();

	return products.slice(from - 1, to);
};

const delay = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
