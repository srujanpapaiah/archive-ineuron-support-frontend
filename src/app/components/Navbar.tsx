"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/features/authSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
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

  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        if (path !== "/login" && path !== "/signup") {
          const res = await axios.get(
            "http://localhost:9002/api/user/me",
            config
          );
          setData(res.data.user);
          dispatch(logIn(true));
          setIsLoading(true);
          setIsLoggedIn(isAuth);
        }
      } catch (error) {
        setIsLoggedIn(false);
        // Handle error gracefully if needed.
      } finally {
        setIsLoading(false); // Set isLoading to false regardless of success or error.
      }
    };

    fetchUser();
  }, [dispatch, isAuth, path]);

  const openModal = () => {
    setModalVisible(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.setItem("token", "");
      toast.success("Logout Successful");
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-[#242526] h-16 px-6 flex justify-between items-center">
      <Toaster />
      <div className="flex items-center gap-8">
        <Link href="/" className="text-white font-bold text-xl">
          <Image
            src={"/ineuron-logo.png"}
            alt={""}
            width={150}
            height={50}
            priority={false}
            className=""
          />
        </Link>
      </div>

      <div className="flex items-center relative">
        {isLoggedIn ? (
          <div>
            <div className="flex ">
              <button
                className="cursor-pointer text-white"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#E6E9EC"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-[#242526] text-black shadow-md mt-1 p-2 rounded-lg w-48 z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-[#E6E9EC] hover:bg-[#3A3B3C] rounded-lg transition-all duration-300"
                >
                  Profile
                </Link>
                <hr className="my-2 border-gray-300" />
                <button
                  onClick={() => {
                    toggleDropdown();
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-[#E6E9EC] hover:bg-[#3A3B3C] rounded-lg focus:outline-none transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : pathname !== "/login" ? (
          isLoading ? (
            <h1 className="text-white text-md">Loading...</h1>
          ) : (
            <Link href="/login" className="text-white">
              Login
            </Link>
          )
        ) : (
          <Link href="/signup" className="text-white">
            Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
