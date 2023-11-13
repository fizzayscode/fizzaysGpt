import React, { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  logOutUser,
  loginUser,
  signUpUser,
} from "../helpers/api-communicator";

const GlobalAuthContext = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        }
        console.log(data);
      } catch (e) {
        setUser(null);
        setIsLoggedIn(false);
        console.log(e);
      }
      // console.log("here======================================" + user.email);
    };
    checkStatus();
  }, []);
  const login = async (email, password) => {
    // Replace this with your actual login logic
    try {
      const data = await loginUser(email, password);
      if (data) {
        setUser({
          email: data.email,
          name: data.name,
          password: data.password,
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      throw error; // Handle login error
    }
  };
  const signup = async (name, email, password) => {
    // Replace this with your actual signup logic
    try {
      // Simulate a successful signup
      const data = await signUpUser(name, email, password);
      console.log(data);
      if (data) {
        setUser(data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      throw error; // Handle signup error
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
