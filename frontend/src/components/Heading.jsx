import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import NavLinks from "./shared/NavLinks";

const Heading = () => {
  const Navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log(auth.user);
    console.log("logging the user out .......");
    try {
      toast.loading("signing out", { id: "logout" });
      await auth?.logout();
      toast.success("signed out successfully", { id: "logout" });
      console.log(auth.user);
      Navigate("/login");
    } catch (e) {
      console.log(e);
      toast.error("sign out failed", { id: "logout" });
    }
  };
  //   if (response.ok) {
  //     toast.success("Signed out successfully", { id: "logout" });
  //   } else {
  //     console.error('Logout failed:', response.status, response.statusText);
  //     toast.error("Sign out failed", { id: "logout" });
  //   }
  // } catch (error) {
  //   console.error('Logout error:', error);
  //   toast.error("Sign out failed", { id: "logout" });
  // }
  // };
  return (
    <AppBar
      sx={{
        position: "static",
        bgcolor: "transparent",
        boxShadow: "none",
        color: "blue",
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLinks
                to="/chats"
                name="Go To Chat"
                bg="#00fffc"
                textColor="black"
              />
              <NavLinks
                to="/login"
                name="Logout"
                bg="#51538f"
                textColor="white"
                handleLogout={handleLogout}
              />
            </>
          ) : (
            <>
              <>
                <NavLinks
                  to="/login"
                  name="LogIn"
                  bg="#00fffc"
                  textColor="black"
                  onClick={auth.login}
                />
                <NavLinks
                  to="/signup"
                  name="SignUp"
                  bg="#51538f"
                  textColor="white"
                />
              </>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Heading;
