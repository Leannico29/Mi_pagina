import ProductService from './products/service/product-service.js';

const addProductForm = document.getElementById('addProductForm');
const editProductForm = document.getElementById('editProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');
const addProductBtn = document.getElementById('addProductBtn');
const editProductBtn = document.getElementById('editProductBtn');
const deleteProductBtn = document.getElementById('deleteProductBtn');

const fetchProductBtn = document.getElementById('fetchProductBtn');

// Oculta todos los formularios
function hideAllForms() {
	addProductForm.classList.add('hidden');
	editProductForm.classList.add('hidden');
	deleteProductForm.classList.add('hidden');
}

// Mostrar formulario seleccionado
addProductBtn.addEventListener('click', () => {
	hideAllForms();
	addProductForm.classList.remove('hidden');
});

editProductBtn.addEventListener('click', () => {
	hideAllForms();
	editProductForm.classList.remove('hidden');
});

deleteProductBtn.addEventListener('click', () => {
	hideAllForms();
	deleteProductForm.classList.remove('hidden');
});

// Lógica para buscar un producto (en Modificar)
fetchProductBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let product = null;

	const productId = document.getElementById('editProductId').value;

	ProductService.getProductById(productId)
		.then((data) => {
			product = data;
			console.warn(product);
		})
		.catch((error) => {
			console.error('Error al obtener producto:', error);
		});

	const editFields = document.getElementById('editFields');

	editFields.classList.remove('hidden');
});
