/**
 * Orders the products by different criteria.
 *
 * @param {Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>} products - The products to order.
 * @param {string} orderBy - The criteria to order the products.
 * @returns {Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>} orderedProducts - The ordered products.
 */
export const orderProducts = (products, orderBy) => {
	let sortedProducts = [];

	sortedProducts = products.sort((a, b) => {
		switch (orderBy) {
			case 'default':
				return a.id - b.id;
			case 'price-asc':
				return a.price - b.price;
			case 'price-desc':
				return b.price - a.price;
			case 'name-asc':
				return a.product_name.localeCompare(b.product_name);
			case 'name-desc':
				return b.product_name.localeCompare(a.product_name);
			default:
				console.error('Valor de orden inválido.');
				break;
		}
	});

	return sortedProducts;
};
