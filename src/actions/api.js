import fetch from 'cross-fetch';

export function callApi(url, body, callback) {
  return fetch(url, body).then(response => {
    if (response.status === 404 || response.status === 500) {
      return {error: "Unable to connect to Badger Powerlifting Hub"};
    } else {
      return response.json();
    }
  }).then(callback);
}