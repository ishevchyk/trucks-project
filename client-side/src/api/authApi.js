import axios from "axios";



const authApiConfig = {
  headers: {
    'Content-Type': 'application/json',
  }
}

export const registerUser = (userInput) => {
  return axios.post(`/api/auth/register`, userInput, authApiConfig);
};

export const loginUser = (userInput) => {
  return axios.post(`/api/auth/login`, userInput, authApiConfig);
};
