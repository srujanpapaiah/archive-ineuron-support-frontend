"use client";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const { selectedUserId, selectedUserName } = ChatState();

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <header className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">{selectedUserName}</h2>
      </header>
      <SingleChat />
    </div>
  );
};

export default ChatBox;
