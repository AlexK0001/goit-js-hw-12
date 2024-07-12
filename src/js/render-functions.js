import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => {
    return `<a class="gallery__item" href="${image.largeImageURL}">
              <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
            </a>`;
  }).join('');
  
  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
