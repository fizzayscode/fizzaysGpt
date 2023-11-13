import { Box, TextField } from "@mui/material";
import React from "react";

const CustomizedInput = ({
  name,
  label,
  type,
  value,
  loginData,
  setLoginData,
  setSignUpData,
  signUpData,
  unique,
}) => {
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData);
  };
  const handlesignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    console.log(value);
  };
  return (
    <Box
      sx={{
        width: 300,
        maxWidth: "100%",
      }}
    >
      <TextField
        fullWidth
        margin="normal"
        value={value}
        name={name}
        label={label}
        type={type}
        InputLabelProps={{ style: { color: "white" } }}
        inputProps={{
          style: { color: "white", borderRadius: 10, fontSize: 14 },
        }}
        onChange={
          unique.startsWith("login") ? handleChange : handlesignUpChange
        }
      ></TextField>
    </Box>
  );
};

export default CustomizedInput;
