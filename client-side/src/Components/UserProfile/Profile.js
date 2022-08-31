import Card from "../UI/Card";
import { useEffect} from "react";
// import AuthContext from "../../store/auth-context";
import classes from './Profile.module.css'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/authActions";



const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  // const {user} = useContext(AuthContext)
  const user = useSelector(state => state.auth.user)
  return (
    <Card className={classes.profile}>
      <h2>Yours profile info</h2>
      <ul>
        <li>Email: {user.email}</li>
        <li>Role: {user.role}</li>
        <li>Registered date: {user.createdDate}</li>
      </ul>
      <button>Change password</button>

    </Card>
  );
}

export default Profile
