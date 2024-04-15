import AdminNav from "@/app/components/AdminNav";
import Image from "next/image";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { AiOutlineRise } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import imgOne from '@/public/1.jpg'
import imgTwo from '@/public/2.jpg'
import imgThr from '@/public/3.jpg'
import imgFor from '@/public/4.jpg'
import imgFiv from '@/public/5.jpg'
import { FiInfo } from "react-icons/fi";

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
        return Math.floor(differenceInSeconds) + " second" + (Math.floor(differenceInSeconds) === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 3600) {
        var minutes = Math.floor(differenceInSeconds / 60);
        return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 86400) {
        var hours = Math.floor(differenceInSeconds / 3600);
        return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 604800) {
        var days = Math.floor(differenceInSeconds / 86400);
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 2419200) { // Assuming 7 days as a week
        var weeks = Math.floor(differenceInSeconds / 604800);
        return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
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

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

function capString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTimeOfDay() {
    // Get the current date
    var currentDate = new Date();

    // Get the current hour
    var currentHour = currentDate.getHours();

    // Define the time ranges
    var morningStart = 5; // 5:00 AM
    var afternoonStart = 12; // 12:00 PM (noon)
    var eveningStart = 18; // 6:00 PM

    // Determine the time of day
    if (currentHour >= morningStart && currentHour < afternoonStart) {
        return "morning";
    } else if (currentHour >= afternoonStart && currentHour < eveningStart) {
        return "afternoon";
    } else {
        return "evening";
    }
}

export default function AllPosts() {

    var greeting = getTimeOfDay();

    return (
        <div className="w-full">
            <AdminNav />
            <div className="w-11/12 mx-auto mt-24 mb-24 text-black">
                <div className="w-full">
                    <span className="text-base md:text-lg flex flex-col">
                        <span className="font-semibold">Welcome Back!👋</span>
                        <span className="text-[12px]">Good {capString(greeting)} Charles</span>
                    </span>
                </div>
                <div className="w-full my-12">
                    <div  className="flex justify-between items-center">
                        <h1 className="font-semibold">All Posts</h1>
                        <Link href={'/admin/create-post'} className='py-1 px-4 bg-black text-white rounded-md flex items-center gap-1 hover:bg-black/70 duration-500'>
                            <FiPlus /><span>New Post</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white mt-4">

                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                        <div className="">
                            <Link href='' className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="">
                                    <Image src={imgFiv} alt="" className="post-img h-full w-full object-contain object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-36 md:h-36 relative">
                                    <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>Alexander</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(300000)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[16px] md:text-[15px] font-semibold duration-500"> object, and see if the error persists. If you encounter any issues or errors, please let me know.</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(219900)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(993790)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {/* {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                    <AiOutlineRise />
                                                    <span>{tag}</span>
                                                </Link>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}