console.log('mee');

import Notiflix from 'notiflix';
//console.log(Notiflix);
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//console.log(SimpleLightbox);
import axios from 'axios';
//console.log(axios);

const KEY = '32856813-557b11f28047fc34e33f2f2e2';
const BASE_URL = 'https://pixabay.com/api/';

const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');
const searchForm = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.addEventListener('click', onBtnLoadMore);
searchForm.addEventListener('submit', onSearchForm);

//const gallerySimpleLightbox = new SimpleLightbox('.gallery a');
const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  scrollZoomFactor: 2,
  //   navText: ['*', '*'],
  overlayOpacity: 0.9,
  fadeSpeed: 300,
});

let searchRequest = '';
let page = 1;
const perPage = 40;
btnLoadMore.style.display = 'none';

async function getPhoto(inputValue, pageNum) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNum}&per_page=40`
    );
    const images = response.data;
    // console.log(images.hits);
    console.log(images);
    return await images;
  } catch (error) {
    console.error(error);
  }
}

function onSearchForm(e) {
  e.preventDefault();
  clearGallery();
  const searchRequest = input.value.trim();
  //   const searchRequest = e.currentTarget.searchQuery.value.trim();
  getPhoto(searchRequest, page).then(images => {
    if (searchRequest === '' || images.totalHits === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
      renderMarkupGallery(images.hits);

      btnLoadMore.style.display = 'block';
      gallerySimpleLightbox.refresh();
    }
  });
}

function onBtnLoadMore() {
  page += 1;
  btnLoadMore.style.display = 'none';
  //   gallerySimpleLightbox.destroy();
  const previousSearchRequest = input.value.trim();
  console.log(previousSearchRequest);

  getPhoto(previousSearchRequest, page, perPage).then(images => {
    renderMarkupGallery(images.hits);
    gallerySimpleLightbox.refresh();
    const totalPages = Math.ceil(images.totalHits / perPage);
    console.log(totalPages);
    console.log(page);
    if (page === totalPages) {
      btnLoadMore.style.display = 'none';
      Notiflix.Notify.success(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
  btnLoadMore.style.display = 'block';
}

function renderMarkupGallery(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
         <a href="${largeImageURL}"><img class="photo" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy"/></a>
          <div class="info">
             <p class="info-item">
      <b>Likes</b> <span class="info-item-api"> ${likes} </span>
  </p>
              <p class="info-item">
                  <b>Views</b> <span class="info-item-api">${views}</span>
              </p>
              <p class="info-item">
                  <b>Comments</b> <span class="info-item-api">${comments}</span>
              </p>
              <p class="info-item">
                  <b>Downloads</b> <span class="info-item-api">${downloads}</span>
              </p>
          </div>
      </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = '';
  page = 1;
  btnLoadMore.style.display = 'none';
}

//Прокрутка страницы
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
