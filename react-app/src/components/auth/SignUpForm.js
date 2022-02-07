import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import logo from "../../images/logo6.png";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, name, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateName = (e) => {
    setName(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };



  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login_container">
    <img src={logo} alt="Logo" className="signup_img"></img>
    <div className="login_form_container">
        <form onSubmit={onSignUp} className="signup_form">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      <div className="login_input">
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          placeholder="User Name"
          value={username}
        ></input>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={updateName}
          value={name}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
        <input
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
          <button type="submit" className="signup_btn">Sign Up</button>
      <div className='addition'>
        Already have a account?
        <Link className='link' to="/accounts/login">Log in</Link>
      </div>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
