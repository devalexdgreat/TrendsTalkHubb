import { BsHandThumbsUp } from "react-icons/bs";
import AdminNav from "../components/AdminNav";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineThumbUp } from "react-icons/md";
import Link from "next/link";
import { FiEye, FiPlus } from "react-icons/fi";
import Image from "next/image";
import imgOne from '@/public/5.jpg';
import { IoChatboxOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { IoIosMore } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

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

export default function AdminPage() {
    return (
        <div className="w-full">
            <AdminNav />
            <div className="w-11/12 mx-auto mt-24 mb-24 text-black">
                <div className="w-full">
                    <span className="text-base md:text-lg flex flex-col">
                        <span className="font-medium">Welcome Back!👋</span>
                        <span className="text-[12px]">Good evening</span>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row mt-4 w-full gap-4">
                    <div className="bg-slate-100 p-3 rounded-md shadow w-full md:w-3/12 flex flex-col justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="font-medium">@Excelwrites</span>
                            <span className="text-[12px] font-normal">Author</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex gap-1 items-baseline">
                                <span className="font-medium text-lg">91th</span>
                                <span className="text-[12px] font-normal">Rank</span>
                            </div>
                            <div className="flex gap-1 items-baseline">
                                <span className="font-medium text-lg">129</span>
                                <span className="text-[12px] font-normal">Total Post</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-9/12">
                        <div className="bg-slate-100 p-3 rounded-md shadow w-6/12 md:w-2/12 flex flex-col justify-between">
                            <div className="flex flex-col mb-4">
                                <BiCommentDetail className="text-3xl"/>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap">
                                    <span className="font-medium text-[12px]">Comments</span>
                                    <span className="text-lg font-medium">12K</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-md shadow w-6/12 md:w-2/12 flex flex-col justify-between">
                            <div className="flex flex-col mb-4">
                                <MdOutlineThumbUp className="text-3xl" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap">
                                    <span className="font-medium text-[12px]">Total Likes</span>
                                    <span className="text-lg font-medium">15M</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
                    <div className="bg-slate-100 rounded-md shadow p-3 w-full md:w-7/12">
                        <div className="flex justify-between">
                            <div>
                                <span className="font-medium">Visitors</span>
                            </div>
                            <div className="flex gap-1">
                                <div className=" bg-slate-300 rounded-sm flex items-center px-2">
                                    <span className="text-[12px] font-normal">D</span>
                                </div>
                                <div className=" bg-slate-300 rounded-sm flex items-center px-2">
                                    <span className="text-[12px] font-normal">M</span>
                                </div>
                                <div className=" bg-slate-300 rounded-sm flex items-center px-2">
                                    <span className="text-[12px] font-normal">Y</span>
                                </div>
                            </div>
                        </div>
                        <div className="py-32 bg-slate-200 mt-4 rounded-md">

                        </div>
                    </div>
                    <div className="w-full md:w-5/12 bg-slate-100 p-3 rounded-md">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-medium">Recent Blogs</span>
                            <Link href={'/create-post'} className="bg-black text-white py-1 px-2 rounded-md hover:bg-black/80 duration-500 flex gap-1 items-center text-sm">
                                <FiPlus />
                                <span>Add New</span>
                            </Link>
                        </div>
                        <div className="flex mt-4 w-full">
                            <div className="flex gap-2 items-center w-full">
                                <div className="w-28 h-14 flex items-center justify-center">
                                    <Image src={imgOne} className="rounded-md" alt="" />
                                </div>
                                <div className="flex flex-col justify-center h-full gap-1">
                                    <div>
                                        <p className="font-medium leading-tight text-sm">Blord causes a buzz after being spotted eating at a local restaurant</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-1 text-[12px] items-center">
                                            <IoChatboxOutline />
                                            <span className=""><span>545</span> Comments</span>
                                        </div>
                                        <div className="flex gap-1 text-[12px] items-center">
                                            <FiEye />
                                            <span className=""><span>1.6M</span> Views</span>
                                        </div>
                                        <Link href={'/edit-post'} className="flex gap-1 text-[12px] items-center">
                                            <LiaEdit />
                                            <span className="">Edit</span>
                                        </Link>
                                        <div className="flex gap-1 text-[12px] items-center">
                                            <RiDeleteBinLine />
                                            <span className="">Delete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}