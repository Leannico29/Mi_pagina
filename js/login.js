document.addEventListener('DOMContentLoaded', function () {
	const loginForm = document.getElementById('login-form');
	const registerForm = document.getElementById('register-form');
	const formTitle = document.getElementById('form-title');

	document.getElementById('switch-to-register').addEventListener('click', function (event) {
		event.preventDefault();
		loginForm.style.display = 'none';
		registerForm.style.display = 'block';
		formTitle.textContent = 'Registro';
	});

	document.getElementById('switch-to-login').addEventListener('click', function (event) {
		event.preventDefault();
		registerForm.style.display = 'none';
		loginForm.style.display = 'block';
		formTitle.textContent = 'Iniciar sesión';
	});
});
