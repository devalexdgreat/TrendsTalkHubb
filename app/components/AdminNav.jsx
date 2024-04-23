"use client";
import Link from "next/link";
import { FiLogIn, FiLogOut, FiSearch } from "react-icons/fi";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoLight from '@/public/logo-light.png'
import logoDark from '@/public/logo-dark.png'
import LogoutBtn from "./LogoutBtn";
import { useRouter } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { delCookies, getCookies } from "@/actions";

export default function AdminNav() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isloggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const ref = useRef();

    function isTokenExpired(token) {
        if (!token) {
            // If token is not provided, consider it as expired
            return true;
        }
    
        try {
            // Decode the token
            const payload = JSON.parse(atob(token.split('.')[1]));
    
            // Get the expiration time (exp) from the payload
            const expirationTime = payload.exp * 1000; // Convert to milliseconds
    
            // Check if the current time is after the expiration time
            return Date.now() >= expirationTime;
        } catch (error) {
            // If decoding fails, consider the token as expired
            return true;
        }
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (isTokenExpired(accessToken)) {
            // Clear the access token from local storage
            localStorage.removeItem('accessToken');
            delCookies();
            return; 
        }
    });

    useEffect(() => {
        const fetchAt = async () => {
            let aT = await getCookies();
            return aT;
        }
        const checkLogin = async () => {
            let accessToken = localStorage.getItem('accessToken');
            let aToken = await fetchAt();
            if(accessToken != null || aToken != null) {
                setIsLoggedIn(true);
                return;
            } else {
                setIsLoggedIn(false);
            }
        }
        checkLogin();
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/get_current_user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    cache: "no-store"
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.user);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser(); // Call fetchUser() when the component mounts
    }, []);

    const toggleProfile = () => {
        setProfileOpen(prevProfileOpen => !prevProfileOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    };

    const Logout = () => {
        // Clear the access token from local storage
        localStorage.removeItem('accessToken');
        delCookies();
        
        // Redirect the user to the login page
        router.push('/login'); // Replace '/login' with the appropriate login page route
        toggleMenu();
    }

    return (
        <div className="w-full fixed top-0 z-30 bg-white shadow-md" ref={ref}>
            <div className="w-11/12 mx-auto flex items-center text-black justify-between py-3">
                <Link href={'/admin'} className="font-semibold">
                    <Image src={logoDark} className="h-10 w-32" alt="" />
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <Link href={'/'} className="hover:text-black/60 duration-500">Home</Link>
                    <Link href={'/admin'} className="hover:text-black/60 duration-500">Dashboard</Link>
                    <Link href={'/admin/create-post'} className="hover:text-black/60 duration-500">New Post</Link>
                    {isloggedIn ? (
                        <button onClick={toggleProfile} className="flex rounded-full h-9 justify-center items-center bg-black text-white p-0.5">
                            <span className="h-8 w-8 rounded-full shadow-sm flex justify-center items-center">
                                    <FaCircleUser className="text-2xl" />
                            </span>
                            <div className="h-full ps-2 pe-3 flex justify-center items-center">
                                {user ? (
                                    <span className="font-semibold flex gap-1 items-center">@{user.username}<IoChevronDown /></span>
                                ):(
                                    <span>Error!</span>
                                )}
                            </div>
                        </button>
                    ):(
                        <Link href={'/login'} className="py-1 px-4 bg-black hover:bg-black/80 duration-500 text-white rounded-md flex gap-2 items-center">
                            <span>Login</span>
                            <FiLogIn />
                        </Link>
                    )}
                </div>

                <div className="flex gap-2 items-center md:hidden">
                    <button onClick={toggleMenu} className="hover:bg-black/10 backdrop-blur-sm rounded-sm duration-500 p-2">
                        <HiOutlineMenu className="text-xl" />
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="h-screen text-white w-full fixed top-0 bg-black backdrop-blur-sm z-30 md:hidden">
                    <div className="w-11/12 mx-auto flex items-center justify-between py-3 border-b border-gray-700">
                        <Link href={'/'} className="font-semibold">
                            <Image src={logoLight} className="h-10 w-32" alt="" />
                        </Link>
                        <div className="flex items-center md:hidden">
                            <button onClick={toggleMenu} className="text-xl hover:bg-white/10 backdrop-blur-sm rounded-sm duration-500 p-2">
                                <IoClose className="text-xl" />
                            </button>
                        </div>
                    </div>
                    <div className="w-11/12 mx-auto flex flex-col">
                        <Link href={'/'} onClick={toggleMenu} className="hover:text-gray-400 duration-500 py-3 border-b border-gray-700">Home</Link>

                        <Link href={'/admin'} onClick={toggleMenu} className="hover:text-gray-400 duration-500 py-3 border-b border-gray-700">Dashboard</Link>
                        
                        <Link href={'/admin/create-post'} onClick={toggleMenu} className="hover:text-gray-400 duration-500 py-3 border-b border-gray-700">New Post</Link>
                        {isloggedIn ? (
                            <div className="flex justify-between items-center py-2">
                                <div className="flex rounded-full h-9 justify-center items-center text-[12px] bg-black text-white p-0.5 md:hidden">
                                    <span className="h-8 w-8 rounded-full shadow-sm flex justify-center items-center">
                                        <FaCircleUser className="text-2xl" />
                                    </span>
                                    <div className="h-full ps-2 pe-3 flex justify-center items-center">
                                        {user ? (
                                            <div className="text-[13px] md:text-base flex flex-col">
                                                <span>@{user.username}</span>
                                                <span>{user.email}</span>
                                            </div>
                                        ):(
                                            <span className="pt-2 px-2">Error!...</span>
                                        )}
                                    </div>
                                </div>
                                <button onClick={Logout} className="text-black bg-white rounded-md hover:bg-gray-400 duration-500 px-3 py-2 text-center mt-2 flex justify-center gap-3 items-center">
                                    <span>Logout</span>
                                    <FiLogOut />
                                </button>
                            </div>
                            
                        ):(
                            <Link href={'/login'} onClick={toggleMenu} className="text-black bg-white rounded-md hover:bg-gray-400 duration-500 py-2 text-center mt-2 flex justify-center gap-3 items-center">
                                <span>Login</span>
                                <FiLogIn />
                            </Link>
                        )}
                    </div>
                </div>
            )}
            {profileOpen && (
                <div className="w-full h-screen fixed top-0 -z-10">
                    <div className="w-full relative">
                        <div className="absolute right-8 md:right-20 top-16 md:top-20 bg-white text-black pb-2 shadow-black shadow-2xl rounded-md">
                            <div className="w-full bg-black text-white ps-2 pe-2 py-2 profile flex justify-between items-center gap-4">
                                <h1 className="font-semibold">User Profile</h1>
                                <button onClick={toggleProfile} className="bg-red-500 text-white hover:bg-red-400 duration-500 p-1 rounded-md font-semibold"><IoClose /></button>
                            </div>
                            {user ? (
                                <div className="px-2 pt-2 text-[12px] md:text-base">
                                    <p className="font-semibold">Username: <span className="font-normal">@{user.username}</span></p>
                                    <p className="font-semibold">Email: <span className="font-normal">{user.email}</span></p>
                                    <p className="font-semibold mb-2">Role: <span className="font-normal">{user.role}</span></p>
                                    <LogoutBtn />
                                </div>
                            ):(
                                <span className="pt-2 px-2">Loading...</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    ); 
}