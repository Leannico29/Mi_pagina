/**
 * Filter products by search.
 *
 * @param {Array<{id, name, description, brand, price, img_url, product_type, stock}>} productList - List of products to filter.
 * @param {string} searchToProduct - Product to search.
 * @returns {Array<{id, name, description, brand, price, img_url, product_type, stock}>} - List of products that match the search.
 */
export const searchProducts = (productList, searchToProduct) => {
	let coincidenceProducts = [];

	coincidenceProducts = productList.filter((product) => {
		const productName = product.name.toLowerCase();

		return productName.includes(searchToProduct.toLowerCase());
	});

	return coincidenceProducts;
};
