import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSelector } from "../../state/login/selector";
import { registerUser } from "../../state/login/reducer";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/clientApp";

export default function Login() {
  const [login, setLogin] = useState(true);

  const { userAccountInfo, userSetUp } = useSelector(loginSelector);
  const dispatch = useDispatch();

  const setSignUp = () => {
    setLogin(false);
  };

  const setLogIn = () => {
    setLogin(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    ).then((userCredential) => {
      const user = userCredential.user;
      console.log("user is logged in", user);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const emailAndPassword = {};

    emailAndPassword.email = e.target.email.value;
    emailAndPassword.password = e.target.password.value;

    dispatch(registerUser(emailAndPassword));
  };

  if (userSetUp) {
    console.log("lets set up");
    createUserWithEmailAndPassword(
      auth,
      userAccountInfo.email,
      userAccountInfo.password
    ).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    });
  }

  const logout = async () => {
    auth.signOut();
  };

  return (
    <div>
      {}
      <form onSubmit={login ? handleLogin : handleFormSubmit}>
        <label>email</label>
        <input id="email" type="email" />
        <label>password</label>
        <input id="password" type="string" />
        <button>{login ? "Login" : "SignUp"}</button>
      </form>
      <button onClick={login ? setSignUp : setLogIn}>
        {login
          ? "Dont have an account? SignUp"
          : "Already have an account? Login"}
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}
