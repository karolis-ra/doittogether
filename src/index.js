import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
import { ProfileForm } from "./pages/profileForm/profileForm";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/clientApp";
import { Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setEmail(null);
        setUser(user);
        setEmailVerified(false);
      } else {
        setEmailVerified(user.emailVerified);
        setEmail(user.email);
      }
    });
  }, []);

  const emailVerification = (emailVerified) => {
    if (emailVerified) {
      return <Navigate to="/profileForm" />;
    }
    if (user && !emailVerified) {
      auth.signOut();
      return <Navigate to="/verifyEmail" />;
    }
    if (!user) {
      return <Login />;
    }
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={email ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={emailVerification(emailVerified)} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/profileForm" element={<ProfileForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

root.render(<App />);
