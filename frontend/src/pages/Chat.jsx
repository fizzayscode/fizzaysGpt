import {
  Box,
  Avatar,
  Typography,
  Button,
  dividerClasses,
  IconButton,
} from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { red } from "@mui/material/colors";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/ChatItem";
import { sendChat } from "../helpers/api-communicator";

// const staticChats = [
//   {
//     role: "user",
//     content: "Hi, how are you?",
//   },
//   {
//     role: "assistant",
//     content:
//       "Hello! I'm doing well, thank you. I'm here to assist you. How can I help you today?",
//   },
//   {
//     role: "user",
//     content:
//       "I'm curious about the recent advancements in space exploration. Can you tell me more?",
//   },
//   {
//     role: "assistant",
//     content:
//       "Absolutely! In recent years, space exploration has seen incredible progress. Initiatives like SpaceX have achieved significant milestones in reusable rocket technology. Additionally, NASA's Perseverance rover is exploring Mars, gathering valuable data. There's so much happening! Is there a specific area you're interested in?",
//   },
//   // Add more messages as needed
// ];

const Chat = () => {
  const inputRef = useRef(null);
  const [chats, setChats] = useState([]);
  const auth = useAuth();
  const handleSubmit = async (e) => {
    const content = inputRef.current?.value;

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content };
    setChats((prev) => {
      return [...prev, newMessage];
    });
    const chatData = await sendChat(content);
    setChats((prev) => [...prev, chatData.userChats[1]]);
  };
  // console.log(auth);
  const handleClear = () => {
    setChats([]);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        mx: "12px",
        flex: 1,
        width: "100%",
        height: "100%",
        gap: 3,
        my: "20px",
      }}
    >
      <Box
        sx={{
          display: { sm: "none", md: "flex", xs: "none" },
          flexBasis: "30%",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgb(17,29,39)",
            display: { sm: "none", md: "flex", xs: "none" },
            width: "100%",
            height: "fit-content",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: "700",
              padding: "6px",
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name?.split(" ").length == 2
              ? auth?.user?.name.split(" ")[1][0]
              : ""}
          </Avatar>

          <Typography
            sx={{
              mx: "auto",
              fontFamily: "serif",
              fontSize: "20px",
              padding: 2,
            }}
          >
            Welcome to FIZZAYS-GPT
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "serif",
              fontSize: "18px",
              padding: 2,
            }}
          >
            You can ask for information on different topics, get help with
            problem-solving, and engage in creative writing prompts. It's
            versatile and can assist you with general knowledge, coding,
            science, technology, advice, and more. Feel free to ask questions
            across a broad range of subjects!
          </Typography>
          <Button
            sx={{
              padding: "6px 20px",
              color: "white",
              fontWeight: 700,
              my: "12px",
              width: "220px",
              marginBottom: "20px",
              mx: "auto",
              borderRadius: "8px",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            onClick={handleClear}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { sm: "1", xs: "1", md: "1" },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "25px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - GPT 3.5 TURBO
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {chats.map((chat, index) => {
            return (
              <ChatItem key={index} message={chat.content} role={chat.role} />
            );
          })}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            type="text"
            name=""
            id=""
            style={{
              width: "100%",
              border: "none",
              padding: "10px",
              backgroundColor: "transparent",
              fontSize: "16px",
              color: "white",
              outline: "none",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
