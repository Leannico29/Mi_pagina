/**
 * Get a product by id from a list of products.
 *
 * @param {number} productId - The id of the product to get.
 * @param {Array<{id, name, description, brand, price, img_url, product_type, stock}>} productList - The list of products.
 * @returns {{id, name, description, brand, price, img_url, product_type, stock} | undefined} The product with the given id, or undefined if not found.
 */
export const getProductById = (productId, productList) => {
	return productList.find((product) => Number(product.id) === Number(productId));
};
