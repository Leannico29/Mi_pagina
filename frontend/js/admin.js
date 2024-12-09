import ProductService from './products/service/product-service.js';

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

// **Función para cargar productos en la tabla**
const loadProductsIntoTable = async (tableElement, action) => {
    const tbody = tableElement.querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla

    try {
        const response = await ProductService.getAllProducts();
        if (!response.data || response.data.length === 0) {
            alert('No products available.');
        } else {
            productsArray = response.data;
            // populate table as before
        }
    } catch (error) {
        console.error("Error fetching products:", error);
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

// **Mostrar/ocultar formularios**
const toggleForms = (action) => {
    const addProductForm = document.getElementById('addProductForm');
    const editProductForm = document.getElementById('editProductForm');
    const deleteProductForm = document.getElementById('deleteProductForm');

    addProductForm.classList.add('hidden');
    editProductForm.classList.add('hidden');
    deleteProductForm.classList.add('hidden');

    if (action === 'add') {
        addProductForm.classList.remove('hidden');
    } else if (action === 'edit') {
        editProductForm.classList.remove('hidden');
    } else if (action === 'delete') {
        deleteProductForm.classList.remove('hidden');
    }
};

// **Escuchadores para llamar a los productos**
fetchAllProductsForEdit.addEventListener("click", (e) => {
    e.preventDefault();
    loadProductsIntoTable(editProductsTable, "edit");
});

fetchAllProductsForDelete.addEventListener("click", (e) => {
    e.preventDefault();
    loadProductsIntoTable(deleteProductsTable, "delete");
});

