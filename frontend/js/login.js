import { loadCart } from './cart.js';

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
};

document.addEventListener('DOMContentLoaded', loginEventListener);
