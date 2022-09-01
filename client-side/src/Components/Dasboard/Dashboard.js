import SideNav from "./SideNav";
import React, {useEffect} from "react";
import {getUser} from "../../store/authActions";
import {useDispatch, useSelector} from "react-redux";
import Driver from "./Driver";
import Shipper from "./Shipper";

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  const user = useSelector(state => state.auth.user)
  console.log(user)

  return (
    <React.Fragment>
      <SideNav/>
      {user.role === 'DRIVER' && <Driver/>}
      {user.role === 'SHIPPER' && <Shipper/>}
    </React.Fragment>
  )
}
export default Dashboard
