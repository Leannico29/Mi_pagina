document.querySelector('button').addEventListener('click', function() {
    let searchQuery = document.querySelector('input').value;
    alert('Buscando: ' + searchQuery);
});

let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

document.querySelector('.next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
});

document.querySelector('.prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
});

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const offset = -currentIndex * 100; // Desplazamos en 100% por cada imagen
    carousel.style.transform = `translateX(${offset}%)`;
}