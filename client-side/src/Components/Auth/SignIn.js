import React, { useRef} from 'react';
import {useNavigate} from "react-router-dom";
import classes from './SignIn.module.css';
// import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
import Card from '../UI/Card';
import {loginUser} from "../../api/authApi";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth-slice";
import {getUser} from "../../store/authActions";


const SignIn = () => {
  const navigate = useNavigate()

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  // const authCtx = useContext(AuthContext)

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const enteredData = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      }
      const { data }  = await loginUser(enteredData);
      await dispatch(authActions.login(data.jwt_token))
      await dispatch(getUser())
      localStorage.setItem('token', data.jwt_token)

      // await authCtx.login(data.jwt_token);
      // authCtx.isLoggedIn = true;
      navigate('/', {replace: true});
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <React.Fragment>
      <Card className={classes['sign-in']}>
        <h2>Sign in to your account</h2>
        <form onSubmit={submitHandler} className={classes['signin-form']}>
          <div className={classes['signin-form__inputs']}>
            <div className={classes['signin-form__input']}>
              <label>Email</label>
              <input type="email"
                     ref={emailInputRef}/>
            </div>
            <div className={classes['signin-form__input']}>
              <label>Password</label>
              <input type="password"
                     ref={passwordInputRef}/>
            </div>
          </div>
          <div className={classes['signin-form__actions']}>
            <button>Sign In</button>
          </div>
        </form>
        <p>Forgot your password?</p>
      </Card>
      <div className={classes.signup}>
        <p>Doesn't have an account?</p>
        <button><Link to={'/register'}>Sign up</Link></button>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
