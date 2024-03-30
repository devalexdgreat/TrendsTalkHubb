"use client";
import Link from "next/link";
import { GoMegaphone } from "react-icons/go";
import { FiLogIn, FiLogOut, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoLight from '@/public/logo-light.png'
import logoDark from '@/public/logo-dark.png'
import imgOne from '@/public/1.jpg'
import imgTwo from '@/public/2.jpg'
import imgThr from '@/public/3.jpg'
import imgFor from '@/public/4.jpg'
import SearchComponent from "./SearchComponent";
import LogoutBtn from "./LogoutBtn";
import { useRouter } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { delCookies, getCookies } from "@/actions";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Navbar() {

    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [foundQuery, setFoundQuery] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [isloggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState(null);
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
            console.log('Access token has expired now');
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

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
                    cache: "no-store",
                });
                
                if (!res.ok) {
                    throw new Error("Failed to fetch categories");
                }
        
                const data = await res.json();
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [])

    const toggleProfile = () => {
        setProfileOpen(prevProfileOpen => !prevProfileOpen);
    };

    const toggleSearch = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    };

    const getPostsByQuery = async (query) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/search?query=${query}`, {
                cache: "no-store",
            });
        
            if (!res.ok) {
                throw new Error("Failed to fetch Projects");
            }
        
            return res.json();
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSearch = async () => {
        if(query.length <= 0) {
            alert("Error - Search field is empty!");
            return;
        } else {
            const posts = await getPostsByQuery(query);
            setFoundQuery(posts);
            setIsClicked(true);
        }
    }

    var found;
    var isEmpty;
    if(foundQuery.length > 0) {
        found = foundQuery;
        isEmpty = true;
    } 
    else if (isClicked == false) {
        isEmpty = true;
        found = [];
    }
    else {
        found = [];
        isEmpty = false;
    }

    const Logout = () => {
        // Clear the access token from local storage
        localStorage.removeItem('accessToken');
        delCookies();
        
        // Redirect the user to the login page
        router.push('/login'); // Replace '/login' with the appropriate login page route
        toggleMenu();
    }

    const handleSelect = (e) => {
        const link = e.target.value;
        console.log(link);
        router.push(link);
    }

    return (
        <div className="w-full fixed top-0 z-30 bg-white shadow-md" ref={ref}>
            <div className="w-[95%] mx-auto flex items-center text-black justify-between py-3">
                <Link href={'/'} className="font-semibold">
                    <Image src={logoDark} className="h-10 w-32" alt="" />
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <Link href={'/'} className="hover:text-black/60 duration-500">Discover</Link>
                    
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-gray-900">
                            Categories
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {categories ? (
                            <div className="py-1">
                            {categories.map((cat, index) => (
                                <Menu.Item key={index}>
                                {({ active }) => (
                                    <a
                                    href={`/blogs/categories/${cat.title}`}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    >
                                    {cat.title}
                                    </a>
                                )}
                                </Menu.Item>
                                ))}
                            </div>
                            ):(
                            <span>No Category</span>
                            )}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Link href={'/about'} className="hover:text-black/60 duration-500">About Us</Link>
                    <Link href={'/contact-us'} className="flex items-center gap-2 hover:text-black/60 duration-500">
                        <span>Advertise</span>
                        <GoMegaphone />
                    </Link>
                    {isloggedIn ? (
                        <button onClick={toggleProfile} className="flex rounded-full h-9 justify-center items-center bg-black text-white p-0.5">
                            <span className="h-8 w-8 rounded-full shadow-sm flex justify-center items-center">
                                    <FaCircleUser className="text-2xl" />
                            </span>
                            <div className="h-full ps-2 pe-3 flex justify-center items-center">
                                {user ? (
                                    <span className="font-semibold">@{user.username}</span>
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
                    <button onClick={toggleSearch} className="hover:bg-black/10 hover:text-black/60 backdrop-blur-sm rounded-sm duration-500 p-2"><FiSearch /></button>
                </div>

                <div className="flex gap-2 items-center md:hidden">
                    <button onClick={toggleSearch} className="hover:bg-black/10 backdrop-blur-sm rounded-sm duration-500 p-2">
                        <FiSearch className="text-xl" />
                    </button>
                    <button onClick={toggleMenu} className="hover:bg-black/10 backdrop-blur-sm rounded-sm duration-500 p-2">
                        <HiOutlineMenu className="text-xl" />
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="h-screen text-white w-full fixed top-0 bg-black backdrop-blur-sm z-30 md:hidden">
                    <div className="w-[95%] mx-auto flex items-center justify-between py-3 border-b border-gray-700">
                        <Link href={'/'} className="font-semibold">
                            <Image src={logoLight} className="h-10 w-32" alt="" />
                        </Link>
                        <div className="flex items-center md:hidden">
                            <button onClick={toggleMenu} className="text-xl hover:bg-white/10 backdrop-blur-sm rounded-sm duration-500 p-2">
                                <IoClose className="text-xl" />
                            </button>
                        </div>
                    </div>
                    <div className="w-[95%] mx-auto flex flex-col">
                        <Link href={'/'} onClick={toggleMenu} className="hover:text-gray-400 duration-500 py-3 border-b border-gray-700">Discover</Link>
                        <Menu as="div" className="relative inline-block text-left">
                            <div className="hover:text-gray-400 duration-500">
                                <Menu.Button className="inline-flex w-full justify-start items-center gap-x-1.5 py-3 border-b border-gray-700 ">
                                Categories
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-white hover:text-gray-400 duration-500" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {categories ? (
                                <div className="py-1">
                                {categories.map((cat, index) => (
                                    <Menu.Item key={index}>
                                    {({ active }) => (
                                        <a
                                        href={`/blogs/categories/${cat.title}`}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                        {cat.title}
                                        </a>
                                    )}
                                    </Menu.Item>
                                    ))}
                                </div>
                                ):(
                                <span>No Category</span>
                                )}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        
                        <Link href={'/'} onClick={toggleMenu} className="hover:text-gray-400 duration-500 py-3 border-b border-gray-700">Videos</Link>
                        <Link href={'/about'} onClick={toggleMenu} className="hover:text-gray-400 duration-500 py-3 border-b border-gray-700">About Us</Link>
                        <Link href={'/contact-us'} onClick={toggleMenu} className="hover:text-gray-400 duration-500 py-3 border-b border-gray-700">Contact Us</Link>
                        <Link href={'/contact-us'} onClick={toggleMenu} className="text-black bg-white rounded-md hover:bg-gray-400 duration-500 py-2 text-center mt-2 flex justify-center gap-3 items-center">
                            <span>Advertise</span>
                            <GoMegaphone />
                        </Link>
                        {isloggedIn ? (
                            <div className="flex justify-between items-center py-2">
                                <div className="flex rounded-full h-9 justify-center items-center text-[12px] bg-black text-white p-0.5 md:hidden">
                                    <span className="h-8 w-8 rounded-full shadow-sm flex justify-center items-center">
                                        <FaCircleUser className="text-2xl" />
                                    </span>
                                    <div className="h-full ps-2 pe-3 flex justify-center items-center">
                                        {user ? (
                                            <div className="text-[12px] md:text-base flex flex-col">
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
            {open && (
                <div className="z-20 w-full text-white fixed top-0 h-screen bg-black/50 backdrop-blur-sm">
                    <div className="w-[95%] mx-auto flex flex-col items-end md:justify-end py-3">
                        <div className="w-full md:w-6/12 flex items-center gap-1">
                            <input onChange={(e) => setQuery(e.target.value)} value={query} type="text" className="w-full py-0.5 ps-2 rounded-sm text-black" placeholder="Search here"/>
                            <button onClick={handleSearch} className="bg-black hover:bg-black/70 backdrop-blur-sm rounded-sm duration-500 p-2 flex items-center gap-1">
                                <FiSearch /><span className="text-[12px]">Search</span>
                            </button>
                            <button onClick={toggleSearch} className="bg-red-500 hover:bg-red-500/90 backdrop-blur-sm rounded-sm duration-500 p-2"><IoClose /></button>
                        </div>
                        <>
                            {isEmpty ? (
                                <>
                                    <div className="w-full md:w-6/12 mt-3">
                                        <span>Results for Search</span>
                                    </div>
                                    <div className="w-full md:w-6/12 flex flex-col only:md:flex-row mt-3 gap-2">
                                        {found.map((f) => (
                                            <div key={f.id} className="z-10">
                                                <Link href={`/blogs/${f.id}`} onClick={toggleSearch} className="z-20 group bg-black/30 backdrop-blur-sm rounded-md p-2 flex h-24 gap-2">
                                                    <div className="w-3/12 h-full">
                                                        <Image src={imgOne} className="rounded-md object-cover h-full" alt="" />
                                                    </div>
                                                    <div className="w-9/12 h-full flex items-center">
                                                        <h1 className="text-[13px] md:text-base group-hover:text-gray-400 duration-500 font-semibold">{f.title}</h1>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="w-full md:w-6/12 mt-3 bg-red-500 text-white ps-2 rounded-md">
                                    <h1>Not Found</h1>
                                </div>
                            )} 
                        </>
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