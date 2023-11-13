import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  return <div>Home{console.log(useAuth().isLoggedIn)}</div>;
};

export default Home;
