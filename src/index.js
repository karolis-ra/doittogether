import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/clientApp";
import { Navigate } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

root.render(<App />);
