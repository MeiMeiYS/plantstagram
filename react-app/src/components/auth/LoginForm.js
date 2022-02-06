import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./auth.css";
import logo from "../../images/logo6.png";
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login_container">
    <img src={logo} alt="Logo" className="login_img"></img>
    <div className="login_form_container">
    <form onSubmit={onLogin} className="login_form">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="login_input">
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        </div>
        <button type='submit' className="login_btn">Log In</button>
        <div className="login-or">
          <div className="login-line"></div>
          <div className="l-or">OR</div>
          <div className="login-line"></div>
        </div>
        {!user &&
        <button className='demo' onClick={e=>onLogin(e)}><nav>Log in as demo</nav></button>
        }
         <div className='addition'>
            Don't have a account?
            <Link className='link' to="/sign-up">Sign Up</Link>
          </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
