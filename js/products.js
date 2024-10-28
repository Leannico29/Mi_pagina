import { getAllProducts, paginateProducts } from './products/index.js';
import { orderProducts, searchProducts } from './products/order-and-filter/index.js';
import { renderCurrentPage, renderProducts } from './products/render/index.js';
import { searchBarListener } from './products/search/search.js';
import { params } from './helpers/get-query-params.js';

const PRODUCTS_PER_PAGE = 20;
let currentPage = 1;
let from = 1;
let to = PRODUCTS_PER_PAGE;
let totalPages = 1;

let productsArray = [];
let orderedProducts = [];
let filteredProducts = [];
let paginatedProducts = [];

/**
 * Updates 'from' and 'to' variables.
 *
 * @param {number} currentPage - The current page.
 */
const updateFromTo = (currentPage) => {
	from = currentPage * PRODUCTS_PER_PAGE - PRODUCTS_PER_PAGE + 1;
	to = currentPage * PRODUCTS_PER_PAGE;
};

/**
 * Updates the state of the pagination buttons.
 *
 * @param {number} totalPages - The total number of pages.
 */
const updatePaginationButtonsState = (totalPages) => {
	const firstPage = document.querySelector('#first-page');
	const previousPage = document.querySelector('#previous-page');
	const nextPage = document.querySelector('#next-page');
	const lastPage = document.querySelector('#last-page');

	if (currentPage === 1) {
		firstPage.setAttribute('disabled', true);
		previousPage.setAttribute('disabled', true);
	} else {
		firstPage.removeAttribute('disabled');
		previousPage.removeAttribute('disabled');
	}

	if (currentPage === totalPages) {
		nextPage.setAttribute('disabled', true);
		lastPage.setAttribute('disabled', true);
	} else {
		nextPage.removeAttribute('disabled');
		lastPage.removeAttribute('disabled');
	}
};

/**
 * Handles the pagination buttons.
 *
 * @param {PointerEvent} event - The event object.
 */
const handlePaginationButtons = async (event) => {
	const action = event.target.value;

	if (currentPage === 1 && (action === 'previous' || action === 'first')) return;
	if (currentPage === totalPages && (action === 'next' || action === 'last')) return;

	switch (action) {
		case 'previous':
			currentPage -= 1;
			break;
		case 'next':
			currentPage += 1;
			break;
		case 'first':
			currentPage = 1;
			break;
		case 'last':
			currentPage = totalPages;
			break;
	}

	updateFromTo(currentPage);
	renderCurrentPage(currentPage);

	paginatedProducts = await paginateProducts(orderedProducts, from, to);

	renderProducts(paginatedProducts);

	updatePaginationButtonsState(totalPages);
};

/**
 * Handles the change event of the select element.
 */
const handleSelectChange = async () => {
	const orderBy = document.querySelector('#order-by').value;

	orderedProducts = orderProducts(filteredProducts, orderBy);
	paginatedProducts = await paginateProducts(orderedProducts, from, to);

	renderProducts(paginatedProducts);
};

/**
 * Products page event listener.
 */
const productsEventListener = async () => {
	const searchQuery = params.get('search');

	//* Products variables
	productsArray = await getAllProducts();
	totalPages = Math.ceil(productsArray.length / PRODUCTS_PER_PAGE);

	if (searchQuery) {
		filteredProducts = searchProducts(productsArray, searchQuery);
	} else {
		filteredProducts = [...productsArray];
	}

	orderedProducts = [...filteredProducts];
	paginatedProducts = await paginateProducts(orderedProducts);

	renderProducts(paginatedProducts);

	//! event listeners

	//* Search bar
	document.querySelector('#search-button').addEventListener('click', searchBarListener);

	//* Order select
	document.querySelector('#order-by').addEventListener('change', handleSelectChange);

	//* Pagination
	document.querySelector('#previous-page').addEventListener('click', handlePaginationButtons);
	document.querySelector('#next-page').addEventListener('click', handlePaginationButtons);
	document.querySelector('#first-page').addEventListener('click', handlePaginationButtons);
	document.querySelector('#last-page').addEventListener('click', handlePaginationButtons);
};

document.addEventListener('DOMContentLoaded', productsEventListener);
