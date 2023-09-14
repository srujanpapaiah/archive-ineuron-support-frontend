"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
    isVerified: false,
    role: "",
    __v: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setIsLoggedIn(true);
        setData(res.data.data);
      } catch (error: any) {
        setIsLoggedIn(false);
        throw new Error(error.message);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      {isLoggedIn ? (
        <h1>
          Hello {data.username}, your role is {data.role}
        </h1>
      ) : (
        <h1>Welcome</h1>
      )}
    </>
  );
}
