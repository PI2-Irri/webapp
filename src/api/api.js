import axios from 'axios'

const ADDR = process.env.API_ADDR || 'http://localhost:4001/'

const apiEndpoints = {
  ROOT: '/',
  LOGIN: 'login/',
  SIGNUP: 'signup/',
  CONTROLLERS_INFO: 'controllers_info/'
}

async function get (endpoint, params = {}) {
  let res
  try {
    res = await axios.get(ADDR + endpoint, params)
  } catch (error) {
    if (error.response) res = error.response
    else res = null
  }
  return res
}

async function post (endpoint, params = {}) {
  let res
  try {
    res = await axios.post(ADDR + endpoint, params)
  } catch (error) {
    if (error.response) res = error.response
    else res = null
  }
  return res
}

async function getControllersInfo (params) {
  let header = { 'headers': { 'Authorization': 'Token ' + params.token } }
  let res = await get(apiEndpoints.CONTROLLERS_INFO, header)

  return res.data
}

async function makeSignUp (params) {
  let res = await post(apiEndpoints.SIGNUP, params)

  if (res === null) {
    res = { error: 'Null response' }
  }

  if (res.status !== 200 || res.data.error !== undefined) {
    return res.data
  }

  return null
}

async function makeLogin (params) {
  let res = await post(apiEndpoints.LOGIN, params)

  if (res === null) {
    console.log('Error: null response')
    res = { status: 400 }
  }

  if (res.status !== 200 || res.data.error !== undefined) return null
  let user = {
    token: res.data.token,
    ...res.data.user
  }

  return user
}

export {
  makeLogin,
  makeSignUp,
  getControllersInfo
}
