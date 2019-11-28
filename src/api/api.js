import axios from 'axios'

const ADDR = process.env.API_ADDR || 'http://localhost:4001/'

const apiEndpoints = {
  ROOT: '/',
  LOGIN: 'login/',
  SIGNUP: 'signup/',
  CONTROLLERS_INFO: 'controllers_info/',
  CONTROLLERS: 'controllers/',
  ZONES: 'zones/',
  MEASUREMENTS: 'zones_info/',
  SCHEDULES_INFO: 'schedules_info/',
  SCHEDULES: 'schedules/',
  IRRIGATE: 'active_zone/',
  NOTIFICATION: 'notification/'
}

async function get (endpoint, param = {}, header = {}) {
  let res
  try {
    res = await axios.get(ADDR + endpoint, param, header)
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

async function getZonesInfo (param, owner) {
  const res = await get(apiEndpoints.MEASUREMENTS, { params: param }, generateHeader(owner))
    .then((res) => res)

  return res.data
}

async function getSchedulesInfo (param, owner) {
  const res = await get(apiEndpoints.SCHEDULES_INFO, { params: param }, generateHeader(owner))
    .then((res) => res)

  return res.data
}

async function setSchedule (params, owner) {
  let res = await post(apiEndpoints.SCHEDULES, params, generateHeader(owner))

  return verifyResponse(res)
}

async function irrigate (params, owner) {
  let res = await post(apiEndpoints.IRRIGATE, params, generateHeader(owner))

  return verifyResponse(res)
}

async function getNotifications (owner) {
  const res = await get(apiEndpoints.NOTIFICATION, generateHeader(owner))
    .then((res) => res)

  return res.data
}

export {
  makeLogin,
  makeSignUp,
  connectControllers,
  getControllersInfo,
  createZone,
  getZonesInfo,
  getSchedulesInfo,
  setSchedule,
  irrigate,
  getNotifications
}
