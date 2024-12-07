/**
 * Update the carousel position
 * 
 * @param {number} currentIndex current index of the carousel
 */
export const updateCarousel = (currentIndex = 0) => {
    const carousel = document.querySelector('.carousel');
    const offset = -currentIndex * 100; // Desplazamos en 100% por cada imagen

    carousel.style.transform = `translateX(${offset}%)`;
}