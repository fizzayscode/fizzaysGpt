import "./App.css";
import Heading from "./components/Heading";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
