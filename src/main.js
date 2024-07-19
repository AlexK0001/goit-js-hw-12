import axios from 'axios';

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

    if (data.hits.length > 0) {
      renderGallery(data.hits);
      loadMoreBtn.hidden = false;
    }

    if (gallery.childElementCount >= data.totalHits) {
      loadMoreBtn.hidden = true;
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const renderGallery = (images) => {
  const markup = images.map(image => `
    <div class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
    </div>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};
