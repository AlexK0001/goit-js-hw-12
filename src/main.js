import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let query = '';
let page = 1;
const perPage = 15;
const apiKey = '44813412-f6fc02e89419494116d973502';
const apiUrl = 'https://pixabay.com/api/';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.target.query.value;
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.hidden = true;
  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchImages();
});

const fetchImages = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey,
        q: query,
        page: page,
        per_page: perPage,
      },
    });
    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.info({ title: 'Info', message: 'No images found for your search query.' });
      return;
    }

    renderGallery(data.hits);
    new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
    loadMoreBtn.hidden = gallery.childElementCount >= data.totalHits;

    if (gallery.childElementCount >= data.totalHits) {
      iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
    } else {
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Error fetching data from API.' });
  }
};

const renderGallery = (images) => {
  const markup = images.map(image => `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
    </a>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};

const smoothScroll = () => {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
