import axios from 'axios'

const api = axios.create({
  baseURL: ' https://app.institutogourmet.com/external-api/v1'
})

export default api
