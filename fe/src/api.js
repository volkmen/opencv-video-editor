import axios from 'axios'

class Api {
  baseUrl = 'http://127.0.0.1:5002'

  get(url) {
    return axios.get(`${this.baseUrl}/${url}`)
      .then(response => response.data)
  }

  post(url, data) {
    return axios.post(`${this.baseUrl}/${url}`, data)
      .then(response => response.data)
  }

  patch(url, data) {
    return axios.patch(`${this.baseUrl}/${url}`, data)
      .then(response => response.data)
  }

  delete(url) {
    return axios.delete(`${this.baseUrl}/${url}`)
      .then(response => response.data)
  }
}

const api = new Api();

export default api
