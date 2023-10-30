"use client";

import { createContext, useContext, useEffect, useState } from "react";
const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [selectedChatId, setSelectedChatId] = useState();
  const [selectedUserName, setSelectedUserName] = useState();

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(userInfo);
  }, []);
  return (
    <chatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        selectedChatId,
        setSelectedChatId,
        selectedUserName,
        setSelectedUserName,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
