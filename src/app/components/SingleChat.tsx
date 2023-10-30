import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:9002";

let socket: any, selectedChatCompare: { _id: any };

const SingleChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const { selectedChatId, selectedChat, user } = ChatState();
  const [token, setToken] = useState<string | null>(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const fetchMessages = async () => {
    if (!selectedChatId) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from state
        },
      };
      const { data } = await axios.get(
        `http://localhost:9002/api/message/${selectedChatId}`,
        config
      );

      setMessages(data);
      // socket.emit("join chat", selectedChatId);
    } catch (error) {}
  };

  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        console.log(selectedChatId);
        setNewMessage("");

        const { data } = await axios.post(
          "http://localhost:9002/api/message",
          {
            content: newMessage,
            chatId: selectedChatId,
          },
          config
        );
        // socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {}
    }
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    // socket = io(ENDPOINT);
    // socket.emit("setup", user);
    // socket.on("connection", () => setSocketConnected(true));
  });

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChatId]);

  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived: any) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageReceived.chat._id
  //     ) {
  //       // give notification
  //     } else {
  //       setMessages([...messages, newMessageReceived]);
  //     }
  //   });
  // });
  return (
    <div>
      <div className="p-4 bg-white rounded-b-lg border border-gray-300 h-48 overflow-y-auto">
        {/* Messages */}
        <ScrollableChat messages={messages} />
      </div>
      {/* Chat Input */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
          onKeyDown={sendMessage}
          onChange={typingHandler}
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default SingleChat;
