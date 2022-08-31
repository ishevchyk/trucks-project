import SideNav from "./SideNav";
import MainContent from "./Main Content";
import React, {useEffect} from "react";
import {getUser} from "../../store/authActions";
import {useDispatch} from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  return (
    <React.Fragment>
      <SideNav/>
      <MainContent/>
    </React.Fragment>
  )
}
export default Dashboard
