import { AiOutlineRise } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaFolderOpen, FaHashtag, FaRegFolderOpen, FaUser } from "react-icons/fa6";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
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

export default function CategoryCard({ data, tag, title }) {

    return (
        <div className="w-full md:w-8/12 lg:w-9/12 text-white">
            <div className="text-[13px] flex gap-1 items-center mt-4 mb-4 text-black">
                <Link href={'/'} className="text-black/80 rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">Home
                </Link>/
                <Link href={`/blogs/categories/${data.categoryId}`} className="rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">
                    <FaFolderOpen />{title}
                </Link>
            </div>
            <div className="mb-5 heading text-black">
                <span className="flex gap-1 items-center text-xl">
                    <FaRegFolderOpen />
                    <h1 className="font-semibold mb-0.5 text-xl">{title} News Collection</h1>
                </span>
                <hr className="border-2 border-black w-12 rounded-3xl"/>
            </div>
            {data.length > 0 ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.map((d) => (
                        <div className="h-80" key={d.id}>
                            <div className="group rounded-lg h-full hover:shadow-2xl shadow-black duration-500 relative">
                                <Link href={`/blogs/${d.id}`} className="absolute h-full w-full bg-transparent z-20"></Link>
                                <div className="h-3/6">
                                    <Image src={d.images[0].url} width={1000} height={1000} alt="" className="post-img h-full object-cover object-top" />
                                    <div className="h-full w-full bg-black/20 hidden group-hover:block top-0 rounded-lg absolute"></div>
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
                                <span className="bg-black/10 invisible group-hover:visible border backdrop-blur-sm py-1 px-2 absolute top-1 right-1 rounded-md text-[12px] z-20 flex items-center gap-1"><span>Read more</span><FiInfo /></span>
                            </div>
                        </div>
                    ))}
                </div>
            ):(
                <div className="text-black">
                    <span>No post (s) yet 😓</span>
                </div>
            )}
        </div>
    );
}