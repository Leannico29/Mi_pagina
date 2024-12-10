import ProductService from './products/service/product-service.js';
import { isValidProduct } from './utils/validations.js';

// Referencias a los formularios
const addProductForm = document.getElementById('addProductForm');
const editProductForm = document.getElementById('editProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');

// Botones principales
const addProductBtn = document.getElementById('addProductBtn');
const editProductBtn = document.getElementById('editProductBtn');
const deleteProductBtn = document.getElementById('deleteProductBtn');

// Botones de carga de productos
const fetchAllProductsForEdit = document.getElementById('fetchAllProductsForEdit');
const fetchAllProductsForDelete = document.getElementById('fetchAllProductsForDelete');

// Tablas
const editProductsTable = document.getElementById('editProductsTable');
const deleteProductsTable = document.getElementById('deleteProductsTable');

// Array global de productos
let productsArray = [];

// **Mostrar/ocultar formularios**
const toggleForms = (action) => {
	addProductForm.classList.add('hidden');
	editProductForm.classList.add('hidden');
	deleteProductForm.classList.add('hidden');

	switch (action.toLocaleLowerCase()) {
		case 'add':
			addProductForm.classList.remove('hidden');
			break;
		case 'edit':
			editProductForm.classList.remove('hidden');
			break;
		case 'delete':
			deleteProductForm.classList.remove('hidden');
			break;
		default:
			throw new Error('Invalid action');
	}
};

// **Función para cargar productos en la tabla**
const loadProductsIntoTable = async (tableElement, action) => {
	const tbody = tableElement.querySelector('tbody');
	tbody.innerHTML = ''; // Limpiar la tabla

	try {
		const response = await ProductService.getAllProducts();

		if (!response.data || response.data.length === 0) {
			alert('No products available.');
		} else {
			productsArray = response.data;
		}
	} catch (error) {
		console.error('Error fetching products:', error);
		alert('Failed to fetch products. Please try again.');
	}
};

// **Escuchadores de los botones principales**
addProductBtn.addEventListener('click', () => {
	toggleForms('add');
});

editProductBtn.addEventListener('click', () => {
	toggleForms('edit');
});

deleteProductBtn.addEventListener('click', () => {
	toggleForms('delete');
});

// **Escuchadores para llamar a los productos**
fetchAllProductsForEdit.addEventListener('click', (e) => {
	e.preventDefault();
	loadProductsIntoTable(editProductsTable, 'edit');
});

fetchAllProductsForDelete.addEventListener('click', (e) => {
	e.preventDefault();
	loadProductsIntoTable(deleteProductsTable, 'delete');
});

const loadData = async () => {
	try {
		const brandsResponse = await ProductService.getAllBrands();
		const productTypesResponse = await ProductService.getAllProductTypes();

		if (!brandsResponse.data || brandsResponse.data.length === 0) {
			alert('No brands available.');
			return;
		}

		if (!productTypesResponse.data || productTypesResponse.data.length === 0) {
			alert('No product types available.');
			return;
		}

		const selectBrand = document.getElementById('addProductBrand');
		const selectProductType = document.getElementById('addProductType');

		selectBrand.innerHTML = '<option value="" disabled selected>Selecciona una marca</option>';
		selectProductType.innerHTML =
			'<option value="" disabled selected>Selecciona un tipo de producto</option>';

		brandsResponse.data.forEach((brand) => {
			const option = document.createElement('option');

			option.value = brand.id;
			option.textContent = brand.name;
			selectBrand.appendChild(option);
		});

		productTypesResponse.data.forEach((productType) => {
			const option = document.createElement('option');

			option.value = productType.id;
			option.textContent = productType.name;
			selectProductType.appendChild(option);
		});
	} catch (error) {
		console.error('Error loading brands:', error);
		alert('Failed to load brands. Please try again.');
	}
};

const parseProductData = (product) => {
	const parsedProduct = { ...product };

	parsedProduct.price = parseFloat(parsedProduct.price);
	parsedProduct.stock = parseInt(parsedProduct.stock, 10);
	parsedProduct.brand = parseInt(parsedProduct.brand, 10);
	parsedProduct.product_type = parseInt(parsedProduct.product_type, 10);

	return parsedProduct;
};

/**
 *
 * @param {SubmitEvent} e - Evento de envío del formulario
 */
const addProductHandler = async (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const data = {};

	formData.forEach((value, key) => {
		data[key] = value;
	});

	const product = parseProductData(data);

	if (!isValidProduct(product)) {
		alert('Please fill all fields.');
		return;
	}

	ProductService.createProduct(product);
};

document.addEventListener('DOMContentLoaded', async () => {
	loadData();
});

addProductForm.addEventListener('submit', addProductHandler);
