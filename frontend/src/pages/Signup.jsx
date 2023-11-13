import React, { useState } from "react";
import CustomizedInput from "../components/shared/CustomizedInput";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoIosLogIn, IoMdLogIn } from "react-icons/io";

const Signup = () => {
  const Navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(auth.user);
    // toast.loading("signing in", { id: "login" });
    // await auth?.login(loginData.email, loginData.password);
    // toast.success("signed in successfully", { id: "login" });
    // console.log(auth.user);
    // Navigate("/chats");
    try {
      toast.loading("signing Up User", { id: "SignUp" });
      await auth?.signup(
        signUpData.email,
        signUpData.name,
        signUpData.password
      );
      toast.success("signed Up successfully", { id: "SignUp" });
      console.log(auth.user);
      Navigate("/chats");
    } catch (e) {
      console.log(e);
      toast.error("sign Up failed try again", { id: "SignUp" });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{ flex: 1 }}
        paddingTop={"12px"}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img style={{ width: "500px", flex: 1 }} src="chatbothome.png" alt="" />
      </Box>
      <Box
        display={"flex"}
        flex={{ md: 0.5, xs: 1, sm: 1 }}
        style={{ width: "200px" }}
        alignItems={"center"}
        ml={"auto"}
        mt={16}
        paddingRight={23}
        sx={{ flex: 1 }}
        pr={-20}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Sign Up
            </Typography>
            <CustomizedInput
              setSignUpData={setSignUpData}
              signUpData={signUpData}
              value={signUpData.email}
              label="email"
              name="email"
              type="email"
              unique="signup"
            />
            <CustomizedInput
              label="name"
              name="name"
              value={signUpData.name}
              type="text"
              setSignUpData={setSignUpData}
              signUpData={signUpData}
              unique="signup"
            />
            <CustomizedInput
              label="password"
              name="password"
              value={signUpData.password}
              type="password"
              setSignUpData={setSignUpData}
              signUpData={signUpData}
              unique="signup"
            />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                color: "black",
                bgcolor: "#00fffc",
                borderRadius: 2,
                fontWeight: 700,
                width: "300px",
                my: 2,
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoMdLogIn />}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Signup;
