import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSelector } from "../../state/login/selector";
import { registerUser } from "../../state/login/reducer";
import { loginUser } from "../../state/login/reducer";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/clientApp";

export default function Login() {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

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
    console.log("hello");
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    ).then((userCredential) => {
      const user = userCredential.user;
    });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // dispatch(registerUser(emailAndPassword));
    await createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    );
    await sendEmailVerification(auth.currentUser).then(() => {
      console.log("email sent");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userInfo = {};
      if (user) {
        userInfo.name = user.name;
        userInfo.email = user.email;
        userInfo.emailVerified = user.emailVerified;
      }
      dispatch(loginUser(userInfo));
    });
  }, []);

  const logout = async () => {
    await auth.signOut();
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
      <form onSubmit={handleGoogleLogin}>
        <button>google login</button>
      </form>
      <form onSubmit={handleFacebookLogin}>
        <button>Facebook login</button>
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
