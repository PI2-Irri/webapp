import axios from 'axios'

const ADDR = process.env.API_ADDR || 'http://localhost:4001/'

const apiEndpoints = {
  ROOT: '/',
  LOGIN: 'login/',
  SIGNUP: 'signup/',
  CONTROLLERS_INFO: 'controllers_info/',
  CONTROLLERS: 'controllers/',
  ZONES: 'zones/'
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

async function post (endpoint, params = {}, header = {}) {
  let res

  try {
    res = await axios.post(ADDR + endpoint, params, header)
  } catch (error) {
    if (error.response) res = error.response
    else res = null
  }
  return res
}

function generateHeader (token) {
  let header = { 'headers': { 'Authorization': 'Token ' + token } }

  return header
}

function verifyResponse (res) {
  if (res == null) {
    res = { error: 'Null response' }
  }

  if (res.status !== 200 || res.data.error !== undefined) {
    return res.data
  }

  return res
}

async function connectControllers (params, owner) {
  let res = await post(apiEndpoints.CONTROLLERS, params, generateHeader(owner))

  return verifyResponse(res)
}

async function createZone (params, owner) {
  let res = await post(apiEndpoints.ZONES, params, generateHeader(owner))

  return verifyResponse(res)
}

async function getControllersInfo (params) {
  let res = await get(
    apiEndpoints.CONTROLLERS_INFO,
    generateHeader(params.token)
  )
  let response = verifyResponse(res)

  return response.data
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
  res = verifyResponse(res)

  let user = {
    token: res.data.token,
    ...res.data.user
  }

  return user
}

export {
  makeLogin,
  makeSignUp,
  connectControllers,
  getControllersInfo,
  createZone
}
