import { isValidEmail, isValidString } from './utils/validations.js';

document.getElementById('contactForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const name = document.getElementById('name').value.trim();
	const email = document.getElementById('email').value.trim();
	const subject = document.getElementById('subject').value.trim();
	const message = document.getElementById('message').value.trim();
	const formMessage = document.getElementById('formMessage');

	if (
		!isValidString(name) ||
		!isValidString(email) ||
		!isValidString(subject) ||
		!isValidString(message)
	) {
		formMessage.textContent = 'Por favor, complete todos los campos.';
		formMessage.style.color = 'red';
		return;
	}

	if (!isValidEmail(email)) {
		formMessage.textContent = 'Por favor, ingrese un correo electrónico válido.';
		formMessage.style.color = 'red';
		return;
	}

	if (message.length < 10) {
		formMessage.textContent = 'El mensaje debe contener al menos 10 caracteres.';
		formMessage.style.color = 'red';
		return;
	}

	formMessage.textContent = 'Formulario enviado correctamente.';
	formMessage.style.color = 'green';

	document.getElementById('contactForm').reset();
});
