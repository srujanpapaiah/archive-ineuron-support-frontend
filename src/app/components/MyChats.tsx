"use client";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";

const MyChats = async () => {
  const { setChats } = ChatState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDFhNDgxODZjYzJlN2ZiODJlZWIzZSIsImVtYWlsIjoic2oiLCJ1c2VybmFtZSI6IlJhdXNoYW4iLCJpYXQiOjE2OTg2NTg5OTUsImV4cCI6MTcwMTI1MDk5NX0.r3LL5z1YKMtlrXxzgpwdYCgHwBawgs12TrsF-6qKsFs`,
      },
    };
    const { data } = await axios.get("http://localhost:9002/api/chat", config);
    setChats(data);
  } catch (error) {}
  return <div></div>;
};

export default MyChats;
