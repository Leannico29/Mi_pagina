import { isValidString } from '../../utils/validations.js';

/**
 * Search bar event listener.
 *
 * @returns {void}
 */
export const searchBarListener = () => {
	const searchInput = document.querySelector('#search-input');
	let searchQuery = searchInput.value.trim();

	if (!isValidString(searchQuery)) {
		alert('Ingresa un valor en el campo de búsqueda');
		searchInput.value = '';
		return;
	}

	alert('Buscando: ' + searchQuery);
	searchInput.value = '';
	window.location.href = `products.html?search=${searchQuery}`;
};
