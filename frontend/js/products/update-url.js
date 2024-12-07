import { slugify } from '../helpers/sluglify.js';

/**
 * Update the url with the product slug.
 *
 * @param {Object} product - The product object.
 */
export const updateUrl = (product) => {
	const simplifiedName = slugify(product.name);
	const url = `/productos/${product.id}-${simplifiedName}`;

	history.pushState(null, '', url);
};
