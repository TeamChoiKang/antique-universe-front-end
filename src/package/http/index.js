const http = {
  get(url) {
    return fetch(url, {
      method: 'GET',
    });
  },

  post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
  },

  put(url, body) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
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
