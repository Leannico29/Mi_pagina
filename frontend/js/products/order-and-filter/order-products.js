/**
 * Orders the products by different criteria.
 *
 * @param {Array<{id, name, description, brand, price, img_url, product_type, stock}>} products - The products to order.
 * @param {string} orderBy - The criteria to order the products.
 * @returns {Array<{id, name, description, brand, price, img_url, product_type, stock}>} orderedProducts - The ordered products.
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
				return a.name.localeCompare(b.name);
			case 'name-desc':
				return b.name.localeCompare(a.name);
			default:
				console.error('Valor de orden inválido.');
				break;
		}
	});

	return sortedProducts;
};
