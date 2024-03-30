'use client';
import { AiOutlineRise } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaHashtag, FaUser } from "react-icons/fa6";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import imgOne from '@/public/1.jpg'
import imgTwo from '@/public/2.jpg'
import imgThr from '@/public/3.jpg'
import imgFor from '@/public/4.jpg'
import Link from "next/link";
import { FiInfo } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { useEffect, useState } from "react";

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

// function formatNumber(number) {
//     if (number >= 1000000000000) {
//         return Math.floor(number / 1000000000000) + ' T';
//     } else if (number >= 1000000000) {
//         return Math.floor(number / 1000000000) + ' B';
//     } else if (number >= 1000000) {
//         return Math.floor(number / 1000000) + ' M';
//     } else if (number >= 1000) {
//         return Math.floor(number / 1000) + ' K';
//     } else {
//         return number.toString();
//     }
// }

export default function TagPostsCard({ data, tag }) {

    const [postdata, setPostData] = useState(null);

    useEffect(() => {
        if(!data || data.length != 0) {
            setPostData(data);
            return;
        }
    }, [data])

    return (
        <div className="w-full md:w-9/12 text-white">
            <div className="mb-4 heading text-black">
                <span className="flex gap-1 items-center">
                    <FaHashtag className=""/>
                    <h1 className="font-semibold text-base mb-0.5">{tag}</h1>
                </span>
                <hr className="border-2 border-black w-12 rounded-3xl"/>
            </div>
            {postdata ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {data.map((d) => (
                        <div className="h-72" key={d.id}>
                            <Link href={`/blogs/${d.id}`} className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                <div className="h-3/6">
                                    <Image src={imgOne} alt="" className="post-img h-full object-cover object-center" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                </div>
                                <div className="bg-black p-3 t-box h-3/6 relative">
                                    <div className="flex gap-2 items-center text-[9px]">
                                        <span><FaUser /></span>
                                        <div className="flex gap-0.5 items-center">
                                            <h1>{d.author}</h1>
                                            <span><BsDot /></span>
                                            <span>{timeSinceCreation(d.date)}</span> 
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <p className="text-[15px] font-semibold duration-500">{d.title}</p>
                                    </div>
                                    <div className="flex gap-4 items-center text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
                                        <div className="flex gap-3">
                                            <button className="flex gap-1.5 items-center">
                                                <BsHandThumbsUp />
                                                <span>{formatNumber(d.likeCount)}</span>
                                            </button>
                                            <button className="flex gap-1.5 items-center">
                                                <FiEye />
                                                <span>{formatNumber(d.viewCount)}</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                            {d.tags.map((tag) => (
                                                <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm">
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
                </div>
            ):(
                <div className="h-[63vh] text-black w-full flex justify-center items-center">
                    <div  className="flex flex-col justify-center text-center">
                        <h1 className="font-bol text-xl md:text-2xl">Failed to Load Posts, Check your Network...</h1>
                        <div className="flex justify-center mt-3">
                            <button onClick={() => window.location.reload(false)} className="bg-black text-white py-1 px-3 rounded-md hover:bg-black/80 duration-500 flex gap-1 items-center">
                            <MdRefresh />Refresh<span></span></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}