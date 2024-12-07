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
	let searchQuery = searchInput.value.trim();

	if (!isValidSearch(searchQuery)) {
		alert('Ingresa un valor en el campo de búsqueda');
		searchInput.value = '';
		return;
	}

	alert('Buscando: ' + searchQuery);
	searchInput.value = '';
	window.location.href = `products.html?search=${searchQuery}`;
};
