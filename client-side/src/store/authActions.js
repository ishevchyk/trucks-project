
import {getUserProfile} from "../api/usersApi";
import {authActions} from "./auth-slice";

export const getUser = () => {
  return async (dispatch) => {
    try {
      const res = await getUserProfile();
      const userData = await res.data.user;
      dispatch(authActions.getUser(userData))
    } catch (error) {
      console.log(error)
      // dispatch(uiActions.showNotificatin({
      //   status: 'error',
      //   title: 'Error!...',
      //   message: 'Fetching cart data failed'
      // }))
    }
  }
}
export const getToken = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(authActions.retrieveToken(token))
    }
  }
}

