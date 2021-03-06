import { API_SERVER_URL } from '@/constants';
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

const getUrl = url => {
  if (url.startsWith('http')) {
    return url;
  }
  return API_SERVER_URL.concat(url);
};

class HttpClient {
  async get(url, header) {
    const response = await http(getUrl(url), {
      method: 'GET',
      headers: getHeader(header),
    });
    if (!response.ok) {
      throw new Error(`Http Error: status ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async post(url, body) {
    const response = await http(getUrl(url), {
      method: 'POST',
      headers: getHeader(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Http Error: status ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async put(url, body) {
    const response = await http(getUrl(url), {
      method: 'PUT',
      headers: getHeader(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Http Error: status ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async delete(url) {
    const response = await http(getUrl(url), {
      method: 'DELETE',
      headers: getHeader(),
    });
    if (!response.ok) {
      throw new Error(`Http Error: status ${response.status}`);
    }
    const result = await response.json();
    return result;
  }
}

export default HttpClient;
