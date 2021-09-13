import axios from 'axios'

// const baseURL = process.env.NODE_ENV !== 'production' && process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : ''
const baseURL = ''

const axiosInstance = axios.create({
  baseURL,
  timeout: 10 * 60 * 1000,
  headers: { 'Content-Type': 'application/json' }
})

const api = (options) => {
  return axiosInstance(options)
}

export default api
