const KEY = '29091734-9e049dbec053396241aa2e5c2';
const BASE_URL = 'https://pixabay.com/api';

export function fetchImagesAPI(wordSearch, currentPage, prePages) {
  return fetch(`${BASE_URL}/?q=${wordSearch}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${prePages}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Щось пішло не так, спробуйте ще раз`)
    )
  })
  .then(response => { 
    return {
      imagesArr: response.hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
      id,
      largeImageURL,
      webformatURL,
      tags,
      })),
      totalHits: response.totalHits,
    }
  });
}