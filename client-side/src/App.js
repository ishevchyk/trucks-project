import {Routes, Route} from 'react-router-dom'
// import {useContext} from "react";
// import AuthContext from "./store/auth-context";
import Layout from "./Components/Layout/Layout";
import MainPage from "./Pages/MainPage";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import DashboardPge from "./Pages/DashboardPge";
import ProfilePage from "./Pages/ProfilePage";
import {getToken, getUser} from "./store/authActions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getToken())
  }, [dispatch])


  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage/>} exact/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/dashboard' element={<DashboardPge/>}/>
        <Route path='/me' element={<ProfilePage/>}/>
        {/*<Route path='/me' element={authCtx.isLoggedIn ? <ProfilePage/> : <Navigate to='/'/>}/>*/}
        {/*<Route path='/dashboard' element={<DashboardPge/>}/>*/}


      </Routes>
    </Layout>

  );
}

export default App;
