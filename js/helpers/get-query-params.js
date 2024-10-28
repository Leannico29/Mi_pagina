/**
 * Get query params from URL
 * @type {URLSearchParams} params - URLSearchParams object
 * @example const search = params.get('search');
 * @example const page = params.get('page');
 * @example const id = params.get('id');
 */
export const params = new URLSearchParams(window.location.search);
