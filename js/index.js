import { loadCart } from './cart.js';
import { updateCarousel } from './index-carousel/update-carousel.js';
import { searchBarListener } from './products/search/search.js';
import { emptyCart } from './cart.js';


const indexEventListener = () => {
	loadCart();

	
	const images = document.querySelectorAll('.carousel img');
	const totalImages = images.length;
	let carouselCurrentIndex = 0;

	

	
	document.querySelector('.next')?.addEventListener('click', () => {
		carouselCurrentIndex = (carouselCurrentIndex + 1) % totalImages;
		updateCarousel(carouselCurrentIndex);
	});

	document.querySelector('.prev')?.addEventListener('click', () => {
		carouselCurrentIndex = (carouselCurrentIndex - 1 + totalImages) % totalImages;
		updateCarousel(carouselCurrentIndex);
	});

	
	document.querySelector('#search-button').addEventListener('click', searchBarListener);
	document.querySelector('#search-button').addEventListener('keypress', (e) => {
		if (e.key === 'Enter') searchBarListener();
	});

	
	document.querySelector('#empty-cart').addEventListener('click', emptyCart);
};

document.addEventListener('DOMContentLoaded', indexEventListener);
