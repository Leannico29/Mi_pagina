import { updateCarousel } from './index-carousel/update-carousel.js';
import { searchBarListener } from './products/search/search.js';

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
