import React, {useCallback, useState, useEffect} from "react";
import {getUserProfile} from "../api/usersApi";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  user: null
})

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  return {
    token: storedToken,
  };
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if(tokenData) initialToken = tokenData.token;

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(null);

  let userIsLoggedIn = !!token;

  const logoutHandler = useCallback( () => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const getUser = useCallback(async () => {
    try{
      console.log(userIsLoggedIn)
      const res = await getUserProfile()
      await setUser(res.data.user)
    } catch (err) {
      console.log(err)
    }

  }, [])
  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      userIsLoggedIn = !!token;
    }
  }, [token]);

  useEffect(() => {
    if(userIsLoggedIn) {
      getUser();
    }
  }, [userIsLoggedIn]);
  useEffect(() => {
      getUser();
  }, [getUser]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user
  }




  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
