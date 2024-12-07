/**
 * Delay function.
 *
 * @param {number} ms miliseconds to delay. Default is 1000 (1 second).
 */
export const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
