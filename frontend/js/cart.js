import { getProductById } from './products/get-one-product.js';

/**
 * Cart list.
 *
 * @type {Array<{id, name, description, brand, price, img_url, product_type, stock}>}
 */
let cartList = [];

/**
 * Loads the cart from the local storage.
 */
export const loadCart = () => {
	const cartListString = localStorage.getItem('cart');

	if (cartListString) {
		cartList = JSON.parse(cartListString);
	}

	renderCart();
};

/**
 * Empties the cart.
 */
export const emptyCart = () => {
	cartList = [];
	saveCart();
	renderCart();
};

/**
 * Saves the cart to the local storage.
 */
export const saveCart = () => {
	localStorage.setItem('cart', JSON.stringify(cartList));
};

/**
 * Renders the cart on the page.
 */
const renderCart = () => {
	const cartListElement = document.querySelector('#cart-list');
	const totalElement = document.querySelector('#cart-total');
	const total = cartList.reduce((acc, product) => acc + product.price, 0);

	cartListElement.innerHTML = '';

	cartList.forEach((product, index) => {
		const cartItem = document.createElement('li');
		const deleteItemIcon = document.createElement('i');
		deleteItemIcon.classList.add('bi', 'bi-cart-dash-fill');
		deleteItemIcon.setAttribute('data-cart-index', index);

		deleteItemIcon.addEventListener('click', handleDeleteItem);

		cartItem.textContent = `${product.brand || ''} ${product.name} - $ ${product.price.toFixed(
			2
		)}`;

		cartItem.appendChild(deleteItemIcon);
		cartListElement.appendChild(cartItem);
	});

	totalElement.textContent = `$ ${total.toFixed(2)}`;
};

/**
 * Adds a product to the cart.
 *
 * @param {{id, name, description, brand, price, img_url, product_type, stock}} product - The product to add to the cart.
 */
export const addToCart = (product) => {
	cartList.push(product);
	saveCart();
	renderCart();
};

/**
 * Adds the event listener to the 'Add to cart' buttons.
 *
 * @param {Array<{id, name, description, brand, price, img_url, product_type, stock}>} productList - The list of products.
 */
export const addToCartEventListener = (productList) => {
	const addToCartButtons = document.querySelectorAll('.add-to-cart');

	addToCartButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.dataset.productId;
			const product = getProductById(productId, productList);

			addToCart(product);
		});
	});
};

/**
 *
 * @param {number} productIndex - The product to delete from the cart.
 */
const handleDeleteItem = (e) => {
	const productIndex = parseInt(e.target.dataset.cartIndex);

	cartList = cartList.filter((_, index) => index !== productIndex);

	saveCart();
	renderCart();
};
