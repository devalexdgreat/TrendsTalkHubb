"use client";
import Image from "next/image";
import { BsDot, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaFacebook, FaFolderOpen, FaTwitter, FaUser, FaWhatsapp } from "react-icons/fa6";
import imgOne from '@/public/5.jpg'
import imgFiv from '@/public/1.jpg'
import { IoClose, IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import { AiOutlineRise } from "react-icons/ai";
import { FiEye, FiInfo } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import toast, { Toaster } from "react-hot-toast";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { MdContentCopy } from "react-icons/md";
import copyToClipboard from "@/utils/copyToClipboard";
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



export default function PostCard({ post, token, postid, relatedData, comments }) {
    const data = post;
    const [dData, setDData] = useState('none');
    const [isLiked, setIsLiked] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

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

    const toggleMenu = () => {
        setDData('none');
    }

    const goNoAuth = async () => {
        toggleMenu();
    }

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
                    setUser(userData.user.username);
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
        if(isLogIn === false) {
            setDData('flex');
            return;
        }
        setIsLogIn(true);
        try {
            const updatedIsLiked = !isLiked;
            
            const likeCountElement = document.getElementById(`like-count-${postid}`);
            if (likeCountElement) {
                const currentLikeCount = parseInt(likeCountElement.innerText);
                const updatedLikeCount = updatedIsLiked ? currentLikeCount + 1 : currentLikeCount - 1;
                likeCountElement.innerText = updatedLikeCount;
                setIsLiked(updatedIsLiked);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postid}/like`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: "POST",
                cache: "no-store",
            });

            if (response.ok) {
                const data = await response.json();


                const message = data.message
                toast.success(message, {
                    position: "top-center"
                  })
                router.refresh();
                checkLiked(postid, token);
            } else {
                // Revert UI changes if request fails
                setIsLiked(!updatedIsLiked);
                toast.error('Failed to like the post', {
                    position: "top-center"
                  });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const copyButtonHandler = () => {
        const textToCopy = `https://trendstalkhubb.vercel.app/blogs/${postid}`;
        copyToClipboard(textToCopy);
    };

    return (
        <div className="w-full md:w-9/12 text-black">

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

                    <div className="mt-4">
                        <span className="text-gray-900 text-lg">Or </span>
                        <button onClick={goNoAuth} className="text-black font-semibold hover:text-black/40 duration-500">Continue...</button>
                    </div>
                </div>
            </div>

            <div className="w-full">       
                <div>
                    <Toaster />
                    <div className="text-[13px] flex gap-1 items-center mt-4 mb-4">
                        <Link href={'/'} className="text-black/80 rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">Home
                        </Link>/
                        <Link href={`/blogs/categories/${data.category}`} className="rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">
                            <FaFolderOpen />{data.category}
                        </Link>
                    </div>
                    <div className="text-[12px] flex gap-2 items-center mt-4 overflow-x-scroll scrollbar-hide">
                        <div className="font-semibold">
                            #Tags
                        </div>
                        {data.tags.map((tag) => (
                            <Link key={tag} href={`/blogs/tags/${tag}`} className="py-1 px-2 rounded-md duration-500 text-[10px] flex items-center gap-2 hover:bg-black/80 backdrop-blur-sm bg-black text-white whitespace-nowrap">
                                <AiOutlineRise />
                                <p className="font-normal">{tag}</p>
                            </Link>
                        ))}
                    </div>
                    <h1 className="w-full my-4 font-semibold text-2xl md:text-4xl">{data.title}</h1>
                    <div className="flex gap-2 items-center text-[12px]">
                        <FaUser className="text-[10px]"/>
                        <div className="flex gap-0.5 items-center">
                            <h1>{data.author}</h1>
                            <span><BsDot /></span>
                            <span>{timeSinceCreation(data.date)}</span> 
                        </div>
                        <div className="flex gap-3 border border-black rounded-full py-1 px-3">
                            <button onClick={() => handleLike(postid, token)} className="flex gap-1.5 items-center">
                                {isLiked ? (
                                    <BsHandThumbsUpFill />
                                ):(
                                    <BsHandThumbsUp />
                                )}
                                <span id={`like-count-${postid}`}>{formatNumber(data.likeCount)}</span>
                            </button>|
                            <button className="flex gap-1.5 items-center">
                                <FiEye />
                                <span>{formatNumber(data.viewCount)}</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-5 mb-5 h-64 md:h-[26rem] rounded-lg">
                        <Splide 
                        options={ {
                            rewind: true,
                            autoplay: true,
                            gap   : '1rem',
                            arrows: false,
                        } }
                        hasTrack={ false } aria-label="...">
                            <div className="custom-wrapper">
                                <div className="splide__progress">
                                    <div className="splide__progress__bar" />
                                </div>
                                <SplideTrack className="h-60 md:h-[26rem] b-rad">
                                    {post.images.map((f) => (
                                        <SplideSlide key={f.caption} className="h-full relative">
                                            <Image src={f.url} width={1000} height={1000} alt="Image 1" className="object-cover object-top h-full w-full b-rad" />
                                            <div className="b-rad w-full absolute bg-black/5 backdrop-blur-sm text-white bottom-0 pb-8 md:pb-8 px-2 flex justify-center">
                                                <span className="md:hidden w-full md:w-8/12 mx-auto text-center text-base md:text-xl font-semibold">{truncateString(f.caption, 70)}</span>
                                                <span className="hidden md:block w-full md:w-8/12 mx-auto text-center text-base md:text-xl font-semibold">{f.caption}</span>
                                            </div>
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                            </div>
                        </Splide>
                    </div>
                    <article>
                        <p>
                            {data.content}
                        </p>
                    </article>
                    <div className="w-full mt-5 border-y border-black py-2 flex justify-between items-center">
                        <div className="flex gap-1 items-center">
                            <IoShareSocialOutline />
                            <span>Share <span className="hidden md:inline-block">this Article</span></span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <button onClick={copyButtonHandler} className="flex items-center gap-1 bg-black text-white py-1 px-2 rounded-md hover:bg-black/80 duration-500">
                                <MdContentCopy /><span>Copy Link</span>
                            </button>
                        </div>
                    </div>
                    <CommentBox token={token} postid={postid} user={user} comments={comments} />
                </div>

                <div className="mt-12">
                    <div className="mb-4 heading">
                        <span className="font-semibold text-base mb-0.5">Related Posts</span>
                        <hr className="border-2 border-black w-12 rounded-3xl"/>
                    </div>
                    {relatedData.length !== 0 ? (
                        <div className="text-white w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                            {relatedData.map((r) => (
                                <div className="h-80" key={r.id}>
                                    <Link href={`/blogs/${r.id}`} className="group rounded-lg h-full hover:shadow-2xl shadow-black duration-500 relative">
                                        <div className="h-3/6">
                                            <Image src={r.images[0].url} width={1000} height={1000} alt="" className="post-img h-full object-cover object-top" />
                                            <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
                                        </div>
                                        <div className="bg-black p-3 t-box h-3/6  relative">
                                            <div className="flex gap-2 items-center text-[10px] md:text-[9px]">
                                                <span><FaUser /></span>
                                                <div className="flex gap-0.5 items-center">
                                                    <h1>{r.author}</h1>
                                                    <span><BsDot /></span>
                                                    <span>{timeSinceCreation(r.date)}</span> 
                                                </div>
                                            </div>
                                            <div className="my-2">
                                                <p className="text-[16px] md:text-[15px] font-semibold duration-500">{r.title}</p>
                                            </div>
                                            <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
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
                                </div>
                            ))}
                        </div>
                    ):(
                        <span className="text-black font-normal">No related posts now </span>
                    )}
                </div>
                
            </div>
        </div>
    );
}