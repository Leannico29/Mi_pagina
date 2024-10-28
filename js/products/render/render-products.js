import { addToCartEventListener } from '../../cart.js';

const cardDivClasses = ['col-12', 'col-sm-6', 'col-md-5', 'col-lg-4', 'col-xl-3', 'product-card'];

/**
 * Render products on the page.
 *
 * @param {Array<{id, product_name, model_number, brand, price, img_url, product_type_id}>} products Products to render
 */
export const renderProducts = (products) => {
	const productsContainer = document.querySelector('.products-container');

	if (!productsContainer) {
		console.error('No se encontró el contenedor de productos');
		return;
	}

	productsContainer.innerHTML = '';

	products.forEach((product) => {
		const productElement = document.createElement('div');

		cardDivClasses.forEach((className) => {
			productElement.classList.add(className);
		});

		productElement.innerHTML = `
            <img src="${product.img_url}" alt="${product.product_name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.product_name}</h3>
                <p class="product-description">${product.brand} ${product.model_number}</p>
                <p class="product-price">$ ${product.price.toFixed(2)}</p>
                <button class="product-btn add-to-cart" data-product-id="${
					product.id
				}">Agregar al carrito</button>
            </div>
        `;

		productsContainer.appendChild(productElement);
	});

	// * Evento para escuchar el click en el botón de agregar al carrito.
	addToCartEventListener(products);
};
