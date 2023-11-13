import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        textDecoration: "none",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          fontSize: "18px",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
          letterSpacing: "1px",
          fontFamily: "sans-serif",
        }}
      >
        FIZZAYS-<span style={{ fontSize: "13px" }}>GPT</span>
      </Typography>
    </Link>
  );
};

export default Logo;
