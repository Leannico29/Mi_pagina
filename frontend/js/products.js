import { getAllProducts, paginateProducts } from './products/index.js';
import { orderProducts, searchProducts } from './products/order-and-filter/index.js';
import { renderCurrentPage, renderProducts } from './products/render/index.js';
import { searchBarListener } from './products/search/search.js';
import { params } from './helpers/get-query-params.js';
import { loadCart, emptyCart } from './cart.js';
import ProductService from './products/service/product-service.js';

const PRODUCTS_PER_PAGE = 20;
let currentPage = 1;
let from = 1;
let to = PRODUCTS_PER_PAGE;
let totalPages = 1;

let productsArray = [];
let orderedProducts = [];
let filteredProducts = [];
let paginatedProducts = [];

let productTypes = [];
let productBrands = [];

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

	// paginatedProducts = await paginateProducts(orderedProducts, from, to);

	renderProducts(orderedProducts);

	updatePaginationButtonsState(totalPages);
};

/**
 * Handles the change event of the select element.
 */
const handleSelectChange = async () => {
	const orderBy = document.querySelector('#order-by').value;

	orderedProducts = orderProducts(productsArray, orderBy);
	// paginatedProducts = await paginateProducts(orderedProducts, from, to);

	renderProducts(orderedProducts);
};

const handleFilter = async () => {
	const searchQuery = params.get('search');

	const checkedBrands = Array.from(
		document.querySelectorAll('#brand-filter-list input:checked')
	).map((input) => input.dataset.id);
	const checkedTypes = Array.from(
		document.querySelectorAll('#type-filter-list input:checked')
	).map((input) => input.dataset.id);

	const brandsString = checkedBrands.join(',');
	const typesString = checkedTypes.join(',');

	filteredProducts = await ProductService.getAllProductsWithFilters({
		term: searchQuery,
		brands: brandsString,
		types: typesString,
	})
		.then((response) => {
			console.warn('Filtered products:', response.data);

			return response.data;
		})
		.catch((error) => {
			console.error('Error filtering products:', error);
		});

	productsArray = parseProducts(filteredProducts);
	handleSelectChange();
};

const parseProducts = (products) => {
	const parsedProducts = products.map((product) => {
		product.price = parseFloat(product.price);
		product.img_url =
			product.img_url ||
			'https://www.tablecraft.com/sca-dev-2023-2-0/img/no_image_available.jpeg';

		return product;
	});

	return parsedProducts;
};

/**
 * Products page event listener.
 */
const productsEventListener = async () => {
	loadCart();
	const searchQuery = params.get('search');
	const page = params.get('page') || 1;

	if (searchQuery) {
		document.querySelector('#search-input').value = searchQuery;
	}

	//* Products variables

	ProductService.getAllBrands().then((response) => {
		const { data } = response;
		const filterDiv = document.querySelector('#brand-filter');
		const filterUl = filterDiv.lastElementChild;

		filterUl.innerHTML = '';
		filterUl.setAttribute('id', 'brand-filter-list');

		data.forEach((brand) => {
			const li = document.createElement('li');
			li.classList.add('filter-item');

			const label = document.createElement('label');
			label.htmlFor = `brand-${brand.id}`;

			const input = document.createElement('input');
			input.type = 'checkbox';
			input.name = `brand-${brand.id}`;
			input.dataset.id = brand.id;
			input.checked = true;
			input.id = `brand-${brand.id}`;

			label.textContent = brand.name;

			li.appendChild(input);
			li.appendChild(label);

			filterUl.appendChild(li);
		});
	});

	ProductService.getAllProductTypes().then((response) => {
		const { data } = response;
		const filterDiv = document.querySelector('#type-filter');
		const filterUl = filterDiv.lastElementChild;

		filterUl.innerHTML = '';
		filterUl.setAttribute('id', 'type-filter-list');

		data.forEach((type) => {
			const li = document.createElement('li');
			li.classList.add('filter-item');

			const label = document.createElement('label');
			label.htmlFor = `type-${type.id}`;

			const input = document.createElement('input');
			input.type = 'checkbox';
			input.name = `type`;
			input.dataset.id = type.id;
			input.checked = true;
			input.id = `type-${type.id}`;

			label.textContent = type.name;

			li.appendChild(input);
			li.appendChild(label);

			filterUl.appendChild(li);
		});

		const type = params.get('type') || '';

		if (type) {
			document.querySelectorAll(`input[type="checkbox"][name="type"]`).forEach((input) => {
				console.log(input);

				input.checked = false;
			});

			document.querySelector(
				`input[type="checkbox"][name="type"][data-id="${type}"]`
			).checked = true;

			handleFilter();
		}
	});

	ProductService.getAllProducts(null, null, searchQuery)
		.then((response) => {
			const { data } = response;
			productsArray = data;

			productsArray = parseProducts(productsArray);

			console.log('Products:', productsArray);

			return productsArray;
		})
		.then((products) => {
			renderProducts(products);
		})
		.catch((error) => {
			console.error('Error loading products:', error);
		});

	//! event listeners

	//* Search bar
	document.querySelector('#search-button').addEventListener('click', searchBarListener);
	document.querySelector('#search-button').addEventListener('keypress', (e) => {
		if (e.key === 'Enter') searchBarListener();
	});

	//* Empty cart
	document.querySelector('#empty-cart').addEventListener('click', emptyCart);

	//* Order select
	document.querySelector('#order-by').addEventListener('change', handleSelectChange);

	//* Pagination
	document.querySelector('#previous-page').addEventListener('click', handlePaginationButtons);
	document.querySelector('#next-page').addEventListener('click', handlePaginationButtons);
	document.querySelector('#first-page').addEventListener('click', handlePaginationButtons);
	document.querySelector('#last-page').addEventListener('click', handlePaginationButtons);

	//* Filter checkboxes
	document.querySelector('#filter').addEventListener('click', handleFilter);
};

document.addEventListener('DOMContentLoaded', productsEventListener);
