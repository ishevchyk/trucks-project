import {uiActions} from "./ui-slice";
import {getLoads} from "../api/loadsApi";

export const showTrucks = () => {
  return async (dispatch) => {
    try {
      const res = await getLoads();
      dispatch(uiActions.toggle())

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
