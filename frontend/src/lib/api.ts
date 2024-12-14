import axios, { AxiosInstance } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
})

export default api
