import React from 'react';

import classes from './Navigation.module.css';
import {Link} from "react-router-dom";
// import AuthContext from "../../store/auth-context";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth-slice";

const Navigation = () => {
  // const authCtx = useContext(AuthContext)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(authActions.logout())
  }
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && <li className={classes['nav-links']}>
            <Link to={'/me'} style={{ textDecoration: 'none', color: '#0ee0e0'}}>
            Profile
          </Link>
          </li>}
        {isLoggedIn && <li className={classes['nav-links']}>
          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: '#0ee0e0'}}>
            Dashboard
          </Link>
        </li>}
        {isLoggedIn && <li className={classes['nav-links']}>
          <button onClick={logoutHandler} className={classes['nav-logout']}>Log out</button>
        </li>}
        {!isLoggedIn && <li className={classes['nav-links']}>
          <a href={'/login'}>
            {/*<Link to={'/login'}>*/}
              Log in
            {/*</Link>*/}
          </a>
        </li>}
        {!isLoggedIn && <li className={classes['nav-links']}>
          <a href={'/register'}>
            {/*<Link to={'/register'}>*/}
              Sign up
            {/*</Link>*/}
          </a>
        </li>}
      </ul>
    </nav>
  );
};

export default Navigation;
