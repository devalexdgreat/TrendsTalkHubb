'use client'
import Image from "next/image";
import { GoMegaphone } from "react-icons/go";
import { MdOutlineStore } from "react-icons/md";
import { LuMoreHorizontal } from "react-icons/lu";
import shopImg from '@/public/shop.gif'
import tunedImg from '@/public/tuned.gif'
import adOne from '@/public/try.jpg'
import Link from "next/link";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { useState } from "react";

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

export default function PostSideBar({ posts }) {

    const [isAdAvail, setIsAdAvail] = useState(true);

    return (
        <aside className="sticky top-0 w-full md:w-4/12 lg:w-3/12 flex gap-3 flex-col">
            <div className="p-4 bg-black rounded-lg hover:shadow-2xl duration-500">
                
                <div className="flex justify-between">
                    <div>
                        <span className="font-semibold text-[15px]">Follow our Socials</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center w-full my-3">
                    <Link href={'#'} className="rounded-md hover:bg-blue-500 duration-500 py-2 px-2 flex gap-1 items-center justify-between text-[15px] bg-blue-600" >
                        <span className="text-xl"><CiFacebook /></span>
                        <span className="font-semibold">109K</span>
                        <span>Fol</span>
                    </Link>
                    <Link href={'https://youtube.com/@trendstalkhubb?si=2PqtzRCqk7MvnJlX'} className="rounded-md hover:bg-red-500 duration-500 py-2 px-2 flex gap-1 items-center justify-between text-[15px] bg-red-600" >
                        <span className="text-xl"><CiYoutube /></span>
                        <span className="font-semibold">310K</span>
                        <span>Sub</span>
                    </Link>
                </div>
            </div>

            <div className="p-4 bg-black rounded-lg hover:shadow-2xl duration-500">
                
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-semibold text-[15px]">Recent Posts</h1>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-2 items-center w-full my-3">
                    {posts.map((p) => (
                        <Link key={p.id} href={`/blogs/${p.id}`} className="w-full flex gap-2 items-center justify-between text-[12px] group">
                            <div className="w-4/12 h-14 bg-white rounded-md">
                               <Image src={p.images[0].url} width={1000} height={1000} className="object-cover object-top h-full rounded-md" alt="" /> 
                            </div>
                            
                            <div className="w-8/12">
                                <h1 className="group-hover:text-gray-400 duration-500 font-semibold leading-tight">{truncateString(p.title, 70)}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* <div className="p-4 bg-black rounded-lg hover:shadow-2xl duration-500">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <AiOutlineRise />
                        <span className="text-[15px] font-semibold">Finance</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="flex flex-col gap-2 w-full my-3">
                    <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full p-1">
                        <div className="w-8/12">
                            <div className="flex flex-col">
                                <p className="font-semibold text-[12px]">USD/NGN</p>
                                <p className="text-[8px]">United States Dollar/Nigerian Naira</p> 
                            </div>
                            
                        </div>
                        <div className="w-4/12 flex justify-center">
                            <div className="flex w-full justify-between items-center">
                                <FcBearish className="text-xl"/>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-red-500 text-[9px]">-0.34%</p>
                                    <p className="font-semibold text-[9px]">500.60</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full p-1">
                        <div className="w-8/12">
                            <div className="flex flex-col">
                                <p className="font-semibold text-[12px]">GBP/USD</p>
                                <p className="text-[8px]">Great Britain Pound/United States Dollar</p> 
                            </div>
                            
                        </div>
                        <div className="w-4/12 flex justify-center">
                            <div className="flex w-full justify-between items-center">
                                <FcBullish className="text-xl"/>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-green-500 text-[9px]">+0.25%</p>
                                    <p className="font-semibold text-[9px]">1420.13</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full p-1">
                        <div className="w-8/12">
                            <div className="flex flex-col">
                                <p className="font-semibold text-[12px]">USD/NGN</p>
                                <p className="text-[8px]">United States Dollar/Nigerian Naira</p> 
                            </div>
                            
                        </div>
                        <div className="w-4/12 flex justify-center">
                            <div className="flex w-full justify-between items-center">
                                <FcBearish className="text-xl"/>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-red-500 text-[9px]">-0.34%</p>
                                    <p className="font-semibold text-[9px]">500.60</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="text-[12px] bg-white/10 backdrop-blur-sm py-0.5 px-2 rounded-full border hover:shadow-lg duration-500 hover:scale-105">See Market</button>
                </div>
            </div> */}

            <div className="p-4 bg-black rounded-lg hover:shadow-2xl duration-500">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <GoMegaphone />
                        <span className="text-[15px] font-semibold">Ads</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="flex flex-col w-full my-3">
                    {isAdAvail ? (
                        <Link href={'https://devalexdgreat.vercel.app/Projects/65f67dfee188b57768deda2a'} className="flex w-full justify-center items-center">
                            <div className="h-full">
                                <Image src={adOne} alt="" className="rounded-md h-full object-cover" />
                            </div>
                        </Link>
                    ):(
                        <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full justify-center items-center h-64">
                            <span>Place Ads</span>
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <button className="text-[12px] bg-white/10 backdrop-blur-sm py-1.5 px-3 rounded-full border hover:shadow-lg duration-500 hover:scale-105">Place Ads</button>
                </div>
            </div>

            <div className="p-4 bg-black shadow-2xl rounded-lg hover:shadow-2xl duration-500">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <MdOutlineStore />
                        <span className="text-[15px] font-semibold">Shop</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="flex flex-col w-full my-3">
                    <div className="h-64 bg-white rounded-md flex flex-col relative">
                        <div className="h-full">
                            <Image src={shopImg} alt="" className="h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0">
                            <Image src={tunedImg} alt="" className="" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="text-[12px] bg-white/10 backdrop-blur-sm py-1.5 px-3 rounded-full border hover:shadow-lg duration-500 hover:scale-105">Go to Shop</button>
                </div>
            </div>
        </aside>
    );
}