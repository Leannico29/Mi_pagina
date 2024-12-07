/**
 * Zoom image on mouse hover
 */
export const setupImageZoom = () => {
	const productImage = document.getElementById('productImage');
	const imageZoomWrapper = productImage.parentElement;

	imageZoomWrapper.addEventListener('mousemove', (e) => {
		const { left, top, width, height } = imageZoomWrapper.getBoundingClientRect();
		const x = (e.clientX - left) / width;
		const y = (e.clientY - top) / height;

		productImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
		productImage.style.transform = 'scale(2)';
	});

	imageZoomWrapper.addEventListener('mouseleave', () => {
		productImage.style.transformOrigin = 'center center';
		productImage.style.transform = 'scale(1)';
	});
};
