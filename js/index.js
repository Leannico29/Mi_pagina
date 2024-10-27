import { updateCarousel } from './index-carousel/update-carousel.js';

/**
 * Check if a search query is valid.
 *
 * @param {string} searchQuery query to validate
 * @returns {boolean} true if the query is valid, false otherwise
 */
const isValidSearch = (searchQuery) => {
	return searchQuery && searchQuery.trim().length > 0;
};

/**
 * Search bar event listener.
 *
 * @returns {void}
 */
export const searchBarListener = () => {
	const searchInput = document.querySelector('#search-input');
	let searchQuery = searchInput.value;

	if (!isValidSearch(searchQuery)) {
		alert('Ingresa un valor en el campo de búsqueda');
		searchInput.value = '';
		return;
	}

	alert('Buscando: ' + searchQuery);
	searchInput.value = '';
};

/**
 * Index page event listener.
 */
const indexEventListener = () => {
	//* Carousel variables
	const images = document.querySelectorAll('.carousel img');
	const totalImages = images.length;
	let carouselCurrentIndex = 0;

	//! event listeners

	//* Carousel
	document.querySelector('.next')?.addEventListener('click', () => {
		carouselCurrentIndex = (carouselCurrentIndex + 1) % totalImages;
		updateCarousel(carouselCurrentIndex);
	});

	document.querySelector('.prev')?.addEventListener('click', () => {
		carouselCurrentIndex = (carouselCurrentIndex - 1 + totalImages) % totalImages;
		updateCarousel(carouselCurrentIndex);
	});

	//* Search bar
	document.querySelector('#search-button').addEventListener('click', searchBarListener);
};

document.addEventListener('DOMContentLoaded', indexEventListener);
