'use server';
import AdminNav from "../components/AdminNav";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineThumbUp } from "react-icons/md";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { getCookies } from "@/actions";
import PostList from "../components/PostLists";
import { redirect } from "next/navigation";
import Footer from "../components/Footer";


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

const data = [
    { name: 'January', sales: 400, views: 240 },
    { name: 'February', sales: 300, views: 139 },
    { name: 'March', sales: 200, views: 280 },
    { name: 'April', sales: 278, views: 390 },
    { name: 'May', sales: 189, views: 480 },
    { name: 'June', sales: 239, views: 430 },
];

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
            return userData.user;
        } else {
            console.error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const getPosts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
            cache: "no-store",
        });
  
        if (!res.ok) {
            throw new Error("Failed to fetch Projects");
        }
  
        return res.json();
        
    } catch (error) {
        console.log(error);
    }
}

const getUsersPosts = async (author) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?author=${author}`, {
            cache: "no-store",
        });
  
        if (!res.ok) {
            throw new Error("Failed to fetch Projects");
        }
  
        return res.json();
        
    } catch (error) {
        console.log(error);
    }
}

const checkToken = (token) => {
    if(token) {
        console.log('Token present.')
        return;
    } else {
        redirect('/login');
    }
};

function isTokenExpired(token) {
    if (!token) {
        // If token is not provided, consider it as expired
        return true;
    }

    try {
        // Decode the token
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Get the expiration time (exp) from the payload
        const expirationTime = payload.exp * 1000; // Convert to milliseconds

        // Check if the current time is after the expiration time
        return Date.now() >= expirationTime;
    } catch (error) {
        // If decoding fails, consider the token as expired
        return true;
    }
}
  
export default async function AdminPage() {

    var greeting = getTimeOfDay();
    const tokenRaw = await getCookies();
    checkToken(tokenRaw);
    const token = tokenRaw.value;

    if (isTokenExpired(token)) {
        console.log('Access token has expired');
        redirect('/login');
        return;
    } else {
        console.log('Access token is still valid');
    }

    const user = await fetchUser(token);
    if(user.role !== 'admin') {
        redirect('/');
    }

    const usersPosts = await getUsersPosts(user.username);

    const posts = await getPosts();

    var sumFromArray = (propertyName, array) => {
        let sum = 0;
        array.forEach(item => {
          sum += item[propertyName] ?? 0;
        });
        return sum;
      };
      
      var totalLikes = sumFromArray('likesCount', posts);
      var totalViews = sumFromArray('viewsCount', posts);
      var totalCom = sumFromArray('commentsCount', posts);

    return (
        <div className="w-full">
            <AdminNav />
            <div className="w-11/12 mx-auto mt-24 mb-24 text-black">
                <div className="w-full">
                    <span className="text-base md:text-lg flex flex-col">
                        <span className="font-semibold">Welcome Back!👋</span>
                        <span className="text-[12px]">Good {capString(greeting)}</span>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row mt-4 w-full gap-4">
                    <div className="bg-slate-100 p-3 rounded-md shadow w-full md:w-4/12 lg:w-3/12 flex flex-col justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="font-semibold">@{capString(user.username)}</span>
                            <span className="text-[12px]">{capString(user.role)}</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex gap-1 items-baseline">
                                <span className="font-semibold text-lg">{totalViews}</span>
                                <span className="text-[12px] font-normal">Total Views</span>
                            </div>
                            <div className="flex gap-1 items-baseline">
                                <span className="font-semibold text-lg">{posts.length}</span>
                                <span className="text-[12px] font-normal">Total Post</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-7/12 lg:w-9/12">
                        <div className="bg-slate-100 p-3 rounded-md shadow w-6/12 md:w-3/12 lg:w-2/12 flex flex-col justify-between">
                            <div className="flex flex-col mb-4">
                                <BiCommentDetail className="text-3xl"/>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap">
                                    <span className="font-medium text-[12px]">Comments</span>
                                    <span className="text-lg font-semibold">{totalCom}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-md shadow w-6/12 md:w-3/12 lg:w-2/12 flex flex-col justify-between">
                            <div className="flex flex-col mb-4">
                                <MdOutlineThumbUp className="text-3xl" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap">
                                    <span className="font-medium text-[12px]">Total Likes</span>
                                    <span className="text-lg font-semibold">{totalLikes}</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="w-full gap-4 mt-4">
                    <div className="w-full bg-slate-100 p-3 rounded-md">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold">All Blogs</span>
                            <Link href={'/admin/create-post'} className="bg-black text-white py-1.5 px-2 rounded-md hover:bg-black/80 duration-500 flex gap-1 items-center text-sm">
                                <FiPlus />
                                <span>Add New</span>
                            </Link>
                        </div>
                        <div className="w-full">
                            <PostList data={posts} user={user} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}