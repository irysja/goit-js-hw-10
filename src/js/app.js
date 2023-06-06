import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import * as Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedName = document.getElementById('breed-name');
const breedDescription = document.getElementById('breed-description');
const breedTemperament = document.getElementById('breed-temperament');
const catImage = document.getElementById('cat-image');
let errorReport = null;

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  new SlimSelect({
    select: breedSelect,
  });
}

function showLoader() {
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  errorReport = Notiflix.Notify.failure('An error occurred while fetching data.');
}

function hideError() {
  if (errorReport !== null) {
    errorReport.style.visibility = 'hidden';
  }
}

function showCatInfo() {
  catInfo.style.display = 'block';
}

function hideCatInfo() {
  catInfo.style.display = 'none';
}

function displayCatData(cat) {
  breedName.textContent = cat.breeds[0].name;
  breedDescription.textContent = cat.breeds[0].description;
  breedTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
  catImage.src = cat.url;
}

function clearCatData() {
  breedName.textContent = '';
  breedDescription.textContent = '';
  breedTemperament.textContent = '';
  catImage.src = '';
}

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  showLoader();
  hideCatInfo();
  hideError();

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatData(cat);
      hideLoader();
      showCatInfo();
    })
    .catch(() => {
      clearCatData();
      hideLoader();
      showError();
    });
});

showLoader();
hideCatInfo();
hideError();

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    hideLoader();
  })
  .catch(() => {
    showError();
    hideLoader();
  });
