'use client';
import { FaUser } from "react-icons/fa6";
import { AiOutlineDelete, AiOutlineRise } from "react-icons/ai";
import Image from "next/image";
import { BsDot, BsHandThumbsUp } from "react-icons/bs";
import { FiEdit, FiEye } from "react-icons/fi";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

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

export default function PostList({ data, user }) {
    const router = useRouter();

    const deletePost = async (id) => {
        const isConfirmed = confirm(`${user.username}, do you want to delete this post ?`);
        if(!isConfirmed) {
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            });

            if (res.ok) {
                const data = await res.json();
                const successMsg = data.message;
                toast.success(successMsg, {
                    position: "top-center"
                  })
                router.refresh();
                
            } else {
                const errorData = await res.json();
                toast.error(errorData.message, {
                    position: "top-center"
                  })
            }
        } catch (error) {
            console.error('Error during delete:', error);
            toast.error('An unexpected error occurred', {
                position: "top-center"
              })
        }
    }

    return (
        <div className="flex flex-col mt-4 w-full gap-4 text-white">
            <Toaster/>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {data.map((d) => (
                    <div className="h-80" key={d.id}>
                        <div className="group rounded-lg h-full hover:shadow-2xl shadow-black duration-500 relative">
                            <div className="h-3/6">
                                <Image src={d.images[0].url} width={1000} height={1000} alt="" className="post-img h-full object-cover object-top" />

                                <div className="h-full w-full bg-black/20 md:hidden group-hover:block top-0 rounded-lg absolute">

                                </div>
                            </div>
                            <div className="bg-black p-3 t-box h-3/6 relative">
                                <div className="flex gap-2 items-center  text-[10px] md:text-[9px]">
                                    <span><FaUser /></span>
                                    <div className="flex gap-0.5 items-center">
                                        <h1>{d.author}</h1>
                                        <span><BsDot /></span>
                                        <span>{timeSinceCreation(d.date)}</span> 
                                    </div>
                                </div>
                                <div className="my-2">
                                    <p className="text-[16px] md:text-[15px]  font-semibold duration-500">{d.title}</p>
                                </div>
                                <div className="flex gap-4 items-center text-[13px] md:text-[12px] absolute bottom-3 font-semibold w-11/12 justify-between">
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
                                            <Link key={tag} href={`/blogs/tags/${tag}`} className="py-0.5 px-1 rounded-sm duration-500 text-[10px] flex items-center gap-1 hover:bg-white/10 backdrop-blur-sm whitespace-nowrap">
                                                <AiOutlineRise />
                                                <span>{tag}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/10 md:invisible group-hover:visible border backdrop-blur-sm py-2 px-3 absolute top-1 right-1 rounded-md text-[16px] md:text-[12px] z-20 flex items-center gap-3">
                                <Link href={`/admin/edit-post/${d.id}`} className="flex gap-1 items-center">
                                    <FiEdit /><span>Edit</span>
                                </Link>
                                <button onClick={(e) => deletePost(d.id)} className="flex gap-1 items-center">
                                    <RiDeleteBinLine /><span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center pt-2">
                <button className="bg-black text-white py-1 px-4 rounded-md hover:bg-black/70 duration-500">See More</button>
            </div>
        </div>
    );
}