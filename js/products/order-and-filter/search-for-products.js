/**
 * Filter products by search.
 *
 * @param {Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>} productList - List of products to filter.
 * @param {string} searchToProduct - Product to search.
 * @returns {Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>} - List of products that match the search.
 */
export const searchProducts = (productList, searchToProduct) => {
	let coincidenceProducts = [];

	coincidenceProducts = productList.filter((product) => {
		const productName = product.product_name.toLowerCase();

		return productName.includes(searchToProduct.toLowerCase());
	});

	return coincidenceProducts;
};
