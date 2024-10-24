
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.carousel img');
    const totalImages = images.length;
    let currentIndex = 0;

    const updateCarousel = () => {
        const carousel = document.querySelector('.carousel');
        const offset = -currentIndex * 100; // Desplazamos en 100% por cada imagen

        carousel.style.transform = `translateX(${offset}%)`;
    }


    //* event listeners

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    });

    document.querySelector('button').addEventListener('click', () => {
        const searchInput = document.querySelector('input');
        let searchQuery = searchInput.value;

        if (!searchQuery || searchQuery.trim().length === 0) {
            alert('Ingresa un valor en el campo de búsqueda');
            searchInput.value = '';
            return;
        }

        alert('Buscando: ' + searchQuery);
    });
});

