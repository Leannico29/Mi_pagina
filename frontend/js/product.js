import { getProductIdFromUrl, updateUrl } from './products/index.js';
import { renderProductPage } from './products/render/index.js';
import ProductService from './products/service/product-service.js';

/**
 * Load the product data from the server.
 */
const loadProductData = async () => {
	const productId = getProductIdFromUrl();

	try {
		const product = ProductService.getProductById(productId);

		renderProductPage(product);
		updateUrl(product);
	} catch (error) {
		console.error('Error loading product:', error);
		productPage.innerHTML = '<p>Error loading product. Please try again later.</p>';
	}
};

document.addEventListener('DOMContentLoaded', () => {
	const productPage = document.getElementById('product-page');

	renderProductPage(productPage, product);

	loadProductData();

	window.addEventListener('popstate', loadProductData);
});
