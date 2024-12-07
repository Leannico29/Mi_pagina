/**
 * Get product ID from URL
 *
 * @returns {string} - The product ID
 */
export const getProductIdFromUrl = () => {
	const pathSegments = window.location.pathname.split('/');
	const lastSegment = pathSegments[pathSegments.length - 1];

	return lastSegment.split('-')[0];
};
