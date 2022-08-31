import axios from "axios";

const loadsApiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

const url = '/api/loads'

export const getLoads = () => {
  return axios.get(url, loadsApiConfig)
}

export const addLoad = (enteredData) => {
  return axios.post(url, enteredData, loadsApiConfig)
}

const getLoadById = (id) => {
  return axios.get(`${url}/${id}`, loadsApiConfig)
}

const updateLoadById = (id, enteredData) => {
  return axios.put(`${url}/${id}`, enteredData, loadsApiConfig)
}

const deleteLoadById = (id) => {
  return axios.delete(`${url}/${id}`, loadsApiConfig)
}

const getActiveLoad = () => {
  return axios.delete(`${url}/active`, loadsApiConfig)
}

const changeLoadState = () => {
  return axios.patch(`${url}/active/state`, loadsApiConfig)
}
const postLoadById = (id) => {
  return axios.post(`${url}/${id}/post`, loadsApiConfig)
}
const getLoadShipping = (id) => {
  return axios.get(`${url}/${id}`, loadsApiConfig)
}
