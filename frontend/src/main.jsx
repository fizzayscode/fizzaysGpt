import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif ,serif",
    allVariants: { color: "white" },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
