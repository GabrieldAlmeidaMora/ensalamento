import axios from 'axios'
import { supabase } from '@/plugins/supabase'

const api = axios.create({
  baseURL: 'http://85.209.95.52:8002/api', // Usa o proxy configurado no Vite
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  async response => response,
  error => {
    console.error('Erro na requisição:', error)
    return Promise.reject(error)
  },
)

api.interceptors.request.use(async config => {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => Promise.reject(error))

export default api
