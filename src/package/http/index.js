const http = {
  get(url) {
    return fetch(url, {
      method: 'GET',
    });
  },

  post(url, body, headers) {
    const defaultHeaders = {
      'Content-Type': 'application/json;charset=utf-8',
    };

    return fetch(url, {
      method: 'POST',
      headers: headers || defaultHeaders,
      body: JSON.stringify(body),
    });
  },

  put(url, body, headers) {
    const defaultHeaders = {
      'Content-Type': 'application/json;charset=utf-8',
    };

    return fetch(url, {
      method: 'PUT',
      headers: headers || defaultHeaders,
      body: JSON.stringify(body),
    });
  },

  delete(url) {
    return fetch(url, {
      method: 'DELETE',
    });
  },
};

export default http;
