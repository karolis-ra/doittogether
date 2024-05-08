import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
import CreateEvent from "./pages/createEvent/createEvent";
import Profile from "./pages/profile/profile";
import Hello from "./pages/hello/hello";
import Caliesthenics from "./pages/caliesthenics/caliesthenics";
import MTB from "./pages/mtb/mtb";
import Gravel from "./pages/gravel/gravel";
import Road from "./pages/road/road";
import Project from "./pages/project/project";
import { ProfileQuiz } from "./pages/profileQuiz/profileQuiz";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/clientApp";
import { Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Fitness from "./pages/fitness/fitness";
import Run from "./pages/run/run";

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
    if (user && emailVerified) {
      return <Navigate to="/home" />;
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
        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/login" element={emailVerification(emailVerified)} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/profileQuiz" element={<ProfileQuiz />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/road" element={<Road />} />
            <Route path="/mtb" element={<MTB />} />
            <Route path="/gravel" element={<Gravel />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/calisthenics" element={<Caliesthenics />} />
            <Route path="/run" element={<Run />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
};

root.render(<App />);
