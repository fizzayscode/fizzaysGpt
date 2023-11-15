import React, { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  logOutUser,
  loginUser,
  signUpUser,
} from "../helpers/api-communicator";
import { useNavigate } from "react-router-dom";

const GlobalAuthContext = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    // fetch if the user cookies are valid then skip login
    const checkStatus = async () => {
      try {
        const data = await checkAuthStatus();
        const user = data.user;
        if (user) {
          setUser({
            email: user.email,
            name: user.name,
            password: user.password,
          });
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
          console.log(e);
          Navigate("/login");
        }
        console.log(data);
      } catch (e) {
        setUser(null);
        setIsLoggedIn(false);
        console.log(e);
        Navigate("/login");
      }
      // console.log("here======================================" + user.email);
    };
    checkStatus();
  }, []);
  const login = async (email, password) => {
    // Replace this with your actual login logic
    try {
      const data = await loginUser(email, password);
      console.log(data.name);
      if (data) {
        setUser({
          email: data.email,
          name: data.name,
          password: data.password,
        });
        setIsLoggedIn(true);
        // console.log(user);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (e) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setUser(null);
      setIsLoggedIn(false);
      setError(e.response.data.message);
      console.log(e.response.data.message); // This will log your custom error message
      console.log(e.response.status); // This will log the HTTP status code (e.g., 404)
      console.log(e.response.headers); // // Handle login error
      throw e;
    }
  };
  const signup = async (email, name, password) => {
    // Replace this with your actual signup logic
    try {
      // Simulate a successful signup
      const data = await signUpUser(email, name, password);
      // console.log("heyyyyyyyyyyyyyyy===================>" + data);
      if (data) {
        setUser({
          email: data.email,
          name: data.name,
          password: data.password,
        });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        Navigate("/login");
      }
    } catch (e) {
      setUser(null);
      setIsLoggedIn(false);
      throw e; // Handle signup error
    }
  };

  // Simulate a logout action
  const logout = async () => {
    // Replace this with your actual logout logic
    const data = await logOutUser();
    console.log(data);
    setUser({ email: "", name: "", password: "" });
    setIsLoggedIn(false);
  };
  return (
    <GlobalAuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        login,
        signup,
        logout,
        setLoading,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </GlobalAuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(GlobalAuthContext);
};

export default AuthContext;
