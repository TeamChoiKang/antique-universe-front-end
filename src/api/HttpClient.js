import http from '@/package/http';

const getHeader = newHeader => {
  const header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }

  return {
    ...header,
    ...newHeader,
  };
};

class HttpClient {
  async get(url, header) {
    const response = await http(url, {
      method: 'GET',
      headers: getHeader(header),
    });
    const result = await response.json();
    return result;
  }

  async post(url, body) {
    const response = await http(url, {
      method: 'POST',
      headers: getHeader(),
      body,
    });
    const result = await response.json();
    return result;
  }

  async put(url, body) {
    const response = await http(url, {
      method: 'PUT',
      headers: getHeader(),
      body,
    });
    const result = await response.json();
    return result;
  }

  async delete(url) {
    const response = await http(url, {
      method: 'DELETE',
      headers: getHeader(),
    });
    const result = await response.json();
    return result;
  }
}

export default HttpClient;
