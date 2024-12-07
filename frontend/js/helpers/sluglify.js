/**
 * Converts a text to a URL-friendly slug.
 *
 * @param {string} text - The text to be slugified.
 * @returns  {string} - The slugified text.
 */
export const slugify = (text) => {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-');
};
