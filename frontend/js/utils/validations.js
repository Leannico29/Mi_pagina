/**
 * Check if a string is valid.
 *
 * @param {string} str - string to validate
 * @returns {boolean} true if the string is valid, false otherwise
 */
export const isValidString = (str) => {
	return str && str.trim().length > 0;
};

/**
 * Check if an email is valid.
 *
 * @param {string} email - Email to validate
 * @returns {boolean} true if the email is valid, false otherwise
 */
export const isValidEmail = (email) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
};

/**
 * Check if a number is valid.
 *
 * @param {number} number - Number to validate
 * @returns {boolean} true if the number is valid, false otherwise
 */
export const isValidNumber = (number) => {
	return !isNaN(number);
};

/**
 * Check if a product is valid.
 *
 * @param {Object} product - Product to validate
 * @returns {boolean} true if the product is valid, false otherwise
 */
export const isValidProduct = (product) => {
	return (
		product &&
		isValidString(product.name) &&
		isValidString(product.description) &&
		isValidNumber(product.price) &&
		isValidNumber(product.stock) &&
		isValidNumber(product.product_type) &&
		isValidNumber(product.brand) &&
		product.price >= 0 &&
		product.stock >= 0 &&
		product.product_type > 0 &&
		product.brand > 0
	);
};
