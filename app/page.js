import Image from "next/image";
import Navbar from "./components/Navbar";
import { AiOutlineRise } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import { FiInfo } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import SideBar from "./components/SideBar";
import SlideShow from "./components/SlideShow";
import useFetch from "@/utils/useFetch";

// const fetchFeed = async () => {
//   try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?limit=${5}`, {
//           cache: "no-store",
//       });

//       if (!response.ok) {
//           throw new Error("Failed to fetch feed");
//       }

//       return response.json();

//   } catch (error) {
//       console.error(error);
//   }
// };

// const getPosts = async () => {
//   try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
//           cache: "no-store",
//       });

//       if (!res.ok) {
//           throw new Error("Failed to fetch Projects");
//       }

//       return res.json();
      
//   } catch (error) {
//       console.log(error);
//   }
// };

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

export default async function Home() {

  const data = await useFetch(`posts`);
  const feed = await useFetch(`posts?limit=${5}`);

  return (
    <main className="h-auto antialiased">
      {/* <Navbar /> */}
      <div className="w-full h-full mt-20 mb-24">
            <div className="w-11/12 mx-auto h-full">
                <div className="w-full flex flex-col md:flex-row gap-3 md:gap-8 h-full">

                    {/* <div style={{display: `${dData}`}} className="flex justify-center items-center h-screen w-full bg-black/30 backdrop-blur-sm fixed top-0 left-0 z-50">
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
                                <button onClick={bypassAuth} className="text-black font-semibold hover:text-black/40 duration-500">Continue...</button>
                            </div>
                        </div>
                    </div> */}

                    <div className="overflow-y-scroll w-full md:w-8/12 lg:w-9/12 scrollbar-hide">
                        {feed && (
                            <div className="w-full">
                                <div className="mb-5 heading mt-5">
                                    <span className="font-semibold mb-0.5 text-black text-lg md:text-xl tracking-tighter">Latest Posts</span>
                                    <hr className="border-2 border-black w-12 rounded-3xl"/>
                                </div>
                                <div className="w-full md:w-full mb-12 bg-black b-rad">
                                    <SlideShow feed={feed}/>
                                </div>
                            </div>
                        )}
                        
                        <div className="mb-5 heading mt-5">
                            <span className="font-semibold mb-0.5 text-black text-lg md:text-xl tracking-tighter">Popular Posts</span>
                            <hr className="border-2 border-black w-12 rounded-3xl"/>
                        </div>
                        {data && (
                            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {data.map((d) => (
                                    <div className="text-white h-80" key={d.id}>
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
                            </section>
                        )}
                    </div>
                    <SideBar />
                </div>
            </div>
        </div>
    </main>
  );
}
