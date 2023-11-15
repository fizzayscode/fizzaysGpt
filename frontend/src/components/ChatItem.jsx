import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";

const ChatItem = ({ message, role }) => {
  const auth = useAuth();
  return (
    <div>
      {role == "assistant" ? (
        <>
          <Box
            sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}
          >
            <Avatar sx={{ ml: 0 }}>A</Avatar>
            <Box>
              <Typography fontSize={"16px"}>{message}</Typography>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{ display: "flex", p: 2, bgcolor: "#004d56", my: 2, gap: 2 }}
          >
            <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
              {auth?.user?.name[0]}
              {auth?.user?.name?.split(" ").length == 2
                ? auth?.user?.name.split(" ")[1][0]
                : ""}
            </Avatar>
            <Box>
              <Typography fontSize={"16px"}>{message}</Typography>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default ChatItem;
