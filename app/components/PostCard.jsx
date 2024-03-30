"use client";
import Image from "next/image";
import { BsDot, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaFacebook, FaFolderOpen, FaTwitter, FaUser, FaWhatsapp } from "react-icons/fa6";
import imgOne from '@/public/5.jpg'
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import { AiOutlineRise } from "react-icons/ai";
import { FiEye, FiInfo } from "react-icons/fi";
import { useRouter } from "next/navigation";
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

export default function PostCard({ post, token, postid, relatedData }) {
    const data = post;
    const [isLiked, setIsLiked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async (token) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/get_current_user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    cache: "no-store"
                });
        
                if (response.ok) {
                    const userData = await response.json();
                    return userData.user.id;
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        
        const checkLiked = async(postid, token) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postid}/like`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    cache: "no-store",
                });
                const {likes} = await response.json();
                let userId = await fetchUser(token);
                let liked = likes.filter(like => like.liker._id == userId);
                if(liked.length > 0) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
            } catch (error) {
                
            }
        }

        checkLiked(postid, token);
    }, [postid, token])

    const fetchUser = async (token) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/get_current_user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                cache: "no-store"
            });
    
            if (response.ok) {
                const userData = await response.json();
                return userData.user.id;
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    const checkLiked = async(postid, token) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postid}/like`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                cache: "no-store",
            });
            const {likes} = await response.json();
            let userId = await fetchUser(token);
            let liked = likes.filter(like => like.liker._id == userId);
            if(liked.length > 0) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        } catch (error) {
            
        }
    }

    const handleLike = async (postid, token) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postid}/like`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: "POST",
                cache: "no-store",
            });

            if(response.ok) {
                const message = await response.json();
                // alert(message.message);
                router.refresh();
                checkLiked(postid, token);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full md:w-9/12 text-black">
            <div className="w-full">       
                <div>
                    <div className="text-[13px] flex gap-1 items-center">
                        <Link href={'/'} className="text-black/80 rounded-md font-medium flex gap-1 items-center">Home
                        </Link>/
                        <Link href={`/blogs/categories/${data.categoryId}`} className="rounded-md font-medium flex gap-1 items-center hover:text-black/80 duration-500">
                            <FaFolderOpen />{data.category}
                        </Link>
                    </div>
                    <div className="text-[12px] flex gap-2 items-center mt-4 overflow-x-scroll scrollbar-hide">
                        <div className="font-medium">
                            #Tags
                        </div>
                        {post.tags.map((tag) => (
                            <Link key={tag} href={`/blogs/tags/${tag}`} className="py-1 px-2 rounded-md duration-500 text-[10px] flex items-center gap-2 hover:bg-black/80 backdrop-blur-sm bg-black text-white whitespace-nowrap">
                                <AiOutlineRise />
                                <p>{tag}</p>
                            </Link>
                        ))}
                    </div>
                    <h1 className="w-full my-4 font-medium text-2xl md:text-4xl">{data.title}</h1>
                    <div className="flex gap-2 items-center text-[12px]">
                        <FaUser className="text-[10px]"/>
                        <div className="flex gap-0.5 items-center">
                            <h1>{data.author}</h1>
                            <span><BsDot /></span>
                            <span>{timeSinceCreation(data.date)}</span> 
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => handleLike(postid, token)} className="flex gap-1.5 items-center">
                                {isLiked ? (
                                    <BsHandThumbsUpFill />
                                ):(
                                    <BsHandThumbsUp />
                                )}
                                <span>{formatNumber(data.likeCount)}</span>
                            </button>
                            <button className="flex gap-1.5 items-center">
                                <FiEye />
                                <span>{formatNumber(data.viewCount)}</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-5 mb-5 h-64 md:h-[26rem] rounded-lg">
                        <Image src={imgOne} alt="" className="rounded-lg object-cover object-center h-full w-full"/>
                    </div>
                    <article>
                        <p>
                            {data.content}
                        </p>
                    </article>
                    <div className="mt-5 border-y border-black py-2 flex justify-between items-center">
                        <div className="flex gap-1 items-center">
                            <IoShareSocialOutline />
                            <span>Share <span className="hidden md:inline-block">this Article</span></span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Link href={'/share#'} className="flex items-center gap-1 bg-blue-600 text-white py-1 px-2 rounded-md">
                                <FaFacebook /><span>Facebook</span>
                            </Link>
                            <Link href={'/share#'} className="flex items-center gap-1 bg-blue-500 text-white py-1 px-2 rounded-md">
                                <FaTwitter /><span>Twitter</span>
                            </Link>
                            <Link href={'/share#'} className="flex items-center gap-1 bg-green-500 text-white p-2 rounded-md">
                                <FaWhatsapp />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="mb-4 heading">
                        <span className="font-medium text-base mb-0.5">Related Posts</span>
                        <hr className="border-2 border-black w-12 rounded-3xl"/>
                    </div>
                    <div className="text-white w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                        {relatedData.map((r) => (
                            <article className="h-72" key={r.id}>
                                <Link href={`/blogs/${r.id}`} className="group rounded-lg h-72 hover:shadow-2xl shadow-black duration-500 relative">
                                    <div className="h-3/6">
                                        <Image src={imgOne} alt="" className="post-img h-full object-cover object-center" />
                                        <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                    </div>
                                    <div className="bg-black p-3 t-box h-3/6 relative">
                                        <div className="flex gap-2 items-center text-[9px]">
                                            <span><FaUser /></span>
                                            <div className="flex gap-0.5 items-center">
                                                <h1>{r.author}</h1>
                                                <span><BsDot /></span>
                                                <span>{timeSinceCreation(r.date)}</span> 
                                            </div>
                                        </div>
                                        <div className="my-2">
                                            <h2 className="text-[15px] font-medium duration-500">{r.title}</h2>
                                        </div>
                                        <div className="flex gap-4 items-center text-[12px] absolute bottom-3 font-medium w-11/12 justify-between">
                                            <div className="flex gap-3">
                                                <button className="flex gap-1.5 items-center">
                                                    <BsHandThumbsUp />
                                                    <span>{formatNumber(r.likeCount)}</span>
                                                </button>
                                                <button className="flex gap-1.5 items-center">
                                                    <FiEye />
                                                    <span>{formatNumber(r.viewCount)}</span>
                                                </button>
                                            </div>
                                            <div className="flex gap-1 overflow-x-scroll scrollbar-hide">
                                                {r.tags.map((tag) => (
                                                    <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                        <AiOutlineRise />
                                                        <span>{tag}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}