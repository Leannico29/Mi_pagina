import { updateCarousel } from './carousel/update-carousel.js';

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.carousel img');
    const totalImages = images.length;
    let currentIndex = 0;

    //! event listeners

    //* Carrusel
    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel(currentIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel(currentIndex);
    });

    //* Barra de búsqueda
    document.querySelector('#search-button').addEventListener('click', () => {
        const searchInput = document.querySelector('#search-input');
        let searchQuery = searchInput.value;

        if (!searchQuery || searchQuery.trim().length === 0) {
            alert('Ingresa un valor en el campo de búsqueda');
            searchInput.value = '';
            return;
        }

        alert('Buscando: ' + searchQuery);
        searchInput.value = '';
    });
});

