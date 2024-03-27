import Image from "next/image";
import { GoMegaphone } from "react-icons/go";
import { MdOutlineStore } from "react-icons/md";
import { GoLinkExternal } from "react-icons/go";
import { LuMoreHorizontal } from "react-icons/lu";
import { FaCloudSun } from "react-icons/fa6";
import { AiOutlineRise } from "react-icons/ai";
import { FcBearish, FcBullish } from "react-icons/fc";
import { BsDot, BsHandThumbsDown } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import imgOne from '@/public/1.jpg'
import imgTwo from '@/public/2.jpg'
import imgThr from '@/public/3.jpg'
import imgFor from '@/public/4.jpg'
import imgFive from '@/public/5.jpg'
import Link from "next/link";
import { CiFacebook, CiYoutube } from "react-icons/ci";

export default function PostSideBar() {
    return (
        <aside className="sticky top-0 w-full md:w-3/12 flex gap-3 flex-col">
            <div className="p-4 bg-black rounded-lg hover:shadow-2xl duration-500">
                
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-[15px]">Follow our Socials</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center w-full my-3">
                    <Link href={'#'} className="rounded-md hover:bg-blue-500 duration-500 py-1 px-2 flex gap-1 items-center justify-between text-[15px] bg-blue-600" >
                        <span className="text-xl"><CiFacebook /></span>
                        <span className="font-bold">109K</span>
                        <span>Fol</span>
                    </Link>
                    <Link href={'#'} className="rounded-md hover:bg-red-500 duration-500 py-1 px-2 flex gap-1 items-center justify-between text-[15px] bg-red-600" >
                        <span className="text-xl"><CiYoutube /></span>
                        <span className="font-bold">310K</span>
                        <span>Sub</span>
                    </Link>
                </div>
            </div>

            <div className="p-4 bg-black rounded-lg hover:shadow-2xl duration-500">
                
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-bold text-[15px]">Recent Posts</h1>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-2 items-center w-full my-3">
                    <Link href={'#'} className="w-full flex gap-2 items-center justify-between text-[12px] group">
                        <Image src={imgOne} className="w-3/12" alt="" />
                        <div className="w-9/12">
                            <h1 className="group-hover:text-gray-400 duration-500 font-bold leading-tight">Delight bought a new range rover velar and a sport puarsango ferrari</h1>
                        </div>
                    </Link>
                    <Link href={'#'} className="w-full flex gap-2 items-center justify-between text-[12px] group">
                        <Image src={imgOne} className="w-3/12" alt="" />
                        <div className="w-9/12">
                            <h1 className="group-hover:text-gray-400 duration-500 font-bold leading-tight">Delight bought a new range rover velar and a sport puarsango ferrari</h1>
                        </div>
                    </Link>
                    <Link href={'#'} className="w-full flex gap-2 items-center justify-between text-[12px] group">
                        <Image src={imgOne} className="w-3/12" alt="" />
                        <div className="w-9/12">
                            <h1 className="group-hover:text-gray-400 duration-500 font-bold leading-tight">Delight bought a new range rover velar and a sport puarsango ferrari</h1>
                        </div>
                    </Link>
                    <Link href={'#'} className="w-full flex gap-2 items-center justify-between text-[12px] group">
                        <Image src={imgOne} className="w-3/12" alt="" />
                        <div className="w-9/12">
                            <h1 className="group-hover:text-gray-400 duration-500 font-bold leading-tight">Delight bought a new range rover velar and a sport puarsango ferrari</h1>
                        </div>
                    </Link>
                </div>
            </div>

            {/* <div className="p-4 bg-black rounded-lg hover:shadow-2xl duration-500">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <AiOutlineRise />
                        <span className="text-[15px] font-bold">Finance</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="flex flex-col gap-2 w-full my-3">
                    <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full p-1">
                        <div className="w-8/12">
                            <div className="flex flex-col">
                                <p className="font-bold text-[12px]">USD/NGN</p>
                                <p className="text-[8px]">United States Dollar/Nigerian Naira</p> 
                            </div>
                            
                        </div>
                        <div className="w-4/12 flex justify-center">
                            <div className="flex w-full justify-between items-center">
                                <FcBearish className="text-xl"/>
                                <div className="flex flex-col">
                                    <p className="font-bold text-red-500 text-[9px]">-0.34%</p>
                                    <p className="font-bold text-[9px]">500.60</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full p-1">
                        <div className="w-8/12">
                            <div className="flex flex-col">
                                <p className="font-bold text-[12px]">GBP/USD</p>
                                <p className="text-[8px]">Great Britain Pound/United States Dollar</p> 
                            </div>
                            
                        </div>
                        <div className="w-4/12 flex justify-center">
                            <div className="flex w-full justify-between items-center">
                                <FcBullish className="text-xl"/>
                                <div className="flex flex-col">
                                    <p className="font-bold text-green-500 text-[9px]">+0.25%</p>
                                    <p className="font-bold text-[9px]">1420.13</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full p-1">
                        <div className="w-8/12">
                            <div className="flex flex-col">
                                <p className="font-bold text-[12px]">USD/NGN</p>
                                <p className="text-[8px]">United States Dollar/Nigerian Naira</p> 
                            </div>
                            
                        </div>
                        <div className="w-4/12 flex justify-center">
                            <div className="flex w-full justify-between items-center">
                                <FcBearish className="text-xl"/>
                                <div className="flex flex-col">
                                    <p className="font-bold text-red-500 text-[9px]">-0.34%</p>
                                    <p className="font-bold text-[9px]">500.60</p>
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
                        <span className="text-[15px] font-bold">Ads</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="flex flex-col w-full my-3">
                    <div className="flex bg-gray-300/30 hover:bg-gray-300/40 duration-500 rounded-md backdrop-blur-md w-full h-64 justify-center items-center">
                        <span>Adverts</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="text-[12px] bg-white/10 backdrop-blur-sm py-0.5 px-2 rounded-full border hover:shadow-lg duration-500 hover:scale-105">Place Ads</button>
                </div>
            </div>

            {/* <div className="p-4 bg-black shadow-2xl rounded-lg hover:shadow-2xl duration-500">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <MdOutlineStore />
                        <span className="text-[15px] font-bold">Shop</span>
                    </div>
                    <button className="hover:bg-white/10 backdrop-blur-sm p-1 rounded-full duration-500">
                        <LuMoreHorizontal />
                    </button>
                </div>
                <div className="flex flex-col w-full my-3">
                    <div className="grid duration-500 rounded-md backdrop-blur-md w-full grid-cols-2 gap-1">
                        <div className="relative rounded-md h-full bg-black/10">
                            <div className="">
                                <Image src={imgOne} alt="" className="rounded-md" />
                            </div>
                            <div className="h-full w-full absolute top-0 bg-black/40 rounded-md">

                            </div>
                            <div className="absolute z-20 bottom-1 left-1 w-11/12 rounded-md group">
                                <h1 className="text-[15px]">Frying pans</h1>
                                <div className="flex justify-between mt-0.5">
                                    <span className="text-[12px] font-bold p-0.5 px-1 rounded-full">
                                        $25.00
                                    </span>
                                    <Link href={'/'} className="p-0.5 group-hover:scale-110 rounded-full duration-500"><GoLinkExternal /></Link>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-md h-full bg-black/10">
                            <div className="">
                                <Image src={imgTwo} alt="" className="rounded-md" />
                            </div>
                            <div className="h-full w-full absolute top-0 bg-black/40 rounded-md">

                            </div>
                            <div className="absolute z-20 bottom-1 left-1 w-11/12 rounded-md group">
                                <h1 className="text-[15px]">Frying pans</h1>
                                <div className="flex justify-between mt-0.5">
                                    <span className="text-[12px] font-bold p-0.5 px-1 rounded-full">
                                        $25.00
                                    </span>
                                    <Link href={'/'} className="p-0.5 group-hover:scale-110 rounded-full duration-500"><GoLinkExternal /></Link>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-md h-full bg-black/10">
                            <div className="">
                                <Image src={imgFive} alt="" className="rounded-md" />
                            </div>
                            <div className="h-full w-full absolute top-0 bg-black/40 rounded-md">

                            </div>
                            <div className="absolute z-20 bottom-1 left-1 w-11/12 rounded-md group">
                                <h1 className="text-[15px]">Frying pans</h1>
                                <div className="flex justify-between mt-0.5">
                                    <span className="text-[12px] font-bold p-0.5 px-1 rounded-full">
                                        $25.00
                                    </span>
                                    <Link href={'/'} className="p-0.5 group-hover:scale-110 rounded-full duration-500"><GoLinkExternal /></Link>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="text-[12px] bg-white/10 backdrop-blur-sm py-0.5 px-2 rounded-full border hover:shadow-lg duration-500 hover:scale-105">Go to Shop</button>
                </div>
            </div> */}
        </aside>
    );
}