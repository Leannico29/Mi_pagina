import { setupImageZoom } from '../../helpers/zoom-image.js';

/**
 * Renders the product page with the given product object.
 *
 * @param {HTMLElement} pageElement - The page element to render the product in.
 * @param {{id, name, description, brand, price, img_url, product_type, stock}} product - The product object to render.
 */
export const renderProductPage = (pageElement, product) => {
	pageElement.innerHTML = `
        <div class="product-image-container">
            <div class="image-zoom-wrapper">
                <img src="${product.img_url}" alt="${
		product.name
	}" class="product-image" id="product-image">
            </div>
        </div>

        <div class="product-info">
            <h1 class="product-title">${product.name}</h1>
            
            <p class="product-description">${product.description}</p>
            
            <div class="product-details">
                <p><strong>Marca:</strong> ${product.brand}</p>
                <p><strong>Tipo de producto:</strong> ${product.product_type}</p>
            </div>
            
            <div class="product-price">$${product.price.toFixed(2)}</div>
            
            <button class="add-to-cart-btn">Add to Cart</button>
        </div>
    `;

	setupImageZoom();
};
