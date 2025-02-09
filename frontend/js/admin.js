import ProductService from './products/service/product-service.js';
import { isValidProduct } from './utils/validations.js';

let token = null;

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
let currentPage = 1; // Página actual
const productsPerPage = 20; // Cantidad de productos por página

// **Función para cargar productos en la tabla**
const loadProductsIntoTable = async (tableElement, action) => {
	const tbody = tableElement.querySelector('tbody');
	tbody.innerHTML = ''; // Limpiar la tabla
	tbody.classList.remove('hidden');

	try {
		const response = await ProductService.getAllProducts(1, 100);

		if (!response.data || response.data.length === 0) {
			alert('No products available.');
		}

		productsArray = response.data;
		renderPaginatedProducts(productsArray, tbody, action);
	} catch (error) {
		console.error('Error fetching products:', error);
		alert('Failed to fetch products. Please try again.');
	}
};

const renderPaginatedProducts = (products, tableElement, action) => {
	let table = null;
	tableElement.innerHTML = ''; // Limpiar la tabla

	if (action === 'edit') {
		table = document.getElementById('editProductsTable');
	} else if (action === 'delete') {
		table = document.getElementById('deleteProductsTable');
	}
	table.classList.remove('hidden');

	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const productsToShow = products.slice(startIndex, endIndex);

	productsToShow.forEach((product) => {
		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${product.brand}</td>
			<td>${product.name}</td>
			<td>${product.stock}</td>
			<td>
				<button class="primary-btn action-btn" data-product-id="${product.id}">
					${action === 'edit' ? 'Modificar' : 'Eliminar'}
				</button>
			</td>
		`;

		tableElement.appendChild(row);
	});

	addPaginationControls(tableElement, products.length);
	addProductActionListeners(action);
};

const addPaginationControls = (tableElement, totalProducts) => {
	const paginationContainer = tableElement.nextElementSibling;
	if (!paginationContainer) return;

	const totalPages = Math.ceil(totalProducts / productsPerPage);
	paginationContainer.innerHTML = `
		<button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
		<span> Página ${currentPage} de ${totalPages} </span>
		<button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
	`;

	document.getElementById('prevPage').addEventListener('click', () => {
		if (currentPage > 1) {
			currentPage--;
			renderPaginatedProducts(productsArray, tableElement, 'edit');
		}
	});

	document.getElementById('nextPage').addEventListener('click', () => {
		if (currentPage < totalPages) {
			currentPage++;
			renderPaginatedProducts(productsArray, tableElement, 'edit');
		}
	});
};

const addProductActionListeners = (action) => {
	const buttons = document.querySelectorAll('.action-btn');
	buttons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const productId = e.target.dataset.productId;
			const product = productsArray.find((p) => p.id === parseInt(productId, 10));

			if (action === 'edit') {
				fillEditProductForm(product);
			} else if (action === 'delete') {
				confirmDeleteProduct(product);
			}
		});
	});
};

const fillEditProductForm = (product) => {
	toggleForms('add'); // Reutilizamos el formulario de agregar

	document.getElementById('addProductName').value = product.name;
	document.getElementById('addProductPrice').value = product.price;
	document.getElementById('addProductStock').value = product.stock;
	document.getElementById('addProductDescription').value = product.description;
	const productTypeSelect = document.getElementById('addProductType').children.find((option) => {
		if (option.value === product.product_type_id) {
			option.selected = true;
		}
	});
	const brandSelect = document.getElementById('addProductBrand').children.find((option) => {
		if (option.value === product.brand_id) {
			option.selected = true;
		}
	});

	console.log(productTypeSelect);

	// productTypeSelect.value = product.product_type_id;
	// brandSelect.value = product.brand_id;
};

const confirmDeleteProduct = async (product) => {
	console.log('Deleting product:', product);

	const confirmationCode = Number(
		prompt(`Para eliminar el producto "${product.name}", ingresa el código "2244".`)
	);

	console.log('Confirmation code:', confirmationCode);

	if (confirmationCode === 2244) {
		try {
			const response = await ProductService.deleteProduct(product.id);
			console.log('Producto eliminado:', response);
			alert('Producto eliminado correctamente.');
			loadProductsIntoTable(deleteProductsTable, 'delete');
		} catch (error) {
			console.error('Error eliminando producto:', error);
			alert('Error eliminando producto. Por favor, intenta de nuevo.', error.message);
		}
	} else {
		alert('Código incorrecto. No se eliminó el producto.');
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
	parsedProduct.brand_id = parseInt(parsedProduct.brand, 10);
	parsedProduct.product_type_id = parseInt(parsedProduct.product_type, 10);

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

	try {
		await ProductService.createProduct(product);
		alert('Product created successfully.');
	} catch (error) {
		console.error('Error creating product:', error);
		alert('Failed to create product. Please try again.');
	}
};

const loadUserToken = () => {
	token = localStorage.getItem('token');

	if (!token) {
		window.location.href = '/login.html';
	}
};

document.addEventListener('DOMContentLoaded', async () => {
	loadUserToken();
	loadData();
});

addProductForm.addEventListener('submit', addProductHandler);
