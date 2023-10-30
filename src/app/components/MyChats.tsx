"use client";
import { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";

const MyChats = async () => {
  const { setChats } = ChatState();
  const [token, setToken] = useState<string | null>(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Use the token from state
      },
    };
    const { data } = await axios.get("http://localhost:9002/api/chat", config);
    setChats(data);
  } catch (error) {}
  return <div></div>;
};

export default MyChats;
