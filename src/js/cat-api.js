export function fetchBreeds() {
  const apiKey =
    'live_TqdHZleRsTZL5Pvt8zjnso7ekWEPXDslvmRJW0JmKNiUq2WbZxeWYoSq4IsEQ7k9';

  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })));
}

export function fetchCatByBreed(breedId) {
  const apiKey =
    'live_TqdHZleRsTZL5Pvt8zjnso7ekWEPXDslvmRJW0JmKNiUq2WbZxeWYoSq4IsEQ7k9';

  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => data[0]);
}