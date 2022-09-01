
import React, { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/authActions";
import Card from "../UI/Card";
import classes from './Profile.module.css'

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const user = useSelector(state => state.auth.user)

  return (
    <Card className={classes.profile}>
      <h2>{user.role}</h2>
      <div className={classes.info}>
        {user.role === 'DRIVER' ? <img src="https://img.icons8.com/bubbles/100/1A1A1A/driver.png" alt="Driver"/> : <img src="" alt=""/>}
        <p>Email: {user.email}</p>
        <p>Registered date: {user.createdDate}</p>
      </div>
      <div>
        <button>Go to my dashboard</button>
        <button>Change password</button>
      </div>

    </Card>
  );
}

export default Profile
