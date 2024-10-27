import { searchBarListener } from './index.js';
import { getProducts } from './products/get-products.js';
import { renderProducts } from './products/render-products.js';

let productsArray = [];

/**
 * Products page event listener.
 */
const productsEventListener = async () => {
	//* Products variables

	productsArray = await getProducts();
	renderProducts(productsArray);

	//! event listeners

	//* Search bar
	document.querySelector('#search-button').addEventListener('click', searchBarListener);
};

document.addEventListener('DOMContentLoaded', productsEventListener);
