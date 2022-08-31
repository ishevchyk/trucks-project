import axios from "axios";

const usersApiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

export const getUserProfile = () => {
  const token = localStorage.getItem('token')
  return axios.get(`/api/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  });
};

export const deleteUserProfile = () => {
  return axios.delete(`/api/users/me`, usersApiConfig);
};
export const changeUserProfilePassword = () => {
  return axios.patch(`/api/users/me/password`, usersApiConfig);
}
