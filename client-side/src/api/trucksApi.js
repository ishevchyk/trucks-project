import axios from "axios";

const trucksApiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

const url = '/api/trucks'

export const getTrucks = () => {
  const token = localStorage.getItem('token')
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  })
}

export const addTruck = (enteredData) => {
  return axios.post(url, enteredData, trucksApiConfig)
}

const getTruckById = (id) => {
  return axios.get(`${url}/${id}`, trucksApiConfig)
}

const updateTruckById = (id, enteredData) => {
  return axios.put(`${url}/${id}`, enteredData, trucksApiConfig)
}

const deleteTruckById = (id) => {
  return axios.delete(`${url}/${id}`, trucksApiConfig)
}

const assignTruckById = (id) => {
  return axios.post(`${url}/${id}/assign`, trucksApiConfig)
}
