import axios from 'axios'

const SERVER = import.meta.env.VITE_URL_API

const apiCycles = axios.create({
  baseURL: SERVER,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiCycles.interceptors.request.use(
  (config) => {
    const token = localStorage.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Interceptor error:', error)
    return Promise.reject(error)
  }
)

apiCycles.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      this.$router.replace({ name: 'NotAllowed' });
    }
    return Promise.reject(error)
  }
)

export default {
  async getCompras() {
    const cycles = await apiCycles.get('/api/user/compras')
      console.log(cycles)
    return cycles.data.data
  },
}
