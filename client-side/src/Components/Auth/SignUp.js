import classes from './SignUp.module.css'
import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Card from "../UI/Card";

import {registerUser} from "../../api/authApi";

const SignUp = (props) => {
  const navigate = useNavigate()

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [role, setRole] = useState('DRIVER');
  const roleChangeHandler = event => setRole(event.target.value)


  const submitHandler = async event => {
    event.preventDefault();
    try {
      const enteredData = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        role: role
      }
      await registerUser(enteredData);
      navigate('/login', {replace: true});
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <Card className={classes.signup}>
        <h2>Getting started with Epam Freight</h2>
        <form onSubmit={submitHandler} className={classes['signup-form']}>
          <div className={classes['signup-form__inputs']}>
            <div className={classes['signup-form__input']}>
              <label>Email</label>
              <input type="email"
                     ref={emailInputRef}/>
            </div>
            <div className={classes['signup-form__input']}>
              <label>Password</label>
              <input type="password"
                     ref={passwordInputRef}/>
            </div>
          </div>
          <div className={classes['signup-form__role']}>
            <label>Role</label>
            <select value={role} onChange={roleChangeHandler}>
              <option disabled>Choose a role:</option>
              <option value='DRIVER'>DRIVER</option>
              <option value='SHIPPER'>SHIPPER</option>
            </select>
          </div>
          <div className={classes['signup-form__actions']}>
            <button type='submit'>Sign Up</button>
            <button type='button'><Link to={'/'}>Cancel</Link></button>
          </div>
        </form>
      </Card>
      <div className={classes.login}>
        <p>Already have an account?</p>
        <button><Link to={'/login'} style={{ textDecoration: 'none', color: '#0ee0e0'}}>Sign in</Link></button>
      </div>
    </React.Fragment>
  )
}
export default SignUp
