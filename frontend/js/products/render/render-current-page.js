/**
 * Renders the current page number.
 *
 * @param {number} page - The current page.
 */
export const renderCurrentPage = (page) => {
	const currentPageElement = document.querySelector('#current-page');
	currentPageElement.textContent = page;
};
