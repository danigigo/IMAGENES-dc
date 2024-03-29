const apiKey = '42648166-259288aeaee40cc4d47cd1479'; // Reemplaza 'TU_API_KEY' con tu propia clave de API de Pixabay
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const imageContainer = document.getElementById('imageContainer');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.querySelector('.close');

let currentPage = 1;
let currentSearch = '';
const imagesPerPage = 21; // Número de imágenes por página

// Event listener para detectar la tecla "Enter"
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Event listener para el botón de búsqueda
searchButton.addEventListener('click', performSearch);

// Función para realizar la búsqueda
function performSearch() {
    currentSearch = searchInput.value.trim();
    currentPage = 1;
    fetchImages(currentSearch, currentPage);
}

// Event listener para la paginación
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchImages(currentSearch, currentPage);
    }
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    fetchImages(currentSearch, currentPage);
});

// Event listener para abrir la imagen en la modal
imageContainer.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        const imageUrl = e.target.src;
        lightboxImage.src = imageUrl;
        lightbox.style.display = 'block';
    }
});

// Event listener para cerrar la modal
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Función para obtener las imágenes de la API de Pixabay
async function fetchImages(query, page) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=${imagesPerPage}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.hits);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Función para mostrar las imágenes en el contenedor
function displayImages(images) {
    imageContainer.innerHTML = '';
    images.forEach(image => {
        const imgResult = document.createElement('div');
        imgResult.classList.add('imgResult');
        imgResult.innerHTML = `<img src="${image.webformatURL}" alt="${image.tags}">`;
        imageContainer.appendChild(imgResult);
    });
}
