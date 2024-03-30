"use client";
import { AiOutlineRise } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import imgOne from '@/public/1.jpg'
import imgTwo from '@/public/2.jpg'
import imgThr from '@/public/3.jpg'
import imgFor from '@/public/4.jpg'
import imgFiv from '@/public/5.jpg'
import Link from "next/link";
import { FiInfo } from "react-icons/fi";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { getCookies } from "@/actions";

function timeSinceCreation(createdDate) {
    // Get the current date
    var currentDate = new Date();

    // Convert the createdDate string to a Date object
    var createdDateObj = new Date(createdDate);

    // Calculate the difference in milliseconds
    var differenceInMs = currentDate - createdDateObj;

    // Convert milliseconds to seconds
    var differenceInSeconds = differenceInMs / 1000;

    // Determine the appropriate time unit
    if (differenceInSeconds < 60) {
        return Math.floor(differenceInSeconds) + " seconds ago";
    } else if (differenceInSeconds < 3600) {
        return Math.floor(differenceInSeconds / 60) + " minutes ago";
    } else if (differenceInSeconds < 86400) {
        return Math.floor(differenceInSeconds / 3600) + " hours ago";
    } else if (differenceInSeconds < 604800) {
        return Math.floor(differenceInSeconds / 86400) + " days ago";
    } else if (differenceInSeconds < 2419200) { // Assuming 7 days as a week
        return Math.floor(differenceInSeconds / 604800) + " weeks ago";
    } else {
        return "more than a month ago";
    }
}

function formatNumber(number) {
    if (number >= 1000000000000) {
        return (number / 1000000000000).toFixed(1) + ' T';
    } else if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + ' B';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + ' M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + ' K';
    } else {
        return number.toString();
    }
}

export default function Content({ data }) {

    const [dData, setDData] = useState('none');
    const [postdata, setPostData] = useState(null);
    const [isLogIn, setIsLogIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if(data) {
            setPostData(data);
            return;
        }
    }, [data])

    useEffect(() => {
        const fetchAt = async () => {
            let aT = await getCookies();
            return aT;
        }
        const checkLogin = async () => {
            let accessToken = localStorage.getItem('accessToken');
            let aToken = await fetchAt();
            if(accessToken != null || aToken != null) {
                setIsLogIn(true);
                return;
            } else {
                setIsLogIn(false);
            }
        }
        checkLogin();
    }, [])

    const handleClick = () => {
        if(isLogIn === false) {
            router.push('/');
            setDData('flex');
            return;
        } else {
            setIsLogIn(true);
        }
    }

    const toggleMenu = () => {
        setDData('none');
    }

    return (
        <div className="w-full h-full mt-20 mb-24">
            <div className="w-11/12 mx-auto h-full">
                <div className="w-full flex flex-col md:flex-row gap-3 md:gap-8 h-full">

                    <div style={{display: `${dData}`}} className="flex justify-center items-center h-screen w-full bg-black/30 backdrop-blur-sm fixed top-0 left-0 z-50">
                        <div className="text-center rounded-lg w-11/12 md:w-4/12 shadow-2xl shadow-black px-6 py-6 text-black z-40 bg-white relative">
                            <button className="absolute right-1 top-1 bg-red-500 text-white hover:bg-red-400 duration-500 p-1 rounded-md font-semibold text-lg" onClick={toggleMenu}><IoClose /></button>
                            <div className="w-full py-9">
                                <span className="font-semibold text-2xl md:text-2xl pb-0.5">Create an account for more interactivity.</span>
                            </div>
                            <div>
                                <Link href={'/signup'} className="py-2 px-7 bg-black text-white rounded-md hover:bg-black/80 duration-500">Sign up</Link>
                            </div>
                            <div className="mt-9">
                                <span className="text-gray-900 text-lg">Already have an account? </span><Link href={'/login'} className="text-black font-semibold hover:text-black/40 duration-500">Sign in</Link>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-y-scroll w-full md:w-9/12 scrollbar-hide">
                        <div className="mb-5 heading mt-5">
                            <span className="font-semibold mb-0.5 text-black text-lg md:text-xl tracking-tighter">Trending posts</span>
                            <hr className="border-2 border-black w-12 rounded-3xl"/>
                        </div>
                        {postdata ? (
                            <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                                
                                {data.map((d) => (
                                    <div className="" key={d.id} onClick={handleClick}>
                                        <Link href={`/blogs/${d.id}`} className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                            <div className="">
                                                <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                                <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                            </div>
                                            <div className="bg-black p-3 t-box relative">
                                                <div className="flex gap-2 items-center text-[13px] md:text-[9px]">
                                                    <span><FaUser /></span>
                                                    <div className="flex gap-0.5 items-center">
                                                        <h1>{d.author}</h1>
                                                        <span><BsDot /></span>
                                                        <span>{timeSinceCreation(d.date)}</span> 
                                                    </div>
                                                </div>
                                                <div className="mb-10 mt-5">
                                                    <h1 className="text-lg md:text-[15px] font-semibold duration-500">{d.title}</h1>
                                                </div>
                                                <div className="flex gap-4 items-center text-[15px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                                    <div className="flex gap-3">
                                                        <button className="flex gap-1.5 items-center">
                                                            <BsHandThumbsUp />
                                                            <span>{formatNumber(d.likesCount)}</span>
                                                        </button>
                                                        <button className="flex gap-1.5 items-center">
                                                            <FiEye />
                                                            <span>{formatNumber(d.viewsCount)}</span>
                                                        </button>
                                                    </div>
                                                    <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                                        {d.tags.map((tag) => (
                                                            <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[15px] md:text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                                <AiOutlineRise />
                                                                <span>{tag}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                                        </Link>
                                    </div>
                                ))}
                            </section>
                        ):(
                            <div className="h-[63vh] text-black w-full flex justify-center items-center">
                                <div  className="flex flex-col justify-center text-center">
                                    <span className="font-bol text-xl md:text-2xl">Loading posts...</span>
                                    <div className="flex justify-center mt-3">
                                        <button onClick={() => window.location.reload(false)} className="bg-black text-white py-1 px-3 rounded-md hover:bg-black/80 duration-500 flex gap-1 items-center">
                                            <MdRefresh />Refresh<span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <SideBar />
                </div>
            </div>
        </div>
    );
}