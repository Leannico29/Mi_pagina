/**
 * Get a product by id from a list of products.
 *
 * @param {number} productId - The id of the product to get.
 * @param {Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>} productList - The list of products.
 * @returns {{id, product_name, model_number, brand, price, img_url, product_type_id} | undefined} The product with the given id, or undefined if not found.
 */
export const getProductById = (productId, productList) => {
	return productList.find((product) => Number(product.id) === Number(productId));
};
