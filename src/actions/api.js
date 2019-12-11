import fetch from 'cross-fetch';

export function callApi(url, body, callback) {
  // url = 'https://bph-back-end.azurewebsites.net' + url;

  return fetch(url, body).then(response => {
    if (response.status === 404 || response.status === 500) {
      return {error: "Unable to connect to Badger Powerlifting Hub"};
    }

    let contentType = response.headers.get("content-type");
    return contentType && contentType.indexOf("application/json") !== -1 ? response.json() : response;
  },
  error => ({error: 'Network Error'})
  ).then(callback);
}