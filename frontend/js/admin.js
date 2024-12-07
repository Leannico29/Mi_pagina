const addProductForm = document.getElementById("addProductForm");
const editProductForm = document.getElementById("editProductForm");
const deleteProductForm = document.getElementById("deleteProductForm");
const addProductBtn = document.getElementById("addProductBtn");
const editProductBtn = document.getElementById("editProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");

// Oculta todos los formularios
function hideAllForms() {
    addProductForm.classList.add("hidden");
    editProductForm.classList.add("hidden");
    deleteProductForm.classList.add("hidden");
}

// Mostrar formulario seleccionado
addProductBtn.addEventListener("click", () => {
    hideAllForms();
    addProductForm.classList.remove("hidden");
});

editProductBtn.addEventListener("click", () => {
    hideAllForms();
    editProductForm.classList.remove("hidden");
});

deleteProductBtn.addEventListener("click", () => {
    hideAllForms();
    deleteProductForm.classList.remove("hidden");
});

// Lógica para buscar un producto (en Modificar)
const fetchProductBtn = document.getElementById("fetchProductBtn");
fetchProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const editFields = document.getElementById("editFields");
    editFields.classList.remove("hidden");
});