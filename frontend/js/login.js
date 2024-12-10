import { loadCart } from './cart.js';
import UserService from './users/user-service.js';

const loginEventListener = () => {
	loadCart();

	const loginForm = document.getElementById('login-form');
	const registerForm = document.getElementById('register-form');
	const formTitle = document.getElementById('form-title');

	document.getElementById('switch-to-register').addEventListener('click', (event) => {
		event.preventDefault();

		loginForm.style.display = 'none';
		registerForm.style.display = 'block';
		formTitle.textContent = 'Registro';
	});

	document.getElementById('switch-to-login').addEventListener('click', (event) => {
		event.preventDefault();

		registerForm.style.display = 'none';
		loginForm.style.display = 'block';
		formTitle.textContent = 'Iniciar sesión';
	});

	document.getElementById('login-btn').addEventListener('click', async (event) => {
		event.preventDefault();

		const email = document.getElementById('login-email').value;
		const password = document.getElementById('login-password').value;

		console.log({ email, password });

		try {
			const response = await UserService.login(email, password);
			console.log(response);

			localStorage.setItem('token', response.token);
			window.location.href = '/frontend/index.html';
		} catch (error) {
			alert(error.message);
		}
	});
};

document.addEventListener('DOMContentLoaded', loginEventListener);
