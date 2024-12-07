import { setupImageZoom } from '../../helpers/zoom-image.js';

/**
 * Renders the product page with the given product object.
 *
 * @param {HTMLElement} pageElement - The page element to render the product in.
 * @param {Object} product - The product object to render.
 */
export const renderProductPage = (pageElement, product) => {
	pageElement.innerHTML = `
        <div class="product-image-container">
            <div class="image-zoom-wrapper">
                <img src="${product.image}" alt="${
		product.name
	}" class="product-image" id="product-image">
            </div>
        </div>

        <div class="product-info">
            <h1 class="product-title">${product.name}</h1>
            
            <p class="product-description">${product.description}</p>
            
            <div class="product-details">
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Model:</strong> ${product.model}</p>
                <p><strong>Material:</strong> ${product.material}</p>
                <p><strong>Water Resistance:</strong> ${product.water_resistance}</p>
            </div>
            
            <div class="product-price">$${product.price.toFixed(2)}</div>
            
            <button class="add-to-cart-btn">Add to Cart</button>
        </div>
    `;

	setupImageZoom();
};
