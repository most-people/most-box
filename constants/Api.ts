import Axios, { type AxiosInstance, type AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosResponse {
    ok: boolean
  }
}

export const apiErrorCode: { [key: string]: string } = {
  404: '请求失败，请检查网络',
  1001: '用户名已存在',
}

const showError = (status: number, message?: string) => {
  const code = String(status)
  if (apiErrorCode[code]) {
    console.error(apiErrorCode[code])
  } else {
    console.error(message || `未知错误 ${code}`)
  }
}

const initResponse = (response: AxiosResponse) => {
  const status = response?.data?.errorCode || response?.status || 404
  response.ok = status >= 200 && status < 300
  if (!response.ok) {
    showError(status, response?.data?.message)
  }
  return response
}

const setInterceptors = (api: AxiosInstance) => {
  // interceptors https://axios-http.com/zh/docs/interceptors
  api.interceptors.request.use(
    function (config) {
      if (!config.headers.Authorization) {
        // config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token') || ''
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )
  api.interceptors.response.use(
    function (response) {
      return initResponse(response)
    },
    function (error) {
      if (error.response) {
        return initResponse(error.response)
      } else {
        showError(404)
        return Promise.reject(error)
      }
    },
  )
}

const api = Axios.create({
  baseURL: 'http://localhost:8001',
  // baseURL: 'https://api.most.red',
})

setInterceptors(api)

export default api
