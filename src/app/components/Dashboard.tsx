import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChatBox from "./ChatBox";
import { ChatState } from "../context/ChatProvider";
import MyChats from "./MyChats";

export default function Dashboard() {
  const {
    selectedChatId,
    setSelectedChatId,
    setChats,
    setSelectedUserName,
    setUser,
  } = ChatState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState<string | null>(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
    isVerified: false,
    role: "",
    __v: 0,
  });

  const [availableChatUsers, setAvailableChatUsers] = useState([
    {
      _id: "",
      chatName: "",
      isGroupChat: "",
      users: [{ username: "" }],
      createdAt: "",
      updatedAt: "",
      password: "",
      __v: 0,
      latestMessage: {},
    },
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from state
          },
        };

        const res = await axios.get(
          "http://localhost:9002/api/user/me",
          config
        );
        const { data } = await axios.get(
          "http://localhost:9002/api/chat",
          config
        );
        const userData = res.data.user;

        setUser(userData);
        setIsLoggedIn(true);
        setData(userData);
        setAvailableChatUsers(data);
        setChats(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
    // MyChats();
  }, [token]);
  const chatBox = (chatId: any, receiverName: any) => {
    setSelectedChatId(chatId);
    setSelectedUserName(receiverName);

    // You can now make your Axios post request with the updated token
    // ...
  };

  const handleSearch = () => {
    if (!search) {
      toast.error("Enter something to search");
    }
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from state
        },
      };
      // You can use this config for your search request
      // ...
    } catch (error) {
      // Handle errors here
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-10 text-[#CDD0D4]">
      {isLoggedIn ? (
        <div>
          <div className="flex gap-4 px-8 mt-10 ">
            <ChatBox />

            <div className="flex flex-col gap-4 w-1/3 h-full">
              <div className="flex-grow bg-[#242526] rounded-lg shadow-lg p-6">
                <div className="overflow-x-auto" style={{ maxHeight: "550px" }}>
                  <h2 className="text-2xl font-semibold mb-4">Chats</h2>
                  <input
                    placeholder="search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button onClick={handleSearch}>Go</button>

                  {/* {all.map((user, index) => (
                     <div className="text-2xl" key={index}>
                       <button
                         onClick={() => chatBox(user._id, user.username)}
                         key={user._id}
                         className="chat-button"
                       >
                         <h1>{user.username}</h1>
                       </button>
                     </div>
                   ))} */}

                  {availableChatUsers.map((chat, index) => (
                    <div className="text-2xl" key={index}>
                      <button
                        onClick={() =>
                          chatBox(chat._id, chat.users[1]?.username)
                        }
                        key={chat._id}
                        className="chat-button"
                      >
                        <h1>{chat.users[1]?.username}</h1>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl text-center text-lime-500 mb-4">
            Welcome to PWSkills SME portal
          </h1>
          <div className="flex justify-center space-x-4">
            <a
              href="/login"
              className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
