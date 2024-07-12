import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
  }
  
  function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
  }
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    const query = input.value.trim();
    
    if (query === '') return;
  
    showLoader();
    fetchImages(query)
      .then(images => {
        renderGallery(images.hits);
      })
      .finally(() => {
        hideLoader();
      });
  });
  