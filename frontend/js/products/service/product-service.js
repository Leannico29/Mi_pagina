const BASE_URL = 'http://localhost:3000/api';

/**
 * Get all products
 *
 * @param {number} page - The page number
 * @param {number} limit - The number of products per page
 * @param {string} q - The search query
 */
const getAllProducts = async (page = 1, limit = 20, term = null) => {
	let url = `${BASE_URL}/products?page=${page}&limit=${limit}`;

	if (term) {
		url += `&term=${term}`;
	}

	const response = await fetch(url);

	return await response.json();
};

const getAllProductsWithFilters = async ({
	page = 1,
	limit = 20,
	term = null,
	types = null,
	brands = null,
}) => {
	let url = `${BASE_URL}/products?page=${page}&limit=${limit}`;

	if (term) {
		url += `&term=${term}`;
	}

	if (types) {
		url += `&types=${types}`;
	}

	if (brands) {
		url += `&brands=${brands}`;
	}

	console.log('URL:', url);

	const response = await fetch(url);

	return await response.json();
};

const getAllProductTypes = async () => {
	const response = await fetch(`${BASE_URL}/products/types`);

	return await response.json();
};

const getAllBrands = async () => {
	const response = await fetch(`${BASE_URL}/products/brands`);

	return await response.json();
};

const getProductById = async (id) => {
	const response = await fetch(`${BASE_URL}/products/${id}`);

	return await response.json();
};

const getProductTypeById = async (typeId) => {
	const response = await fetch(`${BASE_URL}/products/types/${typeId}`);

	return await response.json();
};

const getBrandById = async (brandId) => {
	const response = await fetch(`${BASE_URL}/products/brands/${brandId}`);

	return await response.json();
};

const createProduct = async (product) => {
	const token = localStorage.getItem('token');

	const response = await fetch(`${BASE_URL}/products`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(product),
	});

	if (!response.ok) {
		const errorData = await response.json();
		console.error('Error al crear el producto:', errorData);
		throw new Error(errorData.message);
	}

	return await response.json();
};

const createProductType = async (name) => {
	const response = await fetch(`${BASE_URL}/products/types`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	});

	return await response.json();
};

const createBrand = async (name) => {
	const response = await fetch(`${BASE_URL}/products/brands`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	});

	return await response.json();
};

const updateProduct = async (id, product) => {
	const response = await fetch(`${BASE_URL}/products/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(product),
	});

	return await response.json();
};

const updateProductType = async (id, productType) => {
	const response = await fetch(`${BASE_URL}/products/types/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(productType),
	});

	return await response.json();
};

const updateBrand = async (id, brand) => {
	const response = await fetch(`${BASE_URL}/products/brands/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(brand),
	});

	return await response.json();
};

const deleteProduct = async (productId) => {
	const token = localStorage.getItem('token');

	const response = await fetch(`${BASE_URL}/products/${productId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	return await response.json();
};

const deleteProductType = async (typeId) => {
	const response = await fetch(`${BASE_URL}/products/${typeId}`, {
		method: 'DELETE',
	});

	return await response.json();
};

const deleteBrand = async (brandId) => {
	const response = await fetch(`${BASE_URL}/products/${brandId}`, {
		method: 'DELETE',
	});

	return await response.json();
};

export default {
	getAllProducts,
	getAllProductsWithFilters,
	getAllProductTypes,
	getAllBrands,
	getProductById,
	getProductTypeById,
	getBrandById,
	createProduct,
	createProductType,
	createBrand,
	updateProduct,
	updateProductType,
	updateBrand,
	deleteProduct,
	deleteProductType,
	deleteBrand,
};
