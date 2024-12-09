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
