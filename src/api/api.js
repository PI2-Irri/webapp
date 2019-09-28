import axios from 'axios'

const ADDR = process.env.API_ADDR || 'http://localhost:4001/'

const apiEndpoints = {
  ROOT: '',
  LOGIN: 'login',
  SIGNUP: 'signup'
}

async function get (endpoint, params = {}) {
  let res = await axios.get(ADDR + endpoint, params)
  return res
}

async function post (endpoint, params = {}) {
  let res = await axios.post(ADDR + endpoint, params)
  return res
}

export {
  get as apiGet,
  post as apiPost,
  apiEndpoints
}
